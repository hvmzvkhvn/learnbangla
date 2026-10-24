// Small helpers shared by the curriculum files (tracks.js, teenTracks.js).
import { chunk } from './text'
import { bank, wordIdsByCat, categoryMeta } from './bank'

/** Split ids into evenly sized lessons: `${prefix}-1`, `${prefix}-2`, … */
export const lessonsFrom = (prefix, title, emoji, kind, ids, size, extra = {}) =>
  chunk(ids, size).map((c, i, arr) => ({
    id: `${prefix}-${i + 1}`,
    title: arr.length > 1 ? `${title} ${i + 1}` : title,
    emoji,
    kind,
    learn: c,
    ...extra,
  }))

/** Append a mixed review lesson when there is more than one lesson. */
export const withReview = (prefix, title, lessons) =>
  lessons.length > 1
    ? [
        ...lessons,
        {
          id: `${prefix}-review`,
          title: `${title}: Review`,
          emoji: '🏅',
          kind: 'review',
          learn: [],
          reviewOf: lessons.flatMap((l) => [...l.learn, ...(l.practice ?? [])]),
        },
      ]
    : lessons

export const unit = (id, title, emoji, blurb, lessons) => ({ id, title, emoji, blurb, lessons })

export const catLessons = (prefix, cat, size, opts = {}) => {
  const meta = categoryMeta[cat]
  const ids = opts.pick ? opts.pick(wordIdsByCat[cat]) : wordIdsByCat[cat]
  return withReview(
    prefix,
    opts.title ?? meta.title,
    lessonsFrom(prefix, opts.title ?? meta.title, meta.emoji, 'words', ids, size, { cat, tip: meta.note }),
  )
}

export const byBn = (cat, list) => wordIdsByCat[cat].filter((id) => list.includes(bank.get(id).bn))

/** A timed "boss level" over everything the given lessons taught. */
export const boss = (prefix, title, lessons) => ({
  id: `${prefix}-boss`,
  title: `${title}: Boss Level`,
  emoji: '⚔️',
  kind: 'boss',
  learn: [],
  reviewOf: lessons.flatMap((l) => (l.kind === 'review' || l.kind === 'boss' || l.kind === 'story' ? [] : [...l.learn, ...(l.practice ?? [])])),
})
