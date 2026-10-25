import { trackList } from '../curriculum/tracks'
import { useTrack } from '../state/persist'

const LOOK = {
  young: 'bg-secondary text-white',
  older: 'bg-primary text-white',
  teen: 'bg-ink text-white',
  senior: 'bg-gradient-to-br from-primary to-ink text-white',
  adult: 'bg-gradient-to-br from-ink to-primary text-white',
}

export default function AgeSelect() {
  const [, setTrack] = useTrack()
  return (
    <div className="py-6">
      <div className="card mb-6 flex items-center gap-4">
        <span className="text-6xl">⭐</span>
        <div>
          <p className="font-bangla text-3xl font-bold text-primary">স্বাগতম!</p>
          <p className="text-lg font-bold text-ink/70">Hi, I'm Tara! How old are you?</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {trackList.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTrack(t.key)}
            className={`flex w-full items-center gap-4 rounded-3xl px-6 py-7 text-left shadow-md transition active:scale-95 hover:brightness-110 ${LOOK[t.key]}`}
          >
            <span className="text-5xl">{t.emoji}</span>
            <span>
              <span className="block text-3xl font-extrabold">I'm {t.ages}</span>
              <span className="block font-bold">{t.label}</span>
              <span className="block text-sm font-semibold opacity-90">{t.tagline}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
