import learningArt from './learning-art.json'
import { Person } from './sprites/people'
import { MAP } from '../data/bdMap'
import { scaleFor, spriteFor } from './sprites'

// A tiny illustration engine: a painted backdrop (sky, hills, river, room…) plus emoji "actors" and props placed
// on it. Scenes are plain data, so a whole picture book is just a list of { scene, text } pages.
//
//   scene = { bg: 'village', time: 'day' | 'evening' | 'night' | 'rain', items: [ … ], noLuminary?: true (no painted sun / moon, when a sun or moon is an item) }
//   item  = { e: '🏠', x: 20, y: 62, s: 56, flip?, anim?: 'bob'|'sway'|'drift'|'pulse', shadow?: false, z?: n }
//         | { t: '1947', x, y, s, c?: colour, w?: weight }            (big text)
//         | { map: 'sylhet', x, y, w }                                (Bangladesh, one division highlighted)
//   x and y are percentages of the picture; s is the emoji size in picture units (the picture is 400 × 260).
const W = 400
const H = 260

const SKY = {
  day: ['#6EC1F5', '#E3F5FF'],
  evening: ['#F0805F', '#FFE3AD'],
  night: ['#121E4D', '#4756A3'],
  rain: ['#76879B', '#C3CCD6'],
}
const GROUND = {
  day: ['#86D26F', '#5FB158'],
  evening: ['#78B05F', '#4F8F4C'],
  night: ['#3F7050', '#2C5A3D'],
  rain: ['#6FA66B', '#4F8657'],
}
const HILL = { day: '#5DB35A', evening: '#4C8C4A', night: '#2E5A3E', rain: '#527F55' }

function Sky({ time, id, lum = true }) {
  const [a, b] = SKY[time] ?? SKY.day
  return (
    <>
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#sky-${id})`} />
      {time === 'night' &&
        [[40, 30], [90, 60], [150, 22], [230, 48], [310, 26], [360, 70], [200, 80], [280, 100], [60, 110]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 ? 1.2 : 1.8} fill="#FFF8D6" opacity=".9" />
        ))}
      {lum && time === 'night' && <circle cx="330" cy="48" r="20" fill="#FFF3C4" />}
      {lum && time === 'night' && <circle cx="338" cy="42" r="17" fill="#3B4890" opacity=".35" />}
      {lum && time === 'day' && (
        <>
          <circle cx="332" cy="46" r="38" fill="#FFF3B0" opacity=".35" />
          <circle cx="332" cy="46" r="24" fill="#FFD84D" />
        </>
      )}
      {lum && time === 'evening' && (
        <>
          <circle cx="300" cy="150" r="46" fill="#FFE29A" opacity=".45" />
          <circle cx="300" cy="150" r="28" fill="#FF9A4D" />
        </>
      )}
      {time !== 'night' &&
        [[60, 44, 1], [170, 30, 0.8], [260, 62, 0.9]].map(([x, y, k], i) => (
          <g key={i} opacity={time === 'rain' ? 0.95 : 0.9} transform={`translate(${x} ${y}) scale(${k})`}>
            <g className={i === 1 ? 'sc-drift' : ''}>
              <ellipse cx="0" cy="0" rx="26" ry="11" fill={time === 'rain' ? '#9AA7B5' : '#fff'} />
              <ellipse cx="-16" cy="4" rx="16" ry="9" fill={time === 'rain' ? '#9AA7B5' : '#fff'} />
              <ellipse cx="17" cy="4" rx="18" ry="9" fill={time === 'rain' ? '#9AA7B5' : '#fff'} />
            </g>
          </g>
        ))}
    </>
  )
}

function Hills({ time, y = 150, color }) {
  const c = color ?? HILL[time]
  return (
    <>
      <path d={`M0 ${y + 18} Q70 ${y - 26} 150 ${y + 6} T300 ${y - 4} T400 ${y + 10} V${H} H0 Z`} fill={c} opacity=".75" />
      <path d={`M0 ${y + 34} Q100 ${y + 2} 210 ${y + 28} T400 ${y + 20} V${H} H0 Z`} fill={c} />
    </>
  )
}

