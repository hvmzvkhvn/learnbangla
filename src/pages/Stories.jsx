import { Link } from 'react-router-dom'
import { storiesFor } from '../data/stories'
import { useTrack } from '../state/persist'
import { useGame } from '../state/game'

const COUNT_ENDINGS = (st) => Object.values(st.nodes).filter((n) => n.end).length

export default function Stories() {
  const [trackKey] = useTrack()
  const { game } = useGame()
  const list = storiesFor(trackKey ?? 'teen')
  return (
    <div className="py-2">
      <h1 className="text-3xl font-extrabold text-primary">Story chats</h1>
      <p className="mb-5 text-ink/60">Real conversations where your replies change what happens. Every story has more than one ending.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((st) => {
          const seen = Object.keys(game.stats.endings ?? {}).filter((k) => k.startsWith(`${st.id}:`)).length
          const total = COUNT_ENDINGS(st)
          return (
            <Link key={st.id} to={`/story/${st.id}`} className="card flex gap-4 transition active:scale-[0.98] hover:shadow-lg">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-4xl">{st.emoji}</span>
              <span className="flex-1">
                <span className="block text-xl font-extrabold text-ink">{st.title}</span>
                <span className="block text-sm text-ink/60">{st.blurb}</span>
                <span className="mt-2 flex items-center gap-2 text-xs font-extrabold">
                  <span className="rounded-full bg-accent px-2 py-0.5">{st.meter.emoji} {st.meter.label}</span>
                  <span className={seen ? 'text-success' : 'text-ink/40'}>
                    {seen ? `✓ ${seen}/${total} endings` : `${total} endings to find`}
                  </span>
                </span>
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
