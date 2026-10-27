import { C, O, def, st } from './kit'

// ---- school & home ---------------------------------------------------------------------------------------------
def('📖', () => (
  <g>
    <path d="M8 24 Q30 18 50 28 Q70 18 92 24 V76 Q70 70 50 80 Q30 70 8 76Z" fill={C.white} {...st} />
    <path d="M50 28 V80" stroke={O} strokeWidth="2" />
    <path d="M16 36 q16 -2 28 4 M16 46 q16 -2 28 4 M16 56 q16 -2 28 4 M56 40 q12 -6 28 -4 M56 50 q12 -6 28 -4 M56 60 q12 -6 28 -4" stroke={C.steel} strokeWidth="2" fill="none" />
  </g>
))
def('📚', () => (
  <g>
    <rect x="12" y="62" width="76" height="22" rx="3" fill={C.blue} {...st} />
    <rect x="18" y="40" width="64" height="22" rx="3" fill={C.red} {...st} />
    <rect x="24" y="18" width="52" height="22" rx="3" fill={C.green} {...st} />
    <path d="M18 73 h64 M24 51 h52 M30 29 h40" stroke={C.white} strokeWidth="2.5" />
  </g>
))
def('📓', () => (
  <g>
    <rect x="22" y="10" width="58" height="80" rx="5" fill={C.white} {...st} />
    <rect x="22" y="10" width="14" height="80" rx="4" fill={C.teal} {...st} />
    <rect x="42" y="22" width="30" height="16" fill={C.cream} stroke={O} strokeWidth="1.6" />
    <path d="M44 28 h26 M44 33 h18" stroke={O} strokeWidth="1.6" />
  </g>
))
def('🖊️', () => (
  <g transform="rotate(35 50 50)">
    <rect x="42" y="6" width="16" height="64" rx="4" fill={C.blue} {...st} />
    <path d="M42 70 H58 L50 92Z" fill={C.skinL} {...st} /><path d="M47 84 h6 l-3 8z" fill={O} />
    <rect x="42" y="6" width="16" height="12" rx="4" fill={C.navy} {...st} />
  </g>
))
def('🎒', () => (
  <g>
    <path d="M30 24 Q50 -2 70 24" stroke={O} strokeWidth="4" fill="none" />
    <rect x="20" y="24" width="60" height="64" rx="16" fill={C.red} {...st} />
    <rect x="30" y="52" width="40" height="26" rx="8" fill="#C94E3C" {...st} />
    <rect x="42" y="60" width="16" height="6" rx="3" fill={C.yellow} {...st} strokeWidth="1.6" />
  </g>
))
def('👟', () => (
  <g>
    <path d="M10 66 V34 q16 0 22 14 l30 10 q24 4 28 16 v6 H10z" fill={C.white} {...st} />
    <path d="M10 72 H92" stroke={C.red} strokeWidth="8" />
    <path d="M30 50 l6 -6 M40 54 l6 -6 M50 58 l6 -6" stroke={C.blue} strokeWidth="3" strokeLinecap="round" />
  </g>
))
def('☂️', () => (
  <g>
    <path d="M50 28 V80 q0 10 -10 10" stroke={O} strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M6 50 Q50 -16 94 50 q-12 -8 -22 0 q-10 -8 -22 0 q-10 -8 -22 0 q-10 -8 -22 0z" fill={C.red} {...st} />
    <path d="M50 8 Q40 24 28 46 M50 8 Q60 24 72 46" stroke={C.coral} strokeWidth="3" fill="none" />
  </g>
))
def('💵', () => (
  <g>
    <rect x="8" y="30" width="84" height="44" rx="5" fill="#9CCB8F" {...st} />
    <rect x="14" y="36" width="72" height="32" rx="3" fill="none" stroke={C.dark} strokeWidth="1.8" />
    <circle cx="50" cy="52" r="11" fill="#D6EBC9" {...st} strokeWidth="1.8" />
    <text x="50" y="58" textAnchor="middle" fontSize="16" fontWeight="900" fill={C.dark}>৳</text>
  </g>
))
def('🛍️', () => (
  <g>
    <path d="M26 30 H74 L80 90 H20Z" fill={C.pink} {...st} />
    <path d="M38 36 V24 a12 12 0 0 1 24 0 V36" stroke={O} strokeWidth="3.5" fill="none" strokeLinecap="round" />
    <circle cx="50" cy="60" r="9" fill={C.white} opacity=".7" />
  </g>
))
def('🧸 🪆', () => ( // a rag doll (the word is পুতুল)
  <g>
    <circle cx="50" cy="26" r="16" fill={C.skinL} {...st} />
    <path d="M34 24 a16 16 0 0 1 32 0 q-6 -8 -16 -8 q-10 0 -16 8z" fill={C.hair} {...st} />
    <circle cx="28" cy="30" r="7" fill={C.hair} {...st} /><circle cx="72" cy="30" r="7" fill={C.hair} {...st} />
    <circle cx="44" cy="28" r="1.8" fill={O} /><circle cx="56" cy="28" r="1.8" fill={O} /><path d="M45 34 q5 4 10 0" stroke={O} strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <circle cx="40" cy="33" r="3" fill={C.pink} opacity=".6" /><circle cx="60" cy="33" r="3" fill={C.pink} opacity=".6" />
    <path d="M32 44 H68 L74 88 H26Z" fill={C.purple} {...st} />
    <path d="M32 48 L18 64 M68 48 L82 64" stroke={C.skinL} strokeWidth="8" strokeLinecap="round" />
    <path d="M34 70 h32" stroke={C.yellow} strokeWidth="3" />
  </g>
))
def('🪑', () => (
  <g>
    <path d="M30 14 V60 M70 14 V60" stroke={C.brown} strokeWidth="6" strokeLinecap="round" />
    <rect x="30" y="20" width="40" height="22" rx="3" fill={C.wood} {...st} />
    <rect x="22" y="56" width="56" height="10" rx="3" fill={C.wood} {...st} />
    <path d="M26 66 V90 M74 66 V90" stroke={C.brown} strokeWidth="6" strokeLinecap="round" />
  </g>
))
def('🪟', () => (
  <g>
    <rect x="14" y="12" width="72" height="76" rx="3" fill={C.brown} {...st} />
    <rect x="22" y="20" width="56" height="60" fill={C.sky} {...st} strokeWidth="1.6" />
    <path d="M50 20 V80 M22 50 H78" stroke={C.brown} strokeWidth="4" />
  </g>
))
def('🛏️', () => (
  <g>
    <rect x="6" y="26" width="8" height="62" rx="3" fill={C.brown} {...st} />
    <rect x="86" y="46" width="8" height="42" rx="3" fill={C.brown} {...st} />
    <rect x="10" y="56" width="82" height="20" rx="4" fill={C.blue} {...st} />
    <rect x="10" y="46" width="82" height="14" rx="4" fill={C.white} {...st} />
    <rect x="14" y="38" width="26" height="14" rx="6" fill={C.cream} {...st} />
  </g>
))
def('⏰', () => (
  <g>
    <circle cx="26" cy="22" r="11" fill={C.red} {...st} /><circle cx="74" cy="22" r="11" fill={C.red} {...st} />
    <circle cx="50" cy="54" r="34" fill={C.red} {...st} /><circle cx="50" cy="54" r="26" fill={C.white} {...st} />
    <path d="M50 54 V38 M50 54 L62 60" stroke={O} strokeWidth="3.5" strokeLinecap="round" />
    <path d="M30 88 l-6 6 M70 88 l6 6" stroke={O} strokeWidth="4" strokeLinecap="round" />
  </g>
))
def('🕒', () => (
  <g>
    <circle cx="50" cy="50" r="38" fill={C.wood} {...st} /><circle cx="50" cy="50" r="30" fill={C.white} {...st} />
    {Array.from({ length: 12 }).map((_, i) => <path key={i} d="M50 24 v4" stroke={O} strokeWidth="2" transform={`rotate(${i * 30} 50 50)`} />)}
    <path d="M50 50 V32 M50 50 L66 58" stroke={O} strokeWidth="3.5" strokeLinecap="round" />
  </g>
))
def('🔔', () => (
  <g>
    <path d="M50 12 q-24 6 -24 34 v16 l-10 12 H84 l-10 -12 V46 q0 -28 -24 -34z" fill={C.yellow} {...st} />
    <circle cx="50" cy="82" r="8" fill={C.orange} {...st} />
  </g>
))
def('⚽', () => (
  <g>
    <circle cx="50" cy="50" r="34" fill={C.white} {...st} />
    <path d="M50 34 L64 44 L58 60 H42 L36 44Z" fill={O} />
    <path d="M50 34 V16 M64 44 L80 38 M58 60 L68 74 M42 60 L32 74 M36 44 L20 38" stroke={O} strokeWidth="2.4" />
  </g>
))
def('🧵', () => (
  <g>
    <rect x="22" y="14" width="56" height="10" rx="3" fill={C.brown} {...st} /><rect x="22" y="76" width="56" height="10" rx="3" fill={C.brown} {...st} />
    <rect x="26" y="24" width="48" height="52" fill={C.pink} {...st} />
    {[32, 40, 48, 56, 64].map((y) => <path key={y} d={`M26 ${y} h48`} stroke="#D96A8C" strokeWidth="1.6" />)}
    <path d="M74 60 q16 4 12 22" stroke={C.pink} strokeWidth="3" fill="none" strokeLinecap="round" />
  </g>
))
def('🧼', () => (
  <g>
    <rect x="14" y="40" width="72" height="36" rx="14" fill={C.sky} {...st} />
    <circle cx="30" cy="22" r="9" fill={C.white} {...st} strokeWidth="1.6" /><circle cx="56" cy="14" r="6" fill={C.white} {...st} strokeWidth="1.6" /><circle cx="74" cy="26" r="8" fill={C.white} {...st} strokeWidth="1.6" />
  </g>
))
def('🚿', () => (
  <g>
    <path d="M20 90 V22 q0 -14 16 -14 h26" stroke={C.steel} strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M52 8 L90 8 L84 26 H58Z" fill={C.steel} {...st} />
    {[60, 68, 76, 84].map((x) => <path key={x} d={`M${x} 34 v${10 + (x % 3) * 6} M${x - 4} 54 v10`} stroke={C.blue} strokeWidth="3" strokeLinecap="round" />)}
  </g>
))
def('🕯️', () => (
  <g>
    <rect x="34" y="40" width="32" height="50" rx="5" fill="#FBEFD0" {...st} />
    <path d="M50 38 V32" stroke={O} strokeWidth="2.5" />
    <path d="M50 8 q-14 14 0 26 q14 -12 0 -26z" fill={C.orange} {...st} /><path d="M50 18 q-6 7 0 13 q6 -6 0 -13z" fill={C.yellow} />
  </g>
))
def('📜', () => (
  <g>
    <path d="M24 16 h50 q8 0 8 10 V70 q0 12 -10 12 H30 q-10 0 -10 -12" fill={C.cream} {...st} />
    <path d="M24 16 q-10 0 -10 10 q0 8 10 8 h8" fill="#E9D9B0" {...st} />
    <path d="M36 32 h34 M36 44 h34 M36 56 h26" stroke={C.brown} strokeWidth="2.4" strokeLinecap="round" />
  </g>
))
def('🗺️', () => (
  <g>
    <path d="M8 22 L34 14 L64 24 L92 14 V78 L64 88 L34 78 L8 86Z" fill="#F3E4B8" {...st} />
    <path d="M34 14 V78 M64 24 V88" stroke={O} strokeWidth="1.8" />
    <path d="M18 56 q14 -14 26 -4 t16 -6 M70 40 q10 6 14 -2" stroke={C.blue} strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M50 30 l5 -8 l5 8z" fill={C.red} {...st} strokeWidth="1.4" />
  </g>
))
def('🗳️', () => (
  <g>
    <rect x="14" y="44" width="72" height="46" rx="4" fill={C.blue} {...st} />
    <rect x="30" y="46" width="40" height="6" rx="2" fill={O} />
    <rect x="30" y="8" width="40" height="46" rx="2" fill={C.white} {...st} transform="rotate(-6 50 30)" />
    <path d="M38 24 l6 7 l12 -14" stroke={C.green} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-6 50 30)" />
  </g>
))
def('✂️', () => (
  <g>
    <circle cx="26" cy="72" r="12" fill="none" stroke={C.red} strokeWidth="6" /><circle cx="74" cy="72" r="12" fill="none" stroke={C.red} strokeWidth="6" />
    <path d="M34 62 L80 12 M66 62 L20 12" stroke={C.steel} strokeWidth="7" strokeLinecap="round" />
  </g>
))
def('🕸️', () => ( // a fishing net
  <g stroke={O} strokeWidth="2" fill="none" strokeLinecap="round">
    <path d="M8 20 Q50 0 92 20 L70 88 Q50 96 30 88Z" fill="#E9E1C8" fillOpacity=".5" />
    {[24, 38, 52, 66, 80].map((x) => <path key={x} d={`M${x} 12 L${50 + (x - 50) * 0.6} 92`} />)}
    {[28, 42, 56, 70].map((y) => <path key={y} d={`M${12 + (y - 20) * 0.3} ${y} Q50 ${y + 8} ${88 - (y - 20) * 0.3} ${y}`} />)}
  </g>
))
def('🍯', () => (
  <g>
    <path d="M26 30 H74 q8 14 4 40 q-2 18 -28 18 q-26 0 -28 -18 q-4 -26 4 -40z" fill={C.orange} {...st} />
    <rect x="24" y="18" width="52" height="14" rx="5" fill={C.brown} {...st} />
    <rect x="34" y="44" width="32" height="26" rx="4" fill={C.cream} {...st} /><text x="50" y="64" textAnchor="middle" fontSize="16" fontWeight="900" fill={C.brown}>মধু</text>
  </g>
))
def('🪕', () => ( // dotara, a Bengali folk lute
  <g transform="rotate(30 50 50)">
    <rect x="46" y="2" width="8" height="46" rx="3" fill={C.brown} {...st} />
    <ellipse cx="50" cy="66" rx="20" ry="24" fill={C.wood} {...st} /><circle cx="50" cy="66" r="7" fill={O} />
    <path d="M47 14 V86 M53 14 V86" stroke={C.white} strokeWidth="1.2" />
  </g>
))
def('🎸', () => (
  <g transform="rotate(35 50 50)">
    <rect x="46" y="2" width="8" height="44" rx="3" fill={C.brown} {...st} />
    <path d="M50 44 q-24 0 -22 22 q2 18 22 18 q20 0 22 -18 q2 -22 -22 -22z" fill={C.red} {...st} /><circle cx="50" cy="66" r="6" fill={O} />
  </g>
))
def('🎶', () => (
  <g>
    <path d="M30 76 V26 L74 14 V64" stroke={O} strokeWidth="5" fill="none" strokeLinejoin="round" />
    <ellipse cx="24" cy="78" rx="11" ry="8" fill={C.purple} {...st} /><ellipse cx="68" cy="66" rx="11" ry="8" fill={C.purple} {...st} />
  </g>
))
def('❤️', () => (
  <path d="M50 88 C-4 52 14 10 50 34 C86 10 104 52 50 88z" fill={C.red} {...st} />
))
def('🎈', () => (
  <g>
    <path d="M50 74 q-4 8 4 12 q-6 4 0 10" stroke={O} strokeWidth="2" fill="none" />
    <path d="M50 8 q30 4 28 30 q-2 22 -28 34 q-26 -12 -28 -34 q-2 -26 28 -30z" fill={C.red} {...st} />
    <path d="M44 72 h12 l-6 -6z" fill="#C94E3C" {...st} /><ellipse cx="38" cy="30" rx="5" ry="9" fill={C.white} opacity=".5" />
  </g>
))
def('🎉', () => (
  <g>
    <path d="M10 90 L30 40 L60 70Z" fill={C.orange} {...st} /><path d="M20 70 q10 -6 18 -2" stroke={C.red} strokeWidth="3" fill="none" />
    <path d="M48 28 q10 -14 22 -8 M66 44 q14 -4 20 6 M52 14 l2 -8 M74 30 l8 -6" stroke={C.pink} strokeWidth="3.5" fill="none" strokeLinecap="round" />
    <circle cx="60" cy="20" r="3.5" fill={C.blue} /><circle cx="84" cy="36" r="3.5" fill={C.green} /><circle cx="42" cy="14" r="3.5" fill={C.yellow} />
  </g>
))
def('🎆', () => (
  <g strokeLinecap="round" strokeWidth="4">
    {Array.from({ length: 12 }).map((_, i) => (
      <path key={i} d="M50 50 V16" stroke={[C.red, C.yellow, C.orange, C.pink][i % 4]} transform={`rotate(${i * 30} 50 50)`} />
    ))}
    <circle cx="50" cy="50" r="5" fill={C.yellow} />
  </g>
))
def('🇧🇩', () => (
  <g>
    <path d="M18 8 V94" stroke={C.brown} strokeWidth="4" strokeLinecap="round" />
    <path d="M18 12 H88 V68 H18z" fill="#0A7B3E" {...st} />
    <circle cx="48" cy="40" r="17" fill={C.red} stroke="none" />
  </g>
))
// ---- clothes ---------------------------------------------------------------------------------------------------
def('👗', () => (
  <g>
    <path d="M38 8 h24 v14 l12 12 l-6 56 H32 l-6 -56 l12 -12z" fill={C.pink} {...st} />
    <path d="M36 34 h28" stroke={C.red} strokeWidth="4" /><path d="M42 8 q8 14 16 0" fill="none" stroke={O} strokeWidth="2" />
  </g>
))
def('👘', () => (
  <g>
    <path d="M30 8 L70 8 L90 90 H10Z" fill={C.red} {...st} />
    <path d="M30 8 Q50 40 70 8" fill={C.yellow} {...st} />
    <path d="M10 76 H90 M12 82 H88" stroke={C.yellow} strokeWidth="5" />
    <path d="M70 8 L90 90" stroke={C.orange} strokeWidth="6" />
  </g>
))
def('👕', () => (
  <g>
    <path d="M34 12 q16 14 32 0 L92 26 L80 46 L70 40 V88 H30 V40 L20 46 L8 26Z" fill={C.blue} {...st} />
  </g>
))
// ---- food ------------------------------------------------------------------------------------------------------
def('🥛', () => (
  <g>
    <path d="M26 14 H74 L66 88 H34Z" fill={C.white} {...st} />
    <path d="M28 30 H72 L68 80 q-18 8 -36 0z" fill="#F3F3FA" /><path d="M26 14 H74 L72 28 H28Z" fill="#DCE9F5" {...st} />
  </g>
))
def('🍳', () => (
  <g>
    <circle cx="42" cy="54" r="32" fill={C.dgrey} {...st} />
    <circle cx="42" cy="54" r="24" fill="#4A4F57" />
    <ellipse cx="42" cy="54" rx="17" ry="14" fill={C.white} {...st} strokeWidth="1.6" /><circle cx="42" cy="54" r="7.5" fill={C.yellow} stroke={O} strokeWidth="1.4" />
    <rect x="72" y="50" width="26" height="9" rx="4" fill={C.brown} {...st} />
  </g>
))
def('🍛', () => (
  <g>
    <ellipse cx="50" cy="72" rx="44" ry="14" fill={C.white} {...st} />
    <path d="M12 66 Q50 20 88 66 Q50 82 12 66z" fill="#F5EFE0" {...st} />
    <path d="M52 56 Q70 34 88 62 Q70 74 52 56z" fill={C.orange} {...st} />
    {[[58, 58], [68, 52], [76, 60]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill={C.red} />)}
    <path d="M24 56 q6 -10 12 -4 M34 50 q4 -8 12 -4" stroke={C.steel} strokeWidth="2" fill="none" />
  </g>
))
def('🥘', () => (
  <g>
    <path d="M10 40 H90 q-2 40 -40 44 q-38 -4 -40 -44z" fill={C.steel} {...st} />
    <path d="M6 38 h-2 M94 38 h2" stroke={O} strokeWidth="5" strokeLinecap="round" />
    <ellipse cx="50" cy="40" rx="38" ry="8" fill={C.orange} {...st} />
    <circle cx="36" cy="38" r="4" fill={C.red} /><circle cx="52" cy="42" r="4" fill={C.green} /><circle cx="66" cy="38" r="4" fill={C.yellow} />
    <path d="M36 28 q-4 -10 2 -16 M54 28 q-4 -10 2 -16" stroke={C.steel} strokeWidth="3" fill="none" strokeLinecap="round" />
  </g>
))
def('🍮', () => (
  <g>
    <path d="M14 76 Q50 94 86 76 L78 44 Q50 36 22 44z" fill={C.straw} {...st} />
    <path d="M22 44 Q50 36 78 44 Q80 30 50 28 Q20 30 22 44z" fill={C.brown} {...st} />
    <ellipse cx="50" cy="86" rx="40" ry="6" fill={C.white} {...st} />
  </g>
))
def('🍥', () => ( // jilapi: a golden spiral
  <g>
    <path d="M50 50 m0 -6 a6 6 0 1 1 -6 6 a12 12 0 1 1 12 12 a18 18 0 1 1 -18 -18 a24 24 0 1 1 24 24" fill="none" stroke={C.orange} strokeWidth="9" strokeLinecap="round" />
    <path d="M50 50 m0 -6 a6 6 0 1 1 -6 6 a12 12 0 1 1 12 12 a18 18 0 1 1 -18 -18 a24 24 0 1 1 24 24" fill="none" stroke="#E08A1A" strokeWidth="2" strokeLinecap="round" />
  </g>
))
def('🍬', () => (
  <g>
    <path d="M26 40 L8 28 V62 L26 50z M74 40 L92 28 V62 L74 50z" fill={C.pink} {...st} />
    <ellipse cx="50" cy="45" rx="28" ry="20" fill={C.pink} {...st} />
    <path d="M32 38 q10 -10 22 -6 M38 54 q16 4 26 -8" stroke={C.white} strokeWidth="3.5" fill="none" strokeLinecap="round" />
  </g>
))
def('🍕', () => (
  <g>
    <path d="M10 22 Q50 4 90 22 L50 92Z" fill={C.yellow} {...st} />
    <path d="M10 22 Q50 4 90 22 q-4 8 -8 8 Q50 14 18 30 q-6 -2 -8 -8z" fill="#D9A25E" {...st} />
    {[[40, 38], [58, 44], [48, 60], [50, 30]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5.5" fill={C.red} stroke={O} strokeWidth="1.4" />)}
  </g>
))
