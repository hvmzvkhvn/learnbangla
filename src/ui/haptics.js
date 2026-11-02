import { readUI } from './preferences'
export const HAPTIC_PATTERNS = Object.freeze({ success: 12, complete: [18, 60, 18] })
export function createHaptics({ preferences, vibrate, now = Date.now, reducedMotion = () => false }) {
  let last = -Infinity
  return (event) => {
    const p = preferences(),
      pattern = HAPTIC_PATTERNS[event],
      time = now()
    if (!pattern || !p.haptics || p.calm || reducedMotion() || time - last < 400 || !vibrate) return false
    try {
      const ok = vibrate(pattern)
      if (ok !== false) last = time
      return ok !== false
    } catch {
      return false
    }
  }
}
export const haptic = createHaptics({
  preferences: readUI,
  vibrate: (pattern) => (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function' ? navigator.vibrate(pattern) : false),
  reducedMotion: () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches,
})
