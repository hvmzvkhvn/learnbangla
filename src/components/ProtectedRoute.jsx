import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Spinner from './Spinner'

const HOME_BY_ROLE = {
  child: '/child',
  parent: '/parent',
  teacher: '/parent',
}

/** Gate a route by session, activation status, and role. */
export default function ProtectedRoute({ allowedRoles, children }) {
  const { session, profile, loading } = useAuth()

  if (loading) {
    return <Spinner />
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  if (!profile) {
    return <Spinner />
  }

  if (profile.status === 'locked') {
    return <Navigate to="/waiting" replace />
  }

  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    return <Navigate to={HOME_BY_ROLE[profile.role] ?? '/login'} replace />
  }

  return children
}
