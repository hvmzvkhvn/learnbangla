import { useEffect, useState } from 'react'
import Face from './Face'
import Prompt from './Prompt'
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
      <div className="grid grid-cols-2 gap-3">
        {ex.options.map((o, i) => {
          const isRight = solved && i === ex.answer
          const isWrong = wrong.includes(i)
          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              disabled={isWrong}
              className={`flex min-h-[6rem] items-center justify-center rounded-3xl border-4 bg-white p-3 shadow-sm transition active:scale-95 ${
                isRight
                  ? 'border-success bg-success/10'
                  : isWrong
                    ? 'animate-shake border-error/60 bg-error/10 opacity-60'
                    : 'border-primary/10 hover:border-primary/40'
              }`}
            >
              <Face f={o} speak />
            </button>
          )
        })}
      </div>
    </div>
  )
}
