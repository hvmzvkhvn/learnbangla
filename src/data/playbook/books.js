// Picture books: each page is one illustration + one short Bangla line (with romanisation and English).
//   young  — ages 5–7: one very short line per picture
//   older  — ages 8–13: two short lines' worth of story across seven pages
// Pages are { scene, bn, roman, en }. Scenes are described in src/art/Scene.jsx.
const sc = (bg, time, ...items) => ({ bg, time, items })
const it = (e, x, y, s = 44, extra = {}) => ({ e, x, y, s, ...extra })
const pg = (scene, bn, roman, en) => ({ scene, bn, roman, en })

export const youngBooks = [
  {
    id: 'tara-morning', emoji: '🌅', title: { bn: 'তারার সকাল', en: "Tara's Morning" },
    pages: [
      pg(sc('room', 'day', it('🛏️', 22, 64, 66), it('👧', 55, 72, 54, { anim: 'bob' }), it('⏰', 82, 46, 34, { anim: 'pulse' })), 'সকাল হয়েছে।', 'shokal hoyeche.', 'It is morning.'),
      pg(sc('room', 'day', it('🚿', 24, 52, 60), it('👧', 56, 72, 54), it('🧼', 82, 84, 32, { anim: 'bob' })), 'তারা মুখ ধোয়।', 'tara mukh dhoy.', 'Tara washes her face.'),
      pg(sc('kitchen', 'day', it('🍳', 18, 38, 38), it('👩', 34, 70, 58), it('👧', 64, 76, 48), it('🥛', 86, 76, 32)), 'আম্মু নাশতা দেন।', 'ammu nashta den.', 'Ammu gives breakfast.'),
      pg(sc('room', 'day', it('👧', 38, 72, 56), it('🎒', 64, 76, 46, { anim: 'bob' }), it('👟', 84, 86, 30)), 'তারা ব্যাগ নেয়।', 'tara bag ney.', 'Tara takes her bag.'),
      pg(sc('city', 'day', it('👧', 22, 80, 46), it('🚌', 60, 76, 66, { anim: 'bob' })), 'তারা বাসে ওঠে।', 'tara base othe.', 'Tara gets on the bus.'),
      pg(sc('meadow', 'day', it('🏫', 50, 52, 84), it('👧', 24, 80, 46), it('🧒', 76, 80, 46, { anim: 'bob' })), 'তারা স্কুলে যায়।', 'tara schule jay.', 'Tara goes to school.'),
    ],
  },
  {
    id: 'nana-village', emoji: '🌾', title: { bn: 'নানার গ্রাম', en: "Nana's Village" },
    pages: [
      pg(sc('village', 'day', it('🛶', 44, 80, 62, { anim: 'bob' }), it('🌴', 12, 62, 64, { anim: 'sway' }), it('🏡', 82, 58, 56)), 'নৌকা নদীতে চলে।', 'nouka nodite chole.', 'The boat goes on the river.'),
      pg(sc('meadow', 'day', it('🌾', 18, 72, 54, { anim: 'sway' }), it('🌾', 38, 76, 54, { anim: 'sway' }), it('🌾', 62, 72, 54, { anim: 'sway' }), it('🌾', 82, 76, 54, { anim: 'sway' }), it('👨‍🌾', 50, 62, 52)), 'মাঠে সবুজ ধান।', 'mathe shobuj dhan.', 'Green rice in the field.'),
      pg(sc('village', 'day', it('🦆', 28, 80, 40, { anim: 'bob' }), it('🦆', 50, 84, 40, { anim: 'bob' }), it('🦆', 72, 80, 40, { anim: 'bob' })), 'পুকুরে হাঁস সাঁতার কাটে।', 'pukure hash shãtar kate.', 'Ducks swim in the pond.'),
      pg(sc('meadow', 'day', it('🌳', 34, 54, 96, { anim: 'sway' }), it('🥭', 26, 38, 26), it('🥭', 38, 30, 26), it('🥭', 44, 44, 26), it('👧', 70, 78, 48)), 'গাছে আম।', 'gachhe am.', 'Mangoes on the tree.'),
      pg(sc('meadow', 'day', it('🐄', 40, 72, 66, { anim: 'bob' }), it('🐦', 76, 28, 30, { anim: 'drift' }), it('🌼', 18, 82, 26)), 'মাঠে গরু।', 'mathe goru.', 'A cow in the field.'),
      pg(sc('village', 'evening', it('🏡', 28, 58, 62), it('👴', 58, 76, 48), it('👧', 74, 80, 42)), 'সূর্য ডোবে।', 'shurjo dobe.', 'The sun sets.'),
    ],
  },
  {
    id: 'rainy-day', emoji: '🌧️', title: { bn: 'বৃষ্টির দিন', en: 'A Rainy Day' },
    pages: [
      pg(sc('meadow', 'rain', it('☁️', 50, 20, 70, { anim: 'drift' }), it('🏠', 72, 62, 56)), 'আকাশে মেঘ।', 'akashe megh.', 'Clouds in the sky.'),
      pg(sc('meadow', 'rain', it('🧒', 44, 76, 54), it('🏠', 76, 58, 50)), 'বৃষ্টি পড়ে।', 'brishti pore.', 'The rain falls.'),
      pg(sc('meadow', 'rain', it('☂️', 40, 52, 62, { anim: 'sway' }), it('🧒', 40, 78, 50)), 'আমার ছাতা আছে।', 'amar chhata ache.', 'I have an umbrella.'),
      pg(sc('meadow', 'rain', it('🧒', 38, 76, 52, { anim: 'bob' }), it('💦', 60, 86, 34, { anim: 'pulse' })), 'পানিতে ছপ ছপ!', 'panite chhop chhop!', 'Splash splash in the water!'),
      pg(sc('village', 'day', it('⛵', 46, 80, 44, { anim: 'bob' }), it('🧒', 20, 62, 48)), 'আমার কাগজের নৌকা।', 'amar kagojer nouka.', 'My paper boat.'),
      pg(sc('meadow', 'day', it('🌈', 50, 28, 120), it('🧒', 36, 80, 50, { anim: 'bob' })), 'ওই দেখো, রংধনু!', 'oi dekho, rongdhonu!', 'Look, a rainbow!'),
    ],
  },
  {
    id: 'my-animals', emoji: '🐘', title: { bn: 'আমার পশুপাখি', en: 'My Animals' },
    pages: [
      pg(sc('meadow', 'day', it('🐶', 30, 74, 56, { anim: 'bob' }), it('🐱', 66, 76, 52)), 'কুকুর আর বিড়াল।', 'kukur ar biral.', 'A dog and a cat.'),
      pg(sc('meadow', 'day', it('🐄', 30, 72, 62), it('🐐', 68, 76, 50, { anim: 'bob' })), 'গরু আর ছাগল।', 'goru ar chhagol.', 'A cow and a goat.'),
      pg(sc('meadow', 'day', it('🐘', 50, 66, 104, { anim: 'sway' })), 'হাতি অনেক বড়।', 'hati onek boro.', 'The elephant is very big.'),
      pg(sc('meadow', 'day', it('🌳', 40, 54, 100), it('🐒', 40, 40, 38, { anim: 'bob' }), it('🍌', 62, 70, 28)), 'বানর গাছে বসে।', 'banor gachhe boshe.', 'The monkey sits in the tree.'),
      pg(sc('meadow', 'day', it('🦚', 50, 68, 90, { anim: 'sway' })), 'ময়ূর নাচে।', 'moyur nache.', 'The peacock dances.'),
      pg(sc('river', 'day', it('🐟', 30, 76, 40, { anim: 'bob' }), it('🐠', 56, 84, 40, { anim: 'bob' }), it('🐟', 78, 72, 36, { anim: 'bob' })), 'মাছ পানিতে।', 'mach panite.', 'Fish in the water.'),
    ],
  },
  {
    id: 'at-market', emoji: '🛒', title: { bn: 'বাজারে', en: 'At the Market' },
    pages: [
      pg(sc('city', 'day', it('👨', 34, 76, 58), it('👧', 58, 82, 44, { anim: 'bob' })), 'আমরা বাজারে যাই।', 'amra bajare jai.', 'We go to the market.'),
      pg(sc('market', 'day', it('🥭', 22, 76, 40), it('🥭', 34, 80, 40), it('🥭', 46, 76, 40), it('🧑‍🌾', 74, 66, 56)), 'আম কিনব।', 'am kinbo.', 'I will buy mangoes.'),
      pg(sc('market', 'day', it('🐟', 24, 78, 46), it('🐟', 42, 82, 42), it('🧑‍🌾', 72, 66, 56)), 'মাছ কত?', 'mach koto?', 'How much is the fish?'),
      pg(sc('market', 'day', it('💵', 38, 74, 56, { anim: 'pulse' }), it('🧑‍🌾', 72, 66, 56)), 'একশো টাকা।', 'eksho taka.', 'One hundred taka.'),
      pg(sc('market', 'day', it('🛍️', 44, 72, 62, { anim: 'bob' }), it('🍎', 24, 80, 30), it('🍌', 66, 80, 30)), 'আমার ব্যাগে ফল।', 'amar byage fol.', 'Fruit in my bag.'),
      pg(sc('meadow', 'evening', it('🏠', 70, 58, 62), it('👨', 28, 78, 54), it('👧', 46, 82, 42, { anim: 'bob' })), 'বাড়ি চলো।', 'bari cholo.', "Let's go home."),
    ],
  },
  {
    id: 'eid-morning', emoji: '🌙', title: { bn: 'ঈদের সকাল', en: 'Eid Morning' },
    pages: [
      pg(sc('meadow', 'evening', it('🌙', 74, 24, 54, { anim: 'pulse' }), it('🕌', 36, 56, 84)), 'আজ ঈদ!', 'aj id!', 'Today is Eid!'),
      pg(sc('room', 'day', it('👧', 40, 70, 58), it('👗', 66, 70, 52, { anim: 'bob' })), 'নতুন জামা।', 'notun jama.', 'A new dress.'),
      pg(sc('meadow', 'day', it('🕌', 50, 52, 86), it('👨', 22, 80, 50), it('👦', 80, 82, 44)), 'আমরা মসজিদে যাই।', 'amra moshjide jai.', 'We go to the mosque.'),
      pg(sc('meadow', 'day', it('🤗', 40, 66, 70, { anim: 'pulse' }), it('👨', 20, 80, 46), it('👦', 70, 82, 44)), 'সবাই কোলাকুলি করে।', 'shobai kolakuli kore.', 'Everyone hugs.'),
      pg(sc('kitchen', 'day', it('🍛', 36, 76, 54), it('🍮', 62, 78, 46), it('🥛', 82, 76, 32)), 'মজার খাবার।', 'mojar khabar.', 'Tasty food.'),
      pg(sc('meadow', 'day', it('💵', 36, 70, 54, { anim: 'pulse' }), it('🎈', 66, 40, 46, { anim: 'drift' }), it('👧', 62, 80, 46)), 'সালামি পেলাম।', 'salami pelam.', 'I got salami (Eid money).'),
    ],
  },
]

