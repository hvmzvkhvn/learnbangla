import { useMemo, useRef, useState } from 'react'
import TypeQ from '../lesson/TypeQ'
import { typeExercise } from '../../curriculum/exercises'
import { shuffle } from '../../curriculum/text'
import { useGame } from '../../state/game'
import { recordAnswer } from '../../state/srs'

/** Hear a word, type it in Bangla. Six rounds. onFinish({ correct, total }) */
export default function TypeItGame({ pool, count = 6, onFinish }) {
  const { act } = useGame()
  const rounds = useMemo(() => shuffle(pool).map(typeExercise).filter(Boolean).slice(0, count), [pool, count])
  const [i, setI] = useState(0)
  const [status, setStatus] = useState('idle')
  const right = useRef(0)
  if (!rounds.length) return <p className="py-10 text-center text-ink/50">Learn a few more words first!</p>
  const ex = rounds[i]
  const next = () => {
    setStatus('idle')
    if (i + 1 < rounds.length) setI(i + 1)
    else onFinish({ correct: right.current, total: rounds.length })
  }
  return (
    <div>
      <p className="mb-3 text-center text-sm font-extrabold uppercase tracking-wide text-ink/40">
        Word {i + 1} of {rounds.length}
      </p>
      <TypeQ
        key={ex.id}
        ex={ex}
        onTyped={() => act({ stats: (s) => ({ typed: s.typed + 1 }) })}
        onSolved={(clean) => {
          recordAnswer(ex.itemId, clean)
          if (clean) right.current += 1
          setStatus('solved')
        }}
        onWrong={() => setStatus('wrong')}
      />
      <div className="mt-4 min-h-[4.5rem]">
        {status === 'wrong' && <p className="gentle-error text-center">Oops, not quite — try again!</p>}
        {status === 'solved' && (
          <button className="btn-primary w-full" onClick={next}>
            {i + 1 < rounds.length ? 'Next word' : 'See my score'}
          </button>
        )}
      </div>
    </div>
  )
}
