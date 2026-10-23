// Audio engine: plays the pre-recorded Bangla clips (public/audio), falls back to a browser Bangla
// voice if one exists, and can read English instructions aloud with the browser voice.
import { useEffect, useState } from 'react'
import { norm, sayFor } from './norm'
import { usePersistent } from '../state/persist'

const BASE = import.meta.env.BASE_URL
let manifest = null
let loading = null
const elements = new Map()
let current = null
let token = 0
const listeners = new Set()

const notify = () => listeners.forEach((f) => f())

export function loadManifest() {
  if (!loading) {
    loading = fetch(`${BASE}audio/manifest.json`)
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => ({}))
      .then((m) => {
        manifest = m
        notify()
      })
  }
  return loading
}

const soundOn = () => {
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
  if (current) {
    current.pause()
    current = null
  }
  synth?.cancel()
}

/** Play one piece of Bangla text. Resolves true if it played to the end. */
export async function speak(text, { force = false } = {}) {
  if (!text || (!force && !soundOn())) return false
  await loadManifest()
  const key = norm(text)
  stop()
  const my = token
  const file = manifest?.[key]
  if (file) {
    let el = elements.get(file)
    if (!el) {
      el = new Audio(`${BASE}audio/${file}`)
      elements.set(file, el)
    }
    el.currentTime = 0
    current = el
    try {
      await el.play()
    } catch {
      return false
    }
    return new Promise((resolve) => {
      const done = () => {
        el.removeEventListener('ended', done)
        el.removeEventListener('pause', done)
        resolve(token === my && el.ended)
      }
      el.addEventListener('ended', done)
      el.addEventListener('pause', done)
    })
  }
  const bn = voiceFor('bn')
  if (synth && bn) {
    return new Promise((resolve) => {
      const u = new SpeechSynthesisUtterance(sayFor(text))
      u.voice = bn
      u.lang = bn.lang
      u.rate = 0.8
      u.onend = () => resolve(true)
      u.onerror = () => resolve(false)
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
export function speakEnglish(text) {
  if (!synth || !soundOn()) return
  stop()
  const u = new SpeechSynthesisUtterance(text)
  const v = voiceFor('en-gb') || voiceFor('en')
  if (v) u.voice = v
  u.lang = v?.lang || 'en-GB'
  u.rate = 0.9
  synth.speak(u)
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
  return [on !== false, (v) => { if (!v) stop(); set(v) }]
}
