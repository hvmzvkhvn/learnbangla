import { C, O, def, st } from './kit'

// One flexible figure for children, adults and elders. 100-box, feet at y ≈ 90.
export function Person({
  scale = 1, skin = C.skin, hair = C.hair, top = C.teal, bottom = C.navy, dress = false, long = false, pigtails = false, bun = false,
  hat = false, cap = false, glasses = false, beard = false, grey = false, lungi = false, scarf = false, apron = false, hold = null, sari = false,
}) {
  const hc = grey ? '#E6E6E6' : hair
  return (
    <g transform={`translate(50 90) scale(${scale}) translate(-50 -90)`}>
      {/* legs + shoes (or skirt) */}
      {dress || sari ? (
        <path d="M37 42 H63 L70 86 H30 Z" fill={top} {...st} />
      ) : lungi ? (
        <path d="M37 60 H63 L66 88 H34 Z" fill={bottom} {...st} />
      ) : (
        <>
          <rect x="38" y="62" width="10" height="26" rx="4" fill={bottom} {...st} />
          <rect x="52" y="62" width="10" height="26" rx="4" fill={bottom} {...st} />
        </>
      )}
      <ellipse cx="43" cy="89" rx="7" ry="3" fill={O} />
      <ellipse cx="57" cy="89" rx="7" ry="3" fill={O} />
      {/* arms */}
      <rect x="27" y="42" width="9" height="24" rx="4.5" fill={dress || sari ? top : top} {...st} />
      <rect x="64" y="42" width="9" height="24" rx="4.5" fill={top} {...st} />
      <circle cx="31.5" cy="67" r="4.2" fill={skin} {...st} />
      <circle cx="68.5" cy="67" r="4.2" fill={skin} {...st} />
      {/* torso */}
      {!(dress || sari) && <rect x="35" y="38" width="30" height="30" rx="9" fill={top} {...st} />}
      {(dress || sari) && <path d="M36 38 H64 L67 52 H33 Z" fill={top} {...st} />}
      {sari && <path d="M36 40 L64 66 M44 38 L66 56" stroke={C.yellow} strokeWidth="3" fill="none" strokeLinecap="round" />}
      {apron && <rect x="40" y="48" width="20" height="22" rx="4" fill={C.white} {...st} />}
      {/* head */}
      {long && <path d="M34 26 a16 16 0 0 1 32 0 v22 q-16 6 -32 0z" fill={hc} {...st} />}
      {bun && <circle cx="50" cy="8" r="6" fill={hc} {...st} />}
      {pigtails && (
        <>
          <ellipse cx="33" cy="34" rx="5.5" ry="9" fill={hc} {...st} />
          <ellipse cx="67" cy="34" rx="5.5" ry="9" fill={hc} {...st} />
        </>
      )}
      <circle cx="50" cy="26" r="13.5" fill={skin} {...st} />
      <path d={long || pigtails || bun ? 'M36.5 24 a13.5 13.5 0 0 1 27 0 q-6 -9 -13.5 -9 q-9 0 -13.5 9z' : 'M36.7 25 a13.3 13.3 0 0 1 26.6 0 q-5 -6 -13.3 -6 q-8 0 -13.3 6z'} fill={hc} {...st} />
      <circle cx="45" cy="27.5" r="1.7" fill={O} />
      <circle cx="55" cy="27.5" r="1.7" fill={O} />
      <path d="M45.5 33 q4.5 3.5 9 0" stroke={O} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {glasses && (
        <g fill="none" stroke={O} strokeWidth="1.6">
          <circle cx="45" cy="27.5" r="4.2" />
          <circle cx="55" cy="27.5" r="4.2" />
          <path d="M49.2 27.5 h1.6" />
        </g>
      )}
      {beard && <path d="M38 31 q12 18 24 0 q-3 8 -12 8 q-9 0 -12 -8z" fill="#EDEDED" {...st} />}
      {scarf && <path d="M36 22 q14 -16 28 0 v6 q-14 -8 -28 0z" fill={C.red} {...st} />}
      {hat && (
        <>
          <ellipse cx="50" cy="16" rx="23" ry="5.5" fill={C.straw} {...st} />
          <path d="M39 16 a11 11 0 0 1 22 0z" fill={C.straw} {...st} />
        </>
      )}
      {cap && <path d="M37 19 a13 13 0 0 1 26 0z M50 19 h22" fill={C.white} {...st} />}
      {hold === 'book' && <rect x="58" y="58" width="16" height="12" rx="1.5" fill={C.red} {...st} />}
      {hold === 'bag' && <rect x="60" y="60" width="14" height="16" rx="3" fill={C.pink} {...st} />}
    </g>
  )
}

