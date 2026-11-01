export const TRACKS = ['young', 'older', 'teen', 'senior', 'adult']
export const MAX_STATE_BYTES = 350000
const object = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)
const integer = (v, min = 0, max = 1000000000) => Number.isSafeInteger(v) && v >= min && v <= max
const date = (v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v))
function safeTree(v, depth = 0) {
  if (depth > 12) throw new Error('Saved data is too deeply nested.')
  if (typeof v === 'number' && !Number.isFinite(v)) throw new Error('Invalid saved number.')
  if (v && typeof v === 'object')
    for (const [k, child] of Object.entries(v)) {
      if (['__proto__', 'prototype', 'constructor'].includes(k)) throw new Error('Unsafe saved data.')
      safeTree(child, depth + 1)
    }
}
export function validateState(s) {
  if (!object(s) || new TextEncoder().encode(JSON.stringify(s)).length > MAX_STATE_BYTES)
    throw new Error('Saved progress is invalid or too large.')
  safeTree(s)
  if (Object.keys(s).some((k) => !['track', 'progress', 'game', 'srs', 'epoch'].includes(k)))
    throw new Error('Unknown saved progress field.')
  if (s.track != null && !TRACKS.includes(s.track)) throw new Error('Unknown age group.')
  if (s.epoch !== undefined && !integer(s.epoch)) throw new Error('Invalid reset version.')
  for (const key of ['progress', 'game', 'srs']) if (s[key] !== undefined && !object(s[key])) throw new Error(`Invalid ${key}.`)
  for (const p of Object.values(s.progress ?? {})) if (!object(p) || !integer(p.stars, 1, 3)) throw new Error('Invalid lesson stars.')
  for (const p of Object.values(s.srs ?? {})) {
    if (
      !object(p) ||
      !integer(p.box, 0, 6) ||
      !integer(p.miss) ||
      !date(p.due) ||
      !date(p.last) ||
      (p.answeredAt !== undefined && !integer(p.answeredAt, 0, Number.MAX_SAFE_INTEGER))
    )
      throw new Error('Invalid review history.')
  }
  const g = s.game ?? {}
  for (const k of ['xp', 'xpBase', 'streak', 'best']) if (g[k] !== undefined && !integer(g[k])) throw new Error(`Invalid ${k}.`)
  if (g.last !== undefined && g.last !== '' && !date(g.last)) throw new Error('Invalid activity date.')
  for (const k of ['stats', 'badges', 'activity', 'xpCounters', 'activityBase'])
    if (g[k] !== undefined && !object(g[k])) throw new Error(`Invalid ${k}.`)
  for (const n of Object.values(g.badges ?? {})) if (!integer(n, 0, Number.MAX_SAFE_INTEGER)) throw new Error('Invalid badge.')
  for (const map of [g.activity, g.activityBase])
    for (const [d, n] of Object.entries(map ?? {})) if (!date(d) || !integer(n)) throw new Error('Invalid activity.')
  for (const c of Object.values(g.xpCounters ?? {})) {
    if (!object(c) || !integer(c.xp) || !object(c.activity)) throw new Error('Invalid XP counter.')
    for (const [d, n] of Object.entries(c.activity)) if (!date(d) || !integer(n)) throw new Error('Invalid XP activity.')
  }
  for (const [k, v] of Object.entries(g.stats ?? {})) if (!(integer(v) || object(v))) throw new Error(`Invalid statistic: ${k}.`)
  return s
}
