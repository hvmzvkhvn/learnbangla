import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { youngBooks, olderBooks } from '../src/data/playbook/books.js'
import { regionStoryboards, timelineStory } from '../src/data/playbook/storyboards.js'
import { historyStories } from '../src/data/playbook/history.js'
import { pageArtPath } from '../src/data/playbook/artwork.js'
import { readerUnits, stepCount, unitArtwork } from '../src/components/playbook/readerUnits.js'

const books = [...youngBooks, ...olderBooks]
const stories = { ...regionStoryboards, timeline: timelineStory }
const added = []
for (const book of books) for (const page of book.pages) added.push(...page.more)
for (const story of Object.values(stories)) for (const page of story.panels) added.push(...page.more, ...page.deepArt)
for (const story of Object.values(historyStories)) for (const page of story.panels) added.push(page, ...page.more, ...page.deepArt)

test('all 419 added passages own unique, shipped illustrations without borrowed originals', () => {
  assert.equal(added.length, 419)
  const paths = new Set(), hashes = new Set()
  for (const { art, artAlt } of added) {
    assert.match(art, /^images\/playbook\/additions\/.+\.webp$/)
    assert.ok(artAlt?.trim(), `Missing image description: ${art}`)
    assert.ok(!paths.has(art), `Reused path: ${art}`)
    paths.add(art)
    const file = new URL(`../public/${art}`, import.meta.url)
    assert.ok(existsSync(file), `Missing illustration: ${art}`)
    const bytes = readFileSync(file)
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF')
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP')
    const hash = createHash('sha256').update(bytes).digest('hex')
    assert.ok(!hashes.has(hash), `Reused image content: ${art}`)
    hashes.add(hash)
  }
})

test('picture-book reading steps change artwork without changing bookmarks or audio order', () => {
  for (const book of books) {
    const units = readerUnits(book.pages)
    assert.equal(units.length, stepCount(book.pages))
    assert.equal(units.length, book.pages.length * 3)
    book.pages.forEach((page, p) => {
      const triplet = units.slice(p * 3, p * 3 + 3)
      assert.deepEqual(triplet.map(u => u.pageIndex), [p, p, p])
      assert.deepEqual(triplet.map(u => u.lines[0].bn), [page.bn, ...page.more.map(l => l.bn)])
      assert.equal(unitArtwork(`book:${book.id}`, book.pages, triplet[0]), pageArtPath(`book:${book.id}`, p))
      assert.deepEqual(triplet.slice(1).map(u => unitArtwork(`book:${book.id}`, book.pages, u)), page.more.map(l => l.art))
      assert.equal(new Set(triplet.map(u => unitArtwork(`book:${book.id}`, book.pages, u))).size, 3)
    })
  }
})

test('story navigation keeps its chapter count and the original division and timeline paintings', () => {
  for (const [id, story] of Object.entries(stories)) {
    const units = readerUnits(story.panels, true)
    assert.equal(units.length, story.panels.length)
    units.forEach((unit, i) => {
      assert.equal(unitArtwork(`story:${id}`, story.panels, unit), pageArtPath(`story:${id}`, i))
      assert.equal(unit.lines.length, 3)
      assert.deepEqual(unit.lines.slice(1).map(l => l.art), story.panels[i].more.map(l => l.art))
      assert.equal(story.panels[i].deepArt.length, story.panels[i].deep.length)
    })
  }
  for (const [id, story] of Object.entries(historyStories)) {
    const units = readerUnits(story.panels, true)
    units.forEach((unit, i) => {
      assert.equal(unitArtwork(`story:${id}`, story.panels, unit), story.panels[i].art)
      assert.equal(unit.lines[0].en, story.panels[i].lineEn)
      assert.equal(story.panels[i].artNote, undefined)
    })
  }
})
