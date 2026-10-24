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
import Account from './pages/Account'
import ParentView from './pages/ParentView'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'

// The site works fully without an account: progress lives in the browser. Accounts (src/sync, /account, /parent)
// add saving across devices and a parent view; they stay switched off in production until the site is built with VITE_ACCOUNTS=on.
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
        <Route path="account" element={<Account />} />
        <Route path="parent" element={<ParentView />} />
        <Route path="me" element={<Me />} />
      </Route>
      <Route path="lesson/:lessonId" element={<Lesson />} />
      <Route path="story/:storyId" element={<Story />} />
      <Route path="privacy" element={<Privacy />} />
      <Route path="review" element={<Review />} />
      <Route path="review/strokes" element={<StrokeReview />} />
      <Route path="studio" element={<Studio />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
