// Explore Bangladesh: passport stamps (kept in the game stats, so they sync and travel in the save code) and region unlocking.
import { useCallback } from 'react'
import { exploreRegions } from '../data/explore'
import { allLessons } from '../curriculum/tracks'
import { pushToast, useGame, today } from './game'
import { useProgress, useTrack } from './persist'

export const STAMP_XP = { region: 10, city: 5, complete: 20, postcard: 8 }

export function useExplore() {
  const { game, act } = useGame()
  const [trackKey] = useTrack()
  const { progress } = useProgress()
  const stamps = game.stats.stamps ?? {}
  const done = trackKey ? allLessons(trackKey).filter((l) => progress[l.id]).length : 0

  const unlocked = (r) => done >= r.unlock
  const regionStamped = (r) => Boolean(stamps[`r:${r.id}`])
  const cityStamped = (c) => Boolean(stamps[`c:${c.id}`])
  const regionComplete = (r) => r.cities.every(cityStamped)

  /** Collect a stamp the first time only. Returns true if it is new. */
  const stamp = useCallback(
    (key, xp, label) => {
      if (stamps[key]) return false
      act({ xp, stats: (s) => ({ stamps: { ...(s.stamps ?? {}), [key]: Date.now() } }) })
      pushToast({ kind: 'stamp', emoji: '🛂', text: `Stamp: ${label} +${xp} XP` })
      return true
    },
    [act, stamps],
  )

  return {
    stamps, done, unlocked, regionStamped, cityStamped, regionComplete, stamp,
    regionCount: exploreRegions.filter(regionStamped).length,
    cityCount: exploreRegions.flatMap((r) => r.cities).filter(cityStamped).length,
    needed: (r) => Math.max(0, r.unlock - done),
  }
}

/** A different city every day, the same for everyone. */
export function cityOfTheDay(date = today()) {
  const cities = exploreRegions.flatMap((r) => r.cities.map((c) => ({ ...c, region: r })))
  const [y, m, d] = date.split('-').map(Number)
  const n = Math.floor(Date.UTC(y, m - 1, d) / 86400000)
  return cities[((n % cities.length) + cities.length) % cities.length]
}
