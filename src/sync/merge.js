// Merging a learner's progress from two places (this device and their account) without losing either.
// Everything only ever grows — stars, XP, badges, answers — so "keep the best of both" is safe.

import { validateState } from '../state/schema.js'

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)

/** Deep merge of counters: numbers take the larger value, maps merge key by key, anything else prefers a. */
function mergeStats(a = {}, b = {}) {
  const out = { ...b, ...a }
  for (const k of Object.keys(out)) {
    const x = a[k]
    const y = b[k]
    if (typeof x === 'number' && typeof y === 'number') out[k] = Math.max(x, y)
    else if (isObj(x) && isObj(y)) out[k] = mergeStats(x, y)
    else if (x === undefined) out[k] = y
  }
  return out
}

export function mergeProgress(a = {}, b = {}) {
  const out = { ...b }
  for (const [id, v] of Object.entries(a)) out[id] = { ...out[id], ...v, stars: Math.max(v?.stars ?? 0, out[id]?.stars ?? 0) }
  return out
}

export function mergeGame(a, b) {
  if (!isObj(a)) return b
  if (!isObj(b)) return a
  const later = (a.last ?? '') >= (b.last ?? '') ? a : b
  const badges = { ...b.badges }
  for (const [id, at] of Object.entries(a.badges ?? {})) badges[id] = badges[id] ? Math.min(badges[id], at) : at
  const counters = mergeStats(a.xpCounters, b.xpCounters)
  const xpBase = Math.max(a.xpBase ?? a.xp ?? 0, b.xpBase ?? b.xp ?? 0)
  const activityBase = mergeStats(a.activityBase ?? a.activity, b.activityBase ?? b.activity)
  const combinedActivity = { ...activityBase }
  for (const c of Object.values(counters))
    for (const [day, amount] of Object.entries(c.activity ?? {})) combinedActivity[day] = (combinedActivity[day] ?? 0) + amount
  return {
    ...mergeStats(a, b),
    xpBase,
    xpCounters: counters,
    activityBase,
    xp: xpBase + Object.values(counters).reduce((sum, c) => sum + (c.xp ?? 0), 0),
    streak: later.streak ?? 0, // the streak of whichever device was used most recently
    best: Math.max(a.best ?? 0, b.best ?? 0),
    last: later.last ?? '',
    badges,
    activity: combinedActivity,
    stats: mergeStats(a.stats, b.stats),
  }
}

/** For each item keep whichever copy was answered most recently. */
export function mergeSrs(a = {}, b = {}) {
  const out = { ...b }
  for (const [id, s] of Object.entries(a)) {
    const o = out[id]
    if (!o) {
      out[id] = s
      continue
    }
    const aWins =
      (s.answeredAt ?? 0) !== (o.answeredAt ?? 0)
        ? (s.answeredAt ?? 0) > (o.answeredAt ?? 0)
        : (s.last ?? '') > (o.last ?? '') || ((s.last ?? '') === (o.last ?? '') && (s.box ?? 0) <= (o.box ?? 0))
    out[id] = { ...(aWins ? s : o), miss: Math.max(s.miss ?? 0, o.miss ?? 0) }
  }
  return out
}

/** Merge two { track, progress, game, srs } snapshots (either may be missing parts). */
export function mergeState(local = {}, remote = {}) {
  validateState(local)
  validateState(remote)
  if ((local.epoch ?? 0) !== (remote.epoch ?? 0)) return (local.epoch ?? 0) > (remote.epoch ?? 0) ? local : remote
  return {
    epoch: local.epoch ?? remote.epoch ?? 0,
    track: local.track ?? remote.track ?? null,
    progress: mergeProgress(local.progress, remote.progress),
    game: mergeGame(local.game, remote.game),
    srs: mergeSrs(local.srs, remote.srs),
  }
}

/** True when a and b hold the same thing (so there is nothing to write back). */
export const sameState = (a, b) => JSON.stringify(a) === JSON.stringify(b)
