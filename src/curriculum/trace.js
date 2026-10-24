// Tracing: draw a target glyph, measure how well a drawing covers it, and work out a guided stroke order.
// Everything here works on small raster "grids" (1 = ink) so it is quick and font-independent.

export const FONT = '"Noto Sans Bengali", "Nunito", sans-serif'

export async function ensureFont(text) {
  try {
    await document.fonts.load(`700 100px ${FONT}`, text)
    await document.fonts.ready
  } catch {
    /* fall back to whatever is installed */
  }
}

/** Largest font size (≤ 230px) at which `text` fits inside w×h. */
export function fitFont(ctx, text, w, h) {
  let size = Math.floor(Math.min(h * 0.78, 230))
  for (; size > 28; size -= 4) {
    ctx.font = `700 ${size}px ${FONT}`
    const m = ctx.measureText(text)
    if (m.width <= w * 0.86 && m.actualBoundingBoxAscent + m.actualBoundingBoxDescent <= h * 0.86) break
  }
  ctx.font = `700 ${size}px ${FONT}`
  return size
}

/** Draw `text` centred in w×h. Returns the font size used. */
export function drawText(ctx, text, w, h, fill, weight = 700) {
  const size = fitFont(ctx, text, w, h)
  const m = ctx.measureText(text)
  if (weight !== 700) ctx.font = `${weight} ${size}px ${FONT}` // same size and position, lighter ink
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = fill
  ctx.fillText(text, w / 2, h / 2 + (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2)
  return size
}

export const GRID_CELL = 3 // px per grid cell

/** Downscale a canvas to a gw×gh ink grid. */
export function toGrid(canvas, gw, gh, threshold = 48) {
  const t = document.createElement('canvas')
  t.width = gw
  t.height = gh
  const c = t.getContext('2d')
  c.drawImage(canvas, 0, 0, gw, gh)
  const d = c.getImageData(0, 0, gw, gh).data
  const g = new Uint8Array(gw * gh)
  for (let i = 0; i < g.length; i++) g[i] = d[i * 4 + 3] > threshold ? 1 : 0
  return g
}

/** Grow the ink by r cells in every direction (square structuring element, two passes). */
export function dilate(g, w, h, r) {
  if (!r) return g
  const tmp = new Uint8Array(w * h)
  const out = new Uint8Array(w * h)
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let v = 0
      for (let k = -r; k <= r && !v; k++) {
        const xx = x + k
        if (xx >= 0 && xx < w && g[y * w + xx]) v = 1
      }
      tmp[y * w + x] = v
    }
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let v = 0
      for (let k = -r; k <= r && !v; k++) {
        const yy = y + k
        if (yy >= 0 && yy < h && tmp[yy * w + x]) v = 1
      }
      out[y * w + x] = v
    }
  return out
}

/**
 * Score a drawing against the target.
 *   coverage: how much of the target the pen went over
 *   stray:    how much of the drawing is far from the target
 * `lenient` is used for the younger tracks.
 */
export function scoreTrace(T, U, w, h, penR, tolR, lenient = false) {
  let nT = 0
  let nU = 0
  for (let i = 0; i < T.length; i++) {
    nT += T[i]
    nU += U[i]
  }
  if (nU < 6 || nT === 0) return { stars: 0, coverage: 0, stray: 1 }
  const dU = dilate(U, w, h, penR)
  const dT = dilate(T, w, h, tolR)
  let cov = 0
  let out = 0
  for (let i = 0; i < T.length; i++) {
    if (T[i] && dU[i]) cov++
    if (U[i] && !dT[i]) out++
  }
  const coverage = cov / nT
  const stray = out / nU
  const [c3, s3, c2, s2, c1] = lenient ? [0.75, 0.3, 0.55, 0.5, 0.3] : [0.85, 0.2, 0.65, 0.4, 0.4]
  const stars = coverage >= c3 && stray <= s3 ? 3 : coverage >= c2 && stray <= s2 ? 2 : coverage >= c1 ? 1 : 0
  return { stars, coverage, stray }
}
