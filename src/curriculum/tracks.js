// Curriculum: two tracks (5–7 and 8–12) built from the shared content bank.
// A lesson is { id, title, emoji, kind, learn: [itemIds], practice?: [itemIds], tip?, cat? }.
// kind: letters | signs | words | sentences | forms | review
import { chunk } from './text'
import { lessonsFrom, withReview, unit, catLessons, byBn } from './build'
import { buildTeenTracks } from './teenTracks'
import { FEATURES } from './features'
import { stories } from '../data/stories'
import {
  vowelIds,
  consonantGroupIds,
  signIds,
  syllableIdsBySign,
  wordIdsByCat,
  categoryMeta,
  sentenceIdsByGroup,
  sentenceMeta,
  formIdsByVerb,
  bank,
  family,
  unitLayout,
  ADDRESS_TIP,
  superIdsByUnit,
} from './bank'
import { verbs } from '../data/sentences'

// ---- Tips ----------------------------------------------------------------
const TIPS = {
  vowels: 'ই and ঈ sound the same today, and so do উ and ঊ. We learn both because you will see both when you read!',
  curled: 'ণ sounds just like ন. Bangla has both letters, but we say them the same way.',
  flowing: 'শ, ষ and স all make the "sh" sound. য and জ both say "jo".',
  special: 'ড় and ঢ় are quick "flap" sounds. ং, ঃ and ঁ are marks that add a sound to the letter before them.',
  signs: 'A vowel sign (কার) can sit before, after, above or below a letter. Watch out: the sign ি is written before the letter, but said after it!',
}

const [gThroat, gRoof, gCurled, gTeeth, gLips, gFlow, gSpecial] = consonantGroupIds

const letterLesson = (prefix, g, tip) => lessonsFrom(prefix, g.name, '🔠', 'letters', g.ids, 7, { tip })

// ===========================================================================
// Track 1 — ages 5–7: small steps, lots of pictures, tracing
// ===========================================================================
const young = {
  key: 'young',
  label: 'Little Learners',
  ages: '5–7',
  emoji: '🌱',
  tagline: 'Pictures, tracing and short, friendly lessons.',
  units: [
    unit('y-vowels', 'Vowels', '🔤', 'স্বরবর্ণ — the 11 vowels', withReview('y-vow', 'Vowels', lessonsFrom('y-vow', 'Vowels', '🔤', 'letters', vowelIds, 4, { tip: TIPS.vowels }))),
    unit('y-c1', 'ক খ গ ঘ ঙ · চ ছ জ ঝ ঞ', '🅰️', 'First consonants', withReview('y-c1', 'First consonants', [
      ...letterLesson('y-c1a', gThroat), ...letterLesson('y-c1b', gRoof),
    ])),
    unit('y-c2', 'ট ঠ ড ঢ ণ · ত থ দ ধ ন', '🅱️', 'Curled tongue and teeth sounds', withReview('y-c2', 'Tongue sounds', [
      ...letterLesson('y-c2a', gCurled, TIPS.curled), ...letterLesson('y-c2b', gTeeth),
    ])),
    unit('y-c3', 'প ফ ব ভ ম · য র ল শ ষ স হ', '🅾️', 'Lip sounds and the rest', withReview('y-c3', 'Last consonants', [
      ...letterLesson('y-c3a', gLips),
      ...lessonsFrom('y-c3b', gFlow.name, '🔠', 'letters', gFlow.ids, 4, { tip: TIPS.flowing }),
    ])),
    unit('y-sp', 'Special letters', '✨', 'ড় ঢ় য় ৎ ং ঃ ঁ', withReview('y-sp', 'Special letters', lessonsFrom('y-sp', 'Special letters', '✨', 'letters', gSpecial.ids, 4, { tip: TIPS.special }))),
    unit('y-family', 'Family Words', '👨‍👩‍👧', 'মা, বাবা, ভাই, বোন…', catLessons('y-fam', 'family', 5, { pick: (ids) => ids.slice(0, 15) })),
    unit('y-numbers', 'Numbers', '🔢', '০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯ ১০', catLessons('y-num', 'numbers', 4)),
    unit('y-colours', 'Colours', '🎨', 'লাল, নীল, সবুজ…', catLessons('y-col', 'colours', 5)),
    unit('y-animals', 'Animals', '🐯', 'কুকুর, বিড়াল, বাঘ…', catLessons('y-ani', 'animals', 5, { pick: (ids) => ids.slice(0, 20) })),
    unit('y-food', 'Food & Drink', '🍚', 'ভাত, আম, দুধ…', catLessons('y-food', 'food', 5)),
    unit('y-body', 'My Body', '🧍', 'মাথা, চোখ, নাক…', catLessons('y-body', 'body', 5)),
    unit('y-around', 'Around Us', '🏡', 'বাড়ি, গাছ, চাঁদ…', catLessons('y-aro', 'around-us', 5, { pick: (ids) => ids.slice(0, 15) })),
    unit('y-bd', 'My Bangladesh', '🇧🇩', 'শাপলা, ইলিশ, পতাকা…', catLessons('y-bd', 'bangladesh', 4, {
      pick: () => byBn('bangladesh', ['বাংলাদেশ', 'পতাকা', 'শাপলা', 'দোয়েল', 'ইলিশ', 'কাঁঠাল', 'নৌকা', 'রিকশা']),
    })),
    unit('y-hello', 'Say Hello', '👋', 'First polite words', catLessons('y-hi', 'greetings', 4, { pick: (ids) => ids.slice(0, 8) })),
  ],
}

