import VisualText from '../art/VisualText'
import { Link } from 'react-router-dom'
import { useDue } from '../state/srs'
import { cityOfTheDay } from '../state/explore'
import { tracks, allLessons } from '../curriculum/tracks'
import { useProgress, useTrack, usePersistent } from '../state/persist'
import { stageOf, today, useGame } from '../state/game'
import UnitList from '../components/UnitList'
import SaveStatus from '../components/SaveStatus'
import { recommendedLesson } from '../state/learning'
import AgeSelect from './AgeSelect'

export default function Home() {
  const [trackKey] = useTrack()
  const { progress } = useProgress()
  const [ability] = usePersistent('lb.ability', 'beginner')
  const [sessions] = usePersistent('lb.lessonSessions', {})
  if (!trackKey || !tracks[trackKey]) return <AgeSelect />

  const track = tracks[trackKey]
  const lessons = allLessons(trackKey)
  const done = lessons.filter((l) => progress[l.id]).length
  const draft = lessons.find((l) => sessions[l.id]?.i > 0 && !sessions[l.id]?.result)
  const next = draft ?? (done === 0 ? recommendedLesson(lessons, ability) : lessons.find((l) => !progress[l.id])) ?? lessons[0]
  return <GameHome track={track} lessons={lessons} done={done} next={next} progress={progress} resume={Boolean(draft)} ability={ability} />
}

function GameHome({ track, lessons, done, next, progress, resume, ability }) {
  const { game, level } = useGame()
  const playful = track.features.playful
  const garden = track.features.garden
  const stage = stageOf(level.level)
  const dailyDone = Boolean(game.stats.daily?.[today()])

  return (
    <div className="py-2">
      <section className="mb-4 rounded-3xl bg-primary p-5 text-white">
        <h1 className="text-2xl font-extrabold">
          {done === 0
            ? ability === 'reader'
              ? 'Use Bangla in your first conversation'
              : 'Your first step: a few letters and sounds'
            : 'One small step today'}
        </h1>
        <p className="mt-2">
          {ability === 'speaker'
            ? 'You already know the sounds. Let’s connect them to letters.'
            : 'Learn a little, practise it, then come back tomorrow.'}
        </p>
      </section>
      <SaveStatus />
      <div className={`card mb-4 ${playful ? '!p-5' : '!p-5'}`}>
        {playful ? (
          <div className="flex items-center gap-4">
            <span className="animate-pop text-6xl"><VisualText>⭐</VisualText></span>
            <div className="flex-1">
              <p className="font-bangla text-2xl font-bold text-primary">স্বাগতম!</p>
              <p className="text-sm font-bold text-ink/70">
                <VisualText>{track.emoji}</VisualText> {track.label} · ages {track.ages}
              </p>
              <p className="mt-1 text-sm font-extrabold text-ink">
                <VisualText>{garden ? `${stage.emoji} Your garden: ${stage.name} · Level ${level.level}` : `⚡ Level ${level.level}`}</VisualText>
              </p>
            </div>
            <div className="text-right text-xs font-bold text-secondary">
              <VisualText>🔥</VisualText> {game.streak} day{game.streak === 1 ? '' : 's'}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-ink/70">
                <VisualText>{track.emoji}</VisualText> {track.label} · ages {track.ages}
              </p>
              <h2 className="text-2xl font-extrabold text-primary">{done === 0 ? 'স্বাগতম — let’s begin' : 'Welcome back'}</h2>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold text-primary">Lv {level.level}</p>
              <p className="text-xs font-bold text-secondary"><VisualText>🔥</VisualText> {game.streak}-day streak</p>
            </div>
          </div>
        )}
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-primary/10">
          <div className="h-full rounded-full bg-success transition-all" style={{ width: `${level.pct * 100}%` }} />
        </div>
        <div className="mt-1 flex justify-between text-xs font-bold text-ink/70">
          <span>
            {level.into}/{level.need} XP
          </span>
          <span>{done} lessons completed</span>
        </div>
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-2">
        <Link
          to={`/lesson/${next.id}`}
          className="flex items-center gap-4 rounded-3xl bg-primary px-5 py-5 text-white shadow-md transition active:scale-95 hover:brightness-110"
        >
          <span className="text-4xl"><VisualText>{next.emoji}</VisualText></span>
          <span className="flex-1">
            <span className="block text-xs font-bold opacity-80">
              {resume ? 'Resume your lesson' : done === 0 ? 'Start here' : 'Continue'}
            </span>
            <span className="block text-xl font-extrabold leading-tight">{next.title}</span>
          </span>
          <span className="text-2xl"><VisualText>▶</VisualText></span>
        </Link>
        <Link
          to="/play/daily"
          className="flex items-center gap-4 rounded-3xl bg-secondary px-5 py-5 text-white shadow-md transition active:scale-95 hover:brightness-110"
        >
          <span className="text-4xl"><VisualText>{garden ? '🎈' : '📅'}</VisualText></span>
          <span className="flex-1">
            <span className="block text-xs font-bold opacity-90">{dailyDone ? 'Done today ✓' : 'New today'}</span>
            <span className="block text-xl font-extrabold leading-tight">{garden ? 'Daily Treat' : 'Daily Challenge'}</span>
          </span>
          <span className="text-2xl"><VisualText>▶</VisualText></span>
        </Link>
      </div>

      {track.features.explore && <PostcardCard />}

      <ReviewCard track={track} progress={progress} playful={playful} />

      <details className="mt-5" open={done > 0}>
        <summary className="cursor-pointer py-3 text-lg font-bold">Browse all {lessons.length} lessons</summary>
        <UnitList track={track} progress={progress} nextId={next.id} />
      </details>

      <div className="mt-6 grid grid-cols-2 gap-3 text-center text-sm font-extrabold">
        <Link to="/alphabet" className="card !p-4 text-primary">
          <VisualText>🔤</VisualText> Alphabet chart
        </Link>
        <Link to="/words" className="card !p-4 text-primary">
          <VisualText>📚</VisualText> Word lists
        </Link>
      </div>
    </div>
  )
}

