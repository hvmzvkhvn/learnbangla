import { createContext, useContext } from 'react'
import { usePersistent } from './persist'

/** Wrap a screen in <NoRoman.Provider value> to force transliteration off there (Super challenges have no option at all). */
export const NoRoman = createContext(false)

/** [showTransliteration, setShowTransliteration] — one setting for every age group and screen. */
export function useRoman() {
  const [v, set] = usePersistent('lb.roman', true)
  const forcedOff = useContext(NoRoman)
  return forcedOff ? [false, () => {}] : [v !== false, set]
}