// ===========================================================================
// Track 2 — ages 8–12: bigger lessons, reading, writing, sentences, patterns
// ===========================================================================
const signLessons = () => {
  const groups = [[0, 1, 2], [3, 4, 5], [6, 7], [8, 9]]
  return groups.map((g, i) => ({
    id: `o-sign-${i + 1}`,
    title: `Vowel signs ${i + 1}`,
    emoji: '✏️',
    kind: 'signs',
    learn: g.map((k) => signIds[k]),
    practice: g.flatMap((k) => syllableIdsBySign[k]),
    tip: i === 0 ? TIPS.signs : undefined,
  }))
}

const firstWords = [
  ['মা', 'family'], ['বাবা', 'family'], ['নানা', 'family'], ['দাদা', 'family'], ['মামা', 'family'], ['চাচা', 'family'],
  ['বই', 'around-us'], ['কান', 'body'], ['নাক', 'body'], ['হাত', 'body'], ['ভাত', 'food'], ['কলা', 'food'],
  ['চা', 'food'], ['আম', 'food'], ['গাছ', 'around-us'], ['ফুল', 'around-us'], ['লাল', 'colours'], ['কালো', 'colours'],
]
const firstWordIds = firstWords.map(([bn, cat]) => byBn(cat, [bn])[0])

const verbLessons = () => {
  const lessons = chunk(verbs, 2).map((pair, i) => ({
    id: `o-vb-${i + 1}`,
    title: `Present tense ${i + 1}`,
    emoji: '🧩',
    kind: 'forms',
    learn: pair.flatMap((v) => formIdsByVerb[v.key]),
    tip: i === 0 ? 'In Bangla the verb changes with who is doing it: আমি (I), তুমি (you) and সে (he/she) each use a different ending.' : undefined,
  }))
  return withReview('o-vb', 'Present tense', lessons)
}

const sentenceUnitLessons = () => {
  const lessons = ['introduce', 'things', 'daily', 'describe'].flatMap((key) =>
    lessonsFrom(`o-s-${key}`, sentenceMeta[key].title, sentenceMeta[key].emoji, 'sentences', sentenceIdsByGroup[key], 5),
  )
  return withReview('o-s', 'Sentences', lessons)
}

