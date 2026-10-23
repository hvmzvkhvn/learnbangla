import { useEffect, useRef, useState } from 'react'
import { roster } from '../../curriculum/bank'
import { speak, stop } from '../../audio/audio'
import { useSoundOn } from '../../audio/audio'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** A conversation as chat bubbles. Tara is on the right; everyone else on the left. */
export default function SceneView({ scene }) {
  const [active, setActive] = useState(-1)
  const [soundOn] = useSoundOn()
  const run = useRef(0)

  async function playAll() {
    const id = ++run.current
    for (let i = 0; i < scene.lines.length; i++) {
      if (run.current !== id) return
      setActive(i)
      const ok = await speak(scene.lines[i].bn, { force: true })
      if (!ok || run.current !== id) break
      await sleep(350)
    }
    if (run.current === id) setActive(-1)
  }

  async function playOne(i) {
    run.current++
    setActive(i)
    await speak(scene.lines[i].bn, { force: true })
    setActive((a) => (a === i ? -1 : a))
  }

  // Auto-play the whole conversation once when it appears (if sound is on).
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
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-extrabold uppercase tracking-wide text-ink/40">Listen to the conversation</p>
        <button type="button" onClick={playAll} className="btn-primary !px-4 !py-2 !text-sm">
          ▶ Play all
        </button>
      </div>

      <div className="space-y-3">
        {scene.lines.map((l, i) => {
          const who = roster[l.speaker]
          const me = who?.me
          return (
            <div key={l.id} className={`flex items-end gap-2 ${me ? 'flex-row-reverse' : ''}`}>
              <div className="flex w-14 shrink-0 flex-col items-center text-center">
                <span className="text-3xl">{who?.emoji}</span>
                <span className="font-bangla text-xs font-extrabold leading-tight text-ink/60">{who?.bn}</span>
              </div>
              <button
                type="button"
                onClick={() => playOne(i)}
                className={`max-w-[80%] rounded-3xl px-4 py-3 text-left shadow-sm transition active:scale-[0.98] ${
                  me ? 'rounded-br-md bg-primary/10' : 'rounded-bl-md bg-white'
                } ${active === i ? 'ring-4 ring-secondary' : ''}`}
              >
                <span className="flex items-start gap-2">
                  {l.art && <span className="text-2xl">{l.art}</span>}
                  <span>
                    <span className="block font-bangla text-xl font-bold leading-snug text-primary">{l.bn}</span>
                    <span className="block text-xs font-bold text-ink/60">{l.roman}</span>
                    <span className="block text-xs text-ink/50">{l.en}</span>
                  </span>
                </span>
              </button>
            </div>
          )
        })}
      </div>
      <p className="mt-4 text-center text-xs font-bold text-ink/40">Tap any line to hear it again</p>
    </div>
  )
}
