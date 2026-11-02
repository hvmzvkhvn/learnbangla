import VisualText from '../../art/VisualText'
import BanglaLine from './BanglaLine'
import { exploreProfiles } from '../../data/exploreProfile'

const SectionTitle = ({ children }) => <h3 className="mb-2 mt-5 text-sm font-bold uppercase tracking-wide text-muted">{children}</h3>

/** A Bangla line with a short English note beneath it. */
function Item({ item, emoji }) {
  return (
    <div>
      <BanglaLine s={item} emoji={emoji ?? item.emoji} />
      {item.note && <p className="mx-3 mt-1 text-xs leading-relaxed text-muted">{item.note}</p>}
    </div>
  )
}

/** The extra sections of a region's card: food, nature, festivals, people, language, quick facts. */
export default function RegionProfile({ regionId, tier }) {
  const p = exploreProfiles[regionId]
  if (!p) return null
  const more = tier === 'senior' || tier === 'adult'
  return (
    <div data-testid="region-profile">
      <SectionTitle><VisualText>🍽️</VisualText> What people eat</SectionTitle>
      <div className="space-y-3">{p.food.map((f) => <Item key={f.bn} item={f} />)}</div>

      <SectionTitle><VisualText>🌿</VisualText> Nature &amp; places</SectionTitle>
      <div className="space-y-3">{p.nature.map((f) => <Item key={f.bn} item={f} />)}</div>

      {more && <>
        <SectionTitle><VisualText>🎉</VisualText> Festivals &amp; gatherings</SectionTitle>
        <div className="space-y-3">{p.festivals.map((f) => <Item key={f.bn} item={f} />)}</div>

        <SectionTitle><VisualText>👤</VisualText> People to know</SectionTitle>
        <div className="space-y-3">
          {p.people.map((x) => (
            <div key={x.bn}>
              <p className="mx-1 mb-1 text-xs font-bold text-primary">{x.name} · <span lang="bn" className="font-bangla">{x.nameBn}</span></p>
              <Item item={x} emoji="👤" />
            </div>
          ))}
        </div>

        <SectionTitle><VisualText>🗣️</VisualText> How people talk</SectionTitle>
        <p className="rounded-2xl bg-white px-4 py-3 text-sm leading-relaxed text-muted shadow-sm">{p.speech}</p>
      </>}

      <SectionTitle><VisualText>💡</VisualText> Did you know?</SectionTitle>
      <ul className="space-y-2">
        {p.facts.map((f) => <li key={f} className="rounded-2xl bg-accent/30 px-4 py-2 text-sm leading-relaxed text-muted">{f}</li>)}
      </ul>
    </div>
  )
}
