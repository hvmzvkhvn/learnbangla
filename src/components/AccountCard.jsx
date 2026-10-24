import { Link } from 'react-router-dom'
import { accountsEnabled } from '../lib/supabaseClient'
import { useSync } from '../sync/engine'

/** On the profile page: a way into accounts, and a glance at whether progress is being saved. */
export default function AccountCard() {
  const sync = useSync()
  if (!accountsEnabled) return null
  const signedIn = Boolean(sync.email)
  return (
    <Link to="/account" className="card mt-8 flex items-center gap-4 !p-5 transition active:scale-95 hover:brightness-105">
      <span className="text-4xl">{signedIn ? '☁️' : '👪'}</span>
      <span className="flex-1">
        <span className="block text-lg font-extrabold text-ink">{signedIn ? 'Your account' : 'Parent account'}</span>
        <span className="block text-sm text-ink/60">
          {!signedIn && 'Keep progress on every device and see how your child is doing.'}
          {signedIn && sync.learnerId && sync.status === 'ok' && '✓ Progress is saved to the account.'}
          {signedIn && sync.learnerId && sync.status === 'syncing' && 'Saving…'}
          {signedIn && sync.learnerId && sync.status === 'offline' && 'Offline — will save when you are back.'}
          {signedIn && sync.learnerId && sync.status === 'error' && 'Could not save just now.'}
          {signedIn && sync.learnerId && sync.status === 'idle' && 'Ready.'}
          {signedIn && !sync.learnerId && 'Choose who is learning on this device.'}
        </span>
      </span>
      <span className="text-2xl text-primary">›</span>
    </Link>
  )
}
