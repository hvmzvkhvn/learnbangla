import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GrownUpGate from '../components/GrownUpGate'
import { accountsEnabled } from '../lib/supabaseClient'
import { tracks } from '../curriculum/tracks'
import { useTrack } from '../state/persist'
import {
  addLearner,
  deleteAccount,
  hasLocalProgress,
  listLearners,
  push,
  removeLearner,
  renameLearner,
  selectLearner,
  signIn,
  signOut,
  signUp,
  useSync,
  requestPasswordReset,
  resendConfirmation,
  updatePassword,
} from '../sync/engine'

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
  if (!accountsEnabled)
    return (
      <Shell>
        <p className="card text-center text-ink/70">
          Accounts are not switched on for this copy of the app. Everything still works on this device.
        </p>
      </Shell>
    )
  if (!sync.ready)
    return (
      <Shell>
        <p className="card text-center text-ink/75">Loading…</p>
      </Shell>
    )
  if (sync.recovery)
    return (
      <Shell>
        <Recovery />
      </Shell>
    )
  return (
    <Shell>
      {sync.email ? (
        <GrownUpGate why="Managing the account is for parents and guardians.">
          <Manage sync={sync} />
        </GrownUpGate>
      ) : (
        <SignedOut />
      )}
    </Shell>
  )
}

