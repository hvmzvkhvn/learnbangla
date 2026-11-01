import { useSyncExternalStore } from 'react'
import { AUTH_STORAGE_KEY, accountsEnabled, getSupabase, hasStoredSession } from '../lib/supabaseClient'
import { onPersistentWrite, updatePersistent, readPersistent } from '../state/persist'
import { validateState } from '../state/schema'
import { mergeState, sameState } from './merge'

const LOCAL = { track: 'lb.track', progress: 'lb.progress', game: 'lb.game', srs: 'lb.srs', epoch: 'lb.epoch' }
const LEARNER_KEY = 'lb.learner'
const WATCHED = new Set(Object.values(LOCAL))
const readStr = (k) => {
  try {
    return localStorage.getItem(k)
  } catch {
    return null
  }
}
export const readLocal = () =>
  validateState(
    Object.fromEntries(Object.entries(LOCAL).map(([n, k]) => [n, readPersistent(k, n === 'track' ? null : n === 'epoch' ? 0 : {})])),
  )
export const hasLocalProgress = () => Object.keys(readLocal().progress).length > 0 || (readLocal().game?.xp ?? 0) > 0
let applying = false
function writeLocal(s) {
  validateState(s)
  applying = true
  try {
    for (const [n, k] of Object.entries(LOCAL)) updatePersistent(k, null, () => s[n] ?? (n === 'track' ? null : n === 'epoch' ? 0 : {}))
  } finally {
    applying = false
  }
}
const empty = (track = null, epoch = 0) => ({ track, epoch, progress: {}, game: {}, srs: {} })
let store = {
  status: accountsEnabled ? 'idle' : 'off',
  ready: !accountsEnabled || !hasStoredSession(),
  email: null,
  learnerId: readStr(LEARNER_KEY),
  at: null,
  error: '',
  recovery: false,
}
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
const fail = (error) => set({ status: navigator.onLine === false ? 'offline' : 'error', error: error?.message ?? String(error) })
let timer,
  listening = false,
  watching = false,
  restoring = false
let queue = Promise.resolve()
const serial = (fn) => {
  const next = queue.then(fn)
  queue = next.catch(() => {})
  return next.catch((e) => {
    fail(e)
    throw e
  })
}

