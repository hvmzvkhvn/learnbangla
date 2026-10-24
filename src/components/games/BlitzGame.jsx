import { useEffect, useMemo, useRef, useState } from 'react'
import Face from '../lesson/Face'
import { quickChoice } from '../../curriculum/exercises'
import { shuffle } from '../../curriculum/text'
import { speak } from '../../audio/audio'

/**
 * Timed multiple-choice rounds. Fast answers build a combo; mistakes break it.
 * onFinish({ score, correct, wrong, bestCombo })
 */
export default function BlitzGame({ pool, trackKey, seconds: secondsProp = 60, onFinish }) {
  // window.__lbBlitzSeconds is a test hook that shortens the round
  const seconds = (typeof window !== 'undefined' && window.__lbBlitzSeconds) || secondsProp
  const [left, setLeft] = useState(seconds)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [stats, setStats] = useState({ correct: 0, wrong: 0, bestCombo: 0 })
  const [q, setQ] = useState(null)
  const [picked, setPicked] = useState(null)
  const bag = useRef([])
  const done = useRef(false)
  const endAt = useRef(Date.now() + seconds * 1000)
  const latest = useRef({ score: 0, stats })
  latest.current = { score, stats }

  const next = useMemo(
    () => () => {
      for (let tries = 0; tries < 40; tries++) {
        if (!bag.current.length) bag.current = shuffle(pool)
        const e = quickChoice(bag.current.pop(), trackKey)
        if (e) return e
      }
      return null
    },
    [pool, trackKey],
  )

  useEffect(() => {
    setQ(next())
    const t = setInterval(() => {
      const remain = Math.max(0, Math.ceil((endAt.current - Date.now()) / 1000))
      setLeft(remain)
      if (remain === 0 && !done.current) {
        done.current = true
        clearInterval(t)
        onFinish({ score: latest.current.score, ...latest.current.stats })
      }
    }, 200)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!q) return
    if (q.stem.listen) speak(q.stem.say)
    else if (q.stem.bn && !q.stem.noAudio) speak(q.stem.bn)
  }, [q])

  function choose(i) {
    if (picked !== null || done.current) return
    setPicked(i)
    const ok = i === q.answer
    if (ok) {
      const c = combo + 1
      setCombo(c)
      setScore((s) => s + 10 + Math.min(10, Math.floor(c / 3) * 2))
      setStats((s) => ({ ...s, correct: s.correct + 1, bestCombo: Math.max(s.bestCombo, c) }))
      const o = q.options[i]
      if (o.bn) speak(o.bn)
    } else {
      setCombo(0)
      setStats((s) => ({ ...s, wrong: s.wrong + 1 }))
    }
    setTimeout(
      () => {
        setPicked(null)
        setQ(next())
      },
      ok ? 450 : 900,
    )
  }

  if (!q) return <p className="py-10 text-center text-ink/50">Getting ready…</p>
  const pct = (left / seconds) * 100

  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <span className={`w-12 text-center text-2xl font-extrabold ${left <= 10 ? 'text-error' : 'text-primary'}`}>{left}</span>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-primary/10">
          <div className={`h-full rounded-full transition-all ${left <= 10 ? 'bg-error' : 'bg-success'}`} style={{ width: `${pct}%` }} />
        </div>
        <span className="rounded-full bg-accent px-3 py-1 text-sm font-extrabold">⚡ {score}</span>
      </div>
      <div className="mb-2 h-6 text-center text-sm font-extrabold text-secondary">{combo >= 2 && <span className="animate-pop inline-block">🔥 Combo x{combo}</span>}</div>

      <h2 className="mb-3 text-center text-lg font-extrabold text-ink">{q.title}</h2>
      <div className="card mb-4 flex min-h-[7rem] items-center justify-center">
        <Face f={q.stem} big />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {q.options.map((o, i) => {
          const right = picked !== null && i === q.answer
          const wrong = picked === i && i !== q.answer
          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              className={`flex min-h-[5.5rem] items-center justify-center rounded-3xl border-4 bg-white p-3 shadow-sm transition active:scale-95 ${
                right ? 'border-success bg-success/10' : wrong ? 'animate-shake border-error/60 bg-error/10' : 'border-primary/10'
              }`}
            >
              <Face f={o} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
