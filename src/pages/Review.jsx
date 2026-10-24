import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { allItems } from '../curriculum/bank'
import { useReviewMarks } from '../state/persist'
import Speaker from '../components/Speaker'

const KINDS = [
  { key: 'letter', label: 'Letters' },
  { key: 'sign', label: 'Signs & syllables', kinds: ['sign', 'syllable'] },
  { key: 'word', label: 'Words' },
  { key: 'line', label: 'Conversations & texts' },
  { key: 'beat', label: 'Story chats' },
  { key: 'sentence', label: 'Sentences' },
  { key: 'form', label: 'Verb forms' },
]
const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'todo', label: 'Not reviewed' },
  { key: 'fix', label: 'Needs fixing' },
  { key: 'ok', label: 'Approved' },
]

const KIND_NAME = { beat: 'Story line', line: 'Conversation line', letter: 'Letter', sign: 'Vowel sign', syllable: 'Syllable', word: 'Word', sentence: 'Sentence', form: 'Verb form' }

function describe(item) {
  const parts = [`[${KIND_NAME[item.kind]}${item.section ? ` · ${item.section}` : ''}]`, item.bn, `(${item.roman})`]
  if (item.en) parts.push(`= ${item.en}`)
  if (item.example) parts.push(`· example: ${item.example.bn} (${item.example.roman}) = ${item.example.en}`)
  return parts.join(' ')
}

