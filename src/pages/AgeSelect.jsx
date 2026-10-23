import { trackList } from '../curriculum/tracks'
import { useTrack } from '../state/persist'

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
      <div className="space-y-4">
        {trackList.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTrack(t.key)}
            className={`flex w-full items-center gap-4 rounded-3xl px-6 py-7 text-left shadow-md transition active:scale-95 hover:brightness-110 ${
              t.key === 'young' ? 'bg-secondary text-white' : 'bg-primary text-white'
            }`}
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