function ReviewCard({ track, progress, playful }) {
  const { items, dueCount } = useDue(track.key, progress)
  if (!items.length) return null
  return (
    <Link
      to="/practice"
      className="mb-5 flex items-center gap-4 rounded-3xl bg-white px-5 py-4 shadow-md ring-2 ring-primary/15 transition active:scale-95 hover:brightness-105"
    >
      <span className="text-4xl"><VisualText>{playful ? '🧠' : '🔁'}</VisualText></span>
      <span className="flex-1">
        <span className="block text-lg font-extrabold leading-tight text-primary">Review today</span>
        <span className="block text-sm font-bold text-ink/75">
          {dueCount > 0
            ? `${dueCount} ${dueCount === 1 ? 'thing is' : 'things are'} ready to practise again`
            : 'A quick refresher of what you learned'}
        </span>
      </span>
      <span className="text-2xl text-primary"><VisualText>▶</VisualText></span>
    </Link>
  )
}

function PostcardCard() {
  const c = cityOfTheDay()
  const { game } = useGame()
  const got = Boolean(game.stats.stamps?.[`p:${today()}`])
  return (
    <Link
      to="/explore"
      className="mb-3 flex items-center gap-4 rounded-3xl bg-white px-5 py-4 shadow-md ring-2 ring-secondary/30 transition active:scale-95 hover:brightness-105"
    >
      <span className="text-4xl"><VisualText>{c.emoji}</VisualText></span>
      <span className="flex-1">
        <span className="block text-lg font-extrabold leading-tight text-secondary">
          {got ? 'Postcard collected ✓' : "Today's postcard"}
        </span>
        <span className="block text-sm font-bold text-ink/75">
          From <span className="font-bangla">{c.bn}</span> · {c.name}
        </span>
      </span>
      <span className="text-2xl text-secondary"><VisualText>▶</VisualText></span>
    </Link>
  )
}
