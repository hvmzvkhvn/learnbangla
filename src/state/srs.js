// Spaced repetition ("Review today"): a simple Leitner ladder kept in localStorage as lb.srs.
//   { [itemId]: { box, due, last, miss } }   box 0 = just got it wrong, up to box 6
// A right answer climbs one box (once per day, or straight out of box 0) and pushes the next review further out;
// a wrong answer drops back to box 0 and is due again straight away.
import { useMemo } from 'react'
import { updatePersistent, usePersistent } from './persist'
import { gamePool } from '../curriculum/pools'
import { today } from './game'

const DAY = 86400000
export const INTERVALS = [0, 1, 2, 4, 8, 16, 32]
const NONE = {}

const dayNo = (key) => {
  const [y, m, d] = key.split('-').map(Number)
  return Math.round(Date.UTC(y, m - 1, d) / DAY)
}
const keyAt = (n) => new Date(n * DAY).toISOString().slice(0, 10)

/** Record one answer. Safe to call from anywhere; ignores things that aren't bank items. */
export function recordAnswer(itemId, correct) {
  if (!itemId) return
  const t = today()
  updatePersistent('lb.srs', NONE, (cur) => {
    const s = cur[itemId] ?? { box: 0, due: t, last: '', miss: 0 }
    let box = s.box
    if (correct) {
      if (s.last !== t || box === 0) box = Math.min(box + 1, INTERVALS.length - 1)
    } else box = 0
    const due = correct && box > 0 ? keyAt(dayNo(t) + INTERVALS[box]) : t
    return { ...cur, [itemId]: { box, due, last: t, miss: s.miss + (correct ? 0 : 1) } }
  })
}

/**
 * What to review right now for this track: everything that is due (wrong answers first, then the longest
 * overdue), topped up with things from finished lessons that have never been quizzed.
 */
export function dueItems(trackKey, progress, srs, limit = 10) {
  const t = today()
  const pool = gamePool(trackKey, progress, ['word', 'sentence', 'letter', 'form', 'sign', 'syllable'], 0)
  const inPool = new Map(pool.map((it) => [it.id, it]))
  const due = Object.entries(srs)
    .filter(([id, s]) => inPool.has(id) && s.due <= t)
    .sort((a, b) => a[1].box - b[1].box || (a[1].due < b[1].due ? -1 : 1))
    .map(([id]) => inPool.get(id))
  const out = due.slice(0, limit)
  if (out.length < limit) {
    const fresh = pool.filter((it) => !srs[it.id] && Object.keys(progress).length > 0)
    out.push(...fresh.slice(0, limit - out.length))
  }
  return { items: out, dueCount: due.length }
}

export function useDue(trackKey, progress, limit = 10) {
  const [srs] = usePersistent('lb.srs', NONE)
  return useMemo(() => dueItems(trackKey, progress, srs, limit), [trackKey, progress, srs, limit])
}
