// Turns a lesson into a sequence of steps: flashcards first, then generated exercises.
//
// Exercise shapes (rendered in components/lesson):
//   choice: { type, title, stem: {bn?, art?, text?, roman?}, options: [{bn?, art?, text?}], answer }
//   match:  { type, title, pairs: [{ left: {...}, right: {...} }] }
//   tiles:  { type, title, stem, tiles: [string], target: string, joiner: '' | ' ' }
//   trace:  { type, title, letter }
import { bank, categoryMeta, roster } from './bank'
import { shuffle, sample, splitClusters } from './text'

const get = (id) => bank.get(id)
let uid = 0
const nextId = () => `ex${++uid}`

// Build a choice question. `dim` is the option field that must be unique across options.
function choice({ itemId, title, stem, correct, candidates, dim, count = 4 }) {
  const seen = new Set([correct[dim]])
  const wrong = []
  for (const c of shuffle(candidates)) {
    if (c[dim] == null || seen.has(c[dim])) continue
    seen.add(c[dim])
    wrong.push(c)
    if (wrong.length === count - 1) break
  }
  if (wrong.length < 2) return null
  const options = shuffle([correct, ...wrong])
  return { id: nextId(), type: 'choice', itemId, title, stem, options, answer: options.indexOf(correct) }
}

const startsWithLetter = (item) => item.example && item.example.bn.startsWith(item.bn)

// ---- Pools ----------------------------------------------------------------
function poolFor(item, lessonItems) {
  const all = Array.from(bank.values())
  if (item.kind === 'word') {
    const sameCat = all.filter((x) => x.kind === 'word' && x.cat === item.cat)
    return sameCat.length >= 4 ? sameCat : all.filter((x) => x.kind === 'word' && x.visual === item.visual)
  }
  if (item.kind === 'sentence') {
    const sameGroup = all.filter((x) => x.kind === 'sentence' && x.group === item.group)
    return sameGroup.length >= 4 ? sameGroup : all.filter((x) => x.kind === 'sentence')
  }
  if (item.kind === 'sign' || item.kind === 'syllable') return all.filter((x) => x.kind === item.kind || x.kind === 'sign' || x.kind === 'syllable')
  if (item.kind === 'form') return all.filter((x) => x.kind === 'form' && x.verb === item.verb)
  if (item.kind === 'letter') {
    // vowels are quizzed against vowels, consonants against consonants
    const isVowel = (x) => x.section === 'Vowels'
    return all.filter((x) => x.kind === 'letter' && isVowel(x) === isVowel(item))
  }
  return all.filter((x) => x.kind === item.kind)
}

// ---- Per-item exercise candidates ---------------------------------------------
function letterExercises(item, lessonItems, track) {
  const pool = poolFor(item, lessonItems).filter((x) => x.id !== item.id)
  const ex = item.example
  const out = []
  const a = choice({
    itemId: item.id,
    title: startsWithLetter(item) ? 'Which picture starts with this letter?' : 'Which picture goes with this letter?',
    stem: { bn: item.bn },
    correct: { art: ex.emoji, bn: ex.bn },
    candidates: pool.map((p) => ({ art: p.example.emoji, bn: p.example.bn })).filter((o) => !(startsWithLetter(item) && o.bn.startsWith(item.bn))),
    dim: 'bn',
  })
  if (a) out.push(a)
  if (startsWithLetter(item)) {
    const b = choice({
      itemId: item.id,
      title: 'Which letter does this word start with?',
      stem: { art: ex.emoji, bn: ex.bn, roman: ex.roman },
      correct: { bn: item.bn },
      candidates: pool.map((p) => ({ bn: p.bn })),
      dim: 'bn',
    })
    if (b) out.push(b)
  }
  return out
}

function syllableExercises(item) {
  const pool = poolFor(item).filter((x) => x.id !== item.id)
  const out = []
  const a = choice({
    itemId: item.id,
    title: 'How do you say this?',
    stem: { bn: item.bn },
    correct: { text: item.roman },
    candidates: pool.map((p) => ({ text: p.roman })),
    dim: 'text',
  })
  const b = choice({
    itemId: item.id,
    title: `Which one says "${item.roman}"?`,
    stem: { text: item.roman },
    correct: { bn: item.bn },
    candidates: pool.map((p) => ({ bn: p.bn })),
    dim: 'bn',
  })
  return [a, b].filter(Boolean)
}

