// Which items the games draw from: what the learner has already studied, with a starter set for newcomers.
import { allLessons } from './tracks'
import { bank } from './bank'

export function gamePool(trackKey, progress, kinds = ['word', 'sentence', 'letter', 'form'], min = 10) {
  const seen = new Set()
  const take = (lessons) => {
    for (const l of lessons) {
      ;[...(l.learn ?? []), ...(l.practice ?? [])].forEach((id) => {
        const it = bank.get(id)
        if (it && kinds.includes(it.kind)) seen.add(id)
      })
    }
  }
  const lessons = allLessons(trackKey)
  take(lessons.filter((l) => progress[l.id]))
  // starter pool: the earliest lessons, so a brand-new learner can still play
  for (let i = 0; seen.size < min && i < lessons.length; i++) take([lessons[i]])
  return [...seen].map((id) => bank.get(id))
}
