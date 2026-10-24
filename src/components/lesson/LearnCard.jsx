import { useEffect } from 'react'
import { useReviewMarks } from '../../state/persist'
import { speak, speakSequence } from '../../audio/audio'
import Speaker from '../Speaker'
import SayIt from '../SayIt'

// Words inside a sentence can be tapped to hear them one at a time.
function TappableWords({ tokens }) {
  return (
    <div className="mt-3 flex flex-wrap justify-center gap-2">
      {tokens.map((t, i) => (
        <button
          key={i}
          type="button"
          onClick={() => speak(t, { force: true })}
          className="rounded-xl bg-primary/10 px-3 py-1 font-bangla text-2xl font-bold text-primary transition active:scale-95"
        >
          {t}
        </button>
      ))}
    </div>
  )
}

export default function LearnCard({ item }) {
  const [marks, setMarks] = useReviewMarks()
  const flagged = marks[item.id]?.status === 'fix'
  const toggleFlag = () =>
    setMarks((m) => ({ ...m, [item.id]: { ...m[item.id], status: flagged ? 'ok' : 'fix' } }))

  // Say it as soon as the card appears (letters: the letter, then its example word).
  useEffect(() => {
    speakSequence(item.kind === 'letter' ? [item.bn, item.example.bn] : [item.bn])
  }, [item])

  return (
    <div className="card relative text-center">
      <button
        type="button"
        onClick={toggleFlag}
        title="Flag this for the content reviewer"
        className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-extrabold ${
          flagged ? 'bg-error text-white' : 'bg-ink/5 text-ink/40'
        }`}
      >
        ⚑ {flagged ? 'Flagged' : 'Flag'}
      </button>

      {item.kind === 'letter' && (
        <>
          <p className="font-bangla text-8xl font-bold leading-tight text-primary">{item.bn}</p>
          <div className="mt-1 flex items-center justify-center gap-3">
            <span className="rounded-full bg-accent px-4 py-1 text-xl font-extrabold">{item.roman}</span>
            <Speaker text={item.bn} size="lg" label="Hear the letter" />
          </div>
          <div className="mt-5 border-t border-primary/10 pt-4">
            <p className="text-6xl">{item.example.emoji}</p>
            <p className="font-bangla text-3xl font-bold text-ink">{item.example.bn}</p>
            <p className="font-bold text-primary">{item.example.roman}</p>
            <p className="mb-2 text-sm text-ink/50">{item.example.en}</p>
            <Speaker text={item.example.bn} label="Hear the word" />
          </div>
        </>
      )}

      {(item.kind === 'sign' || item.kind === 'syllable') && (
        <>
          <p className="font-bangla text-8xl font-bold leading-tight text-primary">{item.bn}</p>
          <div className="mt-1 flex items-center justify-center gap-3">
            <span className="rounded-full bg-accent px-4 py-1 text-xl font-extrabold">{item.roman}</span>
            <Speaker text={item.bn} size="lg" label="Hear it" />
          </div>
          {item.signChar && (
            <p className="mt-4 text-ink/60">
              The sign <span className="font-bangla text-3xl font-bold text-ink">◌{item.signChar}</span> says "{item.signRoman}"
            </p>
          )}
        </>
      )}

      {item.kind === 'word' && (
        <>
          <p className="font-bangla text-8xl">{item.art}</p>
          <p className="mt-2 font-bangla text-5xl font-bold leading-snug text-primary">{item.bn}</p>
          <p className="mt-1 text-xl font-extrabold text-ink">{item.roman}</p>
          <p className="mb-3 text-ink/60">{item.en}</p>
          <Speaker text={item.bn} size="lg" label="Hear the word" />
        </>
      )}

      {(item.kind === 'sentence' || item.kind === 'form') && (
        <>
          <p className="mt-6 font-bangla text-4xl font-bold leading-snug text-primary">{item.bn}</p>
          <p className="mt-2 text-lg font-extrabold text-ink">{item.roman}</p>
          <p className="mb-3 text-ink/60">{item.en}</p>
          <Speaker text={item.bn} size="lg" label="Hear the sentence" />
          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-ink/40">Tap a word to hear it</p>
          <TappableWords tokens={item.tokens} />
        </>
      )}

      <SayIt text={item.bn} maxSeconds={item.kind === 'sentence' || item.kind === 'form' ? 12 : 6} />
    </div>
  )
}
