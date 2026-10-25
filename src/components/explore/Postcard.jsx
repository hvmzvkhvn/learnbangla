import { speak } from '../../audio/audio'
import { today } from '../../state/game'
import { cityOfTheDay } from '../../state/explore'
import BanglaLine from './BanglaLine'

/** A postcard from a different city every day. Reading it earns a stamp the first time. */
export default function Postcard({ ex }) {
  const c = cityOfTheDay()
  const key = `p:${today()}`
  const got = Boolean(ex.stamps[key])
  const collect = () => {
    ex.stamp(key, 8, `Postcard from ${c.name}`)
    ex.stamp(`c:${c.id}`, 5, c.name)
    speak(c.bn, { force: true })
  }
  return (
    <div className="rounded-3xl border-4 border-dashed border-secondary/50 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-4xl">{c.emoji}</span>
        <span className="flex-1">
          <span className="block text-xs font-extrabold uppercase tracking-wide text-secondary">✉️ Today's postcard</span>
          <span className="block text-xl font-extrabold text-ink">From <span className="font-bangla text-primary">{c.bn}</span> · {c.name}</span>
        </span>
        <span className="text-3xl">{got ? '✅' : '📮'}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink/80">Greetings from {c.name}, in {c.region.name} division! {c.fact}</p>
      <div className="mt-3"><BanglaLine s={c.line} /></div>
      {!got && <button type="button" onClick={collect} className="btn-secondary mt-3 w-full !py-3">Collect today's stamp</button>}
    </div>
  )
}
