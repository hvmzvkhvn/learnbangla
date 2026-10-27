import { C, O, def, st } from './kit'

// ---- sky & weather -------------------------------------------------------------------------------------------
def('☀️', () => (
  <g>
    {Array.from({ length: 12 }).map((_, i) => (
      <path key={i} d="M50 6 L54 20 H46Z" fill={C.orange} transform={`rotate(${i * 30} 50 50)`} />
    ))}
    <circle cx="50" cy="50" r="22" fill={C.yellow} {...st} />
    <circle cx="43" cy="46" r="2" fill={O} /><circle cx="57" cy="46" r="2" fill={O} />
    <path d="M43 56 q7 6 14 0" stroke={O} strokeWidth="2" fill="none" strokeLinecap="round" />
  </g>
))
def('☁️', () => (
  <g fill={C.white} {...st}>
    <path d="M24 70 a14 14 0 0 1 4 -27 a18 18 0 0 1 34 -6 a15 15 0 0 1 20 14 a13 13 0 0 1 -2 19 z" />
  </g>
))
def('🌙', () => (
  <path d="M62 14 a36 36 0 1 0 22 56 a30 30 0 0 1 -22 -56z" fill={C.yellow} {...st} />
))
def('⭐', () => (
  <path d="M50 8 L61 36 L91 38 L68 57 L76 86 L50 70 L24 86 L32 57 L9 38 L39 36Z" fill={C.yellow} {...st} />
))
def('🌈', () => (
  <g fill="none" strokeWidth="7" strokeLinecap="butt">
    {[C.red, C.orange, C.yellow, C.green, C.blue, C.purple].map((c, i) => (
      <path key={c} d={`M${6 + i * 6} 88 a${44 - i * 6} ${44 - i * 6} 0 0 1 ${88 - i * 12} 0`} stroke={c} />
    ))}
  </g>
))
def('🌅', () => (
  <g>
    <path d="M10 70 a40 40 0 0 1 80 0z" fill={C.orange} {...st} />
    <path d="M26 70 a24 24 0 0 1 48 0z" fill={C.yellow} />
    <path d="M8 72 H92 M14 80 H86 M22 88 H78" stroke={C.blue} strokeWidth="4" strokeLinecap="round" />
    <path d="M50 8 V20 M16 24 L24 32 M84 24 L76 32" stroke={C.orange} strokeWidth="4" strokeLinecap="round" />
  </g>
))
def('🌊', () => (
  <g>
    <path d="M4 90 V58 Q6 26 38 20 Q64 16 74 34 Q58 30 54 46 Q78 42 96 60 V90z" fill={C.blue} {...st} />
    <path d="M38 20 Q56 24 50 40 Q44 32 30 36 Q30 26 38 20z" fill={C.white} {...st} />
    <path d="M12 74 q10 -8 20 0 t20 0 t20 0 t20 0" stroke={C.sky} strokeWidth="3" fill="none" strokeLinecap="round" />
  </g>
))
def('🌪️', () => (
  <g fill="none" strokeWidth="6" strokeLinecap="round">
    <path d="M14 22 H86" stroke={C.dgrey} /><path d="M22 38 H78" stroke={C.steel} /><path d="M32 54 H68" stroke={C.dgrey} /><path d="M40 70 H60" stroke={C.steel} /><path d="M47 84 H53" stroke={C.dgrey} />
  </g>
))
def('💦', () => (
  <g fill={C.sky} {...st}>
    <path d="M30 20 q10 16 0 26 q-10 -10 0 -26z" /><path d="M64 34 q12 18 0 30 q-12 -12 0 -30z" /><path d="M40 62 q8 12 0 20 q-8 -8 0 -20z" />
  </g>
))
def('⛄', () => (
  <g>
    <circle cx="50" cy="68" r="22" fill={C.white} {...st} /><circle cx="50" cy="34" r="15" fill={C.white} {...st} />
    <circle cx="45" cy="31" r="1.8" fill={O} /><circle cx="55" cy="31" r="1.8" fill={O} /><path d="M50 36 l9 3 l-9 1z" fill={C.orange} />
    <rect x="38" y="14" width="24" height="6" rx="2" fill={O} /><rect x="42" y="4" width="16" height="12" rx="2" fill={O} />
    <circle cx="50" cy="62" r="2.2" fill={O} /><circle cx="50" cy="72" r="2.2" fill={O} />
  </g>
))
def('⛷️', () => (
  <g>
    <path d="M10 86 L86 70" stroke={C.red} strokeWidth="5" strokeLinecap="round" />
    <circle cx="50" cy="22" r="9" fill={C.skin} {...st} />
    <path d="M50 32 L46 58 M48 40 L66 36 M46 58 L36 78 M46 58 L62 74" stroke={C.blue} strokeWidth="7" strokeLinecap="round" fill="none" />
  </g>
))
def('🏔️', () => (
  <g>
    <path d="M4 88 L38 22 L56 54 L68 38 L96 88Z" fill={C.steel} {...st} />
    <path d="M38 22 L28 42 L36 38 L42 46 L48 38Z" fill={C.white} {...st} />
    <path d="M68 38 L60 52 L66 50 L70 54 L76 50Z" fill={C.white} {...st} />
  </g>
))

