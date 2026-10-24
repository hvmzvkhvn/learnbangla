// Poems & songs, reading passages and cinema conversations for the 13–15 ("teen") and 16–18 ("senior") tracks.
//
// Only works that are in the public domain or traditional are included (Tagore d.1941, Dwijendralal Ray d.1913,
// Lalon d.1890, folk rhymes). Kazi Nazrul Islam (d.1976) is mentioned in facts only — his words are NOT quoted.
const L = (bn, roman, en) => ({ bn, roman, en })

// ---- Poems & songs ---------------------------------------------------------------------------
export const poems = [
  {
    key: 'shonarbangla', title: 'আমার সোনার বাংলা', emoji: '🇧🇩', author: 'Rabindranath Tagore',
    note: "The national anthem of Bangladesh, written by Rabindranath Tagore in 1905. Here are the first lines.",
    teen: [
      L('আমার সোনার বাংলা, আমি তোমায় ভালোবাসি।', 'amar shonar bangla, ami tomay bhalobashi.', 'My golden Bengal, I love you.'),
      L('চিরদিন তোমার আকাশ, তোমার বাতাস, আমার প্রাণে বাজায় বাঁশি।', 'chirodin tomar akash, tomar batash, amar prane bajay bãshi.', 'Always your sky and your breeze play a flute in my heart.'),
    ],
    senior: [
      L('আমার সোনার বাংলা, আমি তোমায় ভালোবাসি।', 'amar shonar bangla, ami tomay bhalobashi.', 'My golden Bengal, I love you.'),
      L('চিরদিন তোমার আকাশ, তোমার বাতাস, আমার প্রাণে বাজায় বাঁশি।', 'chirodin tomar akash, tomar batash, amar prane bajay bãshi.', 'Always your sky and your breeze play a flute in my heart.'),
      L('ও মা, ফাগুনে তোর আমের বনে ঘ্রাণে পাগল করে,', 'o ma, phagune tor amer bone ghrane pagol kore,', 'O mother, in spring the scent of your mango groves drives me wild,'),
      L('ও মা, অঘ্রানে তোর ভরা খেতে আমি কী দেখেছি মধুর হাসি।', 'o ma, ogrohayone tor bhora khete ami ki dekhechi modhur hashi.', 'O mother, in the harvest month, in your full fields, what a sweet smile I have seen.'),
    ],
  },
  {
    key: 'dhonodhanno', title: 'ধনধান্য পুষ্পে ভরা', emoji: '🌾', author: 'Dwijendralal Ray',
    note: 'A much-loved patriotic song by Dwijendralal Ray, sung across Bengal.',
    teen: [
      L('ধনধান্য পুষ্পে ভরা আমাদের এই বসুন্ধরা,', 'dhonodhanno pushpe bhora amader ei boshundhora,', 'Full of wealth, grain and flowers is this earth of ours,'),
      L('তাহার মাঝে আছে দেশ এক, সকল দেশের সেরা।', 'tahar majhe ache desh ek, shokol desher sera.', 'and in it is one land, the best of all lands.'),
    ],
    senior: [
      L('ধনধান্য পুষ্পে ভরা আমাদের এই বসুন্ধরা,', 'dhonodhanno pushpe bhora amader ei boshundhora,', 'Full of wealth, grain and flowers is this earth of ours,'),
      L('তাহার মাঝে আছে দেশ এক, সকল দেশের সেরা।', 'tahar majhe ache desh ek, shokol desher sera.', 'and in it is one land, the best of all lands.'),
      L('এমন দেশটি কোথাও খুঁজে পাবে নাকো তুমি,', 'emon deshti kothao khuje pabe nako tumi,', 'You will not find such a land anywhere,'),
      L('সকল দেশের রানি সে যে, আমার জন্মভূমি।', 'shokol desher rani she je, amar jonmobhumi.', 'she is the queen of all lands, my birthplace.'),
    ],
  },
  {
    key: 'ekla', title: 'একলা চলো রে', emoji: '🚶', author: 'Rabindranath Tagore',
    note: 'A song about courage: keep walking, even if no one joins you.',
    teen: [
      L('যদি তোর ডাক শুনে কেউ না আসে তবে একলা চলো রে।', 'jodi tor dak shune keu na ashe tobe ekla cholo re.', 'If no one answers your call, then walk alone.'),
      L('একলা চলো, একলা চলো, একলা চলো রে।', 'ekla cholo, ekla cholo, ekla cholo re.', 'Walk alone, walk alone, walk alone.'),
    ],
    senior: [
      L('যদি তোর ডাক শুনে কেউ না আসে তবে একলা চলো রে।', 'jodi tor dak shune keu na ashe tobe ekla cholo re.', 'If no one answers your call, then walk alone.'),
      L('একলা চলো, একলা চলো, একলা চলো, একলা চলো রে।', 'ekla cholo, ekla cholo, ekla cholo, ekla cholo re.', 'Walk alone, walk alone, walk alone, walk alone.'),
    ],
  },
  {
    key: 'lalon', title: 'খাঁচার ভিতর অচিন পাখি', emoji: '🐦', author: 'Lalon',
    note: 'A famous Baul song by Lalon. The "unknown bird" in the cage stands for the soul.',
    teen: [
      L('খাঁচার ভিতর অচিন পাখি কেমনে আসে যায়।', 'khãchar bhitor ochin pakhi kemone ashe jay.', 'How does the unknown bird come and go inside the cage?'),
      L('ধরতে পারলে মনোবেড়ি দিতাম পাখির পায়।', 'dhorte parle monoberi ditam pakhir pay.', 'If I could catch it, I would put the chain of my heart on its feet.'),
    ],
    senior: [
      L('খাঁচার ভিতর অচিন পাখি কেমনে আসে যায়।', 'khãchar bhitor ochin pakhi kemone ashe jay.', 'How does the unknown bird come and go inside the cage?'),
      L('ধরতে পারলে মনোবেড়ি দিতাম পাখির পায়।', 'dhorte parle monoberi ditam pakhir pay.', 'If I could catch it, I would put the chain of my heart on its feet.'),
    ],
  },
  {
    key: 'chandmama', title: 'আয় আয় চাঁদ মামা', emoji: '🌙', author: 'Traditional rhyme',
    note: 'A traditional lullaby that almost every Bangali child grows up with.',
    teen: [
      L('আয় আয় চাঁদ মামা, টিপ দিয়ে যা।', 'ay ay chãd mama, tip diye ja.', 'Come, come, Uncle Moon, come and put a dot on [my baby].'),
      L('চাঁদের কপালে চাঁদ টিপ দিয়ে যা।', 'chãder kopale chãd tip diye ja.', "Come and put a moon-shaped dot on the moon-like baby's forehead."),
    ],
    senior: [
      L('আয় আয় চাঁদ মামা, টিপ দিয়ে যা।', 'ay ay chãd mama, tip diye ja.', 'Come, come, Uncle Moon, come and put a dot on [my baby].'),
      L('চাঁদের কপালে চাঁদ টিপ দিয়ে যা।', 'chãder kopale chãd tip diye ja.', "Come and put a moon-shaped dot on the moon-like baby's forehead."),
    ],
  },
]

