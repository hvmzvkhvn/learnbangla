import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { allItems } from '../curriculum/bank'
import { splitClusters } from '../curriculum/text'
import { usePersistent } from '../state/persist'
import { APPROVED } from '../data/strokesApproved'
import StrokeDemo from '../components/lesson/StrokeDemo'

const DIGITS = [...'০১২৩৪৫৬৭৮৯']

const uniq = (a) => [...new Set(a)]

export default function StrokeReview() {
  const [marks, setMarks] = usePersistent('lb.strokes', {})
  const [preview, setPreview] = usePersistent('lb.previewGuides', false)
  const [copied, setCopied] = useState(false)

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

  const mark = (glyph, v) => setMarks((m) => ({ ...m, [glyph]: m[glyph] === v ? undefined : v }))
  const approved = Object.entries(marks).filter(([, v]) => v === 'ok').map(([g]) => g)
  const fixes = Object.entries(marks).filter(([, v]) => v === 'fix').map(([g]) => g)
  const total = groups.reduce((n, g) => n + g.glyphs.length, 0)
  const snippet = `export const APPROVED = new Set(${JSON.stringify([...new Set([...APPROVED, ...approved])])})`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <Link to="/review" className="text-sm font-bold text-primary">← Review</Link>
      <h1 className="mt-2 text-3xl font-extrabold text-primary">Stroke-order review</h1>
      <p className="mb-4 max-w-2xl text-ink/70">
        The "Watch how" guide is worked out from each glyph automatically: parts are drawn left to right and the headline (মাত্রা) goes last. Press “Watch again” on each card and mark whether the order is how it is taught. Guides you
        have not approved stay hidden from learners.
      </p>

      <div className="card mb-6 flex flex-wrap items-center gap-3 !p-4">
        <p className="font-extrabold text-ink">✓ {approved.length} approved · ✗ {fixes.length} wrong · {total - approved.length - fixes.length} to look at</p>
        <button type="button" onClick={copy} className="btn-primary !px-4 !py-2 text-sm">Copy approved list</button>
        <label className="flex items-center gap-2 text-sm font-bold text-ink/70">
          <input type="checkbox" checked={preview === true} onChange={(e) => setPreview(e.target.checked)} />
          Show every guide in lessons on this device
        </label>
        {copied && <span className="text-sm font-bold text-success">Copied — it goes into src/data/strokesApproved.js</span>}
      </div>

      {groups.map((g) => (
        <section key={g.key} className="mb-8">
          <h2 className="mb-3 text-xl font-extrabold text-ink">{g.label} <span className="text-sm font-bold text-ink/40">({g.glyphs.length})</span></h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {g.glyphs.map((glyph) => (
              <div key={glyph} className={`card !p-2 ${marks[glyph] === 'ok' ? 'ring-4 ring-success/50' : marks[glyph] === 'fix' ? 'ring-4 ring-error/50' : ''}`}>
                <StrokeDemo glyph={glyph} width={200} height={g.key === 'word' || g.key === 'sign' ? 140 : 180} autoPlay={false} />
                <div className="mt-2 flex gap-2">
                  <button type="button" onClick={() => mark(glyph, 'ok')} className={`flex-1 rounded-xl py-2 text-sm font-extrabold ${marks[glyph] === 'ok' ? 'bg-success text-white' : 'bg-success/10 text-success'}`}>✓ Right</button>
                  <button type="button" onClick={() => mark(glyph, 'fix')} className={`flex-1 rounded-xl py-2 text-sm font-extrabold ${marks[glyph] === 'fix' ? 'bg-error text-white' : 'bg-error/10 text-error'}`}>✗ Wrong</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
