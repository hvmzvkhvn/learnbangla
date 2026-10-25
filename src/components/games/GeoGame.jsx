import { useMemo, useState } from 'react'
import { exploreRegions } from '../../data/explore'
import { shuffle } from '../../curriculum/text'
import { speak } from '../../audio/audio'
import Speaker from '../Speaker'
import BdMap from '../explore/BdMap'

const pick = (a) => a[Math.floor(Math.random() * a.length)]
const regionOptions = (right) => shuffle([right, ...shuffle(exploreRegions.filter((r) => r.id !== right.id)).slice(0, 3)])

// A clue line must not give the answer away by naming the region or one of its cities.
const clueLines = (r) =>
  [...r.famous, ...r.made].filter((l) => !l.bn.includes(r.bn.slice(0, 3)) && !r.cities.some((c) => l.bn.includes(c.bn.slice(0, 3))))

function makeQuestions(n = 10) {
  const regions = shuffle(exploreRegions)
  const out = []
  for (let i = 0; i < n; i++) {
    const r = regions[i % regions.length]
    const kind = ['tap', 'clue', 'city'][i % 3]
    if (kind === 'tap') out.push({ kind, region: r })
    else if (kind === 'clue' && clueLines(r).length) out.push({ kind, region: r, line: pick(clueLines(r)), options: regionOptions(r) })
    else out.push({ kind: 'city', region: r, city: pick(r.cities), options: regionOptions(r) })
  }
  return shuffle(out)
}

/** Map Quiz: tap the division, find where a clue is from, or say which division a city belongs to. */
export default function GeoGame({ onFinish }) {
  const qs = useMemo(() => makeQuestions(10), [])
  const [i, setI] = useState(0)
  const [right, setRight] = useState(0)
  const [clean, setClean] = useState(true)
  const [solved, setSolved] = useState(false)
  const [bad, setBad] = useState({})
  const q = qs[i]

  const answer = (r) => {
    if (solved) return
    if (r.id === q.region.id) {
      setSolved(true)
      if (clean) setRight((n) => n + 1)
      speak(q.region.bn, { force: true })
    } else {
      setClean(false)
      setBad((b) => ({ ...b, [r.id]: true }))
    }
  }
  const next = () => {
    if (i + 1 < qs.length) {
      setI(i + 1)
      setClean(true)
      setSolved(false)
      setBad({})
    } else onFinish({ correct: right, total: qs.length })
  }

  const tint = { ...Object.fromEntries(Object.keys(bad).map((id) => [id, '#E5736B'])), ...(solved ? { [q.region.id]: '#4CAF7A' } : {}) }

  return (
    <div>
      <p className="mb-3 text-center text-sm font-extrabold uppercase tracking-wide text-ink/40">Question {i + 1} of {qs.length}</p>
      {q.kind === 'tap' && (
        <>
          <div className="mb-2 flex items-center justify-center gap-3 text-center">
            <div>
              <p className="text-sm font-bold text-ink/60">Tap this division on the map</p>
              <p className="font-bangla text-4xl font-extrabold text-primary">{q.region.bn}</p>
              <p className="text-sm text-ink/50">{q.region.name}</p>
            </div>
            <Speaker text={q.region.bn} size="lg" />
          </div>
          <BdMap labels={solved} unlocked={() => true} stamped={() => false} onSelect={answer} tint={tint} />
        </>
      )}
      {q.kind === 'clue' && (
        <Choice title="Where am I?" sub="Listen, then pick the division." options={q.options} answer={answer} bad={bad} solved={solved} region={q.region}>
          <div className="flex items-center justify-center gap-3 rounded-3xl bg-white p-4 shadow-sm">
            <span className="text-5xl">{q.line.emoji}</span>
            <p className="font-bangla text-2xl font-bold text-primary">{q.line.bn}</p>
            <Speaker text={q.line.bn} size="lg" />
          </div>
          {solved && <p className="mt-2 text-center text-sm text-ink/60">{q.line.en}</p>}
        </Choice>
      )}
      {q.kind === 'city' && (
        <Choice title="Which division is this city in?" options={q.options} answer={answer} bad={bad} solved={solved} region={q.region}>
          <div className="flex items-center justify-center gap-3 rounded-3xl bg-white p-4 shadow-sm">
            <span className="text-5xl">{q.city.emoji}</span>
            <div className="text-center">
              <p className="font-bangla text-4xl font-extrabold text-primary">{q.city.bn}</p>
              <p className="text-sm text-ink/60">{q.city.name}</p>
            </div>
            <Speaker text={q.city.bn} size="lg" />
          </div>
        </Choice>
      )}
      <div className="mt-5 min-h-[4.5rem]">
        {!clean && !solved && <p className="gentle-error text-center">Oops, not quite — try again!</p>}
        {solved && <button type="button" className="btn-primary w-full" onClick={next}>{i + 1 < qs.length ? 'Continue' : 'See my score'}</button>}
      </div>
    </div>
  )
}

function Choice({ title, sub, options, answer, bad, solved, region, children }) {
  return (
    <div>
      <p className="mb-1 text-center text-lg font-extrabold text-ink">{title}</p>
      {sub && <p className="mb-2 text-center text-sm text-ink/50">{sub}</p>}
      {children}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {options.map((r) => (
          <button
            key={r.id} type="button" onClick={() => answer(r)} disabled={solved && r.id !== region.id}
            className={`min-h-[5.5rem] rounded-2xl border-4 px-2 py-3 text-center transition active:scale-95 ${
              solved && r.id === region.id ? 'border-success bg-success/15' : bad[r.id] ? 'animate-shake border-error/60 bg-error/10' : 'border-primary/15 bg-white hover:border-primary/40'
            }`}
          >
            <span className="block text-2xl">{r.emoji}</span>
            <span className="block font-bangla text-xl font-extrabold text-ink">{r.bn}</span>
            <span className="block text-xs font-bold text-ink/50">{r.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
