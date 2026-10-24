// The content bank: every letter, sign, syllable, word and sentence in the curriculum,
// each with a stable id. Lessons only refer to ids, so one correction fixes everywhere.
import { vowels, consonantGroups, vowelSigns } from '../data/alphabet'
import { wordCategories } from '../data/words'
import { sentenceGroups, verbs, pronounForms } from '../data/sentences'
import { roster, phrases, scenes, politeYoung, politeOlder, unitLayout, ADDRESS_TIP } from '../data/family'
import { conjuncts } from '../data/conjuncts'
import { teenWordCategories } from '../data/teenWords'
import { teenSentenceGroups, tenseVerbs, tensePronouns } from '../data/teenSentences'
import { poems, passages, cinemaScenes } from '../data/teenText'
import { stories } from '../data/stories'

export const bank = new Map()
const add = (item) => {
  bank.set(item.id, item)
  return item.id
}

// ---- Letters -------------------------------------------------------------
export const vowelIds = vowels.map((v) =>
  add({ id: `letter:${v.letter}`, kind: 'letter', section: 'Vowels', bn: v.letter, roman: v.roman, art: v.example.emoji, example: v.example }),
)

export const consonantGroupIds = consonantGroups.map((g) => ({
  name: g.name,
  hint: g.hint,
  ids: g.letters.map((c) =>
    add({ id: `letter:${c.letter}`, kind: 'letter', section: g.name, bn: c.letter, roman: c.roman, art: c.example.emoji, example: c.example }),
  ),
}))

// ---- Vowel signs (shown on ক) and practice syllables ----------------------
export const signIds = vowelSigns.map((s) =>
  add({ id: `sign:${s.sign}`, kind: 'sign', section: 'Vowel signs', bn: s.combined, roman: s.combinedRoman, signChar: s.sign, signRoman: s.roman }),
)

const SYL_CONSONANTS = ['ক', 'গ', 'চ', 'জ', 'ত', 'দ', 'ন', 'প', 'ব', 'ম', 'র', 'ল', 'শ', 'হ']
const stemOf = (letter) => bank.get(`letter:${letter}`).roman.replace(/o$/, '')

export const syllableIdsBySign = vowelSigns.map((s, i) => {
  const pool = s.sign === 'ৃ' ? ['ম', 'দ', 'হ', 'ত'] : [0, 1, 2, 3].map((j) => SYL_CONSONANTS[(i * 3 + j + 1) % SYL_CONSONANTS.length])
  return pool
    .filter((c) => c !== 'ক')
    .map((c) => add({ id: `syl:${c}${s.sign}`, kind: 'syllable', section: 'Vowel signs', bn: c + s.sign, roman: stemOf(c) + s.roman }))
})

// ---- Words ---------------------------------------------------------------
export const wordIdsByCat = {}
export const categoryMeta = {}
wordCategories.forEach((c) => {
  categoryMeta[c.key] = { title: c.title, emoji: c.emoji, visual: Boolean(c.visual), note: c.note }
  wordIdsByCat[c.key] = c.words.map((w) =>
    add({
      id: `word:${c.key}:${w.bn}`,
      kind: 'word',
      section: c.title,
      cat: c.key,
      visual: Boolean(c.visual),
      bn: w.bn,
      roman: w.roman,
      en: w.en,
      art: w.digit || w.emoji,
      digit: w.digit,
    }),
  )
})

// ---- Sentences -------------------------------------------------------------
export const sentenceIdsByGroup = {}
export const sentenceMeta = {}
sentenceGroups.forEach((g) => {
  sentenceMeta[g.key] = { title: g.title, emoji: g.emoji }
  sentenceIdsByGroup[g.key] = g.sentences.map((s) =>
    add({ id: `sent:${s.bn}`, kind: 'sentence', section: g.title, group: g.key, bn: s.bn, roman: s.roman, en: s.en, tokens: s.bn.split(' ') }),
  )
})

