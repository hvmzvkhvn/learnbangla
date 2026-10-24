import { useEffect, useRef, useState } from 'react'
import { audioStatus, clearAudioOffline, offlineSupported, saveAudioOffline, useInstall } from '../pwa'

/** Install the app and save the audio so it works without internet. */
export default function OfflineCard() {
  const install = useInstall()
  const [status, setStatus] = useState(null) // { saved, total }
  const [prog, setProg] = useState(null) // { done, total } while downloading
  const [note, setNote] = useState('')
  const abort = useRef(null)
  const ok = offlineSupported()

  useEffect(() => {
    if (ok) audioStatus().then(setStatus).catch(() => {})
  }, [ok])

  if (!ok && install.installed) return null

  const start = async () => {
    setNote('')
    abort.current = new AbortController()
    setProg({ done: 0, total: status?.total ?? 1 })
    const r = await saveAudioOffline((done, total) => setProg({ done, total }), abort.current.signal)
    setProg(null)
    setStatus(await audioStatus())
    setNote(r.aborted ? 'Stopped — what is saved stays saved.' : r.failed ? `${r.failed} clips could not be saved. Try again on a better connection.` : 'All saved — it works without internet now.')
  }
  const remove = async () => {
    await clearAudioOffline()
    setStatus(await audioStatus())
    setNote('Removed the saved audio.')
  }
  const mb = status ? Math.round((status.total * 15) / 1024) : 50
  const complete = status && status.saved >= status.total

  return (
    <div className="card mt-8 !p-5">
      <h2 className="text-xl font-extrabold text-ink">Use it like an app</h2>

      {!install.installed && (
        <div className="mt-2">
          {install.canPrompt ? (
            <button type="button" onClick={install.prompt} className="btn-primary w-full !py-3">Install Learn Bangla</button>
          ) : install.ios ? (
            <p className="text-sm text-ink/70">On iPhone or iPad: tap the <b>Share</b> button, then <b>Add to Home Screen</b>.</p>
          ) : (
            <p className="text-sm text-ink/70">In your browser's menu, choose <b>Install app</b> (or <b>Add to Home screen</b>) to open it like an app.</p>
          )}
        </div>
      )}
      {install.installed && <p className="mt-2 text-sm font-bold text-success">✓ Installed on this device</p>}

      {ok && status && (
        <div className="mt-4 border-t border-primary/10 pt-4">
          <p className="font-extrabold text-ink">Offline audio</p>
          <p className="text-sm text-ink/60">
            {complete ? `All ${status.total.toLocaleString()} clips are saved on this device.` : `${status.saved.toLocaleString()} of ${status.total.toLocaleString()} clips saved. Saving them all takes about ${mb} MB — best on Wi-Fi.`}
          </p>
          {prog ? (
            <div className="mt-3">
              <div className="h-3 overflow-hidden rounded-full bg-primary/10"><div className="h-full rounded-full bg-success transition-all" style={{ width: `${(prog.done / prog.total) * 100}%` }} /></div>
              <p className="mt-1 text-xs font-bold text-ink/50">{prog.done.toLocaleString()} / {prog.total.toLocaleString()}</p>
              <button type="button" onClick={() => abort.current?.abort()} className="mt-2 text-sm font-bold text-ink/50">Stop</button>
            </div>
          ) : (
            <div className="mt-3 flex flex-wrap gap-2">
              {!complete && <button type="button" onClick={start} className="btn-secondary !px-5 !py-3 text-base">Save audio for offline</button>}
              {status.saved > 0 && <button type="button" onClick={remove} className="rounded-2xl px-4 py-3 text-sm font-bold text-ink/50 hover:text-ink/70">Remove saved audio</button>}
            </div>
          )}
          {note && <p className="mt-2 text-sm font-bold text-ink/60">{note}</p>}
        </div>
      )}
    </div>
  )
}
