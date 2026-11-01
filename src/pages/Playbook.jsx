import { Link, Navigate, useParams } from 'react-router-dom'
import Scene from '../art/Scene'
import Artwork, { PlayIcon, coverUrl } from '../components/playbook/Artwork'
import BookReader from '../components/playbook/BookReader'
import LookLearn from '../components/playbook/LookLearn'
import BuildScene from '../components/playbook/BuildScene'
import { useTrack } from '../state/persist'
import { featuresOf } from '../curriculum/features'
import { useGame } from '../state/game'
import { booksFor, buildTasks, lookScenes, regionStoryboards, timelineStory } from '../data/playbook'
import { exploreById } from '../data/explore'
import '../components/playbook/playbook.css'
import { useBookmarks } from '../components/playbook/bookmarks'

const categories = [['read', 'Picture books', 'Stories to get lost in'], ['look', 'Look & Learn', 'A world of new words'], ['build', 'Build a scene', 'Listen. Choose. Create.'], ['history', 'Our stories', 'Discover Bangladesh']]

function Section({ kind, title, hint, children, count }) {
  return <section id={`pb-${kind}`} className={`pb-section pb-${kind}`}>
    <header className="pb-section-heading"><span className="pb-section-icon"><PlayIcon kind={kind} /></span><div><h2>{title}</h2><p>{hint}</p></div>{count && <span className="pb-count">{count}</span>}</header>
    <div className="pb-grid">{children}</div>
  </section>
}

function Tile({ to, scene, bookId, title, sub, done, id, kind = 'read', page = 0, pages, children }) {
  return <Link to={to} className={`pb-tile pb-${kind}`}>
    <div className="pb-cover">
      {children || <Artwork bookId={bookId} scene={scene} id={id} alt={`${title.en} — illustrated scene`} />}
      <span className="pb-type"><PlayIcon kind={kind} />{kind === 'read' ? 'Read & listen' : kind === 'look' ? 'Tap & discover' : kind === 'build' ? 'Listen & build' : 'Story'}</span>
      {done && <span className="pb-done">✓ Completed</span>}
    </div>
    <div className="pb-tile-body"><p lang="bn" className="pb-bangla">{title.bn}</p><h3>{title.en}</h3><div className="pb-meta"><span>{done ? '✓ Completed' : page > 0 ? `Continue · page ${Math.min(page + 1, pages)} of ${pages}` : sub}</span><span aria-hidden="true">↗</span></div></div>
    {pages && <div className="pb-card-progress" aria-hidden="true"><span style={{ width: `${done ? 100 : (page / pages) * 100}%` }} /></div>}
  </Link>
}

export default function Playbook() {
  const { kind, id } = useParams()
  const [trackKey] = useTrack()
  const [saved] = useBookmarks()
  const feat = featuresOf(trackKey)
  const { game } = useGame()
  const young = trackKey === 'young'
  const books = booksFor(trackKey)
  if (!feat.playbook) return <Navigate to="/" replace />
  if (kind === 'book') {
    const b = books.find((x) => x.id === id)
    return b ? <BookReader key={`${trackKey}:${b.id}`} id={`book:${b.id}`} bookId={b.id} title={b.title.en} pages={b.pages} hideEnglish={young} /> : <Navigate to="/playbook" replace />
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
    return <BookReader key={id} id={`story:${id}`} title={s.title} pages={s.panels} mode="story" backTo="/playbook" xp={20} finishText={r ? `${r.name} — the end` : 'The end'} />
  }
  if (kind) return <Navigate to="/playbook" replace />
  const read = game.stats.books ?? {}
  const looked = game.stats.looks ?? {}
  const built = game.stats.builds ?? {}
  return <div className="playbook">
    <div className="pb-hero">
      <div className="pb-hero-copy"><p className="pb-eyebrow">THE PLAYBOOK · গল্পের জগৎ</p><h1>A little wonder.<br />A world of Bangla.</h1><p>Read a story. Discover a word. Build something wonderful.</p><a href="#pb-read" className="pb-hero-link">Find your next story <span aria-hidden="true">↗</span></a></div>
      <img src={coverUrl('dada-village')} alt="A grandfather welcomes his granddaughter to a leafy Bengali village" width="1536" height="1024" className="pb-hero-art" fetchPriority="high" />
    </div>
    <nav className="pb-shortcuts" aria-label="Playbook activities">{categories.filter(([key]) => key !== 'history' || feat.storyboards).map(([key, label, hint]) => <a key={key} href={`#pb-${key}`} className={`pb-shortcut pb-${key}`}><span><PlayIcon kind={key} /></span><div><strong>{label}</strong><small>{hint}</small></div></a>)}</nav>
    <Section kind="read" title="One more story?" hint={young ? 'Little stories. Big discoveries. Tap to read and listen.' : 'Every page is a small adventure. Tap a Bangla word to hear it.'} count={`${books.length} books`}>
      {books.map(b => <Tile key={b.id} to={`/playbook/book/${b.id}`} bookId={b.id} scene={b.pages[0].scene} id={`t-${b.id}`} title={b.title} sub={`${b.pages.length} pages · Read & listen`} done={Boolean(read[`book:${b.id}`])} page={saved[`book:${b.id}`]?.page || 0} pages={b.pages.length} />)}
    </Section>
    <Section kind="look" title="Look a little closer" hint="From a busy bazaar to your own bedroom. Every picture has words to discover." count={`${lookScenes.length} places`}>
      {lookScenes.map(l => <Tile key={l.id} kind="look" to={`/playbook/look/${l.id}`} scene={l.scene} id={`t-look-${l.id}`} title={l.title} sub={`${l.scene.items.filter(i => i.word).length} words to find`} done={Boolean(looked[l.id])} />)}
    </Section>
    <Section kind="build" title="Make it your own" hint="A word, a picture, a little imagination. Bring each scene to life." count={`${buildTasks.length} scenes`}>
      {buildTasks.map(t => <Tile key={t.id} kind="build" to={`/playbook/build/${t.id}`} title={t.title} sub={`${t.steps.length} pieces · Listen & build`} done={Boolean(built[t.id])}><Scene scene={{...t, alt: `Partly completed ${t.title.en.toLowerCase()} with missing pieces`, items: t.steps.map((s,i) => ({...s, ghost: i > 1, anim: undefined}))}} id={`build-cover-${t.id}`} className="pb-scene" /></Tile>)}
    </Section>
    {feat.storyboards && <Section kind="history" title="A country full of stories" hint="People, places and the journey to independence. Explore our shared history.">
      <Tile kind="history" to="/playbook/story/timeline" scene={timelineStory.panels[2].scene} id="t-timeline" title={{bn:'স্বাধীনতার পথ',en:timelineStory.title}} sub="1905–1971 · 7 chapters" done={Boolean(read['story:timeline'])} page={saved['story:timeline']?.page || 0} pages={7} />
      {Object.entries(regionStoryboards).map(([key, story]) => <Tile key={key} kind="history" to={`/playbook/story/${key}`} scene={story.panels[0].scene} id={`region-${key}`} title={{bn:exploreById[key]?.bn || '',en:story.title.replace('The story of ', '')}} sub={`${story.panels.length} illustrated chapters`} done={Boolean(read[`story:${key}`])} page={saved[`story:${key}`]?.page || 0} pages={story.panels.length} />)}
    </Section>}
    <p className="pb-footer">Made for curious minds. Rooted in Bangladesh.</p>
  </div>
}
