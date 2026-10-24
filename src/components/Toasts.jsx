import { useToasts } from '../state/game'

/** Little pop-ups for badges and level-ups. */
export default function Toasts() {
  const toasts = useToasts()
  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-50 flex flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`animate-pop flex items-center gap-2 rounded-2xl px-4 py-3 font-extrabold shadow-lg ${
            t.kind === 'badge' ? 'bg-ink text-white' : 'bg-secondary text-white'
          }`}
        >
          <span className="text-2xl">{t.emoji}</span>
          {t.text}
        </div>
      ))}
    </div>
  )
}