function Shell({ children }) {
  return (
    <div className="mx-auto max-w-xl px-1 py-2">
      <h1 className="text-3xl font-extrabold text-primary">Account</h1>
      <p className="mb-4 text-ink/75">Keep progress across devices and see how a child is doing.</p>
      {children}
      <p className="mt-6 text-center text-xs font-bold text-ink/70">
        <Link to="/privacy">Privacy notice</Link>
      </p>
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
        {[
          ['in', 'Sign in'],
          ['up', 'Create account'],
        ].map(([k, label]) => (
          <button
            key={k}
            type="button"
            onClick={() => {
              setMode(k)
              setMsg('')
            }}
            className={`flex-1 rounded-xl py-2 ${mode === k ? 'bg-white text-primary shadow' : 'text-ink/70'}`}
          >
            {label}
          </button>
        ))}
      </div>
      <form onSubmit={submit} className="space-y-3">
        <label className="block text-sm font-bold text-ink/70">
          Your email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="input-field mt-1"
          />
        </label>
        <label className="block text-sm font-bold text-ink/70">
          Password {mode === 'up' && <span className="font-normal text-ink/70">(at least 8 characters)</span>}
          <input
            type="password"
            required
            minLength={mode === 'up' ? 8 : 1}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === 'up' ? 'new-password' : 'current-password'}
            className="input-field mt-1"
          />
        </label>
        {mode === 'up' && (
          <label className="flex items-start gap-2 text-sm text-ink/70">
            <input type="checkbox" checked={adult} onChange={(e) => setAdult(e.target.checked)} className="mt-1" />
            <span>
              I am aged 18 or over, acting for myself or as a parent or guardian, and I have read the{' '}
              <Link to="/privacy" className="font-bold text-primary underline">
                privacy notice
              </Link>
              .
            </span>
          </label>
        )}
        <button type="submit" disabled={busy || (mode === 'up' && !adult)} className="btn-primary w-full">
          {busy ? 'Please wait…' : mode === 'up' ? 'Create account' : 'Sign in'}
        </button>
        {msg && (
          <p role="status" className="text-center text-sm font-bold">
            {msg}
          </p>
        )}
        <div className="flex flex-wrap gap-4 text-sm">
          <button
            type="button"
            className="underline"
            disabled={busy || !email.includes('@')}
            onClick={async () => {
              setBusy(true)
              try {
                await requestPasswordReset(email.trim())
                setMsg('If this email has an account, a reset link is on its way.')
              } catch (e) {
                setMsg(friendly(e))
              } finally {
                setBusy(false)
              }
            }}
          >
            Forgot password?
          </button>
          <button
            type="button"
            className="underline"
            disabled={busy || !email.includes('@')}
            onClick={async () => {
              setBusy(true)
              try {
                await resendConfirmation(email.trim())
                setMsg('If confirmation is needed, check your email for a new link.')
              } catch (e) {
                setMsg(friendly(e))
              } finally {
                setBusy(false)
              }
            }}
          >
            Resend confirmation
          </button>
        </div>
      </form>
      <p className="mt-4 text-center text-xs text-ink/70">
        No account? Everything still works on this device — an account only adds saving across devices and the parent view.
      </p>
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
  const [useLocal, setUseLocal] = useState(false)
  const [destructive, setDestructive] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const local = hasLocalProgress()

  const load = useCallback(
    () =>
      listLearners()
        .then(setLearners)
        .catch((e) => setErr(friendly(e))),
    [],
  )
  useEffect(() => {
    load()
  }, [load])

  const choose = async (id) => {
    setBusy(true)
    try {
      await selectLearner(id, local && useLocal && !sync.learnerId ? 'merge' : 'replace')
      await load()
    } catch (e) {
      setErr(friendly(e))
    } finally {
      setBusy(false)
    }
  }
  const add = async (e) => {
    e.preventDefault()
    setBusy(true)
    setErr('')
    try {
      const id = await addLearner(name, track)
      setName('')
      await selectLearner(id, local && useLocal && !sync.learnerId ? 'merge' : 'replace')
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
  const remove = (l) => {
    setConfirmPassword('')
    setDestructive(l)
  }
  const download = async () => {
    const data = { exported: new Date().toISOString(), email: sync.email, learners: await listLearners() }
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
    a.download = 'learn-bangla-my-data.json'
    a.click()
  }
  const out = async () => {
    try {
      await signOut(true)
    } catch (e) {
      setErr('Sign-out paused: ' + friendly(e) + ' Your local progress has been kept.')
    }
  }
  const del = () => {
    setConfirmPassword('')
    setDestructive({ account: true })
  }
  const confirmDelete = async (e) => {
    e.preventDefault()
    setBusy(true)
    setErr('')
    try {
      if (destructive.account) await deleteAccount(confirmPassword)
      else await removeLearner(destructive.id, confirmPassword)
      setDestructive(null)
      setConfirmPassword('')
      await load()
    } catch (e) {
      setErr(friendly(e))
    } finally {
      setBusy(false)
    }
  }

  const here = learners?.find((l) => l.id === sync.learnerId)
  return (
    <div className="space-y-4">
      {destructive && (
        <form onSubmit={confirmDelete} className="card border-2 border-error" aria-label="Confirm deletion">
          <h2 className="text-xl font-bold">Delete {destructive.account ? 'your account and every learner' : destructive.name}?</h2>
          <p>This permanently removes saved progress. Enter your password to confirm your identity.</p>
          <label className="block mt-3">
            Current password
            <input
              type="password"
              autoComplete="current-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
            />
          </label>
          <button disabled={busy} className="btn-primary mt-3">
            Permanently delete
          </button>
          <button
            type="button"
            className="ml-3 underline"
            onClick={() => {
              setDestructive(null)
              setConfirmPassword('')
            }}
          >
            Cancel
          </button>
        </form>
      )}
      <div className="card !p-4">
        <p className="text-sm text-ink/75">Signed in as</p>
        <p className="font-extrabold text-ink">{sync.email}</p>
        <p className="mt-2 text-sm font-bold">
          {sync.status === 'syncing' && <span className="text-ink/75">Saving…</span>}
          {sync.status === 'ok' && <span className="text-success">✓ Saved {ago(sync.at)}</span>}
          {sync.status === 'offline' && <span className="text-secondary">Offline — it will save when you are back online.</span>}
          {sync.status === 'error' && <span className="text-error">Could not save: {sync.error}</span>}
          {sync.status === 'idle' && (
            <span className="text-ink/70">{sync.learnerId ? 'Ready.' : 'Pick who is learning on this device.'}</span>
          )}
        </p>
        {sync.learnerId && (
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => push().catch((e) => setErr(friendly(e)))}
              className="rounded-2xl bg-white px-4 py-2 text-sm font-extrabold text-primary shadow"
            >
              Sync now
            </button>
            <Link to="/parent" className="rounded-2xl bg-primary px-4 py-2 text-sm font-extrabold text-white shadow">
              Parent view →
            </Link>
          </div>
        )}
        {!sync.learnerId && learners?.length > 0 && (
          <Link to="/parent" className="mt-3 inline-block text-sm font-extrabold text-primary">
            Parent view →
          </Link>
        )}
      </div>

      <div className="card !p-4">
        <h2 className="text-xl font-extrabold text-ink">Learners</h2>
        {learners === null ? (
          <p className="mt-2 text-ink/70">Loading…</p>
        ) : learners.length === 0 ? (
          <p className="mt-2 text-sm text-ink/75">Add the first learner below.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {learners.map((l) => (
              <li
                key={l.id}
                className={`flex items-center gap-3 rounded-2xl px-3 py-3 ${l.id === sync.learnerId ? 'bg-success/10 ring-2 ring-success/40' : 'bg-primary/5'}`}
              >
                <span className="text-3xl">{tracks[l.track]?.emoji ?? '🙂'}</span>
                <span className="flex-1">
                  <span className="block font-extrabold text-ink">{l.name}</span>
                  <span className="block text-xs text-ink/70">
                    {tracks[l.track] ? `${tracks[l.track].label} · ages ${tracks[l.track].ages}` : 'age group not chosen yet'}
                  </span>
                </span>
                {l.id === sync.learnerId ? (
                  <span className="text-xs font-extrabold text-success">Learning here</span>
                ) : (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => choose(l.id)}
                    className="rounded-xl bg-white px-3 py-2 text-sm font-extrabold text-primary shadow"
                  >
                    Use here
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => rename(l)}
                  className="text-xs font-bold text-ink/70 hover:text-ink/70"
                  aria-label={`Rename ${l.name}`}
                >
                  ✎
                </button>
                <button
                  type="button"
                  onClick={() => remove(l)}
                  className="text-xs font-bold text-error/50 hover:text-error"
                  aria-label={`Delete ${l.name}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        {local && learners && !sync.learnerId && (
          <label className="mt-3 flex items-start gap-2 text-xs text-ink/75">
            <input type="checkbox" checked={useLocal} onChange={(e) => setUseLocal(e.target.checked)} className="mt-0.5" />
            <span>
              This device already has progress. Add it to the learner I pick (untick to use only their saved progress and replace what is
              here).
            </span>
          </label>
        )}

        {learners && learners.length < 8 && (
          <form onSubmit={add} className="mt-4 border-t border-primary/10 pt-4">
            <p className="text-sm font-extrabold text-ink">Add a learner</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
                required
                placeholder="First name or nickname"
                className="input-field !w-56"
              />
              <select value={track} onChange={(e) => setTrack(e.target.value)} className="input-field !w-auto">
                {TRACK_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {tracks[k].emoji} {tracks[k].label} · {tracks[k].ages}
                  </option>
                ))}
              </select>
              <button type="submit" disabled={busy || !name.trim()} className="btn-secondary !px-5 !py-3 text-base">
                Add
              </button>
            </div>
          </form>
        )}
        {here && <p className="mt-3 text-xs text-ink/70">This device is saving to {here.name}'s progress.</p>}
        {err && (
          <p role="alert" className="mt-2 text-sm font-bold text-error">
            {err}
          </p>
        )}
      </div>

      <div className="card !p-4">
        <h2 className="text-xl font-extrabold text-ink">Your account</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={download} className="rounded-2xl bg-white px-4 py-2 text-sm font-extrabold text-primary shadow">
            Download my data
          </button>
          <button type="button" onClick={out} className="rounded-2xl bg-white px-4 py-2 text-sm font-extrabold text-ink/70 shadow">
            Sign out
          </button>
          <button type="button" onClick={del} className="rounded-2xl px-4 py-2 text-sm font-bold text-error/70 hover:text-error">
            Delete my account
          </button>
        </div>
      </div>
    </div>
  )
}

function Recovery() {
  const [password, setPassword] = useState(''),
    [message, setMessage] = useState(''),
    [busy, setBusy] = useState(false)
  return (
    <form
      className="card"
      onSubmit={async (e) => {
        e.preventDefault()
        setBusy(true)
        try {
          await updatePassword(password)
          setPassword('')
        } catch (err) {
          setMessage(friendly(err))
        } finally {
          setBusy(false)
        }
      }}
    >
      <h2 className="text-xl font-bold">Choose a new password</h2>
      <label className="block mt-3">
        New password (at least 8 characters)
        <input
          className="input-field"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button disabled={busy} className="btn-primary mt-3">
        Save password
      </button>
      <p role="status">{message}</p>
    </form>
  )
}