export const olderBooks = [
  {
    id: 'dhaka-rickshaw', emoji: '🛺', title: { bn: 'ঢাকায় রিকশা', en: 'A Rickshaw in Dhaka' },
    pages: [
      pg(sc('city', 'day', it('🛺', 30, 78, 58), it('🚌', 72, 76, 58)), 'ঢাকা অনেক বড় শহর।', 'dhaka onek boro shohor.', 'Dhaka is a very big city.'),
      pg(sc('city', 'day', it('🛺', 22, 78, 50), it('🛺', 52, 80, 50), it('🛺', 80, 78, 50)), 'রাস্তায় অনেক রিকশা চলে।', 'rastay onek riksha chole.', 'Many rickshaws run on the road.'),
      pg(sc('city', 'day', it('🛺', 56, 76, 66, { anim: 'bob' }), it('👨', 22, 80, 48), it('👧', 40, 84, 38)), 'আমি আব্বুর সাথে রিকশায় উঠি।', 'ami abbur sathe rikshay uthi.', 'I get on the rickshaw with Abbu.'),
      pg(sc('city', 'day', it('🛺', 46, 76, 66, { anim: 'bob' }), it('🚴', 78, 80, 44)), 'মামা প্যাডেল করেন।', 'mama pyadel koren.', 'The rickshaw-puller pedals.'),
      pg(sc('market', 'day', it('🛺', 36, 80, 56, { anim: 'bob' }), it('🥭', 70, 78, 38), it('🐟', 84, 82, 34)), 'আমরা বাজার পার হই।', 'amra bajar par hoi.', 'We pass the market.'),
      pg(sc('city', 'evening', it('🛺', 40, 78, 60), it('💵', 74, 74, 46, { anim: 'pulse' })), 'ভাড়া কত, মামা?', 'bhara koto, mama?', 'How much is the fare, uncle?'),
      pg(sc('city', 'evening', it('🏠', 70, 60, 60), it('👨', 28, 80, 48), it('👧', 46, 84, 40, { anim: 'bob' })), 'ধন্যবাদ, মামা। আল্লাহ হাফেজ।', 'dhonnobad, mama. allah hafez.', 'Thank you, uncle. Goodbye.'),
    ],
  },
  {
    id: 'boishakh-fair', emoji: '🎈', title: { bn: 'পহেলা বৈশাখের মেলা', en: 'The Boishakh Fair' },
    pages: [
      pg(sc('meadow', 'day', it('🎉', 50, 30, 70, { anim: 'pulse' }), it('🏠', 22, 62, 52)), 'আজ পহেলা বৈশাখ।', 'aj pohela boishakh.', 'Today is Pohela Boishakh.'),
      pg(sc('room', 'day', it('👧', 34, 70, 56), it('👦', 62, 72, 52), it('👗', 84, 74, 40)), 'সবাই নতুন পোশাক পরে।', 'shobai notun poshak pore.', 'Everyone wears new clothes.'),
      pg(sc('meadow', 'day', it('🎪', 52, 54, 84), it('👨‍👩‍👧', 26, 80, 54)), 'আমরা মেলায় যাই।', 'amra melay jai.', 'We go to the fair.'),
      pg(sc('market', 'day', it('🎈', 22, 60, 44, { anim: 'drift' }), it('🎈', 46, 56, 44, { anim: 'drift' }), it('🪆', 68, 78, 44), it('🏺', 86, 80, 40)), 'মেলায় রঙিন বেলুন আর পুতুল আছে।', 'melay rongin belun ar putul ache.', 'The fair has colourful balloons and dolls.'),
      pg(sc('meadow', 'day', it('🎈', 50, 36, 70, { anim: 'drift' }), it('🧒', 50, 78, 52)), 'আমি লাল বেলুন নিই।', 'ami lal belun nii.', 'I take a red balloon.'),
      pg(sc('market', 'day', it('🍥', 30, 78, 46), it('🍬', 54, 80, 46), it('🍮', 78, 76, 46)), 'আমরা জিলাপি আর মিষ্টি খাই।', 'amra jilapi ar mishti khai.', 'We eat jilapi and sweets.'),
      pg(sc('meadow', 'evening', it('🎆', 30, 26, 60, { anim: 'pulse' }), it('🎆', 68, 34, 54, { anim: 'pulse' }), it('👨‍👩‍👧‍👦', 50, 80, 58)), 'শুভ নববর্ষ!', 'shubho nobobarsho!', 'Happy New Year!'),
    ],
  },
  {
    id: 'hilsa-river', emoji: '🐟', title: { bn: 'নদীতে ইলিশ', en: 'Hilsa on the River' },
    pages: [
      pg(sc('river', 'evening', it('🛶', 44, 66, 62, { anim: 'bob' })), 'নদীতে নৌকা চলে।', 'nodite nouka chole.', 'A boat goes on the river.'),
      pg(sc('river', 'day', it('🛶', 40, 64, 62, { anim: 'bob' }), it('🧑‍🌾', 40, 52, 36), it('🕸️', 70, 76, 50, { anim: 'sway' })), 'জেলেরা জাল ফেলেন।', 'jelera jal felen.', 'The fishermen cast their net.'),
      pg(sc('river', 'day', it('🕸️', 36, 70, 56), it('🐟', 26, 80, 36, { anim: 'bob' }), it('🐟', 44, 84, 36, { anim: 'bob' }), it('🐟', 62, 78, 36, { anim: 'bob' })), 'জালে অনেক ইলিশ।', 'jale onek ilish.', 'Lots of hilsa in the net.'),
      pg(sc('paper', 'day', it('🐟', 50, 56, 110, { anim: 'bob' })), 'ইলিশ রুপালি মাছ।', 'ilish rupali mach.', 'Hilsa is a silvery fish.'),
      pg(sc('market', 'day', it('🐟', 26, 78, 46), it('🐟', 44, 82, 46), it('💵', 66, 74, 46), it('🧑‍🌾', 84, 64, 50)), 'বাজারে ইলিশের দাম বেশি।', 'bajare ilisher dam beshi.', 'Hilsa is expensive in the market.'),
      pg(sc('kitchen', 'day', it('👩', 36, 70, 58), it('🍳', 18, 40, 36), it('🐟', 64, 76, 44)), 'আম্মু ইলিশ রান্না করেন।', 'ammu ilish ranna koren.', 'Ammu cooks hilsa.'),
      pg(sc('meadow', 'day', it('🇧🇩', 50, 38, 80, { anim: 'sway' }), it('🐟', 50, 80, 50, { anim: 'bob' })), 'ইলিশ আমাদের জাতীয় মাছ।', 'ilish amader jatiyo mach.', 'Hilsa is our national fish.'),
    ],
  },
  {
    id: 'dada-village', emoji: '🌳', title: { bn: 'দাদার গ্রাম', en: "Dada's Village" },
    pages: [
      pg(sc('river', 'day', it('🚤', 44, 70, 60, { anim: 'bob' }), it('👧', 44, 56, 30)), 'আমরা গ্রামে যাই।', 'amra grame jai.', 'We go to the village.'),
      pg(sc('meadow', 'day', it('🌾', 20, 72, 50, { anim: 'sway' }), it('🌾', 44, 76, 50, { anim: 'sway' }), it('🌾', 68, 72, 50, { anim: 'sway' }), it('🌾', 86, 76, 50, { anim: 'sway' })), 'গ্রামে বড় ধানক্ষেত আছে।', 'grame boro dhankhet ache.', 'The village has a big rice field.'),
      pg(sc('village', 'day', it('🏊', 30, 82, 40, { anim: 'bob' }), it('🏊', 58, 80, 40, { anim: 'bob' }), it('🌴', 84, 62, 56)), 'পুকুরে ছেলেরা সাঁতার কাটে।', 'pukure chhelera shãtar kate.', 'Boys swim in the pond.'),
      pg(sc('meadow', 'day', it('🌳', 36, 52, 100, { anim: 'sway' }), it('👴', 48, 78, 52)), 'দাদা গাছের নিচে বসেন।', 'dada gachher niche boshen.', 'Dada sits under the tree.'),
      pg(sc('meadow', 'evening', it('👴', 36, 74, 54), it('👧', 62, 80, 44), it('📖', 50, 56, 38, { anim: 'bob' })), 'তিনি আমাকে গল্প শোনান।', 'tini amake golpo shonan.', 'He tells me stories.'),
      pg(sc('village', 'night', it('🏡', 30, 58, 62), it('🌙', 76, 22, 44, { anim: 'pulse' })), 'সন্ধ্যায় আকাশে চাঁদ ওঠে।', 'shondhyay akashe chãd othe.', 'In the evening the moon rises.'),
      pg(sc('village', 'day', it('❤️', 50, 30, 60, { anim: 'pulse' }), it('👴', 36, 76, 50), it('👧', 64, 80, 42)), 'দাদার গ্রাম আমার খুব ভালো লাগে।', 'dadar gram amar khub bhalo lage.', "I like Dada's village very much."),
    ],
  },
  {
    id: 'our-school', emoji: '🏫', title: { bn: 'আমাদের স্কুল', en: 'Our School' },
    pages: [
      pg(sc('meadow', 'day', it('🏫', 52, 52, 84), it('🧒', 22, 80, 46), it('👧', 80, 82, 44)), 'সকালে আমি স্কুলে যাই।', 'shokale ami schule jai.', 'In the morning I go to school.'),
      pg(sc('classroom', 'day', it('🧑‍🏫', 40, 64, 52), it('🧒', 20, 82, 40), it('👧', 72, 82, 40)), 'শিক্ষক ক্লাসে আসেন।', 'shikkhok klashe ashen.', 'The teacher comes to class.'),
      pg(sc('classroom', 'day', it('📖', 30, 80, 44, { anim: 'bob' }), it('📖', 56, 82, 44), it('🧒', 82, 78, 44)), 'আমরা বই খুলি।', 'amra boi khuli.', 'We open our books.'),
      pg(sc('classroom', 'day', it('🖊️', 40, 78, 44, { anim: 'bob' }), it('📓', 62, 80, 46), it('🧒', 20, 80, 44)), 'আমি খাতায় লিখি।', 'ami khatay likhi.', 'I write in my notebook.'),
      pg(sc('meadow', 'day', it('⚽', 52, 80, 40, { anim: 'bob' }), it('🧒', 26, 76, 48), it('👧', 76, 76, 48)), 'টিফিনে আমরা খেলি।', 'tiffine amra kheli.', 'At lunch break we play.'),
      pg(sc('meadow', 'evening', it('🏫', 50, 52, 80), it('🔔', 20, 40, 40, { anim: 'sway' })), 'বিকেলে ছুটি হয়।', 'bikele chhuti hoy.', 'School ends in the afternoon.'),
      pg(sc('meadow', 'evening', it('🏠', 72, 58, 60), it('🧒', 36, 80, 48, { anim: 'bob' })), 'আমি বাড়ি ফিরি।', 'ami bari phiri.', 'I go back home.'),
    ],
  },
  {
    id: 'coxs-bazar', emoji: '🏖️', title: { bn: 'কক্সবাজারের সমুদ্র', en: "Cox's Bazar Sea" },
    pages: [
      pg(sc('city', 'day', it('🚌', 46, 76, 66, { anim: 'bob' })), 'আমরা কক্সবাজারে যাই।', 'amra cox bazare jai.', "We go to Cox's Bazar."),
      pg(sc('sea', 'day', it('⛱️', 28, 78, 52), it('🌴', 82, 66, 60, { anim: 'sway' })), 'এখানে লম্বা সমুদ্র সৈকত আছে।', 'ekhane lomba shomudro soikot ache.', 'There is a long sea beach here.'),
      pg(sc('sea', 'day', it('🌊', 50, 48, 100, { anim: 'bob' })), 'সমুদ্রের ঢেউ বড়।', 'shomudrer dheu boro.', 'The waves of the sea are big.'),
      pg(sc('sea', 'day', it('🐚', 36, 84, 38), it('🦀', 62, 86, 30, { anim: 'bob' }), it('🧒', 20, 74, 46)), 'আমি বালিতে ঝিনুক খুঁজি।', 'ami balite jhinuk khuji.', 'I look for shells in the sand.'),
      pg(sc('sea', 'day', it('🏊', 40, 56, 40, { anim: 'bob' }), it('🏊', 66, 60, 40, { anim: 'bob' })), 'শিশুরা পানিতে খেলে।', 'shishura panite khele.', 'Children play in the water.'),
      pg(sc('sea', 'evening', it('🌅', 50, 46, 90, { anim: 'pulse' })), 'সন্ধ্যায় সূর্য সমুদ্রে ডোবে।', 'shondhyay shurjo shomudre dobe.', 'In the evening the sun sets in the sea.'),
      pg(sc('sea', 'evening', it('🧒', 30, 80, 48), it('👨', 56, 78, 54), it('❤️', 76, 40, 44, { anim: 'pulse' })), 'আমি আবার আসব।', 'ami abar ashbo.', 'I will come again.'),
    ],
  },
]
