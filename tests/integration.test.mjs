import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'
class Storage {
  values = new Map()
  fail = false
  getItem(k) {
    return this.values.get(k) ?? null
  }
  setItem(k, v) {
    if (this.fail) throw new Error('Quota exceeded')
    this.values.set(k, String(v))
  }
  removeItem(k) {
    this.values.delete(k)
  }
}
test('storage, backup and account switching integration', async (t) => {
  process.env.VITE_SUPABASE_URL = 'https://example.supabase.co'
  process.env.VITE_SUPABASE_ANON_KEY = 'test-public-key'
  process.env.VITE_ACCOUNTS = 'on'
  globalThis.localStorage = new Storage()
  globalThis.sessionStorage = new Storage()
  const rows = new Map([
    ['a', { state: { track: 'adult', epoch: 0, progress: { a: { stars: 3 } }, game: { xp: 10 }, srs: {} }, revision: 1 }],
    ['b', { state: { track: 'young', epoch: 0, progress: { b: { stars: 2 } }, game: { xp: 20 }, srs: {} }, revision: 1 }],
  ])
  let offline = false,
    conflict = false,
    authEmail = null
  const sb = {
    auth: {
      onAuthStateChange() {},
      async signInWithPassword({ email }) {
        authEmail = email
        return { data: { session: { user: { email } } } }
      },
      async signOut() {
        authEmail = null
        return {}
      },
      async getSession() {
        return { data: { session: authEmail ? { user: { email: authEmail } } : null } }
      },
    },
    from(table) {
      let id
      const query = {
        select() {
          return query
        },
        eq(k, v) {
          id = v
          return query
        },
        async maybeSingle() {
          return offline ? { error: { message: 'offline' } } : { data: rows.get(id) }
        },
        async single() {
          return offline ? { error: { message: 'offline' } } : { data: { track: rows.get(id)?.state.track } }
        },
      }
      return query
    },
    async rpc(name, args) {
      if (offline) return { error: { message: 'offline' } }
      const row = rows.get(args.p_learner)
      if (conflict) {
        conflict = false
        row.revision++
        row.state.progress.other = { stars: 3 }
        return { error: { code: '40001' } }
      }
      if (row.revision !== args.p_revision) return { error: { code: '40001' } }
      rows.set(args.p_learner, { state: structuredClone(args.p_state), revision: row.revision + 1 })
      return { data: row.revision + 1 }
    },
  }
  globalThis.window = { __lbSupabase: sb, addEventListener() {}, removeEventListener() {} }
  globalThis.document = { addEventListener() {} }
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { onLine: true } })
  const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  t.after(() => server.close())
  const persist = await server.ssrLoadModule('/src/state/persist.js')
  const engine = await server.ssrLoadModule('/src/sync/engine.js')
  const backup = await server.ssrLoadModule('/src/components/SaveCode.jsx')
  await t.test('latest memory value wins after a failed localStorage write', () => {
    localStorage.setItem('test', '1')
    localStorage.fail = true
    persist.updatePersistent('test', 0, () => 2)
    assert.equal(persist.readPersistent('test'), 2)
    localStorage.fail = false
  })
  await t.test('new and legacy save codes roundtrip and reject invalid tracks', () => {
    const s = { track: 'adult', epoch: 0, progress: { l: { stars: 3 } }, game: { xp: 12 }, srs: {} }
    assert.deepEqual(backup.decodeSave(backup.encodeSave(s)), s)
    assert.equal(backup.decodeSave('LB1.' + btoa(JSON.stringify({ 'lb.track': 'adult', 'lb.progress': {} }))).track, 'adult')
    assert.throws(() => backup.decodeSave('LB1.' + btoa(JSON.stringify({ 'lb.track': 'oops' }))))
  })
  await engine.signIn('parent@example.test', 'example')
  await t.test('selecting a learner replaces guest data instead of merging it', async () => {
    persist.updatePersistent('lb.progress', {}, () => ({ guest: { stars: 3 } }))
    await engine.selectLearner('a')
    assert.deepEqual(Object.keys(engine.readLocal().progress), ['a'])
  })
  await t.test('failed learner switch preserves active identity and data', async () => {
    offline = true
    await assert.rejects(engine.selectLearner('b'))
    offline = false
    assert.equal(localStorage.getItem('lb.learner'), 'a')
    assert.ok(engine.readLocal().progress.a)
  })
  await t.test('successful switch isolates siblings and preserves a durable copy', async () => {
    persist.updatePersistent('lb.progress', {}, (p) => ({ ...p, newA: { stars: 2 } }))
    await engine.selectLearner('b')
    assert.deepEqual(Object.keys(engine.readLocal().progress), ['b'])
    assert.ok(JSON.parse(localStorage.getItem('lb.learnerState.a')).progress.newA)
    await engine.selectLearner('a')
    assert.ok(engine.readLocal().progress.newA)
  })
  await t.test('revision conflicts retry with the newer remote work', async () => {
    persist.updatePersistent('lb.progress', {}, (p) => ({ ...p, local: { stars: 2 } }))
    conflict = true
    await engine.push()
    assert.ok(rows.get('a').state.progress.other)
    assert.ok(rows.get('a').state.progress.local)
  })
  await t.test('sign-out refuses to wipe pending progress while offline', async () => {
    offline = true
    await assert.rejects(engine.signOut())
    assert.equal(localStorage.getItem('lb.learner'), 'a')
    assert.ok(engine.readLocal().progress.local)
    offline = false
  })
  await t.test('account reset creates a new epoch and clears progress', async () => {
    await engine.resetProgress('account')
    assert.equal(rows.get('a').state.epoch, 1)
    assert.deepEqual(engine.readLocal().progress, {})
  })
  await t.test('device reset detaches without clearing cloud progress', async () => {
    persist.updatePersistent('lb.progress', {}, () => ({ retained: { stars: 1 } }))
    await engine.push()
    await engine.resetProgress('device')
    assert.equal(localStorage.getItem('lb.learner'), null)
    assert.ok(rows.get('a').state.progress.retained)
    assert.deepEqual(engine.readLocal().progress, {})
  })
})
