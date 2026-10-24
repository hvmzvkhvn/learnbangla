import { useEffect, useMemo, useRef, useState } from 'react'
import { buildStrokes, applyFix, strokeLength } from '../../curriculum/strokes'
import { drawText, ensureFont } from '../../curriculum/trace'
import { FIXES } from '../../data/strokeFixes'

const COLORS = ['#1B7A7A', '#D9822B', '#7A4FB5', '#2E8B57', '#C2410C', '#2563EB', '#B83280', '#4D7C0F']

/** The corrections in force: the committed ones, plus anything being tried out on this device. */
export function fixFor(glyph, local) {
  return local?.[glyph] ?? FIXES[glyph]
}

/**
 * Shows how to write a glyph: a pen follows each stroke in turn (numbered, in order, headline last).
 * `editing` instead draws every stroke at once, colour-coded with arrows, for the review page.
 */
export default function StrokeDemo({ glyph, width = 320, height = 280, autoPlay = true, color = '#1B7A7A', local, editing = false, onStrokes }) {
  const baseRef = useRef(null)
  const revealRef = useRef(null)
  const raf = useRef(0)
  const data = useRef(null)
  const [ready, setReady] = useState(false)
  const [shown, setShown] = useState(0)
  const [replayKey, setReplayKey] = useState(0)
  const [proposal, setProposal] = useState(null)

  // 1. the proposal (depends only on the glyph)
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      await ensureFont(glyph)
      if (cancelled) return
      const p = buildStrokes(glyph, width, height)
      setProposal(p)
    })()
    return () => {
      cancelled = true
    }
  }, [glyph, width, height])

  const fix = fixFor(glyph, local)
  const strokes = useMemo(() => (proposal ? applyFix(proposal.strokes, fix) : []), [proposal, fix])
  useEffect(() => {
    if (proposal) onStrokes?.(proposal.strokes)
  }, [proposal]) // eslint-disable-line react-hooks/exhaustive-deps

  // 2. draw
  useEffect(() => {
    if (!proposal) return
    cancelAnimationFrame(raf.current)
    const dpr = window.devicePixelRatio || 1
    const base = baseRef.current
    const reveal = revealRef.current
    base.width = reveal.width = width * dpr
    base.height = reveal.height = height * dpr
    const bc = base.getContext('2d')
    bc.scale(dpr, dpr)
    drawText(bc, glyph, width, height, editing ? 'rgba(45,45,45,0.12)' : 'rgba(45,45,45,0.10)')

    const colored = document.createElement('canvas')
    colored.width = width * dpr
    colored.height = height * dpr
    const cc = colored.getContext('2d')
    cc.scale(dpr, dpr)
    drawText(cc, glyph, width, height, color)
    data.current = { colored, dpr }
    setReady(true)

    const ctx = reveal.getContext('2d')
    const lw = proposal.size * 0.15
    const lens = strokes.map((s) => strokeLength(s.pts))
    const durs = lens.map((l) => Math.min(1500, Math.max(550, l * 9)))
    const GAP = 220

    const strokePath = (c, pts, frac) => {
      const total = strokeLength(pts)
      let left = total * frac
      c.beginPath()
      c.moveTo(pts[0][0], pts[0][1])
      let head = pts[0]
      for (let i = 1; i < pts.length; i++) {
        const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])
        if (left >= d) { c.lineTo(pts[i][0], pts[i][1]); left -= d; head = pts[i] }
        else {
          const t = d ? left / d : 0
          head = [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t]
          c.lineTo(head[0], head[1])
          break
        }
      }
      c.stroke()
      return head
    }

    if (editing) {
      // static map: every stroke in its own colour with an arrow head and its number
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      strokes.forEach((s, k) => {
        ctx.strokeStyle = COLORS[k % COLORS.length]
        ctx.globalAlpha = 0.85
        ctx.lineWidth = Math.max(5, proposal.size * 0.045)
        strokePath(ctx, s.pts, 1)
        const n = s.pts.length
        const a = s.pts[Math.max(0, n - 4)], b = s.pts[n - 1]
        const ang = Math.atan2(b[1] - a[1], b[0] - a[0])
        ctx.fillStyle = COLORS[k % COLORS.length]
        ctx.beginPath()
        ctx.moveTo(b[0] + Math.cos(ang) * 9, b[1] + Math.sin(ang) * 9)
        ctx.lineTo(b[0] + Math.cos(ang + 2.5) * 9, b[1] + Math.sin(ang + 2.5) * 9)
        ctx.lineTo(b[0] + Math.cos(ang - 2.5) * 9, b[1] + Math.sin(ang - 2.5) * 9)
        ctx.fill()
        ctx.globalAlpha = 1
      })
      setShown(strokes.length)
      return
    }

    const t0 = performance.now()
    const total = durs.reduce((a, d) => a + d + GAP, 0)
    const frame = (now) => {
      const t = now - t0
      const mask = document.createElement('canvas')
      mask.width = reveal.width
      mask.height = reveal.height
      const mc = mask.getContext('2d')
      mc.scale(dpr, dpr)
      mc.lineCap = 'round'
      mc.lineJoin = 'round'
      mc.strokeStyle = '#000'
      mc.lineWidth = lw
      let acc = 0
      let started = 0
      let pen = null
      strokes.forEach((s, i) => {
        const local = t - acc
        acc += durs[i] + GAP
        if (local < 0) return
        started = i + 1
        const frac = Math.min(1, local / durs[i])
        const head = strokePath(mc, s.pts, frac)
        if (frac < 1) pen = head
      })
      mc.setTransform(1, 0, 0, 1, 0, 0)
      mc.globalCompositeOperation = 'source-in'
      mc.drawImage(data.current.colored, 0, 0)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, reveal.width, reveal.height)
      ctx.drawImage(mask, 0, 0)
      if (pen) {
        ctx.fillStyle = '#F4A324'
        ctx.beginPath()
        ctx.arc(pen[0] * dpr, pen[1] * dpr, 7 * dpr, 0, Math.PI * 2)
        ctx.fill()
      }
      setShown((s) => (s === started ? s : started))
      if (t < total) raf.current = requestAnimationFrame(frame)
      else {
        setShown(strokes.length)
        ctx.clearRect(0, 0, reveal.width, reveal.height)
        ctx.drawImage(data.current.colored, 0, 0)
      }
    }
    if (autoPlay || replayKey > 0) raf.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf.current)
  }, [proposal, strokes, replayKey, glyph, width, height, color, editing, autoPlay])

  return (
    <div>
      <div className="relative mx-auto" style={{ width, maxWidth: '100%', aspectRatio: `${width} / ${height}` }}>
        <canvas ref={baseRef} className="absolute inset-0 h-full w-full" />
        <canvas ref={revealRef} className="absolute inset-0 h-full w-full" />
        {ready &&
          strokes.slice(0, shown).map((s, k) => {
            const [x, y] = s.pts[0]
            const bx = Math.max(12, Math.min(width - 12, x - 13))
            const by = Math.max(12, Math.min(height - 12, y - 13))
            return (
              <span
                key={k}
                className="animate-pop absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xs font-extrabold text-white shadow"
                style={{ left: `${(bx / width) * 100}%`, top: `${(by / height) * 100}%`, background: editing ? COLORS[k % COLORS.length] : s.matra ? '#F4A324' : '#1B7A7A' }}
              >
                {k + 1}
              </span>
            )
          })}
      </div>
      {!editing && (
        <div className="mt-2 text-center">
          <button type="button" onClick={() => setReplayKey((k) => k + 1)} className="rounded-full bg-white px-4 py-2 text-sm font-extrabold text-primary shadow-sm">
            ↻ Watch again
          </button>
        </div>
      )}
    </div>
  )
}