// ---- Verb patterns ---------------------------------------------------------
export const formIdsByVerb = {}
verbs.forEach((v) => {
  formIdsByVerb[v.key] = pronounForms.map((p, i) =>
    add({
      id: `form:${v.key}:${p.roman}`,
      kind: 'form',
      section: `Verb: ${v.inf} (to ${v.en})`,
      verb: v.key,
      pronoun: p.bn,
      form: v.forms[i],
      bn: `${p.bn} ${v.forms[i]}`,
      roman: `${p.roman} ${v.romans[i]}`,
      en: `${p.en} ${v.enForms[i]}`,
      tokens: [p.bn, v.forms[i]],
      allForms: v.forms,
    }),
  )
})

// ---- Family unit: phrases, আপনি/তুমি practice and conversations -------------------------------
export { roster, unitLayout, ADDRESS_TIP }
const AGES = { young: '5–7', older: '8–12' }

export const family = {}
for (const track of ['young', 'older']) {
  const phraseIds = phrases[track].map((p) =>
    add({
      id: `sent:fam:${track}:${p.bn}`, kind: 'sentence', section: `Family · Everyday phrases (${AGES[track]})`,
      group: `fam-phrases-${track}`, bn: p.bn, roman: p.roman, en: p.en, tokens: p.bn.split(' '),
    }),
  )

  // আপনি / তুমি practice
  let polite
  if (track === 'young') {
    const apni = 'word:pronouns:আপনি'
    const tumi = 'word:pronouns:তুমি'
    polite = politeYoung.map((c) => ({
      title: c.title, stem: { art: c.art, text: c.who },
      rightId: c.right === 'আপনি' ? apni : tumi, wrongIds: [c.right === 'আপনি' ? tumi : apni],
    }))
  } else {
    polite = politeOlder.map((c) => {
      const mk = (x) =>
        add({ id: `sent:polite:${x.bn}`, kind: 'sentence', section: 'Family · আপনি or তুমি? (8–12)', group: 'fam-polite', bn: x.bn, roman: x.roman, en: x.en, tokens: x.bn.split(' ') })
      const rightId = c.existing ? `sent:${c.right.bn}` : mk(c.right)
      const wrongIds = c.wrong.map((w) => (c.existing ? `sent:${w.bn}` : mk(w)))
      return { title: c.title, stem: { art: c.art }, rightId, wrongIds }
    })
  }

  // conversations
  const sceneList = scenes[track].map((sc) => {
    const lineIds = []
    sc.lines.forEach((l, i) => {
      const id = `line:${track}:${sc.key}:${i}`
      lineIds.push(
        add({
          id, kind: 'line', track, sceneKey: sc.key, sceneTitle: sc.title, section: `Family · ${sc.title} (${AGES[track]})`,
          speaker: l.who, speakerName: roster[l.who].en, bn: l.bn, roman: l.roman, en: l.en, art: l.art,
          tokens: l.bn.split(' '), prevId: i > 0 ? `line:${track}:${sc.key}:${i - 1}` : null,
        }),
      )
    })
    return { key: sc.key, title: sc.title, emoji: sc.emoji, tip: sc.tip, lineIds }
  })
  family[track] = { phraseIds, polite, scenes: sceneList }
}

// ---- 13–18 tracks: conjuncts, vocabulary, sentences, tenses, poems, passages, scenes, stories --------------------
export const conjunctIds = conjuncts.map((c) =>
  add({ id: `letter:${c.letter}`, kind: 'letter', section: 'Conjuncts', bn: c.letter, roman: c.roman, art: c.example.emoji, example: c.example }),
)

teenWordCategories.forEach((c) => {
  categoryMeta[c.key] = { title: c.title, emoji: c.emoji, visual: false, note: c.note }
  wordIdsByCat[c.key] = c.words.map((w) =>
    add({ id: `word:${c.key}:${w.bn}`, kind: 'word', section: c.title, cat: c.key, visual: false, bn: w.bn, roman: w.roman, en: w.en, art: w.emoji }),
  )
})

