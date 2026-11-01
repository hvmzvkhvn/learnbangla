import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mergeGame, mergeState, mergeSrs } from '../src/sync/merge.js'
import { validateState } from '../src/state/schema.js'
const state = (p = {}) => ({ track: 'adult', epoch: 0, progress: {}, game: {}, srs: {}, ...p })
test('independent offline XP gains add and repeated merges are idempotent', () => {
  const a = { xp: 110, xpBase: 100, xpCounters: { a: { xp: 10, activity: { '2026-11-01': 10 } } }, activityBase: {} }
  const b = { xp: 120, xpBase: 100, xpCounters: { b: { xp: 20, activity: { '2026-11-01': 20 } } }, activityBase: {} }
  const merged = mergeGame(a, b)
  assert.equal(merged.xp, 130)
  assert.equal(merged.activity['2026-11-01'], 30)
  assert.equal(mergeGame(merged, a).xp, 130)
  assert.deepEqual(mergeGame(a, b).xpCounters, mergeGame(b, a).xpCounters)
})
test('legacy baseline is counted once', () => {
  const m = mergeGame({ xp: 100 }, { xp: 110, xpBase: 100, xpCounters: { a: { xp: 10, activity: {} } } })
  assert.equal(m.xp, 110)
})
test('same-day review success supersedes an earlier failure', () => {
  const early = { box: 0, due: '2026-11-01', last: '2026-11-01', miss: 1, answeredAt: 100 }
  const late = { ...early, box: 1, due: '2026-11-02', answeredAt: 200 }
  assert.equal(mergeSrs({ word: early }, { word: late }).word.box, 1)
  assert.equal(mergeSrs({ word: late }, { word: early }).word.box, 1)
})
test('reset epochs prevent old devices resurrecting progress', () => {
  const old = state({ progress: { lesson: { stars: 3 } }, game: { xp: 900 } }),
    fresh = state({ epoch: 1 })
  assert.deepEqual(mergeState(old, fresh), fresh)
  assert.deepEqual(mergeState(fresh, old), fresh)
})
test('malformed, oversized and prototype-bearing backups are rejected', () => {
  for (const value of [
    null,
    [],
    state({ track: 'unknown' }),
    state({ progress: { a: { stars: 99 } } }),
    state({ game: { xp: -1 } }),
    state({ srs: { a: { box: 99 } } }),
    JSON.parse('{"game":{"__proto__":{"x":1}}}'),
    state({ game: { stats: { notes: 'x'.repeat(350001) } } }),
  ])
    assert.throws(() => validateState(value))
  assert.doesNotThrow(() => validateState(state({ game: { xp: 10, stats: { daily: { '2026-11-01': 2 } } } })))
})
