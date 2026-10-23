import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

/**
 * Checks whether the current user has unlocked a given piece of content.
 * Used to gate Phase 2+ modules behind entries in the `unlocks` table.
 */
export function useUnlock(contentKey) {
  const { profile } = useAuth()
  const [unlocked, setUnlocked] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    if (!profile?.id || !contentKey) {
      setUnlocked(false)
      setLoading(false)
      return () => {
        active = false
      }
    }

    setLoading(true)

    supabase
      .from('unlocks')
      .select('id')
      .eq('user_id', profile.id)
      .eq('content_key', contentKey)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return
        setUnlocked(Boolean(data) && !error)
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [profile?.id, contentKey])

  return { unlocked, loading }
}
