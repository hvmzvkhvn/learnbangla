// Writes docs/long-story-art-plan.json: one painting job for every slide of every big story, in the same format as
// docs/playbook-full-art-plan.json. Paintings go in public/images/playbook/long/<story>-NN.webp (NN = 01..50);
// the app shows a text card for any slide whose file is missing, so they can be added a few at a time.
//
//   node scripts/long-art-plan.mjs
import { createServer } from 'vite'
import { fileURLToPath } from 'node:url'
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const server = await createServer({ root, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { longStories, longArtPath } = await server.ssrLoadModule('/src/data/playbook/long/index.js')
const { divisionStories } = await server.ssrLoadModule('/src/data/playbook/divisions/index.js')
const { divisionArtPath } = await server.ssrLoadModule('/src/data/playbook/divisions/helpers.js')
const { districtStories, districtArtPath } = await server.ssrLoadModule('/src/data/playbook/districts/index.js')
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
const DIVISION_NOTE = 'A documentary-style painted scene of real Bangladeshi places and people, accurate to the place described, respectful and dignified, no tourist clichés.'
jobs.push(...Object.values(divisionStories).flatMap((d) => d.chapters.map((ch, i) => ({
  id: `${d.id}-${String(i + 1).padStart(2, '0')}`,
  relative: divisionArtPath(d.id, i),
  exists: existsSync(path.join(root, 'public', divisionArtPath(d.id, i))),
  story: d.title,
  slide: `${i + 1}/${d.chapters.length}`,
  title: ch.heading,
  prompt: `Illustration, "${d.title}", chapter ${i + 1} of ${d.chapters.length}, "${ch.heading}". ${ch.paint} ${DIVISION_NOTE} ${STYLE}`,
}))))
jobs.push(...Object.values(districtStories).flatMap((d) => d.chapters.map((ch, i) => ({
  id: `${d.id}-${String(i + 1).padStart(2, '0')}`,
  relative: districtArtPath(d.id, i),
  exists: existsSync(path.join(root, 'public', districtArtPath(d.id, i))),
  story: d.title,
  slide: `${i + 1}/${d.chapters.length}`,
  title: ch.heading,
  prompt: `Illustration, "${d.title}", chapter ${i + 1} of ${d.chapters.length}, "${ch.heading}". ${ch.paint} ${DIVISION_NOTE} ${STYLE}`,
}))))
// Keep the availability index compact; full prompts are grouped into reviewable story files.
const promptDirectory = path.join(root, 'docs/artwork/story-prompts')
mkdirSync(promptDirectory, { recursive: true })
const groups = new Map()
for (const job of jobs) {
  const storyId = `${job.relative.split('/')[2]}-${job.id.replace(/-\d+$/, '')}`
  if (!groups.has(storyId)) groups.set(storyId, [])
  groups.get(storyId).push({ id: job.id, relative: job.relative, prompt: job.prompt })
}
for (const [storyId, prompts] of groups) {
  writeFileSync(path.join(promptDirectory, `${storyId}.json`), JSON.stringify({ prompts }, null, 2) + '\n')
}
const inventory = jobs.map(({ prompt: _prompt, ...job }) => ({
  ...job,
  promptFile: `artwork/story-prompts/${job.relative.split('/')[2]}-${job.id.replace(/-\d+$/, '')}.json`,
}))
writeFileSync(path.join(root, 'docs/long-story-art-plan.json'), JSON.stringify({ generator: 'any image generator', note: 'Save each result at its relative path under public/. Full prompts are in promptFile (relative to docs/), matched by job id. Slides without a file show a text card.', jobs: inventory }, null, 2) + '\n')
console.log(`${jobs.length} painting prompts (${jobs.filter((j) => j.exists).length} already painted) → docs/long-story-art-plan.json and docs/artwork/story-prompts/`)
