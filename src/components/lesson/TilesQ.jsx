import { useEffect, useMemo, useRef, useState } from 'react'
import Face from './Face'
import Prompt from './Prompt'
import Speaker from '../Speaker'
import { shuffle } from '../../curriculum/text'
import { speak } from '../../audio/audio'

export default function TilesQ({ ex, onSolved, onWrong }) {
  const order = useMemo(() => {
    let o = shuffle(ex.tiles.map((_, i) => i))
    // avoid starting already solved
    for (let k = 0; k < 5 && o.map((i) => ex.tiles[i]).join(ex.joiner) === ex.target && new Set(ex.tiles).size > 1; k++) {
      o = shuffle(o)
    }
    return o
  }, [ex])
  const [placed, setPlaced] = useState([]) // tile indexes in answer order
  const [solved, setSolved] = useState(false)
  const mistake = useRef(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  function place(i) {
    if (solved || placed.includes(i) || placed.length >= ex.tiles.length) return
    const next = [...placed, i]
    setPlaced(next)
    if (ex.speakTiles) speak(ex.tiles[i])
    if (next.length === ex.tiles.length) {
      if (next.map((k) => ex.tiles[k]).join(ex.joiner) === ex.target) {
        setSolved(true)
        onSolved(!mistake.current)
        speak(ex.say)
      } else {
        mistake.current = true
        onWrong()
        timer.current = setTimeout(() => setPlaced([]), 900)
      }
    }
  }

  const remove = (i) => {
    if (!solved && placed.length < ex.tiles.length) setPlaced((p) => p.filter((k) => k !== i))
  }

  return (
    <div>
      <Prompt text={ex.title} />
      <div className="card mb-5 flex min-h-[7rem] flex-col items-center justify-center gap-2">
        <Face f={ex.stem} big />
        <Speaker text={ex.say} label="Hear it in Bangla" />
      </div>
      <div
        className={`mb-5 flex min-h-[5.75rem] ${ex.compact ? 'flex-col items-stretch' : 'flex-wrap items-center justify-center'} gap-2 rounded-2xl border-4 border-dashed p-3 ${
          solved ? 'border-success bg-success/10' : 'border-primary/20 bg-white'
        }`}
      >
        {placed.map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => remove(i)}
            className={`rounded-xl bg-primary px-3 py-2 font-bangla font-bold text-white shadow ${ex.compact ? 'w-full text-left text-lg' : 'text-2xl'}`}
          >
            {ex.tiles[i]}
          </button>
        ))}
      </div>
      <div className={`flex gap-2 ${ex.compact ? 'flex-col' : 'flex-wrap items-center justify-center'}`}>
        {order.map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => place(i)}
            disabled={placed.includes(i)}
            className={`rounded-xl border-4 border-primary/20 bg-white px-3 py-2 font-bangla font-bold text-primary shadow-sm transition active:scale-95 ${
              ex.compact ? 'w-full text-left text-lg' : 'text-2xl'
            } ${placed.includes(i) ? 'opacity-20' : ''}`}
          >
            {ex.tiles[i]}
          </button>
        ))}
      </div>
    </div>
  )
}
