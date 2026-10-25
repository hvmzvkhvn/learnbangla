import { useState } from 'react'
import BanglaLine from './BanglaLine'

/** Drag between the past and the present of a region. */
export default function ThenNow({ then, now }) {
  const [v, setV] = useState(0)
  const isNow = v >= 50
  const part = isNow ? now : then
  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between text-sm font-extrabold">
        <span className={isNow ? 'text-ink/30' : 'text-primary'}>⏳ Then</span>
        <span className={isNow ? 'text-secondary' : 'text-ink/30'}>Now ✨</span>
      </div>
      <input
        type="range" min="0" max="100" value={v} onChange={(e) => setV(Number(e.target.value))}
        aria-label="Slide between then and now" className="my-2 w-full accent-primary"
      />
      <div key={isNow ? 'now' : 'then'} className="animate-slideIn space-y-3">
        <p className="text-base leading-relaxed text-ink/80">{part.en}</p>
        <BanglaLine s={part.line} />
      </div>
    </div>
  )
}
