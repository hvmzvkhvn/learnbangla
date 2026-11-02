import VisualText from '../../art/VisualText'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PaintedBuild, { PaintedPiece } from './PaintedBuild'
import { paintedPieces, pieceDistractors } from '../../data/playbook/artwork'
import Speaker from '../Speaker'
import { speak, stop } from '../../audio/audio'
import { useRoman } from '../../state/roman'
import { useGame } from '../../state/game'

const shuffle = (a) => [...a].sort(() => Math.random() - 0.5)

/** Listen to the word, then tap the right picture in the tray to place it in the scene. */
export default function BuildScene({ task, backTo = '/playbook' }) {
  const { act, game } = useGame()
  const [romanOn] = useRoman()
  const [n, setN] = useState(0)
  const [misses, setMisses] = useState(0)
  const [wrong, setWrong] = useState(null)
  const [perfect, setPerfect] = useState(0)
  const [started, setStarted] = useState(false)
  const timers = useRef(new Set())
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current.clear() }
  const later = (fn, delay) => {
    const timer = setTimeout(() => { timers.current.delete(timer); fn() }, delay)
    timers.current.add(timer)
  }
  useEffect(() => () => { clearTimers(); stop() }, [])
  const done = n >= task.steps.length
  const step = task.steps[Math.min(n, task.steps.length - 1)]

  const tray = useMemo(() => {
    const pool = pieceDistractors(step.e)
    return shuffle([step.e, ...shuffle([...new Set(pool)]).slice(0, 3)])
  }, [step.e])

  const begin = () => {
    setStarted(true)
    later(() => speak(step.word.bn, { force: true }), 200)
  }
  const pick = (e) => {
    if (done || !started) return
    clearTimers()
    setWrong(null)
    if (e === step.e) {
      setPerfect((p) => p + (misses === 0 ? 1 : 0))
      setMisses(0)
      const next = n + 1
      setN(next)
      if (next >= task.steps.length) {
        const first = !game.stats.builds?.[task.id]
        act({ xp: first ? 15 : 3, stats: (s) => ({ builds: { ...(s.builds ?? {}), [task.id]: Date.now() } }) })
      } else {
        later(() => speak(task.steps[next].word.bn, { force: true }), 500)
      }
    } else {
      setMisses((m) => m + 1)
      setWrong(e)
      later(() => setWrong(null), 600)
      speak(step.word.bn, { force: true })
    }
  }
  const restart = () => {
    clearTimers()
    stop()
    setWrong(null)
    setN(0)
    setMisses(0)
    setPerfect(0)
    setStarted(true)
    later(() => speak(task.steps[0].word.bn, { force: true }), 200)
  }

  return (
    <div className="pb-activity">
      <div className="mb-3 flex items-center gap-3">
        <Link
          to={backTo}
          aria-label="Back"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-extrabold text-ink/70 shadow"
        >
          ←
        </Link>
        <h1 className="flex-1 truncate text-lg font-extrabold text-ink">
          {task.title.en} <span className="font-bangla text-primary">· {task.title.bn}</span>
        </h1>
        <span className="text-sm font-bold text-ink/70">
          {Math.min(n, task.steps.length)} / {task.steps.length}
        </span>
      </div>

      <PaintedBuild task={task} placed={n} />

      {!started ? (
        <div className="card mt-3 text-center">
          <p className="text-lg font-bold text-ink">Listen to each word, then tap the right picture to place it.</p>
          <button type="button" onClick={begin} className="btn-primary mt-3">
            <VisualText>▶</VisualText> Start
          </button>
        </div>
      ) : done ? (
        <div className="animate-pop card mt-3 text-center">
          <p className="text-5xl"><VisualText>🎉</VisualText></p>
          <h2 className="mt-1 text-xl font-extrabold text-primary">You built the scene!</h2>
          <p className="text-sm text-ink/75">
            {perfect} / {task.steps.length} right first time
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button type="button" onClick={restart} className="btn-secondary">
              ↺ Build it again
            </button>
            <Link to={backTo} className="btn-primary">
              More in the Playbook
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-3">
          <div className="flex items-center justify-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
            <span className="text-center">
              <span className="block font-bangla text-3xl font-extrabold text-primary">{step.word.bn}</span>
              {romanOn && <span className="block text-sm font-bold text-ink/70">{step.word.roman}</span>}
              {misses > 0 && <span className="block text-sm text-ink/70">{step.word.en}</span>}
            </span>
            <Speaker text={step.word.bn} size="lg" label="Hear the word" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {tray.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => pick(e)}
                className={`flex aspect-square items-center justify-center rounded-2xl bg-white text-4xl shadow transition active:scale-95 ${wrong === e ? 'animate-shake ring-2 ring-error' : ''}`}
                aria-label={`Place ${paintedPieces[e].label.toLowerCase()}`}
                data-e={e}
              >
                <PaintedPiece emoji={e} className="pb-tray-piece" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
