import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <p className="text-6xl">🔍</p>
      <h1 className="mt-4 text-2xl font-extrabold text-primary">Page not found</h1>
      <p className="mt-2 text-ink/60">Let's get you back on track.</p>
      <Link to="/" className="btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  )
}