function Ground({ time, y = 170, id }) {
  const [a, b] = GROUND[time] ?? GROUND.day
  return (
    <>
      <defs>
        <linearGradient id={`gr-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect y={y} width={W} height={H - y} fill={`url(#gr-${id})`} />
    </>
  )
}

function Waves({ y, h, from, to, id, count = 5 }) {
  return (
    <>
      <defs>
        <linearGradient id={`wv-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect y={y} width={W} height={h} fill={`url(#wv-${id})`} />
      {Array.from({ length: count }).map((_, i) => (
        <path key={i} d={`M${-20 + i * 90} ${y + 14 + (i % 3) * 14} q22 -9 44 0 t44 0`} stroke="#fff" strokeOpacity=".55" strokeWidth="2.2" fill="none" className={i % 2 ? 'sc-drift' : ''} />
      ))}
    </>
  )
}

function Rain() {
  return (
    <g stroke="#E8F1FA" strokeWidth="1.6" opacity=".85">
      {Array.from({ length: 38 }).map((_, i) => {
        const x = (i * 47) % 410
        const y = (i * 29) % 240
        return <line key={i} x1={x} y1={y} x2={x - 5} y2={y + 13} className="sc-rain" style={{ animationDelay: `${(i % 7) * 0.12}s` }} />
      })}
    </g>
  )
}

// each backdrop paints everything behind the actors
function Backdrop({ bg, time, id, lum = true }) {
  switch (bg) {
    case 'room':
    case 'kitchen':
    case 'classroom': {
      const night = time === 'night'
      return (
        <>
          <rect width={W} height={H} fill={night ? '#3B3F6B' : bg === 'kitchen' ? '#FFE9B8' : '#FFF0D6'} />
          <rect y="168" width={W} height="92" fill={night ? '#5B4A63' : '#D9A86C'} />
          <rect y="162" width={W} height="8" fill={night ? '#46385A' : '#B98547'} />
          {bg !== 'classroom' && (
            <g>
              <rect x="285" y="34" width="86" height="82" rx="6" fill="#8A5A2B" />
              <rect x="291" y="40" width="74" height="70" rx="3" fill={night ? '#1F2B66' : '#BFE6FF'} />
              <line x1="328" y1="40" x2="328" y2="110" stroke="#8A5A2B" strokeWidth="3" />
              <line x1="291" y1="75" x2="365" y2="75" stroke="#8A5A2B" strokeWidth="3" />
              {night && <circle cx="345" cy="58" r="8" fill="#FFF3C4" />}
            </g>
          )}
          {bg === 'classroom' && (
            <g>
              <rect x="40" y="28" width="220" height="104" rx="6" fill="#7B4F28" />
              <rect x="48" y="35" width="204" height="90" rx="3" fill="#2F6E54" />
              <path d="M62 62 q18 -10 36 0 t36 0" stroke="#fff" strokeOpacity=".75" strokeWidth="3" fill="none" />
              <path d="M62 92 h60" stroke="#fff" strokeOpacity=".6" strokeWidth="3" />
              <rect x="300" y="40" width="70" height="80" rx="4" fill="#BFE6FF" stroke="#8A5A2B" strokeWidth="5" />
            </g>
          )}
          {bg === 'kitchen' && <rect x="20" y="118" width="170" height="50" fill="#C7864B" rx="4" />}
        </>
      )
    }
    case 'market':
      return (
        <>
          <Sky time={time} id={id} lum={lum} />
          <Hills time={time} y={118} color="#7BB46B" />
          <rect y="168" width={W} height="92" fill="#D8B27A" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <path key={i} d={`M${i * 52 - 4} 24 h52 v30 q-26 14 -52 0 Z`} fill={i % 2 ? '#FFF' : '#E85D4A'} />
          ))}
          <rect y="22" width={W} height="6" fill="#B03A2E" />
        </>
      )
    case 'river':
      return (
        <>
          <Sky time={time} id={id} lum={lum} />
          <Hills time={time} y={110} />
          <Waves y={140} h={120} from={time === 'night' ? '#274A8C' : '#4FB6E8'} to={time === 'night' ? '#14306B' : '#1F7FC0'} id={id} count={8} />
        </>
      )
    case 'sea':
      return (
        <>
          <Sky time={time} id={id} lum={lum} />
          <Waves y={110} h={90} from={time === 'night' ? '#1F5D8C' : '#3BD0D0'} to={time === 'night' ? '#10386A' : '#1D8FC4'} id={id} count={9} />
          <path d={`M0 190 Q100 172 200 188 T400 180 V${H} H0 Z`} fill={time === 'night' ? '#8C7A5C' : '#F3DFA2'} />
          <path d={`M0 214 Q120 200 240 212 T400 206 V${H} H0 Z`} fill={time === 'night' ? '#7A694E' : '#E8CC86'} />
        </>
      )
    case 'city':
      return (
        <>
          <Sky time={time} id={id} lum={lum} />
          {[[10, 90, 50], [60, 70, 44], [106, 100, 56], [166, 80, 40], [208, 62, 52], [262, 96, 46], [310, 74, 58], [366, 92, 40]].map(([x, y, w], i) => (
            <g key={i}>
              <rect x={x} y={y} width={w} height={178 - y} fill={time === 'night' ? '#2A3568' : ['#C4B5A0', '#B7C4D0', '#D6C1A8', '#C9B79C'][i % 4]} />
              {[0, 1, 2].map((r) =>
                [0, 1].map((c) => <rect key={r + '-' + c} x={x + 8 + c * (w / 2 - 6)} y={y + 10 + r * 24} width="9" height="12" fill={time === 'night' ? '#FFE08A' : '#7AA9C9'} opacity=".85" />),
              )}
            </g>
          ))}
          <rect y="176" width={W} height="84" fill="#6B7078" />
          <rect y="176" width={W} height="6" fill="#9097A0" />
          {Array.from({ length: 8 }).map((_, i) => <rect key={i} x={i * 56 + 6} y="222" width="30" height="5" fill="#F3F3F3" />)}
        </>
      )
    case 'hills':
      return (
        <>
          <Sky time={time} id={id} lum={lum} />
          <path d={`M0 120 Q80 70 170 112 T400 96 V${H} H0 Z`} fill="#4E9F5B" />
          <path d={`M0 150 Q110 104 220 146 T400 130 V${H} H0 Z`} fill="#3E8F4C" />
          <path d={`M0 190 Q120 150 240 188 T400 172 V${H} H0 Z`} fill="#2F7E3E" />
          {Array.from({ length: 9 }).map((_, i) => (
            <path key={i} d={`M${-10 + i * 48} ${208 - (i % 2) * 8} q24 -18 48 0`} stroke="#1F6B33" strokeWidth="3" fill="none" opacity=".6" />
          ))}
          <ellipse cx="200" cy="124" rx="220" ry="14" fill="#fff" opacity=".28" />
        </>
      )
    case 'paper':
      return (
        <>
          <rect width={W} height={H} fill="#F6E9C8" />
          <rect x="6" y="6" width={W - 12} height={H - 12} rx="10" fill="none" stroke="#C9A961" strokeWidth="3" strokeDasharray="4 6" />
        </>
      )
    case 'village':
      return (
        <>
          <Sky time={time} id={id} lum={lum} />
          <Hills time={time} y={130} />
          <Ground time={time} y={168} id={id} />
          <Waves y={196} h={26} from={time === 'night' ? '#274A8C' : '#59BDE8'} to={time === 'night' ? '#1B3A7A' : '#2A8BC8'} id={id + 'r'} count={6} />
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={i} x1={i * 42 - 6} y1="226" x2={i * 42 + 12} y2="258" stroke="#4E9E49" strokeWidth="3" opacity=".6" />
          ))}
        </>
      )
    case 'meadow':
    default:
      return (
        <>
          <Sky time={time} id={id} lum={lum} />
          <Hills time={time} y={140} />
          <Ground time={time} y={176} id={id} />
          {Array.from({ length: 12 }).map((_, i) => (
            <circle key={i} cx={(i * 71) % 400} cy={196 + ((i * 37) % 52)} r="2.2" fill={['#FF8FA3', '#FFE066', '#fff'][i % 3]} opacity=".9" />
          ))}
        </>
      )
  }
}

