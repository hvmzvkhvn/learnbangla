import { usePersistent } from '../state/persist'
import VisualText from '../art/VisualText'
import Speaker from './Speaker'
export default function WordGuide() {
  const [seen, setSeen] = usePersistent('lb.wordGuideSeen', false)
  return (
    <details
      className="word-guide"
      open={!seen || undefined}
      onToggle={(e) => {
        if (!e.currentTarget.open && !seen) setSeen(true)
      }}
    >
      <summary>How to use a word card</summary>
      <div className="word-guide-content">
        <span className="text-5xl">
          <VisualText decorative>🥭</VisualText>
        </span>
        <div>
          <p>
            <strong lang="bn" className="font-bangla text-2xl">
              আম
            </strong>{' '}
            — the Bangla word
          </p>
          <p>
            <strong>am</strong> — a pronunciation guide
          </p>
          <p>
            <strong>mango</strong> — the English meaning
          </p>
        </div>
        <Speaker text="আম" label="Hear mango in Bangla" />
      </div>
      <p>Tap the speaker to listen. Use “Show pronunciation” whenever you need help reading.</p>
      <button
        type="button"
        className="btn-quiet"
        onClick={(e) => {
          setSeen(true)
          e.currentTarget.closest('details').open = false
        }}
      >
        Got it
      </button>
    </details>
  )
}
