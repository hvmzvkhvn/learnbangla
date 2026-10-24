import { useEffect, useRef, useState } from 'react'
import Face from './Face'
import Prompt from './Prompt'
import Speaker from '../Speaker'
import BengaliKeyboard from './BengaliKeyboard'
import { speak } from '../../audio/audio'
import { splitClusters } from '../../curriculum/text'

// Compare after Unicode decomposition so ড় typed as one character or two both match; ignore spaces and joiners.
const norm = (s) => s.normalize('NFD').replace(/[\s‌‍]/g, '')

/** Hear the word (and see its meaning), then type it in Bangla. */
export default function TypeQ({ ex, onSolved, onWrong, onTyped }) {
  const [value, setValue] = useState('')
  const [hints, setHints] = useState(0)
  const [shake, setShake] = useState(false)
  const [solved, setSolved] = useState(false)
  const mistake = useRef(false)
  const clusters = splitClusters(ex.target)

  useEffect(() => {
    speak(ex.say)
  }, [ex])

  const check = () => {
    if (solved || !value) return
    if (norm(value) === norm(ex.target)) {
      setSolved(true)
      onTyped?.()
      onSolved(!mistake.current && hints === 0)
      speak(ex.say)
    } else {
      mistake.current = true
      setShake(true)
      setTimeout(() => setShake(false), 450)
      onWrong()
    }
  }

  const hintText = hints === 0 ? null : hints === 1 ? `It starts with ${clusters[0]}` : hints === 2 ? `${clusters.length} sounds: ${clusters.map((c, i) => (i === 0 ? c : '_')).join(' ')}` : ex.target

  return (
    <div>
      <Prompt text={ex.title} />
      <div className="card mb-4 flex flex-col items-center gap-3">
        <Face f={ex.stem} big />
        <Speaker text={ex.say} size="lg" label="Hear the word" />
      </div>

      <div className={`mb-3 flex items-center gap-2 ${shake ? 'animate-shake' : ''}`}>
        <input
          lang="bn"
          inputMode="none"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          value={value}
          disabled={solved}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && check()}
          placeholder="Type here…"
          className={`input-field !py-3 text-center font-bangla !text-3xl font-bold ${solved ? '!border-success !bg-success/10' : ''}`}
        />
      </div>

      {hintText && !solved && <p className="mb-3 rounded-2xl bg-accent/30 px-4 py-2 text-center text-sm font-bold">💡 {hintText}</p>}

      {!solved && (
        <>
          <div className="mb-3 flex gap-3">
            <button type="button" onClick={() => setHints((h) => Math.min(3, h + 1))} className="flex-1 rounded-2xl bg-white px-4 py-3 font-extrabold text-ink/60 shadow">
              💡 Hint
            </button>
            <button type="button" onClick={check} disabled={!value} className="btn-primary flex-[2] !py-3">
              Check
            </button>
          </div>
          <BengaliKeyboard onKey={(c) => setValue((v) => v + c)} onBackspace={() => setValue((v) => Array.from(v).slice(0, -1).join(''))} onSpace={() => setValue((v) => v + ' ')} />
        </>
      )}
    </div>
  )
}
