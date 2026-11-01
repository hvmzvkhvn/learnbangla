import { useEffect, useRef, useState } from 'react'
import { audioStatus, clearAudioOffline, offlineSupported, saveAudioOffline, useInstall } from '../pwa'
import { useProgress, useTrack } from '../state/persist'
import { tracks } from '../curriculum/tracks'
import { bank } from '../curriculum/bank'
import { norm } from '../audio/norm'
function textKeys(unit) {
  const keys = new Set()
  for (const l of unit?.lessons ?? [])
    for (const id of [...(l.learn ?? []), ...(l.practice ?? []), ...(l.reviewOf ?? []), ...(l.superIds ?? [])]) {
      const item = bank.get(id)
      if (!item) continue
      for (const text of [item.bn, item.example?.bn, ...(item.tokens ?? [])]) if (text) keys.add(norm(text))
    }
  return [...keys]
}
export default function OfflineCard() {
  const install = useInstall()
  const [trackKey] = useTrack()
  const { progress } = useProgress()
  const track = tracks[trackKey]
  const [status, setStatus] = useState(null),
    [prog, setProg] = useState(null),
    [note, setNote] = useState(''),
    [selection, setSelection] = useState('next')
  const abort = useRef(null)
  const ok = offlineSupported()
  useEffect(() => {
    if (ok)
      audioStatus()
        .then(setStatus)
        .catch(() => setNote('Connect to the internet once to load the audio list.'))
    return () => abort.current?.abort()
  }, [ok])
  const unit = track?.units.find((u) => u.lessons.some((l) => !progress[l.id])) ?? track?.units[0]
  const keys =
    selection === 'all'
      ? null
      : selection === 'track'
        ? track?.units.flatMap(textKeys)
        : textKeys(track?.units.find((u) => u.id === selection) ?? unit)
  const start = async () => {
    setNote('')
    abort.current = new AbortController()
    setProg({ done: 0, total: 1 })
    try {
      const r = await saveAudioOffline((done, total) => setProg({ done, total }), abort.current.signal, keys)
      setStatus(await audioStatus())
      setNote(
        r.aborted
          ? 'Stopped. Downloaded clips are kept.'
          : r.failed
            ? `${r.failed} clips failed. Retry when connected.`
            : 'Your selected audio is ready offline.',
      )
    } catch (e) {
      setNote('Download could not finish. Check your connection and available storage. ' + e.message)
    } finally {
      setProg(null)
    }
  }
  return (
    <section className="mt-4">
      <h2 className="text-xl font-bold">Use it like an app</h2>
      {!install.installed &&
        (install.canPrompt ? (
          <button onClick={install.prompt} className="btn-primary mt-3">
            Install Learn Bangla
          </button>
        ) : (
          <p className="my-2">
            {install.ios
              ? 'On iPhone or iPad: Share → Add to Home Screen.'
              : 'Use your browser’s Install app or Add to Home screen option.'}
          </p>
        ))}
      {install.installed && <p>✓ Installed</p>}
      {ok && (
        <div className="mt-4">
          <h3 className="font-bold">Offline audio</h3>
          <p className="my-2">
            {status ? `${status.saved.toLocaleString()} of ${status.total.toLocaleString()} clips saved.` : 'Loading audio list…'} Download
            only what you need; sizes vary by clip.
          </p>
          <label className="block">
            Choose audio
            <select className="input-field mt-2" value={selection} onChange={(e) => setSelection(e.target.value)} disabled={Boolean(prog)}>
              <option value="next">My next unit{unit ? `: ${unit.title}` : ''}</option>
              <option value="track">My whole age track</option>
              {track?.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.title}
                </option>
              ))}
              <option value="all">Everything (all age tracks)</option>
            </select>
          </label>
          {prog ? (
            <div className="mt-3">
              <progress aria-label="Audio download" max={prog.total} value={prog.done} />
              <p role="status">
                {prog.done} / {prog.total}
              </p>
              <button onClick={() => abort.current?.abort()} className="underline">
                Stop download
              </button>
            </div>
          ) : (
            <div className="mt-3 flex flex-wrap gap-3">
              <button onClick={start} disabled={!status || (!track && selection !== 'all')} className="btn-secondary">
                Download selected audio
              </button>
              {status?.saved > 0 && (
                <button
                  className="underline"
                  onClick={async () => {
                    try {
                      await clearAudioOffline()
                      setStatus(await audioStatus())
                      setNote('Offline audio removed.')
                    } catch {
                      setNote('Could not remove downloaded audio.')
                    }
                  }}
                >
                  Remove downloaded audio
                </button>
              )}
            </div>
          )}
        </div>
      )}
      <p role="status" className="mt-2 text-sm">
        {note}
      </p>
    </section>
  )
}
