import { useState } from 'react'

const ROWS = {
  Vowels: ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ'],
  Signs: ['া', 'ি', 'ী', 'ু', 'ূ', 'ৃ', 'ে', 'ৈ', 'ো', 'ৌ'],
  Letters: [
    'ক',
    'খ',
    'গ',
    'ঘ',
    'ঙ',
    'চ',
    'ছ',
    'জ',
    'ঝ',
    'ঞ',
    'ট',
    'ঠ',
    'ড',
    'ঢ',
    'ণ',
    'ত',
    'থ',
    'দ',
    'ধ',
    'ন',
    'প',
    'ফ',
    'ব',
    'ভ',
    'ম',
    'য',
    'র',
    'ল',
    'শ',
    'ষ',
    'স',
    'হ',
  ],
  More: ['ড়', 'ঢ়', 'য়', 'ৎ', 'ং', 'ঃ', 'ঁ', '্'],
}
const SHOW = { Signs: (c) => `◌${c}`, More: (c) => (c === '্' ? '◌্' : c) }

/** On-screen Bangla keyboard. Signs and the joiner (◌্) attach to the letter before them. */
export default function BengaliKeyboard({ onKey, onBackspace, onSpace }) {
  const [tab, setTab] = useState('Letters')
  return (
    <div className="rounded-3xl bg-white p-3 shadow-sm">
      <div className="mb-3 flex flex-wrap gap-2 rounded-full bg-primary/10 p-1">
        {Object.keys(ROWS).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tab === t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-full px-2 py-1.5 text-xs font-bold ${tab === t ? 'bg-primary text-white' : 'text-primary'}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="keyboard-grid">
        {ROWS[tab].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onKey(c)}
            className="h-11 rounded-xl bg-background font-bangla text-xl font-bold text-primary shadow-sm transition active:scale-[0.98] hover:bg-accent/40"
          >
            {(SHOW[tab] ?? ((x) => x))(c)}
          </button>
        ))}
        <button
          type="button"
          onClick={onBackspace}
          aria-label="Backspace"
          className="h-11 rounded-xl bg-error/10 text-lg font-bold text-error active:scale-[0.98]"
        >
          ⌫
        </button>
        <button
          type="button"
          onClick={onSpace}
          aria-label="Space"
          className="col-span-2 h-11 rounded-xl bg-background text-sm font-bold text-muted active:scale-[0.98]"
        >
          space
        </button>
      </div>
    </div>
  )
}
