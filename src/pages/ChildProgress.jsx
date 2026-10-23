import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

export default function ChildProgress() {
  const { profile } = useAuth()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    if (!profile?.id) return

    supabase
      .from('progress')
      .select('module, lesson_key, stars_earned, completed')
      .eq('user_id', profile.id)
      .then(({ data }) => {
        if (!active) return
        setRows(data ?? [])
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [profile?.id])

  return (
    <div className="py-6">
      <h1 className="mb-4 text-2xl font-extrabold text-primary">My Progress</h1>

      {loading && <p className="text-ink/50">Loading…</p>}

      {!loading && rows.length === 0 && (
        <div className="card text-center">
          <p className="text-4xl">🌱</p>
          <p className="mt-2 font-bold text-ink/60">
            You haven't started any lessons yet — your progress will show up here!
          </p>
        </div>
      )}

      <div className="space-y-3">
        {rows.map((row) => (
          <div key={`${row.module}-${row.lesson_key}`} className="card flex items-center justify-between">
            <div>
              <p className="font-extrabold capitalize text-ink">{row.lesson_key}</p>
              <p className="text-sm capitalize text-ink/50">{row.module}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-ink">{row.stars_earned} ⭐</span>
              {row.completed && <span className="text-success">✓</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
