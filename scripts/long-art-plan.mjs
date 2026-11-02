// Writes docs/long-story-art-plan.json: one painting job for every slide of every big story, in the same format as
// docs/playbook-full-art-plan.json. Paintings go in public/images/playbook/long/<story>-NN.webp (NN = 01..50);
// the app shows a text card for any slide whose file is missing, so they can be added a few at a time.
//
//   node scripts/long-art-plan.mjs
import { createServer } from 'vite'
import { fileURLToPath } from 'node:url'
import { writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const server = await createServer({ root, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { longStories, longArtPath } = await server.ssrLoadModule('/src/data/playbook/long/index.js')
await server.close()

const STYLE = 'Warm hand-painted gouache and coloured pencil, lightly textured paper, sophisticated storybook illustration with believable Bengali environments, expressive natural faces and coherent scale. Forest teal, terracotta, saffron and cream palette. Full-bleed landscape 3:2 composition. NO text, lettering, numerals, speech bubbles, border, logos, emoji or watermarks. One complete scene, not a collage or contact sheet.'
const jobs = longStories.flatMap((s) => s.beats.map((b, i) => ({
  id: `${s.id}-${String(i + 1).padStart(2, '0')}`,
  relative: longArtPath(s.id, i),
  exists: existsSync(path.join(root, 'public', longArtPath(s.id, i))),
  story: s.title,
  slide: `${i + 1}/${s.beats.length}`,
  title: b.title,
  prompt: `Illustration-story, "${s.title}", slide ${i + 1} of ${s.beats.length}, "${b.title}". ${b.paint} Characters (keep them identical on every slide): ${s.cast} ${STYLE}`,
})))
writeFileSync(path.join(root, 'docs/long-story-art-plan.json'), JSON.stringify({ generator: 'any image generator', note: 'Save each result at its `relative` path under public/. Slides without a file show a text card.', jobs }, null, 2) + '\n')
console.log(`${jobs.length} painting prompts (${jobs.filter((j) => j.exists).length} already painted) → docs/long-story-art-plan.json`)
