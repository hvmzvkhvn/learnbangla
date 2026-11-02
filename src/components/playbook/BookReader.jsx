import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { pageArtPath } from '../../data/playbook/artwork'
import Artwork, { PlayIcon, coverIds } from './Artwork'
import { speak, stop } from '../../audio/audio'
import { useRoman } from '../../state/roman'
import { useGame } from '../../state/game'
import { useBookmarks } from './bookmarks'
import './playbook.css'

const dates = ['1905', '1947', '1952', '1966', '1970', '26 Mar 1971', '16 Dec 1971']
const BASE = import.meta.env.BASE_URL
const lineOf = (x) => ({ bn: x.bn, roman: x.roman, en: x.en })

/** How many short readings a book has once every page's extra lines are counted. */
export const stepCount = (pages) => pages.reduce((n, p) => n + 1 + (p.more?.length ?? 0), 0)

/**
 * A reader for picture books and illustrated histories.
 *   book mode  — one short reading at a time (a page's first line, then its extra lines) under that page's painting
 *   story mode — one page at a time: narration, longer background paragraphs, then all of its Bangla lines
 * A page may carry `more` (extra Bangla lines), `deep` (extra English paragraphs), `chapter` (starts a chapter),
 * `label` (its chapter-button text) and `art` (a painting path, when it borrows another page's picture).
 */
