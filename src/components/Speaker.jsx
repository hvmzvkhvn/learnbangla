import UiIcon from '../art/UiIcon'
import { useEffect, useRef, useState } from 'react'
import { speak, speakEnglish, stop, canSpeakEnglish } from '../audio/audio'

/** Inline is for compact presentation only; callers must not nest interactive controls. */
export default function Speaker({ text, english = false, inline = false, size = 'md', label = 'Listen', className = '' }) {
  const [state, setState] = useState('idle'),
    [error, setError] = useState(''),
    [rate, setRate] = useState(1),
    [repeat, setRepeat] = useState(false)
  const request = useRef(0),
    mounted = useRef(true),
    busy = state === 'loading' || state === 'playing'
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  if (!text || (english && !canSpeakEnglish())) return null
  async function play(e) {
    e.stopPropagation()
    e.preventDefault()
    if (busy) {
      request.current++
      stop()
      setState('idle')
      return
    }
    const id = ++request.current
    const live = () => mounted.current && id === request.current
    setError('')
    setState('loading')
    const onState = (value) => {
      if (live()) setState(value)
    }
    try {
      const run = () => (english ? speakEnglish(text, { force: true, onState }) : speak(text, { force: true, rate, onState }))
      let ok = await run()
      if (ok && repeat && live()) ok = await run()
      if (live()) {
        setState(ok === false ? 'error' : 'idle')
        if (ok === false) setError('Audio unavailable. Check your connection, then try again.')
      }
    } catch {
      if (live()) {
        setState('error')
        setError('Audio unavailable. Try again.')
      }
    }
  }
  const sizes = { sm: '', md: '', lg: 'h-14 w-14 !text-3xl' }
  const status = state === 'loading' ? 'Loading audio…' : state === 'playing' ? 'Playing · tap to stop' : ''
  return (
    <span className={`audio-control ${inline ? 'audio-inline' : ''}`}>
      <button
        type="button"
        aria-label={busy ? `Stop: ${label}` : state === 'error' ? `Retry: ${label}` : label}
        title={busy ? 'Stop audio' : label}
        data-state={state}
        className={`speaker-button ${sizes[size]} ${className}`}
        onClick={play}
      >
        <UiIcon name={busy ? 'stop' : state === 'error' ? 'repeat' : 'sound'} />
      </button>
      <span className={size === 'lg' || busy ? 'audio-status' : 'sr-only'} role="status">
        {status}
      </span>
      {size === 'lg' && !english && (
        <span className="audio-options">
          <label>
            Speed{' '}
            <select aria-label="Audio playback speed" value={rate} onChange={(e) => setRate(Number(e.target.value))}>
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
        <span role="status" className="audio-error">
          {error}
        </span>
      )}
    </span>
  )
}
