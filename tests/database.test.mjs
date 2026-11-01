import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { PGlite } from '@electric-sql/pglite'
test('database migration enforces ownership, revisions, adult tracks and recent authentication', async (t) => {
  const db = new PGlite()
  t.after(() => db.close())
  await db.exec(`create schema auth;create role anon;create role authenticated;
 create table auth.users(id uuid primary key);
 create function auth.uid() returns uuid language sql stable as $$ select (nullif(current_setting('request.jwt.claims',true),'')::jsonb->>'sub')::uuid $$;`)

  await db.exec(`create function auth.jwt() returns jsonb language sql stable as $$select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb$$;
 grant usage on schema auth,public to authenticated,anon;grant execute on all functions in schema auth to authenticated,anon;
 alter default privileges in schema public grant select,insert,update,delete on tables to authenticated;`)
  await db.exec(await readFile(new URL('../supabase/migrations/20261024000000_accounts.sql', import.meta.url), 'utf8'))
  await db.exec(await readFile(new URL('../supabase/migrations/20261101000000_reliable_progress.sql', import.meta.url), 'utf8'))
  const owner = '00000000-0000-0000-0000-000000000001',
    other = '00000000-0000-0000-0000-000000000002',
    learner = '00000000-0000-0000-0000-000000000003'
  await db.query('insert into auth.users values($1),($2)', [owner, other])
  const login = async (id, fresh = true) => {
    await db.exec('reset role')
    await db.query("select set_config('request.jwt.claims',$1,false)", [
      JSON.stringify({ sub: id, amr: [{ method: 'password', timestamp: Math.floor(Date.now() / 1000) - (fresh ? 0 : 3600) }] }),
    ])
    await db.exec('set role authenticated')
  }
  const s = { track: 'adult', epoch: 0, progress: {}, game: { xp: 10 }, srs: {} }
  await login(owner)
  await t.test('adult learners can be created', async () => {
    await db.query('insert into public.learners(id,owner,name,track) values($1,$2,$3,$4)', [learner, owner, 'Test', 'adult'])
  })
  await t.test('first save and revision match succeed', async () => {
    const r = await db.query('select public.save_learner_state($1,$2,0,false) revision', [learner, s])
    assert.equal(r.rows[0].revision, 1)
  })
  await t.test('stale revision cannot overwrite progress', async () => {
    await assert.rejects(db.query('select public.save_learner_state($1,$2,0,false)', [learner, s]), (e) => e.code === '40001')
  })
  await t.test('direct writes cannot bypass revision validation', async () => {
    await assert.rejects(db.query("update public.learner_state set state='{}' where learner_id=$1", [learner]), (e) => e.code === '42501')
  })
  await t.test('another account cannot read or modify a learner', async () => {
    await login(other)
    const r = await db.query('select * from public.learner_state')
    assert.equal(r.rows.length, 0)
    await assert.rejects(db.query('select public.save_learner_state($1,$2,1,false)', [learner, s]), (e) => e.code === '42501')
    await login(owner)
  })
  await t.test('malformed progress is rejected', async () => {
    await assert.rejects(db.query('select public.save_learner_state($1,$2,1,false)', [learner, { ...s, progress: [] }]))
  })
  await t.test('old password sessions cannot reset or delete', async () => {
    await login(owner, false)
    await assert.rejects(
      db.query('select public.save_learner_state($1,$2,1,true)', [learner, { ...s, epoch: 1 }]),
      (e) => e.code === '42501',
    )
    await assert.rejects(db.query('select public.delete_my_learner($1)', [learner]), (e) => e.code === '42501')
    await assert.rejects(db.query('select public.delete_my_account()'), (e) => e.code === '42501')
  })
  await t.test('fresh authentication allows reset and blocks old epoch resurrection', async () => {
    await login(owner)
    await db.query('select public.save_learner_state($1,$2,1,true)', [learner, { ...s, epoch: 1, game: {} }])
    await assert.rejects(db.query('select public.save_learner_state($1,$2,2,false)', [learner, s]), (e) => e.code === '40001')
  })
  await t.test('confirmed learner deletion cascades its saved state', async () => {
    await db.query('select public.delete_my_learner($1)', [learner])
    const r = await db.query('select * from public.learner_state')
    assert.equal(r.rows.length, 0)
  })
})
