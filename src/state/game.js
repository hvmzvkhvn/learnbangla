// XP, levels, daily streak and badges for the 13–15 and 16–18 tracks. Saved in the browser (localStorage).
import { useCallback, useSyncExternalStore } from 'react'
import { usePersistent, useTrack } from './persist'
import { featuresOf } from '../curriculum/features'

const pad = (n) => String(n).padStart(2, '0')
const dayKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const today = () => dayKey(new Date())
const yesterday = () => dayKey(new Date(Date.now() - 86400000))

const DEFAULT = {
  xp: 0, streak: 0, best: 0, last: '', badges: {},
  stats: { lessons: 0, perfect: 0, bosses: 0, stories: 0, storyDone: {}, greatEndings: 0, endings: {}, typed: 0, blitzBest: 0, memoryBest: 0, dailyDone: 0, daily: {} },
}

// Younger learners see their level as a garden that grows.
export const STAGES = [
  { name: 'Seed', emoji: '🌱' }, { name: 'Sprout', emoji: '🌿' }, { name: 'Flower', emoji: '🌼' },
  { name: 'Sapling', emoji: '🌳' }, { name: 'Apple tree', emoji: '🍎' }, { name: 'Rainbow tree', emoji: '🌈' },
  { name: 'Star tree', emoji: '🌟' },
]
export const stageOf = (level) => STAGES[Math.min(level, STAGES.length) - 1]

/** Level n needs 100 + 40·(n−1) XP to complete. */
export function levelInfo(xp) {
  let level = 1
  let floor = 0
  let need = 100
  while (xp >= floor + need) {
    floor += need
    level += 1
    need += 40
  }
  return { level, into: xp - floor, need, pct: Math.min(1, (xp - floor) / need) }
}

export const BADGES = [
  { id: 'first', emoji: '🌱', title: 'First Steps', desc: 'Finish your first lesson', test: (g) => g.stats.lessons >= 1 },
  { id: 'ten', emoji: '📚', title: 'Bookworm', desc: 'Finish 10 lessons', test: (g) => g.stats.lessons >= 10 },
  { id: 'fifty', emoji: '🏛️', title: 'Scholar', desc: 'Finish 50 lessons', test: (g) => g.stats.lessons >= 50 },
  { id: 'perfect', emoji: '💎', title: 'Flawless', desc: 'Get 3 stars on a lesson', test: (g) => g.stats.perfect >= 1 },
  { id: 'streak3', emoji: '🔥', title: 'On Fire', desc: 'Learn 3 days in a row', test: (g) => g.best >= 3 },
  { id: 'streak7', emoji: '☄️', title: 'Unstoppable', desc: 'Learn 7 days in a row', test: (g) => g.best >= 7 },
  { id: 'story', emoji: '💬', title: 'Storyteller', desc: 'Finish a story chat', test: (g) => g.stats.stories >= 1 },
  { id: 'story5', emoji: '🎭', title: 'Chatterbox', desc: 'Finish 5 story chats', test: (g) => g.stats.stories >= 5 },
  { id: 'smooth', emoji: '😎', title: 'Smooth Talker', desc: 'Get a top ending in a story', test: (g) => g.stats.greatEndings >= 1 },
  { id: 'typist', emoji: '⌨️', title: 'Typist', desc: 'Type 20 words in Bangla', test: (g) => g.stats.typed >= 20 },
  { id: 'blitz', emoji: '⚡', title: 'Quick Draw', desc: 'Score 15 in a Word Blitz', test: (g) => g.stats.blitzBest >= 15 },
  { id: 'memory', emoji: '🐘', title: 'Elephant Memory', desc: 'Win Memory Match in 8 moves or fewer', test: (g) => g.stats.memoryBest > 0 && g.stats.memoryBest <= 8 },
  { id: 'boss', emoji: '⚔️', title: 'Boss Slayer', desc: 'Beat a boss level', test: (g) => g.stats.bosses >= 1 },
  { id: 'daily3', emoji: '📅', title: 'Regular', desc: 'Complete 3 daily challenges', test: (g) => g.stats.dailyDone >= 3 },
  { id: 'lvl5', emoji: '🚀', title: 'Level 5', desc: 'Reach level 5', test: (g) => levelInfo(g.xp).level >= 5 },
  { id: 'lvl10', emoji: '👑', title: 'Level 10', desc: 'Reach level 10', test: (g) => levelInfo(g.xp).level >= 10 },
]

// ---- toasts (little pop-ups for level-ups and badges) ---------------------------------------------------
let toasts = []
const subs = new Set()
const emit = () => subs.forEach((f) => f())
export function pushToast(t) {
  const toast = { id: Math.random().toString(36).slice(2), ...t }
  toasts = [...toasts, toast]
  emit()
  setTimeout(() => {
    toasts = toasts.filter((x) => x.id !== toast.id)
    emit()
  }, 3200)
}
export const useToasts = () =>
  useSyncExternalStore(
    (cb) => {
      subs.add(cb)
      return () => subs.delete(cb)
    },
    () => toasts,
  )

// ---- the hook ------------------------------------------------------------------------------------------------
const merge = (prev) => ({ ...DEFAULT, ...prev, stats: { ...DEFAULT.stats, ...(prev?.stats ?? {}) }, badges: { ...(prev?.badges ?? {}) } })

// gentle: a missed day pauses the streak instead of resetting it (younger tracks)
function touch(g, gentle = false) {
  const t = today()
  if (g.last === t) return g
  const streak = g.last === yesterday() ? g.streak + 1 : gentle ? Math.max(1, g.streak) : 1
  return { ...g, last: t, streak, best: Math.max(g.best, streak) }
}

function evaluate(prev, next) {
  const out = { ...next, badges: { ...next.badges } }
  BADGES.forEach((b) => {
    if (!out.badges[b.id] && b.test(out)) {
      out.badges[b.id] = Date.now()
      pushToast({ kind: 'badge', emoji: b.emoji, text: `Badge unlocked: ${b.title}` })
    }
  })
  if (levelInfo(out.xp).level > levelInfo(prev.xp).level) {
    pushToast({ kind: 'level', emoji: '🎉', text: `Level ${levelInfo(out.xp).level}!` })
  }
  return out
}

export function useGame() {
  const [raw, set] = usePersistent('lb.game', DEFAULT)
  const [trackKey] = useTrack()
  const gentle = Boolean(featuresOf(trackKey).gentleStreak)
  const game = merge(raw)

  /** Apply a change: { xp, stats: (stats) => stats }. Updates the streak and checks badges. */
  const act = useCallback(
    ({ xp = 0, stats } = {}) =>
      set((prevRaw) => {
        const prev = merge(prevRaw)
        let next = touch({ ...prev, xp: prev.xp + xp }, gentle)
        if (stats) next = { ...next, stats: { ...next.stats, ...stats(next.stats) } }
        return evaluate(prev, next)
      }),
    [set, gentle],
  )
  const addXp = useCallback((n) => act({ xp: n }), [act])
  const reset = useCallback(() => set(DEFAULT), [set])
  return { game, level: levelInfo(game.xp), act, addXp, reset }
}
