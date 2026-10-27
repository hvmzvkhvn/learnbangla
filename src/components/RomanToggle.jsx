import { useRoman } from '../state/roman'

/** Shows or hides the Latin-letter transliteration under Bangla text, everywhere. */
export default function RomanToggle() {
  const [on, setOn] = useRoman()
  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      aria-pressed={on}
      title={on ? 'Transliteration is on — tap to hide it' : 'Transliteration is off — tap to show it'}
      className={`flex h-11 items-center gap-1 rounded-full px-3 text-sm font-extrabold shadow-sm ${on ? 'bg-white text-primary' : 'bg-ink/10 text-ink/40'}`}
    >
      <span className={`text-lg leading-none ${on ? '' : 'line-through'}`}>Aa</span>
      <span className="hidden sm:inline">{on ? 'Roman' : 'Off'}</span>
    </button>
  )
}
