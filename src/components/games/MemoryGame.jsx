import { useEffect, useMemo, useRef, useState } from 'react'
import { shuffle } from '../../curriculum/text'
import { speak } from '../../audio/audio'

/** Flip cards to match each Bangla word with its meaning. onFinish({ moves, seconds }) */
export default function MemoryGame({ pool, pairs = 6, mode = 'en', onFinish }) {
  const cards = useMemo(() => {
    const chosen = shuffle(pool.filter((w) => w.bn.length <= 12 && (mode === 'picture' ? w.art : w.en.length <= 22))).slice(0, pairs)
    return shuffle(
      chosen.flatMap((w) => [
        { uid: `${w.id}-b`, key: w.id, side: 'bn', text: w.bn, say: w.bn },
        mode === 'picture' ? { uid: `${w.id}-e`, key: w.id, side: 'art', text: w.art, say: w.bn } : { uid: `${w.id}-e`, key: w.id, side: 'en', text: w.en },
      ]),
    )
  }, [pool, pairs, mode])

  const [open, setOpen] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const lock = useRef(false)
  const finished = useRef(false)

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  function flip(card) {
    if (lock.current || open.includes(card.uid) || matched.includes(card.key)) return
    if (card.say) speak(card.say)
    const nextOpen = [...open, card.uid]
    setOpen(nextOpen)
    if (nextOpen.length === 2) {
      setMoves((m) => m + 1)
      const [a, b] = nextOpen.map((u) => cards.find((c) => c.uid === u))
      lock.current = true
      if (a.key === b.key) {
        setTimeout(() => {
          setMatched((m) => {
            const nm = [...m, a.key]
            if (nm.length === cards.length / 2 && !finished.current) {
              finished.current = true
              setTimeout(() => onFinish({ moves: moves + 1, seconds }), 600)
            }
            return nm
          })
          setOpen([])
          lock.current = false
        }, 350)
      } else {
        setTimeout(() => {
          setOpen([])
          lock.current = false
        }, 900)
      }
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm font-extrabold">
        <span className="rounded-full bg-white px-3 py-1 shadow-sm">🃏 Moves {moves}</span>
        <span className="rounded-full bg-white px-3 py-1 shadow-sm">⏱ {seconds}s</span>
        <span className="rounded-full bg-accent px-3 py-1">✅ {matched.length}/{cards.length / 2}</span>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {cards.map((c) => {
          const up = open.includes(c.uid) || matched.includes(c.key)
          return (
            <button
              key={c.uid}
              type="button"
              onClick={() => flip(c)}
              className={`flex aspect-[4/3] items-center justify-center rounded-2xl p-1 text-center shadow-md transition active:scale-95 ${
                matched.includes(c.key) ? 'bg-success/20 ring-2 ring-success' : up ? 'animate-flip bg-white' : 'bg-primary'
              }`}
            >
              {up ? (
                <span className={`leading-tight ${c.side === 'bn' ? 'font-bangla text-xl font-bold text-primary' : c.side === 'art' ? 'text-5xl' : 'text-sm font-extrabold text-ink'}`}>{c.text}</span>
              ) : (
                <span className="text-3xl text-white/80">⭐</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
