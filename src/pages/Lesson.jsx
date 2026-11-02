import VisualText from '../art/VisualText'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { findLesson, nextLessonId } from '../curriculum/tracks'
import { buildLesson } from '../curriculum/exercises'
import { useProgress } from '../state/persist'
import { stageOf, useGame } from '../state/game'
import { recordAnswer } from '../state/srs'
import LearnCard from '../components/lesson/LearnCard'
import ChoiceQ from '../components/lesson/ChoiceQ'
import MatchQ from '../components/lesson/MatchQ'
import TilesQ from '../components/lesson/TilesQ'
import TraceQ from '../components/lesson/TraceQ'
import TypeQ from '../components/lesson/TypeQ'
import SceneView from '../components/lesson/SceneView'
import TextView from '../components/lesson/TextView'
import BlitzGame from '../components/games/BlitzGame'
import SoundToggle from '../components/SoundToggle'
import RomanToggle from '../components/RomanToggle'
import { NoRoman } from '../state/roman'
import Speaker from '../components/Speaker'
import Confetti from '../components/Confetti'
import SaveStatus from '../components/SaveStatus'
import { getLessonSession, saveLessonSession, clearLessonSession, lessonMinutes, recordDuration } from '../state/learning'
import Toasts from '../components/Toasts'

const CHEERS = ['Great!', 'Yes!', 'Brilliant!', 'Well done!', 'Super!', 'You got it!']

export default function Lesson() {
  const { lessonId } = useParams()
  const found = findLesson(lessonId)
  if (!found) return <Navigate to="/" replace />
  if (found.lesson.kind === 'story') return <Navigate to={`/story/${found.lesson.storyId}`} replace />
  return (
    <NoRoman.Provider value={found.lesson.kind === 'super'}>
      <ResumeLesson key={lessonId} {...found} />
    </NoRoman.Provider>
  )
}

function ResumeLesson(props) {
  const [saved, setSaved] = useState(() => getLessonSession(props.lesson.id))
  const [start, setStart] = useState(!saved || saved.i === 0 || Boolean(saved.result))
  if (!start)
    return (
      <Shell
        onClose={() => {
          location.href = '/'
        }}
        progress={0}
      >
        <div className="card text-center">
          <h1 className="text-2xl font-bold">Continue {props.lesson.title}?</h1>
          <p className="my-4">Your lesson and question order are saved. An unfinished question starts again.</p>
          <button className="btn-primary w-full" onClick={() => setStart(true)}>
            Resume lesson
          </button>
          <button
            className="mt-4 underline"
            onClick={() => {
              clearLessonSession(props.lesson.id)
              setSaved(null)
              setStart(true)
            }}
          >
            Start again
          </button>
        </div>
      </Shell>
    )
  return <Player {...props} saved={saved?.result ? null : saved} />
}

