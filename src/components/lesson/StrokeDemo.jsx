import { useEffect, useRef, useState } from 'react'
import { GRID_CELL, drawText, ensureFont, strokePlan, toGrid } from '../../curriculum/trace'

/**
 * Plays a "pen" animation of how to write a glyph: numbered start dots, body strokes left to right,
 * headline last. The animation is worked out from the glyph in the actual font, so it always lines up.
 */
export default function StrokeDemo({ glyph, width = 320, height = 280, autoPlay = true, color = '#1B7A7A' }) {
  const baseRef = useRef(null)
  const revealRef = useRef(null)
  const data = useRef(null)
  const raf = useRef(0)
  const [shown, setShown] = useState(0)
  const [badges, setBadges] = useState([])
  const [replayKey, setReplayKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      await ensureFont(glyph)
      if (cancelled) return
      const dpr = window.devicePixelRatio || 1
      const solid = document.createElement('canvas')
      solid.width = width
      solid.height = height
      drawText(solid.getContext('2d'), glyph, width, height, '#000')
      const gw = Math.ceil(width / GRID_CELL)
      const gh = Math.ceil(height / GRID_CELL)
      const plan = strokePlan(toGrid(solid, gw, gh), gw, gh)

      const base = baseRef.current
      base.width = width * dpr
      base.height = height * dpr
      const bc = base.getContext('2d')
      bc.scale(dpr, dpr)
      drawText(bc, glyph, width, height, 'rgba(45,45,45,0.10)')

      const colored = document.createElement('canvas')
      colored.width = width * dpr
      colored.height = height * dpr
      const cc = colored.getContext('2d')
      cc.scale(dpr, dpr)
      drawText(cc, glyph, width, height, color)

      data.current = { plan, colored, dpr }
      setBadges(plan.steps.map((s, i) => ({ n: i + 1, x: s.start.x * GRID_CELL, y: s.start.y * GRID_CELL, headline: Boolean(s.headline) })))
      if (autoPlay || replayKey > 0) play()
    })()
    return () => {
      cancelled = true
      cancelAnimationFrame(raf.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glyph, replayKey])

  function play() {
    const { plan, colored, dpr } = data.current
    const reveal = revealRef.current
    reveal.width = colored.width
    reveal.height = colored.height
    const ctx = reveal.getContext('2d')
    const mask = document.createElement('canvas')
    mask.width = colored.width
    mask.height = colored.height
    const mc = mask.getContext('2d')
    const tmp = document.createElement('canvas')
    tmp.width = colored.width
    tmp.height = colored.height
    const tc = tmp.getContext('2d')
    const cell = GRID_CELL * dpr

    const durations = plan.steps.map((s) => Math.min(1600, Math.max(650, s.order.length * 14)))
    const GAP = 250
    const total = durations.reduce((a, b) => a + b + GAP, 0)
    const drawn = plan.steps.map(() => 0)
    const t0 = performance.now()
    setShown(0)

    const frame = (now) => {
      const t = now - t0
      let acc = 0
      let started = 0
      plan.steps.forEach((s, i) => {
        const local = t - acc
        acc += durations[i] + GAP
        if (local < 0) return
        started = i + 1
        const upto = Math.min(s.order.length, Math.ceil((Math.min(local, durations[i]) / durations[i]) * s.order.length))
        mc.fillStyle = '#000'
        for (let k = drawn[i]; k < upto; k++) {
          const c = s.order[k]
          const cx = c % plan.w
          const cy = (c - cx) / plan.w
          mc.fillRect(cx * cell - dpr, cy * cell - dpr, cell + 2 * dpr, cell + 2 * dpr)
        }
        drawn[i] = upto
      })
      setShown((s) => (s === started ? s : started))
      tc.globalCompositeOperation = 'source-over'
      tc.clearRect(0, 0, tmp.width, tmp.height)
      tc.drawImage(mask, 0, 0)
      tc.globalCompositeOperation = 'source-in'
      tc.drawImage(colored, 0, 0)
      ctx.clearRect(0, 0, reveal.width, reveal.height)
      ctx.drawImage(tmp, 0, 0)
      if (t < total) raf.current = requestAnimationFrame(frame)
      else {
        ctx.clearRect(0, 0, reveal.width, reveal.height)
        ctx.drawImage(colored, 0, 0)
        setShown(plan.steps.length)
      }
    }
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(frame)
  }

  return (
    <div>
      <div className="relative mx-auto" style={{ width, maxWidth: '100%', aspectRatio: `${width} / ${height}` }}>
        <canvas ref={baseRef} className="absolute inset-0 h-full w-full" />
        <canvas ref={revealRef} className="absolute inset-0 h-full w-full" />
        {badges.slice(0, shown).map((b) => (
          <span
            key={b.n}
            className={`animate-pop absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xs font-extrabold text-white shadow ${b.headline ? 'bg-secondary' : 'bg-primary'}`}
            style={{ left: `${(b.x / width) * 100}%`, top: `${(b.y / height) * 100}%` }}
          >
            {b.n}
          </span>
        ))}
      </div>
      <div className="mt-2 text-center">
        <button type="button" onClick={() => setReplayKey((k) => k + 1)} className="rounded-full bg-white px-4 py-2 text-sm font-extrabold text-primary shadow-sm">
          ↻ Watch again
        </button>
      </div>
    </div>
  )
}
