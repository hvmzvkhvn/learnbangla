import { Outlet } from 'react-router-dom'
import StarCounter from './StarCounter'
import BottomNav from './BottomNav'

export default function ChildLayout() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="flex items-center justify-between px-5 py-4">
        <span className="text-2xl font-extrabold text-primary">Learn Bangla</span>
        <StarCounter />
      </header>
      <main className="mx-auto max-w-md px-5">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
