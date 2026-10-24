// Every piece of Bangla text that gets spoken in the app, in curriculum order, with a hint of what it means.
// Mirrors scripts/generate-audio.mjs so the Studio records exactly the clips the app plays.
import { bank } from '../curriculum/bank'
import { norm, sayFor } from './norm'

export const GROUPS = [
  { key: 'letter', label: 'Letters' },
  { key: 'sign', label: 'Signs & syllables' },
  { key: 'word', label: 'Words' },
  { key: 'sentence', label: 'Sentences' },
  { key: 'other', label: 'Conversations & stories' },
]
const groupOf = (kind) => (kind === 'letter' ? 'letter' : kind === 'sign' || kind === 'syllable' ? 'sign' : kind === 'word' ? 'word' : kind === 'sentence' || kind === 'form' ? 'sentence' : 'other')

let cache = null
export function studioClips() {
  if (cache) return cache
  const out = new Map()
  const add = (text, meta) => {
    const key = norm(text)
    if (!key) return
    const have = out.get(key)
    if (have) return void (have.slow ||= meta.slow)
    out.set(key, { key, say: sayFor(key), ...meta })
  }
  for (const item of bank.values()) {
    const slow = item.kind === 'letter' || item.kind === 'sign' || item.kind === 'syllable'
    const group = groupOf(item.kind)
    add(item.bn, { slow, group, roman: item.roman ?? '', en: item.en ?? '' })
    if (item.example) add(item.example.bn, { slow: false, group: 'word', roman: item.example.roman ?? '', en: item.example.en ?? '' })
    if (item.tokens) item.tokens.forEach((t) => add(t, { slow: false, group: 'sentence', roman: '', en: `a word from: ${item.en ?? item.bn}` }))
  }
  cache = [...out.values()]
  return cache
}

/** The mp3 name the app already expects for this text (same recipe as the generate script). */
export async function fileFor(key, manifest) {
  if (manifest?.[key]) return manifest[key]
  const bytes = new TextEncoder().encode(sayFor(key))
  const digest = await crypto.subtle.digest('SHA-1', bytes)
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 10) + '.mp3'
}
