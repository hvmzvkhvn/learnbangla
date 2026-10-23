import { useMemo, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { findLesson, nextLessonId } from '../curriculum/tracks'
import { buildLesson } from '../curriculum/exercises'
import { useProgress } from '../state/persist'
import LearnCard from '../components/lesson/LearnCard'
import ChoiceQ from '../components/lesson/ChoiceQ'
import MatchQ from '../components/lesson/MatchQ'
import TilesQ from '../components/lesson/TilesQ'
import TraceQ from '../components/lesson/TraceQ'
import SoundToggle from '../components/SoundToggle'
import SceneView from '../components/lesson/SceneView'
import Speaker from '../components/Speaker'

const CHEERS = ['Great!', 'Yes!', 'Brilliant!', 'Well done!', 'Super!', 'You got it!']

export default function Lesson() {
  const { lessonId } = useParams()
  const found = findLesson(lessonId)
  if (!found) return <Navigate to="/" replace />
  return <Player key={lessonId} {...found} />
}

function Player({ lesson, unit, track }) {
  const navigate = useNavigate()
  const { complete } = useProgress()
  const built = useMemo(() => buildLesson(lesson, track.key), [lesson, track.key])

  const steps = useMemo(
    () => [
      { kind: 'intro' },
      ...(built.scene ? [{ kind: 'scene' }] : []),
      ...built.learn.map((item) => ({ kind: 'learn', item })),
      ...built.exercises.map((ex) => ({ kind: 'ex', ex })),
    ],
    [built],
  )
  const [i, setI] = useState(0)
  const [status, setStatus] = useState('idle') // idle | wrong | solved
  const clean = useRef({})
  const [finalStars, setFinalStars] = useState(null)

  const step = steps[i]
  const scored = built.exercises.filter((e) => e.type !== 'trace')

  function advance() {
    setStatus('idle')
    if (i + 1 < steps.length) {
      setI(i + 1)
      return
    }
    const right = scored.filter((e) => clean.current[e.id]).length
    const ratio = scored.length ? right / scored.length : 1
    const stars = ratio >= 0.9 ? 3 : ratio >= 0.7 ? 2 : 1
    complete(lesson.id, stars)
    setFinalStars(stars)
  }

  const solved = (id) => (isClean) => {
    clean.current[id] = isClean
    setStatus('solved')
  }

  if (finalStars !== null) {
    const next = nextLessonId(track.key, lesson.id)
    return (
      <Shell onClose={() => navigate('/')} progress={1}>
        <div className="py-10 text-center">
          <p className="text-7xl">{'⭐'.repeat(finalStars)}</p>
          <h1 className="mt-4 text-3xl font-extrabold text-primary">
            {finalStars === 3 ? 'Perfect!' : finalStars === 2 ? 'Well done!' : 'Nice work!'}
          </h1>
          <p className="mt-2 text-ink/60">
            You finished <b>{lesson.title}</b>.
            {finalStars < 3 && ' Try it again to earn more stars!'}
          </p>
          <div className="mx-auto mt-8 flex max-w-xs flex-col gap-3">
            {next && (
              <Link to={`/lesson/${next}`} className="btn-primary">
                Next lesson
              </Link>
            )}
            <Link to="/" className="btn-secondary">
              Back to my path
            </Link>
          </div>
        </div>
      </Shell>
    )
  }

  const cheer = CHEERS[i % CHEERS.length]

  return (
    <Shell onClose={() => navigate('/')} progress={i / steps.length}>
      {step.kind === 'intro' && (
        <div className="py-8 text-center">
          <p className="text-6xl">{lesson.emoji}</p>
          <p className="mt-3 text-sm font-extrabold uppercase tracking-wide text-ink/40">{unit.title}</p>
          <h1 className="text-3xl font-extrabold text-primary">{lesson.title}</h1>
          <p className="mt-2 text-ink/60">
            {lesson.kind === 'review'
              ? 'A mix of everything from this unit.'
              : lesson.kind === 'dialogue'
                ? `A conversation with ${built.scene.lines.length} lines`
                : lesson.kind === 'polite'
                  ? 'Learn who gets which "you"'
                  : `${built.learn.length} new thing${built.learn.length === 1 ? '' : 's'} to learn`}
          </p>
          {lesson.tip && <p className="mx-auto mt-5 max-w-sm rounded-2xl bg-accent/30 px-4 py-3 text-left text-sm font-semibold">💡 {lesson.tip}</p>}
          {lesson.rules && (
            <div className="mx-auto mt-4 max-w-sm space-y-2 text-left">
              {lesson.rules.map((r) => (
                <div key={r.who} className="card flex items-center gap-3 !p-3">
                  <span className="text-2xl">{r.emoji}</span>
                  <span className="flex-1 text-sm font-semibold text-ink/70">{r.who}</span>
                  <span className="font-bangla text-xl font-extrabold text-primary">{r.say}</span>
                  <Speaker inline size="sm" text={r.say} />
                </div>
              ))}
            </div>
          )}
          <button className="btn-primary mt-8 w-full max-w-xs" onClick={advance}>
            Let's go!
          </button>
        </div>
      )}

      {step.kind === 'scene' && (
        <div>
          <SceneView scene={built.scene} />
          <button className="btn-primary mt-6 w-full" onClick={advance}>
            Next
          </button>
        </div>
      )}

      {step.kind === 'learn' && (
        <div>
          <p className="mb-3 text-center text-sm font-extrabold uppercase tracking-wide text-ink/40">New</p>
          <LearnCard key={step.item.id} item={step.item} />
          <button className="btn-primary mt-6 w-full" onClick={advance}>
            Next
          </button>
        </div>
      )}

      {step.kind === 'ex' && (
        <div>
          {step.ex.type === 'choice' && <ChoiceQ key={step.ex.id} ex={step.ex} onSolved={solved(step.ex.id)} onWrong={() => setStatus('wrong')} />}
          {step.ex.type === 'match' && <MatchQ key={step.ex.id} ex={step.ex} onSolved={solved(step.ex.id)} onWrong={() => setStatus('wrong')} />}
          {step.ex.type === 'tiles' && <TilesQ key={step.ex.id} ex={step.ex} onSolved={solved(step.ex.id)} onWrong={() => setStatus('wrong')} />}
          {step.ex.type === 'trace' && <TraceQ key={step.ex.id} ex={step.ex} onSolved={() => advance()} />}

          {step.ex.type !== 'trace' && (
            <div className="mt-6 min-h-[5.5rem]">
              {status === 'wrong' && <p className="gentle-error text-center">Oops, not quite — try again!</p>}
              {status === 'solved' && (
                <>
                  <p className="mb-3 rounded-2xl bg-success/15 px-4 py-3 text-center text-lg font-extrabold text-success">{cheer}</p>
                  <button className="btn-primary w-full" onClick={advance}>
                    Continue
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </Shell>
  )
}

function Shell({ children, onClose, progress }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-xl px-5 pb-10 pt-4">
        <div className="mb-6 flex items-center gap-3">
          <button type="button" onClick={onClose} aria-label="Close lesson" className="rounded-full bg-white px-3 py-2 text-lg font-extrabold text-ink/50 shadow">
            ✕
          </button>
          <div className="h-4 flex-1 overflow-hidden rounded-full bg-primary/10">
            <div className="h-full rounded-full bg-success transition-all" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
          <SoundToggle />
        </div>
        {children}
      </div>
    </div>
  )
}
