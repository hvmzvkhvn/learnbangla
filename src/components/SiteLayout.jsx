import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import UiIcon from '../art/UiIcon'
import VisualText from '../art/VisualText'
import { tracks } from '../curriculum/tracks'
import { useTrack } from '../state/persist'
import { useGame } from '../state/game'
import SoundToggle from './SoundToggle'
import RomanToggle from './RomanToggle'
import Toasts from './Toasts'
import DisplayPreferences from './DisplayPreferences'
export default function SiteLayout() {
  const [trackKey] = useTrack(),
    { level } = useGame(),
    { pathname } = useLocation()
  const [openAt, setOpenAt] = useState(null)
  const open = openAt === pathname
  const settings = useRef(null),
    trigger = useRef(null),
    main = useRef(null),
    first = useRef(true)
  const track = tracks[trackKey]
  const tabs = track?.features.garden
    ? [
        ['/', 'Learn', 'home'],
        ['/playbook', 'Playbook', 'palette'],
        ['/play', 'Play', 'game'],
        ['/me', 'Stickers', 'star'],
      ]
    : [
        ['/', 'Learn', 'home'],
        ['/practice', 'Practice', 'repeat'],
        ['/discover', 'Discover', 'compass'],
        ['/me', 'Me', 'medal'],
      ]
  const broad = ['/words', '/alphabet', '/discover', '/explore', '/playbook', '/stories', '/play'].includes(pathname)
  useEffect(() => {
    if (first.current) first.current = false
    else main.current?.focus({ preventScroll: true })
  }, [pathname])
  useEffect(() => {
    if (!open) return
    function close(e) {
      if (!settings.current?.contains(e.target)) setOpenAt(null)
    }
    function key(e) {
      if (e.key === 'Escape') {
        setOpenAt(null)
        trigger.current?.focus()
      }
    }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', key)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', key)
    }
  }, [open])
  return (
    <div className="site-layout">
      <Toasts />
      <a href="#main" className="skip-link">
        Skip to learning
      </a>
      <header className="site-header">
        <Link to="/" className="site-brand">
          <VisualText decorative>⭐</VisualText> Learn Bangla
        </Link>
        <div className="header-tools">
          {track && (
            <span className="level-badge" aria-label={`Level ${level.level}`}>
              Lv {level.level}
            </span>
          )}
          <div
            ref={settings}
            className="settings-wrap"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setOpenAt(null)
            }}
          >
            <button
              ref={trigger}
              type="button"
              className="btn-quiet"
              aria-expanded={open}
              aria-controls="settings-panel"
              onClick={() => setOpenAt(open ? null : pathname)}
            >
              <UiIcon name="gear" /> Settings
            </button>
            {open && (
              <section id="settings-panel" aria-label="Settings" className="settings-panel">
                <RomanToggle />
                <SoundToggle />
                <DisplayPreferences />
                <Link className="text-link" to="/me">
                  Backup & preferences
                </Link>
                <Link className="text-link" to="/privacy">
                  Privacy & contact
                </Link>
              </section>
            )}
          </div>
        </div>
      </header>
      <main id="main" ref={main} className={`site-main ${broad ? 'site-main-wide' : ''}`} tabIndex={-1}>
        <Outlet />
      </main>
      <nav aria-label="Main navigation" className="site-nav">
        <div className="site-nav-items">
          {tabs.map(([to, label, icon]) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}>
              <span className="nav-symbol">
                <UiIcon name={icon} />
              </span>
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
