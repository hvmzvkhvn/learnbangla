import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Scene from '../../art/Scene'
import Speaker from '../Speaker'
import { speak } from '../../audio/audio'
import { useRoman } from '../../state/roman'
import { useGame } from '../../state/game'

/**
 * A page-turn reader for picture books and storyboards.
 *   mode 'book'  — picture, then the Bangla line (tap a word to hear it), romanisation, and the English (hidden until tapped for the young)
 *   mode 'story' — picture, English narration first, Bangla caption beneath (16+ storyboards)
 */
export default function BookReader({ id, title, pages, mode = 'book', hideEnglish = false, backTo = '/playbook', xp = 15, onFinish, finishText }) {
  const [i, setI] = useState(0)
  const [showEn, setShowEn] = useState(false)
  const [romanOn] = useRoman()
  const { act, game } = useGame()
  const done = i >= pages.length
  const pg = pages[Math.min(i, pages.length - 1)]

  useEffect(() => {
    setShowEn(false)
    if (!done) speak(pg.bn)
  }, [i]) // eslint-disable-line react-hooks/exhaustive-deps

  const finish = () => {
    const first = !game.stats.books?.[id]
    act({ xp: first ? xp : 0, stats: (s) => ({ books: { ...(s.books ?? {}), [id]: Date.now() } }) })
    onFinish?.(first)
  }

  if (done) {
    const first = !game.stats.books?.[id]
    return (
      <div className="animate-pop card mt-6 text-center">
        <p className="text-6xl">🎉</p>
        <h2 className="mt-2 text-2xl font-extrabold text-primary">{finishText ?? 'The end!'}</h2>
        <p className="mt-1 text-ink/60">{first ? `You finished “${title}”. +${xp} XP` : `You read “${title}” again.`}</p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button type="button" onClick={() => { finish(); setI(0) }} className="btn-secondary">↺ Read it again</button>
          <Link to={backTo} onClick={finish} className="btn-primary">More in the Playbook</Link>
        </div>
      </div>
    )
  }

  const caption = (
    <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="font-bangla text-2xl font-bold leading-snug text-primary">
            {pg.bn.split(' ').map((t, k) => (
              <button key={k} type="button" onClick={() => speak(t, { force: true })} className="mr-1.5 rounded-lg px-0.5 transition hover:bg-primary/10 active:scale-95">{t}</button>
            ))}
          </p>
          {romanOn && <p className="text-sm font-bold text-ink/70">{pg.roman}</p>}
          {mode === 'book' && (hideEnglish && !showEn
            ? <button type="button" onClick={() => setShowEn(true)} className="mt-1 text-sm font-bold text-secondary">🇬🇧 What does it say?</button>
            : <p className="text-sm text-ink/60">{pg.en}</p>)}
        </div>
        <Speaker text={pg.bn} size="md" label="Hear the line" />
      </div>
    </div>
  )

  return (
    <div className="mt-2">
      <div className="mb-3 flex items-center gap-3">
        <Link to={backTo} aria-label="Back" className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-extrabold text-ink/50 shadow">←</Link>
        <h1 className="flex-1 truncate text-lg font-extrabold text-ink">{title}</h1>
        <span className="text-sm font-bold text-ink/40">{i + 1} / {pages.length}</span>
      </div>
      <div key={i} className="animate-pop">
        <Scene scene={pg.scene} id={`${id}${i}`} className="shadow-md" />
        <div className="mt-3 space-y-3">
          {mode === 'story' && <p className="rounded-2xl bg-primary px-4 py-3 text-base leading-relaxed text-white shadow">{pg.en}</p>}
          {caption}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <button type="button" onClick={() => setI((n) => Math.max(0, n - 1))} disabled={i === 0} className="rounded-2xl bg-white px-5 py-3 font-extrabold text-ink/60 shadow disabled:opacity-30">← Back</button>
        <div className="flex gap-1.5" aria-hidden>
          {pages.map((_, k) => <span key={k} className={`h-2 w-2 rounded-full ${k === i ? 'bg-primary' : k < i ? 'bg-primary/40' : 'bg-ink/15'}`} />)}
        </div>
        <button type="button" onClick={() => setI((n) => n + 1)} className="btn-primary !px-6 !py-3">{i === pages.length - 1 ? 'Finish ✓' : 'Next →'}</button>
      </div>
    </div>
  )
}
