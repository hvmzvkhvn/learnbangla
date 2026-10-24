// Your own recordings (from the Studio page), kept in this browser's IndexedDB as mp3 blobs keyed by the
// same text key the audio manifest uses. They play instead of the built-in voice on this device.
const DB = 'lb-voice'
const STORE = 'clips'

let dbp = null
function open() {
  if (!dbp) {
    dbp = new Promise((resolve, reject) => {
      if (typeof indexedDB === 'undefined') return reject(new Error('IndexedDB unavailable'))
      const req = indexedDB.open(DB, 1)
      req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: 'key' })
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => reject(req.error)
    })
  }
  return dbp
}

const wrap = (mode, fn) =>
  open().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, mode)
        const req = fn(tx.objectStore(STORE))
        tx.oncomplete = () => resolve(req?.result)
        tx.onerror = tx.onabort = () => reject(tx.error)
      }),
  )

let keys = null // Set of text keys that have a recording (null = not loaded yet)
const urls = new Map()
const listeners = new Set()
const changed = () => listeners.forEach((f) => f())

export const onVoiceChange = (f) => {
  listeners.add(f)
  return () => listeners.delete(f)
}

export const useMyVoicePref = () => {
  try {
    return JSON.parse(localStorage.getItem('lb.useMyVoice') ?? 'true') !== false
  } catch {
    return true
  }
}
export const setUseMyVoice = (on) => {
  try {
    localStorage.setItem('lb.useMyVoice', JSON.stringify(on))
  } catch {
    /* ignore */
  }
  changed()
}

export async function loadVoiceKeys() {
  if (keys) return keys
  try {
    keys = new Set(await wrap('readonly', (s) => s.getAllKeys()))
  } catch {
    keys = new Set()
  }
  return keys
}

export async function saveClip(key, blob, ms) {
  await wrap('readwrite', (s) => s.put({ key, blob, ms, at: Date.now() }))
  ;(await loadVoiceKeys()).add(key)
  const old = urls.get(key)
  if (old) URL.revokeObjectURL(old)
  urls.delete(key)
  changed()
}

export async function deleteClip(key) {
  await wrap('readwrite', (s) => s.delete(key))
  ;(await loadVoiceKeys()).delete(key)
  const old = urls.get(key)
  if (old) URL.revokeObjectURL(old)
  urls.delete(key)
  changed()
}

export async function clearClips() {
  await wrap('readwrite', (s) => s.clear())
  keys = new Set()
  urls.forEach((u) => URL.revokeObjectURL(u))
  urls.clear()
  changed()
}

export async function getClip(key) {
  return wrap('readonly', (s) => s.get(key))
}

export async function allClips() {
  return wrap('readonly', (s) => s.getAll())
}

/** A playable URL for your recording of `key`, or null (none yet, or switched off). */
export async function myVoiceUrl(key) {
  if (!useMyVoicePref()) return null
  const have = await loadVoiceKeys()
  if (!have.has(key)) return null
  if (urls.has(key)) return urls.get(key)
  try {
    const rec = await getClip(key)
    if (!rec) return null
    const u = URL.createObjectURL(rec.blob)
    urls.set(key, u)
    return u
  } catch {
    return null
  }
}
