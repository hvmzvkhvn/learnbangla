import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { stories } from '../data/stories'
import { allLessons } from '../curriculum/tracks'
import { shuffle } from '../curriculum/text'
import { useProgress, useTrack } from '../state/persist'
import { useGame } from '../state/game'
import { speak, stop, useSoundOn } from '../audio/audio'
import Speaker from '../components/Speaker'
import SoundToggle from '../components/SoundToggle'
import Confetti from '../components/Confetti'
import Toasts from '../components/Toasts'

// window.__lbFast is a test hook that collapses the typing delays
const sleep = (ms) => new Promise((r) => setTimeout(r, typeof window !== 'undefined' && window.__lbFast ? 15 : ms))
const clamp = (n) => Math.max(0, Math.min(100, n))
const STARS = { great: 3, ok: 2, rough: 1 }

export default function Story() {
  const { storyId } = useParams()
  const story = stories.find((s) => s.id === storyId)
  if (!story) return <Navigate to="/stories" replace />
  return <Player key={storyId} story={story} />
}

function Player({ story }) {
  const navigate = useNavigate()
  const [trackKey] = useTrack()
  const { complete } = useProgress()
  const { game, act } = useGame()
  const [soundOn] = useSoundOn()
  const [log, setLog] = useState([])
  const [typing, setTyping] = useState(null)
  const [options, setOptions] = useState(null)
  const [meter, setMeter] = useState(story.meter.start)
  const [delta, setDelta] = useState(null)
  const [ending, setEnding] = useState(null)
  const [showEn, setShowEn] = useState(true)
  const run = useRef(0)
  const meterRef = useRef(story.meter.start)
  const bottom = useRef(null)
  const lessonId = allLessons(trackKey ?? 'teen').find((l) => l.storyId === story.id)?.id

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [log, typing, options, ending])

  async function go(nodeId, id) {
    while (nodeId && run.current === id) {
      const n = story.nodes[nodeId]
      if (n.sys) {
        setLog((l) => (l.some((x) => x.key === nodeId) ? l : [...l, { key: nodeId, kind: 'sys', en: n.sys }]))
        await sleep(900)
        nodeId = n.next
      } else if (n.bn) {
        setTyping(n.who)
        await sleep(650)
        if (run.current !== id) return
        setTyping(null)
        setLog((l) => (l.some((x) => x.key === nodeId) ? l : [...l, { key: nodeId, kind: 'npc', who: n.who, bn: n.bn, roman: n.roman, en: n.en }]))
        const t = Date.now()
        if (soundOn) await speak(n.bn)
        await sleep(Math.max(250, 700 - (Date.now() - t)))
        nodeId = n.next
      } else if (n.choice) {
        await sleep(200)
        if (run.current !== id) return
        setOptions(shuffle(n.choice))
        return
      } else if (n.branch) {
        const m = meterRef.current
        nodeId = n.branch.find((r) => r.min === undefined || m >= r.min).next
      } else if (n.end) {
        finish(nodeId, n.end)
        return
      }
    }
  }

  function finish(nodeId, end) {
    const stars = STARS[end.tier]
    setEnding({ ...end, nodeId, stars })
    if (lessonId) complete(lessonId, stars)
    const first = !game.stats.storyDone?.[story.id]
    act({
      xp: 40 + { great: 40, ok: 20, rough: 0 }[end.tier] + (first ? 20 : 0),
      stats: (s) => ({
        stories: s.stories + (first ? 1 : 0),
        storyDone: { ...s.storyDone, [story.id]: true },
        greatEndings: s.greatEndings + (end.tier === 'great' ? 1 : 0),
        endings: { ...s.endings, [`${story.id}:${nodeId}`]: true },
      }),
    })
  }

  useEffect(() => {
    const id = ++run.current
    go(story.start, id)
    return () => {
      run.current++
      stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function choose(opt, i) {
    const id = ++run.current
    setOptions(null)
    setLog((l) => [...l, { key: `you-${l.length}`, kind: 'you', bn: opt.bn, roman: opt.roman, en: opt.en }])
    const m = clamp(meterRef.current + opt.meter)
    meterRef.current = m
    setMeter(m)
    setDelta({ id: Math.random(), v: opt.meter })
    navigator.vibrate?.(opt.meter < 0 ? 80 : 20)
    if (soundOn) await speak(opt.bn)
    await sleep(350)
    go(opt.next, id)
  }

  function replay() {
    run.current++
    stop()
    meterRef.current = story.meter.start
    setMeter(story.meter.start)
    setLog([])
    setEnding(null)
    setOptions(null)
    const id = ++run.current
    go(story.start, id)
  }

  const avatar = (who) => story.cast[who]?.emoji ?? '🧑'
  const name = (who) => story.cast[who]?.en ?? ''
  const keyLines = (story.keys ?? []).map((k) => story.nodes[k]).filter((n) => n?.bn)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Toasts />
      {ending && ending.stars >= 2 && <Confetti />}
      <header className="sticky top-0 z-10 border-b border-primary/10 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-xl items-center gap-3 px-4 py-3">
          <button type="button" onClick={() => navigate('/stories')} aria-label="Leave story" className="rounded-full bg-white px-3 py-2 text-lg font-extrabold text-ink/50 shadow">
            ✕
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate font-extrabold text-ink">
              {story.emoji} {story.title}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs font-extrabold text-ink/50">
                {story.meter.emoji} {story.meter.label}
              </span>
              <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-primary/10">
                <div className={`h-full rounded-full transition-all duration-500 ${meter < 35 ? 'bg-error' : meter < 65 ? 'bg-secondary' : 'bg-success'}`} style={{ width: `${meter}%` }} />
              </div>
              <span className="relative w-8 text-right text-xs font-extrabold text-ink/60">
                {meter}
                {delta && (
                  <span key={delta.id} className={`animate-floatUp absolute -top-3 right-0 text-xs font-extrabold ${delta.v >= 0 ? 'text-success' : 'text-error'}`}>
                    {delta.v >= 0 ? `+${delta.v}` : delta.v}
                  </span>
                )}
              </span>
            </div>
          </div>
          <button type="button" onClick={() => setShowEn((v) => !v)} className={`rounded-full px-3 py-2 text-xs font-extrabold shadow-sm ${showEn ? 'bg-white text-primary' : 'bg-ink/10 text-ink/50'}`}>
            EN
          </button>
          <SoundToggle />
        </div>
      </header>

      <main className="mx-auto w-full max-w-xl flex-1 space-y-3 px-4 py-4 pb-44">
        {log.map((m) =>
          m.kind === 'sys' ? (
            <p key={m.key} className="animate-slideIn mx-auto max-w-sm rounded-2xl bg-ink/5 px-4 py-2 text-center text-sm font-semibold italic text-ink/60">
              {m.en}
            </p>
          ) : (
            <div key={m.key} className={`animate-slideIn flex items-end gap-2 ${m.kind === 'you' ? 'flex-row-reverse' : ''}`}>
              {m.kind === 'npc' && (
                <div className="flex w-12 shrink-0 flex-col items-center text-center">
                  <span className="text-3xl">{avatar(m.who)}</span>
                  <span className="text-[10px] font-extrabold leading-tight text-ink/50">{name(m.who)}</span>
                </div>
              )}
              <div className={`max-w-[82%] rounded-3xl px-4 py-3 shadow-sm ${m.kind === 'you' ? 'rounded-br-md bg-primary text-white' : 'rounded-bl-md bg-white'}`}>
                <p className={`font-bangla text-xl font-bold leading-snug ${m.kind === 'you' ? 'text-white' : 'text-primary'}`}>{m.bn}</p>
                <p className={`text-xs font-bold ${m.kind === 'you' ? 'text-white/80' : 'text-ink/60'}`}>{m.roman}</p>
                {showEn && <p className={`text-xs ${m.kind === 'you' ? 'text-white/70' : 'text-ink/50'}`}>{m.en}</p>}
              </div>
              <button type="button" onClick={() => speak(m.bn, { force: true })} aria-label="Hear it" className="mb-1 rounded-full bg-accent/60 px-2 py-1 text-sm">
                🔊
              </button>
            </div>
          ),
        )}

        {typing && (
          <div className="flex items-end gap-2">
            <div className="flex w-12 shrink-0 flex-col items-center">
              <span className="text-3xl">{avatar(typing)}</span>
            </div>
            <div className="flex gap-1 rounded-3xl rounded-bl-md bg-white px-4 py-4 shadow-sm">
              {[0, 1, 2].map((d) => (
                <span key={d} className="animate-blink h-2 w-2 rounded-full bg-ink/40" style={{ animationDelay: `${d * 0.2}s` }} />
              ))}
            </div>
          </div>
        )}

        {ending && (
          <div className="animate-pop card mt-4 text-center">
            <p className="text-6xl">{ending.emoji}</p>
            <p className="mt-1 text-sm font-extrabold uppercase tracking-wide text-ink/40">Ending</p>
            <h2 className="text-2xl font-extrabold text-primary">{ending.title}</h2>
            <p className="mt-2 text-ink/70">{ending.en}</p>
            <p className="mt-3 text-lg">{'⭐'.repeat(ending.stars)}</p>
            <p className="text-xs font-bold text-ink/50">
              {story.meter.emoji} {story.meter.label}: {meter}/100
            </p>
            <div className="mt-5 rounded-2xl bg-background p-3 text-left">
              <p className="mb-2 text-xs font-extrabold uppercase tracking-wide text-ink/40">Phrases to remember</p>
              <div className="space-y-2">
                {keyLines.map((n, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-bangla text-lg font-bold leading-snug text-primary">{n.bn}</p>
                      <p className="text-xs text-ink/50">
                        {n.roman} · {n.en}
                      </p>
                    </div>
                    <Speaker text={n.bn} size="sm" />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <button type="button" onClick={replay} className="btn-primary">
                ↻ Play again — try a different ending
              </button>
              <Link to="/stories" className="btn-secondary">
                More stories
              </Link>
            </div>
          </div>
        )}
        <div ref={bottom} />
      </main>

      {options && (
        <div className="animate-slideIn fixed inset-x-0 bottom-0 z-20 border-t border-primary/10 bg-white/95 px-4 pb-5 pt-3 backdrop-blur">
          <div className="mx-auto max-w-xl space-y-2">
            <p className="text-center text-xs font-extrabold uppercase tracking-wide text-ink/40">Your reply</p>
            {options.map((o, i) => (
              <div key={i} className="flex items-stretch gap-2">
                <button type="button" onClick={() => choose(o, i)} className="flex-1 rounded-2xl border-4 border-primary/15 bg-white px-4 py-3 text-left shadow-sm transition active:scale-[0.98] hover:border-primary/50">
                  <span className="block font-bangla text-lg font-bold leading-snug text-primary">{o.bn}</span>
                  <span className="block text-xs font-bold text-ink/60">{o.roman}</span>
                  {showEn && <span className="block text-xs text-ink/50">{o.en}</span>}
                </button>
                <Speaker text={o.bn} size="md" className="self-center" label="Hear this reply" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
