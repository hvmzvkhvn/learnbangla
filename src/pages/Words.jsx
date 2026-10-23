import { useState } from 'react'
import { wordCategories } from '../data/words'
import Speaker from '../components/Speaker'

export default function Words() {
  const [activeKey, setActiveKey] = useState(wordCategories[0].key)
  const active = wordCategories.find((c) => c.key === activeKey)

  return (
    <div className="py-2">
      <h1 className="text-3xl font-extrabold text-primary">Bangla Words</h1>
      <p className="mb-4 text-ink/60">শব্দ — pick a topic.</p>

      <div className="-mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-2">
        {wordCategories.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setActiveKey(c.key)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold shadow-sm transition ${
              activeKey === c.key ? 'bg-primary text-white' : 'bg-white text-primary'
            }`}
          >
            <span className="text-lg">{c.emoji}</span>
            {c.title}
          </button>
        ))}
      </div>

      {active.note && <p className="mb-4 rounded-2xl bg-accent/30 px-4 py-3 text-sm font-semibold">{active.note}</p>}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {active.words.map((w) => (
          <div key={w.bn + w.en} className="card flex flex-col items-center !p-4 text-center">
            <span className="font-bangla text-4xl">{w.digit ?? w.emoji}</span>
            <p className="mt-2 font-bangla text-2xl font-bold leading-snug text-primary">{w.bn}</p>
            <p className="text-sm font-extrabold text-ink">{w.roman}</p>
            <p className="mb-1 text-xs text-ink/50">{w.en}</p>
            <Speaker text={w.bn} size="sm" label="Hear the word" />
          </div>
        ))}
      </div>
    </div>
  )
}
