import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { speak } from '../../audio/audio'
import Speaker from '../Speaker'
import BanglaLine from './BanglaLine'
import ThenNow from './ThenNow'
import { useRoman } from '../../state/roman'

const SectionTitle = ({ children }) => <h3 className="mb-2 mt-5 text-sm font-extrabold uppercase tracking-wide text-ink/40">{children}</h3>

/** The card that slides up when a division is tapped. What it shows deepens with the age track. */
export default function RegionSheet({ region: r, tier, ex, lessonId, onClose, onCity, activeCity }) {
  const [openCity, setOpenCity] = useState(null)
  const [romanOn] = useRoman()
  const ref = useRef(null)
  useEffect(() => {
    setOpenCity(null)
    ref.current?.scrollTo?.({ top: 0 })
  }, [r.id])

  const toggleCity = (c) => {
    const next = openCity === c.id ? null : c.id
    setOpenCity(next)
    onCity?.(next ? c : null)
    if (next) {
      ex.stamp(`c:${c.id}`, 5, c.name)
      speak(c.bn, { force: true })
    }
  }
  useEffect(() => {
    if (r.cities.every((c) => ex.cityStamped(c))) ex.stamp(`done:${r.id}`, 20, `${r.name} complete`)
  }, [ex.stamps]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/40" onClick={onClose}>
      <div ref={ref} onClick={(e) => e.stopPropagation()} className="animate-slideIn max-h-[86vh] w-full max-w-xl overflow-y-auto rounded-t-[2rem] bg-background px-5 pb-28 pt-4 shadow-2xl">
        <div className="sticky top-0 z-10 -mx-5 -mt-4 mb-2 flex items-center gap-3 bg-background/95 px-5 py-3 backdrop-blur">
          <span className="text-4xl">{r.emoji}</span>
          <span className="flex-1">
            <span className="block font-bangla text-3xl font-extrabold leading-none text-primary">{r.bn}</span>
            <span className="block text-sm font-bold text-ink/50">{r.name} Division{romanOn ? ` · ${r.roman}` : ''}</span>
          </span>
          <Speaker text={r.bn} size="md" label="Hear the name" />
          <button type="button" onClick={onClose} aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-extrabold text-ink/50 shadow">✕</button>
        </div>

        <div className="rounded-3xl bg-primary px-4 py-4 text-white shadow">
          <p className="text-xs font-extrabold uppercase tracking-wide opacity-70">📖 In English</p>
          <p className="mt-1 text-base leading-relaxed">{r.hook}</p>
        </div>
        <div className="mt-3"><BanglaLine s={r.intro} size="text-2xl" /></div>

        <SectionTitle>⭐ Famous for</SectionTitle>
        <div className="space-y-2">{r.famous.map((f) => <BanglaLine key={f.bn} s={f} emoji={f.emoji} />)}</div>

        <SectionTitle>⏳ Then &amp; Now</SectionTitle>
        <ThenNow then={r.then} now={r.now} />
        {tier !== 'teen' && (
          <ol className="mt-3 space-y-2 border-l-4 border-primary/20 pl-4">
            {r.timeline.map(([year, text]) => (
              <li key={year + text} className="text-sm">
                <span className="mr-2 rounded-full bg-accent px-2 py-0.5 text-xs font-extrabold">{year}</span>
                <span className="text-ink/80">{text}</span>
              </li>
            ))}
          </ol>
        )}

        <SectionTitle>🌾 Made &amp; grown here</SectionTitle>
        <div className="space-y-2">{r.made.map((f) => <BanglaLine key={f.bn} s={f} emoji={f.emoji} />)}</div>
        {tier !== 'teen' && (
          <div className="mt-3 rounded-2xl bg-secondary/10 px-4 py-3">
            <p className="text-xs font-extrabold uppercase tracking-wide text-ink/40">💰 The economy</p>
            <p className="mt-1 text-sm leading-relaxed text-ink/80">{r.economy}</p>
          </div>
        )}
        {tier === 'adult' && r.deep && (
          <div className="mt-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-wide text-ink/40">📚 Go deeper</p>
            {r.deep.map((p, i) => <p key={i} className="mt-2 text-sm leading-relaxed text-ink/80">{p}</p>)}
          </div>
        )}

        <SectionTitle>🏙️ Four famous places — tap to open</SectionTitle>
        <div className="space-y-2">
          {r.cities.map((c) => {
            const open = openCity === c.id
            return (
              <div key={c.id} className={`overflow-hidden rounded-2xl bg-white shadow-sm ${activeCity === c.id ? 'ring-2 ring-secondary' : ''}`}>
                <button type="button" onClick={() => toggleCity(c)} className="flex w-full items-center gap-3 px-3 py-3 text-left" aria-expanded={open}>
                  <span className="text-3xl">{c.emoji}</span>
                  <span className="flex-1">
                    <span className="block font-bangla text-xl font-extrabold text-primary">{c.bn}</span>
                    <span className="block text-xs font-bold text-ink/50">{c.name}</span>
                  </span>
                  {ex.cityStamped(c) && <span title="Stamped">🛂</span>}
                  <span className="text-ink/30">{open ? '▾' : '▸'}</span>
                </button>
                {open && (
                  <div className="animate-slideIn space-y-3 border-t border-primary/10 px-3 py-3">
                    <p className="text-sm leading-relaxed text-ink/80">{c.fact}</p>
                    <BanglaLine s={c.line} />
                    <div className="flex flex-wrap gap-2">
                      {c.words.map((w) => (
                        <button key={w.bn} type="button" onClick={() => speak(w.bn, { force: true })} className="flex items-center gap-2 rounded-2xl bg-accent/40 px-3 py-2 text-left transition active:scale-95">
                          <span className="text-2xl">{w.emoji}</span>
                          <span>
                            <span className="block font-bangla text-lg font-bold leading-none text-ink">{w.bn}</span>
                            <span className="block text-xs text-ink/60">{romanOn ? `${w.roman} · ` : ''}{w.en}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {lessonId && (
          <Link to={`/lesson/${lessonId}`} className="btn-primary mt-6 w-full">📝 Practise {r.name} words</Link>
        )}
      </div>
    </div>
  )
}
