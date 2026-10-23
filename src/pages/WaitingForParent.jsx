import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Spinner from '../components/Spinner'

export default function WaitingForParent() {
  const { session, profile, loading, signOut } = useAuth()

  if (loading) {
    return <Spinner />
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  if (profile?.status === 'active') {
    return <Navigate to={profile.role === 'child' ? '/child' : '/parent'} replace />
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="mb-6 text-7xl">⭐</div>
      <h1 className="mb-3 text-2xl font-extrabold text-primary">
        We've emailed your parent!
      </h1>
      <p className="max-w-sm text-lg text-ink/70">
        Ask them to check their inbox so you can start learning.
      </p>
      <button onClick={signOut} className="mt-10 text-sm font-bold text-ink/40 hover:text-ink/60">
        Log out
      </button>
    </div>
  )
}
