import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const initialForm = { name: '', email: '', password: '' }

export default function ActivateParent() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function updateField(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    const { data, error: fnError } = await supabase.functions.invoke('activate-parent', {
      body: { token, ...form },
    })

    if (fnError || data?.error) {
      setError(data?.error || "Oops, that didn't work — try again!")
      setSubmitting(false)
      return
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (signInError) {
      setError('Your account was created! Please log in to continue.')
      setSubmitting(false)
      return
    }

    navigate('/parent', { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mb-2 text-5xl">⭐</div>
          <h1 className="text-3xl font-extrabold text-primary">Activate Your Child's Account</h1>
          <p className="mt-1 text-ink/60">Create your parent account to get started.</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4">
          {error && <p className="gentle-error">{error}</p>}

          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-bold text-ink/70">
              Your name
            </label>
            <input
              id="name"
              type="text"
              required
              className="input-field"
              value={form.name}
              onChange={updateField('name')}
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-bold text-ink/70">
              Your email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              className="input-field"
              value={form.email}
              onChange={updateField('email')}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-bold text-ink/70">
              Create a password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              className="input-field"
              value={form.password}
              onChange={updateField('password')}
            />
          </div>

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? 'Activating…' : 'Create Account & Activate'}
          </button>
        </form>
      </div>
    </div>
  )
}
