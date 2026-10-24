// Install prompt, offline audio download and service-worker registration.
import { useEffect, useState } from 'react'

const BASE = import.meta.env.BASE_URL
const AUDIO_CACHE = 'lb-audio'

export function registerServiceWorker() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${BASE}sw.js`, { scope: BASE }).catch(() => {})
  })
}

let deferred = null
const subs = new Set()
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferred = e
    subs.forEach((f) => f())
  })
  window.addEventListener('appinstalled', () => {
    deferred = null
    subs.forEach((f) => f())
  })
}

export const isStandalone = () => window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true
export const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

export function useInstall() {
  const [, bump] = useState(0)
  useEffect(() => {
    const f = () => bump((n) => n + 1)
    subs.add(f)
    return () => subs.delete(f)
  }, [])
  return {
    installed: isStandalone(),
    canPrompt: Boolean(deferred),
    ios: isIos(),
    prompt: async () => {
      if (!deferred) return
      deferred.prompt()
      await deferred.userChoice
      deferred = null
      bump((n) => n + 1)
    },
  }
}

export const offlineSupported = () => 'caches' in window && 'serviceWorker' in navigator

async function audioUrls() {
  const r = await fetch(`${BASE}audio/manifest.json`)
  const m = await r.json()
  return [...new Set(Object.values(m))].map((f) => new URL(`${BASE}audio/${f}`, location.href).href)
}

/** How many of the audio files are already saved on this device. */
export async function audioStatus() {
  const urls = await audioUrls()
  const cache = await caches.open(AUDIO_CACHE)
  const have = new Set((await cache.keys()).map((r) => r.url))
  return { total: urls.length, saved: urls.filter((u) => have.has(u)).length }
}

/** Save every audio clip for offline use. onProgress(done, total); stop with signal.abort(). */
export async function saveAudioOffline(onProgress, signal) {
  const urls = await audioUrls()
  const cache = await caches.open(AUDIO_CACHE)
  const have = new Set((await cache.keys()).map((r) => r.url))
  const todo = urls.filter((u) => !have.has(u))
  let done = urls.length - todo.length
  onProgress(done, urls.length)
  const queue = [...todo]
  let failed = 0
  await Promise.all(
    Array.from({ length: 6 }, async () => {
      while (queue.length && !signal?.aborted) {
        const u = queue.shift()
        try {
          const res = await fetch(u, { signal })
          if (res.ok) await cache.put(u, res)
          else failed++
        } catch {
          failed++
        }
        done++
        onProgress(done, urls.length)
      }
    }),
  )
  return { failed, aborted: Boolean(signal?.aborted) }
}

export async function clearAudioOffline() {
  await caches.delete(AUDIO_CACHE)
}
