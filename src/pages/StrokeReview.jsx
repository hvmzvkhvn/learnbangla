import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { allItems } from '../curriculum/bank'
import { splitClusters } from '../curriculum/text'
import { usePersistent } from '../state/persist'
import { APPROVED } from '../data/strokesApproved'
import { FIXES } from '../data/strokeFixes'
import StrokeDemo from '../components/lesson/StrokeDemo'

const DIGITS = [...'০১২৩৪৫৬৭৮৯']
const COLORS = ['#1B7A7A', '#D9822B', '#7A4FB5', '#2E8B57', '#C2410C', '#2563EB', '#B83280', '#4D7C0F']
const uniq = (a) => [...new Set(a)]

export default function StrokeReview() {
  const [marks, setMarks] = usePersistent('lb.strokes', {})
  const [edits, setEdits] = usePersistent('lb.strokeEdits', {})
  const [preview, setPreview] = usePersistent('lb.previewGuides', false)
  const [copied, setCopied] = useState('')

  const groups = useMemo(() => {
    const items = allItems()
    const words = uniq(items.filter((i) => i.kind === 'word' && !i.digit && !/\s/.test(i.bn) && splitClusters(i.bn).length >= 2 && splitClusters(i.bn).length <= 4).map((i) => i.bn))
    return [
      { key: 'letter', label: 'Letters', glyphs: uniq(items.filter((i) => i.kind === 'letter').map((i) => i.bn)) },
      { key: 'digit', label: 'Digits', glyphs: DIGITS },
      { key: 'sign', label: 'Vowel signs & syllables', glyphs: uniq(items.filter((i) => i.kind === 'sign' || i.kind === 'syllable').map((i) => i.bn)) },
      { key: 'word', label: 'Sample words (every 25th)', glyphs: words.filter((_, i) => i % 25 === 0) },
    ]
  }, [])

  const setMark = (glyph, v) => setMarks((m) => ({ ...m, [glyph]: m[glyph] === v ? undefined : v }))
  const setFix = (glyph, fix) => setEdits((e) => ({ ...e, [glyph]: fix }))
  const approved = Object.entries(marks).filter(([, v]) => v === 'ok').map(([g]) => g)
  const fixes = Object.entries(marks).filter(([, v]) => v === 'fix').map(([g]) => g)
  const edited = Object.keys(edits).filter((g) => edits[g])
  const total = groups.reduce((n, g) => n + g.glyphs.length, 0)

  const copy = async (what) => {
    const text =
      what === 'fixes'
        ? `export const FIXES = ${JSON.stringify({ ...FIXES, ...Object.fromEntries(edited.map((g) => [g, edits[g]])) }, null, 2)}`
        : `export const APPROVED = new Set(${JSON.stringify([...new Set([...APPROVED, ...approved])])})`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(what)
    } catch {
      setCopied('')
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <Link to="/review" className="text-sm font-bold text-primary">← Review</Link>
      <h1 className="mt-2 text-3xl font-extrabold text-primary">Stroke-order review</h1>
      <p className="mb-4 max-w-2xl text-ink/70">
        Each card shows how the letter is proposed to be written: coloured strokes, numbered in order, the arrow at the end showing the direction. The headline (মাত্রা) is drawn last. Use the buttons to fix a stroke's order
        (↑ ↓), flip its direction (⇄) or remove a stray one (✕). <b>▶ Play</b> shows the animation the learner would see. Mark each card ✓ when it is right.
      </p>

      <div className="card mb-6 !p-4">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-extrabold text-ink">✓ {approved.length} right · ✗ {fixes.length} wrong · ✎ {edited.length} corrected · {total - approved.length - fixes.length} to look at</p>
          <button type="button" onClick={() => copy('fixes')} className="btn-primary !px-4 !py-2 text-sm">Copy corrections</button>
          <button type="button" onClick={() => copy('approved')} className="btn-secondary !px-4 !py-2 text-sm">Copy approved list</button>
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm font-bold text-ink/70">
          <input type="checkbox" checked={preview === true} onChange={(e) => setPreview(e.target.checked)} />
          Show every guide (with my corrections) in lessons on this device
        </label>
        {copied && <p className="mt-2 text-sm font-bold text-success">Copied — {copied === 'fixes' ? 'it goes into src/data/strokeFixes.js' : 'it goes into src/data/strokesApproved.js'}</p>}
      </div>

      {groups.map((g) => (
        <section key={g.key} className="mb-8">
          <h2 className="mb-3 text-xl font-extrabold text-ink">{g.label} <span className="text-sm font-bold text-ink/40">({g.glyphs.length})</span></h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {g.glyphs.map((glyph) => (
              <GlyphCard key={glyph} glyph={glyph} kind={g.key} mark={marks[glyph]} onMark={(v) => setMark(glyph, v)} fix={edits[glyph]} onFix={(f) => setFix(glyph, f)} edits={edits} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function GlyphCard({ glyph, kind, mark, onMark, fix, onFix, edits }) {
  const [n, setN] = useState(0)
  const [play, setPlay] = useState(false)
  const h = kind === 'word' || kind === 'sign' ? 150 : 190

  // the working copy: which proposal strokes are in use, in what order, and which run backwards
  const base = FIXES[glyph]
  const cur = fix ?? base ?? {}
  const all = Array.from({ length: n }, (_, i) => i)
  const drop = new Set(cur.drop ?? [])
  const order = (cur.order?.length ? [...cur.order.filter((i) => i < n), ...all.filter((i) => !cur.order.includes(i))] : all).filter((i) => !drop.has(i))
  const rev = new Set(cur.reverse ?? [])

  const update = (patch) => onFix({ order: cur.order?.length ? cur.order : order, reverse: [...rev], drop: [...drop], ...patch })
  const move = (pos, d) => {
    const o = order.slice()
    const j = pos + d
    if (j < 0 || j >= o.length) return
    ;[o[pos], o[j]] = [o[j], o[pos]]
    update({ order: o })
  }
  const flip = (i) => update({ reverse: rev.has(i) ? [...rev].filter((x) => x !== i) : [...rev, i] })
  const remove = (i) => update({ order, drop: [...drop, i] })
  const reset = () => onFix(undefined)

  return (
    <div className={`card !p-3 ${mark === 'ok' ? 'ring-4 ring-success/50' : mark === 'fix' ? 'ring-4 ring-error/50' : ''}`}>
      <StrokeDemo glyph={glyph} width={230} height={h} autoPlay local={edits} editing={!play} key={`${glyph}-${play}`} onStrokes={(s) => setN(s.length)} />
      <button type="button" onClick={() => setPlay((p) => !p)} className="mx-auto mt-2 block rounded-full bg-white px-4 py-1 text-sm font-extrabold text-primary shadow-sm">{play ? '✎ Back to the map' : '▶ Play'}</button>

      <ol className="mt-2 space-y-1">
        {order.map((i, pos) => (
          <li key={i} className="flex items-center gap-1 text-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-extrabold text-white" style={{ background: COLORS[pos % COLORS.length] }}>{pos + 1}</span>
            <span className="flex-1 text-xs text-ink/50">{rev.has(i) ? 'reversed' : ''}</span>
            <button type="button" onClick={() => move(pos, -1)} disabled={pos === 0} className="rounded bg-ink/5 px-2 py-0.5 font-bold disabled:opacity-30" aria-label="Earlier">↑</button>
            <button type="button" onClick={() => move(pos, 1)} disabled={pos === order.length - 1} className="rounded bg-ink/5 px-2 py-0.5 font-bold disabled:opacity-30" aria-label="Later">↓</button>
            <button type="button" onClick={() => flip(i)} className="rounded bg-ink/5 px-2 py-0.5 font-bold" aria-label="Reverse direction">⇄</button>
            <button type="button" onClick={() => remove(i)} className="rounded bg-error/10 px-2 py-0.5 font-bold text-error" aria-label="Remove stroke">✕</button>
          </li>
        ))}
      </ol>
      {fix && <button type="button" onClick={reset} className="mt-1 text-xs font-bold text-ink/40 underline">Undo my changes</button>}

      <div className="mt-2 flex gap-2">
        <button type="button" onClick={() => onMark('ok')} className={`flex-1 rounded-xl py-2 text-sm font-extrabold ${mark === 'ok' ? 'bg-success text-white' : 'bg-success/10 text-success'}`}>✓ Right</button>
        <button type="button" onClick={() => onMark('fix')} className={`flex-1 rounded-xl py-2 text-sm font-extrabold ${mark === 'fix' ? 'bg-error text-white' : 'bg-error/10 text-error'}`}>✗ Wrong</button>
      </div>
    </div>
  )
}
