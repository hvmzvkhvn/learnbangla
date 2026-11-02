// Development-only manual accessibility fixture; not an application entry point.
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/App'
import TypeQ from '../src/components/lesson/TypeQ'
import '../src/index.css'
const params = new URLSearchParams(location.search)
if (params.get('text') === '200') document.documentElement.style.fontSize = '200%'
const exercise = { title: 'Type the word for mother', target: 'মা', say: 'মা', stem: { text: 'mother', art: '👩' } }
createRoot(document.getElementById('root')).render(
  params.get('screen') === 'typing' ? (
    <main className="mx-auto max-w-xl p-5">
      <TypeQ ex={exercise} onWrong={() => {}} onSolved={() => {}} />
    </main>
  ) : (
    <MemoryRouter initialEntries={[params.get('route') || '/words']}>
      <App />
    </MemoryRouter>
  ),
)
