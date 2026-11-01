import { Link } from 'react-router-dom'
import { useSync, push } from '../sync/engine'
import { storageIsTemporary, useProgress } from '../state/persist'
export default function SaveStatus() {
  const sync = useSync()
  const { progress } = useProgress()
  const temporary = storageIsTemporary()
  return (
    <div className="my-3 rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm" role="status">
      {temporary
        ? 'Storage is full or blocked. Progress is temporary—copy a backup before closing.'
        : sync.learnerId
          ? sync.status === 'ok'
            ? '✓ Saved to your account and this device.'
            : sync.status === 'syncing'
              ? 'Saving to your account…'
              : 'Saved on this device. Cloud saving needs attention.'
          : '✓ Saved on this device only. Clearing browser data removes your progress.'}
      {Object.keys(progress).length > 0 && (
        <Link to="/me#backup" className="ml-2 font-bold underline">
          Back up progress
        </Link>
      )}
      {sync.learnerId && ['error', 'offline'].includes(sync.status) && (
        <button className="ml-2 underline" onClick={() => push().catch(() => {})}>
          Retry save
        </button>
      )}
    </div>
  )
}