export default function Review() {
  const [marks, setMarks] = useReviewMarks()
  const [kind, setKind] = useState('letter')
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState(false)

  const items = useMemo(() => allItems(), [])
  const statusOf = (id) => marks[id]?.status ?? 'todo'
  const counts = useMemo(() => {
    const c = { ok: 0, fix: 0, todo: 0 }
    items.forEach((i) => (c[marks[i.id]?.status ?? 'todo'] += 1))
    return c
  }, [items, marks])

  const kindDef = KINDS.find((k) => k.key === kind)
  const q = query.trim().toLowerCase()
  const visible = items.filter(
    (i) =>
      (kindDef.kinds ?? [kindDef.key]).includes(i.kind) &&
      (filter === 'all' || statusOf(i.id) === filter) &&
      (!q || [i.bn, i.roman, i.en, i.section].some((s) => s && s.toLowerCase().includes(q))),
  )

  const sections = []
  visible.forEach((i) => {
    let s = sections.find((x) => x.name === i.section)
    if (!s) sections.push((s = { name: i.section, items: [] }))
    s.items.push(i)
  })

  const setStatus = (id, status) => setMarks((m) => ({ ...m, [id]: { ...m[id], status: m[id]?.status === status ? 'todo' : status } }))
  const setNote = (id, note) => setMarks((m) => ({ ...m, [id]: { ...m[id], status: m[id]?.status === 'ok' ? 'fix' : (m[id]?.status ?? 'fix'), note } }))

  const fixes = items.filter((i) => marks[i.id]?.status === 'fix')
  const exportText = () =>
    fixes.map((i) => `${describe(i)}\n   FIX: ${marks[i.id]?.note?.trim() || '(no note)'}`).join('\n\n')

  function copy() {
    navigator.clipboard?.writeText(exportText()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  function download() {
    const data = fixes.map((i) => ({ id: i.id, kind: i.kind, section: i.section, bn: i.bn, roman: i.roman, en: i.en, note: marks[i.id]?.note ?? '' }))
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'learn-bangla-corrections.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-6">
      <Link to="/" className="text-sm font-bold text-primary">← Back to the app</Link>
      <h1 className="mt-2 text-3xl font-extrabold text-primary">Content review</h1>
      <p className="mb-4 text-ink/60">
        Every letter, word and sentence in the curriculum. Mark each one ✓ if it is correct, or ⚑ and write what it should be.
        Your marks are saved in this browser.
      </p>
      <Link to="/review/strokes" className="mb-4 inline-block rounded-2xl bg-white px-4 py-2 text-sm font-extrabold text-primary shadow">✏️ Check stroke order for tracing →</Link>

      <div className="card mb-4 grid grid-cols-3 gap-2 text-center">
        <div><p className="text-2xl font-extrabold text-success">{counts.ok}</p><p className="text-xs font-bold text-ink/50">Approved</p></div>
        <div><p className="text-2xl font-extrabold text-error">{counts.fix}</p><p className="text-xs font-bold text-ink/50">Need fixing</p></div>
        <div><p className="text-2xl font-extrabold text-ink">{counts.todo}</p><p className="text-xs font-bold text-ink/50">Not reviewed</p></div>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {KINDS.map((k) => (
          <button key={k.key} type="button" onClick={() => setKind(k.key)}
            className={`rounded-full px-4 py-2 text-sm font-extrabold ${kind === k.key ? 'bg-primary text-white' : 'bg-white text-primary shadow-sm'}`}>
            {k.label}
          </button>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button key={f.key} type="button" onClick={() => setFilter(f.key)}
            className={`rounded-full px-3 py-1 text-xs font-extrabold ${filter === f.key ? 'bg-secondary text-white' : 'bg-white text-ink/60 shadow-sm'}`}>
            {f.label}
          </button>
        ))}
        <input className="input-field !w-auto flex-1 !py-2 text-sm" placeholder="Search…" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button type="button" onClick={copy} disabled={!fixes.length} className="btn-secondary !px-4 !py-2 !text-sm">
          {copied ? 'Copied!' : `Copy ${fixes.length} correction${fixes.length === 1 ? '' : 's'}`}
        </button>
        <button type="button" onClick={download} disabled={!fixes.length} className="btn-primary !px-4 !py-2 !text-sm">
          Download as JSON
        </button>
      </div>

      {sections.length === 0 && <p className="card text-center text-ink/50">Nothing here.</p>}

      {sections.map((s) => (
        <section key={s.name} className="mb-6">
          <h2 className="mb-2 text-lg font-extrabold text-ink">{s.name} <span className="text-sm font-bold text-ink/40">({s.items.length})</span></h2>
          <div className="space-y-2">
            {s.items.map((i) => {
              const st = statusOf(i.id)
              return (
                <div key={i.id} className={`card !p-3 ${st === 'ok' ? '!bg-success/10' : st === 'fix' ? '!bg-error/10' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="w-10 text-center font-bangla text-2xl">{i.art ?? ''}</span>
                    <div className="min-w-0 flex-1">
                      {i.speakerName && <p className="text-xs font-extrabold uppercase tracking-wide text-ink/40">{i.speakerName} says</p>}
                      <p className="flex items-center gap-2 font-bangla text-2xl font-bold leading-snug text-primary">
                        {i.bn}
                        <Speaker text={i.bn} size="sm" label="Hear it" />
                      </p>
                      <p className="text-sm font-bold text-ink">{i.roman}</p>
                      {i.en && <p className="text-sm text-ink/60">{i.en}</p>}
                      {i.example && (
                        <p className="flex items-center gap-2 text-xs text-ink/50">
                          example: <span className="font-bangla font-bold">{i.example.bn}</span> ({i.example.roman}) = {i.example.en}
                          <Speaker text={i.example.bn} size="sm" label="Hear the example" />
                        </p>
                      )}
                    </div>
                    <button type="button" onClick={() => setStatus(i.id, 'ok')} aria-label="Approve"
                      className={`h-10 w-10 rounded-full text-lg font-extrabold ${st === 'ok' ? 'bg-success text-white' : 'bg-white text-success shadow'}`}>✓</button>
                    <button type="button" onClick={() => setStatus(i.id, 'fix')} aria-label="Needs fixing"
                      className={`h-10 w-10 rounded-full text-lg font-extrabold ${st === 'fix' ? 'bg-error text-white' : 'bg-white text-error shadow'}`}>⚑</button>
                  </div>
                  {st === 'fix' && (
                    <textarea className="input-field mt-2 text-sm" rows={2} placeholder="What should it be? (correct Bangla, spelling, romanisation, meaning…)"
                      value={marks[i.id]?.note ?? ''} onChange={(e) => setNote(i.id, e.target.value)} />
                  )}
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