// A durable copy belongs to a learner, never to the learner selected next.
function stash(id = store.learnerId) {
  const key = id ?? 'guest'
  localStorage.setItem(`lb.learnerState.${key}`, JSON.stringify(readLocal()))
  localStorage.setItem(`lb.learnerDrafts.${key}`, JSON.stringify(readPersistent('lb.lessonSessions', {})))
}
function cached(id) {
  const raw = readStr(`lb.learnerState.${id}`)
  return raw ? validateState(JSON.parse(raw)) : null
}
function drafts(id) {
  try {
    return JSON.parse(readStr(`lb.learnerDrafts.${id}`) ?? '{}')
  } catch {
    return {}
  }
}
async function remote(id) {
  const sb = await getSupabase()
  const [st, ln] = await Promise.all([
    sb.from('learner_state').select('state,revision').eq('learner_id', id).maybeSingle(),
    sb.from('learners').select('track').eq('id', id).single(),
  ])
  if (st.error || ln.error) throw st.error || ln.error
  return { state: validateState({ ...empty(ln.data.track), ...st.data?.state }), revision: st.data?.revision ?? 0 }
}
async function syncNow() {
  const id = store.learnerId
  if (!id || !store.email) return
  if (readStr(LEARNER_KEY) !== id) throw new Error('The learner changed in another tab. Reload before saving.')
  stash(id)
  const sb = await getSupabase()
  set({ status: 'syncing', error: '' })
  for (let attempt = 0; attempt < 5; attempt++) {
    const r = await remote(id)
    const local = readLocal()
    const merged = mergeState(local, r.state)
    if (!sameState(merged, r.state)) {
      const { data, error } = await sb.rpc('save_learner_state', { p_learner: id, p_state: merged, p_revision: r.revision, p_reset: false })
      if (error) {
        if (error.code === '40001') continue
        throw error
      }
      if (!data) throw new Error('The server did not confirm the save.')
    }
    // Include answers made while the request was in flight; queue their next save.
    const current = readLocal()
    writeLocal(mergeState(current, merged))
    stash(id)
    set({ status: 'ok', at: Date.now(), error: '' })
    if (!sameState(current, local)) schedulePush()
    return
  }
  throw new Error('Another device is saving. Your work is safe here; please try Sync now again.')
}
export const push = () => serial(syncNow)
export const pull = () => push()
function schedulePush() {
  clearTimeout(timer)
  timer = setTimeout(() => push().catch(() => {}), 2000)
}
export function selectLearner(id, mode = 'replace') {
  clearTimeout(timer)
  return serial(async () => {
    if (id === store.learnerId) return syncNow()
    stash()
    if (store.learnerId && store.email) await syncNow()
    // An unavailable server must never relabel the current local data.
    const r = await remote(id)
    const source = mode === 'merge' && !store.learnerId ? readLocal() : (cached(id) ?? empty(r.state.track, r.state.epoch))
    const next = mergeState(source, r.state)
    localStorage.setItem(LEARNER_KEY, id)
    writeLocal(next)
    updatePersistent('lb.lessonSessions', {}, () => drafts(id))
    set({ learnerId: id })
    await syncNow()
  })
}
async function detach(wipe) {
  stash()
  localStorage.removeItem(LEARNER_KEY)
  set({ learnerId: null, status: store.email ? 'idle' : 'off', at: null })
  if (wipe) {
    writeLocal(empty())
    updatePersistent('lb.lessonSessions', {}, () => ({}))
  }
}
export const detachLearner = (wipe) =>
  serial(async () => {
    await syncNow()
    await detach(wipe)
  })
