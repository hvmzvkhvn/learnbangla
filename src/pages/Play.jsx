import { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useProgress, useTrack } from '../state/persist'
import { stageOf, today, useGame } from '../state/game'
import { gamePool } from '../curriculum/pools'
import { pictureQuestion, quickChoice } from '../curriculum/exercises'
import { featuresOf } from '../curriculum/features'
import { shuffle } from '../curriculum/text'
import BlitzGame from '../components/games/BlitzGame'
import MemoryGame from '../components/games/MemoryGame'
import QuizRunner from '../components/games/QuizRunner'
import TypeItGame from '../components/games/TypeItGame'
import GeoGame from '../components/games/GeoGame'
import Confetti from '../components/Confetti'
import Toasts from '../components/Toasts'

const GAMES = {
  daily: { emoji: '📅', kidEmoji: '🎈', title: 'Daily Challenge', kidTitle: 'Daily Treat', blurb: 'New questions every day. Double XP the first time.', color: 'bg-secondary text-white' },
  tap: { emoji: '👆', title: 'Tap the Picture', blurb: 'Listen, then tap the right picture. No timer — take your time!', color: 'bg-secondary text-white' },
  blitz: { emoji: '⚡', title: 'Word Blitz', blurb: 'Answer fast and build a combo before the clock runs out.', color: 'bg-primary text-white' },
  memory: { emoji: '🃏', title: 'Memory Match', blurb: 'Flip the cards and find the matching pairs.', color: 'bg-ink text-white' },
  geo: { emoji: '📍', title: 'Map Quiz', blurb: 'Tap, guess and match places on the map of Bangladesh.', color: 'bg-secondary text-white' },
  type: { emoji: '⌨️', title: 'Type It', blurb: 'Hear a word and type it in Bangla.', color: 'bg-success text-white' },
}

// A small deterministic shuffle so everyone gets the same questions on the same day.
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
  const [trackKey] = useTrack()
  const feat = featuresOf(trackKey)
  if (!key) return <Hub feat={feat} />
  if (!feat.arcade.includes(key)) return <Navigate to="/play" replace />
  return <Runner key={key} gameKey={key} />
}

