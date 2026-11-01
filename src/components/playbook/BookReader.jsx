import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Scene from '../../art/Scene'
import Artwork, { PlayIcon, coverIds } from './Artwork'
import { speak, stop } from '../../audio/audio'
import { useRoman } from '../../state/roman'
import { useGame } from '../../state/game'
import { useBookmarks } from './bookmarks'
import './playbook.css'

const dates = ['1905', '1947', '1952', '1966', '1970', '26 Mar 1971', '16 Dec 1971']
export default function BookReader({id, bookId, title, pages, mode = 'book', hideEnglish = false, backTo = '/playbook', xp = 15, onFinish, finishText}) {
  const [saved, save] = useBookmarks()
  const [i, setI] = useState(() => Math.max(0, Math.min(Number.isInteger(saved[id]?.page) ? saved[id].page : 0, pages.length - 1)))
  const [showEn, setShowEn] = useState(!hideEnglish)
  const [activeWord, setActiveWord] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const [audioError, setAudioError] = useState('')
  const [award, setAward] = useState(0)
  const [romanOn] = useRoman()
  const { act, game } = useGame()
  const run = useRef(0)
  const done = i >= pages.length
  const pg = pages[Math.min(i, pages.length - 1)]
  useEffect(() => () => { run.current++; stop() }, [])
  const cancel = () => { run.current++; stop(); setPlaying(false); setActiveWord(-1) }
  const go = (n) => {
    cancel(); setAudioError(''); setShowEn(!hideEnglish)
    if (n >= pages.length) {
      const first = !game.stats.books?.[id]
      const earned = first ? xp : 0
      setAward(earned)
      act({xp: earned, stats: s => ({books: {...s.books, [id]: Date.now()}})})
      onFinish?.(first)
      save(id, 0)
    } else save(id, n)
    setI(n)
  }
  const listen = async (word = null, rate = 1) => {
    cancel(); setAudioError(''); setPlaying(true)
    const token = run.current
    if (word !== null) setActiveWord(word)
    const ok = await speak(word === null ? pg.bn : pg.bn.split(' ')[word], {force:true, rate})
    if (token !== run.current) return
    setPlaying(false); setActiveWord(-1)
    if (!ok) setAudioError('Audio could not play. Tap to try again.')
  }
  const wordByWord = async () => {
    cancel(); setAudioError(''); setPlaying(true)
    const token = run.current
    for (const [k, word] of pg.bn.split(' ').entries()) {
      if (token !== run.current) return
      setActiveWord(k)
      const ok = await speak(word, {force:true, rate:.85})
      if (token !== run.current) return
      if (!ok) { setAudioError('A word recording is unavailable. Try “Hear the line”.'); break }
    }
    if (token === run.current) { setActiveWord(-1); setPlaying(false) }
  }
  if (done) return <div className="pb-reader card mt-5 text-center">
    {coverIds.includes(bookId) && <img src={`${import.meta.env.BASE_URL}images/playbook/${bookId}.webp`} alt="" className="mx-auto mb-5 w-48 rounded-xl" />}
    <p className="pb-eyebrow">STORY COMPLETE</p><h1 className="text-2xl font-bold">{finishText || 'A little story. A big discovery.'}</h1><p className="mt-3">You finished “{title}”.{award > 0 ? ` +${award} XP` : ''}</p>
    <div className="mt-5 flex flex-wrap justify-center gap-3"><button className="btn-secondary" onClick={() => go(0)}>Read again</button><Link className="btn-primary" to={backTo}>Find another story</Link></div>
  </div>
  return <article className="pb-reader">
    <header className="pb-reader-header"><Link to={backTo} aria-label="Back to Playbook">←</Link><div><h1>{title}</h1><p>{mode === 'story' ? 'Our stories' : 'Read & listen'} · Page {i+1} of {pages.length} · Bookmark saved on this device</p></div></header>
    {mode === 'story' && <nav className="pb-timeline" aria-label="Story chapters">{pages.map((_,k) => <button key={k} onClick={() => go(k)} aria-current={i === k ? 'step' : undefined}>{id === 'story:timeline' ? dates[k] : `Chapter ${k+1}`}</button>)}</nav>}
    <div className={`pb-reader-sheet ${mode === 'story' ? 'pb-story-sheet' : ''}`}>
      <div className="pb-reader-art">{i === 0 && mode === 'book' ? <Artwork bookId={bookId} scene={pg.scene} id={`${id}-${i}`} alt={`${title} — opening illustration`} eager /> : <Scene scene={{...pg.scene, furnished:true, alt:pg.en}} id={`${id}-${i}`} />}</div>
      <div>
        {mode === 'story' && <p className="pb-history-narration">{pg.en}</p>}
        <div className="pb-caption">
          <p className="pb-caption-bn" lang="bn">{pg.bn.split(' ').map((word,k) => <button key={k} className="pb-word" data-active={activeWord === k} onClick={() => listen(k)} aria-label={`Hear ${word}`}>{word}</button>)}</p>
          {romanOn && <p className="pb-roman">{pg.roman}</p>}
          {mode === 'book' && (showEn ? <p className="pb-translation">{pg.en}</p> : <button className="pb-translation underline" onClick={() => setShowEn(true)}>Show English meaning</button>)}
          <div className="pb-audio-tools"><button onClick={() => listen()}><PlayIcon kind="audio" />Hear the line</button><button onClick={() => listen(null,.75)}>Slowly</button><button onClick={wordByWord}>Word by word</button>{playing && <button onClick={cancel}>Stop audio</button>}</div>
          <p className="pb-audio-status" role="status">{audioError || (activeWord >= 0 ? 'Listening · follow the highlighted word' : 'Tap any Bangla word to hear it.')}</p>
        </div>
      </div>
    </div>
    <nav className="pb-reader-controls" aria-label="Reading pages"><button disabled={i===0} onClick={() => go(i-1)}>← Previous</button><div className="pb-reader-progress" aria-hidden="true">{pages.map((_,k)=><span key={k} data-current={k===i} />)}</div><button onClick={() => go(i+1)}>{i===pages.length-1 ? 'Finish ✓' : 'Next page →'}</button></nav>
  </article>
}
