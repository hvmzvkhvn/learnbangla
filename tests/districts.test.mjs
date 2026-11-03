import { test } from 'node:test'
import assert from 'node:assert/strict'
import { districtStories, districtsOf, districtArtPath } from '../src/data/playbook/districts/index.js'

const BENGALI = /[ঀ-৿]/
const NOT_OK = /[^ঀ-৿।‌‍\s,.?!‘’“”'"—-]/
const ROMAN_OK = /^[A-Za-zãũẽĩõ0-9\s,.?!'‘’“”—-]+$/
const words = (s) => s.trim().split(/\s+/).length
const DIVISIONS = ['barishal', 'chattogram', 'dhaka', 'khulna', 'mymensingh', 'rajshahi', 'rangpur', 'sylhet']

test('thirty-two district stories, every division covered, each with eight chapters', () => {
  assert.deepEqual(Object.keys(districtStories).sort(), ['bagerhat', 'bandarban', 'bogura', 'brahmanbaria', 'chapainawabganj', 'chattogram', 'coxsbazar', 'cumilla', 'dhaka', 'dinajpur', 'faridpur', 'gazipur', 'habiganj', 'jashore', 'khulna', 'kishoreganj', 'kushtia', 'moulvibazar', 'munshiganj', 'naogaon', 'narayanganj', 'natore', 'netrokona', 'noakhali', 'pabna', 'patuakhali', 'rajshahi', 'satkhira', 'sirajganj', 'sunamganj', 'sylhet', 'tangail'])
  for (const d of Object.values(districtStories)) assert.ok(DIVISIONS.includes(d.division), d.id)
  for (const div of DIVISIONS) assert.ok(districtsOf(div).length >= 1, div)
  for (const [id, d] of Object.entries(districtStories)) {
    assert.ok(d.name && d.nameBn, id)
    assert.equal(d.chapters.length, 8, `${id}: eight chapters`)
    assert.equal(new Set(d.chapters.map((c) => c.heading)).size, 8, `${id}: unique headings`)
    d.chapters.forEach((ch, i) => {
      const where = `${id} chapter ${i + 1}`
      assert.ok(ch.paint?.length > 40, `${where}: painting description`)
      assert.ok(ch.en.length > 150 && ch.deep.length > 250, `${where}: narration and background`)
      const lines = [ch.main, ...ch.more]
      assert.equal(lines.length, 3, `${where}: three lines`)
      for (const x of lines) {
        assert.ok(BENGALI.test(x.bn) && !NOT_OK.test(x.bn), `${where}: stray characters in ${x.bn}`)
        assert.ok(ROMAN_OK.test(x.roman), `${where}: stray characters in romanisation ${x.roman}`)
        assert.ok(/[।?!]$/.test(x.bn.trim()), `${where}: needs a stop: ${x.bn}`)
        assert.equal(words(x.bn), words(x.roman), `${where}: word counts differ: ${x.bn}`)
        assert.ok(words(x.bn) >= 7 && x.en?.length > 15, `${where}: line too short: ${x.bn}`)
      }
    })
    assert.equal(d.panels.length, 8)
    assert.equal(d.panels[7].art, districtArtPath(id, 7))
  }
})
