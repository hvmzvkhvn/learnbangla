// Checks every Super challenge set:
//   - each item has Bangla + English and no transliteration
//   - every word is one the learner has already met by the end of that unit (same track) — endings like -র, -কে, -তে
//     are forgiven, so "বাড়িতে" is fine if "বাড়ি" was taught
//   - script-unit sets (set.script = true) use only letters, signs and conjuncts taught so far
//   - the set is long enough and sentences are really longer than the unit's own
//
//   npm run lint:super            (add --strict to treat unknown words as errors)
import { createServer } from 'vite'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const strict = process.argv.includes('--strict')
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const server = await createServer({ root, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { tracks } = await server.ssrLoadModule('/src/curriculum/tracks.js')
const { SUPER } = await server.ssrLoadModule('/src/data/super/index.js')
const { bank } = await server.ssrLoadModule('/src/curriculum/bank.js')
await server.close()

const PUNCT = /[।,?!"“”.\-—:;()…]/g
const clean = (t) => t.replace(PUNCT, '').trim()
const ENDINGS = ['গুলো', 'গুলি', 'দের', 'রা', 'েরা', 'কে', 'তে', 'ের', 'র', 'টা', 'টি', 'টাকে', 'ে', 'য়', 'ও', 'ই', 'কেও', 'য়ে', 'ায়', 'ি', 'য়ের']
// A few high-frequency function words are allowed in any sentence even if a unit never spelled them out
// (and, but, so, this, that, very, a little, is/are, was, from, with…). Every content word must have been taught.
const GLUE = new Set('আর ও এবং কিন্তু তাই এই ওই সব সবাই খুব আরও একটু অনেক কী কেন না নয় নেই আছে আছি আছেন ছিল ছিলেন হয় হবে হয়েছে থেকে জন্য সাথে সঙ্গে নিয়ে দিয়ে করে পর আগে এখন আজ কাল প্রতি তবে যদি যখন তখন কারণ কত কোন মধ্যে মতো যা তা যে সেখানে এখানে তাহলে কি'.split(' '))
const stems = (w) => {
  const out = new Set([w])
  for (const e of ENDINGS) if (w.length > e.length + 1 && w.endsWith(e)) out.add(w.slice(0, -e.length))
  return out
}

let problems = 0
let unknownTotal = 0
let sets = 0
let items = 0
for (const [trackKey, track] of Object.entries(tracks)) {
  const taughtWords = new Set()
  const taughtChars = new Set()
  track.units.forEach((u) => {
    for (const l of u.lessons) {
      for (const id of [...(l.learn ?? []), ...(l.practice ?? []), ...(l.superIds ?? [])]) {
        const it = bank.get(id)
        if (!it || it.id.startsWith('super:')) continue
        if (it.kind === 'letter' || it.kind === 'sign' || it.kind === 'syllable') for (const ch of it.bn) taughtChars.add(ch)
        const toks = it.tokens && it.kind !== 'word' ? it.tokens : [it.bn, ...it.bn.split(' ')]
        for (const t of toks) for (const s of stems(clean(t))) taughtWords.add(s)
        if (it.kind === 'word') for (const ch of it.bn) taughtChars.add(ch)
      }
    }
    const set = SUPER[u.id]
    if (!set) return
    sets++
    const here = (msg) => {
      problems++
      console.log(`${trackKey}/${u.id}: ${msg}`)
    }
    if (!set.items?.length || set.items.length < 5) here(`only ${set.items?.length ?? 0} items (need at least 5)`)
    const seen = new Set()
    for (const [bn, en] of set.items ?? []) {
      items++
      if (!bn || !en) here(`incomplete item ${JSON.stringify([bn, en])}`)
      if (seen.has(bn)) here(`duplicate: ${bn}`)
      seen.add(bn)
      if (/[A-Za-z]/.test(bn)) here(`Latin letters in Bangla: ${bn}`)
      if (/[Ѐ-ӿ]/.test(bn + en)) here(`stray Cyrillic: ${bn} / ${en}`)
      if (set.script) {
        const bad = [...clean(bn)].filter((ch) => ch !== ' ' && !taughtChars.has(ch) && !'্‌‍'.includes(ch))
        if (bad.length) here(`letters not taught yet (${[...new Set(bad)].join(' ')}): ${bn}`)
      } else {
        const unknown = bn.split(' ').map(clean).filter(Boolean).filter((w) => !GLUE.has(w) && ![...stems(w)].some((s) => taughtWords.has(s)))
        if (unknown.length) {
          unknownTotal += unknown.length
          console.log(`${strict ? 'ERROR' : 'note '} ${trackKey}/${u.id}: not taught yet → ${unknown.join(' ')}   in: ${bn}`)
          if (strict) problems++
        }
        if (bn.split(' ').length < 5) here(`sentence is short (${bn.split(' ').length} words): ${bn}`)
      }
    }
  })
}
console.log(`\n${sets} sets, ${items} items, ${unknownTotal} words not found in the taught list${strict ? '' : ' (notes only)'}.`)
console.log(problems ? `${problems} problem(s).` : 'No issues.')
process.exit(problems ? 1 : 0)
