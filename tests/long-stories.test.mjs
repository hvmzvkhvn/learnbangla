import { test } from 'node:test'
import assert from 'node:assert/strict'
import { longStories, longPages, longParts, longArtPath } from '../src/data/playbook/long/index.js'

const BENGALI = /[ঀ-৿]/
const NOT_BENGALI_OK = /[^ঀ-৿।‌‍\s,.?!‘’“”'"—-]/
const ROMAN_OK = /^[A-Za-zãũẽĩõ0-9\s,.?!'‘’“”—-]+$/
const words = (s) => s.trim().split(/\s+/).length

function checkLine(where, x) {
  assert.ok(BENGALI.test(x.bn) && !NOT_BENGALI_OK.test(x.bn), `${where}: Bangla line has stray characters: ${x.bn}`)
  assert.ok(ROMAN_OK.test(x.roman ?? ''), `${where}: romanisation has stray characters: ${x.roman}`)
  assert.ok(typeof x.en === 'string' && x.en.trim().length > 3, `${where}: missing English`)
  assert.ok(/[।?!]["”]?$/.test(x.bn.trim()), `${where}: Bangla line should end with a stop: ${x.bn}`)
  assert.equal(words(x.bn), words(x.roman), `${where}: romanisation should have one word per Bangla word (${words(x.bn)} vs ${words(x.roman)}): ${x.bn}`)
}

test('every big story has fifty slides in five parts, told two ways', () => {
  assert.deepEqual(longStories.map((s) => s.id), ['kabuliwala', 'bhasha-andolon', 'begum-rokeya', 'sundarbans-honey'])
  assert.deepEqual(new Set(longStories.map((s) => s.topic)), new Set(['classic', 'history', 'people', 'nature']))
  const ids = new Set()
  for (const s of longStories) {
    assert.ok(!ids.has(s.id), `${s.id} is repeated`)
    ids.add(s.id)
    assert.ok(s.title && s.titleBn && s.blurb && ['classic', 'history', 'people', 'nature'].includes(s.topic), s.id)
    assert.ok(s.cast?.length > 80, `${s.id}: needs a cast description for the paintings`)
    assert.equal(s.parts.length, 5, `${s.id}: five parts`)
    assert.equal(s.beats.length, 50, `${s.id}: fifty slides, found ${s.beats.length}`)
    assert.equal(new Set(s.beats.map((b) => b.title)).size, 50, `${s.id}: slide headings must be unique`)
    s.beats.forEach((b, i) => {
      const where = `${s.id} slide ${i + 1}`
      assert.ok(b.paint?.length > 40, `${where}: needs a painting description`)
      assert.equal(b.easy.lines.length, 2, `${where}: easier telling has two lines`)
      assert.equal(b.hard.lines.length, 2, `${where}: fuller telling has two lines`)
      assert.ok(b.easy.en.length > 40, `${where}: easier narration`)
      assert.ok(b.hard.en.length > 150 && b.hard.deep.length > 200, `${where}: fuller narration and background should be substantial`)
      for (const line of b.easy.lines) { checkLine(`${where} easy`, line); assert.ok(words(line.bn) <= 9, `${where}: easier lines stay short: ${line.bn}`) }
      for (const line of b.hard.lines) { checkLine(`${where} hard`, line); assert.ok(words(line.bn) >= 14, `${where}: fuller lines should be long, complex sentences (${words(line.bn)} words): ${line.bn}`) }
    })
    const all = s.beats.flatMap((b) => [...b.easy.lines, ...b.hard.lines].map((x) => x.bn))
    assert.equal(new Set(all).size, all.length, `${s.id}: a Bangla line is repeated`)
  }
})

test('the reader gets fifty pages in either telling, with paintings numbered one to fifty', () => {
  for (const s of longStories) for (const level of ['easy', 'hard']) {
    const pages = longPages(s, level)
    assert.equal(pages.length, 50)
    assert.equal(longParts(s).length, 5)
    pages.forEach((p, i) => {
      assert.equal(p.art, longArtPath(s.id, i))
      assert.equal(p.more.length, 1)
      assert.equal(p.part, Math.floor(i / 10))
    })
    assert.match(pages[0].art, /-01\.webp$/)
    assert.match(pages[49].art, /-50\.webp$/)
  }
})
