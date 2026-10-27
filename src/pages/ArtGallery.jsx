import Scene from '../art/Scene'

const SAMPLES = [
  { bg: 'meadow', time: 'day', items: [{ e: '🏠', x: 22, y: 66, s: 60 }, { e: '🌳', x: 8, y: 64, s: 54, anim: 'sway' }, { e: '👧', x: 55, y: 72, s: 50 }, { e: '🐕', x: 72, y: 76, s: 38, anim: 'bob' }] },
  { bg: 'village', time: 'evening', items: [{ e: '🛶', x: 40, y: 80, s: 56, anim: 'bob' }, { e: '🌴', x: 12, y: 62, s: 60, anim: 'sway' }, { e: '🏡', x: 75, y: 60, s: 56 }] },
  { bg: 'river', time: 'day', items: [{ e: '⛵', x: 30, y: 62, s: 60, anim: 'bob' }, { e: '🚤', x: 70, y: 74, s: 44, anim: 'bob' }] },
  { bg: 'sea', time: 'evening', items: [{ e: '⛱️', x: 24, y: 78, s: 52 }, { e: '🦀', x: 60, y: 86, s: 30, anim: 'bob' }, { e: '🌴', x: 86, y: 66, s: 58, anim: 'sway' }] },
  { bg: 'city', time: 'day', items: [{ e: '🛺', x: 30, y: 78, s: 54 }, { e: '🚌', x: 70, y: 76, s: 54 }] },
  { bg: 'room', time: 'day', items: [{ e: '🛏️', x: 22, y: 66, s: 64 }, { e: '👧', x: 60, y: 72, s: 54 }, { e: '🧸', x: 84, y: 82, s: 34 }] },
  { bg: 'classroom', time: 'day', items: [{ e: '👩‍🏫', x: 40, y: 64, s: 54 }, { e: '🧒', x: 22, y: 82, s: 40 }, { e: '👧', x: 72, y: 82, s: 40 }] },
  { bg: 'kitchen', time: 'day', items: [{ e: '🍳', x: 20, y: 40, s: 40 }, { e: '👩', x: 50, y: 68, s: 56 }, { e: '🍚', x: 84, y: 80, s: 34 }] },
  { bg: 'market', time: 'day', items: [{ e: '🥭', x: 20, y: 74, s: 40 }, { e: '🐟', x: 42, y: 78, s: 40 }, { e: '🥬', x: 64, y: 74, s: 40 }, { e: '🧑‍🌾', x: 84, y: 66, s: 50 }] },
  { bg: 'hills', time: 'day', items: [{ e: '👩‍🌾', x: 30, y: 72, s: 50 }, { e: '🍃', x: 70, y: 76, s: 40, anim: 'sway' }] },
  { bg: 'meadow', time: 'rain', items: [{ e: '☂️', x: 40, y: 56, s: 56 }, { e: '🧒', x: 40, y: 78, s: 50 }] },
  { bg: 'village', time: 'night', items: [{ e: '🏡', x: 30, y: 60, s: 60 }, { e: '🌙', x: 80, y: 20, s: 36 }] },
  { bg: 'paper', time: 'day', items: [{ map: 'sylhet', x: 30, y: 52, w: 120 }, { t: '1947', x: 72, y: 56, s: 54, c: '#B03A2E' }] },
]

/** A page of every backdrop with sample props — handy for checking the art. */
export default function ArtGallery() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="mb-4 text-3xl font-extrabold text-primary">Scene gallery</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        {SAMPLES.map((s, i) => (
          <div key={i}>
            <p className="mb-1 text-xs font-bold text-ink/50">{s.bg} · {s.time}</p>
            <Scene scene={s} id={`g${i}`} />
          </div>
        ))}
      </div>
    </div>
  )
}