export default function BookReader({id, bookId, title, pages, mode = 'book', hideEnglish = false, backTo = '/playbook', xp = 15, onFinish, finishText}) {
  const story = mode === 'story'
  const units = useMemo(() => story
    ? pages.map((p, pageIndex) => ({ pageIndex, lines: [p.lineEn ? { ...lineOf(p), en: p.lineEn, showEn: true } : lineOf(p), ...(p.more ?? []).map(lineOf)] }))
    : pages.flatMap((p, pageIndex) => [lineOf(p), ...(p.more ?? []).map(lineOf)].map((line, k, all) => ({ pageIndex, lines: [line], part: all.length > 1 ? `${k + 1} of ${all.length}` : '' }))), [pages, story])
  const [saved, save] = useBookmarks()
  const [i, setI] = useState(() => {
    const mark = saved[id]
    if (!mark || !Number.isInteger(mark.page)) return 0
    if (mark.of === units.length) return Math.max(0, Math.min(mark.page, units.length - 1))
    if (mark.of === undefined) return Math.max(0, units.findIndex((u) => u.pageIndex === mark.page)) // a bookmark from before pages had extra lines
    return 0
  })
  const [showEn, setShowEn] = useState(!hideEnglish)
  const [active, setActive] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [audioError, setAudioError] = useState('')
  const [award, setAward] = useState(0)
  const [romanOn] = useRoman()
  const { act, game } = useGame()
  const run = useRef(0)
  const reader = useRef(null)
  const done = i >= units.length
  const unit = units[Math.min(i, units.length - 1)]
  const pg = pages[unit.pageIndex]
  const artSrc = (pageIndex) => `${BASE}${pages[pageIndex].art ?? pageArtPath(id, pageIndex)}`
  const chapter = [...pages.slice(0, unit.pageIndex + 1)].reverse().find((p) => p.chapter)?.chapter
  useEffect(() => {
    const next = units[i + 1]
    if (next && next.pageIndex !== unit.pageIndex) {
      const img = new Image()
      img.src = artSrc(next.pageIndex)
    }
  }, [id, i]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => { run.current++; stop() }, [])
  const cancel = () => { run.current++; stop(); setPlaying(false); setActive(null) }
  const go = (n) => {
    cancel(); setAudioError(''); setShowEn(!hideEnglish)
    if (n >= units.length) {
      const first = !game.stats.books?.[id]
      const earned = first ? xp : 0
      setAward(earned)
      act({xp: earned, stats: s => ({books: {...s.books, [id]: Date.now()}})})
      onFinish?.(first)
      save(id, 0)
    } else save(id, n, units.length)
    setI(n)
    reader.current?.scrollIntoView({ block: 'start', behavior: 'auto' })
  }
  // every kind of listening goes through one runner, so starting a new one always stops the last
  const play = async (job) => {
    cancel(); setAudioError(''); setPlaying(true)
    const token = run.current
    const ok = await job(token)
    if (token !== run.current) return
    setPlaying(false); setActive(null)
    if (ok === false) setAudioError('Audio could not play. Tap to try again.')
  }
  const hearWord = (l, w) => play(async () => { setActive({ l, w }); return speak(unit.lines[l].bn.split(' ')[w], {force:true}) })
  const hearLines = (rate = 1) => play(async (token) => {
    for (const [l, line] of unit.lines.entries()) {
      if (token !== run.current) return true
      setActive({ l, w: -1 })
      if (!(await speak(line.bn, {force:true, rate}))) return false
    }
    return true
  })
  const wordByWord = () => play(async (token) => {
    for (const [l, line] of unit.lines.entries())
      for (const [w, word] of line.bn.split(' ').entries()) {
        if (token !== run.current) return true
        setActive({ l, w })
        if (!(await speak(word, {force:true, rate:.85}))) return false
      }
    return true
  })
  if (done) return <div ref={reader} className="pb-reader card mt-5 text-center">
    {coverIds.includes(bookId) && <img src={`${import.meta.env.BASE_URL}images/playbook/${bookId}.webp`} alt="" className="mx-auto mb-5 w-48 rounded-xl" />}
    <p className="pb-eyebrow">STORY COMPLETE</p><h1 className="text-2xl font-bold">{finishText || 'A little story. A big discovery.'}</h1><p className="mt-3">You finished “{title}”.{award > 0 ? ` +${award} XP` : ''}</p>
    <div className="mt-5 flex flex-wrap justify-center gap-3"><button className="btn-secondary" onClick={() => go(0)}>Read again</button><Link className="btn-primary" to={backTo}>Find another story</Link></div>
  </div>
  const label = (p, k) => p.label || (id === 'story:timeline' ? dates[k] : `Chapter ${k + 1}`)
  return <article ref={reader} className="pb-reader">
    <header className="pb-reader-header"><Link to={backTo} aria-label="Back to Playbook">←</Link><div><h1>{title}</h1><p aria-live="polite">{story ? 'Our stories' : 'Read & listen'} · Page {unit.pageIndex + 1} of {pages.length}{unit.part ? ` · part ${unit.part}` : ''} · Bookmark saved on this device</p></div></header>
    {story && <nav className="pb-timeline" aria-label="Story chapters">{pages.map((p, k) => <button key={k} onClick={() => go(k)} aria-current={i === k ? 'step' : undefined}>{label(p, k)}</button>)}</nav>}
    {!story && chapter && <p className="pb-chapter"><span>Chapter</span><b lang="bn">{chapter.bn}</b> · {chapter.en}</p>}
    <div className={`pb-reader-sheet ${story ? 'pb-story-sheet' : ''}`}>
      <div className="pb-reader-art"><Artwork key={`${id}-${unit.pageIndex}`} src={artSrc(unit.pageIndex)} alt={pg.artNote || pg.en} eager /></div>
      <div>
        {pg.artNote && <p className="pb-art-note">{pg.artNote}</p>}
        {story && <><p className="pb-history-narration">{pg.en}</p>{(pg.deep ?? []).map((t, k) => <p key={k} className="pb-deep">{t}</p>)}</>}
        {unit.lines.map((line, l) => <div className="pb-caption" key={l} data-line-active={active?.l === l}>
          <p className="pb-caption-bn" lang="bn">{line.bn.split(' ').map((word, k) => <button key={k} className="pb-word" data-active={active?.l === l && active.w === k} onClick={() => hearWord(l, k)} aria-label={`Hear ${word}`}>{word}</button>)}</p>
          {romanOn && <p className="pb-roman">{line.roman}</p>}
          {!story && (showEn ? <p className="pb-translation">{line.en}</p> : <button className="pb-translation underline" onClick={() => setShowEn(true)}>Show English meaning</button>)}
          {story && showEn && (l > 0 || line.showEn) && <p className="pb-translation">{line.en}</p>}
        </div>)}
        <div className="pb-caption pb-caption-tools">
          <div className="pb-audio-tools"><button onClick={() => hearLines()}><PlayIcon kind="audio" />{unit.lines.length > 1 ? 'Hear it all' : 'Hear the line'}</button><button onClick={() => hearLines(.75)}>Slowly</button><button onClick={wordByWord}>Word by word</button>{playing && <button onClick={cancel}>Stop audio</button>}</div>
          <p className="pb-audio-status" role="status">{audioError || (active && active.w >= 0 ? 'Listening · follow the highlighted word' : 'Tap any Bangla word to hear it.')}</p>
        </div>
      </div>
    </div>
    <nav className="pb-reader-controls" aria-label="Reading pages"><button disabled={i===0} onClick={() => go(i-1)}>← Previous</button>{units.length > 14 ? <div className="pb-reader-bar" role="progressbar" aria-label="Reading progress" aria-valuemin={1} aria-valuemax={units.length} aria-valuenow={i + 1}><i style={{ width: `${((i + 1) / units.length) * 100}%` }} /></div> : <div className="pb-reader-progress" aria-hidden="true">{units.map((u,k)=><span key={k} data-current={k===i} />)}</div>}<button onClick={() => go(i+1)}>{i===units.length-1 ? 'Finish ✓' : 'Next →'}</button></nav>
  </article>
}
