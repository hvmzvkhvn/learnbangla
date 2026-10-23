// Checks every Family conversation line against the address rules:
//   • Tara (the child) never says তুমি-forms to an elder (friends like Rafi/Nila are fine)
//   • elders never say আপনি-forms to Tara
//   • every line has Bangla, romanisation and English; young lines have a picture cue
//
//   npm run lint:family
import { createServer } from 'vite'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const server = await createServer({ root, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const F = await server.ssrLoadModule('/src/data/family.js')

const TUMI = /তুমি|তোমার|তোমাকে|তোমরা|তোমায়/
const APNI = /আপনি|আপনার|আপনাকে|আপনারা/
const ELDERS = ['am', 'ab', 'nana', 'nani', 'dada', 'ch', 'dr', 'old', 'shop']
const issues = []
let lines = 0

for (const track of ['young', 'older']) {
  for (const sc of F.scenes[track]) {
    const peerScene = sc.lines.some((l) => l.who === 'fr' || l.who === 'nila')
    sc.lines.forEach((l, i) => {
      lines++
      const at = `${track}/${sc.key} #${i + 1}`
      if (!l.bn || !l.roman || !l.en) issues.push(`${at}: missing bn / roman / en`)
      if (!F.roster[l.who]) issues.push(`${at}: unknown speaker "${l.who}"`)
      if (/[ঀ-৿]/.test(l.roman)) issues.push(`${at}: Bangla script inside the romanisation`)
      if (l.who === 't' && TUMI.test(l.bn) && !peerScene) issues.push(`${at}: Tara uses a তুমি-form → ${l.bn}`)
      if (ELDERS.includes(l.who) && APNI.test(l.bn)) issues.push(`${at}: ${l.who} uses an আপনি-form to Tara → ${l.bn}`)
      if (track === 'young' && !l.art) issues.push(`${at}: no picture cue`)
    })
  }
}
await server.close()
console.log(`Checked ${lines} lines in ${F.scenes.young.length + F.scenes.older.length} scenes.`)
if (issues.length) {
  console.log(issues.join('\n'))
  console.log('\n(Tara speaking to a friend by name, e.g. "রাফি, তুমি…", is correct even where flagged in a scene with no friend line — check it.)')
  process.exitCode = 1
} else console.log('No issues.')
