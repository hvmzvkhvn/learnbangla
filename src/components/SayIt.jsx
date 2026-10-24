import { useEffect, useRef, useState } from 'react'
import { speak, stop as stopNative } from '../audio/audio'

const supported = () => typeof navigator !== 'undefined' && Boolean(navigator.mediaDevices?.getUserMedia) && typeof MediaRecorder !== 'undefined'

/**
 * "Say it": record yourself saying the text, then play your voice next to the native recording.
 * The recording never leaves the device — it only exists in memory until you try again or leave.
 */
export default function SayIt({ text, maxSeconds = 8 }) {
  const [phase, setPhase] = useState('idle') // idle | recording | review
  const [err, setErr] = useState('')
  const [url, setUrl] = useState('')
  const rec = useRef(null)
  const stream = useRef(null)
  const timer = useRef(0)
  const player = useRef(null)

  const cleanup = () => {
    clearTimeout(timer.current)
    stream.current?.getTracks().forEach((t) => t.stop())
    stream.current = null
    player.current?.pause()
  }
  useEffect(() => () => cleanup(), [])
  useEffect(() => () => url && URL.revokeObjectURL(url), [url])
  // a new card: forget the last recording
  useEffect(() => {
    cleanup()
    setPhase('idle')
    setUrl('')
    setErr('')
  }, [text])

  if (!supported()) return null

  const start = async () => {
    setErr('')
    stopNative()
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.current = s
      const r = new MediaRecorder(s)
      const chunks = []
      r.ondataavailable = (e) => e.data.size && chunks.push(e.data)
      r.onstop = () => {
        const blob = new Blob(chunks, { type: r.mimeType || 'audio/webm' })
        cleanup()
        setUrl(URL.createObjectURL(blob))
        setPhase('review')
      }
      rec.current = r
      r.start()
      setPhase('recording')
      timer.current = setTimeout(() => r.state === 'recording' && r.stop(), maxSeconds * 1000)
    } catch (e) {
      cleanup()
      setPhase('idle')
      setErr(e?.name === 'NotAllowedError' || e?.name === 'SecurityError' ? 'Allow the microphone in your browser to try this.' : 'No microphone found.')
    }
  }
  const finish = () => rec.current?.state === 'recording' && rec.current.stop()

  const playMine = () =>
    new Promise((resolve) => {
      player.current?.pause()
      const a = new Audio(url)
      player.current = a
      a.onended = a.onerror = () => resolve()
      a.play().catch(resolve)
    })
  const playBoth = async () => {
    await speak(text, { force: true })
    await playMine()
  }

  return (
    <div className="mt-5 border-t border-primary/10 pt-4 text-center">
      {phase === 'idle' && (
        <button type="button" onClick={start} className="rounded-2xl bg-primary/10 px-5 py-3 font-extrabold text-primary transition active:scale-95 hover:bg-primary/20">
          🎤 Say it
        </button>
      )}
      {phase === 'recording' && (
        <button type="button" onClick={finish} className="rounded-2xl bg-error px-5 py-3 font-extrabold text-white transition active:scale-95">
          <span className="mr-2 inline-block h-3 w-3 animate-pulse rounded-full bg-white align-middle" />
          Listening… tap when done
        </button>
      )}
      {phase === 'review' && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button type="button" onClick={() => speak(text, { force: true })} className="rounded-2xl bg-accent/70 px-4 py-3 font-extrabold text-ink hover:bg-accent">🔊 Native</button>
          <button type="button" onClick={playMine} className="rounded-2xl bg-secondary px-4 py-3 font-extrabold text-white">▶ You</button>
          <button type="button" onClick={playBoth} className="rounded-2xl bg-white px-4 py-3 font-extrabold text-primary shadow">Both</button>
          <button type="button" onClick={start} className="rounded-2xl bg-white px-4 py-3 font-extrabold text-ink/60 shadow">↻ Again</button>
        </div>
      )}
      {err && <p className="mt-2 text-sm font-bold text-error">{err}</p>}
      <p className="mt-2 text-xs text-ink/40">{phase === 'review' ? 'Listen to both — does yours sound close?' : 'Your voice stays on your device.'}</p>
    </div>
  )
}
