import { readPersistent, updatePersistent } from './persist'
export function recommendedLesson(lessons, ability) {
  if (ability === 'reader') return lessons.find((l) => ['dialogue', 'sentences'].includes(l.kind)) ?? lessons[0]
  return lessons[0]
}
export function saveLessonSession(id, session) {
  updatePersistent('lb.lessonSessions', {}, (prev) => {
    const entries = Object.entries({ ...prev, [id]: session })
      .sort((a, b) => (b[1].at ?? 0) - (a[1].at ?? 0))
      .slice(0, 3)
    return Object.fromEntries(entries)
  })
}
export const getLessonSession = (id) => readPersistent('lb.lessonSessions', {})[id]
export const clearLessonSession = (id) =>
  updatePersistent('lb.lessonSessions', {}, (prev) => Object.fromEntries(Object.entries(prev).filter(([key]) => key !== id)))
export function recordDuration(id, seconds) {
  if (seconds < 10 || seconds > 3600) return
  updatePersistent('lb.lessonDurations', {}, (p) => ({ ...p, [id]: [...(p[id] ?? []), seconds].slice(-5) }))
}
export function lessonMinutes(id, steps) {
  const samples = readPersistent('lb.lessonDurations', {})[id]
  return samples?.length
    ? { minutes: Math.max(1, Math.round(samples.reduce((a, b) => a + b, 0) / samples.length / 60)), measured: true }
    : { minutes: Math.max(2, Math.round((steps * 18) / 60)), measured: false }
}
