import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GrownUpGate from '../components/GrownUpGate'
import { accountsEnabled } from '../lib/supabaseClient'
import { tracks } from '../curriculum/tracks'
import { useTrack } from '../state/persist'
import { addLearner, deleteAccount, hasLocalProgress, listLearners, push, pull, removeLearner, renameLearner, selectLearner, signIn, signOut, signUp, useSync } from '../sync/engine'

const TRACK_KEYS = ['young', 'older', 'teen', 'senior', 'adult']

const ago = (t) => {
  if (!t) return ''
  const s = Math.max(0, (Date.now() - t) / 1000)
  if (s < 20) return 'just now'
  if (s < 3600) return `${Math.round(s / 60) || 1} min ago`
  return `${Math.round(s / 3600)} h ago`
}

export default function Account() {
  const sync = useSync()
  if (!accountsEnabled) return <Shell><p className="card text-center text-ink/70">Accounts are not switched on for this copy of the app. Everything still works on this device.</p></Shell>
  if (!sync.ready) return <Shell><p className="card text-center text-ink/60">Loading…</p></Shell>
  return <Shell>{sync.email ? <GrownUpGate why="Managing the account is for parents and guardians."><Manage sync={sync} /></GrownUpGate> : <SignedOut />}</Shell>
}

function Shell({ children }) {
  return (
    <div className="mx-auto max-w-xl px-1 py-2">
      <h1 className="text-3xl font-extrabold text-primary">Account</h1>
      <p className="mb-4 text-ink/60">Keep progress across devices and see how a child is doing.</p>
      {children}
      <p className="mt-6 text-center text-xs font-bold text-ink/40"><Link to="/privacy">Privacy notice</Link></p>
    </div>
  )
}

// ---- signed out ------------------------------------------------------------------------------------------------
function SignedOut() {
  const [mode, setMode] = useState('in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adult, setAdult] = useState(false)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setMsg('')
    try {
      if (mode === 'up') {
        const r = await signUp(email.trim(), password)
        if (r.needsConfirmation) setMsg('Check your email for a link to confirm, then sign in.')
      } else await signIn(email.trim(), password)
    } catch (err) {
      setMsg(friendly(err))
    }
    setBusy(false)
  }

  return (
    <div className="card">
      <div className="mb-4 flex rounded-2xl bg-primary/10 p-1 text-sm font-extrabold">
        {[['in', 'Sign in'], ['up', 'Create account']].map(([k, label]) => (
          <button key={k} type="button" onClick={() => { setMode(k); setMsg('') }} className={`flex-1 rounded-xl py-2 ${mode === k ? 'bg-white text-primary shadow' : 'text-ink/50'}`}>{label}</button>
        ))}
      </div>
      <form onSubmit={submit} className="space-y-3">
        <label className="block text-sm font-bold text-ink/70">Parent's email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className="input-field mt-1" />
        </label>
        <label className="block text-sm font-bold text-ink/70">Password {mode === 'up' && <span className="font-normal text-ink/40">(at least 8 characters)</span>}
          <input type="password" required minLength={mode === 'up' ? 8 : 1} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === 'up' ? 'new-password' : 'current-password'} className="input-field mt-1" />
        </label>
        {mode === 'up' && (
          <label className="flex items-start gap-2 text-sm text-ink/70">
            <input type="checkbox" checked={adult} onChange={(e) => setAdult(e.target.checked)} className="mt-1" />
            <span>I am a parent or guardian aged 18 or over, and I have read the <Link to="/privacy" className="font-bold text-primary underline">privacy notice</Link>.</span>
          </label>
        )}
        <button type="submit" disabled={busy || (mode === 'up' && !adult)} className="btn-primary w-full">{busy ? 'Please wait…' : mode === 'up' ? 'Create account' : 'Sign in'}</button>
        {msg && <p className="text-center text-sm font-bold text-error">{msg}</p>}
      </form>
      <p className="mt-4 text-center text-xs text-ink/50">No account? Everything still works on this device — an account only adds saving across devices and the parent view.</p>
    </div>
  )
}

