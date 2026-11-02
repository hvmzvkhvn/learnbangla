import { test } from 'node:test'
import assert from 'node:assert/strict'
import { exploreProfiles } from '../src/data/exploreProfile.js'


const BENGALI = /[ঀ-৿]/
const NOT_OK = /[^ঀ-৿।‌‍\s,.?!‘’“”'"—-]/
const ROMAN_OK = /^[A-Za-zãũẽĩõ0-9\s,.?!'‘’“”—-]+$/
const words = (s) => s.trim().split(/\s+/).length

test('every region sheet has food, nature, festivals, people, a language note and facts', () => {
  assert.deepEqual(Object.keys(exploreProfiles).sort(), ['barishal', 'chattogram', 'dhaka', 'khulna', 'mymensingh', 'rajshahi', 'rangpur', 'sylhet'])
  const seen = new Set()
  for (const [id, p] of Object.entries(exploreProfiles)) {
    assert.deepEqual([p.food.length, p.nature.length, p.festivals.length, p.people.length, p.facts.length], [4, 4, 3, 3, 3], id)
    assert.ok(p.speech.length > 150, `${id}: language note`)
    for (const kind of ['food', 'nature', 'festivals', 'people']) for (const x of p[kind]) {
      const where = `${id}/${kind}`
      assert.ok(BENGALI.test(x.bn) && !NOT_OK.test(x.bn), `${where}: stray characters in ${x.bn}`)
      assert.ok(ROMAN_OK.test(x.roman), `${where}: stray characters in romanisation ${x.roman}`)
      assert.ok(/[।?!]$/.test(x.bn.trim()), `${where}: needs a stop: ${x.bn}`)
      assert.equal(words(x.bn), words(x.roman), `${where}: word counts differ: ${x.bn}`)
      assert.ok(x.en && x.note.length > 40, `${where}: English and note`)
      assert.ok(!seen.has(x.bn), `${where}: repeated line ${x.bn}`)
      seen.add(x.bn)
      if (kind === 'people') assert.ok(x.name && x.nameBn, `${where}: person needs a name`)
      else assert.ok(x.emoji, `${where}: emoji`)
    }
  }
})