export async function resetProgress(scope = 'device') {
  return serial(async () => {
    stash()
    const track = readLocal().track
    if (scope === 'account') {
      if (!store.learnerId || !store.email) throw new Error('Select a signed-in learner first.')
      const sb = await getSupabase()
      const r = await remote(store.learnerId)
      const state = empty(track, (r.state.epoch ?? 0) + 1)
      const { error } = await sb.rpc('save_learner_state', {
        p_learner: store.learnerId,
        p_state: state,
        p_revision: r.revision,
        p_reset: true,
      })
      if (error) throw error
      writeLocal(state)
      stash()
    } else {
      if (store.learnerId) await syncNow()
      await detach(false)
      writeLocal(empty(track))
    }
    updatePersistent('lb.lessonSessions', {}, () => ({}))
    set({ status: store.learnerId ? 'ok' : 'off', at: Date.now() })
  })
}
function watchAuth(sb) {
  if (watching) return
  watching = true
  sb.auth.onAuthStateChange((event, session) => {
    set({ email: session?.user?.email ?? null, ready: true, ...(event === 'PASSWORD_RECOVERY' ? { recovery: true } : {}) })
  })
}
export async function signUp(email, password) {
  const sb = await getSupabase()
  watchAuth(sb)
  const { data, error } = await sb.auth.signUp({ email, password, options: { emailRedirectTo: `${location.origin}/account` } })
  if (error) throw error
  if (data.session) set({ email: data.session.user.email, ready: true })
  return { needsConfirmation: !data.session }
}
export async function signIn(email, password) {
  const sb = await getSupabase()
  watchAuth(sb)
  const { data, error } = await sb.auth.signInWithPassword({ email, password })
  if (error) throw error
  set({ email: data.session.user.email, ready: true })
}
export async function requestPasswordReset(email) {
  const sb = await getSupabase()
  const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${location.origin}/account` })
  if (error) throw error
}
export async function resendConfirmation(email) {
  const sb = await getSupabase()
  const { error } = await sb.auth.resend({ type: 'signup', email, options: { emailRedirectTo: `${location.origin}/account` } })
  if (error) throw error
}
export async function updatePassword(password) {
  const sb = await getSupabase()
  const { error } = await sb.auth.updateUser({ password })
  if (error) throw error
  set({ recovery: false })
}
export async function reauthenticate(password) {
  if (!password) throw new Error('Enter your password to confirm.')
  await signIn(store.email, password)
}
export async function signOut(wipe = true) {
  clearTimeout(timer)
  return serial(async () => {
    await syncNow() // on failure, keep the session and local copy for recovery
    const sb = await getSupabase()
    const { error } = await sb.auth.signOut()
    if (error) throw error
    await detach(wipe)
    set({ email: null, status: 'off' })
  })
}
export async function deleteAccount(password) {
  await reauthenticate(password)
  return serial(async () => {
    const sb = await getSupabase()
    const owned = await listLearners()
    const { error } = await sb.rpc('delete_my_account')
    if (error) throw error
    await sb.auth.signOut()
    await detach(true)
    for (const l of owned) {
      localStorage.removeItem(`lb.learnerState.${l.id}`)
      localStorage.removeItem(`lb.learnerDrafts.${l.id}`)
    }
    set({ email: null, status: 'off', recovery: false })
  })
}
export async function listLearners() {
  const sb = await getSupabase()
  const { data, error } = await sb.from('learners').select('id,name,track,created_at,learner_state(state,updated_at)').order('created_at')
  if (error) throw error
  return data.map((l) => {
    const st = Array.isArray(l.learner_state) ? l.learner_state[0] : l.learner_state
    return { ...l, state: st?.state ?? {}, updated_at: st?.updated_at ?? null }
  })
}
export async function addLearner(name, track) {
  const sb = await getSupabase()
  const { data: u, error: authError } = await sb.auth.getUser()
  if (authError || !u.user) throw authError ?? new Error('Please sign in again.')
  const { data, error } = await sb.from('learners').insert({ owner: u.user.id, name: name.trim(), track }).select('id').single()
  if (error) throw error
  return data.id
}
export async function renameLearner(id, name) {
  const sb = await getSupabase()
  const { error } = await sb.from('learners').update({ name: name.trim() }).eq('id', id)
  if (error) throw error
}
export async function removeLearner(id, password) {
  await reauthenticate(password)
  return serial(async () => {
    const sb = await getSupabase()
    const { error } = await sb.rpc('delete_my_learner', { p_learner: id })
    if (error) throw error
    if (id === store.learnerId) await detach(true)
    localStorage.removeItem(`lb.learnerState.${id}`)
    localStorage.removeItem(`lb.learnerDrafts.${id}`)
  })
}
export async function restoreSession() {
  if (!accountsEnabled || restoring) return
  restoring = true
  try {
    const sb = await getSupabase()
    watchAuth(sb)
    const { data, error } = await sb.auth.getSession()
    if (error) throw error
    set({ email: data.session?.user?.email ?? null, ready: true })
    if (data.session && store.learnerId) await push()
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
    if (!applying && WATCHED.has(key) && store.learnerId && store.email) {
      try {
        stash()
      } catch (e) {
        fail(e)
      }
      schedulePush()
    }
  })
  document.addEventListener('visibilitychange', () => {
    if (!store.learnerId || !store.email) return
    if (document.visibilityState === 'hidden') {
      try {
        stash()
      } catch (e) {
        fail(e)
      }
    } else push().catch(() => {})
  })
  window.addEventListener('online', () => push().catch(() => {}))
  window.addEventListener('storage', (e) => {
    if (e.key === LEARNER_KEY && e.newValue !== store.learnerId) location.reload()
  })
  await restoreSession()
}
export { AUTH_STORAGE_KEY }
