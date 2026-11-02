import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { readerUnits, unitArtwork } from './readerUnits.js'
export { stepCount } from './readerUnits.js'
import Artwork, { PlayIcon, coverIds } from './Artwork'
import { speak, stop } from '../../audio/audio'
import { useRoman } from '../../state/roman'
import { useGame } from '../../state/game'
import { useBookmarks } from './bookmarks'
import './playbook.css'

const dates = ['1905', '1947', '1952', '1966', '1970', '26 Mar 1971', '16 Dec 1971']
const BASE = import.meta.env.BASE_URL
/**
 * A reader for picture books and illustrated histories.
 *   book mode  — one short reading at a time (a page's first line, then its extra lines) with a dedicated painting for each reading
 *   story mode — one page at a time: narration, longer background paragraphs, then all of its Bangla lines
 * A page may carry `more` (extra Bangla lines), `deep` (extra English paragraphs), `chapter` (starts a chapter),
 * `label` (its chapter-button text) and `art` (a dedicated painting path).
 * The big stories also pass `parts` (one button per part instead of one per page), `toolbar` (shown above the slide),
 * and slides with a `heading`; their paintings may not exist yet, so a missing file shows a typographic card instead.
 */
export default function BookReader({id, bookId, title, pages, mode = 'book', hideEnglish = false, backTo = '/playbook', xp = 15, onFinish, finishText, parts, toolbar}) {
  const story = mode === 'story'
  const units = useMemo(() => readerUnits(pages, story), [pages, story])
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
  const artSrc = (reading) => `${BASE}${unitArtwork(id, pages, reading)}`
  const chapter = [...pages.slice(0, unit.pageIndex + 1)].reverse().find((p) => p.chapter)?.chapter
  useEffect(() => {
    const next = units[i + 1]
    if (next) {
      const img = new Image()
      img.src = `${BASE}${unitArtwork(id, pages, next)}`
    }
  }, [id, i, pages, units])
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
  return <article ref={reader} className={`pb-reader${parts ? ' pb-reader-long' : ''}`}>
    <header className="pb-reader-header"><Link to={backTo} aria-label="Back to Playbook">←</Link><div><h1>{title}</h1><p aria-live="polite">{story ? 'Our stories' : 'Read & listen'} · {parts ? 'Slide' : 'Page'} {unit.pageIndex + 1} of {pages.length}{unit.part ? ` · part ${unit.part}` : ''} · Bookmark saved on this device</p></div></header>
    {toolbar}
    {story && !parts && <nav className="pb-timeline" aria-label="Story chapters">{pages.map((p, k) => <button key={k} onClick={() => go(k)} aria-current={i === k ? 'step' : undefined}>{label(p, k)}</button>)}</nav>}
    {story && parts && <nav className="pb-timeline pb-parts" aria-label="Story parts">{parts.map((pt, k) => <button key={k} onClick={() => go(pt.from)} aria-current={unit.pageIndex >= pt.from && unit.pageIndex < (parts[k + 1]?.from ?? pages.length) ? 'step' : undefined}><span>Part {k + 1}</span>{pt.title}</button>)}</nav>}
    {!story && chapter && <p className="pb-chapter"><span>Chapter</span><b lang="bn">{chapter.bn}</b> · {chapter.en}</p>}
    <div className={`pb-reader-sheet ${story ? 'pb-story-sheet' : ''}`}>
      <div className="pb-reader-art"><Artwork key={artSrc(unit)} src={artSrc(unit)} alt={unit.artAlt || pg.artAlt || pg.en} eager fallback={pg.heading && <div className="pb-art-pending" role="img" aria-label={`${pg.partTitle ?? title}: ${pg.heading}`}><span>{pg.part !== undefined ? `Part ${pg.part + 1} · slide ${unit.pageIndex + 1}` : `Chapter ${unit.pageIndex + 1} of ${pages.length}`}</span>{pg.partTitleBn && <b lang="bn">{pg.partTitleBn}</b>}<i>{pg.heading}</i></div>} /></div>
      <div>
        {story && <>{pg.heading && <h2 className="pb-slide-heading">{pg.heading}</h2>}<p className="pb-history-narration">{pg.en}</p>{(pg.deep ?? []).map((t, k) => <div key={k} className={pg.deepArt?.[k] ? 'pb-illustrated-background' : undefined}>{pg.deepArt?.[k] && <Artwork src={`${BASE}${pg.deepArt[k].art}`} alt={pg.deepArt[k].artAlt} />}<p className="pb-deep">{t}</p></div>)}</>}
        {unit.lines.map((line, l) => <div className={`pb-caption ${story && l > 0 && line.art ? 'pb-illustrated-caption' : ''}`} key={l} data-line-active={active?.l === l}>
          {story && l > 0 && line.art && <Artwork src={`${BASE}${line.art}`} alt={line.artAlt || line.en} />}
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
