import { C, O, def, st } from './kit'

const Win = ({ x, y, w = 12, h = 12, c = C.sky }) => <rect x={x} y={y} width={w} height={h} rx="1.5" fill={c} {...st} strokeWidth="1.6" />

// ---- buildings ------------------------------------------------------------------------------------------------
def('🏠', () => (
  <g>
    <rect x="16" y="44" width="68" height="44" fill="#F3DFB8" {...st} />
    <path d="M8 46 L50 12 L92 46Z" fill={C.red} {...st} />
    <rect x="42" y="62" width="16" height="26" rx="2" fill={C.brown} {...st} />
    <Win x={22} y={54} /><Win x={66} y={54} />
    <rect x="66" y="16" width="9" height="18" fill={C.brown} {...st} />
  </g>
))
def('🏡', () => (
  <g>
    <rect x="16" y="48" width="68" height="40" fill="#E9CB93" {...st} />
    <path d="M6 50 Q50 -2 94 50 Q50 38 6 50z" fill={C.straw} {...st} />
    <path d="M18 44 Q50 22 82 44 M24 38 Q50 20 76 38" stroke="#C9A64C" strokeWidth="2" fill="none" />
    <rect x="42" y="62" width="16" height="26" rx="8" fill={C.brown} {...st} />
    <Win x={22} y={60} w={13} h={11} /><Win x={65} y={60} w={13} h={11} />
    <path d="M6 90 H94" stroke={C.green} strokeWidth="5" strokeLinecap="round" />
  </g>
))
def('🏫', () => (
  <g>
    <rect x="10" y="40" width="80" height="48" fill="#F3D9A4" {...st} />
    <path d="M6 42 L50 14 L94 42Z" fill={C.red} {...st} />
    <circle cx="50" cy="32" r="8" fill={C.white} {...st} /><path d="M50 27 v5 l4 2" stroke={O} strokeWidth="1.8" fill="none" />
    <rect x="42" y="64" width="16" height="24" rx="2" fill={C.brown} {...st} />
    {[16, 30, 66, 80].map((x) => <Win key={x} x={x - 4} y={52} w={10} h={12} />)}
    <path d="M70 40 V10 M70 10 h14 v8 h-14" stroke={O} strokeWidth="2" fill={C.green} />
  </g>
))
def('🕌', () => (
  <g>
    <path d="M14 88 V54 H86 V88Z" fill="#F3EAD3" {...st} />
    <path d="M30 54 a20 20 0 0 1 40 0z" fill={C.teal} {...st} />
    <path d="M50 34 V22 M44 24 a6 6 0 1 1 6 6" stroke={O} strokeWidth="2" fill="none" />
    <rect x="6" y="28" width="10" height="60" fill="#F3EAD3" {...st} /><path d="M6 28 l5 -14 l5 14z" fill={C.teal} {...st} />
    <rect x="84" y="28" width="10" height="60" fill="#F3EAD3" {...st} /><path d="M84 28 l5 -14 l5 14z" fill={C.teal} {...st} />
    <path d="M42 88 V72 a8 8 0 0 1 16 0 V88Z" fill={C.brown} {...st} />
  </g>
))
def('🏥', () => (
  <g>
    <rect x="14" y="30" width="72" height="58" fill={C.white} {...st} />
    <rect x="38" y="6" width="24" height="24" rx="3" fill={C.red} {...st} />
    <path d="M50 11 v14 M43 18 h14" stroke={C.white} strokeWidth="5" />
    <rect x="42" y="62" width="16" height="26" fill={C.sky} {...st} />
    {[20, 66].map((x) => <g key={x}><Win x={x} y={40} w={14} h={12} /><Win x={x} y={62} w={14} h={12} /></g>)}
  </g>
))
def('🏛️', () => (
  <g>
    <path d="M6 36 L50 8 L94 36Z" fill="#E8DCC0" {...st} />
    <rect x="10" y="36" width="80" height="8" fill="#E8DCC0" {...st} />
    {[18, 34, 50, 66, 82].map((x) => <rect key={x} x={x - 4} y="44" width="8" height="38" fill="#F3EAD3" {...st} />)}
    <rect x="6" y="82" width="88" height="8" fill="#E8DCC0" {...st} />
  </g>
))
def('🛕', () => (
  <g>
    <path d="M10 88 V56 H90 V88Z" fill="#C9744A" {...st} />
    <path d="M6 58 Q50 28 94 58 Q50 46 6 58z" fill="#A85B36" {...st} />
    <path d="M22 44 Q50 18 78 44 Q50 36 22 44z" fill="#A85B36" {...st} />
    <path d="M38 28 L50 6 L62 28z" fill="#C9744A" {...st} /><path d="M50 6 V0" stroke={O} strokeWidth="2" />
    <path d="M40 88 V70 a10 10 0 0 1 20 0 V88Z" fill="#7B3F22" {...st} />
    {[20, 80].map((x) => <path key={x} d={`M${x - 6} 66 h12 v16 h-12z`} fill="none" stroke="#7B3F22" strokeWidth="2" />)}
  </g>
))
def('🎪', () => (
  <g>
    <path d="M10 88 L22 36 H78 L90 88Z" fill={C.red} {...st} />
    <path d="M22 36 L50 8 L78 36Z" fill={C.red} {...st} />
    {[34, 50, 66].map((x, i) => <path key={x} d={`M50 8 L${x + (i - 1) * 6} 36 L${x + 8} 36z`} fill={i === 1 ? C.white : C.red} {...st} />)}
    <path d="M40 88 L50 54 L60 88Z" fill={C.navy} {...st} />
    <path d="M50 8 V2 M50 2 h10 v6 h-10" stroke={O} strokeWidth="2" fill={C.yellow} />
  </g>
))
def('🏙️', () => (
  <g>
    {[[8, 40, 22], [28, 18, 24], [50, 30, 20], [68, 12, 24]].map(([x, y, w], i) => (
      <g key={i}>
        <rect x={x} y={y + 6} width={w} height={90 - y - 6} fill={['#C9B9A0', '#A9B8C9', '#D6C2A0', '#9FB0BF'][i]} {...st} />
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>{[0, 1].map((c) => <rect key={c} x={x + 4 + c * (w / 2 - 2)} y={y + 14 + r * 14} width="6" height="8" fill={C.white} opacity=".8" />)}</g>
        ))}
      </g>
    ))}
    <rect x="4" y="88" width="92" height="4" fill={O} />
  </g>
))
def('🏖️', () => (
  <g>
    <path d="M4 74 Q50 56 96 74 V90 H4Z" fill="#F3D9A4" {...st} />
    <path d="M50 20 V76" stroke={C.brown} strokeWidth="4" strokeLinecap="round" />
    <path d="M14 40 Q50 -6 86 40z" fill={C.red} {...st} /><path d="M32 40 Q50 -4 50 40 M50 40 Q50 -4 68 40" stroke={C.white} strokeWidth="5" fill="none" />
    <path d="M10 86 q10 -6 20 0 t20 0 t20 0 t20 0" stroke={C.blue} strokeWidth="3" fill="none" strokeLinecap="round" />
  </g>
))
def('⛱️', () => (
  <g>
    <path d="M50 24 V86" stroke={C.brown} strokeWidth="4" strokeLinecap="round" />
    <path d="M12 46 Q50 -4 88 46z" fill={C.orange} {...st} /><path d="M30 46 Q50 0 50 46 M50 46 Q50 0 70 46" stroke={C.white} strokeWidth="5" fill="none" />
    <path d="M10 88 H90" stroke="#E8C98A" strokeWidth="6" strokeLinecap="round" />
  </g>
))
def('🏗️', () => (
  <g>
    <path d="M30 90 V20 H50 M30 20 L68 20 L88 8" stroke={C.orange} strokeWidth="5" fill="none" strokeLinejoin="round" />
    <path d="M30 40 L50 20 M30 60 L50 40" stroke={C.orange} strokeWidth="3" />
    <path d="M80 12 V40" stroke={O} strokeWidth="2" /><rect x="72" y="40" width="16" height="12" fill={C.steel} {...st} />
    <rect x="14" y="84" width="60" height="6" fill={C.dgrey} {...st} />
  </g>
))
def('🏺', () => (
  <g>
    <path d="M38 16 h24 l-4 14 q22 8 22 34 q0 24 -30 24 q-30 0 -30 -24 q0 -26 22 -34z" fill="#C9744A" {...st} />
    <path d="M30 56 h40 M30 66 h40" stroke="#A85B36" strokeWidth="3" /><ellipse cx="50" cy="16" rx="12" ry="4" fill="#A85B36" {...st} />
  </g>
))
def('🚦', () => (
  <g>
    <path d="M50 90 V40" stroke={C.dgrey} strokeWidth="5" />
    <rect x="34" y="6" width="32" height="56" rx="8" fill={O} />
    <circle cx="50" cy="20" r="7" fill={C.red} /><circle cx="50" cy="34" r="7" fill={C.yellow} /><circle cx="50" cy="48" r="7" fill={C.green} />
  </g>
))

