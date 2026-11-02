import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createServer } from 'vite'

const server = await createServer({ server: { middlewareMode: true, hmr: false, watch: null }, appType: 'custom' })
test.after(() => server.close())
const { normalizeUI } = await server.ssrLoadModule('/src/ui/preferences.js')
const { createHaptics } = await server.ssrLoadModule('/src/ui/haptics.js')

test('preferences reject malformed stored values and do not enable vibration implicitly', () => {
  assert.deepEqual(normalizeUI(null), { theme: 'light', readingSize: 'standard', haptics: false, calm: false })
  assert.deepEqual(normalizeUI({ theme: 'neon', readingSize: '1000', haptics: 'yes' }), normalizeUI(null))
  assert.equal(normalizeUI({ theme: 'evening', readingSize: 'largest' }).readingSize, 'largest')
})
test('haptics respect opt-in, calm mode, reduced motion and unsupported devices', () => {
  let prefs = { haptics: false, calm: false },
    reduce = false,
    calls = 0
  const fire = createHaptics({
    preferences: () => prefs,
    vibrate: () => {
      calls++
    },
    reducedMotion: () => reduce,
  })
  assert.equal(fire('success'), false)
  prefs = { haptics: true, calm: true }
  assert.equal(fire('complete'), false)
  prefs.calm = false
  reduce = true
  assert.equal(fire('success'), false)
  reduce = false
  assert.equal(fire('wrong'), false)
  assert.equal(calls, 0)
  assert.equal(createHaptics({ preferences: () => prefs })('success'), false)
  assert.equal(
    createHaptics({
      preferences: () => prefs,
      vibrate: () => {
        throw Error('unsupported')
      },
    })('success'),
    false,
  )
})
test('rapid success events produce one short pulse; completion uses a distinct pattern', () => {
  let time = 1000
  const pulses = []
  const fire = createHaptics({
    preferences: () => ({ haptics: true }),
    now: () => time,
    vibrate: (p) => {
      pulses.push(p)
      return true
    },
  })
  assert.equal(fire('success'), true)
  assert.equal(fire('success'), false)
  time += 500
  assert.equal(fire('complete'), true)
  assert.deepEqual(pulses, [12, [18, 60, 18]])
})

function luminance(rgb) {
  return rgb
    .map((v) => {
      v /= 255
      return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
    })
    .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0)
}
function contrast(a, b) {
  const x = luminance(a),
    y = luminance(b)
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}
test('day and evening semantic text pairs meet AA normal-text contrast', () => {
  const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8')
  const blocks = [css.match(/:root \{([\s\S]*?)\}/)[1], css.match(/:root\[data-theme=["\x27]?evening["\x27]?\] \{([\s\S]*?)\}/)[1]]
  for (const block of blocks) {
    const tokens = Object.fromEntries(
      [...block.matchAll(/--([\w-]+): ([\d ]+);/g)].map((m) => [m[1], m[2].trim().split(/\s+/).map(Number)]),
    )
    for (const fg of ['ink', 'muted', 'primary-text', 'success', 'error'])
      for (const bg of ['canvas', 'surface', 'selected'])
        assert.ok(contrast(tokens[fg], tokens[bg]) >= 4.5, `${fg}/${bg}: ${contrast(tokens[fg], tokens[bg])}`)
    assert.ok(contrast([255, 255, 255], tokens.primary) >= 4.5)
    assert.ok(contrast([36, 55, 51], tokens.gold) >= 4.5)
    assert.ok(contrast(tokens.ink, tokens['gold-soft']) >= 4.5)
  }
})
test('the approved Bengali font and existing default reading line spacing are preserved', () => {
  const css = readFileSync(new URL('../src/components/playbook/playbook.css', import.meta.url), 'utf8')
  assert.match(css, /\.pb-caption-bn \{[^}]*font-family:\s*'Noto Sans Bengali',\s*sans-serif;[^}]*line-height:\s*1\.9/)
  const defaults = normalizeUI(null)
  assert.equal(defaults.readingSize, 'standard')
})
