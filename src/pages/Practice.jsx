import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProgress, useTrack } from '../state/persist'
import { useGame } from '../state/game'
import { useDue } from '../state/srs'
import { featuresOf } from '../curriculum/features'
import { pictureQuestion, quickChoice } from '../curriculum/exercises'
import QuizRunner from '../components/games/QuizRunner'
import Confetti from '../components/Confetti'
import Toasts from '../components/Toasts'

/** "Review today": the things that are due again (wrong answers first), as a short quiz. */
export default function Practice() {
  const [trackKey] = useTrack()
  const track = trackKey ?? 'teen'
  const feat = featuresOf(track)
  const { progress } = useProgress()
  const { act } = useGame()
  const { items, dueCount } = useDue(track, progress, 10)
  const [qs, setQs] = useState(null) // frozen when the round starts, so answering doesn't reshuffle it
  const [result, setResult] = useState(null)

  const start = () => {
    const made = items.map((it) => (track === 'young' && it.visual ? pictureQuestion(it) : null) ?? quickChoice(it, track)).filter(Boolean)
    setResult(null)
    setQs(made)
  }

  if (result) {
    return (
      <div className="animate-pop py-8 text-center">
        <Confetti />
        <p className="text-7xl">{feat.garden ? '🧠' : '🔁'}</p>
        <h1 className="mt-3 text-3xl font-extrabold text-primary">{result.correct} of {result.total} first time</h1>
        <p className="mt-2 text-ink/60">The ones you missed will come back soon — that is how they stick.</p>
        {feat.playful && <p className="mt-3 text-lg font-extrabold text-primary">⭐ Tara says: “Great remembering!”</p>}
        <p className="mt-4 text-2xl font-extrabold text-success">+{result.xp} XP</p>
        <div className="mx-auto mt-6 flex max-w-xs flex-col gap-3">
          <Link to="/" className="btn-primary">Back home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-2">
      <Toasts />
      <h1 className="mb-1 text-3xl font-extrabold text-primary">Review today</h1>
      {qs ? (
        qs.length ? (
          <QuizRunner
            key={qs.map((q) => q.id).join()}
            exercises={qs}
            label="Review"
            onFinish={({ correct, total }) => {
              const xp = correct * 6 + 10
              act({ xp, stats: (s) => ({ reviews: (s.reviews ?? 0) + 1 }) })
              setResult({ correct, total, xp })
            }}
          />
        ) : (
          <p className="card mt-4 text-center text-ink/70">Nothing to review yet.</p>
        )
      ) : (
        <div className="card mt-4 text-center">
          {items.length ? (
            <>
              <p className="text-6xl">{feat.garden ? '🧠' : '🔁'}</p>
              <p className="mt-3 text-lg font-extrabold text-ink">
                {dueCount > 0 ? `${dueCount} ${dueCount === 1 ? 'thing is' : 'things are'} ready to practise again.` : 'Nothing is overdue — here is a quick refresher.'}
              </p>
              <p className="mt-1 text-sm text-ink/60">Words and letters you got wrong, or haven't seen for a while. {items.length} questions.</p>
              <button type="button" onClick={start} className="btn-primary mt-5 w-full">Start</button>
            </>
          ) : (
            <>
              <p className="text-6xl">🌱</p>
              <p className="mt-3 text-lg font-extrabold text-ink">Nothing to review yet.</p>
              <p className="mt-1 text-sm text-ink/60">Finish a lesson first — then the things you learned will show up here.</p>
              <Link to="/" className="btn-secondary mt-5 inline-block">Go to lessons</Link>
            </>
          )}
        </div>
      )}
    </div>
  )
}
