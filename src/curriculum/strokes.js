// Works out how to write a glyph from the glyph itself: thin it to a one-pixel centreline, break that into
// pen strokes (joining through junctions where the line carries straight on), put the headline (মাত্রা) last,
// and order the rest left to right. The result is a *proposal* — /review/strokes lets a Bangla speaker correct
// the order and direction, and the corrections are kept in src/data/strokeFixes.js.
import { FONT, drawText, fitFont } from './trace'

// ---- thinning (Zhang–Suen) --------------------------------------------------------------------------------------
function thin(img, w, h) {
  const del = []
  for (let changed = true; changed; ) {
    changed = false
    for (let pass = 0; pass < 2; pass++) {
      del.length = 0
      for (let y = 1; y < h - 1; y++)
        for (let x = 1; x < w - 1; x++) {
          const i = y * w + x
          if (!img[i]) continue
          const p2 = img[i - w], p3 = img[i - w + 1], p4 = img[i + 1], p5 = img[i + w + 1], p6 = img[i + w], p7 = img[i + w - 1], p8 = img[i - 1], p9 = img[i - w - 1]
          const B = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9
          if (B < 2 || B > 6) continue
          const A = (!p2 && p3) + (!p3 && p4) + (!p4 && p5) + (!p5 && p6) + (!p6 && p7) + (!p7 && p8) + (!p8 && p9) + (!p9 && p2)
          if (A !== 1) continue
          if (pass === 0 ? p2 * p4 * p6 !== 0 || p4 * p6 * p8 !== 0 : p2 * p4 * p8 !== 0 || p2 * p6 * p8 !== 0) continue
          del.push(i)
        }
      if (del.length) {
        changed = true
        for (const i of del) img[i] = 0
      }
    }
  }
}

const N8 = (w) => [-w - 1, -w, -w + 1, -1, 1, w - 1, w, w + 1]
const DX = [-1, 0, 1, -1, 1, -1, 0, 1]

function neighbours(S, i, w) {
  const out = []
  const x = i % w
  N8(w).forEach((d, k) => {
    const nx = x + DX[k]
    if (nx < 0 || nx >= w) return
    const j = i + d
    if (j >= 0 && j < S.length && S[j]) out.push(j)
  })
  return out
}

/** 0→1 transitions around a pixel: 1 = end, 2 = along a line, 3+ = junction. */
function crossings(S, i, w) {
  const r = [-w, -w + 1, 1, w + 1, w, w - 1, -1, -w - 1].map((d) => (S[i + d] ? 1 : 0))
  let a = 0
  for (let k = 0; k < 8; k++) if (!r[k] && r[(k + 1) % 8]) a++
  return a
}

function prune(S, w, minLen) {
  for (let round = 0; round < 3; round++) {
    let removed = false
    for (let i = 0; i < S.length; i++) {
      if (!S[i] || neighbours(S, i, w).length !== 1) continue
      const path = [i]
      let prev = -1
      let cur = i
      let hitJunction = false
      for (;;) {
        const nb = neighbours(S, cur, w).filter((n) => n !== prev && !path.includes(n))
        if (!nb.length) break
        prev = cur
        cur = nb[0]
        if (crossings(S, cur, w) >= 3) {
          hitJunction = true
          break
        }
        path.push(cur)
        if (path.length > minLen) break
      }
      if (hitJunction && path.length < minLen) {
        path.forEach((p) => (S[p] = 0))
        removed = true
      }
    }
    if (!removed) break
  }
}

