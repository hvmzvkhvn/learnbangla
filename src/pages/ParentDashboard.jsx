import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { useStarTotal } from '../hooks/useStarTotal'
import Spinner from '../components/Spinner'

function ChildCard({ child, onChildUpdated }) {
  const { stars, loading: starsLoading } = useStarTotal(child.id)
  const [progress, setProgress] = useState([])
  const [nameDraft, setNameDraft] = useState(child.name)
  const [editingName, setEditingName] = useState(false)
  const [savingName, setSavingName] = useState(false)
  const [resetMessage, setResetMessage] = useState('')
  const [resetting, setResetting] = useState(false)

  useEffect(() => {
    let active = true
    supabase
      .from('progress')
      .select('module, lesson_key, stars_earned, completed')
      .eq('user_id', child.id)
      .then(({ data }) => {
        if (active) setProgress(data ?? [])
      })
    return () => {
      active = false
    }
  }, [child.id])

  const modulesStarted = new Set(progress.map((row) => row.module)).size
  const completedLessons = progress.filter((row) => row.completed)

  async function saveName(event) {
    event.preventDefault()
    if (!nameDraft.trim()) return
    setSavingName(true)
    const { error } = await supabase.from('profiles').update({ name: nameDraft.trim() }).eq('id', child.id)
    setSavingName(false)
    if (!error) {
      setEditingName(false)
      onChildUpdated({ ...child, name: nameDraft.trim() })
    }
  }

  async function sendPasswordReset() {
    setResetting(true)
    setResetMessage('')
    const { error } = await supabase.auth.resetPasswordForEmail(child.email, {
      redirectTo: `${window.location.origin}/login`,
    })
    setResetting(false)
    setResetMessage(error ? "Oops, that didn't work — try again!" : `Password reset email sent to ${child.email}.`)
  }

  return (
    <div className="card space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-4xl">⭐</span>
          {editingName ? (
            <form onSubmit={saveName} className="flex items-center gap-2">
              <input
                className="input-field !w-40 !py-2"
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                autoFocus
              />
              <button type="submit" disabled={savingName} className="text-sm font-bold text-primary">
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingName(false)
                  setNameDraft(child.name)
                }}
                className="text-sm font-bold text-ink/40"
              >
                Cancel
              </button>
            </form>
          ) : (
            <div>
              <h2 className="text-xl font-extrabold text-ink">{child.name}</h2>
              <button
                type="button"
                onClick={() => setEditingName(true)}
                className="text-xs font-bold text-primary hover:underline"
              >
                Change name
              </button>
            </div>
          )}
        </div>
        <div className="rounded-full bg-accent px-4 py-2 font-extrabold text-ink">
          {starsLoading ? '…' : stars} ⭐
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="rounded-2xl bg-primary/5 py-3">
          <p className="text-2xl font-extrabold text-primary">{modulesStarted}</p>
          <p className="text-xs font-bold text-ink/50">Modules Started</p>
        </div>
        <div className="rounded-2xl bg-success/10 py-3">
          <p className="text-2xl font-extrabold text-success">{completedLessons.length}</p>
          <p className="text-xs font-bold text-ink/50">Lessons Completed</p>
        </div>
      </div>

      {completedLessons.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-bold text-ink/50">Completed lessons</p>
          <ul className="flex flex-wrap gap-2">
            {completedLessons.map((row) => (
              <li
                key={`${row.module}-${row.lesson_key}`}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold capitalize text-primary"
              >
                {row.lesson_key}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-t border-primary/10 pt-4">
        <button
          type="button"
          onClick={sendPasswordReset}
          disabled={resetting}
          className="text-sm font-bold text-primary hover:underline"
        >
          {resetting ? 'Sending…' : "Reset child's password"}
        </button>
        {resetMessage && <p className="mt-2 text-xs text-ink/50">{resetMessage}</p>}
      </div>
    </div>
  )
}

export default function ParentDashboard() {
  const { profile } = useAuth()
  const [children, setChildren] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    if (!profile?.id) return

    supabase
      .from('profiles')
      .select('id, name, email')
      .eq('parent_id', profile.id)
      .eq('role', 'child')
      .then(({ data }) => {
        if (!active) return
        setChildren(data ?? [])
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [profile?.id])

  function handleChildUpdated(updated) {
    setChildren((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
  }

  return (
    <div className="min-h-screen bg-background px-5 py-6">
      <div className="mx-auto max-w-md">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-ink/50">Welcome,</p>
            <h1 className="text-2xl font-extrabold text-primary">{profile?.name}</h1>
          </div>
        </header>

        {loading && <Spinner />}

        {!loading && children.length === 0 && (
          <div className="card text-center">
            <p className="text-4xl">👀</p>
            <p className="mt-2 font-bold text-ink/60">No children linked to your account yet.</p>
          </div>
        )}

        <div className="space-y-4">
          {children.map((child) => (
            <ChildCard key={child.id} child={child} onChildUpdated={handleChildUpdated} />
          ))}
        </div>
      </div>
    </div>
  )
}
