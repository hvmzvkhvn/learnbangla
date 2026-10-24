import { useRef, useState } from 'react'
import ChoiceQ from '../lesson/ChoiceQ'

/** A fixed set of multiple-choice questions, one after another. onFinish({ correct, total }) */
export default function QuizRunner({ exercises, onFinish, label = 'Question' }) {
  const [i, setI] = useState(0)
  const [status, setStatus] = useState('idle')
  const right = useRef(0)
  const ex = exercises[i]

  const next = () => {
    setStatus('idle')
    if (i + 1 < exercises.length) setI(i + 1)
    else onFinish({ correct: right.current, total: exercises.length })
  }

  return (
    <div>
      <p className="mb-3 text-center text-sm font-extrabold uppercase tracking-wide text-ink/40">
        {label} {i + 1} of {exercises.length}
      </p>
      <ChoiceQ
        key={ex.id}
        ex={ex}
        onSolved={(clean) => {
          if (clean) right.current += 1
          setStatus('solved')
        }}
        onWrong={() => setStatus('wrong')}
      />
      <div className="mt-6 min-h-[5.5rem]">
        {status === 'wrong' && <p className="gentle-error text-center">Oops, not quite — try again!</p>}
        {status === 'solved' && (
          <button className="btn-primary w-full" onClick={next}>
            {i + 1 < exercises.length ? 'Continue' : 'See my score'}
          </button>
        )}
      </div>
    </div>
  )
}