// Furniture and grounded details for the interactive Playbook scenes.
function SetDressing({ bg }) {
  const table = (x, y, w) => <g key={x}><rect x={x} y={y} width={w} height="10" rx="3" fill="#95613f" stroke="#65482f" strokeWidth="2"/><path d={`M${x+8} ${y+10}v26m${w-16} -26v26`} stroke="#795339" strokeWidth="5"/></g>
  if (bg === 'market') return <g aria-hidden="true"><path d="M13 54v150M386 54v150" stroke="#87613b" strokeWidth="5"/><rect x="17" y="66" width="365" height="8" rx="3" fill="#ecd2a0"/>{table(15,220,300)}{[66,122,180,235].map(x=><path key={x} d={`M${x} 211h42l-6 16h-30z`} fill="#c99359" stroke="#8a603b" strokeWidth="2"/>)}<path d="M18 238h290" stroke="#b9996d" strokeWidth="2"/></g>
  if (bg === 'classroom') return <g aria-hidden="true">{table(28,228,52)}{table(166,230,190)}<rect x="24" y="150" width="100" height="8" rx="2" fill="#9b7045"/><rect x="24" y="158" width="9" height="26" fill="#9b7045"/></g>
  if (bg === 'room') return <g aria-hidden="true"><ellipse cx="194" cy="226" rx="70" ry="20" fill="#cf896d" opacity=".55"/><ellipse cx="194" cy="226" rx="56" ry="13" fill="none" stroke="#f3d7a6" strokeWidth="3"/><rect x="300" y="178" width="76" height="9" rx="3" fill="#95613f"/><path d="M310 187v13m56-13v13" stroke="#795339" strokeWidth="4"/><path d="M20 168h100" stroke="#f9e6bd" strokeWidth="3"/></g>
  if (bg === 'village') return <g aria-hidden="true"><path d="M30 183q47-18 88 0" stroke="#ead9ab" strokeWidth="14" fill="none"/><path d="M262 187h100m-90-12v22m22-22v22m22-22v22m22-22v22" stroke="#c2a26c" strokeWidth="3"/><g fill="#49784f">{[12,24,363,377].map(x=><path key={x} d={`M${x} 194q-8-20-10-12q2 8 10 12q6-24 10-15q-3 11-10 15`}/>)}</g></g>
  return null
}

