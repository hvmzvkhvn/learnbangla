import { NavLink } from 'react-router-dom'

const TABS = [
  { to: '/child', label: 'Home', icon: '🏠', end: true },
  { to: '/child/progress', label: 'Progress', icon: '📈' },
  { to: '/child/settings', label: 'Settings', icon: '⚙️' },
]

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 border-t border-primary/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-around py-2">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 rounded-2xl px-5 py-2 text-sm font-bold transition ${
                isActive ? 'text-primary' : 'text-ink/40'
              }`
            }
          >
            <span className="text-2xl">{tab.icon}</span>
            {tab.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
