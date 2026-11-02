import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'

test('audio reports loading/playing, settles on cancellation, retries errors, and respects calm mode', async () => {
  const oldFetch = globalThis.fetch,
    oldAudio = globalThis.Audio,
    oldStorage = globalThis.localStorage
  const storage = new Map()
  globalThis.localStorage = { getItem: (k) => storage.get(k) ?? null, setItem: (k, v) => storage.set(k, v) }
  const elements = []
  class FakeAudio extends EventTarget {
    constructor(src) {
      super()
      this.src = src
      elements.push(this)
    }
    play() {
      queueMicrotask(() => this.dispatchEvent(new Event('playing')))
      return Promise.resolve()
    }
    pause() {
      this.dispatchEvent(new Event('pause'))
    }
  }
  globalThis.Audio = FakeAudio
  globalThis.fetch = async () => ({ ok: true, json: async () => ({ মা: 'mother.mp3' }) })
  const server = await createServer({ server: { middlewareMode: true, hmr: false, watch: null }, appType: 'custom' })
  try {
    const audio = await server.ssrLoadModule('/src/audio/audio.js')
    const states = []
    const one = audio.speak('মা', { force: true, onState: (s) => states.push(s) })
    await new Promise((r) => setTimeout(r, 20))
    assert.deepEqual(states, ['loading', 'playing'])
    audio.stop()
    assert.equal(await one, null)
    const two = audio.speak('মা', { force: true })
    await new Promise((r) => setTimeout(r, 20))
    elements.at(-1).dispatchEvent(new Event('error'))
    assert.equal(await two, false)
    const retry = audio.speak('মা', { force: true })
    await new Promise((r) => setTimeout(r, 20))
    elements.at(-1).dispatchEvent(new Event('ended'))
    assert.equal(await retry, true)
    storage.set('lb.ui', JSON.stringify({ calm: true }))
    assert.equal(await audio.speak('মা'), false)
    const manual = audio.speak('মা', { force: true })
    await new Promise((r) => setTimeout(r, 20))
    elements.at(-1).dispatchEvent(new Event('ended'))
    assert.equal(await manual, true)
  } finally {
    await server.close()
    globalThis.fetch = oldFetch
    globalThis.Audio = oldAudio
    if (oldStorage === undefined) delete globalThis.localStorage
    else globalThis.localStorage = oldStorage
  }
})
