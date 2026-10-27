// Look & Learn scenes (tap a picture, hear the word) and Build-the-scene tasks (put the right thing in the picture).
const w = (bn, roman, en) => ({ bn, roman, en })
const it = (e, x, y, s, word, extra = {}) => ({ e, x, y, s, word, ...extra })

export const lookScenes = [
  {
    id: 'village', emoji: '🏡', title: { bn: 'গ্রাম', en: 'The Village' },
    scene: {
      bg: 'village', time: 'day', noLuminary: true, alt: 'A village with a house, tree, pond, boat and animals',
      items: [
        it('☀️', 86, 16, 44, w('সূর্য', 'shurjo', 'sun'), { anim: 'pulse' }),
        it('🏡', 22, 58, 64, w('বাড়ি', 'bari', 'house')),
        it('🌳', 48, 52, 66, w('গাছ', 'gachh', 'tree'), { anim: 'sway' }),
        it('🐄', 70, 72, 46, w('গরু', 'goru', 'cow')),
        it('🦆', 30, 84, 34, w('হাঁস', 'hash', 'duck'), { anim: 'bob' }),
        it('🛶', 82, 84, 44, w('নৌকা', 'nouka', 'boat'), { anim: 'bob' }),
        it('🐦', 62, 24, 28, w('পাখি', 'pakhi', 'bird'), { anim: 'drift' }),
        it('🌼', 8, 70, 28, w('ফুল', 'ful', 'flower')),
      ],
    },
  },
  {
    id: 'home', emoji: '🛏️', title: { bn: 'আমার ঘর', en: 'My Room' },
    scene: {
      bg: 'room', time: 'day', alt: 'A bedroom with a bed, clock, book, lamp and toys',
      items: [
        it('🛏️', 24, 66, 66, w('বিছানা', 'bichhana', 'bed')),
        it('⏰', 60, 36, 36, w('ঘড়ি', 'ghori', 'clock'), { anim: 'pulse' }),
        it('📚', 80, 74, 40, w('বই', 'boi', 'book')),
        it('🧸', 52, 80, 40, w('পুতুল', 'putul', 'doll'), { anim: 'bob' }),
        it('🪑', 70, 76, 44, w('চেয়ার', 'cheyar', 'chair')),
        it('🪟', 82, 29, 112, w('জানালা', 'janala', 'window'), { z: -1 }),
      ],
    },
  },
  {
    id: 'market', emoji: '🛒', title: { bn: 'বাজার', en: 'The Market' },
    scene: {
      bg: 'market', time: 'day', alt: 'A market stall with fruit, fish and a shopkeeper',
      items: [
        it('🛍️', 9, 76, 36, w('ব্যাগ', 'byag', 'bag')),
        it('🥭', 23, 80, 38, w('আম', 'am', 'mango')),
        it('🍌', 37, 80, 36, w('কলা', 'kola', 'banana')),
        it('🍎', 51, 80, 36, w('আপেল', 'apel', 'apple')),
        it('🐟', 65, 82, 40, w('মাছ', 'mach', 'fish')),
        it('💵', 77, 84, 30, w('টাকা', 'taka', 'money')),
        it('🧑‍🌾', 91, 70, 50, w('দোকানদার', 'dokandar', 'shopkeeper')),
      ],
    },
  },
  {
    id: 'school', emoji: '🏫', title: { bn: 'স্কুল', en: 'The Classroom' },
    scene: {
      bg: 'classroom', time: 'day', alt: 'A classroom with a teacher, book, pen and clock',
      items: [
        it('🧑‍🏫', 30, 66, 54, w('শিক্ষক', 'shikkhok', 'teacher')),
        it('🧒', 62, 80, 46, w('ছাত্র', 'chhatro', 'student')),
        it('📖', 82, 80, 36, w('বই', 'boi', 'book')),
        it('🖊️', 48, 84, 34, w('কলম', 'kolom', 'pen')),
        it('📓', 14, 84, 34, w('খাতা', 'khata', 'notebook')),
        it('🕒', 66, 30, 34, w('ঘড়ি', 'ghori', 'clock')),
      ],
    },
  },
  {
    id: 'city', emoji: '🏙️', title: { bn: 'শহর', en: 'The City' },
    scene: {
      bg: 'city', time: 'day', alt: 'A city street with a bus, rickshaw, school and shop',
      items: [
        it('🚌', 24, 80, 58, w('বাস', 'bas', 'bus'), { anim: 'bob' }),
        it('🛺', 56, 82, 48, w('রিকশা', 'riksha', 'rickshaw'), { anim: 'bob' }),
        it('🏫', 84, 66, 56, w('স্কুল', 'skul', 'school')),
        it('🏥', 12, 66, 50, w('হাসপাতাল', 'haspatal', 'hospital')),
        it('🌳', 42, 72, 46, w('গাছ', 'gachh', 'tree')),
        it('🚦', 70, 62, 40, w('বাতি', 'bati', 'light')),
      ],
    },
  },
]

