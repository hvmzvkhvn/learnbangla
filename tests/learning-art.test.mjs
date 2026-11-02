import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
const root = resolve(import.meta.dirname, '..')
const art = JSON.parse(readFileSync(resolve(root, 'src/art/learning-art.json'), 'utf8'))

test('every learning illustration reference has a real WebP asset with a useful label', () => {
  for (const [symbol, picture] of Object.entries(art)) {
    assert.ok(picture.label?.trim(), symbol)
    if (picture.kind !== 'image') continue
    const file = resolve(root, 'public', picture.src)
    assert.ok(existsSync(file), `Missing ${symbol}: ${picture.src}`)
    const bytes = readFileSync(file)
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF', picture.src)
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP', picture.src)
  }
})

test('curriculum symbols have shared illustration or icon mappings', () => {
  const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' })
  const missing = new Set()
  function walk(dir) {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const file = resolve(dir, e.name)
      if (e.isDirectory()) {
        if (e.name !== 'playbook') walk(file)
      } else if (file.endsWith('.js')) {
        for (const { segment } of segmenter.segment(readFileSync(file, 'utf8')))
          if (/\p{Extended_Pictographic}|\p{Regional_Indicator}/u.test(segment) && !art[segment]) missing.add(segment)
      }
    }
  }
  walk(resolve(root, 'src/data'))
  walk(resolve(root, 'src/curriculum'))
  assert.deepEqual([...missing], [])
})

test('ambiguous old symbols now resolve to distinct educational meanings', () => {
  assert.equal(art.pink.kind, 'colour')
  assert.notEqual(art.sugar.src, art.salt.src)
  assert.equal(art['water-lily'].src, art['🪷'].src)
  assert.notEqual(art['shaheed-minar'].src, art['🕯️'].src)
  assert.notEqual(art['🎣'].src, art['🐟'].src)
})

test('shared renderer preserves Bangla text and numbers and recognises joined family symbols', async () => {
  const { createServer } = await import('vite')
  const { createElement } = await import('react')
  const { renderToStaticMarkup } = await import('react-dom/server')
  const server = await createServer({ server: { middlewareMode: true, hmr: false, watch: null }, appType: 'custom' })
  try {
    const { default: VisualText } = await server.ssrLoadModule('/src/art/VisualText.jsx')
    const render = (children) => renderToStaticMarkup(createElement(VisualText, null, children))
    const family = render('👨‍👩‍👧')
    assert.equal((family.match(/<img /g) || []).length, 1)
    assert.match(family, /alt="Family"/)
    assert.equal(render('বাংলা ১২৩'), 'বাংলা ১২৩')
    assert.equal(render('1️⃣2️⃣'), '১২')
    assert.equal(render('A pink flower'), 'A pink flower')
    assert.match(render('pink'), /learning-swatch/)
    assert.match(render('✅'), /<svg/)
    assert.ok(!render('✅').includes('✅'))
    assert.match(render('🥭'), /loading="lazy"/)
  } finally {
    await server.close()
  }
})

test('vocabulary and alphabet picture keys resolve without changing written numbers', async () => {
  const { wordCategories } = await import('../src/data/words.js')
  const { teenWordCategories } = await import('../src/data/teenWords.js')
  const { adultWordCategories } = await import('../src/data/adultText.js')
  const { vowels, consonantGroups } = await import('../src/data/alphabet.js')
  const examples = [...vowels, ...consonantGroups.flatMap(g => g.letters)].map(letter => letter.example)
  const words = [...wordCategories, ...teenWordCategories, ...adultWordCategories].flatMap(category => category.words)
  for (const word of [...words, ...examples]) {
    if (!word.emoji || word.digit || /^(?:[0-9]\uFE0F?\u20E3)+$/u.test(word.emoji)) continue
    assert.ok(art[word.emoji], `${word.en}: ${word.emoji}`)
  }
})

test('picture games never offer two symbols that render the same picture', async () => {
  const { createServer } = await import('vite')
  const server = await createServer({ server: { middlewareMode: true, hmr: false, watch: null }, appType: 'custom' })
  try {
    const { uniquePictureItems } = await server.ssrLoadModule('/src/art/visualIdentity.js')
    assert.equal(uniquePictureItems([{ art: '🏠' }, { art: '🏡' }, { art: '🐄' }]).length, 2)
    const { bank } = await server.ssrLoadModule('/src/curriculum/bank.js')
    const { pictureQuestion } = await server.ssrLoadModule('/src/curriculum/exercises.js')
    const cat = 'test:shared-pictures'
    const fixtures = ['🏡', '🐄', '☀️'].map((symbol, i) => ({ id: `${cat}:${i}`, kind: 'word', cat, art: symbol, bn: String(i) }))
    for (const item of fixtures) bank.set(item.id, item)
    try {
      const q = pictureQuestion({ id: `${cat}:target`, kind: 'word', visual: true, cat, art: '🏠', bn: 'বাড়ি' })
      assert.equal(q.options.length, 3)
      assert.ok(!q.options.some(option => option.art === '🏡'))
      assert.equal(q.options[q.answer].art, '🏠')
    } finally {
      for (const item of fixtures) bank.delete(item.id)
    }
  } finally {
    await server.close()
  }
})
