import { Link } from 'react-router-dom'
import { tracks, allLessons } from '../curriculum/tracks'
import { useProgress, useTrack } from '../state/persist'
import { useGame, today } from '../state/game'
import UnitList from '../components/UnitList'
import AgeSelect from './AgeSelect'

export default function Home() {
  const [trackKey, setTrack] = useTrack()
  const { progress } = useProgress()

  if (!trackKey || !tracks[trackKey]) return <AgeSelect />

  const track = tracks[trackKey]
  const lessons = allLessons(trackKey)
  const done = lessons.filter((l) => progress[l.id]).length
  const next = lessons.find((l) => !progress[l.id]) ?? lessons[0]

  if (track.theme === 'teen') return <TeenHome track={track} lessons={lessons} done={done} next={next} progress={progress} />

  return (
    <div className="py-4">
      <div className="card mb-5 flex items-center gap-4">
        <span className="text-6xl">⭐</span>
        <div className="flex-1">
          <p className="font-bangla text-2xl font-bold text-primary">স্বাগতম!</p>
          <p className="text-sm font-bold text-ink/70">
            {track.emoji} {track.label} · ages {track.ages}
          </p>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-primary/10">
            <div className="h-full rounded-full bg-success" style={{ width: `${(done / lessons.length) * 100}%` }} />
          </div>
          <p className="mt-1 text-xs font-bold text-ink/50">
            {done} of {lessons.length} lessons done
          </p>
        </div>
      </div>

      <Link to={`/lesson/${next.id}`} className="mb-6 flex items-center gap-4 rounded-3xl bg-primary px-6 py-6 text-white shadow-md transition active:scale-95 hover:brightness-110">
        <span className="text-5xl">{next.emoji}</span>
        <span className="flex-1">
          <span className="block text-sm font-bold opacity-80">{done === 0 ? 'Start here' : 'Continue'}</span>
          <span className="block text-2xl font-extrabold">{next.title}</span>
        </span>
        <span className="text-3xl">▶</span>
      </Link>

      <UnitList track={track} progress={progress} nextId={next.id} />

      <div className="mt-8 flex flex-col items-center gap-2 text-sm font-bold text-ink/40">
        <button type="button" onClick={() => setTrack(null)} className="hover:text-ink/60">
          Change age group
        </button>
        <Link to="/review" className="hover:text-ink/60">
          For content reviewers →
        </Link>
      </div>
    </div>
  )
}

function TeenHome({ track, lessons, done, next, progress }) {
  const { game, level } = useGame()
  const dailyDone = Boolean(game.stats.daily?.[today()])
  return (
    <div className="py-2">
      <div className="card mb-4 !p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-ink/40">
              {track.emoji} {track.label} · ages {track.ages}
            </p>
            <h1 className="text-2xl font-extrabold text-primary">{done === 0 ? 'স্বাগতম — let’s begin' : 'Welcome back'}</h1>
          </div>
          <div className="text-right">
            <p className="text-3xl font-extrabold text-primary">Lv {level.level}</p>
            <p className="text-xs font-bold text-secondary">🔥 {game.streak}-day streak</p>
          </div>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-primary/10">
          <div className="h-full rounded-full bg-success transition-all" style={{ width: `${level.pct * 100}%` }} />
        </div>
        <div className="mt-1 flex justify-between text-xs font-bold text-ink/50">
          <span>
            {level.into}/{level.need} XP
          </span>
          <span>
            {done}/{lessons.length} lessons
          </span>
        </div>
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-2">
        <Link to={`/lesson/${next.id}`} className="flex items-center gap-4 rounded-3xl bg-primary px-5 py-5 text-white shadow-md transition active:scale-95 hover:brightness-110">
          <span className="text-4xl">{next.emoji}</span>
          <span className="flex-1">
            <span className="block text-xs font-bold opacity-80">{done === 0 ? 'Start here' : 'Continue'}</span>
            <span className="block text-xl font-extrabold leading-tight">{next.title}</span>
          </span>
          <span className="text-2xl">▶</span>
        </Link>
        <Link to="/play/daily" className="flex items-center gap-4 rounded-3xl bg-secondary px-5 py-5 text-white shadow-md transition active:scale-95 hover:brightness-110">
          <span className="text-4xl">📅</span>
          <span className="flex-1">
            <span className="block text-xs font-bold opacity-90">{dailyDone ? 'Done today ✓' : 'New today'}</span>
            <span className="block text-xl font-extrabold leading-tight">Daily Challenge</span>
          </span>
          <span className="text-2xl">▶</span>
        </Link>
      </div>

      <UnitList track={track} progress={progress} nextId={next.id} />

      <div className="mt-6 grid grid-cols-2 gap-3 text-center text-sm font-extrabold">
        <Link to="/alphabet" className="card !p-4 text-primary">🔤 Alphabet chart</Link>
        <Link to="/words" className="card !p-4 text-primary">📚 Word lists</Link>
      </div>
    </div>
  )
}
