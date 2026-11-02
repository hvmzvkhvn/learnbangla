import VisualText from '../art/VisualText'
import { useState } from 'react'
import { speak, speakEnglish, hasAudio, useAudioReady, canSpeakEnglish } from '../audio/audio'

/**
 * 🔊 button. `text` is Bangla (plays the recording) unless `english` is set.
 * `inline` renders a span so it can sit inside another button without nesting buttons.
 */
export default function Speaker({ text, english = false, inline = false, size = 'md', label = 'Listen', className = '' }) {
  const ready = useAudioReady()
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState('')
  const [rate, setRate] = useState(1)
  const [repeat, setRepeat] = useState(false)
  if (!text || (english && !canSpeakEnglish())) return null
  const missing = !english && ready && !hasAudio(text)

  const play = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (english) return speakEnglish(text)
    setPlaying(true)
    setError('')
    try {
      const ok = await speak(text, { force: true, rate })
      if (!ok) setError('Audio did not play. Check your connection and tap Listen to retry.')
      else if (repeat) await speak(text, { force: true, rate })
    } catch {
      setError('Audio is unavailable. Tap Listen to retry.')
    } finally {
      setPlaying(false)
    }
  }

  const sizes = { sm: 'h-8 w-8 text-base', md: 'h-11 w-11 text-xl', lg: 'h-14 w-14 text-3xl' }
  const cls = `inline-flex shrink-0 select-none items-center justify-center rounded-full shadow-sm transition active:scale-90 ${sizes[size]} ${
    playing ? 'bg-secondary text-ink' : 'bg-accent/70 text-ink hover:bg-accent'
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
        <VisualText decorative>🔊</VisualText>
      </span>
    )
  }
  return (
    <span className="inline-flex flex-col items-center gap-2">
      <button type="button" aria-label={label} title={missing ? 'No audio yet' : label} className={cls} onClick={play}>
        <VisualText decorative>🔊</VisualText>
      </button>
      {size === 'lg' && !english && (
        <span className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold">
          <label>
            Speed{' '}
            <select
              aria-label="Audio playback speed"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="rounded-lg border border-primary/30 bg-white p-2"
            >
              <option value={1}>Normal</option>
              <option value={0.75}>Slow</option>
            </select>
          </label>
          <label>
            <input type="checkbox" checked={repeat} onChange={(e) => setRepeat(e.target.checked)} /> Play twice
          </label>
        </span>
      )}
      {error && (
        <span role="status" className="max-w-xs text-sm text-error">
          {error}
        </span>
      )}
    </span>
  )
}
