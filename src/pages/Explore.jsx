import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { exploreRegions } from '../data/explore'
import { featuresOf } from '../curriculum/features'
import { useTrack } from '../state/persist'
import { useExplore } from '../state/explore'
import BdMap from '../components/explore/BdMap'
import RegionSheet from '../components/explore/RegionSheet'
import Postcard from '../components/explore/Postcard'
import Toasts from '../components/Toasts'

export default function Explore() {
  const [trackKey] = useTrack()
  const feat = featuresOf(trackKey)
  const ex = useExplore()
  const [sel, setSel] = useState(null)
  const [city, setCity] = useState(null)
  if (!feat.explore) return <Navigate to="/" replace />
  const tier = trackKey === 'teen' ? 'teen' : trackKey === 'senior' ? 'senior' : 'adult'
  const region = sel ? exploreRegions.find((r) => r.id === sel) : null
  const prefix = trackKey === 'teen' ? 'v' : trackKey === 'senior' ? 'p' : 'a'

  const pick = (r) => {
    setSel(r.id)
    setCity(null)
    if (ex.unlocked(r)) ex.stamp(`r:${r.id}`, 10, r.name)
  }

  return (
    <div className="py-2">
      <Toasts />
      <h1 className="text-3xl font-extrabold text-primary">Explore Bangladesh 🗺️</h1>
      <p className="mb-3 text-ink/60">Tap a division to read about it, hear it and collect stamps.</p>

      <div className="card mb-4 flex items-center justify-around text-center !p-3">
        <div><p className="text-2xl font-extrabold text-primary">🛂 {ex.regionCount}/8</p><p className="text-xs font-bold text-ink/50">divisions</p></div>
        <div><p className="text-2xl font-extrabold text-secondary">📍 {ex.cityCount}/{exploreRegions.length * 4}</p><p className="text-xs font-bold text-ink/50">cities</p></div>
        <div><p className="text-2xl font-extrabold text-ink">{exploreRegions.filter((r) => ex.unlocked(r)).length}/8</p><p className="text-xs font-bold text-ink/50">unlocked</p></div>
      </div>

      <BdMap
        selected={sel} onSelect={pick} unlocked={ex.unlocked} stamped={ex.regionStamped}
        cities={region && ex.unlocked(region) ? region.cities : []} activeCity={city?.id} onCity={(c) => setCity(c)}
      />
      <p className="mt-2 text-center text-xs font-bold text-ink/40">Grey regions open as you finish lessons.</p>

      <div className="mt-5"><Postcard ex={ex} /></div>

      {region &&
        (ex.unlocked(region) ? (
          <RegionSheet
            region={region} tier={tier} ex={ex} lessonId={`${prefix}-x-${region.id}-1`} activeCity={city?.id}
            onCity={setCity} onClose={() => { setSel(null); setCity(null) }}
          />
        ) : (
          <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/40" onClick={() => setSel(null)}>
            <div className="animate-slideIn w-full max-w-xl rounded-t-[2rem] bg-background px-6 pb-28 pt-8 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <p className="text-6xl">🔒</p>
              <h2 className="mt-2 font-bangla text-3xl font-extrabold text-primary">{region.bn}</h2>
              <p className="font-bold text-ink/60">{region.name} Division</p>
              <p className="mt-3 text-ink/70">Finish <b>{ex.needed(region)}</b> more {ex.needed(region) === 1 ? 'lesson' : 'lessons'} to unlock this region.</p>
              <button type="button" onClick={() => setSel(null)} className="btn-secondary mt-5 w-full">OK</button>
            </div>
          </div>
        ))}
    </div>
  )
}
