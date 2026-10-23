import { useAuth } from '../context/AuthContext'

const MODULES = [
  { key: 'alphabet', label: 'Learn the Alphabet', emoji: '🔤' },
  { key: 'words', label: 'Learn Words', emoji: '📚' },
]

export default function ChildDashboard() {
  const { profile } = useAuth()

  return (
    <div className="py-6">
      <div className="card mb-6 flex items-center gap-4">
        <span className="text-5xl">⭐</span>
        <div>
          <p className="text-sm font-bold text-ink/50">Welcome back,</p>
          <h1 className="text-2xl font-extrabold text-primary">{profile?.name ?? 'friend'}!</h1>
        </div>
      </div>

      <div className="space-y-4">
        {MODULES.map((mod) => (
          <button
            key={mod.key}
            type="button"
            disabled
            className="flex w-full items-center justify-between rounded-3xl bg-white px-6 py-6 text-left shadow-md opacity-70"
          >
            <span className="flex items-center gap-3">
              <span className="text-3xl">{mod.emoji}</span>
              <span className="text-xl font-extrabold text-ink">{mod.label}</span>
            </span>
            <span className="text-2xl" aria-label="Locked">
              🔒
            </span>
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-ink/50">
        New lessons are coming soon — check back later!
      </p>
    </div>
  )
}
