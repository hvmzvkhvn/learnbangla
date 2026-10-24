import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { GROUPS, fileFor, studioClips } from '../audio/clips'
import { getManifest, loadManifest, speak, stop as stopNative } from '../audio/audio'
import { allClips, clearClips, deleteClip, getClip, loadVoiceKeys, onVoiceChange, saveClip, setUseMyVoice, useMyVoicePref } from '../audio/voiceStore'
import { encodeClip } from '../audio/encode'

const MAX_SECONDS = 20
const fmtMB = (n) => `${(n / 1048576).toFixed(1)} MB`

export default function Studio() {
  const clips = useMemo(() => studioClips(), [])
  const [have, setHave] = useState(() => new Set())
  const [group, setGroup] = useState('letter')
  const [status, setStatus] = useState('todo') // todo | done | all
  const [query, setQuery] = useState('')
  const [pos, setPos] = useState(0)
  const [phase, setPhase] = useState('idle') // idle | recording | working | review
  const [take, setTake] = useState(null) // { blob, url, ms }
  const [msg, setMsg] = useState('')
  const [level, setLevel] = useState(0)
  const [useMine, setUseMine] = useState(useMyVoicePref)
  const [busy, setBusy] = useState('')
  const rec = useRef(null)
  const stream = useRef(null)
  const timer = useRef(0)
  const raf = useRef(0)
  const player = useRef(null)

  const refresh = useCallback(() => loadVoiceKeys().then((k) => setHave(new Set(k))), [])
  useEffect(() => {
    loadManifest()
    refresh()
    return onVoiceChange(refresh)
  }, [refresh])

  const list = useMemo(
    () =>
      clips.filter(
        (c) =>
          (group === 'all' || c.group === group) &&
          (status === 'all' || (status === 'done') === have.has(c.key)) &&
          (!query || c.key.includes(query) || c.roman.toLowerCase().includes(query.toLowerCase()) || c.en.toLowerCase().includes(query.toLowerCase())),
      ),
    [clips, group, status, have, query],
  )
  const cur = list[Math.min(pos, Math.max(0, list.length - 1))]
  const groupTotal = (g) => clips.filter((c) => g === 'all' || c.group === g).length
  const groupDone = (g) => clips.filter((c) => (g === 'all' || c.group === g) && have.has(c.key)).length

  const cleanup = () => {
    clearTimeout(timer.current)
    cancelAnimationFrame(raf.current)
    stream.current?.getTracks().forEach((t) => t.stop())
    stream.current = null
    setLevel(0)
  }
  useEffect(() => () => {
    cleanup()
    player.current?.pause()
  }, [])
  useEffect(() => {
    // changing clip: drop an unsaved take
    setTake((t) => {
      if (t) URL.revokeObjectURL(t.url)
      return null
    })
    setPhase('idle')
    setMsg('')
  }, [cur?.key])

  const startRec = async () => {
    if (!cur || phase === 'recording' || phase === 'working') return
    stopNative()
    player.current?.pause()
    setMsg('')
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: true } })
      stream.current = s
      const ac = new AudioContext()
      const an = ac.createAnalyser()
      an.fftSize = 512
      ac.createMediaStreamSource(s).connect(an)
      const buf = new Uint8Array(an.fftSize)
      const tick = () => {
        an.getByteTimeDomainData(buf)
        let m = 0
        for (const v of buf) m = Math.max(m, Math.abs(v - 128))
        setLevel(m / 128)
        raf.current = requestAnimationFrame(tick)
      }
      tick()
      const r = new MediaRecorder(s)
      const chunks = []
      r.ondataavailable = (e) => e.data.size && chunks.push(e.data)
      r.onstop = async () => {
        cleanup()
        ac.close()
        setPhase('working')
        try {
          const enc = await encodeClip(new Blob(chunks, { type: r.mimeType }))
          if (!enc) {
            setMsg('That was too quiet — move closer to the microphone and try again.')
            setPhase('idle')
            return
          }
          setTake({ blob: enc.blob, ms: enc.ms, url: URL.createObjectURL(enc.blob) })
          setPhase('review')
        } catch {
          setMsg('Could not read that recording. Try again.')
          setPhase('idle')
        }
      }
      rec.current = r
      r.start()
      setPhase('recording')
      timer.current = setTimeout(() => r.state === 'recording' && r.stop(), MAX_SECONDS * 1000)
    } catch (e) {
      cleanup()
      setPhase('idle')
      setMsg(e?.name === 'NotAllowedError' ? 'Allow the microphone for this page, then try again.' : 'No microphone found.')
    }
  }
  const stopRec = () => rec.current?.state === 'recording' && rec.current.stop()

  const playUrl = (url) => {
    stopNative()
    player.current?.pause()
    const a = new Audio(url)
    player.current = a
    a.play().catch(() => {})
  }
  const playMine = async () => {
    if (take) return playUrl(take.url)
    if (!cur || !have.has(cur.key)) return
    const r = await getClip(cur.key)
    if (r) playUrl(URL.createObjectURL(r.blob))
  }

  const keep = async () => {
    if (!take || !cur) return
    await saveClip(cur.key, take.blob, take.ms)
    URL.revokeObjectURL(take.url)
    setTake(null)
    setPhase('idle')
    setMsg('')
    // move on: the list drops this clip when filtering by "to record", so the next one slides into place
    if (status !== 'todo') setPos((p) => Math.min(p + 1, list.length - 1))
  }
  const remove = async () => cur && (await deleteClip(cur.key))

  // keyboard: Space record/stop · Enter keep · R redo · P play mine · L listen · ←/→ move
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea, select')) return
      if (e.code === 'Space') {
        e.preventDefault()
        phase === 'recording' ? stopRec() : startRec()
      } else if (e.key === 'Enter' && phase === 'review') keep()
      else if (e.key === 'r') startRec()
      else if (e.key === 'p') playMine()
      else if (e.key === 'l' && cur) speak(cur.say, { force: true, skipMine: true })
      else if (e.key === 'ArrowRight') setPos((p) => Math.min(p + 1, list.length - 1))
      else if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const exportZip = async () => {
    setBusy('Packing…')
    try {
      const { zipSync } = await import('fflate')
      const manifest = getManifest()
      const files = {}
      for (const r of await allClips()) files[await fileFor(r.key, manifest)] = new Uint8Array(await r.blob.arrayBuffer())
      const zip = zipSync(files, { level: 0 })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(new Blob([zip], { type: 'application/zip' }))
      a.download = `learnbangla-my-voice-${new Date().toISOString().slice(0, 10)}.zip`
      a.click()
      setBusy(`Saved ${Object.keys(files).length} clips (${fmtMB(zip.length)}).`)
    } catch {
      setBusy('Could not make the zip.')
    }
  }
  const wipe = async () => {
    if (window.confirm('Delete ALL of your recordings from this browser? (A zip you already downloaded is not affected.)')) {
      await clearClips()
      setBusy('')
    }
  }

  const doneAll = groupDone('all')
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Link to="/review" className="text-sm font-bold text-primary">← Review</Link>
      <h1 className="mt-2 text-3xl font-extrabold text-primary">Voice studio</h1>
      <p className="mb-4 max-w-2xl text-ink/70">
        Read each item aloud and it replaces the prototype voice. Keep a quiet room and speak at a steady pace. Your recordings are saved in this browser, play instead of the built-in voice on this device, and can be downloaded
        as a zip that drops straight into <code>public/audio</code>.
      </p>

      <div className="card mb-4 !p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-extrabold text-ink">{doneAll.toLocaleString()} of {clips.length.toLocaleString()} recorded</p>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={exportZip} disabled={!doneAll} className="btn-primary !px-4 !py-2 text-sm disabled:opacity-40">⬇ Download my recordings</button>
            <button type="button" onClick={wipe} disabled={!doneAll} className="rounded-xl px-3 py-2 text-xs font-bold text-error/70 hover:text-error disabled:opacity-30">Delete all</button>
          </div>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-primary/10"><div className="h-full rounded-full bg-success" style={{ width: `${(doneAll / clips.length) * 100}%` }} /></div>
        <label className="mt-3 flex items-center gap-2 text-sm font-bold text-ink/70">
          <input type="checkbox" checked={useMine} onChange={(e) => { setUseMine(e.target.checked); setUseMyVoice(e.target.checked) }} />
          Play my voice in the app on this device
        </label>
        {busy && <p className="mt-2 text-sm font-bold text-ink/60">{busy}</p>}
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {[...GROUPS, { key: 'all', label: 'Everything' }].map((g) => (
          <button key={g.key} type="button" onClick={() => { setGroup(g.key); setPos(0) }} className={`rounded-full px-4 py-2 text-sm font-extrabold ${group === g.key ? 'bg-primary text-white' : 'bg-white text-ink/70 shadow-sm'}`}>
            {g.label} <span className="opacity-60">{groupDone(g.key)}/{groupTotal(g.key)}</span>
          </button>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {[['todo', 'To record'], ['done', 'Recorded'], ['all', 'All']].map(([k, label]) => (
          <button key={k} type="button" onClick={() => { setStatus(k); setPos(0) }} className={`rounded-full px-3 py-1 text-xs font-extrabold ${status === k ? 'bg-ink text-white' : 'bg-white text-ink/60 shadow-sm'}`}>{label}</button>
        ))}
        <input value={query} onChange={(e) => { setQuery(e.target.value); setPos(0) }} placeholder="Search…" className="input-field !w-40 !py-1 text-sm" />
        <span className="text-xs font-bold text-ink/40">{list.length} shown</span>
      </div>

      {cur ? (
        <div className="card text-center">
          <p className="text-xs font-extrabold uppercase tracking-wide text-ink/40">
            {Math.min(pos, list.length - 1) + 1} of {list.length} {cur.slow && ' · say it slowly'} {have.has(cur.key) && ' · ✓ recorded'}
          </p>
          <p className="mt-2 font-bangla text-6xl font-bold leading-snug text-primary" lang="bn">{cur.key}</p>
          {cur.say !== cur.key && <p className="text-xs text-ink/50">(say it as “{cur.say}”)</p>}
          {cur.roman && <p className="mt-1 text-lg font-extrabold text-ink">{cur.roman}</p>}
          {cur.en && <p className="text-ink/60">{cur.en}</p>}

          <div className="mx-auto mt-4 h-2 w-48 overflow-hidden rounded-full bg-primary/10"><div className="h-full rounded-full bg-error transition-[width]" style={{ width: `${Math.min(1, level * 2) * 100}%` }} /></div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button type="button" onClick={() => speak(cur.say, { force: true, skipMine: true })} className="rounded-2xl bg-accent/70 px-4 py-3 font-extrabold text-ink hover:bg-accent">🔊 Prototype <span className="text-xs opacity-60">(L)</span></button>
            {phase === 'recording' ? (
              <button type="button" onClick={stopRec} className="rounded-2xl bg-error px-6 py-3 font-extrabold text-white"><span className="mr-2 inline-block h-3 w-3 animate-pulse rounded-full bg-white align-middle" />Stop <span className="text-xs opacity-70">(Space)</span></button>
            ) : (
              <button type="button" onClick={startRec} disabled={phase === 'working'} className="rounded-2xl bg-primary px-6 py-3 font-extrabold text-white disabled:opacity-50">{phase === 'working' ? 'Processing…' : take || have.has(cur.key) ? '↻ Record again' : '● Record'} <span className="text-xs opacity-70">(Space)</span></button>
            )}
            {(take || have.has(cur.key)) && phase !== 'recording' && <button type="button" onClick={playMine} className="rounded-2xl bg-secondary px-4 py-3 font-extrabold text-white">▶ Mine <span className="text-xs opacity-70">(P)</span></button>}
            {take && <button type="button" onClick={keep} className="rounded-2xl bg-success px-4 py-3 font-extrabold text-white">✓ Keep <span className="text-xs opacity-70">(Enter)</span></button>}
          </div>
          {take && <p className="mt-2 text-xs text-ink/40">{(take.ms / 1000).toFixed(1)} s · {Math.round(take.blob.size / 1024)} KB — silence trimmed, volume levelled</p>}
          {msg && <p className="mt-3 text-sm font-bold text-error">{msg}</p>}

          <div className="mt-5 flex items-center justify-between text-sm font-bold text-ink/50">
            <button type="button" onClick={() => setPos((p) => Math.max(0, p - 1))} disabled={pos === 0}>← Back</button>
            {have.has(cur.key) && <button type="button" onClick={remove} className="text-error/60 hover:text-error">Delete this one</button>}
            <button type="button" onClick={() => setPos((p) => Math.min(p + 1, list.length - 1))}>Skip →</button>
          </div>
        </div>
      ) : (
        <p className="card text-center font-bold text-ink/60">{status === 'todo' ? '🎉 Nothing left to record here.' : 'Nothing matches.'}</p>
      )}
    </div>
  )
}
