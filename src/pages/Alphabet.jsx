import { useState } from 'react'
import { vowels, consonantGroups, vowelSigns } from '../data/alphabet'
import Speaker from '../components/Speaker'
import { useRoman } from '../state/roman'

const TABS = [
  { key: 'vowels', label: 'Vowels' },
  { key: 'consonants', label: 'Consonants' },
  { key: 'signs', label: 'Vowel signs' },
]

function LetterCard({ item }) {
  const { letter, roman, example } = item
  const [romanOn] = useRoman()
  return (
    <div className="card flex flex-col items-center !p-4 text-center">
      <span className="font-bangla text-6xl font-bold leading-tight text-primary">{letter}</span>
      <div className="mt-1 flex items-center gap-2">
        {romanOn && <span className="rounded-full bg-accent px-3 py-0.5 text-sm font-extrabold">{roman}</span>}
        <Speaker text={letter} size="sm" label="Hear the letter" />
      </div>
      <div className="mt-3 w-full border-t border-primary/10 pt-3">
        <span className="text-3xl">{example.emoji}</span>
        <p className="font-bangla text-xl font-bold text-ink">{example.bn}</p>
        {romanOn && <p className="text-sm font-bold text-primary">{example.roman}</p>}
        <p className="mb-1 text-xs text-ink/50">{example.en}</p>
        <Speaker text={example.bn} size="sm" label="Hear the word" />
      </div>
    </div>
  )
}

const GRID = 'grid grid-cols-2 gap-3 sm:grid-cols-3'

export default function Alphabet() {
  const [romanOn] = useRoman()
  const [tab, setTab] = useState('vowels')

  return (
    <div className="py-2">
      <h1 className="text-3xl font-extrabold text-primary">The Bangla Alphabet</h1>
      <p className="mb-4 text-ink/60">বর্ণমালা — tap a tab to explore.</p>

      <div className="mb-6 flex gap-2 rounded-full bg-primary/10 p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`flex-1 rounded-full px-3 py-2 text-sm font-extrabold transition ${
              tab === t.key ? 'bg-primary text-white shadow' : 'text-primary'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'vowels' && (
        <section>
          <h2 className="text-xl font-extrabold text-ink">
            Vowels <span className="font-bangla text-primary">স্বরবর্ণ</span>
          </h2>
          <p className="mb-4 text-sm text-ink/60">There are 11 vowels. Vowels can stand on their own.</p>
          <div className={GRID}>
            {vowels.map((v) => (
              <LetterCard key={v.letter} item={v} />
            ))}
          </div>
        </section>
      )}

      {tab === 'consonants' && (
        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-extrabold text-ink">
              Consonants <span className="font-bangla text-primary">ব্যঞ্জনবর্ণ</span>
            </h2>
            <p className="text-sm text-ink/60">
              The 39 consonants are grouped by where in your mouth the sound is made. Each one has the
              built-in "o" sound, which is why they are written "ko", "kho" and so on.
            </p>
          </div>
          {consonantGroups.map((group) => (
            <div key={group.name}>
              <h3 className="text-lg font-extrabold text-primary">{group.name}</h3>
              <p className="mb-3 text-sm text-ink/60">{group.hint}</p>
              <div className={GRID}>
                {group.letters.map((c) => (
                  <LetterCard key={c.letter} item={c} />
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {tab === 'signs' && (
        <section>
          <h2 className="text-xl font-extrabold text-ink">
            Vowel signs <span className="font-bangla text-primary">কার</span>
          </h2>
          <p className="mb-4 text-sm text-ink/60">
            After a consonant, a vowel is written as a small sign instead of its full letter. Here are all
            ten signs attached to <span className="font-bangla font-bold">ক</span> (ko).
          </p>
          <div className={GRID}>
            {vowelSigns.map((s) => (
              <div key={s.sign} className="card flex flex-col items-center !p-4 text-center">
                <span className="font-bangla text-5xl font-bold text-primary">{s.combined}</span>
                <span className="mt-1 flex items-center gap-2">
                  {romanOn && <span className="rounded-full bg-accent px-3 py-0.5 text-sm font-extrabold">{s.combinedRoman}</span>}
                  <Speaker text={s.combined} size="sm" label="Hear it" />
                </span>
                <p className="mt-3 text-xs text-ink/50">
                  sign <span className="font-bangla text-lg font-bold text-ink">◌{s.sign}</span> {romanOn && <> = "{s.roman}"</>}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