function wordExercises(item, lessonItems, track) {
  const pool = poolFor(item, lessonItems).filter((x) => x.id !== item.id)
  const out = []
  if (item.visual) {
    const a = choice({
      itemId: item.id,
      title: 'Which picture is this?',
      stem: { bn: item.bn, roman: item.roman },
      correct: { art: item.art },
      candidates: pool.map((p) => ({ art: p.art })),
      dim: 'art',
    })
    const b = choice({
      itemId: item.id,
      title: 'How do you say this in Bangla?',
      stem: { art: item.art, text: item.en },
      correct: { bn: item.bn },
      candidates: pool.map((p) => ({ bn: p.bn })),
      dim: 'bn',
    })
    out.push(a, b)
  } else {
    const a = choice({
      itemId: item.id,
      title: 'What does this mean?',
      stem: { bn: item.bn, roman: item.roman },
      correct: { text: item.en },
      candidates: pool.map((p) => ({ text: p.en })),
      dim: 'text',
    })
    const b = choice({
      itemId: item.id,
      title: 'How do you say this in Bangla?',
      stem: { text: item.en, art: item.art },
      correct: { bn: item.bn },
      candidates: pool.map((p) => ({ bn: p.bn })),
      dim: 'bn',
    })
    out.push(a, b)
  }
  return out.filter(Boolean)
}

function buildExercise(item) {
  const tiles = splitClusters(item.bn)
  if (tiles.length < 2 || tiles.length > 6 || /\s/.test(item.bn) || item.digit) return null
  return { id: nextId(), type: 'tiles', itemId: item.id, title: 'Build the word', stem: { art: item.art, text: item.en }, tiles, target: item.bn, joiner: '', say: item.bn }
}

function sentenceExercises(item) {
  const pool = poolFor(item).filter((x) => x.id !== item.id)
  const a = choice({
    itemId: item.id,
    title: 'What does this mean?',
    stem: { bn: item.bn, roman: item.roman },
    correct: { text: item.en },
    candidates: pool.map((p) => ({ text: p.en })),
    dim: 'text',
  })
  const out = [a]
  if (item.tokens.length >= 2) {
    out.push({
      id: nextId(),
      type: 'tiles',
      itemId: item.id,
      title: 'Put the words in order',
      stem: { text: item.en },
      tiles: item.tokens,
      target: item.tokens.join(' '),
      joiner: ' ',
      speakTiles: true,
      say: item.bn,
    })
  }
  return out.filter(Boolean)
}

function formExercises(item) {
  const pool = poolFor(item).filter((x) => x.id !== item.id)
  const fill = choice({
    itemId: item.id,
    title: 'Fill the gap',
    stem: { bn: `${item.pronoun} ____`, text: item.en, noAudio: true },
    correct: { bn: item.form },
    candidates: item.allForms.map((f) => ({ bn: f })),
    dim: 'bn',
    count: 3,
  })
  const meaning = choice({
    itemId: item.id,
    title: 'What does this mean?',
    stem: { bn: item.bn, roman: item.roman },
    correct: { text: item.en },
    candidates: pool.map((p) => ({ text: p.en })),
    dim: 'text',
    count: 3,
  })
  return [fill, meaning].filter(Boolean)
}

// ---- Conversation lines ---------------------------------------------------------------------
const whoName = (id) => roster[id]?.en ?? id

function lineExercises(item) {
  const all = Array.from(bank.values()).filter((x) => x.kind === 'line' && x.track === item.track)
  const others = all.filter((x) => x.id !== item.id)
  const out = []

  const meaning = choice({
    itemId: item.id,
    title: `${whoName(item.speaker)} says this. What does it mean?`,
    stem: { art: item.art, bn: item.bn, roman: item.roman },
    correct: { text: item.en },
    candidates: others.map((p) => ({ text: p.en })),
    dim: 'text',
  })
  if (meaning) out.push({ ...meaning, tag: 'meaning' })

  const max = item.track === 'young' ? 4 : 7
  if (item.tokens.length >= (item.track === 'young' ? 2 : 3) && item.tokens.length <= max) {
    out.push({
      id: nextId(), type: 'tiles', tag: 'tiles', itemId: item.id, title: 'Put the words in order',
      stem: { art: item.art, text: item.en }, tiles: item.tokens, target: item.tokens.join(' '), joiner: ' ', speakTiles: true, say: item.bn,
    })
  }

  // "How do you reply?" — only for substantial lines, with distractors that are clearly other conversations.
  const prev = item.prevId ? bank.get(item.prevId) : null
  if (prev && prev.speaker !== item.speaker && item.tokens.length >= 3) {
    const pool = others.filter((x) => x.speaker === item.speaker && x.sceneKey !== item.sceneKey && x.tokens.length >= 3)
    const reply = choice({
      itemId: item.id,
      title: item.speaker === 't' ? `${whoName(prev.speaker)} says this. How do you reply?` : `${whoName(prev.speaker)} says this. How does ${whoName(item.speaker)} reply?`,
      stem: { art: roster[prev.speaker]?.emoji, bn: prev.bn, roman: prev.roman, text: prev.en },
      correct: { bn: item.bn },
      candidates: pool.map((x) => ({ bn: x.bn })),
      dim: 'bn',
    })
    if (reply) out.push({ ...reply, tag: 'reply' })
  }
  return out
}

const candidatesFor = (item, lessonItems, track) => {
  switch (item.kind) {
    case 'line': return lineExercises(item)
    case 'letter': return letterExercises(item, lessonItems, track)
    case 'sign':
    case 'syllable': return syllableExercises(item)
    case 'word': return wordExercises(item, lessonItems, track)
    case 'sentence': return sentenceExercises(item)
    case 'form': return formExercises(item)
    default: return []
  }
}

