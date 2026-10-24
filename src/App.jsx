import { Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import Home from './pages/Home'
import Alphabet from './pages/Alphabet'
import Words from './pages/Words'
import Lesson from './pages/Lesson'
import Story from './pages/Story'
import Stories from './pages/Stories'
import Play from './pages/Play'
import Me from './pages/Me'
import Review from './pages/Review'
import StrokeReview from './pages/StrokeReview'
import Practice from './pages/Practice'
import Studio from './pages/Studio'
import NotFound from './pages/NotFound'

// The site is currently fully public — no login. Progress lives in the browser (localStorage).
// The accounts code (AuthContext, Login, SignupChild, ActivateParent, ParentDashboard,
// ProtectedRoute, child layout/pages) and the Supabase backend are still in the repo, just not
// routed. To bring accounts back, re-add those routes and wrap the tree in <AuthProvider>.
export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="alphabet" element={<Alphabet />} />
        <Route path="words" element={<Words />} />
        <Route path="stories" element={<Stories />} />
        <Route path="play" element={<Play />} />
        <Route path="play/:game" element={<Play />} />
        <Route path="practice" element={<Practice />} />
        <Route path="me" element={<Me />} />
      </Route>
      <Route path="lesson/:lessonId" element={<Lesson />} />
      <Route path="story/:storyId" element={<Story />} />
      <Route path="review" element={<Review />} />
      <Route path="review/strokes" element={<StrokeReview />} />
      <Route path="studio" element={<Studio />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
