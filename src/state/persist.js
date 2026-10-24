// Tiny localStorage-backed store (no accounts yet). Falls back to memory if storage is blocked.
import { useCallback, useSyncExternalStore } from 'react'

const cache = new Map()
const mem = new Map()
const subs = new Set()
const writeSubs = new Set()

/** Called with the key after any write made through this module (used to sync to an account). */
export function onPersistentWrite(cb) {
  writeSubs.add(cb)
  return () => writeSubs.delete(cb)
}

function readRaw(key) {
  try {
    const v = localStorage.getItem(key)
    if (v !== null) return v
  } catch {
    // storage blocked — use memory
  }
  return mem.get(key) ?? null
}

function snapshot(key, fallback) {
  const raw = readRaw(key)
  const hit = cache.get(key)
  if (hit && hit.raw === raw) return hit.value
  let value = fallback
  if (raw !== null) {
    try {
      value = JSON.parse(raw)
    } catch {
      value = fallback
    }
  }
  cache.set(key, { raw, value })
  return value
}

function subscribe(cb) {
  subs.add(cb)
  window.addEventListener('storage', cb)
  return () => {
    subs.delete(cb)
    window.removeEventListener('storage', cb)
  }
}

/** Read-modify-write outside React (for things like recording an answer). */
export function updatePersistent(key, fallback, fn) {
  const v = fn(snapshot(key, fallback))
  const raw = JSON.stringify(v)
  try {
    localStorage.setItem(key, raw)
  } catch {
    mem.set(key, raw)
  }
  subs.forEach((f) => f())
  writeSubs.forEach((f) => f(key))
}

export function usePersistent(key, fallback) {
  const value = useSyncExternalStore(subscribe, () => snapshot(key, fallback))
  const set = useCallback(
    (next) => {
      const cur = snapshot(key, fallback)
      const v = typeof next === 'function' ? next(cur) : next
      const raw = JSON.stringify(v)
      try {
        localStorage.setItem(key, raw)
      } catch {
        mem.set(key, raw)
      }
      subs.forEach((f) => f())
      writeSubs.forEach((f) => f(key))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  )
  return [value, set]
}

const NO_PROGRESS = {}
const NO_REVIEW = {}

/** 'young' (5–7) | 'older' (8–12) | null until chosen */
export const useTrack = () => usePersistent('lb.track', null)

/** { [lessonId]: { stars } } — best stars per completed lesson */
export function useProgress() {
  const [progress, setProgress] = usePersistent('lb.progress', NO_PROGRESS)
  const complete = useCallback(
    (lessonId, stars) =>
      setProgress((p) => ({ ...p, [lessonId]: { stars: Math.max(stars, p[lessonId]?.stars ?? 0) } })),
    [setProgress],
  )
  return { progress, complete }
}

/** { [itemId]: { status: 'ok' | 'fix', note } } — the reviewer's marks */
export const useReviewMarks = () => usePersistent('lb.review', NO_REVIEW)
