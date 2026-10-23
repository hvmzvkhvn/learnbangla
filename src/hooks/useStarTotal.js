import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

/** Sums stars_earned across all progress rows for a given user. */
export function useStarTotal(userId) {
  const [stars, setStars] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    if (!userId) {
      setStars(0)
      setLoading(false)
      return () => {
        active = false
      }
    }

    setLoading(true)

    supabase
      .from('progress')
      .select('stars_earned')
      .eq('user_id', userId)
      .then(({ data, error }) => {
        if (!active) return
        const total = error ? 0 : (data ?? []).reduce((sum, row) => sum + (row.stars_earned ?? 0), 0)
        setStars(total)
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [userId])

  return { stars, loading }
}
