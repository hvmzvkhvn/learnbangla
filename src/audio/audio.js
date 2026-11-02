// Audio engine: plays the pre-recorded Bangla clips (public/audio), falls back to a browser Bangla
// voice if one exists, and can read English instructions aloud with the browser voice.
import { useEffect, useState } from 'react'
import { norm, sayFor } from './norm'
import { usePersistent } from '../state/persist'
import { myVoiceUrl } from './voiceStore'
import { readUI } from '../ui/preferences'

const BASE = import.meta.env.BASE_URL
let manifest = null
let loading = null
const elements = new Map()
let current = null
let token = 0
let settleCurrent = null
const listeners = new Set()

const notify = () => listeners.forEach((f) => f())

export const getManifest = () => manifest

export function loadManifest() {
  if (manifest) return Promise.resolve(manifest)
  if (!loading) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    loading = fetch(`${BASE}audio/manifest.json`, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error('Audio could not load.')
        return r.json()
      })
      .then((m) => {
        manifest = m
        notify()
        return m
      })
      .catch(() => {
        notify()
        return null
      })
      .finally(() => {
        clearTimeout(timeout)
        loading = null
      })
  }
  return loading
}
if (typeof window !== 'undefined')
  window.addEventListener('online', () => {
    if (!manifest) loadManifest()
  })

const soundOn = () => {
  if (readUI().calm) return false
  try {
    return JSON.parse(localStorage.getItem('lb.sound') ?? 'true') !== false
  } catch {
    return true
  }
}

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null
const voiceFor = (prefix) => synth?.getVoices().find((v) => v.lang.toLowerCase().startsWith(prefix))

/** Stop whatever is playing. */
export function stop() {
  token++
  settleCurrent?.(null)
  settleCurrent = null
  if (current) {
    current.pause()
    current = null
  }
  synth?.cancel()
}

/** Play one piece of Bangla text. Resolves true if it played to the end. */
export async function speak(text, { force = false, skipMine = false, rate = 1, onState = () => {} } = {}) {
  if (!text || (!force && !soundOn())) return false
  stop()
  const my = token
  onState('loading')
  await loadManifest()
  if (token !== my) return null
  const key = norm(text)
  const mine = skipMine ? null : await myVoiceUrl(key)
  if (token !== my) return null
  const file = manifest?.[key]
  if (mine || file) {
    const src = mine ?? `${BASE}audio/${file}`
    let el = elements.get(src)
    if (!el) {
      el = new Audio(src)
      elements.set(src, el)
    }
    el.currentTime = 0
    el.playbackRate = rate
    current = el
    return new Promise((resolve) => {
      let settled = false
      const timeout = setTimeout(() => {
        finish(false)
        el.pause()
      }, 15000)
      const finish = (ok) => {
        if (settled) return
        settled = true
        clearTimeout(timeout)
        el.removeEventListener('ended', ended)
        el.removeEventListener('error', failed)
        el.removeEventListener('playing', playing)
        if (settleCurrent === finish) settleCurrent = null
        resolve(ok)
      }
      const ended = () => finish(token === my ? true : null)
      const failed = () => finish(false)
      const playing = () => {
        clearTimeout(timeout)
        onState('playing')
      }
      settleCurrent = finish
      el.addEventListener('ended', ended)
      el.addEventListener('error', failed)
      el.addEventListener('playing', playing)
      el.play().catch(failed)
    })
  }
  const bn = voiceFor('bn')
  if (synth && bn) {
    return new Promise((resolve) => {
      const u = new SpeechSynthesisUtterance(sayFor(text))
      u.voice = bn
      u.lang = bn.lang
      u.rate = rate
      const done = (ok) => {
        if (settleCurrent === done) settleCurrent = null
        resolve(ok)
      }
      settleCurrent = done
      u.onstart = () => onState('playing')
      u.onend = () => done(token === my ? true : null)
      u.onerror = () => done(token === my ? false : null)
      synth.speak(u)
    })
  }
  return false
}

/** Play several clips one after another; a newer speak()/stop() cancels the rest. */
export async function speakSequence(texts, gapMs = 250) {
  const list = texts.filter(Boolean)
  for (let i = 0; i < list.length; i++) {
    const ok = await speak(list[i])
    if (!ok) return
    if (i < list.length - 1) {
      const my = token
      await new Promise((r) => setTimeout(r, gapMs))
      if (token !== my) return
    }
  }
}

/** Read an English instruction aloud with the browser's own voice. */
export function speakEnglish(text, { force = false, onState = () => {} } = {}) {
  if (!synth || (!force && !soundOn())) return Promise.resolve(false)
  stop()
  const my = token
  onState('loading')
  return new Promise((resolve) => {
    const u = new SpeechSynthesisUtterance(text)
    const v = voiceFor('en-gb') || voiceFor('en')
    if (v) u.voice = v
    u.lang = v?.lang || 'en-GB'
    u.rate = 0.9
    const done = (ok) => {
      if (settleCurrent === done) settleCurrent = null
      resolve(ok)
    }
    settleCurrent = done
    u.onstart = () => onState('playing')
    u.onend = () => done(token === my ? true : null)
    u.onerror = () => done(token === my ? false : null)
    synth.speak(u)
  })
}

export const canSpeakEnglish = () => Boolean(synth)

/** True once the manifest is loaded and the text has a recording (or a browser Bangla voice exists). */
export function hasAudio(text) {
  return Boolean(manifest?.[norm(text)]) || Boolean(voiceFor('bn'))
}

export function useAudioReady() {
  const [, force] = useState(0)
  useEffect(() => {
    const f = () => force((n) => n + 1)
    listeners.add(f)
    loadManifest()
    return () => listeners.delete(f)
  }, [])
  return manifest !== null
}

export const useSoundOn = () => {
  const [on, set] = usePersistent('lb.sound', true)
  return [
    on !== false,
    (v) => {
      if (!v) stop()
      set(v)
    },
  ]
}
