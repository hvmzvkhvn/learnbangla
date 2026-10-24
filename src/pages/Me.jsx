import { Link } from 'react-router-dom'
import { BADGES, useGame } from '../state/game'
import { useProgress, useTrack } from '../state/persist'
import { allLessons, tracks } from '../curriculum/tracks'

export default function Me() {
  const { game, level, reset } = useGame()
  const [trackKey, setTrack] = useTrack()
  const { progress } = useProgress()
  const track = tracks[trackKey]
  const lessons = track ? allLessons(trackKey) : []
  const done = lessons.filter((l) => progress[l.id]).length
  const earned = BADGES.filter((b) => game.badges[b.id]).length

  const resetAll = () => {
    if (window.confirm('Reset ALL your progress, XP and badges on this device? This cannot be undone.')) {
      reset()
      try {
        localStorage.removeItem('lb.progress')
        location.reload()
      } catch {
        /* ignore */
      }
    }
  }

  return (
    <div className="py-2">
      <div className="card mb-5 text-center">
        <p className="text-sm font-extrabold uppercase tracking-wide text-ink/40">{track ? `${track.emoji} ${track.label} · ages ${track.ages}` : ''}</p>
        <p className="mt-1 text-5xl font-extrabold text-primary">Level {level.level}</p>
        <div className="mx-auto mt-3 h-4 max-w-sm overflow-hidden rounded-full bg-primary/10">
          <div className="h-full rounded-full bg-success transition-all" style={{ width: `${level.pct * 100}%` }} />
        </div>
        <p className="mt-1 text-xs font-bold text-ink/50">{level.into} / {level.need} XP to level {level.level + 1} · {game.xp} XP total</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-secondary/10 py-3"><p className="text-2xl font-extrabold text-secondary">🔥 {game.streak}</p><p className="text-xs font-bold text-ink/50">Day streak</p></div>
          <div className="rounded-2xl bg-primary/10 py-3"><p className="text-2xl font-extrabold text-primary">{done}</p><p className="text-xs font-bold text-ink/50">of {lessons.length} lessons</p></div>
          <div className="rounded-2xl bg-accent/40 py-3"><p className="text-2xl font-extrabold text-ink">{earned}</p><p className="text-xs font-bold text-ink/50">of {BADGES.length} badges</p></div>
        </div>
      </div>

      <h2 className="mb-3 text-xl font-extrabold text-ink">Badges</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {BADGES.map((b) => {
          const got = Boolean(game.badges[b.id])
          return (
            <div key={b.id} className={`card flex flex-col items-center !p-4 text-center ${got ? '' : 'opacity-50 grayscale'}`}>
              <span className="text-4xl">{got ? b.emoji : '🔒'}</span>
              <p className="mt-1 font-extrabold text-ink">{b.title}</p>
              <p className="text-xs text-ink/60">{b.desc}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 text-sm font-bold text-ink/40">
        <button type="button" onClick={() => setTrack(null)} className="hover:text-ink/60">Change age group</button>
        <Link to="/review" className="hover:text-ink/60">For content reviewers →</Link>
        <button type="button" onClick={resetAll} className="text-error/70 hover:text-error">Reset my progress</button>
      </div>
    </div>
  )
}