const Girl = () => <Person scale={0.78} skin={C.skin} pigtails top={C.coral} dress />
const Child = () => <Person scale={0.78} top={C.blue} bottom={C.navy} />
const Boy = () => <Person scale={0.8} top={C.green} bottom={C.brown} />
const Man = () => <Person top={C.navy} bottom={C.dgrey} />
const Woman = () => <Person top={C.orange} dress long />
const Elder = () => <Person scale={0.94} grey beard glasses top={C.white} lungi bottom={C.teal} />
const Farmer = () => <Person hat top={C.green} lungi bottom="#E8DCC0" />
const Teacher = () => <Person glasses top={C.purple} bottom={C.navy} hold="book" />
const Worker = () => <Person scarf top={C.teal} bottom={C.dgrey} apron />

def('👧', Girl, 1.9)
def('🧒', Child, 1.9)
def('👦', Boy, 1.9)
def('👨', Man, 1.9)
def('👩', Woman, 1.9)
def('👴', Elder, 1.9)
def('🧑‍🌾 👨‍🌾', Farmer, 1.9)
def('🧑‍🏫', Teacher, 1.9)
def('🧑‍🏭', Worker, 1.9)

// groups: figures standing side by side
const Group = ({ people }) => (
  <g>
    {people.map(([P, x, s], i) => (
      <g key={i} transform={`translate(${x - 50} ${(1 - s) * 22}) `}>
        <g transform={`translate(50 90) scale(${s}) translate(-50 -90)`}>{P}</g>
      </g>
    ))}
  </g>
)
def('👨‍👩‍👧', () => <Group people={[[<Man key="a" />, 26, 0.7], [<Woman key="b" />, 56, 0.7], [<Girl key="c" />, 82, 0.62]]} />, 1.5)
def('👨‍👩‍👧‍👦', () => <Group people={[[<Man key="a" />, 18, 0.62], [<Woman key="b" />, 40, 0.62], [<Girl key="c" />, 62, 0.55], [<Boy key="d" />, 84, 0.55]]} />, 1.5)

// hug: two figures leaning together with a heart
def('🤗', () => (
  <g>
    <g transform="translate(-14 0) rotate(8 50 90)"><Person scale={0.8} top={C.navy} bottom={C.dgrey} /></g>
    <g transform="translate(14 4) rotate(-8 50 90)"><Person scale={0.72} top={C.coral} dress long /></g>
    <path d="M50 22 c-8 -10 -22 2 -10 12 l10 8 l10 -8 c12 -10 -2 -22 -10 -12z" fill={C.red} {...st} transform="translate(0 -10) scale(.6) translate(33 8)" />
  </g>
))

// swimmer: head, arms and ripples
def('🏊', () => (
  <g>
    <circle cx="50" cy="48" r="11" fill={C.skin} {...st} />
    <path d="M39 46 a11 11 0 0 1 22 0 q-5 -5 -11 -5 q-6 0 -11 5z" fill={C.hair} {...st} />
    <circle cx="46" cy="49" r="1.5" fill={O} />
    <circle cx="54" cy="49" r="1.5" fill={O} />
    <path d="M20 56 q10 -14 20 -2 M60 54 q10 -12 20 2" stroke={C.skin} strokeWidth="7" strokeLinecap="round" fill="none" />
    <path d="M10 66 q10 -8 20 0 t20 0 t20 0 t20 0 M18 76 q10 -7 20 0 t20 0 t20 0" stroke={C.blue} strokeWidth="4" fill="none" strokeLinecap="round" />
  </g>
))

// cyclist
def('🚴', () => (
  <g>
    <circle cx="26" cy="72" r="16" fill="none" stroke={O} strokeWidth="3" />
    <circle cx="74" cy="72" r="16" fill="none" stroke={O} strokeWidth="3" />
    <path d="M26 72 L46 50 H66 L74 72 M46 50 L38 72 H62" stroke={C.red} strokeWidth="4" fill="none" strokeLinejoin="round" />
    <circle cx="50" cy="22" r="9" fill={C.skin} {...st} />
    <path d="M41 21 a9 9 0 0 1 18 0 q-4 -5 -9 -5 q-5 0 -9 5z" fill={C.hair} {...st} />
    <path d="M50 31 L52 52 M52 40 L66 50 M52 52 L44 66 L56 70" stroke={C.green} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </g>
))

// raised fist
def('✊', () => (
  <g>
    <rect x="38" y="52" width="24" height="40" rx="8" fill={C.red} {...st} />
    <rect x="34" y="20" width="32" height="38" rx="14" fill={C.skin} {...st} />
    <path d="M34 40 h32 M42 20 v18 M50 20 v18 M58 20 v18" stroke={C.skinD} strokeWidth="2" fill="none" />
    <rect x="30" y="36" width="12" height="22" rx="6" fill={C.skin} {...st} transform="rotate(-18 36 47)" />
  </g>
))

// happy / hungry face
def('😋', () => (
  <g>
    <circle cx="50" cy="50" r="34" fill={C.yellow} {...st} />
    <circle cx="38" cy="42" r="3.2" fill={O} />
    <circle cx="62" cy="42" r="3.2" fill={O} />
    <path d="M32 54 q18 22 36 0z" fill={O} />
    <path d="M44 62 q6 8 12 0" fill={C.pink} stroke="none" />
  </g>
))
