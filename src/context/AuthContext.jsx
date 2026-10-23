import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (userId) => {
    if (!userId) {
      setProfile(null)
      return
    }
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
    setProfile(data ?? null)
  }, [])

  const refreshProfile = useCallback(async () => {
    if (session?.user?.id) {
      await loadProfile(session.user.id)
    }
  }, [session?.user?.id, loadProfile])

  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      if (!active) return
      setSession(initialSession)
      await loadProfile(initialSession?.user?.id)
      if (active) setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession)
      await loadProfile(newSession?.user?.id)
      setLoading(false)
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [loadProfile])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setProfile(null)
  }, [])

  const value = {
    session,
    user: session?.user ?? null,
    profile,
    loading,
    signOut,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (ctx === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