// ---- vehicles -------------------------------------------------------------------------------------------------
def('🚌', () => (
  <g>
    <rect x="6" y="26" width="88" height="48" rx="10" fill={C.yellow} {...st} />
    <rect x="6" y="52" width="88" height="8" fill={C.red} />
    {[12, 30, 48, 66].map((x) => <Win key={x} x={x} y={32} w={15} h={14} />)}
    <rect x="80" y="32" width="10" height="20" rx="2" fill={C.sky} {...st} strokeWidth="1.6" />
    <circle cx="26" cy="76" r="9" fill={O} /><circle cx="26" cy="76" r="3.5" fill={C.steel} />
    <circle cx="74" cy="76" r="9" fill={O} /><circle cx="74" cy="76" r="3.5" fill={C.steel} />
  </g>
))
def('🚗', () => (
  <g>
    <path d="M6 68 V54 q0 -6 8 -8 l14 -4 q8 -14 20 -14 h8 q10 0 16 14 l10 4 q8 2 8 8 V68Z" fill={C.red} {...st} />
    <path d="M34 42 q6 -10 14 -10 h6 v12z M60 32 q8 2 12 12 H60z" fill={C.sky} {...st} strokeWidth="1.6" />
    <circle cx="28" cy="70" r="10" fill={O} /><circle cx="28" cy="70" r="4" fill={C.steel} />
    <circle cx="72" cy="70" r="10" fill={O} /><circle cx="72" cy="70" r="4" fill={C.steel} />
  </g>
))
// the Bangladeshi cycle rickshaw: rear seat under a bright hood, one wheel at the front
const Rickshaw = () => (
  <g>
    <circle cx="22" cy="72" r="15" fill="none" stroke={O} strokeWidth="3.5" /><circle cx="22" cy="72" r="2.5" fill={O} />
    <circle cx="70" cy="72" r="15" fill="none" stroke={O} strokeWidth="3.5" /><circle cx="70" cy="72" r="2.5" fill={O} />
    <path d="M22 72 L38 56 H58 L70 72 M38 56 L30 72 H58" stroke={C.green} strokeWidth="3.5" fill="none" strokeLinejoin="round" />
    <rect x="42" y="38" width="38" height="8" rx="3" fill={C.red} {...st} />
    <path d="M44 38 Q60 6 80 30 L80 40 H44Z" fill={C.yellow} {...st} />
    <path d="M48 36 Q60 14 74 30" stroke={C.red} strokeWidth="3" fill="none" />
    <path d="M42 46 H82 V58 H42z" fill={C.pink} {...st} />
    <path d="M30 46 q8 -4 14 0" stroke={O} strokeWidth="3" fill="none" strokeLinecap="round" />
  </g>
)
def('🛺', Rickshaw)
def('🛶', () => (
  <g>
    <path d="M4 56 Q8 40 18 48 Q50 70 82 48 Q92 40 96 56 Q96 72 50 74 Q4 72 4 56Z" fill={C.brown} {...st} />
    <path d="M10 58 Q50 72 90 58" stroke="#6C4126" strokeWidth="3" fill="none" />
    <path d="M30 50 Q50 18 70 50z" fill={C.straw} {...st} /><path d="M38 50 Q50 28 62 50" stroke="#C9A64C" strokeWidth="2" fill="none" />
    <path d="M64 70 L90 30" stroke={C.wood} strokeWidth="4" strokeLinecap="round" /><path d="M86 24 l10 12 l-8 4z" fill={C.wood} {...st} />
  </g>
))
def('⛵', () => (
  <g>
    <path d="M50 12 V66" stroke={C.brown} strokeWidth="3.5" />
    <path d="M52 14 Q84 36 86 62 H52z" fill={C.white} {...st} /><path d="M48 24 Q24 40 16 62 H48z" fill="#FBE3B0" {...st} />
    <path d="M8 66 H92 L82 82 H18Z" fill={C.red} {...st} />
  </g>
))
def('🚤', () => (
  <g>
    <path d="M6 54 H94 L80 78 H22Z" fill={C.white} {...st} />
    <path d="M10 62 H88" stroke={C.blue} strokeWidth="5" />
    <rect x="26" y="30" width="46" height="24" rx="4" fill={C.sky} {...st} /><rect x="22" y="24" width="54" height="8" rx="3" fill={C.red} {...st} />
    {[32, 46, 60].map((x) => <rect key={x} x={x} y="36" width="8" height="10" fill={C.white} stroke={O} strokeWidth="1.2" />)}
    <path d="M6 86 q10 -6 20 0 t20 0 t20 0 t20 0" stroke={C.blue} strokeWidth="3" fill="none" strokeLinecap="round" />
  </g>
))
def('🚢', () => (
  <g>
    <path d="M6 56 H94 L80 82 H20Z" fill={C.navy} {...st} />
    <rect x="12" y="46" width="76" height="10" fill={C.red} {...st} />
    {[18, 34, 50, 66].map((x, i) => <rect key={x} x={x} y="30" width="12" height="16" fill={['#E8A23A', '#2AA39C', '#C65D5D', '#8A63B8'][i]} {...st} />)}
    <rect x="62" y="12" width="20" height="18" fill={C.white} {...st} /><rect x="68" y="4" width="8" height="10" fill={C.red} {...st} />
    <path d="M8 88 q10 -6 20 0 t20 0 t20 0 t20 0" stroke={C.blue} strokeWidth="3" fill="none" strokeLinecap="round" />
  </g>
))
def('🚜', () => (
  <g>
    <rect x="46" y="26" width="34" height="34" rx="4" fill={C.green} {...st} />
    <rect x="10" y="40" width="40" height="22" rx="4" fill={C.green} {...st} />
    <rect x="52" y="30" width="22" height="16" fill={C.sky} {...st} strokeWidth="1.6" />
    <circle cx="68" cy="68" r="17" fill={O} /><circle cx="68" cy="68" r="7" fill={C.yellow} />
    <circle cx="24" cy="76" r="10" fill={O} /><circle cx="24" cy="76" r="4" fill={C.yellow} />
    <rect x="14" y="26" width="5" height="16" fill={O} />
  </g>
))
def('🚀', () => (
  <g>
    <path d="M50 6 q22 22 16 56 h-32 q-6 -34 16 -56z" fill={C.white} {...st} />
    <circle cx="50" cy="34" r="8" fill={C.sky} {...st} />
    <path d="M34 50 l-14 18 l16 -4z M66 50 l14 18 l-16 -4z" fill={C.red} {...st} />
    <path d="M42 64 q8 26 16 0z" fill={C.orange} {...st} />
  </g>
))
def('🚂', () => (
  <g>
    <rect x="8" y="34" width="50" height="34" rx="4" fill={C.dgrey} {...st} />
    <rect x="58" y="22" width="30" height="46" rx="4" fill={C.red} {...st} />
    <rect x="64" y="28" width="18" height="14" fill={C.sky} {...st} strokeWidth="1.6" />
    <rect x="14" y="16" width="14" height="18" fill={O} />
    {[22, 44, 70].map((x) => <circle key={x} cx={x} cy="72" r="10" fill={O} />)}
  </g>
))
def('✈️', () => (
  <g>
    <path d="M50 4 q8 0 8 12 V36 L94 56 V66 L58 54 V74 L70 82 V90 L50 84 L30 90 V82 L42 74 V54 L6 66 V56 L42 36 V16 q0 -12 8 -12z" fill={C.white} {...st} />
  </g>
))
def('⚓', () => (
  <g fill="none" stroke={C.navy} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="50" cy="18" r="8" />
    <path d="M50 26 V84 M32 40 H68 M14 60 q4 28 36 26 q32 2 36 -26 M14 60 l-6 8 M86 60 l6 8" />
  </g>
))

