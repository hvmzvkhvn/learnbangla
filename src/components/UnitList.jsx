import { useState } from 'react'
import { Link } from 'react-router-dom'

/** The unit path: collapsible units with their lessons, stars and the next-up highlight. */
export default function UnitList({ track, progress, nextId }) {
  const [open, setOpen] = useState(null)
  const currentUnit = track.units.find((u) => u.lessons.some((l) => l.id === nextId)) ?? track.units[0]
  const openUnit = open ?? currentUnit.id

  return (
    <div className="space-y-3">
      {track.units.map((u, ui) => {
        const finished = u.lessons.filter((l) => progress[l.id]).length
        const isOpen = openUnit === u.id
        return (
          <div key={u.id} className="card !p-0 overflow-hidden">
            <button type="button" onClick={() => setOpen(isOpen ? '' : u.id)} className="flex w-full items-center gap-3 p-4 text-left">
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
              <div className="grid grid-cols-1 gap-2 border-t border-primary/10 p-3 sm:grid-cols-2">
                {u.lessons.map((l) => {
                  const p = progress[l.id]
                  const special = l.kind === 'boss' || l.kind === 'story'
                  const superL = l.kind === 'super'
                  return (
                    <Link
                      key={l.id}
                      to={`/lesson/${l.id}`}
                      className={`flex items-center gap-2 rounded-2xl px-3 py-3 text-sm font-extrabold transition active:scale-95 ${
                        p ? 'bg-success/15 text-success' : l.id === nextId ? 'bg-accent text-ink' : superL ? 'bg-ink text-white sm:col-span-2' : special ? 'bg-secondary/15 text-ink' : 'bg-background text-ink/70'
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
  )
}
