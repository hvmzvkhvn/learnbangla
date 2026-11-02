import { usePersistent, useTrack } from '../../state/persist'
import { useSync } from '../../sync/engine'

// Reading position stays on this device, isolated by learner, track and reset epoch.
export function useBookmarks() {
  const { learnerId } = useSync()
  const [track] = useTrack()
  const [epoch] = usePersistent('lb.epoch', 0)
  const [all, setAll] = usePersistent('lb.playbookBookmarks', {})
  const scope = `${learnerId || 'guest'}:${track}:${epoch}`
  const saved = all[scope] || {}
  const save = (id, page, of) => setAll(prev => ({...prev, [scope]: {...prev[scope], [id]: {page, ...(of ? { of } : {}), at: Date.now()}}}))
  return [saved, save]
}
