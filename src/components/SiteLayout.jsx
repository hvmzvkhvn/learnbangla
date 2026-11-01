import { Link, NavLink, Outlet } from 'react-router-dom'
import { tracks } from '../curriculum/tracks'
import { useTrack } from '../state/persist'
import { useGame } from '../state/game'
import SoundToggle from './SoundToggle'
import RomanToggle from './RomanToggle'
import Toasts from './Toasts'
export default function SiteLayout() {
  const [trackKey] = useTrack()
  const { level } = useGame()
  const track = tracks[trackKey]
  const tabs = track?.features.garden
    ? [
        ['/', 'Learn', '🏠'],
        ['/playbook', 'Playbook', '🎨'],
        ['/play', 'Play', '🎮'],
        ['/me', 'Stickers', '🌟'],
      ]
    : [
        ['/', 'Learn', '🏠'],
        ['/practice', 'Practice', '🔁'],
        ['/discover', 'Discover', '🧭'],
        ['/me', 'Me', '🏅'],
      ]
  return (
    <div className="min-h-screen bg-background pb-28">
      <Toasts />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:p-3">
        Skip to learning
      </a>
      <header className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-4">
        <Link to="/" className="whitespace-nowrap text-xl font-extrabold text-primary">
          ⭐ Learn Bangla
        </Link>
        <div className="flex items-center gap-2">
          {track && <span className="rounded-full bg-accent px-3 py-2 text-sm font-bold">Lv {level.level}</span>}
          <details className="relative">
            <summary className="cursor-pointer rounded-full bg-white px-3 py-2 font-bold shadow-sm">Settings</summary>
            <div className="absolute right-0 z-40 mt-2 flex w-56 flex-col gap-3 rounded-2xl border border-primary/20 bg-white p-4 shadow-lg">
              <RomanToggle />
              <SoundToggle />
              <Link className="underline" to="/me">
                Backup & preferences
              </Link>
              <Link className="underline" to="/privacy">
                Privacy & contact
              </Link>
            </div>
          </details>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-3xl px-4" tabIndex={-1}>
        <Outlet />
      </main>
      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-primary/20 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
      >
        <div className="mx-auto flex max-w-lg justify-around px-1 py-2">
          {tabs.map(([to, label, icon]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 text-sm font-bold ${isActive ? 'bg-primary/10 text-primary' : 'text-ink/70'}`
              }
            >
              <span aria-hidden="true" className="text-2xl">
                {icon}
              </span>
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
