import { useMemo, useState } from 'react'
import Face from './Face'
import Prompt from './Prompt'
import { shuffle } from '../../curriculum/text'
import { speak } from '../../audio/audio'

export default function MatchQ({ ex, onSolved, onWrong }) {
  const rightOrder = useMemo(() => shuffle(ex.pairs.map((_, i) => i)), [ex])
  const [sel, setSel] = useState(null) // { side: 'l' | 'r', i }
  const [done, setDone] = useState([])
  const [mistake, setMistake] = useState(false)

  function tap(side, i, face) {
    if (done.includes(i)) return
    if (face?.bn) speak(face.bn)
    if (!sel || sel.side === side) {
      setSel({ side, i })
      return
    }
    if (sel.i === i) {
      const next = [...done, i]
      setDone(next)
      setSel(null)
      if (next.length === ex.pairs.length) onSolved(!mistake)
    } else {
      setMistake(true)
      setSel(null)
      onWrong()
    }
  }

  const cell = (side, i, face) => {
    const isDone = done.includes(i)
    const isSel = sel && sel.side === side && sel.i === i
    return (
      <button
        key={`${side}${i}`}
        type="button"
        onClick={() => tap(side, i, face)}
        disabled={isDone}
        aria-pressed={Boolean(isSel)}
        data-state={isDone ? 'correct' : isSel ? 'selected' : 'idle'}
        className={`answer-option flex w-full min-h-[4.5rem] items-center justify-center rounded-2xl border-4 bg-white p-2 shadow-sm transition active:scale-[0.98] ${
          isDone ? 'border-success bg-success/10' : isSel ? 'border-primary bg-primary/10' : 'border-primary/10'
        }`}
      >
        <Face f={face} />
        <span className="answer-state">{isDone ? '✓ Matched' : isSel ? 'Selected' : ''}</span>
      </button>
    )
  }

  return (
    <div>
      <Prompt text={ex.title} />
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        <div className="space-y-3">{ex.pairs.map((p, i) => cell('l', i, p.left))}</div>
        <div className="space-y-3">{rightOrder.map((i) => cell('r', i, ex.pairs[i].right))}</div>
      </div>
    </div>
  )
}
