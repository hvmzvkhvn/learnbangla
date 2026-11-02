import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { youngBooks, olderBooks } from '../src/data/playbook/books.js'
import { regionStoryboards, timelineStory } from '../src/data/playbook/storyboards.js'
import { historyStories } from '../src/data/playbook/history.js'

const asset = (path) => new URL(`../public/${path}`, import.meta.url)
const BENGALI = /[\u0980-\u09FF]/
const NOT_BENGALI_OK = /[^\u0980-\u09FF\u0964\u200c\u200d\s,.?!\u2018\u2019\u201c\u201d'"\u2014-]/ // anything in a Bangla line that is not Bengali script or plain punctuation
const ROMAN_OK = /^[A-Za-z\u00e3\u0169\u1ebd\u0129\u00f50-9\s,.?!'\u2019-]+$/

function checkLine(where, x) {
  assert.ok(BENGALI.test(x.bn) && !NOT_BENGALI_OK.test(x.bn), `${where}: Bangla line has stray characters: ${x.bn}`)
  assert.ok(ROMAN_OK.test(x.roman ?? ''), `${where}: romanisation has stray characters: ${x.roman}`)
  assert.ok(typeof x.en === 'string' && x.en.trim().length > 1, `${where}: missing English`)
  assert.ok(x.bn.trim().endsWith('।') || x.bn.trim().endsWith('?') || x.bn.trim().endsWith('!'), `${where}: Bangla line should end with a stop: ${x.bn}`)
}
const linesOf = (page) => [page, ...(page.more ?? [])]

test('every picture book has chapters, and every page carries two extra readings', () => {
  for (const [group, books] of [['young', youngBooks], ['older', olderBooks]]) {
    assert.equal(books.length, 6)
    for (const book of books) {
      assert.ok(book.pages[0].chapter, `${book.id}: the first page must start a chapter`)
      assert.ok(book.pages.filter((p) => p.chapter).length >= 2, `${book.id}: needs at least two chapters`)
      for (const [i, page] of book.pages.entries()) {
        assert.equal(page.more?.length, 2, `${book.id} page ${i + 1} (${group}) needs two extra readings`)
        const seen = new Set()
        for (const line of linesOf(page)) {
          checkLine(`${book.id} page ${i + 1}`, line)
          assert.ok(!seen.has(line.bn), `${book.id} page ${i + 1}: repeated line`)
          seen.add(line.bn)
        }
      }
    }
  }
})

test('every division and timeline chapter has background paragraphs and extra Bangla lines', () => {
  const stories = [...Object.entries(regionStoryboards).map(([id, s]) => [id, s.panels]), ['timeline', timelineStory.panels]]
  let panels = 0
  for (const [id, list] of stories)
    for (const [i, page] of list.entries()) {
      panels++
      assert.ok(page.deep?.length >= 1 && page.deep.every((t) => t.length > 150), `${id} panel ${i + 1} needs a real background paragraph`)
      assert.equal(page.more?.length, 2, `${id} panel ${i + 1} needs two extra lines`)
      for (const line of linesOf(page)) checkLine(`${id} panel ${i + 1}`, line)
    }
  assert.equal(panels, 45)
})

test('the new histories are complete and have dedicated paintings', () => {
  assert.deepEqual(Object.keys(historyStories).sort(), ['ancient-mughal', 'colonial', 'language-liberation', 'people-culture'])
  for (const [id, story] of Object.entries(historyStories)) {
    assert.ok(story.title && story.titleBn && story.span, id)
    assert.ok(story.panels.length >= 7, `${id}: too short`)
    assert.equal(new Set(story.panels.map((p) => p.label)).size, story.panels.length, `${id}: chapter labels must be unique`)
    for (const [i, page] of story.panels.entries()) {
      const where = `${id} chapter ${i + 1}`
      assert.ok(existsSync(asset(page.art)), `${where}: missing painting ${page.art}`)
      assert.ok(page.en.length > 150 && page.deep?.[0]?.length > 150, `${where}: narration and background should be substantial`)
      assert.ok(page.lineEn, `${where}: the main Bangla line needs its own English`)
      assert.equal(page.more.length, 2, `${where}: two extra lines`)
      for (const line of [{ bn: page.bn, roman: page.roman, en: page.lineEn }, ...page.more]) checkLine(where, line)
    }
  }
})

test('the longer Playbook adds a substantial amount of reading', () => {
  const count = (pages) => pages.reduce((n, p) => n + linesOf(p).length, 0)
  assert.equal(count(youngBooks.flatMap((b) => b.pages)), 108)
  assert.equal(count(olderBooks.flatMap((b) => b.pages)), 126)
  const history = Object.values(historyStories).flatMap((s) => s.panels)
  assert.equal(history.length, 32)
})
