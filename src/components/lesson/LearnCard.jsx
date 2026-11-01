import { useEffect } from 'react'
import { useReviewMarks } from '../../state/persist'
import { speak, speakSequence } from '../../audio/audio'
import Speaker from '../Speaker'
import SayIt from '../SayIt'
import { useRoman } from '../../state/roman'

// Words inside a sentence can be tapped to hear them one at a time.
function TappableWords({ tokens }) {
  return (
    <div className="mt-3 flex flex-wrap justify-center gap-2">
      {tokens.map((t, i) => (
        <button
          lang="bn"
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
  const [romanOn] = useRoman()
  const [marks, setMarks] = useReviewMarks()
  const flagged = marks[item.id]?.status === 'fix'
  const toggleFlag = () => setMarks((m) => ({ ...m, [item.id]: { ...m[item.id], status: flagged ? 'ok' : 'fix' } }))

  // Say it as soon as the card appears (letters: the letter, then its example word).
  useEffect(() => {
    speakSequence(item.kind === 'letter' ? [item.bn, item.example.bn] : [item.bn])
  }, [item])

  return (
    <div className="card relative text-center">
      <button
        type="button"
        onClick={toggleFlag}
        title="Save a flag on this device"
        className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-extrabold ${
          flagged ? 'bg-error text-white' : 'bg-ink/5 text-ink/70'
        }`}
      >
        ⚑ {flagged ? 'Flagged' : 'Flag'}
      </button>

      {flagged && (
        <div className="mb-4 mt-6 rounded-xl bg-accent/30 p-3 text-sm" role="status">
          <p>Flag saved on this device. It has not been sent.</p>
          <a
            className="font-bold underline"
            href={`mailto:info@learnbangla.app?subject=${encodeURIComponent('Learn Bangla content: ' + item.id)}&body=${encodeURIComponent('Item: ' + item.id + '\nBangla: ' + item.bn + '\nSuggested correction: ')}`}
          >
            Email a correction
          </a>
          <p>Your email app opens a draft. Review it before sending.</p>
        </div>
      )}
      {item.kind === 'letter' && (
        <>
          <p lang="bn" className="font-bangla text-8xl font-bold leading-tight text-primary">
            {item.bn}
          </p>
          <div className="mt-1 flex items-center justify-center gap-3">
            {romanOn && <span className="rounded-full bg-accent px-4 py-1 text-xl font-extrabold">{item.roman}</span>}
            <Speaker text={item.bn} size="lg" label="Hear the letter" />
          </div>
          <div className="mt-5 border-t border-primary/10 pt-4">
            <p className="text-6xl">{item.example.emoji}</p>
            <p lang="bn" className="font-bangla text-3xl font-bold text-ink">
              {item.example.bn}
            </p>
            {romanOn && <p className="font-bold text-primary">{item.example.roman}</p>}
            <p className="mb-2 text-sm text-ink/70">{item.example.en}</p>
            <Speaker text={item.example.bn} label="Hear the word" />
          </div>
        </>
      )}

      {(item.kind === 'sign' || item.kind === 'syllable') && (
        <>
          <p lang="bn" className="font-bangla text-8xl font-bold leading-tight text-primary">
            {item.bn}
          </p>
          <div className="mt-1 flex items-center justify-center gap-3">
            {romanOn && <span className="rounded-full bg-accent px-4 py-1 text-xl font-extrabold">{item.roman}</span>}
            <Speaker text={item.bn} size="lg" label="Hear it" />
          </div>
          {item.signChar && (
            <p className="mt-4 text-ink/75">
              The sign <span className="font-bangla text-3xl font-bold text-ink">◌{item.signChar}</span> says "{item.signRoman}"
            </p>
          )}
        </>
      )}

      {item.kind === 'word' && (
        <>
          <p lang="bn" className="font-bangla text-8xl">
            {item.art}
          </p>
          <p lang="bn" className="mt-2 font-bangla text-5xl font-bold leading-snug text-primary">
            {item.bn}
          </p>
          {romanOn && <p className="mt-1 text-xl font-extrabold text-ink">{item.roman}</p>}
          <p className="mb-3 text-ink/75">{item.en}</p>
          <Speaker text={item.bn} size="lg" label="Hear the word" />
        </>
      )}

      {(item.kind === 'sentence' || item.kind === 'form') && (
        <>
          <p lang="bn" className="mt-6 font-bangla text-4xl font-bold leading-snug text-primary">
            {item.bn}
          </p>
          {romanOn && <p className="mt-2 text-lg font-extrabold text-ink">{item.roman}</p>}
          <p className="mb-3 text-ink/75">{item.en}</p>
          <Speaker text={item.bn} size="lg" label="Hear the sentence" />
          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-ink/70">Tap a word to hear it</p>
          <TappableWords tokens={item.tokens} />
        </>
      )}

      <SayIt text={item.bn} maxSeconds={item.kind === 'sentence' || item.kind === 'form' ? 12 : 6} />
    </div>
  )
}
