import { useEffect, useRef } from 'react'
import Speaker from '../Speaker'
import Prompt from './Prompt'
import { speak } from '../../audio/audio'

const SIZE = 288

export default function TraceQ({ ex, onSolved }) {
  const canvas = useRef(null)
  const drawing = useRef(false)

  useEffect(() => {
    const c = canvas.current
    const dpr = window.devicePixelRatio || 1
    c.width = SIZE * dpr
    c.height = SIZE * dpr
    const ctx = c.getContext('2d')
    ctx.scale(dpr, dpr)
    ctx.lineWidth = 14
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#1B7A7A'
  }, [])

  useEffect(() => {
    speak(ex.letter)
  }, [ex])

  const pos = (e) => {
    const r = canvas.current.getBoundingClientRect()
    return { x: ((e.clientX - r.left) / r.width) * SIZE, y: ((e.clientY - r.top) / r.height) * SIZE }
  }
  const down = (e) => {
    drawing.current = true
    canvas.current.setPointerCapture(e.pointerId)
    const { x, y } = pos(e)
    const ctx = canvas.current.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + 0.1, y + 0.1)
    ctx.stroke()
  }
  const move = (e) => {
    if (!drawing.current) return
    const { x, y } = pos(e)
    const ctx = canvas.current.getContext('2d')
    ctx.lineTo(x, y)
    ctx.stroke()
  }
  const up = () => {
    drawing.current = false
  }
  const clear = () => {
    const c = canvas.current
    c.getContext('2d').clearRect(0, 0, SIZE, SIZE)
  }

  return (
    <div className="text-center">
      <Prompt text={ex.title} />
      <p className="-mt-2 mb-4 text-sm text-ink/60">Use your finger or mouse to draw over the letter.</p>
      <div className="relative mx-auto rounded-3xl border-4 border-primary/20 bg-white shadow-sm" style={{ width: SIZE, height: SIZE }}>
        <span
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-bangla font-bold text-ink/10"
          style={{ fontSize: 200, lineHeight: 1 }}
        >
          {ex.letter}
        </span>
        <canvas
          ref={canvas}
          className="absolute inset-0 touch-none"
          style={{ width: SIZE, height: SIZE }}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
        />
      </div>
      <div className="mt-5 flex justify-center gap-3">
        <Speaker text={ex.letter} size="md" label="Hear the letter" className="self-center" />
        <button type="button" onClick={clear} className="rounded-2xl bg-white px-5 py-3 font-extrabold text-ink/60 shadow">
          Clear
        </button>
        <button type="button" onClick={() => onSolved(true)} className="btn-primary !py-3">
          I traced it!
        </button>
      </div>
    </div>
  )
}