function friendly(err) {
  const m = String(err?.message ?? err)
  if (/invalid login/i.test(m)) return 'That email and password do not match.'
  if (/already registered|already been registered/i.test(m)) return 'That email already has an account — try signing in.'
  if (/rate limit|too many/i.test(m)) return 'Too many tries — please wait a minute.'
  if (/fetch|network/i.test(m)) return 'Could not reach the server. Check your connection and try again.'
  return m
}

// ---- signed in -------------------------------------------------------------------------------------------------
function Manage({ sync }) {
  const [learners, setLearners] = useState(null)
  const [err, setErr] = useState('')
  const [localTrack] = useTrack()
  const [name, setName] = useState('')
  const [track, setTrack] = useState(localTrack ?? 'older')
  const [useLocal, setUseLocal] = useState(true)
  const [busy, setBusy] = useState(false)
  const local = hasLocalProgress()

  const load = useCallback(() => listLearners().then(setLearners).catch((e) => setErr(friendly(e))), [])
  useEffect(() => { load() }, [load])

  const choose = async (id) => {
    setBusy(true)
    await selectLearner(id, local && useLocal ? 'merge' : 'replace')
    setBusy(false)
    load()
  }
  const add = async (e) => {
    e.preventDefault()
    setBusy(true)
    setErr('')
    try {
      const id = await addLearner(name, track)
      setName('')
      await selectLearner(id, local && useLocal ? 'merge' : 'replace')
      await load()
    } catch (e2) {
      setErr(friendly(e2))
    }
    setBusy(false)
  }
  const rename = async (l) => {
    const n = window.prompt('New name', l.name)
    if (n && n.trim()) {
      await renameLearner(l.id, n).catch((e) => setErr(friendly(e)))
      load()
    }
  }
  const remove = async (l) => {
    if (window.confirm(`Delete ${l.name} and all of their saved progress? This cannot be undone.`)) {
      await removeLearner(l.id).catch((e) => setErr(friendly(e)))
      load()
    }
  }
  const download = async () => {
    const data = { exported: new Date().toISOString(), email: sync.email, learners: await listLearners() }
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
    a.download = 'learn-bangla-my-data.json'
    a.click()
  }
  const out = async () => {
    if (window.confirm('Sign out? Your progress is saved in the account, and this device will start fresh.')) await signOut(true)
  }
  const del = async () => {
    const t = window.prompt('This permanently deletes your account, every learner and all their progress.\n\nType DELETE to confirm.')
    if (t?.trim() === 'DELETE') {
      try {
        await deleteAccount()
      } catch (e) {
        setErr(friendly(e))
      }
    }
  }

  const here = learners?.find((l) => l.id === sync.learnerId)
  return (
    <div className="space-y-4">
      <div className="card !p-4">
        <p className="text-sm text-ink/60">Signed in as</p>
        <p className="font-extrabold text-ink">{sync.email}</p>
        <p className="mt-2 text-sm font-bold">
          {sync.status === 'syncing' && <span className="text-ink/60">Saving…</span>}
          {sync.status === 'ok' && <span className="text-success">✓ Saved {ago(sync.at)}</span>}
          {sync.status === 'offline' && <span className="text-secondary">Offline — it will save when you are back online.</span>}
          {sync.status === 'error' && <span className="text-error">Could not save: {sync.error}</span>}
          {sync.status === 'idle' && <span className="text-ink/50">{sync.learnerId ? 'Ready.' : 'Pick who is learning on this device.'}</span>}
        </p>
        {sync.learnerId && (
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => push().then(() => pull())} className="rounded-2xl bg-white px-4 py-2 text-sm font-extrabold text-primary shadow">Sync now</button>
            <Link to="/parent" className="rounded-2xl bg-primary px-4 py-2 text-sm font-extrabold text-white shadow">Parent view →</Link>
          </div>
        )}
        {!sync.learnerId && learners?.length > 0 && <Link to="/parent" className="mt-3 inline-block text-sm font-extrabold text-primary">Parent view →</Link>}
      </div>

      <div className="card !p-4">
        <h2 className="text-xl font-extrabold text-ink">Learners</h2>
        {learners === null ? (
          <p className="mt-2 text-ink/50">Loading…</p>
        ) : learners.length === 0 ? (
          <p className="mt-2 text-sm text-ink/60">Add the first learner below.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {learners.map((l) => (
              <li key={l.id} className={`flex items-center gap-3 rounded-2xl px-3 py-3 ${l.id === sync.learnerId ? 'bg-success/10 ring-2 ring-success/40' : 'bg-primary/5'}`}>
                <span className="text-3xl">{tracks[l.track]?.emoji ?? '🙂'}</span>
                <span className="flex-1">
                  <span className="block font-extrabold text-ink">{l.name}</span>
                  <span className="block text-xs text-ink/50">{tracks[l.track] ? `${tracks[l.track].label} · ages ${tracks[l.track].ages}` : 'age group not chosen yet'}</span>
                </span>
                {l.id === sync.learnerId ? (
                  <span className="text-xs font-extrabold text-success">Learning here</span>
                ) : (
                  <button type="button" disabled={busy} onClick={() => choose(l.id)} className="rounded-xl bg-white px-3 py-2 text-sm font-extrabold text-primary shadow">Use here</button>
                )}
                <button type="button" onClick={() => rename(l)} className="text-xs font-bold text-ink/40 hover:text-ink/70" aria-label={`Rename ${l.name}`}>✎</button>
                <button type="button" onClick={() => remove(l)} className="text-xs font-bold text-error/50 hover:text-error" aria-label={`Delete ${l.name}`}>✕</button>
              </li>
            ))}
          </ul>
        )}

        {local && learners && (
          <label className="mt-3 flex items-start gap-2 text-xs text-ink/60">
            <input type="checkbox" checked={useLocal} onChange={(e) => setUseLocal(e.target.checked)} className="mt-0.5" />
            <span>This device already has progress. Add it to the learner I pick (untick to use only their saved progress and replace what is here).</span>
          </label>
        )}

        {learners && learners.length < 8 && (
          <form onSubmit={add} className="mt-4 border-t border-primary/10 pt-4">
            <p className="text-sm font-extrabold text-ink">Add a learner</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={40} required placeholder="First name or nickname" className="input-field !w-56" />
              <select value={track} onChange={(e) => setTrack(e.target.value)} className="input-field !w-auto">
                {TRACK_KEYS.map((k) => <option key={k} value={k}>{tracks[k].emoji} {tracks[k].label} · {tracks[k].ages}</option>)}
              </select>
              <button type="submit" disabled={busy || !name.trim()} className="btn-secondary !px-5 !py-3 text-base">Add</button>
            </div>
          </form>
        )}
        {here && <p className="mt-3 text-xs text-ink/40">This device is saving to {here.name}'s progress.</p>}
        {err && <p className="mt-2 text-sm font-bold text-error">{err}</p>}
      </div>

      <div className="card !p-4">
        <h2 className="text-xl font-extrabold text-ink">Your account</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={download} className="rounded-2xl bg-white px-4 py-2 text-sm font-extrabold text-primary shadow">Download my data</button>
          <button type="button" onClick={out} className="rounded-2xl bg-white px-4 py-2 text-sm font-extrabold text-ink/70 shadow">Sign out</button>
          <button type="button" onClick={del} className="rounded-2xl px-4 py-2 text-sm font-bold text-error/70 hover:text-error">Delete my account</button>
        </div>
      </div>
    </div>
  )
}