teenSentenceGroups.forEach((g) => {
  sentenceMeta[g.key] = { title: g.title, emoji: g.emoji }
  sentenceIdsByGroup[g.key] = g.sentences.map((x) =>
    add({ id: `sent:${x.bn}`, kind: 'sentence', section: g.title, group: g.key, bn: x.bn, roman: x.roman, en: x.en, tokens: x.bn.split(' ') }),
  )
})

// Perfect / future patterns: tense -> verb -> [আমি, তুমি, আপনি] form ids
export const formIdsByTense = { perfect: {}, future: {} }
tenseVerbs.forEach((v) => {
  ;['perfect', 'future'].forEach((tense) => {
    const t = v[tense]
    formIdsByTense[tense][v.key] = tensePronouns.map((p, i) =>
      add({
        id: `form:${tense}:${v.key}:${p.roman}`, kind: 'form', section: `Verb: ${v.inf} (${tense})`, verb: `${tense}:${v.key}`,
        pronoun: p.bn, form: t.forms[i], bn: `${p.bn} ${t.forms[i]}`, roman: `${p.roman} ${t.romans[i]}`,
        en: `${p.en} ${t.enForm}`, tokens: [p.bn, t.forms[i]], allForms: t.forms,
      }),
    )
  })
})

// Poems, passages and cinema conversations as lines (kind 'line'), per track.
const TEEN_AGES = { teen: '13–15', senior: '16–18' }
export const teenText = {}
for (const track of ['teen', 'senior']) {
  const mk = (sceneKey, sceneTitle, label, lines, speakerOf) =>
    lines.map((l, i) =>
      add({
        id: `line:${track}:${sceneKey}:${i}`, kind: 'line', track, sceneKey, sceneTitle, section: `${label} · ${sceneTitle} (${TEEN_AGES[track]})`,
        speaker: speakerOf(l), speakerName: speakerOf(l) === 'text' ? '' : roster[speakerOf(l)]?.en,
        bn: l.bn, roman: l.roman, en: l.en, tokens: l.bn.split(' '), prevId: i > 0 ? `line:${track}:${sceneKey}:${i - 1}` : null,
      }),
    )
  teenText[track] = {
    poems: poems.map((p) => ({ key: p.key, title: p.title, emoji: p.emoji, author: p.author, note: p.note, lineIds: mk(`poem-${p.key}`, p.title, 'Poem', p[track], () => 'text') })),
    passages: passages.map((p) => ({
      key: p.key, title: p.title, emoji: p.emoji, questions: p[track].questions,
      lineIds: mk(`read-${p.key}`, p.title, 'Reading', p[track].lines, () => 'text'),
    })),
    scenes: Object.entries(cinemaScenes).map(([key, sc]) => ({ key, title: sc.title, emoji: sc.emoji, lineIds: mk(`scene-${key}`, sc.title, 'Conversation', sc.lines, (l) => l.who) })),
  }
}

// Story beats: every NPC line and every reply option, so they are reviewed and recorded like everything else.
export const storyBeatIds = {}
stories.forEach((st) => {
  storyBeatIds[st.id] = []
  Object.entries(st.nodes).forEach(([nid, n]) => {
    if (n.bn) {
      storyBeatIds[st.id].push(
        add({ id: `beat:${st.id}:${nid}`, kind: 'beat', section: `Story · ${st.title}`, speaker: n.who, speakerName: st.cast[n.who]?.en, bn: n.bn, roman: n.roman, en: n.en, tokens: n.bn.split(' ') }),
      )
    }
    ;(n.choice ?? []).forEach((opt, i) => {
      storyBeatIds[st.id].push(
        add({ id: `beat:${st.id}:${nid}:${i}`, kind: 'beat', section: `Story · ${st.title}`, speaker: 'you', speakerName: 'You (reply)', bn: opt.bn, roman: opt.roman, en: opt.en, tokens: opt.bn.split(' ') }),
      )
    })
  })
})

export const allItems = () => Array.from(bank.values())
