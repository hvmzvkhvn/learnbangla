import { test } from 'node:test'
import assert from 'node:assert/strict'
import { divisionStories } from '../src/data/playbook/divisions/index.js'
import { divisionArtPath } from '../src/data/playbook/divisions/helpers.js'
import { regionStoryboards } from '../src/data/playbook/storyboards.js'

const BENGALI = /[ঀ-৿]/
const NOT_OK = /[^ঀ-৿।‌‍\s,.?!‘’“”'"—-]/
const ROMAN_OK = /^[A-Za-zãũẽĩõ0-9\s,.?!'‘’“”—-]+$/
const words = (s) => s.trim().split(/\s+/).length

test('every division has twelve chapters with three Bangla lines each', () => {
  assert.deepEqual(Object.keys(divisionStories).sort(), Object.keys(regionStoryboards).sort())
  for (const [id, d] of Object.entries(divisionStories)) {
    assert.ok(d.title && d.titleBn, id)
    assert.equal(d.chapters.length, 12, `${id}: twelve chapters`)
    assert.equal(new Set(d.chapters.map((c) => c.heading)).size, 12, `${id}: headings must be unique`)
    d.chapters.forEach((ch, i) => {
      const where = `${id} chapter ${i + 1}`
      assert.ok(ch.paint?.length > 40, `${where}: needs a painting description`)
      assert.ok(ch.en.length > 150 && ch.deep.length > 250, `${where}: narration and background should be substantial`)
      const lines = [ch.main, ...ch.more]
      assert.equal(lines.length, 3, `${where}: three lines`)
      for (const x of lines) {
        assert.ok(BENGALI.test(x.bn) && !NOT_OK.test(x.bn), `${where}: stray characters in ${x.bn}`)
        assert.ok(ROMAN_OK.test(x.roman), `${where}: stray characters in romanisation ${x.roman}`)
        assert.ok(/[।?!]$/.test(x.bn.trim()), `${where}: Bangla line should end with a stop: ${x.bn}`)
        assert.equal(words(x.bn), words(x.roman), `${where}: word counts differ: ${x.bn}`)
        assert.ok(words(x.bn) >= 7, `${where}: line too short: ${x.bn}`)
        assert.ok(x.en?.length > 15, `${where}: English missing`)
      }
    })
    assert.equal(d.panels.length, 12)
    assert.match(d.panels[0].art, new RegExp(`${id}-01\\.webp$`))
    assert.equal(d.panels[11].art, divisionArtPath(id, 11))
  }
})
