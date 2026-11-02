import { useUI } from '../ui/preferences'
import VisualText from '../art/VisualText'
import { useSoundOn } from '../audio/audio'

/** Turns automatic sounds on/off. The 🔊 buttons always work when tapped. */
export default function SoundToggle() {
  const [on, setOn] = useSoundOn()
  const [ui] = useUI()
  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      aria-pressed={on && !ui.calm}
      disabled={ui.calm}
      title={on ? 'Automatic sound is on — tap to turn off' : 'Automatic sound is off — tap to turn on'}
      className={`sound-toggle flex min-h-11 items-center gap-1 rounded-full px-3 text-sm font-bold shadow-sm ${on ? 'bg-white text-primary' : 'bg-ink/10 text-muted'}`}
    >
      <span className="text-lg leading-none">
        <VisualText decorative>{on ? '🔊' : '🔇'}</VisualText>
      </span>
      <span>{ui.calm ? 'Auto sound paused' : on ? 'Auto sound on' : 'Auto sound off'}</span>
    </button>
  )
}