const StoryGirl = () => <Person scale={0.78} pigtails top="#d5a231" dress />

function Item({ it }) {
  const x = (it.x / 100) * W
  const y = (it.y / 100) * H
  const cls = it.anim ? `sc-${it.anim}` : ''
  if (it.map) {
    const k = (it.w ?? 90) / MAP.width
    return (
      <g transform={`translate(${x - (MAP.width * k) / 2} ${y - (MAP.height * k) / 2}) scale(${k})`}>
        {Object.entries(MAP.divisions).map(([id, d]) => (
          <path key={id} d={d.d} fill={id === it.map ? '#F4A324' : '#EDE3C8'} stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
        ))}
      </g>
    )
  }
  if (it.t !== undefined) {
    return (
      <text x={x} y={y} textAnchor="middle" fontSize={it.s ?? 40} fontWeight={it.w ?? 900} fill={it.c ?? '#2D2D2D'} stroke="#fff" strokeWidth="5" paintOrder="stroke" className={`font-bangla ${cls}`}>
        {it.t}
      </text>
    )
  }
  const s = it.s ?? 44
  const shadow = it.shadow ?? (it.y > 48 && s >= 28)
  const Art = it.recurring && it.e === '👧' ? StoryGirl : spriteFor(it.e)
  const picture = learningArt[it.e]
  if (!Art && picture?.kind === 'image') return <image href={`${import.meta.env.BASE_URL}${picture.src}`} x={x - s / 2} y={y - s / 2} width={s} height={s} preserveAspectRatio="xMidYMid meet" className={cls} transform={it.flip ? `translate(${2 * x} 0) scale(-1 1)` : undefined} />
  if (Art) {
    return (
      <g className={cls} style={{ transformOrigin: `${x}px ${y}px`, transformBox: 'view-box' }}>
        {shadow && <ellipse cx={x} cy={y + s * 0.4} rx={s * 0.4} ry={s * 0.09} fill="#000" opacity=".16" />}
        <g transform={`${it.flip ? `translate(${2 * x} 0) scale(-1 1) ` : ''}translate(${x} ${y + s * 0.4}) scale(${(s / 100) * scaleFor(it.e)}) translate(-50 -90)`}>
          <Art />
        </g>
      </g>
    )
  }
  return (
    <g className={cls} style={{ transformOrigin: `${x}px ${y}px`, transformBox: 'view-box' }}>
      {shadow && <ellipse cx={x} cy={y + s * 0.34} rx={s * 0.42} ry={s * 0.1} fill="#000" opacity=".16" />}
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={s} transform={it.flip ? `translate(${2 * x} 0) scale(-1 1)` : undefined} style={{ userSelect: 'none' }}>
        {it.e}
      </text>
    </g>
  )
}