function Hub({ feat }) {
  const { game, level } = useGame()
  const doneToday = Boolean(game.stats.daily?.[today()])
  const stage = stageOf(level.level)
  return (
    <div className="py-2">
      <h1 className="text-3xl font-extrabold text-primary">{feat.playful ? 'Play time!' : 'Arcade'}</h1>
      <p className="mb-4 text-ink/60">{feat.blitzSeconds ? 'Quick games to earn XP and keep your streak going.' : 'Fun games to earn XP — no timers, no rush.'}</p>
      <div className="card mb-5 flex items-center justify-around text-center">
        <div><p className="text-2xl font-extrabold text-primary">{feat.garden ? stage.emoji : '⚡'} Lv {level.level}</p><p className="text-xs font-bold text-ink/50">{feat.garden ? stage.name : 'Level'}</p></div>
        <div><p className="text-2xl font-extrabold text-secondary">🔥 {game.streak}</p><p className="text-xs font-bold text-ink/50">Day streak</p></div>
        {feat.arcade.includes('blitz') && <div><p className="text-2xl font-extrabold text-ink">⚡ {game.stats.blitzBest}</p><p className="text-xs font-bold text-ink/50">Blitz best</p></div>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {feat.arcade.map((k) => {
          const g = GAMES[k]
          return (
            <Link key={k} to={`/play/${k}`} className={`flex items-center gap-4 rounded-3xl px-5 shadow-md transition active:scale-95 hover:brightness-110 ${feat.garden ? 'py-8' : 'py-6'} ${g.color}`}>
              <span className={feat.garden ? 'text-6xl' : 'text-5xl'}>{feat.garden && g.kidEmoji ? g.kidEmoji : g.emoji}</span>
              <span>
                <span className="block text-xl font-extrabold">{feat.garden && g.kidTitle ? g.kidTitle : g.title}{k === 'daily' && doneToday ? ' ✓' : ''}</span>
                <span className="block text-sm font-semibold opacity-90">{g.blurb}</span>
              </span>
            </Link>
          )
        })}
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
  const track = trackKey ?? 'teen'
  const feat = featuresOf(track)
  const picture = track === 'young'
  const meta = GAMES[gameKey]

  const wordPool = useMemo(() => gamePool(track, progress, ['word'], 12), [track, progress])
  const visualPool = useMemo(() => gamePool(track, progress, ['word'], 8, (it) => it.visual), [track, progress])
  const mixedPool = useMemo(() => gamePool(track, progress, ['word', 'sentence', 'letter', 'form'], 14), [track, progress])

  const questionsFor = (pool, n, rnd) => {
    const items = [...pool].sort((a, b) => a.id.localeCompare(b.id))
    const picked = rnd ? items.map((it) => ({ it, r: rnd() })).sort((a, b) => a.r - b.r).map((x) => x.it) : shuffle(items)
    const out = []
    for (const it of picked) {
      const q = picture ? pictureQuestion(it) : quickChoice(it, track)
      if (q) out.push(q)
      if (out.length === n) break
    }
    return out
  }

  const daily = useMemo(() => (gameKey === 'daily' ? questionsFor(picture ? visualPool : mixedPool, picture ? 5 : 8, seeded(today())) : []), [gameKey, mixedPool, visualPool, track, round]) // eslint-disable-line react-hooks/exhaustive-deps
  const tap = useMemo(() => (gameKey === 'tap' ? questionsFor(visualPool, 10) : []), [gameKey, visualPool, round]) // eslint-disable-line react-hooks/exhaustive-deps

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
        <p className="text-7xl">{feat.garden && meta.kidEmoji ? meta.kidEmoji : meta.emoji}</p>
        <h1 className="mt-3 text-3xl font-extrabold text-primary">{result.headline}</h1>
        <p className="mt-2 text-ink/60">{result.line}</p>
        {feat.playful && <p className="mt-3 text-lg font-extrabold text-primary">⭐ Tara says: “Great playing!”</p>}
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
        seconds={feat.blitzSeconds || 60}
        onFinish={(r) => done({ headline: `${r.score} points!`, line: `${r.correct} right · ${r.wrong} wrong · best combo x${r.bestCombo}` }, Math.round(r.score / 2) + 5, (s) => ({ blitzBest: Math.max(s.blitzBest, r.correct) }))}
      />
    )
  } else if (gameKey === 'memory') {
    body = (
      <MemoryGame
        key={round}
        pool={picture ? visualPool : wordPool}
        mode={picture ? 'picture' : 'en'}
        pairs={picture ? 5 : 6}
        onFinish={(r) => done({ headline: 'All matched!', line: `${r.moves} moves in ${r.seconds} seconds` }, Math.max(15, 70 - r.moves * 4), (s) => ({ memoryBest: s.memoryBest === 0 ? r.moves : Math.min(s.memoryBest, r.moves) }))}
      />
    )
  } else if (gameKey === 'type') {
    body = <TypeItGame key={round} pool={wordPool} onFinish={(r) => done({ headline: `${r.correct} of ${r.total}`, line: 'Words typed with no hints and no mistakes' }, r.correct * 10 + 10, (s) => s)} />
  } else if (gameKey === 'geo') {
    body = (
      <GeoGame
        key={round}
        onFinish={(r) => done({ headline: `${r.correct} of ${r.total}`, line: 'Places you found first time' }, r.correct * 8 + 10, (s) => ({ geoBest: Math.max(s.geoBest ?? 0, r.correct) }))}
      />
    )
  } else if (gameKey === 'tap') {
    body = <QuizRunner key={round} exercises={tap} label="Picture" onFinish={(r) => done({ headline: `${r.correct} of ${r.total}`, line: 'Pictures you found first time' }, r.correct * 8 + 10, (s) => s)} />
  } else if (gameKey === 'daily') {
    const already = Boolean(game.stats.daily?.[today()])
    body = (
      <div>
        {already && <p className="mb-4 rounded-2xl bg-accent/30 px-4 py-3 text-center text-sm font-bold">You already did today's one — play it again for practice (no extra XP).</p>}
        <QuizRunner
          key={round}
          exercises={daily}
          label="Question"
          onFinish={(r) =>
            done(
              { headline: `${r.correct} of ${r.total}`, line: already ? 'Nice practice run!' : "Today's one is done — double XP!" },
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
        <h1 className="text-2xl font-extrabold text-primary">{feat.garden && meta.kidEmoji ? meta.kidEmoji : meta.emoji} {feat.garden && meta.kidTitle ? meta.kidTitle : meta.title}</h1>
      </div>
      {body}
    </div>
  )
}
