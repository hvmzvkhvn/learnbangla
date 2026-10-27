import { usePersistent } from './persist'

/** [showTransliteration, setShowTransliteration] — one setting for every age group and screen. */
export function useRoman() {
  const [v, set] = usePersistent('lb.roman', true)
  return [v !== false, set]
}