// ---- skeleton → edges -------------------------------------------------------------------------------------------
function traceEdges(S, w, h) {
  const type = new Uint8Array(S.length) // 1 end, 2 line, 3 junction
  for (let i = 0; i < S.length; i++) if (S[i]) type[i] = Math.min(3, crossings(S, i, w) || 1)
  // single pixels with two neighbours on a staircase can read as junctions: re-check by neighbour count
  const nodeOf = new Int32Array(S.length).fill(-1)
  const nodes = []
  for (let i = 0; i < S.length; i++) {
    if (type[i] !== 3 || nodeOf[i] >= 0) continue
    const id = nodes.length
    const cells = []
    const q = [i]
    nodeOf[i] = id
    while (q.length) {
      const c = q.pop()
      cells.push(c)
      for (const n of neighbours(S, c, w)) if (type[n] === 3 && nodeOf[n] < 0) { nodeOf[n] = id; q.push(n) }
    }
    const cx = cells.reduce((a, c) => a + (c % w), 0) / cells.length
    const cy = cells.reduce((a, c) => a + Math.floor(c / w), 0) / cells.length
    nodes.push({ id, cells, x: cx, y: cy })
  }
  const seen = new Uint8Array(S.length)
  const edges = []
  const pt = (i) => [i % w, Math.floor(i / w)]
  const walk = (start, from, fromNode) => {
    const path = [start]
    seen[start] = 1
    let prev = from
    let cur = start
    for (;;) {
      if (nodeOf[cur] >= 0) return { pts: path.slice(0, -1).map(pt), a: fromNode, b: nodeOf[cur], last: cur }
      const nb = neighbours(S, cur, w).filter((n) => n !== prev && (nodeOf[n] >= 0 ? nodeOf[n] !== fromNode || path.length > 3 : !seen[n]))
      if (!nb.length) return { pts: path.map(pt), a: fromNode, b: -1 }
      // prefer a node if adjacent, else the 4-connected neighbour
      nb.sort((p, q) => (nodeOf[q] >= 0) - (nodeOf[p] >= 0) || Math.abs((p % w) - (cur % w)) + Math.abs(Math.floor(p / w) - Math.floor(cur / w)) - (Math.abs((q % w) - (cur % w)) + Math.abs(Math.floor(q / w) - Math.floor(cur / w))))
      prev = cur
      cur = nb[0]
      if (nodeOf[cur] < 0) {
        seen[cur] = 1
        path.push(cur)
      } else path.push(cur)
    }
  }
  // from every junction outwards
  for (const nd of nodes)
    for (const c of nd.cells)
      for (const n of neighbours(S, c, w)) {
        if (nodeOf[n] >= 0 || seen[n]) continue
        const e = walk(n, c, nd.id)
        if (e.pts.length) edges.push(e)
      }
  // free-standing lines: from an end
  for (let i = 0; i < S.length; i++) {
    if (!S[i] || seen[i] || nodeOf[i] >= 0 || type[i] !== 1) continue
    const e = walk(i, -1, -1)
    edges.push(e)
  }
  // closed loops with no junction at all
  for (let i = 0; i < S.length; i++) {
    if (!S[i] || seen[i] || nodeOf[i] >= 0) continue
    const e = walk(i, -1, -1)
    edges.push({ ...e, loop: true })
  }
  return { edges, nodes }
}

const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1])
const lengthOf = (pts) => pts.reduce((a, p, i) => (i ? a + dist(p, pts[i - 1]) : 0), 0)

function smooth(pts, k = 2) {
  if (pts.length < 5) return pts
  return pts.map((p, i) => {
    if (i === 0 || i === pts.length - 1) return p
    const lo = Math.max(0, i - k)
    const hi = Math.min(pts.length - 1, i + k)
    let x = 0, y = 0
    for (let j = lo; j <= hi; j++) { x += pts[j][0]; y += pts[j][1] }
    return [x / (hi - lo + 1), y / (hi - lo + 1)]
  })
}

/** Resample a polyline to roughly one point every `step` px. */
function resample(pts, step = 3) {
  const out = [pts[0]]
  let acc = 0
  for (let i = 1; i < pts.length; i++) {
    acc += dist(pts[i], pts[i - 1])
    if (acc >= step) { out.push(pts[i]); acc = 0 }
  }
  if (out[out.length - 1] !== pts[pts.length - 1]) out.push(pts[pts.length - 1])
  return out
}

// ---- main -------------------------------------------------------------------------------------------------------
/**
 * Proposed strokes for `glyph` drawn centred in w×h (the same way TraceQ draws it).
 * Returns { size, strokes: [{ pts: [[x,y],…], matra: boolean }] } in that canvas's pixel coordinates.
 */
