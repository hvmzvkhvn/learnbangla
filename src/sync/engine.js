// Keeps a learner's progress in step with their account. Everything stays usable offline: progress is always saved
// on the device first, and this quietly copies it to the account (and merges anything newer from other devices).
import { useSyncExternalStore } from 'react'
import { AUTH_STORAGE_KEY, accountsEnabled, getSupabase, hasStoredSession } from '../lib/supabaseClient'
import { onPersistentWrite, updatePersistent } from '../state/persist'
import { mergeState, sameState } from './merge'

const LOCAL = { track: 'lb.track', progress: 'lb.progress', game: 'lb.game', srs: 'lb.srs' }
const LEARNER_KEY = 'lb.learner'
const WATCHED = new Set(Object.values(LOCAL))

const read = (k) => {
  try {
    const v = localStorage.getItem(k)
    return v === null ? undefined : JSON.parse(v)
  } catch {
    return undefined
  }
}
const readStr = (k) => {
  try {
    return localStorage.getItem(k)
  } catch {
    return null
  }
}
export const readLocal = () => Object.fromEntries(Object.entries(LOCAL).map(([n, k]) => [n, read(k)]).filter(([, v]) => v !== undefined))
export const hasLocalProgress = () => Object.keys(read(LOCAL.progress) ?? {}).length > 0 || (read(LOCAL.game)?.xp ?? 0) > 0

let applying = false
function writeLocal(s) {
  applying = true
  try {
    for (const [n, k] of Object.entries(LOCAL)) {
      if (s[n] === undefined) continue
      if (JSON.stringify(read(k)) !== JSON.stringify(s[n])) updatePersistent(k, null, () => s[n])
    }
  } finally {
    applying = false
  }
}

// ---- a tiny observable store for the UI --------------------------------------------------------------------------
let store = { status: accountsEnabled ? 'idle' : 'off', ready: !accountsEnabled || !hasStoredSession(), email: null, learnerId: readStr(LEARNER_KEY), at: null, error: '' }
const listeners = new Set()
const set = (patch) => {
  store = { ...store, ...patch }
  listeners.forEach((f) => f())
}
const subscribe = (f) => {
  listeners.add(f)
  return () => listeners.delete(f)
}
export const useSync = () => useSyncExternalStore(subscribe, () => store)

const fail = (error) => set({ status: typeof navigator !== 'undefined' && navigator.onLine === false ? 'offline' : 'error', error: error?.message ?? String(error ?? '') })

// ---- push / pull -------------------------------------------------------------------------------------------------
let lastPushed = ''
let timer = 0

export async function push() {
  const id = store.learnerId
  if (!id || !store.email) return
  const state = readLocal()
  const json = JSON.stringify(state)
  if (json === lastPushed) return
  const sb = await getSupabase()
  set({ status: 'syncing' })
  const { error } = await sb.from('learner_state').upsert({ learner_id: id, state, updated_at: new Date().toISOString() })
  if (error) return fail(error)
  if (state.track) await sb.from('learners').update({ track: state.track }).eq('id', id)
  lastPushed = json
  set({ status: 'ok', at: Date.now(), error: '' })
}

function schedulePush() {
  clearTimeout(timer)
  timer = setTimeout(() => push().catch(fail), 4000)
}

/** Bring the account's copy together with this device's. mode 'replace' drops what is on the device first. */
export async function pull(mode = 'merge') {
  const id = store.learnerId
  if (!id || !store.email) return
  const sb = await getSupabase()
  set({ status: 'syncing' })
  const [st, ln] = await Promise.all([sb.from('learner_state').select('state').eq('learner_id', id).maybeSingle(), sb.from('learners').select('track').eq('id', id).maybeSingle()])
  if (st.error) return fail(st.error)
  const remote = st.data?.state ?? {}
  const theirs = remote.track ?? ln.data?.track ?? null // the learner's own age group
  const local = mode === 'replace' ? { progress: {}, game: {}, srs: {} } : readLocal()
  const merged = mergeState(local, { ...remote, track: theirs ?? undefined })
  if (mode === 'replace' && theirs) merged.track = theirs
  writeLocal(merged)
  lastPushed = sameState(merged, remote) ? JSON.stringify(readLocal()) : ''
  await push()
  if (store.status === 'syncing') set({ status: 'ok', at: Date.now(), error: '' })
}

export async function selectLearner(id, mode = 'merge') {
  clearTimeout(timer)
  if (store.learnerId && store.learnerId !== id) await push().catch(() => {}) // save the previous learner first
  try {
    localStorage.setItem(LEARNER_KEY, id)
  } catch {
    /* ignore */
  }
  lastPushed = ''
  set({ learnerId: id })
  await pull(mode)
}

