import { useAuth } from '../context/AuthContext'

export default function ChildSettings() {
  const { profile, signOut } = useAuth()

  return (
    <div className="py-6">
      <h1 className="mb-4 text-2xl font-extrabold text-primary">Settings</h1>

      <div className="card mb-4 space-y-3">
        <div>
          <p className="text-sm font-bold text-ink/50">Name</p>
          <p className="text-lg font-bold text-ink">{profile?.name}</p>
        </div>
        <div>
          <p className="text-sm font-bold text-ink/50">Email</p>
          <p className="text-lg font-bold text-ink">{profile?.email}</p>
        </div>
      </div>

      <button onClick={signOut} className="btn-secondary w-full">
        Log Out
      </button>
    </div>
  )
}