// ---- trees, plants, fruit -------------------------------------------------------------------------------------
def('🌳', () => (
  <g>
    <path d="M44 90 L46 56 H54 L56 90Z" fill={C.brown} {...st} />
    <circle cx="50" cy="36" r="26" fill={C.green} {...st} />
    <circle cx="32" cy="44" r="16" fill={C.leaf} {...st} />
    <circle cx="68" cy="44" r="16" fill={C.leaf} {...st} />
    <circle cx="50" cy="28" r="14" fill="#74C466" />
  </g>
))
def('🌴', () => (
  <g>
    <path d="M48 90 Q52 60 44 30 L52 30 Q60 60 56 90Z" fill={C.wood} {...st} />
    {[-70, -35, 0, 35, 70].map((a) => (
      <path key={a} d="M50 30 Q70 14 90 34 Q70 26 50 32z" fill={C.leaf} {...st} transform={`rotate(${a} 50 30)`} />
    ))}
    <circle cx="46" cy="34" r="4" fill={C.brown} {...st} /><circle cx="55" cy="34" r="4" fill={C.brown} {...st} />
  </g>
))
const Rice = () => (
  <g fill="none" strokeLinecap="round">
    {[26, 38, 50, 62, 74].map((x, i) => (
      <g key={x}>
        <path d={`M${x} 90 Q${x + (i % 2 ? 6 : -6)} 60 ${x + (i % 2 ? 8 : -8)} 30`} stroke={C.leaf} strokeWidth="3" />
        <path d={`M${x + (i % 2 ? 8 : -8)} 30 q-5 -6 -2 -12 M${x + (i % 2 ? 8 : -8)} 30 q5 -6 2 -12 M${x + (i % 2 ? 8 : -8)} 30 v-14`} stroke={C.straw} strokeWidth="3.5" />
      </g>
    ))}
  </g>
)
def('🌾', Rice)
def('🍃', () => (
  <g>
    <ellipse cx="50" cy="70" rx="42" ry="20" fill={C.dark} {...st} />
    {[[26, 62], [42, 56], [58, 56], [74, 62], [34, 74], [50, 70], [66, 74]].map(([x, y], i) => (
      <path key={i} d={`M${x} ${y} q6 -14 14 -6 q-2 12 -14 6z`} fill={i % 2 ? C.green : '#74C466'} stroke={O} strokeWidth="1.4" />
    ))}
  </g>
))
def('🌿', () => (
  <g fill={C.green} {...st}>
    <path d="M50 92 Q48 50 50 12" fill="none" />
    {[[50, 70, -1], [50, 52, 1], [50, 34, -1], [50, 20, 1]].map(([x, y, d], i) => (
      <path key={i} d={`M${x} ${y} q${d * 22} -14 ${d * 26} -2 q${d * -8} 14 ${d * -26} 2z`} />
    ))}
  </g>
))
def('🌼', () => (
  <g>
    <path d="M50 52 V90" stroke={C.leaf} strokeWidth="4" strokeLinecap="round" />
    <path d="M50 76 q14 -12 22 -4 q-8 10 -22 4z" fill={C.green} {...st} />
    {Array.from({ length: 8 }).map((_, i) => (
      <ellipse key={i} cx="50" cy="24" rx="7" ry="13" fill={C.white} {...st} transform={`rotate(${i * 45} 50 38)`} />
    ))}
    <circle cx="50" cy="38" r="9" fill={C.yellow} {...st} />
  </g>
))
def('🥭', () => (
  <g transform="rotate(-28 50 52)">
    <path d="M50 12 q-30 6 -30 40 q0 36 30 38 q30 -2 30 -38 q0 -34 -30 -40z" fill="#F2B632" {...st} />
    <path d="M50 12 q-30 6 -30 40 q0 12 6 22 q22 -2 34 -26 q8 -16 -10 -36z" fill="#E5604D" opacity=".35" />
    <path d="M50 12 q6 -8 16 -6 q-2 10 -16 6z" fill={C.green} {...st} /><path d="M50 12 v-4" stroke={C.brown} strokeWidth="3" strokeLinecap="round" />
    <ellipse cx="38" cy="50" rx="4.5" ry="10" fill={C.white} opacity=".45" />
  </g>
))
def('🍌', () => (
  <g>
    <path d="M24 28 q10 56 56 52 q8 -2 4 -8 q-34 8 -44 -40 z" fill={C.yellow} {...st} />
    <path d="M24 28 l-2 -8 h8 l2 8" fill={C.brown} {...st} />
    <path d="M36 40 q6 28 36 34" fill="none" stroke="#E3B93B" strokeWidth="2" />
  </g>
))
def('🍎', () => (
  <g>
    <path d="M50 30 q-34 -14 -34 24 q2 32 34 34 q32 -2 34 -34 q0 -38 -34 -24z" fill={C.red} {...st} />
    <path d="M50 30 q2 -12 10 -16" stroke={C.brown} strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M54 22 q14 -10 22 0 q-8 10 -22 0z" fill={C.green} {...st} />
    <ellipse cx="34" cy="48" rx="5" ry="9" fill={C.white} opacity=".4" />
  </g>
))
def('🍈', () => (
  <g>
    <circle cx="50" cy="52" r="32" fill="#9CCB59" {...st} />
    <circle cx="50" cy="52" r="20" fill="#F7E7A9" />
    {[[44, 48], [56, 46], [50, 58], [42, 58], [58, 58]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.8" fill={C.brown} />)}
    <path d="M50 20 q2 -8 10 -10" stroke={C.brown} strokeWidth="3" fill="none" strokeLinecap="round" />
  </g>
))

// ---- animals --------------------------------------------------------------------------------------------------
const Eye = ({ x, y, r = 2 }) => <circle cx={x} cy={y} r={r} fill={O} />

def('🐄', () => (
  <g>
    <rect x="26" y="40" width="50" height="30" rx="14" fill={C.white} {...st} />
    <path d="M40 42 q8 -4 8 6 q-4 8 -12 4z M60 52 q8 -2 8 6 q-6 6 -10 0z" fill={C.dgrey} />
    {[34, 44, 62, 70].map((x) => <rect key={x} x={x} y="66" width="7" height="22" rx="3" fill={C.white} {...st} />)}
    <path d="M76 48 q12 -2 12 10" stroke={O} strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M24 38 q-14 -4 -16 10 q0 14 14 14 q10 -2 10 -16z" fill={C.white} {...st} />
    <ellipse cx="14" cy="56" rx="8" ry="6" fill={C.pink} {...st} />
    <path d="M18 30 l-6 -8 M30 30 l6 -8" stroke={O} strokeWidth="3" strokeLinecap="round" />
    <Eye x={22} y={46} />
  </g>
), 1.5)
def('🐃', () => (
  <g>
    <rect x="26" y="40" width="50" height="32" rx="14" fill={C.dgrey} {...st} />
    {[34, 44, 62, 70].map((x) => <rect key={x} x={x} y="66" width="7" height="22" rx="3" fill={C.dgrey} {...st} />)}
    <path d="M24 38 q-14 -4 -16 10 q0 14 14 14 q10 -2 10 -16z" fill="#838B96" {...st} />
    <path d="M14 36 q-12 -14 -4 -22 M32 34 q12 -18 4 -24" stroke={O} strokeWidth="3.5" fill="none" strokeLinecap="round" />
    <Eye x={22} y={46} />
  </g>
), 1.5)
def('🐐', () => (
  <g>
    <rect x="30" y="44" width="42" height="24" rx="12" fill="#F0E6D2" {...st} />
    {[36, 44, 58, 64].map((x) => <rect key={x} x={x} y="62" width="5" height="26" rx="2.5" fill="#F0E6D2" {...st} />)}
    <path d="M30 40 q-10 -14 -4 -26 q8 8 12 28z" fill="#F0E6D2" {...st} />
    <path d="M26 20 q-8 -10 -2 -14 M32 18 q4 -10 10 -10" stroke={O} strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M22 34 l-6 8 l8 -2" fill="#F0E6D2" {...st} />
    <Eye x={28} y={32} />
    <path d="M72 50 q8 -6 10 -14" stroke={O} strokeWidth="3" fill="none" strokeLinecap="round" />
  </g>
), 1.5)
def('🐶', () => (
  <g>
    <rect x="28" y="46" width="44" height="26" rx="12" fill={C.straw} {...st} />
    {[34, 42, 60, 66].map((x) => <rect key={x} x={x} y="64" width="6" height="24" rx="3" fill={C.straw} {...st} />)}
    <path d="M72 52 q16 -12 10 -28" stroke={C.straw} strokeWidth="7" fill="none" strokeLinecap="round" />
    <circle cx="30" cy="40" r="15" fill={C.straw} {...st} />
    <path d="M18 30 q-8 8 -2 22 q8 -2 8 -14z M42 30 q8 8 2 22 q-8 -2 -8 -14z" fill={C.brown} {...st} />
    <ellipse cx="26" cy="46" rx="8" ry="6" fill={C.cream} {...st} /><circle cx="22" cy="44" r="2.5" fill={O} />
    <Eye x={26} y={34} /><Eye x={36} y={34} />
  </g>
), 1.5)
def('🐱', () => (
  <g>
    <rect x="30" y="48" width="40" height="24" rx="12" fill={C.orange} {...st} />
    {[36, 44, 56, 62].map((x) => <rect key={x} x={x} y="66" width="6" height="22" rx="3" fill={C.orange} {...st} />)}
    <path d="M70 56 q22 -4 12 -30" stroke={C.orange} strokeWidth="7" fill="none" strokeLinecap="round" />
    <circle cx="34" cy="40" r="15" fill={C.orange} {...st} />
    <path d="M22 30 l2 -16 l12 10z M46 30 l-2 -16 l-12 10z" fill={C.orange} {...st} />
    <Eye x={29} y={38} /><Eye x={40} y={38} />
    <path d="M33 45 l3 3 l3 -3z" fill={C.pink} /><path d="M20 44 l-8 -2 M20 48 l-8 2 M48 44 l8 -2 M48 48 l8 2" stroke={O} strokeWidth="1.4" />
    <path d="M30 40 v-5 M36 40 v-5 M42 40 v-5" stroke="#E08A1A" strokeWidth="2" />
  </g>
), 1.5)
def('🐘', () => (
  <g>
    <rect x="24" y="34" width="56" height="42" rx="20" fill="#A8B1BC" {...st} />
    {[30, 42, 62, 72].map((x) => <rect key={x} x={x} y="66" width="10" height="24" rx="4" fill="#A8B1BC" {...st} />)}
    <circle cx="30" cy="44" r="17" fill="#A8B1BC" {...st} />
    <path d="M18 42 q-14 6 -8 26 q4 6 8 0 q-4 -12 4 -20" fill="#A8B1BC" {...st} />
    <ellipse cx="44" cy="46" rx="11" ry="16" fill="#9AA4B0" {...st} />
    <path d="M22 54 q-4 12 4 12" fill="none" stroke={C.white} strokeWidth="5" strokeLinecap="round" />
    <Eye x={28} y={40} /><path d="M80 52 q8 4 6 14" stroke={O} strokeWidth="3" fill="none" strokeLinecap="round" />
  </g>
), 1.5)
def('🐒', () => (
  <g>
    <path d="M70 70 q24 -4 14 -30" stroke={C.brown} strokeWidth="7" fill="none" strokeLinecap="round" />
    <rect x="34" y="44" width="34" height="34" rx="14" fill={C.brown} {...st} />
    <rect x="30" y="72" width="12" height="16" rx="5" fill={C.brown} {...st} /><rect x="58" y="72" width="12" height="16" rx="5" fill={C.brown} {...st} />
    <circle cx="50" cy="30" r="17" fill={C.brown} {...st} />
    <circle cx="32" cy="30" r="7" fill={C.skinL} {...st} /><circle cx="68" cy="30" r="7" fill={C.skinL} {...st} />
    <ellipse cx="50" cy="36" rx="11" ry="9" fill={C.skinL} {...st} />
    <Eye x={44} y={29} /><Eye x={56} y={29} /><path d="M45 38 q5 3 10 0" stroke={O} strokeWidth="1.8" fill="none" />
    <ellipse cx="50" cy="60" rx="9" ry="12" fill={C.skinL} />
  </g>
), 1.5)
def('🦚', () => (
  <g>
    {Array.from({ length: 9 }).map((_, i) => (
      <g key={i} transform={`rotate(${-80 + i * 20} 50 62)`}>
        <ellipse cx="50" cy="20" rx="7" ry="16" fill={C.teal} {...st} />
        <circle cx="50" cy="14" r="4.5" fill={C.yellow} stroke={O} strokeWidth="1.2" /><circle cx="50" cy="14" r="2" fill={C.blue} />
      </g>
    ))}
    <ellipse cx="50" cy="66" rx="14" ry="18" fill={C.blue} {...st} />
    <path d="M44 84 L42 94 M56 84 L58 94" stroke={O} strokeWidth="3" strokeLinecap="round" />
    <path d="M46 56 q4 -22 4 -26" stroke={C.blue} strokeWidth="6" fill="none" strokeLinecap="round" />
    <circle cx="50" cy="34" r="8" fill={C.blue} {...st} /><path d="M48 26 v-8 M52 26 l2 -8" stroke={O} strokeWidth="2" strokeLinecap="round" />
    <path d="M56 35 l8 2 l-8 2z" fill={C.orange} stroke={O} strokeWidth="1" /><Eye x={50} y={33} r={1.5} />
  </g>
), 1.5)
def('🐟 🐠', () => (
  <g>
    <path d="M12 50 q24 -30 52 -4 l22 -16 v40 l-22 -16 q-28 26 -52 -4z" fill="#8FB8D6" {...st} />
    <path d="M24 46 q20 -10 36 0 q-16 14 -36 0z" fill="#C3DBEC" />
    <path d="M30 38 l8 -10 l10 8" fill="#7AA6C8" {...st} />
    <Eye x={26} y={48} r={2.4} /><circle cx="25.4" cy="47.4" r=".8" fill={C.white} />
    <path d="M48 42 v16 M56 42 v16" stroke="#7AA6C8" strokeWidth="1.6" />
  </g>
))
def('🦆', () => (
  <g>
    <path d="M18 54 q4 26 36 26 q30 0 30 -24 q-20 6 -26 -10 z" fill={C.white} {...st} />
    <path d="M70 54 q8 -4 12 2" stroke={C.steel} strokeWidth="2.5" fill="none" />
    <path d="M42 50 q-10 -2 -10 -16 a12 12 0 0 1 24 0 q0 10 -6 14z" fill={C.green} {...st} />
    <path d="M36 28 q-12 0 -14 6 q8 4 14 0z" fill={C.orange} {...st} />
    <Eye x={43} y={28} r={1.8} />
    <path d="M30 84 q10 -6 20 0" stroke={C.sky} strokeWidth="3" fill="none" strokeLinecap="round" />
  </g>
), 1.5)
def('🐦', () => (
  <g>
    <ellipse cx="50" cy="52" rx="26" ry="18" fill={C.blue} {...st} />
    <path d="M70 50 l22 -10 l-6 18z" fill={C.navy} {...st} />
    <circle cx="32" cy="42" r="13" fill={C.blue} {...st} />
    <path d="M20 40 l-12 4 l12 4z" fill={C.orange} {...st} />
    <path d="M36 56 q16 -14 30 4 q-16 8 -30 -4z" fill="#7FBAE6" {...st} />
    <Eye x={30} y={40} r={2} /><path d="M44 70 v10 M54 68 v12" stroke={O} strokeWidth="2.5" strokeLinecap="round" />
  </g>
))
def('🦉', () => (
  <g>
    <ellipse cx="50" cy="56" rx="26" ry="32" fill={C.brown} {...st} />
    <ellipse cx="50" cy="66" rx="16" ry="20" fill={C.straw} />
    <path d="M28 30 l-2 -14 l14 8z M72 30 l2 -14 l-14 8z" fill={C.brown} {...st} />
    <circle cx="40" cy="38" r="10" fill={C.white} {...st} /><circle cx="60" cy="38" r="10" fill={C.white} {...st} />
    <circle cx="40" cy="38" r="4.5" fill={O} /><circle cx="60" cy="38" r="4.5" fill={O} />
    <path d="M46 46 l4 8 l4 -8z" fill={C.orange} stroke={O} strokeWidth="1.2" />
    <path d="M42 88 h-6 M62 88 h6" stroke={C.orange} strokeWidth="4" strokeLinecap="round" />
  </g>
))
def('🐧', () => (
  <g>
    <ellipse cx="50" cy="56" rx="26" ry="34" fill={C.navy} {...st} />
    <ellipse cx="50" cy="62" rx="16" ry="24" fill={C.white} />
    <path d="M44 38 l6 8 l6 -8z" fill={C.orange} stroke={O} strokeWidth="1.2" />
    <Eye x={42} y={32} /><Eye x={58} y={32} />
    <path d="M26 54 l-10 14 l14 -2z M74 54 l10 14 l-14 -2z" fill={C.navy} {...st} />
    <path d="M38 90 h10 M54 90 h10" stroke={C.orange} strokeWidth="5" strokeLinecap="round" />
  </g>
))
def('🐫', () => (
  <g>
    <path d="M24 56 q6 -26 20 -20 q6 -22 18 -2 q12 -8 14 22 v24 h-8 v-20 h-30 v20 h-8z" fill="#D9B06B" {...st} />
    <path d="M24 56 q-12 -10 -14 -26 q4 -4 10 2 q2 12 12 18z" fill="#D9B06B" {...st} />
    <Eye x={14} y={32} r={1.6} /><path d="M70 40 q16 -2 14 8" stroke="#D9B06B" strokeWidth="5" fill="none" strokeLinecap="round" />
  </g>
))
def('🐅', () => (
  <g>
    <rect x="24" y="42" width="54" height="30" rx="14" fill={C.orange} {...st} />
    {[30, 40, 62, 70].map((x) => <rect key={x} x={x} y="64" width="8" height="24" rx="3.5" fill={C.orange} {...st} />)}
    <path d="M78 52 q14 -6 10 -22" stroke={C.orange} strokeWidth="7" fill="none" strokeLinecap="round" />
    <path d="M36 44 l4 12 M48 42 l3 14 M60 44 l2 12 M70 46 l1 10" stroke={O} strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="26" cy="42" r="16" fill={C.orange} {...st} />
    <path d="M12 30 l2 -10 l8 6z M40 30 l-2 -10 l-8 6z" fill={C.orange} {...st} />
    <ellipse cx="24" cy="50" rx="9" ry="6.5" fill={C.cream} {...st} /><path d="M22 47 l2 2 l2 -2z" fill={O} />
    <Eye x={19} y={39} /><Eye x={31} y={39} /><path d="M26 28 v6 M20 30 l2 4 M32 30 l-2 4" stroke={O} strokeWidth="2.5" strokeLinecap="round" />
  </g>
), 1.5)
def('🦀', () => (
  <g>
    <ellipse cx="50" cy="58" rx="26" ry="18" fill={C.red} {...st} />
    <path d="M22 54 q-14 -2 -12 -16 q10 0 16 10z M78 54 q14 -2 12 -16 q-10 0 -16 10z" fill={C.red} {...st} />
    <path d="M26 66 l-12 8 M32 72 l-8 12 M74 66 l12 8 M68 72 l8 12" stroke={C.red} strokeWidth="4" strokeLinecap="round" />
    <path d="M42 42 v-10 M58 42 v-10" stroke={C.red} strokeWidth="3" /><circle cx="42" cy="30" r="4" fill={C.white} {...st} /><circle cx="58" cy="30" r="4" fill={C.white} {...st} />
    <Eye x={42} y={30} r={1.6} /><Eye x={58} y={30} r={1.6} />
  </g>
))
def('🦐', () => (
  <g>
    <path d="M74 24 q-36 -6 -46 22 q-4 18 14 26 q14 4 20 -6 q-12 -2 -14 -12 q8 -22 26 -30z" fill={C.coral} {...st} />
    <path d="M74 24 l14 10 l-6 6z" fill={C.coral} {...st} />
    <path d="M38 52 q8 4 14 -2 M36 62 q8 4 14 -2" stroke={C.red} strokeWidth="2" fill="none" />
    <path d="M30 48 q-14 -10 -18 -30" stroke={O} strokeWidth="2" fill="none" /><Eye x={34} y={44} r={1.8} />
  </g>
))
def('🐛', () => (
  <g>
    {[20, 34, 48, 62].map((x, i) => <circle key={x} cx={x} cy={64 - (i % 2) * 6} r="10" fill={i % 2 ? '#9BD16F' : C.green} {...st} />)}
    <circle cx="76" cy="52" r="13" fill="#9BD16F" {...st} /><Eye x={80} y={49} /><Eye x={71} y={49} />
    <path d="M72 40 q-4 -10 -10 -10 M80 40 q4 -10 10 -10" stroke={O} strokeWidth="2" fill="none" /><path d="M72 57 q4 3 8 0" stroke={O} strokeWidth="1.6" fill="none" />
  </g>
))
def('🐚', () => (
  <g>
    <path d="M12 74 q-4 -40 38 -50 q38 10 38 50 q-26 18 -76 0z" fill={C.pink} {...st} />
    <path d="M50 24 L36 80 M50 24 L50 82 M50 24 L64 80 M50 24 L22 74 M50 24 L78 74" stroke="#D96A8C" strokeWidth="2.4" />
    <path d="M30 82 h40 v6 h-40z" fill="#F2B6C9" {...st} />
  </g>
))
