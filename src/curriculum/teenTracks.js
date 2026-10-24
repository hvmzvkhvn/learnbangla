// The 13–15 ("Voyagers") and 16–18 ("Pathfinders") tracks. Both start from the alphabet.
// Voyagers: smaller steps, more scaffolding. Pathfinders: faster, denser, more reading.
import {
  bank,
  vowelIds,
  consonantGroupIds,
  signIds,
  syllableIdsBySign,
  conjunctIds,
  wordIdsByCat,
  categoryMeta,
  sentenceIdsByGroup,
  sentenceMeta,
  formIdsByVerb,
  formIdsByTense,
  teenText,
  family,
} from './bank'
import { stories } from '../data/stories'
import { lessonsFrom, unit, catLessons, byBn, boss } from './build'
import { chunk } from './text'
import { verbs } from '../data/sentences'
import { tenseVerbs } from '../data/teenSentences'

const TIPS = {
  vowels: 'ই and ঈ sound the same today, and so do উ and ঊ. Bangla keeps both because you will see both in real writing.',
  curled: 'ণ sounds just like ন. Bangla has both letters but we say them the same way.',
  flowing: 'শ, ষ and স all make the "sh" sound. য and জ both say "jo".',
  special: 'ড় and ঢ় are quick "flap" sounds. ং, ঃ and ঁ are marks that add a sound to the letter before them.',
  signs: 'A vowel sign (কার) can sit before, after, above or below a letter. The sign ি is written before the letter but said after it!',
  conjuncts: 'A conjunct (যুক্তাক্ষর) joins two or more consonants into one shape. The first consonant loses its "o" sound: ক + ষ = ক্ষ.',
  present: 'The verb changes with who is doing it. Use আমি for "I", তুমি for friends and আপনি for anyone you respect.',
}

const [gThroat, gRoof, gCurled, gTeeth, gLips, gFlow, gSpecial] = consonantGroupIds

// first words made from letters + signs, shared with the 8–12 reading practice
const READ_WORDS = [
  ['মা', 'family'], ['বাবা', 'family'], ['নানা', 'family'], ['দাদা', 'family'], ['মামা', 'family'], ['চাচা', 'family'],
  ['বই', 'around-us'], ['কান', 'body'], ['নাক', 'body'], ['হাত', 'body'], ['ভাত', 'food'], ['কলা', 'food'],
  ['চা', 'food'], ['আম', 'food'], ['গাছ', 'around-us'], ['ফুল', 'around-us'], ['লাল', 'colours'], ['কালো', 'colours'],
]
const readWordIds = () => READ_WORDS.map(([bn, cat]) => byBn(cat, [bn])[0])

const lettersLesson = (id, title, ids, tip) => ({ id, title, emoji: '🔠', kind: 'letters', learn: ids, tip })

function signLessons(prefix, groups) {
  return groups.map((g, i) => ({
    id: `${prefix}-${i + 1}`,
    title: `Vowel signs ${i + 1}`,
    emoji: '✏️',
    kind: 'signs',
    learn: g.map((k) => signIds[k]),
    practice: g.flatMap((k) => syllableIdsBySign[k]),
    tip: i === 0 ? TIPS.signs : undefined,
  }))
}

// word lessons without a trailing review (each unit ends with a boss level instead)
const wordsE = (prefix, cat, size, emoji, title) =>
  lessonsFrom(prefix, title, emoji, 'words', wordIdsByCat[cat], size, { cat, tip: categoryMeta[cat].note })
const words = (prefix, cat, size, title) => wordsE(prefix, cat, size, categoryMeta[cat].emoji, title)

const sentences = (prefix, group, size) =>
  lessonsFrom(prefix, sentenceMeta[group].title, sentenceMeta[group].emoji, 'sentences', sentenceIdsByGroup[group], size)

const presentForms = (prefix) => {
  const out = chunk(verbs, 2).map((pair, i) => ({
    id: `${prefix}-pres-${i + 1}`, title: `Present tense ${i + 1}`, emoji: '🧩', kind: 'forms',
    learn: pair.flatMap((v) => formIdsByVerb[v.key]), tip: i === 0 ? TIPS.present : undefined,
  }))
  return out
}
const tenseLessons = (prefix, tense, label, emoji, perLesson, tip) =>
  chunk(tenseVerbs, perLesson).map((grp, i) => ({
    id: `${prefix}-${tense}-${i + 1}`, title: `${label} ${i + 1}`, emoji, kind: 'forms',
    learn: grp.flatMap((v) => formIdsByTense[tense][v.key]), tip: i === 0 ? tip : undefined,
  }))

const storyLessons = (prefix, track, ids) =>
  ids.map((sid) => {
    const st = stories.find((s) => s.id === sid)
    return { id: `${prefix}-story-${sid}`, title: `Story: ${st.title}`, emoji: st.emoji, kind: 'story', learn: [], storyId: sid, track }
  })

