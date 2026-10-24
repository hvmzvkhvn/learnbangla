import { useEffect, useRef, useState } from 'react'
import { speak, stop, useSoundOn } from '../../audio/audio'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const strip = (t) => t.replace(/[।,?!"“”]/g, '')

/** A poem, song or passage. Tap a line to hear it, or a single word to hear just that word. */
export default function TextView({ text }) {
  const [active, setActive] = useState(-1)
  const [showEn, setShowEn] = useState(true)
  const [soundOn] = useSoundOn()
  const run = useRef(0)
  const poem = text.kind === 'poem'

  async function playAll() {
    const id = ++run.current
    for (let i = 0; i < text.lines.length; i++) {
      if (run.current !== id) return
      setActive(i)
      const ok = await speak(text.lines[i].bn, { force: true })
      if (!ok || run.current !== id) break
      await sleep(poem ? 500 : 300)
    }
    if (run.current === id) setActive(-1)
  }

  async function playLine(i) {
    run.current++
    setActive(i)
    await speak(text.lines[i].bn, { force: true })
    setActive((a) => (a === i ? -1 : a))
  }

  useEffect(() => {
    if (soundOn) playAll()
    return () => {
      run.current++
      stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-wide text-ink/40">{poem ? 'Listen to the song' : 'Read and listen'}</p>
          {text.author && <p className="text-xs font-bold text-ink/50">by {text.author}</p>}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setShowEn((v) => !v)} className={`rounded-full px-3 py-2 text-xs font-extrabold shadow-sm ${showEn ? 'bg-white text-primary' : 'bg-ink/10 text-ink/50'}`}>
            English {showEn ? 'on' : 'off'}
          </button>
          <button type="button" onClick={playAll} className="btn-primary !px-4 !py-2 !text-sm">
            ▶ Play all
          </button>
        </div>
      </div>

      <div className={`card space-y-4 ${poem ? 'text-center' : ''}`}>
        {text.lines.map((l, i) => (
          <div key={l.id} className={`rounded-2xl p-2 transition ${active === i ? 'bg-accent/40 ring-4 ring-secondary/60' : ''}`}>
            <p className={`font-bangla font-bold leading-relaxed text-primary ${poem ? 'text-2xl' : 'text-xl'}`}>
              {l.tokens.map((t, k) => (
                <span key={k}>
                  <button type="button" onClick={() => speak(strip(t), { force: true })} className="rounded-lg px-0.5 transition hover:bg-primary/10 active:scale-95">
                    {t}
                  </button>{' '}
                </span>
              ))}
            </p>
            <button type="button" onClick={() => playLine(i)} className="mt-1 block w-full text-center text-xs font-bold text-ink/50">
              {l.roman}
              {showEn && <span className="mt-0.5 block font-normal text-ink/60">{l.en}</span>}
              <span className="mt-1 inline-block text-[11px] text-primary">🔊 tap to hear the line</span>
            </button>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs font-bold text-ink/40">Tap any word to hear it</p>
    </div>
  )
}