const older = {
  key: 'older',
  label: 'Explorers',
  ages: '8–12',
  emoji: '🧭',
  tagline: 'Read, write and build real Bangla sentences.',
  units: [
    unit('o-vowels', 'Vowels', '🔤', 'স্বরবর্ণ — the 11 vowels', withReview('o-vow', 'Vowels', lessonsFrom('o-vow', 'Vowels', '🔤', 'letters', vowelIds, 6, { tip: TIPS.vowels }))),
    unit('o-c1', 'Consonants I', '🅰️', 'ক খ গ ঘ ঙ · চ ছ জ ঝ ঞ', withReview('o-c1', 'Consonants I', [
      ...letterLesson('o-c1a', gThroat), ...letterLesson('o-c1b', gRoof),
    ])),
    unit('o-c2', 'Consonants II', '🅱️', 'ট ঠ ড ঢ ণ · ত থ দ ধ ন', withReview('o-c2', 'Consonants II', [
      ...letterLesson('o-c2a', gCurled, TIPS.curled), ...letterLesson('o-c2b', gTeeth),
    ])),
    unit('o-c3', 'Consonants III', '🅾️', 'প ফ ব ভ ম · য র ল শ ষ স হ', withReview('o-c3', 'Consonants III', [
      ...letterLesson('o-c3a', gLips), ...letterLesson('o-c3b', gFlow, TIPS.flowing),
    ])),
    unit('o-sp', 'Special Letters', '✨', 'ড় ঢ় য় ৎ ং ঃ ঁ', letterLesson('o-sp', gSpecial, TIPS.special)),
    unit('o-signs', 'Vowel Signs', '✏️', 'কার — vowels that join consonants', withReview('o-sign', 'Vowel signs', signLessons())),
    unit('o-read', 'Read Your First Words', '📖', 'Put letters and signs together', withReview('o-read', 'First words', lessonsFrom('o-read', 'Read it!', '📖', 'words', firstWordIds, 6, { cat: 'mixed', tip: 'Sound out each letter, then say the whole word.' }))),
    unit('o-hello', 'Say Hello', '👋', 'Greetings and polite words', catLessons('o-hi', 'greetings', 6)),
    unit('o-numbers', 'Numbers', '🔢', '০–১০ and counting by tens', [
      ...catLessons('o-num', 'numbers', 6).filter((l) => l.kind !== 'review'),
      ...catLessons('o-ten', 'tens', 5),
    ]),
    unit('o-people', 'People & Pronouns', '🙋', 'আমি, তুমি, আপনি and family', [
      ...catLessons('o-pro', 'pronouns', 5).filter((l) => l.kind !== 'review'),
      ...catLessons('o-fam', 'family', 6),
    ]),
    unit('o-colours', 'Colours', '🎨', 'লাল, নীল, সবুজ…', catLessons('o-col', 'colours', 5)),
    unit('o-animals', 'Animals', '🐯', 'কুকুর, বিড়াল, বাঘ…', catLessons('o-ani', 'animals', 6)),
    unit('o-food', 'Food & Drink', '🍚', 'ভাত, আম, দুধ…', catLessons('o-food', 'food', 6)),
    unit('o-body', 'My Body', '🧍', 'মাথা, চোখ, নাক…', catLessons('o-body', 'body', 7)),
    unit('o-around', 'Around Us', '🏡', 'বাড়ি, গাছ, চাঁদ…', catLessons('o-aro', 'around-us', 7)),
    unit('o-describe', 'Describing & Doing', '✨', 'Adjectives, actions and questions', [
      ...catLessons('o-adj', 'adjectives', 7).filter((l) => l.kind !== 'review'),
      ...catLessons('o-verb', 'verbs', 6).filter((l) => l.kind !== 'review'),
      ...catLessons('o-q', 'questions', 7),
    ]),
    unit('o-time', 'Days, Months & Seasons', '📅', 'রবিবার, বৈশাখ, বর্ষা…', [
      ...catLessons('o-day', 'days', 7),
      ...catLessons('o-mon', 'months', 6),
      ...catLessons('o-sea', 'seasons', 6),
    ]),
    unit('o-sent', 'Sentences', '💬', 'Understand and build real sentences', sentenceUnitLessons()),
    unit('o-verbs', 'Verb Patterns', '🧩', 'How verbs change with আমি, তুমি, সে', verbLessons()),
    unit('o-bd', 'Bangladesh & Culture', '🇧🇩', 'Our national symbols, festivals and history', catLessons('o-bd', 'bangladesh', 6)),
  ],
}

