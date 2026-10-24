import { NavLink, Outlet } from 'react-router-dom'
import { tracks } from '../curriculum/tracks'
import { useTrack } from '../state/persist'
import { stageOf, useGame } from '../state/game'
import SoundToggle from './SoundToggle'
import Toasts from './Toasts'

const LEARN = { to: '/', label: 'Learn', icon: '🏠', end: true }
const STORIES = { to: '/stories', label: 'Stories', icon: '💬' }
const PLAY = { to: '/play', label: 'Play', icon: '🎮' }
const tabsFor = (feat) =>
  feat.stories ? [LEARN, STORIES, PLAY, { to: '/me', label: 'Me', icon: '🏅' }] : [LEARN, PLAY, { to: '/me', label: 'Stickers', icon: '🌟' }]

export default function SiteLayout() {
  const [trackKey] = useTrack()
  const { game, level } = useGame()
  const track = trackKey ? tracks[trackKey] : null
  const feat = track?.features
  const garden = Boolean(feat?.garden)
  const stage = stageOf(level.level)
  const tabs = tabsFor(feat ?? { stories: false })

  return (
    <div className="min-h-screen bg-background pb-24">
      <Toasts />
      <header className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-5 py-4">
        <span className="flex items-center gap-2">
          <span className="text-3xl">⭐</span>
          <span className="text-2xl font-extrabold text-primary">Learn Bangla</span>
        </span>
        <span className="flex items-center gap-2">
          <SoundToggle />
          {feat && (
            <>
              <span className="flex h-11 items-center gap-1 rounded-full bg-white px-3 text-sm font-extrabold text-secondary shadow-sm" title="Day streak">🔥 {game.streak}</span>
              <span className="flex h-11 items-center gap-1 rounded-full bg-accent px-4 font-extrabold shadow-sm" title="Level">
                {garden ? `${stage.emoji} Lv ${level.level}` : `⚡ Lv ${level.level}`}
              </span>
            </>
          )}
        </span>
      </header>

      <main className="mx-auto max-w-3xl px-5">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 border-t border-primary/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center justify-around py-2">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) => `flex flex-col items-center gap-0.5 rounded-2xl px-5 py-2 text-sm font-bold transition ${isActive ? 'text-primary' : 'text-ink/40'}`}
            >
              <span className="text-2xl">{tab.icon}</span>
              {tab.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
