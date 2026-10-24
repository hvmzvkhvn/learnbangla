import { useState } from 'react'

// Everything that makes up a learner's progress on this device.
const KEYS = ['lb.track', 'lb.progress', 'lb.game', 'lb.srs']
const PREFIX = 'LB1.'

const toCode = () => {
  const data = {}
  KEYS.forEach((k) => {
    try {
      const v = localStorage.getItem(k)
      if (v !== null) data[k] = JSON.parse(v)
    } catch {
      /* skip unreadable keys */
    }
  })
  return PREFIX + btoa(unescape(encodeURIComponent(JSON.stringify(data))))
}

function fromCode(code) {
  const c = code.trim()
  if (!c.startsWith(PREFIX)) throw new Error('That does not look like a save code.')
  const data = JSON.parse(decodeURIComponent(escape(atob(c.slice(PREFIX.length)))))
  const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)
  Object.entries(data).forEach(([k, v]) => {
    const ok = k === 'lb.track' ? typeof v === 'string' || v === null : isObj(v)
    if (!KEYS.includes(k) || !ok) throw new Error('That save code has unexpected contents.')
  })
  return data
}

/** Copy progress to another device (or back it up) with a save code. */
export default function SaveCode() {
  const [mine, setMine] = useState('')
  const [paste, setPaste] = useState('')
  const [msg, setMsg] = useState('')

  const copy = async () => {
    const code = toCode()
    setMine(code)
    try {
      await navigator.clipboard.writeText(code)
      setMsg('Copied! Paste it into "Load" on your other device.')
    } catch {
      setMsg('Select and copy the code below.')
    }
  }
  const load = () => {
    try {
      const data = fromCode(paste)
      if (!window.confirm('Replace the progress on THIS device with the saved progress?')) return
      KEYS.forEach((k) => (k in data ? localStorage.setItem(k, JSON.stringify(data[k])) : localStorage.removeItem(k)))
      location.reload()
    } catch (e) {
      setMsg(e.message || "Oops, that didn't work — check the code and try again!")
    }
  }

  return (
    <div className="card mt-8 !p-5">
      <h2 className="text-xl font-extrabold text-ink">Save code</h2>
      <p className="mb-3 text-sm text-ink/60">Move your progress to another phone or computer — no account needed.</p>
      <button type="button" onClick={copy} className="btn-secondary w-full !py-3">
        Copy my save code
      </button>
      {mine && <textarea readOnly value={mine} rows={3} className="input-field mt-3 break-all text-xs" onFocus={(e) => e.target.select()} />}
      <textarea value={paste} onChange={(e) => setPaste(e.target.value)} rows={2} placeholder="Paste a save code here to load it…" className="input-field mt-3 break-all text-xs" />
      <button type="button" onClick={load} disabled={!paste.trim()} className="btn-primary mt-3 w-full !py-3">
        Load this code
      </button>
      {msg && <p className="mt-2 text-center text-sm font-bold text-ink/60">{msg}</p>}
    </div>
  )
}
