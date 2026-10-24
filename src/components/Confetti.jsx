import { useMemo } from 'react'

const PIECES = ['🎉', '⭐', '✨', '🎊', '💫', '🟡', '🟢', '🟠']

/** A burst of falling confetti (pure CSS, no library). */
export default function Confetti({ count = 28 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.2,
        size: 14 + Math.random() * 16,
        glyph: PIECES[i % PIECES.length],
      })),
    [count],
  )
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
      {items.map((p) => (
        <span key={p.id} className="animate-confetti absolute top-0" style={{ left: `${p.left}%`, animationDelay: `${p.delay}s`, fontSize: p.size, opacity: 0 }}>
          {p.glyph}
        </span>
      ))}
    </div>
  )
}
