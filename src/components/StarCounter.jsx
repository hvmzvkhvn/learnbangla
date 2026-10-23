import { useAuth } from '../context/AuthContext'
import { useStarTotal } from '../hooks/useStarTotal'

export default function StarCounter() {
  const { profile } = useAuth()
  const { stars } = useStarTotal(profile?.id)

  return (
    <div className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-extrabold text-ink shadow-sm">
      <span className="text-xl leading-none">⭐</span>
      <span>{stars}</span>
    </div>
  )
}