// ---- Matching -----------------------------------------------------------------------
function matchExercise(items) {
  const pairs = []
  const seen = new Set()
  for (const item of items) {
    let left, right, key
    if (item.kind === 'letter') {
      left = { bn: item.bn }
      right = { art: item.example.emoji, bn: item.example.bn }
      key = item.example.bn
    } else if (item.kind === 'word') {
      left = { bn: item.bn }
      right = item.visual ? { art: item.art } : { text: item.en }
      key = item.visual ? item.art : item.en
    } else continue
    if (seen.has(key)) continue
    seen.add(key)
    pairs.push({ left, right })
    if (pairs.length === 5) break
  }
  if (pairs.length < 3) return null
  return { id: nextId(), type: 'match', title: 'Match them up', pairs }
}

// "Put the conversation in order": three consecutive lines as tiles.
function conversationOrder(lines, scene) {
  if (lines.length < 3) return null
  const i = Math.floor(Math.random() * (lines.length - 2))
  const trio = lines.slice(i, i + 3)
  if (new Set(trio.map((l) => l.bn)).size < 3) return null
  return {
    id: nextId(), type: 'tiles', title: 'Put the conversation in order', stem: { art: scene?.emoji, text: scene?.title },
    tiles: trio.map((l) => l.bn), target: trio.map((l) => l.bn).join('\n'), joiner: '\n', speakTiles: true, compact: true,
  }
}

// ---- Lesson assembly ------------------------------------------------------------------
export function buildLesson(lesson, trackKey) {
  uid = 0
  const young = trackKey === 'young'
  const learnItems = lesson.learn.map(get).filter(Boolean)
  const practiceItems = (lesson.practice ?? []).map(get).filter(Boolean)

  if (lesson.kind === 'polite') {
    const exercises = (lesson.polite ?? []).map((c) => {
      const face = (id) => {
        const it = get(id)
        return { bn: it.bn, roman: it.roman }
      }
      const options = shuffle([face(c.rightId), ...c.wrongIds.map(face)])
      return { id: nextId(), type: 'choice', itemId: c.rightId, title: c.title, stem: { ...c.stem, noAudio: true }, options, answer: options.findIndex((o) => o.bn === get(c.rightId).bn) }
    })
    return { learn: [], exercises: shuffle(exercises) }
  }

  if (lesson.kind === 'dialogue') {
    const lines = learnItems
    const all = lines.flatMap((l) => candidatesFor(l, lines, trackKey))
    const take = (tag, n) => sample(all.filter((e) => e.tag === tag), n)
    const exercises = shuffle([...take('meaning', young ? 2 : 3), ...take('reply', young ? 2 : 4), ...take('tiles', young ? 1 : 2)])
    if (!young) {
      const co = conversationOrder(lines, { emoji: lesson.emoji, title: lesson.title })
      if (co) exercises.push(co)
    }
    return { learn: [], scene: { lines, emoji: lesson.emoji, title: lesson.title }, exercises }
  }

  if (lesson.kind === 'review') {
    const items = sample((lesson.reviewOf ?? []).map(get).filter(Boolean), young ? 8 : 10)
    const exercises = items.flatMap((item) => {
      const cands = candidatesFor(item, items, trackKey)
      return cands.length ? [cands[Math.floor(Math.random() * cands.length)]] : []
    })
    const m = matchExercise(items)
    if (m) exercises.splice(Math.min(4, exercises.length), 0, m)
    return { learn: [], exercises }
  }

  let choices = []
  let tail = []
  const cap = lesson.kind === 'forms' ? 12 : 10

  if (lesson.kind === 'signs') {
    choices = learnItems.flatMap((i) => candidatesFor(i, learnItems, trackKey))
    choices.push(
      ...sample(practiceItems, 7).flatMap((i) => {
        const c = candidatesFor(i)
        return c.length ? [c[Math.floor(Math.random() * c.length)]] : []
      }),
    )
  } else {
    choices = learnItems.flatMap((i) => candidatesFor(i, learnItems, trackKey))
  }
  choices = shuffle(choices).slice(0, cap)

  if (lesson.kind === 'words' && !young) {
    tail.push(...sample(learnItems.map(buildExercise).filter(Boolean), 3))
  }
  const match = lesson.kind === 'letters' || lesson.kind === 'words' ? matchExercise(learnItems) : null
  if (match) choices.splice(Math.min(4, choices.length), 0, match)

  if (lesson.kind === 'letters') {
    const traceItems = young ? learnItems : sample(learnItems, 2)
    tail.push(...traceItems.map((i) => ({ id: nextId(), type: 'trace', itemId: i.id, title: 'Trace the letter', letter: i.bn })))
  }

  return { learn: learnItems, exercises: [...choices, ...tail] }
}

export const countsForStars = (exercises) => exercises.filter((e) => e.type !== 'trace').length
export { categoryMeta }
