// Generates an mp3 for every piece of Bangla text in the curriculum, plus public/audio/manifest.json.
//
//   pip install edge-tts           (one-off; free neural voices incl. Bangladeshi Bangla)
//   npm run audio                  (skips files that already exist)
//   npm run audio -- --force       (regenerate everything)
//
// Voice: bn-BD-NabanitaNeural (override with AUDIO_VOICE). Binary: `edge-tts` on PATH (override with EDGE_TTS).
// To use real recordings instead, just replace a file in public/audio with your own mp3 of the same name.
import { createServer } from 'vite'
import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const run = promisify(execFile)
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'public/audio')
const EDGE = process.env.EDGE_TTS || 'edge-tts'
const VOICE = process.env.AUDIO_VOICE || 'bn-BD-NabanitaNeural'
const force = process.argv.includes('--force')

const server = await createServer({ root, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { bank } = await server.ssrLoadModule('/src/curriculum/bank.js')
const { norm, sayFor } = await server.ssrLoadModule('/src/audio/norm.js')
await server.close()

// text -> slow? (letters and syllables are spoken more slowly)
const texts = new Map()
const want = (text, slow) => {
  const key = norm(text)
  if (key) texts.set(key, texts.get(key) || slow)
}
for (const item of bank.values()) {
  const slow = item.kind === 'letter' || item.kind === 'sign' || item.kind === 'syllable'
  want(item.bn, slow)
  if (item.example) want(item.example.bn, false)
  if (item.tokens) item.tokens.forEach((t) => want(t, false))
}

mkdirSync(outDir, { recursive: true })
const manifestPath = path.join(outDir, 'manifest.json')
const manifest = existsSync(manifestPath) && !force ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {}

const jobs = [...texts].map(([key, slow]) => ({ key, slow, file: createHash('sha1').update(sayFor(key)).digest('hex').slice(0, 10) + '.mp3' }))
let made = 0, skipped = 0
const failed = []

async function synth({ key, slow, file }) {
  const out = path.join(outDir, file)
  if (!force && existsSync(out) && statSync(out).size > 1000) {
    manifest[key] = file
    skipped++
    return
  }
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await run(EDGE, ['--voice', VOICE, `--rate=${slow ? '-25%' : '-12%'}`, '--text', sayFor(key), '--write-media', out])
      if (statSync(out).size > 1000) {
        manifest[key] = file
        made++
        return
      }
    } catch {
      /* retry */
    }
  }
  failed.push(key)
}

const queue = [...jobs]
await Promise.all(Array.from({ length: 6 }, async () => { while (queue.length) await synth(queue.shift()) }))

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)))
writeFileSync(manifestPath, JSON.stringify(sorted, null, 1))
console.log(`audio: ${made} generated, ${skipped} already there, ${failed.length} failed, ${Object.keys(sorted).length} in manifest`)
if (failed.length) console.log('failed:', failed.join(' | '))
