import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Scene from '../../art/Scene'
import Speaker from '../Speaker'
import { speak } from '../../audio/audio'
import { useRoman } from '../../state/roman'
import { useGame } from '../../state/game'

/** Tap anything in the picture to hear and see its Bangla name. "Find it" mode asks you to tap the thing you hear. */
export default function LookLearn({ look, backTo = '/playbook' }) {
  const { act, game } = useGame()
  const [romanOn] = useRoman()
  const hot = useMemo(() => look.scene.items.map((it, i) => ({ ...it, i })).filter((it) => it.word), [look])
  const [mode, setMode] = useState('explore') // 'explore' | 'find'
  const [shown, setShown] = useState(null) // last tapped item
  const [seen, setSeen] = useState(() => new Set())
  const [target, setTarget] = useState(null)
  const [score, setScore] = useState(0)
  const [tries, setTries] = useState(0)
  const [wrong, setWrong] = useState(false)
  const [order, setOrder] = useState([])
  const [end, setEnd] = useState(false)

  const tap = (it) => {
    if (mode === 'explore') {
      setShown(it)
      setSeen((s) => new Set(s).add(it._i))
      speak(it.word.bn, { force: true })
      return
    }
    if (target == null || end) return
    if (it._i === target.i) {
      setWrong(false)
      setScore((n) => n + (tries === 0 ? 1 : 0))
      setTries(0)
      setShown(it)
      const next = order.slice(1)
      setOrder(next)
      if (!next.length) {
        setEnd(true)
        setTarget(null)
        const first = !game.stats.looks?.[look.id]
        act({ xp: first ? 15 : 3, stats: (s) => ({ looks: { ...(s.looks ?? {}), [look.id]: Date.now() } }) })
      } else {
        const t = hot.find((h) => h.i === next[0])
        setTarget(t)
        setTimeout(() => speak(t.word.bn, { force: true }), 600)
      }
    } else {
      setWrong(true)
      setTries((n) => n + 1)
      setTimeout(() => setWrong(false), 700)
      speak(target.word.bn, { force: true })
    }
  }

  const startFind = () => {
    const ord = [...hot].sort(() => Math.random() - 0.5).map((h) => h.i)
    setMode('find')
    setOrder(ord)
    setScore(0)
    setTries(0)
    setEnd(false)
    setShown(null)
    const t = hot.find((h) => h.i === ord[0])
    setTarget(t)
    setTimeout(() => speak(t.word.bn, { force: true }), 300)
  }

  const w = shown?.word
  return (
    <div className="mt-2">
      <div className="mb-3 flex items-center gap-3">
        <Link to={backTo} aria-label="Back" className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-extrabold text-ink/50 shadow">←</Link>
        <h1 className="flex-1 truncate text-lg font-extrabold text-ink">{look.title.en} <span className="font-bangla text-primary">· {look.title.bn}</span></h1>
      </div>

      <div className={wrong ? 'animate-shake' : ''}>
        <Scene scene={look.scene} id={`look-${look.id}`} className="shadow-md" onItem={tap} ring={shown?._i} />
      </div>

      <div className="mt-3 min-h-[92px] rounded-2xl bg-white px-4 py-3 shadow-sm">
        {mode === 'find' && target && !end && (
          <div className="flex items-center gap-3">
            <span className="flex-1 text-lg font-extrabold text-ink">Find it! <span className="text-ink/40">({hot.length - order.length + 1} of {hot.length})</span></span>
            <Speaker text={target.word.bn} size="lg" label="Hear the word again" />
          </div>
        )}
        {mode === 'find' && end && (
          <div className="text-center">
            <p className="text-3xl">🎉</p>
            <p className="font-extrabold text-primary">You found them all! {score} / {hot.length} on the first go</p>
          </div>
        )}
        {mode === 'explore' && !w && <p className="py-3 text-center font-bold text-ink/50">👆 Tap anything in the picture</p>}
        {mode === 'explore' && w && (
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="font-bangla text-3xl font-extrabold text-primary">{w.bn}</p>
              {romanOn && <p className="text-sm font-bold text-ink/70">{w.roman}</p>}
              <p className="text-sm text-ink/60">{w.en}</p>
            </div>
            <Speaker text={w.bn} size="lg" label="Hear the word" />
          </div>
        )}
        {mode === 'find' && !end && shown && <p className="mt-2 text-sm font-bold text-success">✓ {shown.word.bn} — {shown.word.en}</p>}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        {mode === 'explore' && (
          <button type="button" onClick={startFind} className="btn-primary !py-3" disabled={!seen.size}>
            🔍 Find it game {seen.size ? '' : '(tap a few things first)'}
          </button>
        )}
        {(mode === 'find') && (
          <>
            <button type="button" onClick={startFind} className="btn-secondary !py-3">↺ Play again</button>
            <button type="button" onClick={() => { setMode('explore'); setShown(null); setEnd(false) }} className="rounded-2xl bg-white px-4 py-3 font-extrabold text-primary shadow">👆 Back to exploring</button>
          </>
        )}
      </div>
      <p className="mt-3 text-center text-xs text-ink/40">{seen.size} / {hot.length} things discovered</p>
    </div>
  )
}
