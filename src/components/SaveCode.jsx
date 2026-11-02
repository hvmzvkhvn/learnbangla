import { useState } from 'react'
import { validateState } from '../state/schema'
import { readPersistent, updatePersistent } from '../state/persist'
import { useSync } from '../sync/engine'
const KEYS = { track: 'lb.track', progress: 'lb.progress', game: 'lb.game', srs: 'lb.srs', epoch: 'lb.epoch' }
export function encodeSave(state) {
  return 'LB2.' + btoa(unescape(encodeURIComponent(JSON.stringify(validateState(state)))))
}
export function decodeSave(code) {
  const c = code.trim()
  if (c.length > 480000 || !/^LB[12]\./.test(c)) throw new Error('Use a Learn Bangla save code smaller than 480 KB.')
  let data
  try {
    data = JSON.parse(decodeURIComponent(escape(atob(c.slice(4)))))
  } catch {
    throw new Error('That code is incomplete or damaged.')
  }
  if (c.startsWith('LB1.')) {
    if (!data || typeof data !== 'object' || Array.isArray(data) || Object.keys(data).some((k) => !Object.values(KEYS).includes(k)))
      throw new Error('Unexpected save code contents.')
    data = Object.fromEntries(
      Object.entries(KEYS)
        .filter(([, k]) => k in data)
        .map(([n, k]) => [n, data[k]]),
    )
  }
  return validateState(data)
}
export default function SaveCode() {
  const sync = useSync()
  const [mine, setMine] = useState(''),
    [paste, setPaste] = useState(''),
    [msg, setMsg] = useState(''),
    [preview, setPreview] = useState(null)
  const current = () =>
    Object.fromEntries(Object.entries(KEYS).map(([n, k]) => [n, readPersistent(k, n === 'track' ? null : n === 'epoch' ? 0 : {})]))
  const copy = async () => {
    const code = encodeSave(current())
    setMine(code)
    try {
      await navigator.clipboard.writeText(code)
      setMsg('Copied. Keep this code somewhere safe.')
    } catch {
      setMsg('Select and copy the code below.')
    }
  }
  const inspect = () => {
    try {
      setPreview(decodeSave(paste))
      setMsg('')
    } catch (e) {
      setMsg(e.message)
    }
  }
  const load = () => {
    try {
      if (sync.learnerId) throw new Error('Sign out before importing a guest backup, so it cannot replace another learner’s work.')
      const data = validateState(preview)
      localStorage.setItem('lb.importBackup', encodeSave(current())) // must succeed before replacement
      for (const [n, k] of Object.entries(KEYS)) updatePersistent(k, null, () => data[n] ?? (n === 'track' ? null : n === 'epoch' ? 0 : {}))
      updatePersistent('lb.lessonSessions', {}, () => ({}))
      setPreview(null)
      setMsg('Progress restored. Your previous progress is available below.')
    } catch (e) {
      setMsg(e.message)
    }
  }
  const recover = () => {
    const code = localStorage.getItem('lb.importBackup')
    if (code) {
      setPaste(code)
      setPreview(decodeSave(code))
    } else setMsg('No previous import backup on this device.')
  }
  return (
    <section className="card mt-5 !p-5" aria-labelledby="backup-title">
      <h2 id="backup-title" className="text-xl font-bold">
        Back up your progress
      </h2>
      <p className="mb-3 text-sm">A save code includes learning progress, not your voice recordings. Keep it private.</p>
      <button onClick={copy} className="btn-secondary w-full">
        Copy my save code
      </button>
      {mine && (
        <textarea
          aria-label="Your save code"
          readOnly
          value={mine}
          rows={3}
          className="input-field mt-3 text-xs"
          onFocus={(e) => e.target.select()}
        />
      )}
      <label className="mt-3 block font-bold">
        Restore a backup
        <textarea
          value={paste}
          onChange={(e) => {
            setPaste(e.target.value)
            setPreview(null)
          }}
          rows={3}
          maxLength={480000}
          className="input-field mt-1 text-xs"
        />
      </label>
      <button disabled={!paste.trim()} onClick={inspect} className="btn-primary mt-3">
        Preview backup
      </button>
      {preview && (
        <div className="mt-3 rounded-xl bg-accent/30 p-3">
          <p>
            {Object.keys(preview.progress ?? {}).length} completed lessons · {preview.game?.xp ?? 0} XP · {preview.track ?? 'No age group'}
          </p>
          <p>This replaces this device’s guest progress. A recovery copy is saved first.</p>
          <button onClick={load} className="btn-primary mt-2">
            Restore this backup
          </button>
          <button onClick={() => setPreview(null)} className="ml-3 underline">
            Cancel
          </button>
        </div>
      )}
      <button onClick={recover} className="mt-3 block underline">
        Recover progress from before the last import
      </button>
      <p role="status" className="mt-2 text-sm">
        {msg}
      </p>
    </section>
  )
}
