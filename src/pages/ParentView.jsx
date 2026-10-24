import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import GrownUpGate from '../components/GrownUpGate'
import { accountsEnabled } from '../lib/supabaseClient'
import { bank } from '../curriculum/bank'
import { allLessons, tracks } from '../curriculum/tracks'
import { levelInfo } from '../state/game'
import { listLearners, useSync } from '../sync/engine'

const dayKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

function lastSeen(iso) {
  if (!iso) return 'not started yet'
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  return days <= 0 ? 'today' : days === 1 ? 'yesterday' : `${days} days ago`
}

export default function ParentView() {
  const sync = useSync()
  return (
    <div className="mx-auto max-w-2xl px-1 py-2">
      <h1 className="text-3xl font-extrabold text-primary">Parent view</h1>
      {!accountsEnabled ? (
        <p className="card mt-4 text-center text-ink/70">Accounts are not switched on for this copy of the app.</p>
      ) : !sync.ready ? (
        <p className="card mt-4 text-center text-ink/60">Loading…</p>
      ) : !sync.email ? (
        <div className="card mt-4 text-center">
          <p className="text-ink/70">Sign in to see how your learners are doing.</p>
          <Link to="/account" className="btn-primary mt-4 inline-flex">Sign in</Link>
        </div>
      ) : (
        <GrownUpGate why="Progress details are for parents and guardians."><Learners /></GrownUpGate>
      )}
    </div>
  )
}

function Learners() {
  const [learners, setLearners] = useState(null)
  const [err, setErr] = useState('')
  useEffect(() => {
    listLearners().then(setLearners).catch((e) => setErr(String(e.message ?? e)))
  }, [])
  if (err) return <p className="card mt-4 text-center text-error">{err}</p>
  if (!learners) return <p className="card mt-4 text-center text-ink/60">Loading…</p>
  if (!learners.length) return <p className="card mt-4 text-center text-ink/70">No learners yet. <Link to="/account" className="font-bold text-primary underline">Add one</Link>.</p>
  return <div className="mt-2 space-y-5">{learners.map((l) => <LearnerCard key={l.id} l={l} />)}</div>
}

function LearnerCard({ l }) {
  const g = l.state.game ?? {}
  const progress = l.state.progress ?? {}
  const track = tracks[l.track ?? l.state.track]
  const lessons = useMemo(() => (track ? allLessons(track.key) : []), [track])
  const done = lessons.filter((x) => progress[x.id]).length
  const lvl = levelInfo(g.xp ?? 0)
  const stars = Object.values(progress).reduce((n, p) => n + (p?.stars ?? 0), 0)
  const days = useMemo(() => {
    const out = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000)
      out.push({ key: dayKey(d), label: d.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 2), xp: g.activity?.[dayKey(d)] ?? 0 })
    }
    return out
  }, [g.activity])
  const max = Math.max(1, ...days.map((d) => d.xp))
  const trouble = useMemo(
    () =>
      Object.entries(l.state.srs ?? {})
        .filter(([id, s]) => bank.has(id) && ((s.miss ?? 0) >= 2 || (s.box === 0 && (s.miss ?? 0) >= 1)))
        .sort((a, b) => (b[1].miss ?? 0) - (a[1].miss ?? 0))
        .slice(0, 8)
        .map(([id, s]) => ({ item: bank.get(id), miss: s.miss })),
    [l.state.srs],
  )

  return (
    <section className="card !p-5">
      <div className="flex items-center gap-3">
        <span className="text-4xl">{track?.emoji ?? '🙂'}</span>
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold text-ink">{l.name}</h2>
          <p className="text-xs font-bold text-ink/50">{track ? `${track.label} · ages ${track.ages}` : 'Age group not chosen yet'} · last learned {lastSeen(g.last ? `${g.last}T12:00:00` : l.updated_at)}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
        <Stat big={`Lv ${lvl.level}`} small={`${(g.xp ?? 0).toLocaleString()} XP`} />
        <Stat big={`🔥 ${g.streak ?? 0}`} small={`day streak (best ${g.best ?? 0})`} />
        <Stat big={`${done}/${lessons.length || '–'}`} small="lessons done" />
        <Stat big={`⭐ ${stars}`} small={`${Object.keys(g.badges ?? {}).length} badges`} />
      </div>

      <h3 className="mt-5 text-sm font-extrabold uppercase tracking-wide text-ink/40">XP this week</h3>
      <div className="mt-2 flex h-24 items-end gap-2">
        {days.map((d) => (
          <div key={d.key} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex h-16 w-full items-end"><div className={`w-full rounded-t-lg ${d.xp ? 'bg-success' : 'bg-primary/10'}`} style={{ height: `${Math.max(d.xp ? 8 : 4, (d.xp / max) * 100)}%` }} title={`${d.xp} XP`} /></div>
            <span className="text-xs font-bold text-ink/50">{d.label}</span>
          </div>
        ))}
      </div>

      <h3 className="mt-5 text-sm font-extrabold uppercase tracking-wide text-ink/40">Needs more practice</h3>
      {trouble.length ? (
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {trouble.map(({ item, miss }) => (
            <li key={item.id} className="flex items-center gap-3 rounded-2xl bg-secondary/10 px-3 py-2">
              <span className="font-bangla text-2xl font-bold text-primary">{item.bn}</span>
              <span className="flex-1 text-sm"><span className="font-bold text-ink">{item.roman}</span>{item.en && <span className="text-ink/60"> · {item.en}</span>}</span>
              <span className="text-xs font-bold text-ink/40">{miss}×</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-ink/60">Nothing tricky so far — a good sign. As they practise, anything they keep getting wrong shows up here.</p>
      )}
    </section>
  )
}

const Stat = ({ big, small }) => (
  <div className="rounded-2xl bg-primary/5 px-2 py-3">
    <p className="text-xl font-extrabold text-primary">{big}</p>
    <p className="text-xs font-bold text-ink/50">{small}</p>
  </div>
)
