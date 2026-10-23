import { useState } from 'react'
import { speak, speakEnglish, hasAudio, useAudioReady, canSpeakEnglish } from '../audio/audio'

/**
 * 🔊 button. `text` is Bangla (plays the recording) unless `english` is set.
 * `inline` renders a span so it can sit inside another button without nesting buttons.
 */
export default function Speaker({ text, english = false, inline = false, size = 'md', label = 'Listen', className = '' }) {
  const ready = useAudioReady()
  const [playing, setPlaying] = useState(false)
  if (!text || (english && !canSpeakEnglish())) return null
  const missing = !english && ready && !hasAudio(text)

  const play = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (english) return speakEnglish(text)
    setPlaying(true)
    await speak(text, { force: true })
    setPlaying(false)
  }

  const sizes = { sm: 'h-8 w-8 text-base', md: 'h-11 w-11 text-xl', lg: 'h-14 w-14 text-3xl' }
  const cls = `inline-flex shrink-0 select-none items-center justify-center rounded-full shadow-sm transition active:scale-90 ${sizes[size]} ${
    playing ? 'bg-secondary text-white' : 'bg-accent/70 text-ink hover:bg-accent'
  } ${missing ? 'opacity-30' : ''} ${className}`

  if (inline) {
    return (
      <span
        role="button"
        tabIndex={0}
        aria-label={label}
        title={missing ? 'No audio yet' : label}
        className={cls}
        onClick={play}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && play(e)}
      >
        🔊
      </span>
    )
  }
  return (
    <button type="button" aria-label={label} title={missing ? 'No audio yet' : label} className={cls} onClick={play}>
      🔊
    </button>
  )
}
