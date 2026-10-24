// The Supabase client for accounts. Loaded on demand, so people who never sign in never download it,
// and the whole account feature simply switches off if the project's keys are not configured.
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// Accounts are switched on in development, and in production only when the site is built with VITE_ACCOUNTS=on.
export const accountsEnabled = Boolean(url && key && (import.meta.env.DEV || import.meta.env.VITE_ACCOUNTS === 'on'))
export const AUTH_STORAGE_KEY = 'lb.auth'

let client = null
export function getSupabase() {
  if (!accountsEnabled) return Promise.resolve(null)
  if (import.meta.env.DEV && window.__lbSupabase) return Promise.resolve(window.__lbSupabase) // a fake, for tests
  client ??= import('@supabase/supabase-js').then(({ createClient }) =>
    createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false, storageKey: AUTH_STORAGE_KEY } }),
  )
  return client
}

/** True if this browser has been signed in before (so the SDK is worth loading at startup). */
export const hasStoredSession = () => {
  try {
    return localStorage.getItem(AUTH_STORAGE_KEY) !== null
  } catch {
    return false
  }
}
