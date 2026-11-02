import { createHash } from 'node:crypto'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { youngBooks, olderBooks } from '../src/data/playbook/books.js'
import { regionStoryboards, timelineStory } from '../src/data/playbook/storyboards.js'
import { buildTasks } from '../src/data/playbook/scenes.js'
import { pageArtPath, backdropPath, piecePath, paintedPieces, pieceDistractors } from '../src/data/playbook/artwork.js'

const asset = path => new URL(`../public/${path}`, import.meta.url)
test('every page in both collections, all regions and the timeline has its own shipped painting', () => {
  const groups = [...youngBooks, ...olderBooks].map(book => [`book:${book.id}`, book.pages])
  for (const [id, story] of Object.entries({ ...regionStoryboards, timeline: timelineStory })) groups.push([`story:${id}`, story.panels])
  const paths = groups.flatMap(([id, pages]) => pages.map((_, index) => pageArtPath(id, index)))
  assert.equal(paths.length, 123)
  assert.equal(new Set(paths).size, paths.length)
  const hashes = new Set()
  for (const path of paths) {
    assert.ok(existsSync(asset(path)), `Missing painting: ${path}`)
    const bytes = readFileSync(asset(path))
    assert.equal(bytes.subarray(8, 12).toString(), 'WEBP', path)
    hashes.add(createHash('sha256').update(bytes).digest('hex'))
  }
  assert.equal(hashes.size, paths.length, 'Each page must have a distinct painting')
})
test('every building step has painted art and unambiguous distractors', () => {
  for (const task of buildTasks) {
    assert.ok(existsSync(asset(backdropPath(task.id))), task.id)
    for (const step of task.steps) {
      const target = paintedPieces[step.e]
      assert.ok(target, step.e)
      assert.ok(existsSync(asset(piecePath(target.id))), target.id)
      const distractors = pieceDistractors(step.e).map(emoji => paintedPieces[emoji])
      assert.ok(distractors.length >= 3)
      assert.ok(distractors.every(piece => piece.concept !== target.concept))
      if (target.concept === 'bird') assert.ok(distractors.every(piece => !['owl', 'duck'].includes(piece.concept)))
      assert.equal(new Set(distractors.map(piece => piece.concept)).size, distractors.length)
      for (const piece of distractors) assert.ok(existsSync(asset(piecePath(piece.id))), piece.id)
    }
  }
})

for (const imagePath of ['playbook/pages/book-tara-morning-02.webp', 'learning/u-1f96d.webp']) test(`a viewed ${imagePath} remains available from the service worker when offline`, async () => {
  const { default: serviceWorker } = await import('../build/sw-plugin.js')
  const { runInNewContext } = await import('node:vm')
  let source
  serviceWorker().generateBundle.call({ emitFile: file => { source = file.source } }, {}, {})
  const listeners = {}, saved = new Map()
  let online = true, requests = 0
  runInNewContext(source, {
    URL, Response,
    self: {
      registration: { scope: 'https://learnbangla.test/' },
      location: { origin: 'https://learnbangla.test' },
      addEventListener: (event, listener) => { listeners[event] = listener },
    },
    caches: { open: async () => ({
      match: async request => saved.get(request.url ?? request)?.clone(),
      put: async (request, response) => { saved.set(request.url ?? request, response) },
    }) },
    fetch: async () => {
      requests++
      if (!online) throw new Error('Offline')
      return new Response('painted image', { headers: { 'Content-Type': 'image/webp' } })
    },
  })
  async function visit() {
    let response
    const pending = []
    listeners.fetch({
      request: new Request('https://learnbangla.test/images/' + imagePath),
      respondWith: result => { response = result },
      waitUntil: promise => pending.push(promise),
    })
    const result = await response
    await Promise.all(pending)
    return result.text()
  }
  assert.equal(await visit(), 'painted image')
  online = false
  assert.equal(await visit(), 'painted image')
  assert.equal(requests, 1)
})