/** Draws one scene. `onItem(item)` makes the emoji tappable (Look & Learn); `ring` outlines one of them. */
export default function Scene({ scene, className = '', onItem, ring, id = 'a' }) {
  const time = scene.time ?? 'day'
  const items = [...(scene.items ?? [])].map((it, i) => ({ ...it, recurring: scene.furnished, _i: i })).sort((a, b) => (a.z ?? 0) - (b.z ?? 0) || a._i - b._i)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`block w-full overflow-hidden rounded-3xl ${className}`} role={onItem ? "group" : "img"} aria-label={scene.alt ?? 'Illustration'}>
      {scene.image ? <image href={`${import.meta.env.BASE_URL}${scene.image}`} width={W} height={H} preserveAspectRatio="none" /> : <Backdrop bg={scene.bg ?? 'meadow'} time={time} id={id} lum={!scene.noLuminary} />}
      {scene.furnished && !scene.image && <SetDressing bg={scene.bg} />}
      {items.map((it) => {
        const x = (it.x / 100) * W
        const y = (it.y / 100) * H
        const hit = onItem && it.word
        return (
          <g key={it._i} tabIndex={hit ? 0 : undefined} onKeyDown={hit ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onItem(it) } } : undefined} onClick={hit ? () => onItem(it) : undefined} className={hit ? 'cursor-pointer' : undefined} role={hit ? 'button' : undefined} aria-label={hit ? it.word.en : undefined}>
            {scene.image ? null : it.ghost ? <g opacity=".42"><rect x={x-(it.s??44)*.55} y={y-(it.s??44)*.55} width={(it.s??44)*1.1} height={(it.s??44)*1.1} rx="10" fill="#fff7dc" stroke="#705b37" strokeWidth="2" strokeDasharray="4 3"/><text x={x} y={y+5} textAnchor="middle" fontSize="20" fill="#705b37">+</text></g> : <Item it={it} />}
            {hit && scene.image && <circle cx={x} cy={y} r="3.5" fill="#fff9e8" stroke="#315b4a" strokeWidth="1.3" />}
            {hit && <circle cx={x} cy={y} r={(it.s ?? 44) * (scene.image ? 0.42 : 0.62)} fill="transparent" stroke={ring === it._i ? '#F4A324' : 'none'} className="pb-hotspot" strokeWidth="4" strokeDasharray="6 4" />}
          </g>
        )
      })}
      {time === 'rain' && <Rain />}
    </svg>
  )
}
