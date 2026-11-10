import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { longStories, longPages } from '../src/data/playbook/long/index.js'
import { divisionStories } from '../src/data/playbook/divisions/index.js'
import { districtStories } from '../src/data/playbook/districts/index.js'

const pages = [
  ...longStories.flatMap(story => longPages(story, 'easy')),
  ...Object.values(divisionStories).flatMap(story => story.panels),
  ...Object.values(districtStories).flatMap(story => story.panels),
]

test('the artwork inventory matches the shipped paintings, with distinct images and descriptions', () => {
  const inventory = JSON.parse(readFileSync(new URL('../docs/long-story-art-plan.json', import.meta.url)))
  const promptFiles = new Map()
  for (const job of inventory.jobs) {
    assert.match(job.promptFile, /^artwork\/story-prompts\/[a-z0-9-]+\.json$/)
    if (!promptFiles.has(job.promptFile)) {
      const data = JSON.parse(readFileSync(new URL(`../docs/${job.promptFile}`, import.meta.url)))
      promptFiles.set(job.promptFile, new Map(data.prompts.map(item => [item.relative, item.prompt])))
    }
    assert.ok(promptFiles.get(job.promptFile).get(job.relative)?.length > 100, `Missing generation prompt: ${job.id}`)
  }
  const availability = new Map(inventory.jobs.map(job => [job.relative, job.exists]))
  assert.equal(pages.length, 808)
  const paths = new Set(), hashes = new Set()
  for (const page of pages) {
    assert.match(page.art, /^images\/playbook\/(long|divisions|districts)\/.+\.webp$/)
    assert.ok(page.artAlt?.trim().length > 20, `Missing description: ${page.art}`)
    assert.ok(!paths.has(page.art), `Reused painting path: ${page.art}`)
    paths.add(page.art)
    const file = new URL(`../public/${page.art}`, import.meta.url)
    assert.equal(existsSync(file), availability.get(page.art), `Incorrect inventory: ${page.art}`)
    if (!existsSync(file)) continue
    const bytes = readFileSync(file)
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF')
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP')
    const hash = createHash('sha256').update(bytes).digest('hex')
    assert.ok(!hashes.has(hash), `Reused painting contents: ${page.art}`)
    hashes.add(hash)
  }
})

test('easier and fuller tellings share the same illustration for each story beat', () => {
  for (const story of longStories) {
    const easy = longPages(story, 'easy'), full = longPages(story, 'hard')
    assert.equal(easy.length, full.length)
    easy.forEach((page, index) => {
      assert.equal(page.art, full[index].art)
      assert.equal(page.artAlt, full[index].artAlt)
      assert.equal(page.part, full[index].part)
      assert.equal(page.heading, full[index].heading)
    })
  }
})
