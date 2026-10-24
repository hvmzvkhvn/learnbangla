import { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useProgress, useTrack } from '../state/persist'
import { useGame, today } from '../state/game'
import { gamePool } from '../curriculum/pools'
import { quickChoice } from '../curriculum/exercises'
import { shuffle } from '../curriculum/text'
import BlitzGame from '../components/games/BlitzGame'
import MemoryGame from '../components/games/MemoryGame'
import QuizRunner from '../components/games/QuizRunner'
import TypeItGame from '../components/games/TypeItGame'
import Confetti from '../components/Confetti'
import Toasts from '../components/Toasts'

const GAMES = [
  { key: 'daily', emoji: '📅', title: 'Daily Challenge', blurb: '8 questions, new every day. Double XP the first time.', color: 'bg-secondary text-white' },
  { key: 'blitz', emoji: '⚡', title: 'Word Blitz', blurb: '60 seconds. Answer fast and build a combo.', color: 'bg-primary text-white' },
  { key: 'memory', emoji: '🃏', title: 'Memory Match', blurb: 'Flip the cards and match each word to its meaning.', color: 'bg-ink text-white' },
  { key: 'type', emoji: '⌨️', title: 'Type It', blurb: 'Hear a word and type it in Bangla.', color: 'bg-success text-white' },
]

// A small deterministic shuffle so everyone gets the same words on the same day.
function seeded(seedStr) {
  let h = 2166136261
  for (const c of seedStr) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  return () => {
    h += 0x6d2b79f5
    let t = h
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function Play() {
  const { game: key } = useParams()
  if (!key) return <Hub />
  if (!GAMES.find((g) => g.key === key)) return <Navigate to="/play" replace />
  return <Runner key={key} gameKey={key} />
}

function Hub() {
  const { game, level } = useGame()
  const doneToday = Boolean(game.stats.daily?.[today()])
  return (
    <div className="py-2">
      <h1 className="text-3xl font-extrabold text-primary">Arcade</h1>
      <p className="mb-4 text-ink/60">Quick games to earn XP and keep your streak alive.</p>
      <div className="card mb-5 flex items-center justify-around text-center">
        <div><p className="text-2xl font-extrabold text-primary">Lv {level.level}</p><p className="text-xs font-bold text-ink/50">Level</p></div>
        <div><p className="text-2xl font-extrabold text-secondary">🔥 {game.streak}</p><p className="text-xs font-bold text-ink/50">Day streak</p></div>
        <div><p className="text-2xl font-extrabold text-ink">⚡ {game.stats.blitzBest}</p><p className="text-xs font-bold text-ink/50">Blitz best</p></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {GAMES.map((g) => (
          <Link key={g.key} to={`/play/${g.key}`} className={`flex items-center gap-4 rounded-3xl px-5 py-6 shadow-md transition active:scale-95 hover:brightness-110 ${g.color}`}>
            <span className="text-5xl">{g.emoji}</span>
            <span>
              <span className="block text-xl font-extrabold">{g.title}{g.key === 'daily' && doneToday ? ' ✓' : ''}</span>
              <span className="block text-sm font-semibold opacity-90">{g.blurb}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

function Runner({ gameKey }) {
  const navigate = useNavigate()
  const [trackKey] = useTrack()
  const { progress } = useProgress()
  const { game, act } = useGame()
  const [result, setResult] = useState(null)
  const [round, setRound] = useState(0)
  const meta = GAMES.find((g) => g.key === gameKey)
  const track = trackKey ?? 'teen'

  const wordPool = useMemo(() => gamePool(track, progress, ['word'], 12), [track, progress])
  const mixedPool = useMemo(() => gamePool(track, progress, ['word', 'sentence', 'letter', 'form'], 14), [track, progress])

  const daily = useMemo(() => {
    if (gameKey !== 'daily') return []
    const rnd = seeded(today())
    const items = [...mixedPool].sort((a, b) => a.id.localeCompare(b.id))
    const picked = items.map((it) => ({ it, r: rnd() })).sort((a, b) => a.r - b.r).map((x) => x.it)
    const out = []
    for (const it of picked) {
      const q = quickChoice(it, track)
      if (q) out.push(q)
      if (out.length === 8) break
    }
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameKey, mixedPool, track, round])

  function done(summary, xp, statsFn) {
    act({ xp, stats: statsFn })
    setResult({ ...summary, xp })
  }

  const again = () => {
    setResult(null)
    setRound((r) => r + 1)
  }

  let body = null
  if (result) {
    body = (
      <div className="animate-pop py-8 text-center">
        <Confetti />
        <p className="text-7xl">{meta.emoji}</p>
        <h1 className="mt-3 text-3xl font-extrabold text-primary">{result.headline}</h1>
        <p className="mt-2 text-ink/60">{result.line}</p>
        <p className="mt-4 text-2xl font-extrabold text-success">+{result.xp} XP</p>
        <div className="mx-auto mt-6 flex max-w-xs flex-col gap-3">
          {gameKey !== 'daily' && <button onClick={again} className="btn-primary">Play again</button>}
          <Link to="/play" className="btn-secondary">All games</Link>
        </div>
      </div>
    )
  } else if (gameKey === 'blitz') {
    body = (
      <BlitzGame
        key={round}
        pool={mixedPool}
        trackKey={track}
        seconds={60}
        onFinish={(r) =>
          done({ headline: `${r.score} points!`, line: `${r.correct} right · ${r.wrong} wrong · best combo x${r.bestCombo}` }, Math.round(r.score / 2) + 5, (s) => ({ blitzBest: Math.max(s.blitzBest, r.correct) }))
        }
      />
    )
  } else if (gameKey === 'memory') {
    body = (
      <MemoryGame
        key={round}
        pool={wordPool}
        onFinish={(r) =>
          done({ headline: 'All matched!', line: `${r.moves} moves in ${r.seconds} seconds` }, Math.max(15, 70 - r.moves * 4), (s) => ({ memoryBest: s.memoryBest === 0 ? r.moves : Math.min(s.memoryBest, r.moves) }))
        }
      />
    )
  } else if (gameKey === 'type') {
    body = (
      <TypeItGame key={round} pool={wordPool} onFinish={(r) => done({ headline: `${r.correct} of ${r.total}`, line: 'Words typed with no hints and no mistakes' }, r.correct * 10 + 10, (s) => s)} />
    )
  } else if (gameKey === 'daily') {
    const already = Boolean(game.stats.daily?.[today()])
    body = (
      <div>
        {already && <p className="mb-4 rounded-2xl bg-accent/30 px-4 py-3 text-center text-sm font-bold">You already did today's challenge — play it again for practice (no extra XP).</p>}
        <QuizRunner
          key={round}
          exercises={daily}
          label="Question"
          onFinish={(r) =>
            done(
              { headline: `${r.correct} of ${r.total}`, line: already ? 'Nice practice run!' : "Today's challenge complete — double XP!" },
              already ? 0 : r.correct * 15 + 30,
              (s) => (already ? s : { dailyDone: s.dailyDone + 1, daily: { ...s.daily, [today()]: r.correct } }),
            )
          }
        />
      </div>
    )
  }

  return (
    <div className="py-2">
      <Toasts />
      <div className="mb-4 flex items-center gap-3">
        <button type="button" onClick={() => navigate('/play')} className="rounded-full bg-white px-3 py-2 text-lg font-extrabold text-ink/50 shadow" aria-label="Back">←</button>
        <h1 className="text-2xl font-extrabold text-primary">{meta.emoji} {meta.title}</h1>
      </div>
      {body}
    </div>
  )
}