// ---- Reading passages (with comprehension questions) ----------------------------------------------------
// questions: { q, options: [..English..], answer: index }
export const passages = [
  {
    key: 'langday', title: 'Language Day', emoji: '🕯️',
    teen: {
      lines: [
        L('একুশে ফেব্রুয়ারি আমাদের ভাষা দিবস।', 'ekushe february amader bhasha dibosh.', 'The 21st of February is our Language Day.'),
        L('১৯৫২ সালে মানুষ ভাষার জন্য প্রাণ দিয়েছিলেন।', '1952 sale manush bhashar jonno pran diyechilen.', 'In 1952, people gave their lives for their language.'),
        L('তাঁদের স্মরণে ঢাকায় শহীদ মিনার তৈরি হয়েছে।', 'tader shmorone dhakay shohid minar toiri hoyeche.', 'The Shaheed Minar was built in Dhaka in their memory.'),
      ],
      questions: [
        { q: 'In which year did people give their lives for their language?', options: ['1947', '1952', '1971'], answer: 1 },
        { q: 'What was built in Dhaka in their memory?', options: ['A bridge', 'The Shaheed Minar', 'A school'], answer: 1 },
      ],
    },
    senior: {
      lines: [
        L('একুশে ফেব্রুয়ারি আমাদের ভাষা দিবস।', 'ekushe february amader bhasha dibosh.', 'The 21st of February is our Language Day.'),
        L('১৯৫২ সালে ঢাকায় ছাত্ররা ভাষার জন্য মিছিল করেছিলেন।', '1952 sale dhakay chhatrora bhashar jonno michhil korechilen.', 'In 1952, students in Dhaka marched for their language.'),
        L('সেদিন অনেক মানুষ প্রাণ দিয়েছিলেন।', 'shedin onek manush pran diyechilen.', 'Many people gave their lives that day.'),
        L('তাঁদের স্মরণে ঢাকায় শহীদ মিনার তৈরি হয়েছে।', 'tader shmorone dhakay shohid minar toiri hoyeche.', 'The Shaheed Minar was built in Dhaka in their memory.'),
        L('এখন সারা বিশ্বে এই দিনটি আন্তর্জাতিক মাতৃভাষা দিবস হিসেবে পালিত হয়।', 'ekhon shara bishshe ei dinti antorjatik matribhasha dibosh hishebe palito hoy.', 'Now the whole world marks this day as International Mother Language Day.'),
      ],
      questions: [
        { q: 'Who marched in Dhaka in 1952?', options: ['Farmers', 'Students', 'Sailors'], answer: 1 },
        { q: 'What was built in Dhaka in their memory?', options: ['A bridge', 'The Shaheed Minar', 'A school'], answer: 1 },
        { q: 'What is 21 February called around the world today?', options: ['International Mother Language Day', 'Victory Day', 'New Year'], answer: 0 },
      ],
    },
  },
  {
    key: 'dhaka', title: 'A Day in Dhaka', emoji: '🏙️',
    teen: {
      lines: [
        L('ঢাকা বাংলাদেশের রাজধানী।', 'dhaka bangladesher rajdhani.', 'Dhaka is the capital of Bangladesh.'),
        L('রাস্তায় অনেক রিকশা চলে।', 'rastay onek riksha chole.', 'Many rickshaws run on the roads.'),
        L('বিকেলে অনেকে পার্কে বেড়াতে যান।', 'bikele onek parke berate jan.', 'In the afternoon many people go to the park for a walk.'),
      ],
      questions: [
        { q: 'What is Dhaka?', options: ['A village', 'The capital of Bangladesh', 'A river'], answer: 1 },
        { q: 'What runs on the roads?', options: ['Rickshaws', 'Boats', 'Trains'], answer: 0 },
      ],
    },
    senior: {
      lines: [
        L('ঢাকা বাংলাদেশের রাজধানী।', 'dhaka bangladesher rajdhani.', 'Dhaka is the capital of Bangladesh.'),
        L('এই শহরে অনেক মানুষ থাকেন।', 'ei shohore onek manush thaken.', 'Many people live in this city.'),
        L('রাস্তায় অনেক রিকশা চলে।', 'rastay onek riksha chole.', 'Many rickshaws run on the roads.'),
        L('সকালে মানুষ কাজে যান, আর ছাত্র-ছাত্রীরা স্কুলে যায়।', 'shokale manush kaje jan, ar chhatro-chhatrira skule jay.', 'In the morning people go to work, and students go to school.'),
        L('বিকেলে অনেকে পার্কে বেড়াতে যান।', 'bikele onek parke berate jan.', 'In the afternoon many people go to the park for a walk.'),
      ],
      questions: [
        { q: 'What do people do in the morning?', options: ['Go to the park', 'Go to work and school', 'Sleep'], answer: 1 },
        { q: 'Where do many people go in the afternoon?', options: ['To the park', 'To the airport', 'To the river'], answer: 0 },
      ],
    },
  },
  {
    key: 'ilish', title: 'The National Fish', emoji: '🐟',
    teen: {
      lines: [
        L('ইলিশ বাংলাদেশের জাতীয় মাছ।', 'ilish bangladesher jatiyo mach.', 'Hilsa is the national fish of Bangladesh.'),
        L('বর্ষাকালে নদীতে অনেক ইলিশ ধরা পড়ে।', 'borshakale nodite onek ilish dhora pore.', 'In the rainy season a lot of hilsa is caught in the rivers.'),
      ],
      questions: [{ q: 'Which season has the most hilsa?', options: ['Winter', 'The rainy season', 'Summer'], answer: 1 }],
    },
    senior: {
      lines: [
        L('ইলিশ বাংলাদেশের জাতীয় মাছ।', 'ilish bangladesher jatiyo mach.', 'Hilsa is the national fish of Bangladesh.'),
        L('বর্ষাকালে নদীতে অনেক ইলিশ ধরা পড়ে।', 'borshakale nodite onek ilish dhora pore.', 'In the rainy season a lot of hilsa is caught in the rivers.'),
        L('ইলিশ দিয়ে অনেক মজার খাবার রান্না হয়।', 'ilish diye onek mojar khabar ranna hoy.', 'Many tasty dishes are cooked with hilsa.'),
        L('পহেলা বৈশাখে অনেকে পান্তা-ইলিশ খান।', 'pohela boishakhe oneke panta-ilish khan.', 'On Pohela Boishakh many people eat panta bhat with hilsa.'),
      ],
      questions: [
        { q: 'When is hilsa caught in large numbers?', options: ['In the rainy season', 'In winter', 'Only at night'], answer: 0 },
        { q: 'What do many people eat on Pohela Boishakh?', options: ['Biryani', 'Panta bhat with hilsa', 'Pitha'], answer: 1 },
      ],
    },
  },
  {
    key: 'eid', title: 'Eid Morning', emoji: '🌙',
    teen: {
      lines: [
        L('ঈদের দিন সবাই নতুন পোশাক পরে।', 'eider din shobai notun poshak pore.', 'On Eid day everyone wears new clothes.'),
        L('তারপর সবাই একে অপরকে ঈদ মোবারক জানান।', 'tarpor shobai eke oporke eid mubarak janan.', 'Then everyone wishes each other Eid Mubarak.'),
        L('ছোটরা বড়দের কাছ থেকে সালামি পায়।', 'chhotora boroder kachh theke salami pay.', 'Children receive salami (Eid money) from their elders.'),
      ],
      questions: [{ q: 'What do children receive from their elders?', options: ['Salami (Eid money)', 'Homework', 'Shoes'], answer: 0 }],
    },
    senior: {
      lines: [
        L('ঈদের দিন সবাই নতুন পোশাক পরে।', 'eider din shobai notun poshak pore.', 'On Eid day everyone wears new clothes.'),
        L('সকালে মানুষ ঈদগাহে নামাজ পড়েন।', 'shokale manush eidgahe namaj poren.', 'In the morning people pray at the Eidgah.'),
        L('তারপর সবাই একে অপরকে ঈদ মোবারক জানান।', 'tarpor shobai eke oporke eid mubarak janan.', 'Then everyone wishes each other Eid Mubarak.'),
        L('বাড়িতে বাড়িতে মজার খাবার রান্না হয়।', 'barite barite mojar khabar ranna hoy.', 'Tasty food is cooked in every home.'),
        L('ছোটরা বড়দের কাছ থেকে সালামি পায়।', 'chhotora boroder kachh theke salami pay.', 'Children receive salami (Eid money) from their elders.'),
      ],
      questions: [
        { q: 'Where do people pray on Eid morning?', options: ['At the Eidgah', 'At school', 'At the market'], answer: 0 },
        { q: 'What do children receive from their elders?', options: ['Salami (Eid money)', 'Homework', 'Shoes'], answer: 0 },
      ],
    },
  },
]

