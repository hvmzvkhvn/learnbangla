// Everything in the Playbook, and who sees what.
//   5–7   : picture books (one line a page), Look & Learn, Build the scene
//   8–12  : picture books (longer), Look & Learn, Build the scene
//   13–15 : the same as 8–12
//   16+   : division storyboards (opened from Explore) and the 1905–1971 timeline, plus the books
import { youngBooks, olderBooks } from './books'
import { lookScenes, buildTasks } from './scenes'
import { regionStoryboards, timelineStory } from './storyboards'
import { historyStories } from './history'
import { longStories, longById, longPages, longParts } from './long/index.js'
import { divisionStories } from './divisions/index.js'

export { youngBooks, olderBooks, lookScenes, buildTasks, regionStoryboards, timelineStory, historyStories, longStories, longById, longPages, longParts, divisionStories }

export const booksFor = (trackKey) => (trackKey === 'young' ? youngBooks : olderBooks)
export const hasTimeline = (trackKey) => trackKey === 'senior' || trackKey === 'adult'
export const bookById = (trackKey, id) => booksFor(trackKey).find((b) => b.id === id)

/** Every Bangla line in the Playbook (for the audio build and the /review page). */
export function allLines() {
  const out = []
  const page = (group, pg) => [pg, ...(pg.more ?? [])].forEach((x) => out.push({ group, bn: x.bn, roman: x.roman, en: x.en }))
  youngBooks.forEach((b) => b.pages.forEach((pg) => page('Playbook · picture books (5–7)', pg)))
  olderBooks.forEach((b) => b.pages.forEach((pg) => page('Playbook · picture books (8–15)', pg)))
  Object.values(regionStoryboards).forEach((s) => s.panels.forEach((pg) => page('Playbook · division storyboards (16+)', pg)))
  timelineStory.panels.forEach((pg) => page('Playbook · 1905–1971 timeline (16+)', pg))
  Object.values(historyStories).forEach((s) => s.panels.forEach((pg) => page(`Playbook · ${s.title} (16+)`, pg)))
  longStories.forEach((s) => s.beats.forEach((b) => ['easy', 'hard'].forEach((level) => b[level].lines.forEach((x) => out.push({ group: `Playbook · ${s.title} (${level === 'easy' ? 'easier' : 'fuller'} telling)`, bn: x.bn, roman: x.roman, en: x.en })))))
  Object.values(divisionStories).forEach((s) => s.chapters.forEach((ch) => [ch.main, ...ch.more].forEach((x) => out.push({ group: `Playbook · ${s.title} (16+)`, bn: x.bn, roman: x.roman, en: x.en }))))
  return out
}
export function allWords() {
  const seen = new Map()
  const note = (w, e) => seen.has(w.bn) || seen.set(w.bn, { ...w, e })
  lookScenes.forEach((s) => s.scene.items.forEach((i) => i.word && note(i.word, i.e)))
  buildTasks.forEach((t) => t.steps.forEach((s) => note(s.word, s.e)))
  return [...seen.values()]
}
