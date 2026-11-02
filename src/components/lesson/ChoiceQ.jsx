import { useEffect, useState } from 'react'
import Face from './Face'
import Prompt from './Prompt'
import Speaker from '../Speaker'
import { speak } from '../../audio/audio'

export default function ChoiceQ({ ex, onSolved, onWrong }) {
  const [wrong, setWrong] = useState([])
  const [solved, setSolved] = useState(false)

  // Listening practice: say the Bangla in the question as it appears.
  useEffect(() => {
    if (ex.stem.listen) speak(ex.stem.say)
    else if (ex.stem.bn && !ex.stem.noAudio) speak(ex.stem.bn)
  }, [ex])

  function choose(i) {
    if (solved || wrong.includes(i)) return
    const o = ex.options[i]
    if (i === ex.answer) {
      setSolved(true)
      onSolved(wrong.length === 0)
      speak(ex.say ?? o.bn ?? ex.stem.say)
    } else {
      setWrong((w) => [...w, i])
      onWrong()
      if (o.bn) speak(o.bn)
    }
  }

  return (
    <div>
      <Prompt text={ex.title} />
      <div className="card mb-5 flex min-h-[8rem] items-center justify-center">
        <Face f={ex.stem} big speak />
      </div>
      <div className="feedback-slot">
        {wrong.length > 0 && !solved && (
          <p role="status" className="gentle-error mb-3">
            Compare the remaining choices. Listen again.{' '}
            {wrong.length >= 2
              ? `The answer is ${ex.options[ex.answer]?.bn ?? ex.options[ex.answer]?.text ?? ex.options[ex.answer]?.roman ?? 'the remaining choice'}. Say it aloud, then choose it.`
              : 'Try noticing the first sound or the meaning of the word.'}
          </p>
        )}
      </div>
      <div className="choice-grid">
        {ex.options.map((o, i) => {
          const isRight = solved && i === ex.answer
          const isWrong = wrong.includes(i)
          return (
            <div key={i} className="answer-with-audio">
              <button
                type="button"
                onClick={() => choose(i)}
                disabled={isWrong || solved}
                data-state={isRight ? 'correct' : isWrong ? 'incorrect' : 'idle'}
                className={`answer-option flex w-full min-h-[6rem] items-center justify-center rounded-3xl border-4 bg-white p-3 shadow-sm transition active:scale-[0.98] ${
                  isRight
                    ? 'border-success bg-success/10'
                    : isWrong
                      ? 'border-error bg-error/10'
                      : 'border-primary/10 hover:border-primary/40'
                }`}
              >
                <Face f={o} />
                <span className="answer-state">{isRight ? '✓ Correct' : isWrong ? 'Try another answer' : ''}</span>
              </button>
              {o.bn && !o.noAudio && <Speaker text={o.say ?? o.bn} size="sm" label={`Hear choice ${i + 1}`} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