const poemLessons = (prefix, track) =>
  teenText[track].poems.map((p) => ({ id: `${prefix}-poem-${p.key}`, title: p.title, emoji: p.emoji, kind: 'poem', learn: p.lineIds, author: p.author, tip: p.note }))
const passageLessons = (prefix, track, keys) =>
  teenText[track].passages.filter((p) => keys.includes(p.key)).map((p) => ({ id: `${prefix}-read-${p.key}`, title: `Reading: ${p.title}`, emoji: p.emoji, kind: 'passage', learn: p.lineIds, questions: p.questions }))
const sceneLessons = (prefix, track, keys) =>
  teenText[track].scenes.filter((s) => keys.includes(s.key)).map((s) => ({ id: `${prefix}-scene-${s.key}`, title: s.title, emoji: s.emoji, kind: 'dialogue', learn: s.lineIds }))

// a unit = its lessons + a boss level over everything they taught
const bossUnit = (prefix, id, title, emoji, blurb, lessons) => unit(id, title, emoji, blurb, [...lessons, boss(prefix, title, lessons)])

export function buildTeenTracks() {
  // ===========================================================================================
  // 13–15  Voyagers
  // ===========================================================================================
  const v = 'v'
  const voyagers = {
    key: 'teen', label: 'Voyagers', ages: '13–15', emoji: '🚀', theme: 'teen',
    tagline: 'Start from the alphabet and race to real conversations — with stories, games and XP.',
    units: [
      bossUnit('v-s1', 'v-script1', 'Script 1: Vowels & First Letters', '🔤', 'Learn to read and hear the first sounds', [
        ...lessonsFrom('v-vow', 'Vowels', '🔤', 'letters', vowelIds, 6, { tip: TIPS.vowels }),
        lettersLesson('v-kh', 'Throat sounds · ক খ গ ঘ ঙ', gThroat.ids),
        lettersLesson('v-ch', 'Tongue-to-roof sounds · চ ছ জ ঝ ঞ', gRoof.ids),
      ]),
      bossUnit('v-s2', 'v-script2', 'Script 2: The Rest of the Alphabet', '🅰️', 'Every consonant, plus the special letters', [
        lettersLesson('v-ta', 'Curled-tongue sounds · ট ঠ ড ঢ ণ', gCurled.ids, TIPS.curled),
        lettersLesson('v-da', 'Teeth sounds · ত থ দ ধ ন', gTeeth.ids),
        lettersLesson('v-pa', 'Lip sounds · প ফ ব ভ ম', gLips.ids),
        lettersLesson('v-ra', 'Flowing & hissing sounds', gFlow.ids, TIPS.flowing),
        lettersLesson('v-sp', 'Special letters · ড় ঢ় য় ৎ ং ঃ ঁ', gSpecial.ids, TIPS.special),
      ]),
      bossUnit('v-r', 'v-reading', 'Signs, Conjuncts & Reading', '✏️', 'Vowel signs, joined letters, and your first real words', [
        ...signLessons('v-sign', [[0, 1, 2], [3, 4, 5], [6, 7], [8, 9]]),
        ...lessonsFrom('v-conj', 'Conjuncts', '🧩', 'letters', conjunctIds, 6, { tip: TIPS.conjuncts }),
        ...lessonsFrom('v-read', 'Read it!', '📖', 'words', readWordIds(), 9, { cat: 'mixed', tip: 'Sound out each letter, then say the whole word.' }),
      ]),
      bossUnit('v-h', 'v-hello', 'Hello, Bangladesh!', '👋', 'Greetings, who you are, and your first story', [
        ...words('v-hi', 'greetings', 6, 'Greetings'),
        ...words('v-pro', 'pronouns', 9, 'I, You, We'),
        ...words('v-fam', 'family', 6, 'Family'),
        ...sentences('v-id', 'identity', 6),
        ...storyLessons(v, 'teen', ['newkid']),
      ]),
      bossUnit('v-n', 'v-numbers', 'Numbers & Money', '🔢', 'Count, shop and bargain', [
        ...wordsE('v-num', 'numbers', 6, '🔢', 'Numbers'),
        ...wordsE('v-ten', 'tens', 9, '💯', 'Bigger Numbers'),
        ...wordsE('v-baz', 'bazaar', 7, '🛒', 'Money & Shopping'),
        ...sentences('v-bs', 'bazaar', 5),
        ...storyLessons(v, 'teen', ['market']),
      ]),
      bossUnit('v-t', 'v-travel', 'Getting Around', '🛺', 'Travel, directions and asking for help', [
        ...wordsE('v-trv', 'travel', 6, '✈️', 'Travel & Directions'),
        ...sentences('v-ts', 'travel', 6),
        ...storyLessons(v, 'teen', ['rickshaw']),
      ]),
      bossUnit('v-d', 'v-daily', 'Everyday Life', '☀️', 'Days, months, time, food and describing things', [
        ...wordsE('v-day', 'days', 7, '📅', 'Days of the Week'),
        ...wordsE('v-mon', 'months', 6, '🗓️', 'Bangla Months'),
        ...wordsE('v-sea', 'seasons', 6, '🍂', 'Six Seasons'),
        ...wordsE('v-tim', 'time2', 8, '⏰', 'Time & Dates'),
        ...wordsE('v-food', 'food', 8, '🍚', 'Food & Drink'),
        ...wordsE('v-rst', 'restaurant', 6, '🍛', 'Eating Out'),
        ...wordsE('v-adj', 'adjectives', 7, '✨', 'Describing Words'),
      ]),
      bossUnit('v-f', 'v-film', 'Film, Music & Poetry', '🎬', 'Real songs, poems and cinema talk', [
        ...wordsE('v-flm', 'film', 6, '🎬', 'Film, Music & Art'),
        ...sceneLessons('v-sc', 'teen', ['ticket', 'movienight', 'song']),
        ...poemLessons('v-pm', 'teen'),
        ...storyLessons(v, 'teen', ['movienight']),
      ]),
      bossUnit('v-hs', 'v-history', 'History & Identity', '🕯️', 'Our language, our history, our heritage', [
        ...wordsE('v-his', 'history', 6, '🏛️', 'History & Identity'),
        ...sentences('v-hst', 'history', 6),
        ...sentences('v-cul', 'culture', 5),
        ...passageLessons('v-rd', 'teen', ['langday', 'dhaka', 'ilish', 'eid']),
        ...storyLessons(v, 'teen', ['languageday']),
      ]),
      bossUnit('v-g', 'v-grammar', 'How Bangla Works', '🧩', 'Verbs, tenses, opinions, proverbs and more', [
        ...wordsE('v-vb', 'verbs', 6, '🏃', 'Action Words'),
        ...presentForms('v-g'),
        ...tenseLessons('v-g', 'perfect', 'Have done', '✅', 2, 'To say something is finished, use the "have done" form: আমি খেয়েছি = "I have eaten".'),
        ...tenseLessons('v-g', 'future', 'Will do', '🔮', 2, 'For the future, the ending changes: আমি খাব, তুমি খাবে, আপনি খাবেন.'),
        ...wordsE('v-q', 'questions', 7, '❓', 'Question Words'),
        ...wordsE('v-fl', 'feelings', 7, '💬', 'Feelings & Opinions'),
        ...sentences('v-op', 'opinions', 5),
        ...sentences('v-pv', 'proverbs', 4),
        ...wordsE('v-tc', 'tech', 8, '📱', 'Phones & Tech'),
        ...wordsE('v-sp2', 'sports', 10, '🏏', 'Cricket & Sports'),
      ]),
    ],
  }

  // ===========================================================================================
  // 16–18  Pathfinders
  // ===========================================================================================
  const p = 'p'
  const allV = [...vowelIds]
  const pathfinders = {
    key: 'senior', label: 'Pathfinders', ages: '16–18', emoji: '🏔️', theme: 'teen',
    tagline: 'The fast track: dense lessons, real reading, history, poetry and grown-up conversations.',
    units: [
      bossUnit('p-s', 'p-script', 'Script Fast-Track', '🔤', 'The whole alphabet, quickly', [
        lettersLesson('p-vow', 'Vowels', allV, TIPS.vowels),
        lettersLesson('p-c1', 'Consonants I · ক–ঞ', [...gThroat.ids, ...gRoof.ids]),
        lettersLesson('p-c2', 'Consonants II · ট–ন', [...gCurled.ids, ...gTeeth.ids], TIPS.curled),
        lettersLesson('p-c3', 'Consonants III · প–হ', [...gLips.ids, ...gFlow.ids], TIPS.flowing),
        lettersLesson('p-sp', 'Special letters', gSpecial.ids, TIPS.special),
      ]),
      bossUnit('p-r', 'p-reading', 'Signs, Conjuncts & Reading', '✏️', 'Vowel signs, joined letters and reading real words', [
        ...signLessons('p-sign', [[0, 1, 2], [3, 4, 5], [6, 7, 8, 9]]),
        ...lessonsFrom('p-conj', 'Conjuncts', '🧩', 'letters', conjunctIds, 9, { tip: TIPS.conjuncts }),
        ...lessonsFrom('p-read', 'Read it!', '📖', 'words', readWordIds(), 9, { cat: 'mixed', tip: 'Sound out each letter, then say the whole word.' }),
      ]),
      bossUnit('p-i', 'p-identity', 'People & Identity', '🪪', 'Greetings, family and who you are', [
        ...words('p-hi', 'greetings', 12, 'Greetings'),
        ...words('p-pro', 'pronouns', 9, 'I, You, We'),
        ...words('p-fam', 'family', 9, 'Family'),
        { id: 'p-polite', title: 'আপনি or তুমি?', emoji: '🙇', kind: 'polite', learn: [], polite: family.older.polite, tip: 'We say আপনি to every elder and তুমি to friends. Choose the right sentence each time.' },
        ...sentences('p-id', 'identity', 6),
        ...storyLessons(p, 'senior', ['landing']),
      ]),
      bossUnit('p-n', 'p-numbers', 'Numbers, Time & Money', '🔢', 'Count, tell the time and handle money', [
        ...wordsE('p-num', 'numbers', 11, '🔢', 'Numbers'),
        ...wordsE('p-ten', 'tens', 9, '💯', 'Bigger Numbers'),
        ...wordsE('p-day', 'days', 7, '📅', 'Days of the Week'),
        ...wordsE('p-mon', 'months', 6, '🗓️', 'Bangla Months'),
        ...wordsE('p-tim', 'time2', 8, '⏰', 'Time & Dates'),
        ...wordsE('p-baz', 'bazaar', 7, '🛒', 'Money & Shopping'),
        ...sentences('p-bs', 'bazaar', 5),
      ]),
      bossUnit('p-t', 'p-travel', 'Travel & Cities', '🧭', 'Directions, transport and asking for help', [
        ...wordsE('p-trv', 'travel', 9, '✈️', 'Travel & Directions'),
        ...sentences('p-ts', 'travel', 6),
        ...wordsE('p-tc', 'tech', 8, '📱', 'Phones & Tech'),
        ...storyLessons(p, 'senior', ['olddhaka']),
      ]),
      bossUnit('p-st', 'p-study', 'Study, Work & Dreams', '🎓', 'School, careers, feelings and opinions', [
        ...wordsE('p-sch', 'school', 9, '🎓', 'School, Study & Work'),
        ...wordsE('p-fl', 'feelings', 7, '💬', 'Feelings & Opinions'),
        ...sentences('p-op', 'opinions', 5),
        ...wordsE('p-sp2', 'sports', 10, '🏏', 'Cricket & Sports'),
        ...wordsE('p-rst', 'restaurant', 11, '🍛', 'Eating Out'),
        ...storyLessons(p, 'senior', ['teadebate']),
      ]),
      bossUnit('p-c', 'p-celebrate', 'Celebrations & Weddings', '🎉', 'Eid, weddings and festival life', [
        ...wordsE('p-cel', 'celebrate', 8, '🎉', 'Celebrations & Weddings'),
        ...passageLessons('p-rd', 'senior', ['eid']),
        ...storyLessons(p, 'senior', ['wedding']),
      ]),
      bossUnit('p-h', 'p-history', 'History & Identity', '🕯️', 'Language Movement, 1971 and heritage', [
        ...wordsE('p-his', 'history', 8, '🏛️', 'History & Identity'),
        ...sentences('p-hst', 'history', 6),
        ...sentences('p-cul', 'culture', 5),
        ...passageLessons('p-rd2', 'senior', ['langday', 'dhaka', 'ilish']),
        ...storyLessons(p, 'senior', ['grandpa71']),
      ]),
      bossUnit('p-a', 'p-art', 'Poetry, Proverbs & Film', '🎭', 'Tagore, Lalon, proverbs and the cinema', [
        ...wordsE('p-flm', 'film', 9, '🎬', 'Film, Music & Art'),
        ...sceneLessons('p-sc', 'senior', ['ticket', 'song', 'filmtalk']),
        ...poemLessons('p-pm', 'senior'),
        ...sentences('p-pv', 'proverbs', 4),
      ]),
      bossUnit('p-g', 'p-grammar', 'Grammar in Action', '🧩', 'Verbs and tenses you can use right away', [
        ...wordsE('p-vb', 'verbs', 6, '🏃', 'Action Words'),
        ...wordsE('p-q', 'questions', 7, '❓', 'Question Words'),
        ...wordsE('p-adj', 'adjectives', 7, '✨', 'Describing Words'),
        ...presentForms('p-g'),
        ...tenseLessons('p-g', 'perfect', 'Have done', '✅', 2, 'To say something is finished, use the "have done" form: আমি খেয়েছি = "I have eaten".'),
        ...tenseLessons('p-g', 'future', 'Will do', '🔮', 2, 'For the future, the ending changes: আমি খাব, তুমি খাবে, আপনি খাবেন.'),
      ]),
    ],
  }

  return { teen: voyagers, senior: pathfinders }
}