export const buildTasks = [
  {
    id: 'village', emoji: '🏡', title: { bn: 'গ্রাম সাজাই', en: 'Build the Village' }, bg: 'village', time: 'day', noLuminary: true,
    steps: [
      { word: w('বাড়ি', 'bari', 'house'), e: '🏡', x: 24, y: 58, s: 62 },
      { word: w('গাছ', 'gachh', 'tree'), e: '🌳', x: 52, y: 52, s: 66, anim: 'sway' },
      { word: w('সূর্য', 'shurjo', 'sun'), e: '☀️', x: 84, y: 16, s: 44, anim: 'pulse' },
      { word: w('গরু', 'goru', 'cow'), e: '🐄', x: 74, y: 72, s: 46 },
      { word: w('নৌকা', 'nouka', 'boat'), e: '🛶', x: 80, y: 86, s: 44, anim: 'bob' },
      { word: w('পাখি', 'pakhi', 'bird'), e: '🐦', x: 40, y: 26, s: 28, anim: 'drift' },
    ],
    decoys: ['🚀', '🐧', '🏔️', '🚗', '⛄'],
  },
  {
    id: 'night', emoji: '🌙', title: { bn: 'রাতের ছবি', en: 'Build the Night' }, bg: 'meadow', time: 'night', noLuminary: true,
    steps: [
      { word: w('চাঁদ', 'chãd', 'moon'), e: '🌙', x: 78, y: 20, s: 50, anim: 'pulse' },
      { word: w('তারা', 'tara', 'star'), e: '⭐', x: 30, y: 18, s: 32, anim: 'pulse' },
      { word: w('বাড়ি', 'bari', 'house'), e: '🏠', x: 26, y: 62, s: 60 },
      { word: w('গাছ', 'gachh', 'tree'), e: '🌳', x: 66, y: 56, s: 66, anim: 'sway' },
      { word: w('পেঁচা', 'pencha', 'owl'), e: '🦉', x: 62, y: 38, s: 30, anim: 'bob' },
    ],
    decoys: ['☀️', '🌈', '🐘', '🚌', '🏖️'],
  },
  {
    id: 'river', emoji: '🛶', title: { bn: 'নদীর ছবি', en: 'Build the River' }, bg: 'river', time: 'day', noLuminary: true,
    steps: [
      { word: w('নৌকা', 'nouka', 'boat'), e: '⛵', x: 40, y: 70, s: 54, anim: 'bob' },
      { word: w('মাছ', 'mach', 'fish'), e: '🐟', x: 72, y: 84, s: 38, anim: 'bob' },
      { word: w('মেঘ', 'megh', 'cloud'), e: '☁️', x: 62, y: 18, s: 54, anim: 'drift' },
      { word: w('সূর্য', 'shurjo', 'sun'), e: '☀️', x: 16, y: 18, s: 44, anim: 'pulse' },
      { word: w('হাঁস', 'hash', 'duck'), e: '🦆', x: 20, y: 84, s: 34, anim: 'bob' },
    ],
    decoys: ['🚂', '🐫', '⛷️', '🍕', '🎸'],
  },
]
