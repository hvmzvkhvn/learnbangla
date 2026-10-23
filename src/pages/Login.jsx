import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'
import Spinner from '../components/Spinner'

export default function Login() {
  const { session, profile, loading: authLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (authLoading) {
    return <Spinner />
  }

  if (session && profile) {
    if (profile.status === 'locked') return <Navigate to="/waiting" replace />
    if (profile.role === 'parent' || profile.role === 'teacher') return <Navigate to="/parent" replace />
    return <Navigate to="/child" replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError("Oops, that didn't work — try again!")
      setSubmitting(false)
    }
    // On success, AuthContext picks up the new session and this component re-renders into a redirect.
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mb-2 text-5xl">⭐</div>
          <h1 className="text-3xl font-extrabold text-primary">Learn Bangla</h1>
          <p className="mt-1 text-ink/60">Log in to keep learning</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4">
          {error && <p className="gentle-error">{error}</p>}

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-bold text-ink/70">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-bold text-ink/70">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink/60">
          New here?{' '}
          <Link to="/signup/child" className="font-bold text-primary hover:underline">
            Sign up to learn Bangla
          </Link>
        </p>
      </div>
    </div>
  )
}
