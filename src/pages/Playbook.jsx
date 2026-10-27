import { Link, Navigate, useParams } from 'react-router-dom'
import Scene from '../art/Scene'
import BookReader from '../components/playbook/BookReader'
import LookLearn from '../components/playbook/LookLearn'
import BuildScene from '../components/playbook/BuildScene'
import { useTrack } from '../state/persist'
import { featuresOf } from '../curriculum/features'
import { useGame } from '../state/game'
import { booksFor, buildTasks, lookScenes, regionStoryboards, timelineStory } from '../data/playbook'
import { exploreById } from '../data/explore'

const Section = ({ title, hint, children }) => (
  <section className="mt-7">
    <h2 className="text-xl font-extrabold text-ink">{title}</h2>
    {hint && <p className="mb-3 text-sm text-ink/60">{hint}</p>}
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{children}</div>
  </section>
)

function Tile({ to, scene, emoji, title, sub, done, id }) {
  return (
    <Link to={to} className="block overflow-hidden rounded-3xl bg-white shadow-sm transition active:scale-[0.98] hover:shadow-md">
      <div className="relative">
        {scene ? <Scene scene={scene} id={id} className="!rounded-none" /> : <div className="flex aspect-[400/260] items-center justify-center bg-accent/40 text-5xl">{emoji}</div>}
        {done && <span className="absolute right-2 top-2 rounded-full bg-success px-2 py-0.5 text-xs font-extrabold text-white shadow">✓ done</span>}
      </div>
      <div className="px-3 py-2.5">
        <p className="font-bangla text-lg font-extrabold leading-tight text-primary">{title.bn}</p>
        <p className="text-xs font-bold text-ink/50">{title.en}{sub ? ` · ${sub}` : ''}</p>
      </div>
    </Link>
  )
}

export default function Playbook() {
  const { kind, id } = useParams()
  const [trackKey] = useTrack()
  const feat = featuresOf(trackKey)
  const { game } = useGame()
  const young = trackKey === 'young'
  const books = booksFor(trackKey)

  if (!feat.playbook) return <Navigate to="/" replace />

  // ---- readers -----------------------------------------------------------------------------------------
  if (kind === 'book') {
    const b = books.find((x) => x.id === id)
    if (!b) return <Navigate to="/playbook" replace />
    return <BookReader key={b.id} id={`book:${b.id}`} title={b.title.en} pages={b.pages} hideEnglish={young} />
  }
  if (kind === 'look') {
    const l = lookScenes.find((x) => x.id === id)
    return l ? <LookLearn key={l.id} look={l} /> : <Navigate to="/playbook" replace />
  }
  if (kind === 'build') {
    const t = buildTasks.find((x) => x.id === id)
    return t ? <BuildScene key={t.id} task={t} /> : <Navigate to="/playbook" replace />
  }
  if (kind === 'story' && feat.storyboards) {
    const s = id === 'timeline' ? timelineStory : regionStoryboards[id]
    if (!s) return <Navigate to="/playbook" replace />
    const r = exploreById[id]
    const back = id === 'timeline' ? '/playbook' : '/explore'
    return <BookReader key={id} id={`story:${id}`} title={s.title} pages={s.panels} mode="story" backTo={back} xp={20} finishText={r ? `${r.name} — the end` : 'The end'} />
  }

  if (kind) return <Navigate to="/playbook" replace />

  // ---- the list ----------------------------------------------------------------------------------------
  const read = game.stats.books ?? {}
  const looked = game.stats.looks ?? {}
  const built = game.stats.builds ?? {}
  return (
    <div className="pb-6">
      <h1 className="mt-2 text-3xl font-extrabold text-primary">🎨 Playbook</h1>
      <p className="text-ink/60">Pictures to read, tap and build — learn Bangla by looking.</p>

      <Section title="📖 Picture books" hint={young ? 'Tap the speaker to hear every page.' : 'Read the story, tap any word to hear it, and open the English if you need it.'}>
        {books.map((b) => (
          <Tile key={b.id} to={`/playbook/book/${b.id}`} scene={b.pages[0].scene} id={`t-${b.id}`} title={b.title} sub={`${b.pages.length} pages`} done={Boolean(read[`book:${b.id}`])} />
        ))}
      </Section>

      <Section title="🔍 Look & Learn" hint="Tap things in the picture to hear their Bangla names, then play “Find it”.">
        {lookScenes.map((l) => (
          <Tile key={l.id} to={`/playbook/look/${l.id}`} scene={l.scene} id={`t-look-${l.id}`} title={l.title} done={Boolean(looked[l.id])} />
        ))}
      </Section>

      <Section title="🧩 Build the scene" hint="Hear a word, then pick the right picture to place.">
        {buildTasks.map((t) => (
          <Tile key={t.id} to={`/playbook/build/${t.id}`} emoji={t.emoji} title={t.title} sub={`${t.steps.length} things`} done={Boolean(built[t.id])} />
        ))}
      </Section>

      {feat.storyboards && (
        <Section title="🎞️ The story of Bangladesh" hint="Storyboards of the 1905–1971 road to independence. Each division’s storyboard opens from its card on Explore.">
          <Tile to="/playbook/story/timeline" scene={timelineStory.panels[2].scene} id="t-timeline" title={{ bn: 'স্বাধীনতার পথ', en: timelineStory.title }} sub={`${timelineStory.panels.length} panels`} done={Boolean(read['story:timeline'])} />
          <Link to="/explore" className="flex flex-col items-center justify-center rounded-3xl bg-secondary/10 px-3 py-4 text-center font-extrabold text-secondary">
            <span className="text-4xl">🗺️</span>
            Division storyboards
            <span className="text-xs font-bold text-ink/50">Open a region on Explore → ▶ Watch the story</span>
          </Link>
        </Section>
      )}
    </div>
  )
}
