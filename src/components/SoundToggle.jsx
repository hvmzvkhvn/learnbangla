import { useSoundOn } from '../audio/audio'

/** Turns automatic sounds on/off. The 🔊 buttons always work when tapped. */
export default function SoundToggle() {
  const [on, setOn] = useSoundOn()
  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      aria-pressed={on}
      title={on ? 'Automatic sound is on — tap to turn off' : 'Automatic sound is off — tap to turn on'}
      className={`flex h-11 items-center gap-1 rounded-full px-3 text-sm font-extrabold shadow-sm ${on ? 'bg-white text-primary' : 'bg-ink/10 text-ink/40'}`}
    >
      <span className="text-lg leading-none">{on ? '🔊' : '🔇'}</span>
      <span className="hidden sm:inline">{on ? 'Auto' : 'Off'}</span>
    </button>
  )
}
