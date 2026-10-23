// Marks that attach to the previous letter: chandrabindu, anusvara, visarga, nukta, vowel signs, virama.
const MARKS = new Set([0x981, 0x982, 0x983, 0x9bc, 0x9be, 0x9bf, 0x9c0, 0x9c1, 0x9c2, 0x9c3, 0x9c4, 0x9c7, 0x9c8, 0x9cb, 0x9cc, 0x9cd, 0x9d7])
const VIRAMA = 0x9cd

/** Split a Bangla word into tile-sized clusters (letter + its signs; conjuncts stay together). */
export function splitClusters(word) {
  const units = []
  let joinNext = false
  for (const ch of Array.from(word)) {
    const cp = ch.codePointAt(0)
    if (units.length && (MARKS.has(cp) || joinNext)) {
      units[units.length - 1] += ch
    } else {
      units.push(ch)
    }
    joinNext = cp === VIRAMA
  }
  return units
}

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const sample = (arr, n) => shuffle(arr).slice(0, n)
// Split into evenly sized groups of at most `size` (avoids a tiny leftover lesson).
export const chunk = (arr, size) => {
  if (!arr.length) return []
  const per = Math.ceil(arr.length / Math.ceil(arr.length / size))
  const out = []
  for (let i = 0; i < arr.length; i += per) out.push(arr.slice(i, i + per))
  return out
}
