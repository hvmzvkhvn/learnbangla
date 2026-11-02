// Big stories: fifty slides each, told twice — an easier telling and a fuller one — so a learner of any age can pick.
// Every story is five parts of ten slides. A slide is written once as a "beat" with both tellings side by side (see helpers.js).
import { kabuliwala } from './kabuliwala.js'
import { bhasha } from './bhasha.js'

export const longStories = [kabuliwala, bhasha]
export const longById = Object.fromEntries(longStories.map((s) => [s.id, s]))
export const LEVELS = ['easy', 'hard']

/** One painting per slide; the same painting serves both tellings. Slide numbers are one-based in file names. */
export const longArtPath = (storyId, index) => `images/playbook/long/${storyId}-${String(index + 1).padStart(2, '0')}.webp`

/** A story's slides as reader pages, in the shape BookReader's story mode expects. */
export function longPages(story, level) {
  return story.beats.map((b, i) => {
    const t = b[level]
    const [first, ...rest] = t.lines
    const part = story.parts[Math.floor(i / 10)]
    return {
      label: b.title,
      heading: b.title,
      part: Math.floor(i / 10),
      partTitle: part.title,
      partTitleBn: part.titleBn,
      art: longArtPath(story.id, i),
      en: t.en,
      deep: t.deep ? [t.deep] : [],
      bn: first.bn,
      roman: first.roman,
      lineEn: first.en,
      more: rest,
    }
  })
}
/** Chapter buttons for the reader: one per part. */
export const longParts = (story) => story.parts.map((p, k) => ({ title: p.title, titleBn: p.titleBn, from: k * 10 }))
