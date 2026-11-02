import VisualText from '../art/VisualText'
import { trackList } from '../curriculum/tracks'
import { useState } from 'react'
import { useTrack, usePersistent } from '../state/persist'

const LOOK = {
  young: 'bg-secondary text-ink',
  older: 'bg-primary text-white',
  teen: 'bg-ink text-white',
  senior: 'bg-gradient-to-br from-primary to-ink text-white',
  adult: 'bg-gradient-to-br from-ink to-primary text-white',
}

export default function AgeSelect() {
  const [, setTrack] = useTrack()
  const [chosen, setChosen] = useState(null)
  const [, setAbility] = usePersistent('lb.ability', 'beginner')
  if (chosen)
    return (
      <section className="card my-6">
        <h1 className="text-2xl font-extrabold text-primary">Where would you like to start?</h1>
        <p className="my-3">Age sets the style. Experience sets your starting point. You can open any lesson later.</p>
        <div className="grid gap-3">
          {[
            ['beginner', 'I’m a complete beginner', 'Start with letters and sounds.'],
            ['speaker', 'I speak Bangla but cannot read', 'Connect familiar sounds to the written script.'],
            ['reader', 'I can read a little', 'Start with useful sentences; revisit the alphabet any time.'],
          ].map(([key, label, detail]) => (
            <button
              key={key}
              className="btn-primary flex-col items-start text-left"
              onClick={() => {
                setAbility(key)
                setTrack(chosen)
              }}
            >
              <span>{label}</span>
              <span className="text-sm font-normal">{detail}</span>
            </button>
          ))}
        </div>
        <button className="mt-4 underline" onClick={() => setChosen(null)}>
          Back to age groups
        </button>
      </section>
    )
  return (
    <div className="py-6">
      <div className="card mb-6 flex items-center gap-4">
        <span className="text-6xl"><VisualText>⭐</VisualText></span>
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
            onClick={() => setChosen(t.key)}
            className={`flex w-full items-center gap-4 rounded-3xl px-6 py-7 text-left shadow-md transition active:scale-95 hover:brightness-110 ${LOOK[t.key]}`}
          >
            <span className="text-5xl"><VisualText>{t.emoji}</VisualText></span>
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
