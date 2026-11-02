import DisplayPreferences from '../components/DisplayPreferences'
import VisualText from '../art/VisualText'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BADGES, stageOf, useGame } from '../state/game'
import { useProgress, useTrack } from '../state/persist'
import { allLessons, tracks } from '../curriculum/tracks'
import SaveCode from '../components/SaveCode'
import OfflineCard from '../components/OfflineCard'
import SaveStatus from '../components/SaveStatus'
import { resetProgress, reauthenticate, useSync } from '../sync/engine'
import AccountCard from '../components/AccountCard'

export default function Me() {
  const { game, level } = useGame()
  const navigate = useNavigate()
  const sync = useSync()
  const [resetOpen, setResetOpen] = useState(false),
    [scope, setScope] = useState('device'),
    [password, setPassword] = useState(''),
    [message, setMessage] = useState(''),
    [busy, setBusy] = useState(false)
  const [trackKey, setTrack] = useTrack()
  const { progress } = useProgress()
  const track = tracks[trackKey]
  const garden = Boolean(track?.features.garden)
  const stage = stageOf(level.level)
  const lessons = track ? allLessons(trackKey) : []
  const done = lessons.filter((l) => progress[l.id]).length
  const earned = BADGES.filter((b) => game.badges[b.id]).length

  const resetAll = async (e) => {
    e.preventDefault()
    setBusy(true)
    setMessage('')
    try {
      if (scope === 'account') await reauthenticate(password)
      await resetProgress(scope)
      setResetOpen(false)
      setPassword('')
      setMessage(
        scope === 'account'
          ? 'Account progress reset. Other devices will receive this reset when they sync.'
          : 'Started fresh on this device. Account progress is unchanged.',
      )
    } catch (err) {
      setMessage(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="py-2">
      <h1 className="mb-3 text-3xl font-bold text-primary">My learning</h1>
      <section className="card mb-5">
        <DisplayPreferences />
      </section>
      <div id="backup">
        <SaveStatus />
        <AccountCard />
        <SaveCode />
      </div>
      <details className="my-4 rounded-2xl border border-primary/20 p-4">
        <summary className="cursor-pointer font-bold">Offline downloads & installation</summary>
        <OfflineCard />
      </details>
      <button
        type="button"
        onClick={() => {
          setTrack(null)
          navigate('/')
        }}
        className="mb-4 font-bold underline"
      >
        Change age group or starting level
      </button>
      <p role="status">{message}</p>
      <div className="card mb-5 text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-muted">
          <VisualText>{track ? `${track.emoji} ${track.label} · ages ${track.ages}` : ''}</VisualText>
        </p>
        {garden ? (
          <>
            <p className="animate-pop mt-1 text-7xl">
              <VisualText>{stage.emoji}</VisualText>
            </p>
            <p className="text-3xl font-bold text-primary">{stage.name}</p>
            <p className="text-sm font-bold text-muted">Your garden · Level {level.level}</p>
          </>
        ) : (
          <p className="mt-1 text-5xl font-bold text-primary">Level {level.level}</p>
        )}
        <div className="mx-auto mt-3 h-4 max-w-sm overflow-hidden rounded-full bg-primary/10">
          <div className="h-full rounded-full bg-success transition-all" style={{ width: `${level.pct * 100}%` }} />
        </div>
        <p className="mt-1 text-xs font-bold text-muted">
          {level.into} / {level.need} XP to level {level.level + 1} · {game.xp} XP total
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-secondary/10 py-3">
            <p className="text-2xl font-bold text-secondary">
              <VisualText>🔥</VisualText> {game.streak}
            </p>
            <p className="text-xs font-bold text-muted">Day streak</p>
          </div>
          <div className="rounded-2xl bg-primary/10 py-3">
            <p className="text-2xl font-bold text-primary">{done}</p>
            <p className="text-xs font-bold text-muted">of {lessons.length} lessons</p>
          </div>
          <div className="rounded-2xl bg-accent/40 py-3">
            <p className="text-2xl font-bold text-ink">{earned}</p>
            <p className="text-xs font-bold text-muted">
              of {BADGES.length} {garden ? 'stickers' : 'badges'}
            </p>
          </div>
        </div>
      </div>

      <details>
        <summary className="mb-3 cursor-pointer text-xl font-bold">
          {garden ? 'My stickers' : 'Badges'} · {earned} earned
        </summary>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {BADGES.map((b) => {
            const got = Boolean(game.badges[b.id])
            return (
              <div key={b.id} className={`card flex flex-col items-center !p-4 text-center ${got ? '' : 'opacity-50 grayscale'}`}>
                <span className={garden ? 'text-5xl' : 'text-4xl'}>
                  <VisualText>{got ? b.emoji : '🔒'}</VisualText>
                </span>
                <p className="mt-1 font-bold text-ink">{b.title}</p>
                <p className="text-xs text-muted">{b.desc}</p>
              </div>
            )
          })}
        </div>
      </details>

      {resetOpen && (
        <form className="card mt-5" onSubmit={resetAll}>
          <h2 className="text-xl font-bold">Reset progress</h2>
          <p className="my-2">Choose where to start fresh. Copy a save code first if you want to restore this progress later.</p>
          <label className="block">
            <input type="radio" name="resetScope" checked={scope === 'device'} onChange={() => setScope('device')} /> This device only
            (disconnects it from the selected learner)
          </label>
          {sync.learnerId && (
            <label className="block mt-2">
              <input type="radio" name="resetScope" checked={scope === 'account'} onChange={() => setScope('account')} /> This learner on
              every device
            </label>
          )}
          {scope === 'account' && (
            <label className="block mt-3">
              Current account password
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </label>
          )}
          <button disabled={busy} className="btn-primary mt-3">
            Confirm reset
          </button>
          <button
            type="button"
            className="ml-3 underline"
            onClick={() => {
              setResetOpen(false)
              setPassword('')
            }}
          >
            Cancel
          </button>
        </form>
      )}
      <div className="mt-8 flex flex-col items-center gap-2 text-sm font-bold text-muted">
        <Link to="/review" className="hover:text-muted">
          For content reviewers →
        </Link>
        <button type="button" onClick={() => setResetOpen(true)} className="text-error hover:text-error">
          Reset my progress
        </button>
      </div>
    </div>
  )
}
