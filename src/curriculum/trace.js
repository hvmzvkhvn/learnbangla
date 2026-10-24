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
export function drawText(ctx, text, w, h, fill) {
  const size = fitFont(ctx, text, w, h)
  const m = ctx.measureText(text)
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

/**
 * A guided stroke order worked out from the glyph itself (not hand-authored):
 * body strokes are drawn left to right, each starting near its top-left, and the headline (মাত্রা) is drawn last.
 * Returns steps: [{ order: Int32Array of cell indices in drawing order, start: {x, y} }]
 */
export function strokePlan(T, w, h) {
  let minX = w, maxX = -1, minY = h, maxY = -1
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
      if (T[y * w + x]) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
  if (maxX < 0) return { steps: [], w, h }
  const bw = maxX - minX + 1
  const bh = maxY - minY + 1

  // headline: a long, thick horizontal run near the top
  const rowCount = (y) => {
    let c = 0
    for (let x = minX; x <= maxX; x++) c += T[y * w + x]
    return c
  }
  let head = new Set()
  if (bw >= 6) {
    let best = 0
    let bestY = -1
    for (let y = minY; y <= minY + Math.floor(bh * 0.45); y++) {
      const c = rowCount(y)
      if (c > best) {
        best = c
        bestY = y
      }
    }
    if (best >= 0.55 * bw) {
      for (let y = bestY; y >= minY && rowCount(y) >= 0.6 * best; y--) head.add(y)
      for (let y = bestY + 1; y <= maxY && rowCount(y) >= 0.6 * best; y++) head.add(y)
    }
  }

  // body components (8-connected) outside the headline rows
  const isBody = (i) => T[i] && !head.has(Math.floor(i / w))
  const seen = new Uint8Array(w * h)
  const comps = []
  for (let i = 0; i < w * h; i++) {
    if (!isBody(i) || seen[i]) continue
    const cells = []
    const q = [i]
    seen[i] = 1
    while (q.length) {
      const c = q.pop()
      cells.push(c)
      const cx = c % w
      const cy = (c - cx) / w
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          const nx = cx + dx
          const ny = cy + dy
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue
          const n = ny * w + nx
          if (!seen[n] && isBody(n)) {
            seen[n] = 1
            q.push(n)
          }
        }
    }
    comps.push(cells)
  }
  const big = comps.filter((c) => c.length >= 4)
  big.sort((a, b) => Math.min(...a.map((c) => c % w)) - Math.min(...b.map((c) => c % w)))

  const steps = big.map((cells) => {
    const inComp = new Set(cells)
    let start = cells[0]
    let bestScore = Infinity
    for (const c of cells) {
      const sc = Math.floor(c / w) + 0.5 * (c % w)
      if (sc < bestScore) {
        bestScore = sc
        start = c
      }
    }
    // geodesic order from the start cell
    const order = []
    const dist = new Map([[start, 0]])
    const q = [start]
    for (let qi = 0; qi < q.length; qi++) {
      const c = q[qi]
      order.push(c)
      const cx = c % w
      const cy = (c - cx) / w
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          const n = (cy + dy) * w + (cx + dx)
          if (cx + dx < 0 || cx + dx >= w || cy + dy < 0 || cy + dy >= h) continue
          if (inComp.has(n) && !dist.has(n)) {
            dist.set(n, dist.get(c) + 1)
            q.push(n)
          }
        }
    }
    return { order: Int32Array.from(order), start: { x: start % w, y: Math.floor(start / w) } }
  })

  if (head.size) {
    const cells = []
    for (let i = 0; i < w * h; i++) if (T[i] && head.has(Math.floor(i / w))) cells.push(i)
    cells.sort((a, b) => (a % w) - (b % w))
    steps.push({ order: Int32Array.from(cells), start: { x: cells[0] % w, y: Math.floor(cells[0] / w) }, headline: true })
  }
  return { steps, w, h }
}