// ---- Cinema conversations (dialogue scenes) ------------------------------------------------------------
// who: t = you, fr = Rafi (friend), nila = Nila (friend), shop = ticket seller.  Friends use তুমি.
const D = (who, bn, roman, en) => ({ who, bn, roman, en })

export const cinemaScenes = {
  movienight: {
    title: 'Movie Night', emoji: '🍿',
    lines: [
      D('fr', 'তুমি কি আজ সিনেমা দেখতে যাবে?', 'tumi ki aj cinema dekhte jabe?', 'Will you go to the cinema today?'),
      D('t', 'হ্যাঁ! কোন সিনেমা?', 'hyã! kon cinema?', 'Yes! Which film?'),
      D('fr', 'একটা নতুন বাংলা সিনেমা। শুনেছি গল্পটা খুব ভালো।', 'ekta notun bangla cinema. shunechi golpota khub bhalo.', 'A new Bangla film. I hear the story is very good.'),
      D('t', 'তাহলে চলো যাই। কয়টায় শুরু?', 'tahole cholo jai. koytay shuru?', "Then let's go. What time does it start?"),
      D('fr', 'সন্ধ্যা সাতটায়।', 'shondha shatay.', 'At seven in the evening.'),
      D('t', 'ঠিক আছে। আমি টিকিট কিনব।', 'thik ache. ami tikit kinbo.', "Okay. I'll buy the tickets."),
      D('fr', 'আমি পপকর্ন আনব।', 'ami popcorn anbo.', "I'll bring popcorn."),
    ],
  },
  song: {
    title: 'Talking About a Song', emoji: '🎵',
    lines: [
      D('t', 'তুমি কি এই গানটা শুনেছো?', 'tumi ki ei ganta shunecho?', 'Have you heard this song?'),
      D('fr', 'হ্যাঁ, গানটা আমার খুব পছন্দ।', 'hyã, ganta amar khub pochhondo.', 'Yes, I really like this song.'),
      D('t', 'গায়কের গলা খুব সুন্দর।', 'gayoker gola khub shundor.', "The singer's voice is very beautiful."),
      D('fr', 'সুরটাও মনে রাখার মতো।', 'shurtao mone rakhar moto.', 'The tune is memorable too.'),
      D('t', 'আবার একবার শুনি?', 'abar ekbar shuni?', 'Shall we listen once more?'),
      D('fr', 'অবশ্যই!', 'obosshoi!', 'Of course!'),
    ],
  },
  ticket: {
    title: 'At the Ticket Counter', emoji: '🎫',
    lines: [
      D('t', 'ভাই, দুটো টিকিট দিন।', 'bhai, duto tikit din.', 'Brother, please give two tickets.'),
      D('shop', 'কোন শো-তে?', 'kon show-te?', 'For which show?'),
      D('t', 'সন্ধ্যা সাতটার শো-তে।', 'shondha shatar show-te.', 'The seven o\'clock show.'),
      D('shop', 'দুটো টিকিট, দুইশো টাকা।', 'duto tikit, duisho taka.', 'Two tickets, two hundred taka.'),
      D('t', 'এই নিন। ধন্যবাদ।', 'ei nin. dhonnobad.', 'Here you are. Thank you.'),
      D('shop', 'আপনাকেও ধন্যবাদ। উপভোগ করুন।', 'apnakeo dhonnobad. upobhog korun.', 'Thank you too. Enjoy.'),
    ],
  },
  filmtalk: {
    title: 'Pather Panchali', emoji: '🎞️',
    lines: [
      D('fr', 'তুমি কি "পথের পাঁচালী" দেখেছো?', 'tumi ki "pother pãchali" dekhecho?', 'Have you seen "Pather Panchali"?'),
      D('t', 'না, এখনও দেখিনি। গল্পটা কী নিয়ে?', 'na, ekhono dekhini. golpota ki niye?', 'No, not yet. What is the story about?'),
      D('fr', 'একটা ছোট ছেলে আর তার বোনের গল্প। গ্রামের জীবন নিয়ে।', 'ekta chhoto chhele ar tar boner golpo. gramer jibon niye.', 'The story of a little boy and his sister, about village life.'),
      D('t', 'ছবিটা কে বানিয়েছিলেন?', 'chhobita ke baniyechilen?', 'Who made the film?'),
      D('fr', 'সত্যজিৎ রায়। এটা তাঁর প্রথম ছবি।', 'shottojit ray. eta tãr prothom chhobi.', 'Satyajit Ray. It was his first film.'),
      D('t', 'তাহলে আমি দেখব। তুমি কি আমাকে দেখাবে?', 'tahole ami dekhbo. tumi ki amake dekhabe?', "Then I'll watch it. Will you show it to me?"),
      D('fr', 'অবশ্যই। আমরা একসাথে দেখব।', 'obosshoi. amra eksathe dekhbo.', "Of course. We'll watch it together."),
      D('t', 'দারুণ! আমি পপকর্ন আনব।', 'darun! ami popcorn anbo.', "Great! I'll bring popcorn."),
    ],
  },
}