/** Forget which learner this device is for (optionally wiping their progress from the device). */
export async function detachLearner(wipe) {
  clearTimeout(timer)
  await push().catch(() => {})
  try {
    localStorage.removeItem(LEARNER_KEY)
  } catch {
    /* ignore */
  }
  if (wipe) {
    applying = true
    try {
      updatePersistent(LOCAL.progress, null, () => ({}))
      updatePersistent(LOCAL.game, null, () => ({}))
      updatePersistent(LOCAL.srs, null, () => ({}))
    } finally {
      applying = false
    }
  }
  lastPushed = ''
  set({ learnerId: null, status: store.email ? 'idle' : 'off', at: null })
}

// ---- account actions ---------------------------------------------------------------------------------------------
let watching = false
function watchAuth(sb) {
  if (watching) return
  watching = true
  sb.auth.onAuthStateChange((_e, session) => {
    const email = session?.user?.email ?? null
    if (email !== store.email) set({ email })
  })
}

export async function signUp(email, password) {
  const sb = await getSupabase()
  const { data, error } = await sb.auth.signUp({ email, password })
  if (error) throw error
  watchAuth(sb)
  if (data.session) set({ email: data.session.user.email, ready: true })
  return { needsConfirmation: !data.session }
}
export async function signIn(email, password) {
  const sb = await getSupabase()
  const { data, error } = await sb.auth.signInWithPassword({ email, password })
  if (error) throw error
  watchAuth(sb)
  set({ email: data.session?.user?.email ?? email, ready: true })
}
export async function signOut(wipe = true) {
  await detachLearner(wipe)
  const sb = await getSupabase()
  await sb.auth.signOut()
  set({ email: null, status: 'off' })
}
export async function deleteAccount() {
  const sb = await getSupabase()
  const { error } = await sb.rpc('delete_my_account')
  if (error) throw error
  try {
    localStorage.removeItem(LEARNER_KEY)
  } catch {
    /* ignore */
  }
  await sb.auth.signOut().catch(() => {})
  set({ email: null, learnerId: null, status: 'off', at: null })
}

export async function listLearners() {
  const sb = await getSupabase()
  const { data, error } = await sb.from('learners').select('id, name, track, created_at, learner_state(state, updated_at)').order('created_at')
  if (error) throw error
  return data.map((l) => {
    const st = Array.isArray(l.learner_state) ? l.learner_state[0] : l.learner_state
    return { id: l.id, name: l.name, track: l.track, created_at: l.created_at, state: st?.state ?? {}, updated_at: st?.updated_at ?? null }
  })
}
export async function addLearner(name, track) {
  const sb = await getSupabase()
  const { data: u } = await sb.auth.getUser()
  const { data, error } = await sb.from('learners').insert({ owner: u.user.id, name: name.trim(), track }).select('id').single()
  if (error) throw error
  return data.id
}
export async function renameLearner(id, name) {
  const sb = await getSupabase()
  const { error } = await sb.from('learners').update({ name: name.trim() }).eq('id', id)
  if (error) throw error
}
export async function removeLearner(id) {
  const sb = await getSupabase()
  const { error } = await sb.from('learners').delete().eq('id', id)
  if (error) throw error
  if (store.learnerId === id) await detachLearner(true)
}

// ---- start-up ----------------------------------------------------------------------------------------------------
let listening = false
let restoring = false

/** Pick up a saved sign-in (if there is one) and start syncing. Safe to call again. */
export async function restoreSession() {
  if (!accountsEnabled || restoring || !hasStoredSession()) return
  restoring = true
  try {
    const sb = await getSupabase()
    watchAuth(sb)
    const { data } = await sb.auth.getSession()
    set({ email: data.session?.user?.email ?? null, ready: true })
    if (data.session && store.learnerId) await pull()
  } catch (e) {
    set({ ready: true })
    fail(e)
  } finally {
    restoring = false
  }
}

export async function bootSync() {
  if (listening || !accountsEnabled) return
  listening = true
  onPersistentWrite((key) => {
    if (!applying && WATCHED.has(key) && store.learnerId && store.email) schedulePush()
  })
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (!store.learnerId || !store.email) return
      if (document.visibilityState === 'hidden') {
        clearTimeout(timer)
        push().catch(fail)
      } else if (!store.at || Date.now() - store.at > 60000) pull().catch(fail)
    })
    window.addEventListener('online', () => store.learnerId && store.email && pull().catch(fail))
  }
  await restoreSession()
}

export { AUTH_STORAGE_KEY }