function Player({ lesson, unit, track, saved }) {
  const navigate = useNavigate()
  const feat = track.features
  const xpOn = feat.xp
  const playful = feat.playful
  const { progress, complete } = useProgress()
  const { act, level } = useGame()
  const [built] = useState(() => saved?.built ?? buildLesson(lesson, track.key))

  const steps = useMemo(
    () => [
      { kind: 'intro' },
      ...(built.scene ? [{ kind: 'scene' }] : []),
      ...(built.text ? [{ kind: 'text' }] : []),
      ...(lesson.kind === 'boss' ? [{ kind: 'boss' }] : []),
      ...built.learn.map((item) => ({ kind: 'learn', item })),
      ...built.exercises.map((ex) => ({ kind: 'ex', ex })),
    ],
    [built, lesson.kind],
  )
  const [i, setI] = useState(saved?.i ?? 0)
  const [status, setStatus] = useState(saved?.status ?? 'idle') // idle | wrong | solved
  const clean = useRef(saved?.clean ?? {})
  const started = useRef(null)
  useEffect(() => {
    started.current = Date.now()
  }, [])
  const [combo, setCombo] = useState(0)
  const [gain, setGain] = useState(null)
  const [sessionXp, setSessionXp] = useState(saved?.sessionXp ?? 0)
  const [result, setResult] = useState(null) // { stars, bonus, extra }

  useEffect(() => {
    saveLessonSession(lesson.id, { built, i, status, clean: clean.current, sessionXp, result, elapsedMs: (saved?.elapsedMs ?? 0) + Date.now() - (started.current ?? Date.now()), at: Date.now() })
  }, [lesson.id, built, i, status, sessionXp, result, saved?.elapsedMs])
  const duration = lessonMinutes(lesson.id, steps.length)
  const step = steps[i] ?? steps[0]
  const scored = built.exercises.filter((e) => e.type !== 'trace')

  function finish(stars, extraXp = 0) {
    if (result) return
    recordDuration(lesson.id, ((saved?.elapsedMs ?? 0) + Date.now() - (started.current ?? Date.now())) / 1000)
    const first = !progress[lesson.id]
    complete(lesson.id, stars)
    let bonus = 0
    if (xpOn) {
      bonus = 20 + stars * 10 + (first ? 10 : 0) + extraXp + (lesson.treasure ? 15 : 0) + (lesson.kind === 'super' ? 40 : 0)
      act({
        xp: bonus,
        stats: (s) => ({
          lessons: s.lessons + (first ? 1 : 0),
          perfect: s.perfect + (stars === 3 ? 1 : 0),
          bosses: s.bosses + (lesson.kind === 'boss' ? 1 : 0),
          ...(lesson.kind === 'super' && stars >= 2 ? { supers: { ...(s.supers ?? {}), [lesson.id]: stars } } : {}),
        }),
      })
    }
    setResult({ stars, bonus })
  }

  function advance() {
    setStatus('idle')
    if (i + 1 < steps.length) {
      setI(i + 1)
      return
    }
    const right = scored.filter((e) => clean.current[e.id]).length
    const ratio = scored.length ? right / scored.length : 1
    finish(ratio >= 0.9 ? 3 : ratio >= 0.7 ? 2 : 1)
  }

  const solved = (ex) => (isClean) => {
    if (Object.hasOwn(clean.current, ex.id)) {
      setStatus('solved')
      return
    }
    clean.current[ex.id] = isClean
    recordAnswer(ex.itemId, isClean)
    setStatus('solved')
    if (!xpOn) return
    const c = isClean ? combo + 1 : 0
    setCombo(c)
    const g = (isClean ? 10 : 4) + (isClean && c >= 3 ? Math.min(10, (c - 2) * 2) : 0)
    setSessionXp((x) => x + g)
    setGain({ id: Math.random(), g })
    act({ xp: g })
  }
  const wrong = () => {
    setStatus('wrong')
    setCombo(0)
    navigator.vibrate?.(60)
  }

  const traceDone = (stars) => {
    if (xpOn) {
      const g = 3 + stars * 3
      setSessionXp((x) => x + g)
      setGain({ id: Math.random(), g })
      act({ xp: g })
    }
    advance()
  }

  const bar = xpOn ? (
    <div className="flex items-center gap-2">
      {combo >= 2 && <span className="animate-pop rounded-full bg-secondary px-3 py-1 text-sm font-extrabold text-white"><VisualText>🔥</VisualText> x{combo}</span>}
      <span className="relative rounded-full bg-accent px-3 py-1 text-sm font-extrabold">
        <VisualText>⚡</VisualText> {sessionXp}
        {gain && (
          <span
            key={gain.id}
            className="animate-floatUp pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 text-sm font-extrabold text-success"
          >
            +{gain.g}
          </span>
        )}
      </span>
    </div>
  ) : null

  // ---- result screen ------------------------------------------------------------------------------
  if (result) {
    const next = nextLessonId(track.key, lesson.id)
    return (
      <Shell onClose={() => navigate('/')} progress={1} hideRoman={lesson.kind === 'super'}>
        {result.stars >= 2 && <Confetti />}
        <Toasts />
        <div className="py-10 text-center">
          {lesson.treasure && <p className="animate-pop text-8xl"><VisualText>🎁</VisualText></p>}
          <p className="animate-pop text-7xl"><VisualText>{'⭐'.repeat(result.stars)}</VisualText></p>
          <h1 className="mt-4 text-3xl font-extrabold text-primary">
            {lesson.treasure
              ? 'Treasure found!'
              : lesson.kind === 'super'
                ? result.stars >= 2
                  ? 'Super! You did it!'
                  : 'Tough one! Try again'
                : lesson.kind === 'boss'
                  ? result.stars >= 2
                    ? 'Boss defeated!'
                    : 'You survived!'
                  : result.stars === 3
                    ? 'Perfect!'
                    : result.stars === 2
                      ? 'Well done!'
                      : 'Nice work!'}
          </h1>
          <p className="mt-2 text-ink/75">
            You finished <b>{lesson.title}</b>.{result.stars < 3 && ' Try it again to earn more stars!'}
          </p>
          {playful && (
            <p className="mt-3 text-lg font-extrabold text-primary">
              <VisualText>⭐</VisualText> Tara says: “{result.stars === 3 ? 'Wonderful!' : result.stars === 2 ? 'Well done!' : 'Great try!'}”
            </p>
          )}
          <div className="card mt-5 text-left">
            <h2 className="text-xl font-bold">What you practised</h2>
            <p className="mt-2" lang="bn">
              {[
                ...new Set(
                  [...(built.learn ?? []), ...(built.scene?.lines ?? []), ...(built.text?.lines ?? [])].map((it) => it.bn).filter(Boolean),
                ),
              ]
                .slice(0, 6)
                .join(' · ') || lesson.title}
            </p>
            <p className="mt-2">{scored.filter((ex) => clean.current[ex.id] === false).length} questions need another look.</p>
            <Link to="/practice" className="mt-3 inline-block font-bold underline">
              Review what needs practice
            </Link>
          </div>
          <SaveStatus />
          {xpOn && (
            <div className="mx-auto mt-5 max-w-xs rounded-3xl bg-white p-4 text-left shadow-md">
              <div className="flex justify-between text-sm font-extrabold">
                <span>XP this lesson</span>
                <span className="text-success">+{sessionXp + result.bonus}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm font-bold text-ink/75">
                <span><VisualText>{feat.garden ? `${stageOf(level.level).emoji} ${stageOf(level.level).name}` : `Level ${level.level}`}</VisualText></span>
                <span>
                  {level.into}/{level.need} XP
                </span>
              </div>
              <div className="mt-1 h-3 overflow-hidden rounded-full bg-primary/10">
                <div className="h-full rounded-full bg-success transition-all" style={{ width: `${level.pct * 100}%` }} />
              </div>
            </div>
          )}
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
  const common = (ex) => ({ ex, onSolved: solved(ex), onWrong: wrong })

  return (
    <Shell onClose={() => navigate('/')} progress={i / steps.length} extra={bar} hideRoman={lesson.kind === 'super'}>
      <Toasts />
      {step.kind === 'intro' && (
        <div className="py-8 text-center">
          <p className="animate-pop text-6xl"><VisualText>{lesson.emoji}</VisualText></p>
          <p className="mt-3 text-sm font-extrabold uppercase tracking-wide text-ink/70">{unit.title}</p>
          <h1 className="text-3xl font-extrabold text-primary">{lesson.title}</h1>
          <p className="mt-2 text-ink/75">
            {lesson.treasure
              ? 'A treasure hunt! Answer the questions to open the chest. No rush — take your time.'
              : lesson.kind === 'super'
                ? 'Longer sentences, no transliteration and no hints. Take your time: you can retry as often as you like.'
                : lesson.kind === 'review'
                  ? 'A mix of everything from this unit.'
                  : lesson.kind === 'boss'
                    ? 'A 45-second sprint through everything in this unit. Build a combo!'
                    : lesson.kind === 'dialogue'
                      ? `A conversation with ${built.scene.lines.length} lines`
                      : lesson.kind === 'poem' || lesson.kind === 'passage'
                        ? `${built.text.lines.length} lines to read and understand`
                        : lesson.kind === 'polite'
                          ? 'Learn who gets which "you"'
                          : `${built.learn.length} new thing${built.learn.length === 1 ? '' : 's'} to learn`}
          </p>
          <p className="mt-3 text-sm">
            {duration.measured ? 'Your usual time' : 'Estimated time'}: about {duration.minutes} minutes · Goal:{' '}
            {lesson.kind === 'letters'
              ? 'recognise these letters and their sounds'
              : lesson.kind === 'words'
                ? 'understand and use these words'
                : 'understand and practise ' + lesson.title.toLowerCase()}
          </p>
          {lesson.tip && (
            <p className="mx-auto mt-5 max-w-sm rounded-2xl bg-accent/30 px-4 py-3 text-left text-sm font-semibold"><VisualText>💡</VisualText> {lesson.tip}</p>
          )}
          {lesson.rules && (
            <div className="mx-auto mt-4 max-w-sm space-y-2 text-left">
              {lesson.rules.map((r) => (
                <div key={r.who} className="card flex items-center gap-3 !p-3">
                  <span className="text-2xl"><VisualText>{r.emoji}</VisualText></span>
                  <span className="flex-1 text-sm font-semibold text-ink/70">{r.who}</span>
                  <span className="font-bangla text-xl font-extrabold text-primary">{r.say}</span>
                  <Speaker inline size="sm" text={r.say} />
                </div>
              ))}
            </div>
          )}
          <button className="btn-primary mt-8 w-full max-w-xs" onClick={advance}>
            {lesson.kind === 'boss' ? 'Fight!' : lesson.kind === 'super' ? 'Bring it on!' : "Let's go!"}
          </button>
        </div>
      )}

      {step.kind === 'boss' && (
        <BlitzGame
          pool={built.pool}
          trackKey={track.key}
          seconds={45}
          onFinish={({ correct }) => {
            setSessionXp(correct * 5)
            act({ xp: correct * 5 })
            finish(correct >= 12 ? 3 : correct >= 7 ? 2 : 1, 15)
          }}
        />
      )}

      {step.kind === 'scene' && (
        <div>
          <SceneView scene={built.scene} />
          <button className="btn-primary mt-6 w-full" onClick={advance}>
            Next
          </button>
        </div>
      )}

      {step.kind === 'text' && (
        <div>
          <TextView text={built.text} />
          {lesson.kind === 'poem' && lesson.tip && (
            <p className="mt-4 rounded-2xl bg-accent/30 px-4 py-3 text-sm font-semibold"><VisualText>ℹ️</VisualText> {lesson.tip}</p>
          )}
          <button className="btn-primary mt-6 w-full" onClick={advance}>
            Next
          </button>
        </div>
      )}

      {step.kind === 'learn' && (
        <div>
          <p className="mb-3 text-center text-sm font-extrabold uppercase tracking-wide text-ink/70">New</p>
          <LearnCard key={step.item.id} item={step.item} />
          {i > 1 && steps[i - 1]?.kind === 'learn' && (
            <button
              className="mt-4 underline"
              onClick={() => {
                setI(i - 1)
                setStatus('idle')
              }}
            >
              ← Previous card
            </button>
          )}
          <button className="btn-primary mt-6 w-full" onClick={advance}>
            Next
          </button>
        </div>
      )}

      {step.kind === 'ex' && (
        <div>
          {status !== 'solved' && step.ex.type === 'choice' && <ChoiceQ key={step.ex.id} {...common(step.ex)} />}
          {status !== 'solved' && step.ex.type === 'match' && <MatchQ key={step.ex.id} {...common(step.ex)} />}
          {status !== 'solved' && step.ex.type === 'tiles' && <TilesQ key={step.ex.id} {...common(step.ex)} />}
          {status !== 'solved' && step.ex.type === 'type' && (
            <TypeQ key={step.ex.id} {...common(step.ex)} onTyped={() => act({ stats: (s) => ({ typed: s.typed + 1 }) })} />
          )}
          {step.ex.type === 'trace' && <TraceQ key={step.ex.id} ex={step.ex} lenient={playful} onSolved={traceDone} />}

          {step.ex.type !== 'trace' && (
            <div className="mt-6 min-h-[5.5rem]">
              {status === 'wrong' && (
                <p role="status" className="gentle-error text-center">
                  Listen again and compare the letters or word order. Use a hint below the question if you need one.
                </p>
              )}
              {status === 'solved' && (
                <>
                  <p
                    role="status"
                    className="animate-pop mb-3 rounded-2xl bg-success/15 px-4 py-3 text-center text-lg font-extrabold text-success"
                  >
                    {cheer}
                  </p>
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

function Shell({ children, onClose, progress, extra, hideRoman }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-xl px-5 pb-10 pt-4">
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lesson"
            className="rounded-full bg-white px-3 py-2 text-lg font-extrabold text-ink/70 shadow"
          >
            ✕
          </button>
          <div
            role="progressbar"
            aria-label="Lesson progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            className="h-4 min-w-8 flex-1 overflow-hidden rounded-full bg-primary/10"
          >
            <div className="h-full rounded-full bg-success transition-all" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
          {extra}
          {!hideRoman && <RomanToggle />}
          <SoundToggle />
        </div>
        {children}
      </div>
    </div>
  )
}
