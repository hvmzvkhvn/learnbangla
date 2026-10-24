import { useEffect, useRef, useState } from 'react'
import Speaker from '../Speaker'
import Prompt from './Prompt'
import StrokeDemo from './StrokeDemo'
import { speak } from '../../audio/audio'
import { GRID_CELL, drawText, ensureFont, scoreTrace, toGrid } from '../../curriculum/trace'
import { isGuideApproved } from '../../data/strokesApproved'

const MESSAGES = {
  3: ['Perfect tracing! ⭐⭐⭐', 'text-success'],
  2: ['Nice! Try to stay right on the letter. ⭐⭐', 'text-primary'],
  1: ['Good try! Cover all of the shape next time. ⭐', 'text-secondary'],
  0: ['Trace over the shape with your finger or mouse — try again!', 'text-error'],
}

/**
 * Trace a letter, sign, word or number. The drawing is scored (1–3 stars) by how much of the glyph it covers
 * and how little it strays. onSolved(stars) is called when the learner moves on.
 */
export default function TraceQ({ ex, onSolved, lenient = false }) {
  const tall = ex.gKind === 'letter' || ex.gKind === 'digit'
  const W = 320
  const H = tall ? 280 : 200
  const ghostRef = useRef(null)
  const drawRef = useRef(null)
  const info = useRef({ T: null, gw: 0, gh: 0, pen: 14 })
  const drawing = useRef(false)
  const [ready, setReady] = useState(false)
  const [result, setResult] = useState(null)
  const [demo, setDemo] = useState(false)
  const [tries, setTries] = useState(0)

  useEffect(() => {
    let cancelled = false
    speak(ex.say)
    ;(async () => {
      await ensureFont(ex.glyph)
      if (cancelled) return
      const dpr = window.devicePixelRatio || 1
      const ghost = ghostRef.current
      ghost.width = W * dpr
      ghost.height = H * dpr
      const gc = ghost.getContext('2d')
      gc.scale(dpr, dpr)
      const size = drawText(gc, ex.glyph, W, H, lenient ? 'rgba(232,155,42,0.34)' : 'rgba(45,45,45,0.2)')

      const solid = document.createElement('canvas')
      solid.width = W
      solid.height = H
      drawText(solid.getContext('2d'), ex.glyph, W, H, '#000')
      const gw = Math.ceil(W / GRID_CELL)
      const gh = Math.ceil(H / GRID_CELL)
      info.current = { T: toGrid(solid, gw, gh), gw, gh, pen: Math.max(9, Math.min(16, size * 0.07)) }

      const dc = drawRef.current
      dc.width = W * dpr
      dc.height = H * dpr
      const ctx = dc.getContext('2d')
      ctx.scale(dpr, dpr)
      ctx.lineWidth = info.current.pen
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.strokeStyle = '#1B7A7A'
      setReady(true)
    })()
    return () => {
      cancelled = true
    }
  }, [ex])

  const pos = (e) => {
    const r = drawRef.current.getBoundingClientRect()
    return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H }
  }
  const down = (e) => {
    if (result || !ready) return
    drawing.current = true
    try {
      drawRef.current.setPointerCapture(e.pointerId)
    } catch {
      /* capture is only a nicety */
    }
    const { x, y } = pos(e)
    const ctx = drawRef.current.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + 0.1, y + 0.1)
    ctx.stroke()
  }
  const move = (e) => {
    if (!drawing.current) return
    const { x, y } = pos(e)
    const ctx = drawRef.current.getContext('2d')
    ctx.lineTo(x, y)
    ctx.stroke()
  }
  const up = () => {
    drawing.current = false
  }

  const clear = () => {
    const dc = drawRef.current
    const ctx = dc.getContext('2d')
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, dc.width, dc.height)
    ctx.restore()
    setResult(null)
  }

  const check = () => {
    const { T, gw, gh, pen } = info.current
    const U = toGrid(drawRef.current, gw, gh)
    const penR = Math.ceil(pen / 2 / GRID_CELL) + 1
    const tolR = Math.ceil(pen / GRID_CELL) + 1
    const r = scoreTrace(T, U, gw, gh, penR, tolR, lenient)
    setResult(r)
    setTries((t) => t + 1)
  }

  const guided = isGuideApproved(ex.glyph, ex.gKind)
  const [msg, tone] = result ? MESSAGES[result.stars] : ['', '']

  return (
    <div className="text-center">
      <Prompt text={ex.title} />
      <p className="-mt-2 mb-3 text-sm text-ink/60">Use your finger or mouse to draw over the shape.</p>

      {demo ? (
        <div className="mx-auto rounded-3xl border-4 border-primary/20 bg-white p-2 shadow-sm" style={{ width: W + 20, maxWidth: '100%' }}>
          <StrokeDemo glyph={ex.glyph} width={W} height={H} />
        </div>
      ) : (
        <div className="relative mx-auto rounded-3xl border-4 border-primary/20 bg-white shadow-sm" style={{ width: W, maxWidth: '100%', aspectRatio: `${W} / ${H}` }}>
          <canvas ref={ghostRef} className="absolute inset-0 h-full w-full" />
          <canvas
            ref={drawRef}
            className="absolute inset-0 h-full w-full touch-none"
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
            aria-label="Drawing area"
          />
        </div>
      )}

      {result && (
        <div className="animate-pop mx-auto mt-4 max-w-sm">
          <p className={`rounded-2xl bg-white px-4 py-3 text-lg font-extrabold shadow-sm ${tone}`}>{msg}</p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <Speaker text={ex.say} size="md" label="Hear it" />
        {guided && (
          <button type="button" onClick={() => setDemo((d) => !d)} className="rounded-2xl bg-white px-4 py-3 font-extrabold text-primary shadow">
            {demo ? '✏️ Back to tracing' : '▶ Watch how'}
          </button>
        )}
        {!demo && (
          <>
            <button type="button" onClick={clear} className="rounded-2xl bg-white px-4 py-3 font-extrabold text-ink/60 shadow">
              Clear
            </button>
            {result && result.stars > 0 ? (
              <>
                <button type="button" onClick={clear} className="rounded-2xl bg-white px-4 py-3 font-extrabold text-primary shadow">
                  Try again
                </button>
                <button type="button" onClick={() => onSolved(result.stars)} className="btn-primary !py-3">
                  Continue
                </button>
              </>
            ) : (
              <button type="button" onClick={check} disabled={!ready} className="btn-primary !py-3">
                Check ✓
              </button>
            )}
          </>
        )}
      </div>
      <button type="button" onClick={() => onSolved(result?.stars ?? 0)} className="mt-3 text-xs font-bold text-ink/40 hover:text-ink/60">
        {tries > 0 && !(result && result.stars > 0) ? 'Skip this one' : 'Skip'}
      </button>
    </div>
  )
}