export function buildStrokes(glyph, w, h) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d')
  const size = drawText(ctx, glyph, w, h, '#000', 400)
  const data = ctx.getImageData(0, 0, w, h).data
  const S = new Uint8Array(w * h)
  for (let i = 0; i < S.length; i++) S[i] = data[i * 4 + 3] > 110 ? 1 : 0
  thin(S, w, h)
  prune(S, w, Math.max(8, Math.round(size * 0.075)))

  let minX = w, maxX = 0, minY = h, maxY = 0
  for (let i = 0; i < S.length; i++)
    if (S[i]) {
      const x = i % w, y = Math.floor(i / w)
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  if (maxX <= minX) return { size, strokes: [] }
  const bw = maxX - minX + 1
  const bh = maxY - minY + 1

  const { edges, nodes } = traceEdges(S, w, h)
  edges.forEach((e) => {
    if (e.a >= 0) e.pts.unshift([nodes[e.a].x, nodes[e.a].y])
    if (e.b >= 0) e.pts.push([nodes[e.b].x, nodes[e.b].y])
  })

  // ---- headline: a long, flat run of skeleton near the top
  let matra = null
  const rows = new Map()
  for (let i = 0; i < S.length; i++) if (S[i]) { const y = Math.floor(i / w); if (y <= minY + bh * 0.45) rows.set(y, (rows.get(y) ?? 0) + 1) }
  let bestY = -1, best = 0
  for (const [y, n] of rows) { // smooth over ±2 rows so a slightly tilted line still counts
    const n2 = (rows.get(y - 1) ?? 0) + n + (rows.get(y + 1) ?? 0)
    if (n2 > best) { best = n2; bestY = y }
  }
  const flat = (e) => {
    const xs = e.pts.map((p) => p[0]), ys = e.pts.map((p) => p[1])
    return Math.abs(Math.min(...ys) - bestY) <= 7 && Math.abs(Math.max(...ys) - bestY) <= 7 && Math.max(...xs) - Math.min(...xs) >= 2.2 * (Math.max(...ys) - Math.min(...ys))
  }
  if (bw >= 24 && best >= 0.5 * bw) {
    const mEdges = edges.filter(flat)
    const mx = mEdges.flatMap((e) => e.pts.map((p) => p[0]))
    if (mEdges.length && Math.max(...mx) - Math.min(...mx) >= 0.5 * bw) {
      const y = mEdges.flatMap((e) => e.pts.map((p) => p[1])).reduce((a, v, _, arr) => a + v / arr.length, 0)
      matra = { pts: [[Math.min(...mx), y], [Math.max(...mx), y]], matra: true }
      for (const e of mEdges) edges.splice(edges.indexOf(e), 1)
    }
  }

  // ---- join edges through junctions where the line carries straight on
  const ends = [] // { edge, atStart, node, dir }
  edges.forEach((e, ei) => {
    if (e.loop || e.pts.length < 2) return
    for (const atStart of [true, false]) {
      const node = atStart ? e.a : e.b
      if (node < 0) continue
      const base = atStart ? e.pts[0] : e.pts[e.pts.length - 1]
      const far = atStart ? e.pts[Math.min(e.pts.length - 1, 8)] : e.pts[Math.max(0, e.pts.length - 1 - 8)]
      const d = [far[0] - base[0], far[1] - base[1]]
      const m = Math.hypot(d[0], d[1]) || 1
      ends.push({ ei, atStart, node, dir: [d[0] / m, d[1] / m] })
    }
  })
  const partner = new Map() // "ei:atStart" -> end
  const key = (e) => `${e.ei}:${e.atStart}`
  for (const nd of nodes) {
    const here = ends.filter((e) => e.node === nd.id)
    const pairs = []
    for (let i = 0; i < here.length; i++)
      for (let j = i + 1; j < here.length; j++) {
        if (here[i].ei === here[j].ei) continue
        const dot = here[i].dir[0] * here[j].dir[0] + here[i].dir[1] * here[j].dir[1]
        if (dot < -0.15) pairs.push([dot, here[i], here[j]])
      }
    pairs.sort((a, b) => a[0] - b[0])
    const used = new Set()
    for (const [, a, b] of pairs) {
      if (used.has(key(a)) || used.has(key(b))) continue
      used.add(key(a)); used.add(key(b))
      partner.set(key(a), b); partner.set(key(b), a)
    }
  }
  const taken = new Set()
  const chains = []
  const orient = (e, forward) => (forward ? e.pts.slice() : e.pts.slice().reverse())
  edges.forEach((e, ei) => {
    if (taken.has(ei)) return
    if (e.loop) { taken.add(ei); chains.push({ pts: e.pts.slice(), loop: true }); return }
    // walk back to the head of the chain, then forward collecting edges
    let head = { ei, atStart: true } // we "enter" through the start
    for (let guard = 0; guard < 50; guard++) {
      const p = partner.get(`${head.ei}:${head.atStart}`)
      if (!p || taken.has(p.ei) || p.ei === ei) break
      head = { ei: p.ei, atStart: !p.atStart }
    }
    let cur = head
    const pts = []
    for (let guard = 0; guard < 50 && cur && !taken.has(cur.ei); guard++) {
      taken.add(cur.ei)
      const part = orient(edges[cur.ei], cur.atStart)
      pts.push(...(pts.length ? part.slice(1) : part))
      const p = partner.get(`${cur.ei}:${!cur.atStart}`)
      cur = p ? { ei: p.ei, atStart: p.atStart } : null
    }
    chains.push({ pts, loop: false })
  })

  // ---- direction and order
  const strokes = []
  for (let ch of chains) {
    let pts = smooth(resample(ch.pts))
    if (lengthOf(pts) < Math.max(7, size * 0.035)) continue
    if (ch.loop || dist(pts[0], pts[pts.length - 1]) < 6) {
      // closed shape: start at the top, run anticlockwise (left first)
      let ti = 0
      pts.forEach((p, i) => { if (p[1] < pts[ti][1]) ti = i })
      pts = [...pts.slice(ti), ...pts.slice(0, ti), pts[ti]]
      if (pts[Math.min(3, pts.length - 1)][0] > pts[0][0]) pts = [pts[0], ...pts.slice(1).reverse()]
    } else {
      const a = pts[0], b = pts[pts.length - 1]
      const nearMatra = (p) => matra && Math.abs(p[1] - matra.pts[0][1]) < 9
      const flip = nearMatra(b) && !nearMatra(a) ? true : nearMatra(a) && !nearMatra(b) ? false : Math.abs(a[1] - b[1]) > 10 ? b[1] < a[1] : b[0] < a[0]
      if (flip) pts = pts.reverse()
    }
    strokes.push({ pts, matra: false })
  }
  strokes.sort((p, q) => p.pts[0][0] - q.pts[0][0] || p.pts[0][1] - q.pts[0][1])
  if (matra) strokes.push({ pts: resample(matra.pts, 3), matra: true })
  return { size, strokes }
}

export { FONT, fitFont }

/**
 * Apply a reviewer's corrections to the proposed strokes.
 * fix = { order: [i, …]  new order, by index into the proposal (strokes left out keep their place after),
 *         reverse: [i, …] strokes to draw the other way,
 *         drop: [i, …]    strokes to remove }
 */
export function applyFix(strokes, fix) {
  if (!fix) return strokes
  const drop = new Set(fix.drop ?? [])
  const rev = new Set(fix.reverse ?? [])
  const withIdx = strokes.map((s, i) => ({ ...s, i, pts: rev.has(i) ? s.pts.slice().reverse() : s.pts })).filter((s) => !drop.has(s.i))
  if (!fix.order?.length) return withIdx
  const rank = new Map(fix.order.map((v, k) => [v, k]))
  return withIdx.sort((a, b) => (rank.get(a.i) ?? 1e6 + a.i) - (rank.get(b.i) ?? 1e6 + b.i))
}

export const strokeLength = lengthOf
