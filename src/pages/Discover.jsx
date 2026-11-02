import VisualText from '../art/VisualText'
import { Link } from 'react-router-dom'
import { useTrack } from '../state/persist'
import { featuresOf } from '../curriculum/features'
export default function Discover() {
  const [track] = useTrack()
  const f = featuresOf(track)
  const cards = [
    ...(f.stories ? [['/stories', '💬 Stories', 'Use Bangla in everyday conversations.']] : []),
    ...(f.explore ? [['/explore', '🗺️ Explore Bangladesh', 'Discover places, culture and history.']] : []),
    ...(f.playbook ? [['/playbook', '🎨 Playbook', 'Read picture books and explore illustrated scenes.']] : []),
    ['/alphabet', '🔤 Alphabet', 'Revisit letters and sounds.'],
    ['/words', '📚 Word lists', 'Find vocabulary by topic.'],
  ]
  return (
    <section className="py-3">
      <h1 className="text-3xl font-bold text-primary">Discover</h1>
      <p className="my-3">Choose something you want to understand.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map(([to, title, detail]) => (
          <Link key={to} to={to} className="card">
            <h2 className="text-xl font-bold"><VisualText>{title}</VisualText></h2>
            <p className="mt-2">{detail}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
