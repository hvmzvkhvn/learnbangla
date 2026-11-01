import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
const Home = lazy(() => import('./pages/Home'))
const Alphabet = lazy(() => import('./pages/Alphabet'))
const Words = lazy(() => import('./pages/Words'))
const Lesson = lazy(() => import('./pages/Lesson'))
const Story = lazy(() => import('./pages/Story'))
const Stories = lazy(() => import('./pages/Stories'))
const Play = lazy(() => import('./pages/Play'))
const Me = lazy(() => import('./pages/Me'))
const Review = lazy(() => import('./pages/Review'))
const StrokeReview = lazy(() => import('./pages/StrokeReview'))
const Practice = lazy(() => import('./pages/Practice'))
const Studio = lazy(() => import('./pages/Studio'))
const ArtGallery = lazy(() => import('./pages/ArtGallery'))
const Playbook = lazy(() => import('./pages/Playbook'))
const Explore = lazy(() => import('./pages/Explore'))
const Account = lazy(() => import('./pages/Account'))
const ParentView = lazy(() => import('./pages/ParentView'))
const Privacy = lazy(() => import('./pages/Privacy'))
const NotFound = lazy(() => import('./pages/NotFound'))

const Discover = lazy(() => import('./pages/Discover'))

// The site works fully without an account: progress lives in the browser. Accounts (src/sync, /account, /parent)
// add saving across devices and a parent view; they stay switched off in production until the site is built with VITE_ACCOUNTS=on.
export default function App() {
  return (
    <>
      <PageMetadata />
      <Suspense
        fallback={
          <p role="status" className="p-8 text-center">
            Loading your learning space…
          </p>
        }
      >
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="discover" element={<Discover />} />
            <Route path="alphabet" element={<Alphabet />} />
            <Route path="words" element={<Words />} />
            <Route path="stories" element={<Stories />} />
            <Route path="explore" element={<Explore />} />
            <Route path="playbook" element={<Playbook />} />
            <Route path="playbook/:kind/:id" element={<Playbook />} />
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
          <Route path="art" element={<ArtGallery />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

function PageMetadata() {
  const { pathname } = useLocation()
  useEffect(() => {
    const section = pathname.split('/')[1]
    const titles = {
      lesson: 'Lesson',
      practice: 'Practice',
      discover: 'Discover',
      play: 'Learning games',
      me: 'My learning',
      account: 'Account',
      privacy: 'Privacy & contact',
      alphabet: 'Bangla alphabet',
      words: 'Bangla word lists',
      stories: 'Stories',
      explore: 'Explore Bangladesh',
      playbook: 'Picture books',
    }
    document.title = titles[section] ? `${titles[section]} · Learn Bangla` : 'Learn Bangla — for children, teens and adults'
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
