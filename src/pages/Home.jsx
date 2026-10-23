import { useState } from 'react'
import { Link } from 'react-router-dom'
import { tracks, allLessons } from '../curriculum/tracks'
import { useProgress, useTrack } from '../state/persist'
import AgeSelect from './AgeSelect'

export default function Home() {
  const [trackKey, setTrack] = useTrack()
  const { progress } = useProgress()
  const [open, setOpen] = useState(null)

  if (!trackKey || !tracks[trackKey]) return <AgeSelect />

  const track = tracks[trackKey]
  const lessons = allLessons(trackKey)
  const done = lessons.filter((l) => progress[l.id]).length
  const next = lessons.find((l) => !progress[l.id]) ?? lessons[0]
  const currentUnit = track.units.find((u) => u.lessons.some((l) => l.id === next.id))
  const openUnit = open ?? currentUnit.id

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

      <Link
        to={`/lesson/${next.id}`}
        className="mb-6 flex items-center gap-4 rounded-3xl bg-primary px-6 py-6 text-white shadow-md transition active:scale-95 hover:brightness-110"
      >
        <span className="text-5xl">{next.emoji}</span>
        <span className="flex-1">
          <span className="block text-sm font-bold opacity-80">{done === 0 ? 'Start here' : 'Continue'}</span>
          <span className="block text-2xl font-extrabold">{next.title}</span>
        </span>
        <span className="text-3xl">▶</span>
      </Link>

      <div className="space-y-3">
        {track.units.map((u, ui) => {
          const finished = u.lessons.filter((l) => progress[l.id]).length
          const isOpen = openUnit === u.id
          return (
            <div key={u.id} className="card !p-0 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? '' : u.id)}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl">{u.emoji}</span>
                <span className="flex-1">
                  <span className="block text-xs font-extrabold uppercase tracking-wide text-ink/40">Unit {ui + 1}</span>
                  <span className="block font-bangla text-lg font-extrabold leading-snug text-ink">{u.title}</span>
                  <span className="block text-xs text-ink/50">{u.blurb}</span>
                </span>
                <span className="text-sm font-extrabold text-primary">
                  {finished}/{u.lessons.length}
                </span>
              </button>
              {isOpen && (
                <div className="grid grid-cols-2 gap-2 border-t border-primary/10 p-3">
                  {u.lessons.map((l) => {
                    const p = progress[l.id]
                    return (
                      <Link
                        key={l.id}
                        to={`/lesson/${l.id}`}
                        className={`flex items-center gap-2 rounded-2xl px-3 py-3 text-sm font-extrabold transition active:scale-95 ${
                          p ? 'bg-success/15 text-success' : l.id === next.id ? 'bg-accent text-ink' : 'bg-background text-ink/70'
                        }`}
                      >
                        <span className="text-xl">{l.emoji}</span>
                        <span className="flex-1 font-bangla leading-tight">{l.title}</span>
                        {p && <span className="text-xs">{'⭐'.repeat(p.stars)}</span>}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

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