// ---- landmarks (not emoji, named by key) -------------------------------------------------------------------------
// Shaheed Minar, Dhaka: a tall central panel with two leaning panels on each side, in front of a red sun disc
def('minar', () => (
  <g>
    <circle cx="50" cy="38" r="20" fill={C.red} opacity=".9" />
    <path d="M6 90 H94 V82 H6z" fill="#E8DCC0" {...st} /><path d="M14 82 H86 V74 H14z" fill="#F3EAD3" {...st} />
    <path d="M42 74 L44 14 L56 14 L58 74z" fill="#F3EAD3" {...st} />
    <path d="M30 74 L22 24 L33 28 L38 74z M70 74 L78 24 L67 28 L62 74z" fill="#E8DCC0" {...st} />
    <path d="M18 74 L8 38 L18 40 L26 74z M82 74 L92 38 L82 40 L74 74z" fill="#F3EAD3" {...st} />
    <path d="M50 20 V70" stroke={C.steel} strokeWidth="2" />
  </g>
), 1.3)
// Paharpur Buddhist Vihara: a vast stepped terracotta terrace
def('vihara', () => (
  <g>
    <path d="M4 88 H96 V78 H4z" fill="#B8683F" {...st} />
    <path d="M12 78 H88 V66 H12z" fill="#C9744A" {...st} />
    <path d="M22 66 H78 V52 H22z" fill="#B8683F" {...st} />
    <path d="M32 52 H68 V38 H32z" fill="#C9744A" {...st} />
    <path d="M40 38 H60 V22 H40z" fill="#B8683F" {...st} />
    <path d="M44 22 L50 8 L56 22z" fill="#A85B36" {...st} />
    <path d="M44 88 V78 M44 78 H56 V88" stroke={O} strokeWidth="2" fill="none" />
    <path d="M18 72 h64 M28 59 h44 M36 45 h28" stroke="#8B4A2B" strokeWidth="1.8" strokeDasharray="4 3" />
  </g>
), 1.3)
// Sixty Dome Mosque, Bagerhat: a wide low building crowned with many small domes
def('domes', () => (
  <g>
    <rect x="8" y="52" width="84" height="38" fill="#CBB98F" {...st} />
    {[18, 34, 50, 66, 82].map((x) => <path key={x} d={`M${x - 9} 52 a9 9 0 0 1 18 0z`} fill="#B8A27A" {...st} strokeWidth="1.6" />)}
    {[26, 42, 58, 74].map((x) => <path key={x} d={`M${x - 8} 52 a8 8 0 0 1 16 0z`} fill="#CBB98F" {...st} strokeWidth="1.6" />)}
    <path d="M36 52 a14 14 0 0 1 28 0z" fill="#A89368" {...st} /><path d="M50 38 v-8" stroke={O} strokeWidth="2" />
    <path d="M18 90 V74 a6 6 0 0 1 12 0 V90 M44 90 V70 a6 6 0 0 1 12 0 V90 M70 90 V74 a6 6 0 0 1 12 0 V90" fill="#6B4A2B" {...st} strokeWidth="1.6" />
  </g>
), 1.3)