// ---- Family conversations (themed units, see data/family.js) ----------------------------------
const familyUnits = (p, trackKey) => {
  const fam = family[trackKey]
  return unitLayout[trackKey].map((u, ui) => {
    const lessons = []
    if (ui === 0) {
      lessons.push(
        { id: `${p}-ft-phrases`, title: 'Everyday Phrases', emoji: '🤲', kind: 'sentences', learn: fam.phraseIds, tip: 'You will hear these phrases all through family life — in almost every conversation to come.' },
        {
          id: `${p}-ft-polite`, title: 'আপনি or তুমি?', emoji: '🙇', kind: 'polite', learn: [], polite: fam.polite, tip: ADDRESS_TIP,
          rules: [
            { emoji: '👩👨👴👵🧔', say: 'আপনি', who: 'Ammu, Abbu, Nana, Dada, Nani, uncles and aunts — every elder' },
            { emoji: '🧑👧', say: 'তুমি', who: 'friends, like Rafi and Nila' },
            { emoji: '🧒', say: 'তুমি', who: 'what elders say to you' },
          ],
        },
      )
    }
    const scs = u.scenes.map((k) => fam.scenes.find((s) => s.key === k))
    scs.forEach((sc, si) =>
      lessons.push({ id: `${p}-ft-${sc.key}`, title: sc.title, emoji: sc.emoji, kind: 'dialogue', learn: sc.lineIds, tip: sc.tip ?? (ui === 0 && si === 0 ? ADDRESS_TIP : undefined) }),
    )
    lessons.push({
      id: `${p}-ft-review-${u.key}`, title: `${u.title}: Review`, emoji: '🏅', kind: 'review', learn: [],
      reviewOf: [...(ui === 0 ? fam.phraseIds : []), ...scs.flatMap((sc) => sc.lineIds)],
    })
    return unit(`${p}-ft-${u.key}`, u.title, u.emoji, u.blurb, lessons)
  })
}

const insertAfter = (units, id, extra) => units.splice(units.findIndex((u) => u.id === id) + 1, 0, ...extra)
insertAfter(young.units, 'y-family', familyUnits('y', 'young'))
insertAfter(older.units, 'o-people', familyUnits('o', 'older'))

const { teen, senior, adult } = buildTeenTracks()

// per-age features (XP, games, tracing…) live in features.js
young.features = FEATURES.young
older.features = FEATURES.older
teen.features = FEATURES.teen
senior.features = FEATURES.senior
adult.features = FEATURES.adult

// Ages 5–7: the end-of-unit review becomes a gentle, untimed treasure hunt.
young.units.forEach((u) => {
  u.lessons = u.lessons.map((l) =>
    l.kind === 'review' ? { ...l, treasure: true, emoji: '🎁', title: l.title.replace(': Review', ': Treasure Hunt') } : l,
  )
})

// Ages 8–12: four simple story chats, placed where the vocabulary has just been taught.
const addStory = (track, prefix, unitId, storyId) => {
  const u = track.units.find((x) => x.id === unitId)
  const st = stories.find((x) => x.id === storyId)
  const lesson = { id: `${prefix}-story-${storyId}`, title: `Story: ${st.title}`, emoji: st.emoji, kind: 'story', learn: [], storyId, track: track.key }
  const at = u.lessons.findIndex((l) => l.kind === 'review')
  if (at >= 0) u.lessons.splice(at, 0, lesson)
  else u.lessons.push(lesson)
}
addStory(older, 'o', 'o-hello', 'newfriend')
addStory(older, 'o', 'o-numbers', 'sweetshop')
addStory(older, 'o', 'o-ft-elders', 'nanivisit')
addStory(older, 'o', 'o-around', 'rainyday')

// Every unit that has a Super challenge set ends with that challenge.
Object.entries({ young, older, teen, senior, adult }).forEach(([, track]) => {
  track.units.forEach((u) => {
    const ids = superIdsByUnit[u.id]
    if (ids?.length) u.lessons.push({ id: `${u.id}-super`, title: 'Super challenge', emoji: '🦸', kind: 'super', learn: [], superIds: ids })
  })
})

export const tracks = { young, older, teen, senior, adult }

export const trackList = [young, older, teen, senior, adult]
export const allLessons = (trackKey) => tracks[trackKey].units.flatMap((u) => u.lessons)

export function findLesson(id) {
  for (const t of trackList) {
    for (const u of t.units) {
      const i = u.lessons.findIndex((l) => l.id === id)
      if (i >= 0) return { lesson: u.lessons[i], unit: u, track: t }
    }
  }
  return null
}

export function nextLessonId(trackKey, id) {
  const all = allLessons(trackKey)
  const i = all.findIndex((l) => l.id === id)
  return i >= 0 && i < all.length - 1 ? all[i + 1].id : null
}
