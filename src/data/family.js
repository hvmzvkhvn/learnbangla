// "Family" unit: everyday conversations at home. Bangladeshi Bangla.
//
// Address rules used throughout (set by the content owner):
//   • The child (Tara) says আপনি to ALL elders — Ammu, Abbu, Nana, Dada, Nani, Chacha…
//   • Elders say তুমি to the child.
//   • Tara says তুমি to a friend (Rafi), a peer.
// Each line: [speakerId, bn, roman, en, art?]   (art = picture cue, used in the 5–7 track)

export const roster = {
  t: { bn: 'তারা', en: 'Tara', emoji: '🧒', me: true },
  am: { bn: 'আম্মু', en: 'Ammu', emoji: '👩' },
  ab: { bn: 'আব্বু', en: 'Abbu', emoji: '👨' },
  nana: { bn: 'নানা', en: 'Nana', emoji: '👴' },
  nani: { bn: 'নানি', en: 'Nani', emoji: '👵' },
  dada: { bn: 'দাদা', en: 'Dada', emoji: '👴' },
  ch: { bn: 'চাচা', en: 'Chacha', emoji: '🧔' },
  fr: { bn: 'রাফি', en: 'Rafi', emoji: '🧑' },
  nila: { bn: 'নীলা', en: 'Nila', emoji: '👧' },
  shop: { bn: 'দোকানদার', en: 'Shopkeeper', emoji: '🧑‍🌾' },
  dr: { bn: 'ডাক্তার', en: 'Doctor', emoji: '👨‍⚕️' },
  old: { bn: 'বৃদ্ধ লোক', en: 'Old man', emoji: '👴' },
}

import { moreScenes } from './family2'

const L = (who, bn, roman, en, art) => ({ who, bn, roman, en, art })

export const ADDRESS_TIP =
  'We say আপনি to every elder — Ammu, Abbu, Nana, Dada, Nani, uncles and aunts. Elders say তুমি to children, and you say তুমি to friends.'

// ---- Everyday phrases (taught before the conversations) -----------------------------------
const P = (bn, roman, en) => ({ bn, roman, en })

export const phrases = {
  young: [
    P('আসসালামু আলাইকুম', 'assalamu alaikum', 'Peace be upon you (greeting)'),
    P('ওয়ালাইকুম আসসালাম', 'walaikum assalam', 'And peace be upon you (reply)'),
    P('বিসমিল্লাহ', 'bismillah', 'In the name of Allah (said before eating)'),
    P('আলহামদুলিল্লাহ', 'alhamdulillah', 'Praise be to Allah'),
    P('ইনশাআল্লাহ', 'inshaallah', 'God willing'),
    P('আল্লাহ হাফেজ', 'allah hafez', 'Goodbye (may Allah protect you)'),
  ],
  older: [
    P('আসসালামু আলাইকুম', 'assalamu alaikum', 'Peace be upon you (greeting)'),
    P('ওয়ালাইকুম আসসালাম', 'walaikum assalam', 'And peace be upon you (reply)'),
    P('বিসমিল্লাহ', 'bismillah', 'In the name of Allah (said before eating)'),
    P('আলহামদুলিল্লাহ', 'alhamdulillah', 'Praise be to Allah'),
    P('ইনশাআল্লাহ', 'inshaallah', 'God willing'),
    P('মাশাআল্লাহ', 'mashaallah', 'As Allah has willed (what a wonderful thing!)'),
    P('আল্লাহ হাফেজ', 'allah hafez', 'Goodbye (may Allah protect you)'),
    P('আমিন', 'amin', 'Ameen'),
    P('ঈদ মোবারক', 'eid mubarak', 'Eid Mubarak'),
    P('দোয়া করবেন', 'doa korben', 'Please pray for me (said to an elder)'),
  ],
}

// ---- আপনি or তুমি? ---------------------------------------------------------------------------
// Young: pick the pronoun for each person. Older: pick the right sentence.
// Older pairs are bank items (so they are reviewed and get audio): { right, wrong }.
export const politeYoung = [
  { title: 'What do you say to your Nana?', art: '👴', who: 'Nana', right: 'আপনি' },
  { title: 'What do you say to your Ammu?', art: '👩', who: 'Ammu', right: 'আপনি' },
  { title: 'What do you say to your friend Rafi?', art: '🧑', who: 'Rafi', right: 'তুমি' },
  { title: 'What do you say to your Dada?', art: '👴', who: 'Dada', right: 'আপনি' },
  { title: 'Nana is talking to you. What does Nana say?', art: '👴', who: 'Nana to you', right: 'তুমি' },
  { title: 'What do you say to your Abbu?', art: '👨', who: 'Abbu', right: 'আপনি' },
]

export const politeOlder = [
  {
    title: 'You ask your Nana how he is. What do you say?',
    art: '👴',
    right: P('আপনি কেমন আছেন?', 'apni kemon achen?', 'How are you? (to an elder)'),
    wrong: [P('তুমি কেমন আছো?', 'tumi kemon acho?', 'How are you? (to a friend)')],
    existing: true,
  },
  {
    title: 'You ask Abbu for some water. What do you say?',
    art: '👨',
    right: P('আব্বু, আমাকে একটু পানি দেবেন?', 'Abbu, amake ektu pani deben?', 'Abbu, will you give me a little water?'),
    wrong: [P('আব্বু, আমাকে একটু পানি দাও।', 'Abbu, amake ektu pani dao.', 'Abbu, give me a little water. (too casual)')],
  },
  {
    title: 'You ask your friend Rafi to play. What do you say?',
    art: '🧑',
    right: P('রাফি, তুমি কি খেলবে?', 'Rafi, tumi ki khelbe?', 'Rafi, will you play?'),
    wrong: [P('রাফি, আপনি কি খেলবেন?', 'Rafi, apni ki khelben?', 'Rafi, will you play? (too formal)')],
  },
  {
    title: 'You invite Dada to sit down. What do you say?',
    art: '👴',
    right: P('দাদা, আপনি বসুন।', 'Dada, apni boshun.', 'Dada, please sit down.'),
    wrong: [P('দাদা, তুমি বসো।', 'Dada, tumi boso.', 'Dada, sit down. (too casual)')],
  },
  {
    title: 'Nana asks if you washed your hands. What does he say?',
    art: '👴',
    right: P('তুমি হাত ধুয়েছো?', 'tumi hat dhuyecho?', 'Did you wash your hands?'),
    wrong: [P('আপনি হাত ধুয়েছেন?', 'apni hat dhuyechen?', 'Did you wash your hands? (to an elder)')],
  },
  {
    title: 'You ask Nani if she has eaten. What do you say?',
    art: '👵',
    right: P('নানি, আপনি কি খেয়েছেন?', 'Nani, apni ki kheyechen?', 'Nani, have you eaten?'),
    wrong: [P('নানি, তুমি কি খেয়েছো?', 'Nani, tumi ki kheyecho?', 'Nani, have you eaten? (too casual)')],
  },
]

// ---- Conversations --------------------------------------------------------------------------------
// young: 3–4 short lines with picture cues.  older: 6–8 line conversations.
const baseScenes = {
  young: [
    {
      key: 'wake', title: 'Wake Up!', emoji: '⏰',
      lines: [
        L('am', 'তারা, ওঠো! সকাল হয়েছে।', 'Tara, otho! shokal hoyeche.', 'Tara, get up! It is morning.', '⏰'),
        L('t', 'আসসালামু আলাইকুম, আম্মু।', 'Assalamu alaikum, Ammu.', 'Peace be upon you, Ammu.', '👋'),
        L('am', 'ওয়ালাইকুম আসসালাম। মুখ ধুয়ে নাও।', 'Walaikum assalam. Mukh dhuye nao.', 'And peace be upon you. Wash your face.', '🧼'),
        L('t', 'জি, আম্মু।', 'Ji, Ammu.', 'Yes, Ammu.', '✅'),
      ],
    },
    {
      key: 'ready', title: 'Getting Ready', emoji: '🎒',
      lines: [
        L('am', 'জুতা পরেছো?', 'Juta poreccho?', 'Have you put on your shoes?', '👟'),
        L('t', 'জি, আম্মু। পরেছি।', 'Ji, Ammu. Porechi.', 'Yes, Ammu. I have.', '✅'),
        L('am', 'ব্যাগ নিয়েছো?', 'Byag niyecho?', 'Did you take your bag?', '🎒'),
        L('t', 'জি, নিয়েছি। ধন্যবাদ, আম্মু।', 'Ji, niyechi. Dhonnobad, Ammu.', 'Yes, I did. Thank you, Ammu.', '🙏'),
      ],
    },
    {
      key: 'school', title: 'Going to School', emoji: '🏫',
      lines: [
        L('ab', 'চলো, স্কুলে যাই।', 'Cholo, skule jai.', "Come on, let's go to school.", '🚗'),
        L('t', 'আব্বু, আপনি আমাকে নামিয়ে দেবেন?', 'Abbu, apni amake namiye deben?', 'Abbu, will you drop me off?', '🏫'),
        L('ab', 'হ্যাঁ, দেব।', 'Hyã, debo.', 'Yes, I will.', '✅'),
        L('t', 'আল্লাহ হাফেজ, আব্বু।', 'Allah hafez, Abbu.', 'Goodbye, Abbu.', '👋'),
      ],
    },
    {
      key: 'home', title: 'Back Home', emoji: '🏠',
      lines: [
        L('t', 'আসসালামু আলাইকুম, আম্মু!', 'Assalamu alaikum, Ammu!', 'Peace be upon you, Ammu!', '🏠'),
        L('am', 'ওয়ালাইকুম আসসালাম। স্কুল কেমন ছিল?', 'Walaikum assalam. Skul kemon chilo?', 'And peace be upon you. How was school?', '🏫'),
        L('t', 'খুব ভালো ছিল! আপনি কেমন আছেন?', 'Khub bhalo chilo! Apni kemon achen?', 'It was very good! How are you?', '😊'),
        L('am', 'আলহামদুলিল্লাহ, ভালো আছি।', 'Alhamdulillah, bhalo achi.', 'Alhamdulillah, I am well.', '😊'),
      ],
    },
    {
      key: 'eat', title: 'Time to Eat', emoji: '🍚',
      lines: [
        L('am', 'খেতে এসো।', 'Khete esho.', 'Come and eat.', '🍽️'),
        L('t', 'বিসমিল্লাহ। আমাকে একটু ভাত দেবেন?', 'Bismillah. Amake ektu bhat deben?', 'Bismillah. Will you give me a little rice?', '🍚'),
        L('am', 'এই নাও।', 'Ei nao.', 'Here you go.', '🍚'),
        L('t', 'ধন্যবাদ, আম্মু। খুব মজা হয়েছে!', 'Dhonnobad, Ammu. Khub moja hoyeche!', 'Thank you, Ammu. It is so tasty!', '😋'),
      ],
    },
    {
      key: 'play', title: 'Going to Play', emoji: '⚽',
      lines: [
        L('t', 'আম্মু, আমি খেলতে যাই?', 'Ammu, ami khelte jai?', 'Ammu, may I go and play?', '⚽'),
        L('am', 'হ্যাঁ, যাও। মাগরিবের আগে ফিরবে।', 'Hyã, jao. Magriber age firbe.', 'Yes, go. Come back before Maghrib.', '🌇'),
        L('t', 'ইনশাআল্লাহ, আম্মু।', 'Inshaallah, Ammu.', 'God willing, Ammu.', '🙏'),
        L('t', 'রাফি, তুমি খেলবে?', 'Rafi, tumi khelbe?', 'Rafi, will you play?', '🧑'),
        L('fr', 'হ্যাঁ, চলো!', 'Hyã, cholo!', 'Yes, come on!', '⚽'),
      ],
    },
    {
      key: 'nana', title: 'Calling Nana', emoji: '📞',
      lines: [
        L('t', 'নানা, আসসালামু আলাইকুম। আপনি কেমন আছেন?', 'Nana, assalamu alaikum. Apni kemon achen?', 'Nana, peace be upon you. How are you?', '📞'),
        L('nana', 'ওয়ালাইকুম আসসালাম। ভালো আছি। তুমি কেমন আছো?', 'Walaikum assalam. Bhalo achi. Tumi kemon acho?', 'And peace be upon you. I am well. How are you?', '😊'),
        L('t', 'আমি ভালো আছি, নানা।', 'Ami bhalo achi, Nana.', 'I am well, Nana.', '😊'),
        L('nana', 'আলহামদুলিল্লাহ! আল্লাহ হাফেজ।', 'Alhamdulillah! Allah hafez.', 'Alhamdulillah! Goodbye.', '👋'),
      ],
    },
    {
      key: 'dada', title: "Dada's Story", emoji: '📖',
      lines: [
        L('dada', 'তারা, এসো। গল্প শুনবে?', 'Tara, esho. Golpo shunbe?', 'Tara, come here. Will you listen to a story?', '📖'),
        L('t', 'জি, দাদা!', 'Ji, Dada!', 'Yes, Dada!', '🤩'),
        L('dada', 'এক ছিল রাজা।', 'Ek chilo raja.', 'Once there was a king.', '👑'),
        L('t', 'বাহ! তারপর, দাদা?', 'Bah! Tarpor, Dada?', 'Wow! And then, Dada?', '👏'),
      ],
    },
    {
      key: 'masjid', title: 'Going to the Masjid', emoji: '🕌',
      lines: [
        L('ab', 'চলো, মসজিদে যাই।', 'Cholo, moshjide jai.', "Come, let's go to the masjid.", '🕌'),
        L('t', 'আব্বু, আমি অজু করেছি।', 'Abbu, ami oju korechi.', 'Abbu, I have done wudu.', '💧'),
        L('ab', 'শাবাশ! টুপি পরো।', 'Shabash! Tupi poro.', 'Well done! Put on your cap.', '🧢'),
        L('t', 'আমি দাদার সাথে যাব।', 'Ami dadar shathe jabo.', "I'll go with Dada.", '👴'),
      ],
    },
    {
      key: 'please', title: 'Please & Thank You', emoji: '🙏',
      lines: [
        L('t', 'নানি, অনুগ্রহ করে আমাকে একটু পানি দিন।', 'Nani, onugroho kore amake ektu pani din.', 'Nani, please give me a little water.', '💧'),
        L('nani', 'এই নাও, আমার সোনা।', 'Ei nao, amar shona.', 'Here you go, my dear.', '🥛'),
        L('t', 'ধন্যবাদ, নানি।', 'Dhonnobad, Nani.', 'Thank you, Nani.', '🙏'),
      ],
    },
    {
      key: 'sorry', title: 'Saying Sorry', emoji: '😔',
      lines: [
        L('t', 'দুঃখিত, আম্মু। আমি ভুল করেছি।', 'Dukkhito, Ammu. Ami bhul korechi.', 'Sorry, Ammu. I made a mistake.', '😔'),
        L('am', 'ঠিক আছে। আর করো না।', 'Thik ache. Ar koro na.', 'It is okay. Do not do it again.', '🙂'),
        L('t', 'জি, আম্মু। ইনশাআল্লাহ।', 'Ji, Ammu. Inshaallah.', 'Yes, Ammu. God willing.', '🙏'),
      ],
    },
    {
      key: 'bed', title: 'Bedtime', emoji: '🌙',
      lines: [
        L('am', 'তারা, ঘুমানোর সময় হয়েছে।', 'Tara, ghumanor shomoy hoyeche.', 'Tara, it is time to sleep.', '🛏️'),
        L('am', 'দাঁত ব্রাশ করেছো?', 'Dãt brash korecho?', 'Did you brush your teeth?', '🪥'),
        L('t', 'জি, করেছি। শুভ রাত্রি, আম্মু।', 'Ji, korechi. Shubho ratri, Ammu.', 'Yes, I did. Good night, Ammu.', '🌙'),
        L('am', 'শুভ রাত্রি, আমার সোনা।', 'Shubho ratri, amar shona.', 'Good night, my dear.', '💤'),
      ],
    },
  ],

  older: [
    {
      key: 'wake', title: 'Wake Up!', emoji: '⏰', tip: ADDRESS_TIP,
      lines: [
        L('am', 'তারা, ওঠো! সকাল হয়েছে।', 'Tara, otho! shokal hoyeche.', 'Tara, get up! It is morning.'),
        L('t', 'আম্মু, আরেকটু ঘুমাই?', 'Ammu, arekto ghumai?', 'Ammu, may I sleep a little more?'),
        L('am', 'না, স্কুলের সময় হয়ে গেছে। দাঁত ব্রাশ করো।', 'Na, skuler shomoy hoye geche. Dãt brash koro.', 'No, it is time for school. Brush your teeth.'),
        L('t', 'ঠিক আছে, আম্মু। আমি এখনই যাচ্ছি।', 'Thik ache, Ammu. Ami ekhoni jachchi.', "Okay, Ammu. I'm going right now."),
        L('am', 'মুখ ধুয়ে নাশতা করতে এসো।', 'Mukh dhuye nashta korte esho.', 'Wash your face and come to have breakfast.'),
        L('t', 'আম্মু, আজ নাশতায় কী আছে?', 'Ammu, aj nashtay ki ache?', "Ammu, what's for breakfast today?"),
        L('am', 'ডিম আর পরোটা আছে।', 'Dim ar porota ache.', 'There is egg and paratha.'),
        L('t', 'বাহ! আমার খুব ভালো লাগে।', 'Bah! Amar khub bhalo lage.', 'Wow! I like that a lot.'),
      ],
    },
    {
      key: 'ready', title: 'Getting Ready', emoji: '🎒',
      lines: [
        L('am', 'স্কুলের ইউনিফর্ম পরেছো?', 'Skuler uniform poreccho?', 'Have you put on your school uniform?'),
        L('t', 'জি, আম্মু, পরেছি। কিন্তু জুতা খুঁজে পাচ্ছি না।', 'Ji, Ammu, porechi. Kintu juta khuje pachchi na.', "Yes, Ammu, I have. But I can't find my shoes."),
        L('am', 'জুতা তো দরজার পাশে আছে।', 'Juta to dorjar pashe ache.', 'Your shoes are by the door.'),
        L('t', 'পেয়েছি! ধন্যবাদ, আম্মু।', 'Peyechi! Dhonnobad, Ammu.', 'Found them! Thank you, Ammu.'),
        L('am', 'ব্যাগে সব বই নিয়েছো?', 'Byage shob boi niyecho?', 'Did you put all your books in your bag?'),
        L('t', 'জি, আর আমার পানির বোতলও নিয়েছি।', 'Ji, ar amar panir botolo niyechi.', 'Yes, and I took my water bottle too.'),
        L('am', 'ভালো। এবার টিফিন বক্সটা নাও।', 'Bhalo. Ebar tiffin boxta nao.', 'Good. Now take your lunchbox.'),
        L('t', 'আচ্ছা, নিয়েছি। আমি যাই?', 'Accha, niyechi. Ami jai?', "Okay, I've got it. May I go?"),
      ],
    },
    {
      key: 'school', title: 'Going to School', emoji: '🚗',
      lines: [
        L('ab', 'তারা, দেরি হয়ে যাচ্ছে। গাড়িতে ওঠো।', 'Tara, deri hoye jachche. Garite otho.', "Tara, we're getting late. Get in the car."),
        L('t', 'আব্বু, আপনি কি আমাকে স্কুলে নামিয়ে দেবেন?', 'Abbu, apni ki amake skule namiye deben?', 'Abbu, will you drop me off at school?'),
        L('ab', 'হ্যাঁ, আজ আমি নামিয়ে দেব।', 'Hyã, aj ami namiye deb.', "Yes, I'll drop you off today."),
        L('t', 'আব্বু, আপনার অফিসে যেতে দেরি হবে না তো?', 'Abbu, apnar office-e jete deri hobe na to?', "Abbu, you won't be late for the office, will you?"),
        L('ab', 'না, চিন্তা করো না।', 'Na, chinta koro na.', "No, don't worry."),
        L('ab', 'এই তো স্কুল এসে গেছে। মন দিয়ে পড়ো।', 'Ei to skul eshe geche. Mon diye poro.', 'Here we are at school already. Study carefully.'),
        L('t', 'ইনশাআল্লাহ, আব্বু। আল্লাহ হাফেজ।', 'Inshaallah, Abbu. Allah hafez.', 'God willing, Abbu. Goodbye.'),
        L('ab', 'আল্লাহ হাফেজ। ভালো থেকো।', 'Allah hafez. Bhalo theko.', 'Goodbye. Stay well.'),
      ],
    },
    {
      key: 'home', title: 'How Was Your Day?', emoji: '🏠',
      lines: [
        L('t', 'আসসালামু আলাইকুম, আম্মু! আমি এসে গেছি।', 'Assalamu alaikum, Ammu! Ami eshe gechi.', "Peace be upon you, Ammu! I'm home."),
        L('am', 'ওয়ালাইকুম আসসালাম। স্কুল কেমন ছিল?', 'Walaikum assalam. Skul kemon chilo?', 'And peace be upon you. How was school?'),
        L('t', 'খুব ভালো ছিল, আম্মু। আজ আমরা ছবি এঁকেছি।', 'Khub bhalo chilo, Ammu. Aj amra chobi enkechi.', 'It was very good, Ammu. Today we drew pictures.'),
        L('am', 'বাহ, মাশাআল্লাহ! তুমি কি কিছু খেয়েছো?', 'Bah, mashaallah! Tumi ki kichu kheyecho?', 'Wow, mashaAllah! Have you eaten anything?'),
        L('t', 'জি, টিফিন খেয়েছি। আম্মু, আপনার দিন কেমন কাটল?', 'Ji, tiffin kheyechi. Ammu, apnar din kemon katlo?', 'Yes, I ate my lunch. Ammu, how was your day?'),
        L('am', 'আলহামদুলিল্লাহ, ভালো কেটেছে। এখন হাত-মুখ ধুয়ে এসো।', 'Alhamdulillah, bhalo keteche. Ekhon hat-mukh dhuye esho.', 'Alhamdulillah, it went well. Now go and wash your hands and face.'),
        L('t', 'আচ্ছা, আম্মু।', 'Accha, Ammu.', 'Okay, Ammu.'),
      ],
    },
    {
      key: 'homework', title: 'Homework Time', emoji: '📚',
      lines: [
        L('am', 'হোমওয়ার্ক শেষ করেছো?', 'Homework shesh korecho?', 'Have you finished your homework?'),
        L('t', 'এখনও না, আম্মু। আপনি কি আমাকে একটু সাহায্য করবেন?', 'Ekhono na, Ammu. Apni ki amake ektu shahajjo korben?', 'Not yet, Ammu. Will you help me a little?'),
        L('am', 'অবশ্যই। কোন বিষয়টা কঠিন লাগছে?', 'Obosshoi. Kon bishoyta kothin lagche?', 'Of course. Which subject feels hard?'),
        L('t', 'গণিত। আমি এই অঙ্কটা বুঝতে পারছি না।', 'Gonit. Ami ei onkota bujhte parchi na.', "Maths. I can't understand this sum."),
        L('am', 'ঠিক আছে, আমরা একসাথে করি। আগে মন দিয়ে পড়ো।', 'Thik ache, amra eksathe kori. Age mon diye poro.', "Okay, let's do it together. First read it carefully."),
        L('t', 'বুঝেছি! এবার আমি পারব।', 'Bujhechi! Ebar ami parbo.', 'I understand! Now I can do it.'),
        L('am', 'শাবাশ! হোমওয়ার্কের পর গল্পের বই পড়তে পারো।', 'Shabash! Homeworker por golper boi porte paro.', 'Well done! After homework you can read a storybook.'),
      ],
    },
    {
      key: 'meal', title: 'Asking for Food', emoji: '🍚',
      lines: [
        L('am', 'তারা, খেতে এসো। ভাত বাড়া হয়েছে।', 'Tara, khete esho. Bhat bara hoyeche.', 'Tara, come and eat. The rice is served.'),
        L('t', 'বিসমিল্লাহ। আম্মু, আমাকে একটু ডাল দেবেন?', 'Bismillah. Ammu, amake ektu dal deben?', 'Bismillah. Ammu, will you give me a little dal?'),
        L('am', 'এই নাও। মাছও নেবে?', 'Ei nao. Machho nebe?', 'Here you go. Will you take some fish too?'),
        L('t', 'জি, আম্মু। অনুগ্রহ করে আমাকে আরেকটু দিন।', 'Ji, Ammu. Onugroho kore amake arekto din.', 'Yes, Ammu. Please give me a little more.'),
        L('am', 'নাও। ভালো লাগছে?', 'Nao. Bhalo lagche?', 'Here. Are you enjoying it?'),
        L('t', 'খুব মজা হয়েছে, আম্মু। আলহামদুলিল্লাহ, আমার পেট ভরে গেছে।', 'Khub moja hoyeche, Ammu. Alhamdulillah, amar pet bhore geche.', 'It is very tasty, Ammu. Alhamdulillah, my tummy is full.'),
        L('am', 'আর একটু ফল খাবে?', 'Ar ektu phol khabe?', 'Will you have a little fruit?'),
        L('t', 'না, ধন্যবাদ। আমি পানি খাব।', 'Na, dhonnobad. Ami pani khabo.', "No, thank you. I'll have some water."),
      ],
    },
    {
      key: 'guest', title: 'Welcoming Chacha', emoji: '🧔',
      lines: [
        L('t', 'চাচা, আসসালামু আলাইকুম। আপনি কেমন আছেন?', 'Chacha, assalamu alaikum. Apni kemon achen?', 'Chacha, peace be upon you. How are you?'),
        L('ch', 'ওয়ালাইকুম আসসালাম। আলহামদুলিল্লাহ, ভালো আছি। তুমি কেমন আছো?', 'Walaikum assalam. Alhamdulillah, bhalo achi. Tumi kemon acho?', 'And peace be upon you. Alhamdulillah, I am well. How are you?'),
        L('t', 'আমিও ভালো আছি। চাচা, আপনি বসুন।', 'Amio bhalo achi. Chacha, apni boshun.', 'I am well too. Chacha, please sit down.'),
        L('ch', 'ধন্যবাদ, তারা।', 'Dhonnobad, Tara.', 'Thank you, Tara.'),
        L('t', 'চাচা, আপনার জন্য একটু পানি আনব?', 'Chacha, apnar jonno ektu pani anbo?', 'Chacha, shall I bring you a little water?'),
        L('ch', 'হ্যাঁ, আনো। তুমি খুব ভদ্র।', 'Hyã, ano. Tumi khub bhodro.', 'Yes, bring some. You are very polite.'),
        L('t', 'আপনাকে ধন্যবাদ, চাচা।', 'Apnake dhonnobad, Chacha.', 'Thank you, Chacha.'),
      ],
    },
    {
      key: 'sorry', title: 'Saying Sorry', emoji: '😔',
      lines: [
        L('t', 'আম্মু, আমাকে মাফ করবেন। আমি গ্লাসটা ভেঙে ফেলেছি।', 'Ammu, amake maf korben. Ami glasta bhenge felechi.', 'Ammu, please forgive me. I broke the glass.'),
        L('am', 'কোনো সমস্যা নেই। তোমার হাতে লাগেনি তো?', 'Kono shomossha nei. Tomar hate lageni to?', 'No problem. You did not hurt your hand, did you?'),
        L('t', 'না, আম্মু। আমি ঠিক আছি।', 'Na, Ammu. Ami thik achi.', 'No, Ammu. I am fine.'),
        L('am', 'সাবধানে থেকো। কাচগুলো ধরো না।', 'Shabdhane theko. Kachgulo dhoro na.', "Be careful. Don't touch the pieces of glass."),
        L('t', 'জি, আম্মু। আমি আর অসাবধান হব না।', 'Ji, Ammu. Ami ar oshabdhan hobo na.', 'Yes, Ammu. I will not be careless again.'),
        L('am', 'ঠিক আছে, আমার সোনা।', 'Thik ache, amar shona.', 'Okay, my dear.'),
      ],
    },
    {
      key: 'rules', title: 'What Abbu Says', emoji: '📋',
      lines: [
        L('ab', 'বাইরে থেকে এসে আগে হাত ধুয়ে নাও।', 'Baire theke eshe age hat dhuye nao.', 'When you come in from outside, wash your hands first.'),
        L('t', 'জি, আব্বু। আমি এখনই ধুচ্ছি।', 'Ji, Abbu. Ami ekhoni dhuchchi.', "Yes, Abbu. I'm washing them right now."),
        L('ab', 'জুতা খুলে ঘরে ঢোকো। ঘরে দৌড়াবে না।', 'Juta khule ghore dhoko. Ghore dourabe na.', "Take your shoes off before you come in. Don't run in the house."),
        L('t', 'আচ্ছা, আব্বু। আমি হেঁটে যাব।', 'Accha, Abbu. Ami hete jabo.', "Okay, Abbu. I'll walk."),
        L('ab', 'বড়দের কথা মন দিয়ে শুনবে। আর মিথ্যা বলবে না।', 'Boroder kotha mon diye shunbe. Ar mithya bolbe na.', "Listen carefully to your elders. And don't tell lies."),
        L('t', 'ইনশাআল্লাহ, আব্বু। আমি চেষ্টা করব।', 'Inshaallah, Abbu. Ami cheshta korbo.', "God willing, Abbu. I'll try."),
      ],
    },
    {
      key: 'play', title: 'Playing Outside', emoji: '⚽',
      lines: [
        L('t', 'আম্মু, আমি কি বাইরে খেলতে যেতে পারি?', 'Ammu, ami ki baire khelte jete pari?', 'Ammu, may I go outside to play?'),
        L('am', 'হোমওয়ার্ক শেষ হয়েছে?', 'Homework shesh hoyeche?', 'Is your homework finished?'),
        L('t', 'জি, শেষ হয়েছে।', 'Ji, shesh hoyeche.', 'Yes, it is finished.'),
        L('am', 'ঠিক আছে। কিন্তু মাগরিবের আগে ঘরে ফিরবে।', 'Thik ache. Kintu magriber age ghore firbe.', 'Okay. But come home before Maghrib.'),
        L('t', 'ইনশাআল্লাহ, আম্মু। আল্লাহ হাফেজ।', 'Inshaallah, Ammu. Allah hafez.', 'God willing, Ammu. Goodbye.'),
        L('t', 'রাফি, তুমি কি আমার সাথে খেলবে?', 'Rafi, tumi ki amar shathe khelbe?', 'Rafi, will you play with me?'),
        L('fr', 'হ্যাঁ, চলো ফুটবল খেলি!', 'Hyã, cholo football kheli!', "Yes, let's play football!"),
        L('t', 'আমার পালা শেষ। এবার তোমার পালা।', 'Amar pala shesh. Ebar tomar pala.', 'My turn is over. Now it is your turn.'),
      ],
    },
    {
      key: 'nana', title: 'Calling Nana', emoji: '📞',
      lines: [
        L('t', 'আসসালামু আলাইকুম, নানা। আপনি কেমন আছেন?', 'Assalamu alaikum, Nana. Apni kemon achen?', 'Peace be upon you, Nana. How are you?'),
        L('nana', 'ওয়ালাইকুম আসসালাম, আমার সোনা। আলহামদুলিল্লাহ, ভালো আছি। তুমি কেমন আছো?', 'Walaikum assalam, amar shona. Alhamdulillah, bhalo achi. Tumi kemon acho?', 'And peace be upon you, my dear. Alhamdulillah, I am well. How are you?'),
        L('t', 'আমিও ভালো আছি, নানা। আপনি কি আমাদের বাড়িতে আসবেন?', 'Amio bhalo achi, Nana. Apni ki amader barite asben?', 'I am well too, Nana. Will you come to our house?'),
        L('nana', 'ইনশাআল্লাহ, আগামী শুক্রবার আসব।', 'Inshaallah, agami shukrobar ashbo.', "God willing, I'll come next Friday."),
        L('t', 'আমি আপনার জন্য অপেক্ষা করব। আপনার জন্য একটা ছবি এঁকেছি।', 'Ami apnar jonno opekkha korbo. Apnar jonno ekta chobi enkechi.', "I'll wait for you. I drew a picture for you."),
        L('nana', 'বাহ, মাশাআল্লাহ! ঠিকমতো পড়াশোনা করছো তো?', 'Bah, mashaallah! Thikmoto porashona korcho to?', "Wow, mashaAllah! You're studying properly, aren't you?"),
        L('t', 'জি, নানা। আমার জন্য দোয়া করবেন।', 'Ji, Nana. Amar jonno doa korben.', 'Yes, Nana. Please pray for me.'),
        L('nana', 'সবসময় দোয়া করি। আল্লাহ হাফেজ।', 'Shobshomoy doa kori. Allah hafez.', 'I always pray for you. Goodbye.'),
      ],
    },
    {
      key: 'dada', title: "Dada's Story", emoji: '📖',
      lines: [
        L('dada', 'তারা, এদিকে এসো। আজ তোমাকে একটা গল্প শোনাব।', 'Tara, edike esho. Aj tomake ekta golpo shonabo.', "Tara, come here. Today I'll tell you a story."),
        L('t', 'দাদা, কিসের গল্প?', 'Dada, kiser golpo?', 'Dada, what kind of story?'),
        L('dada', 'এক রাজার গল্প। এক ছিল রাজা, তার ছিল এক সুন্দর বাগান।', 'Ek rajar golpo. Ek chilo raja, tar chilo ek shundor bagan.', 'A story about a king. Once there was a king, and he had a beautiful garden.'),
        L('t', 'দাদা, বাগানে কী কী ছিল?', 'Dada, bagane ki ki chilo?', 'Dada, what was in the garden?'),
        L('dada', 'অনেক ফুল আর ফলের গাছ ছিল।', 'Onek phul ar pholer gach chilo.', 'There were lots of flowers and fruit trees.'),
        L('t', 'আমি বড় হয়ে আপনাকে গল্প পড়ে শোনাব।', 'Ami boro hoye apnake golpo pore shonabo.', "When I grow up, I'll read stories to you."),
        L('dada', 'আলহামদুলিল্লাহ! তুমি এখন থেকেই বেশি করে বই পড়ো।', 'Alhamdulillah! Tumi ekhon thekei beshi kore boi poro.', 'Alhamdulillah! Start reading lots of books from now.'),
        L('t', 'জি, দাদা। ইনশাআল্লাহ।', 'Ji, Dada. Inshaallah.', 'Yes, Dada. God willing.'),
      ],
    },
    {
      key: 'nani', title: "In Nani's Kitchen", emoji: '🍮',
      lines: [
        L('t', 'নানি, আসসালামু আলাইকুম। খুব সুন্দর গন্ধ আসছে!', 'Nani, assalamu alaikum. Khub shundor gondho ashche!', 'Nani, peace be upon you. What a lovely smell!'),
        L('nani', 'ওয়ালাইকুম আসসালাম। আমি পায়েস রান্না করেছি।', 'Walaikum assalam. Ami payesh ranna korechi.', "And peace be upon you. I've cooked payesh (rice pudding)."),
        L('t', 'নানি, আপনি কি আমাকে একটু পায়েস দেবেন?', 'Nani, apni ki amake ektu payesh deben?', 'Nani, will you give me a little payesh?'),
        L('nani', 'অবশ্যই, আমার সোনা। বসো, বাটিতে দিচ্ছি।', 'Obosshoi, amar shona. Boso, batite dichchi.', "Of course, my dear. Sit down, I'm putting it in a bowl."),
        L('t', 'বিসমিল্লাহ। খুব মিষ্টি হয়েছে! ধন্যবাদ, নানি।', 'Bismillah. Khub mishti hoyeche! Dhonnobad, Nani.', 'Bismillah. It is so sweet! Thank you, Nani.'),
        L('nani', 'তোমার ভালো লেগেছে জেনে খুশি হলাম। আরেকটু নেবে?', 'Tomar bhalo legeche jene khushi holam. Arekto nebe?', "I'm happy you liked it. Will you take a little more?"),
        L('t', 'জি না, নানি। আমার পেট ভরে গেছে। আলহামদুলিল্লাহ।', 'Ji na, Nani. Amar pet bhore geche. Alhamdulillah.', 'No thank you, Nani. My tummy is full. Alhamdulillah.'),
      ],
    },
    {
      key: 'masjid', title: 'Going to the Masjid', emoji: '🕌',
      lines: [
        L('ab', 'তারা, জুমার নামাজের সময় হয়েছে। অজু করে নাও।', 'Tara, jumar namajer shomoy hoyeche. Oju kore nao.', "Tara, it's time for Jummah prayer. Do your wudu."),
        L('t', 'জি, আব্বু। আমি অজু করে এসেছি।', 'Ji, Abbu. Ami oju kore eshechi.', 'Yes, Abbu. I have done my wudu.'),
        L('ab', 'টুপি পরেছো? চলো, দাদাকেও ডাকি।', 'Tupi poreccho? Cholo, dadakeo daki.', "Did you put on your cap? Come, let's call Dada too."),
        L('t', 'দাদা, আপনি কি তৈরি? আমরা মসজিদে যাচ্ছি।', 'Dada, apni ki toiri? Amra moshjide jachchi.', "Dada, are you ready? We're going to the masjid."),
        L('dada', 'হ্যাঁ, আমার সোনা। চলো একসাথে যাই।', 'Hyã, amar shona. Cholo eksathe jai.', "Yes, my dear. Let's go together."),
        L('ab', 'মসজিদে গিয়ে আস্তে কথা বলবে।', 'Moshjide giye aste kotha bolbe.', 'In the masjid, speak softly.'),
        L('t', 'জি, আব্বু। আমি দাদার পাশে দাঁড়াব।', 'Ji, Abbu. Ami dadar pashe darabo.', "Yes, Abbu. I'll stand next to Dada."),
        L('dada', 'আল্লাহ আমাদের নামাজ কবুল করুন।', 'Allah amader namaj kobul korun.', 'May Allah accept our prayer.'),
      ],
    },
    {
      key: 'eid', title: 'Eid Morning', emoji: '🌙',
      lines: [
        L('t', 'ঈদ মোবারক, আব্বু!', 'Eid mubarak, Abbu!', 'Eid Mubarak, Abbu!'),
        L('ab', 'ঈদ মোবারক, তারা! চলো, ঈদগাহে যাই।', 'Eid mubarak, Tara! Cholo, eidgahe jai.', "Eid Mubarak, Tara! Come, let's go to the Eidgah."),
        L('t', 'আগে আমি দাদাকে সালাম করব।', 'Age ami dadake salam korbo.', "First I'll greet Dada."),
        L('dada', 'ওয়ালাইকুম আসসালাম। ঈদ মোবারক! এই নাও তোমার ঈদের সালামি।', 'Walaikum assalam. Eid mubarak! Ei nao tomar eider salami.', "And peace be upon you. Eid Mubarak! Here's your Eid gift."),
        L('t', 'ধন্যবাদ, দাদা। আল্লাহ আপনাকে ভালো রাখুন।', 'Dhonnobad, Dada. Allah apnake bhalo rakhun.', 'Thank you, Dada. May Allah keep you well.'),
        L('dada', 'আমিন। তোমাকেও ভালো রাখুন।', 'Amin. Tomakeo bhalo rakhun.', 'Ameen. May He keep you well too.'),
      ],
    },
    {
      key: 'unwell', title: 'Feeling Unwell', emoji: '🤒',
      lines: [
        L('t', 'আম্মু, আমার মাথা ব্যথা করছে।', 'Ammu, amar matha byatha korche.', 'Ammu, I have a headache.'),
        L('am', 'কখন থেকে? তোমার জ্বর আছে কি?', 'Kokhon theke? Tomar jor ache ki?', 'Since when? Do you have a fever?'),
        L('t', 'জানি না, আম্মু। আমার শরীর গরম লাগছে।', 'Jani na, Ammu. Amar shorir gorom lagche.', "I don't know, Ammu. My body feels hot."),
        L('am', 'এসো, দেখি। তুমি একটু বিশ্রাম নাও।', 'Esho, dekhi. Tumi ekto bishram nao.', 'Come, let me see. Have a little rest.'),
        L('t', 'ধন্যবাদ, আম্মু। আপনি আমার খুব যত্ন নেন।', 'Dhonnobad, Ammu. Apni amar khub joto nen.', 'Thank you, Ammu. You take such good care of me.'),
        L('am', 'আল্লাহ তোমাকে সুস্থ করে দিন।', 'Allah tomake shustho kore din.', 'May Allah make you well.'),
      ],
    },
    {
      key: 'bed', title: 'Bedtime', emoji: '🌙',
      lines: [
        L('am', 'তারা, রাত হয়েছে। এবার ঘুমানোর সময়।', 'Tara, rat hoyeche. Ebar ghumanor shomoy.', "Tara, it's night. Time to sleep now."),
        L('t', 'আম্মু, আরেকটু গল্প শুনতে পারি?', 'Ammu, arekto golpo shunte pari?', 'Ammu, may I hear a little more of the story?'),
        L('am', 'আজ আর না। কাল শোনাব। দাঁত ব্রাশ করেছো?', 'Aj ar na. Kal shonabo. Dãt brash korecho?', "Not today. I'll tell you tomorrow. Did you brush your teeth?"),
        L('t', 'জি, করেছি।', 'Ji, korechi.', 'Yes, I did.'),
        L('am', 'তাহলে শুয়ে পড়ো। শুভ রাত্রি।', 'Tahole shuye poro. Shubho ratri.', 'Then lie down. Good night.'),
        L('t', 'শুভ রাত্রি, আম্মু। আপনিও ভালো করে ঘুমান।', 'Shubho ratri, Ammu. Apnio bhalo kore ghuman.', 'Good night, Ammu. You sleep well too.'),
      ],
    },
  ],
}

// All scenes per track: the originals above plus the 45 in family2.js.
const fromMore = (track) => moreScenes.map((m) => ({ key: m.key, title: m.title, emoji: m.emoji, lines: m[track] }))
export const scenes = {
  young: [...baseScenes.young, ...fromMore('young')],
  older: [...baseScenes.older, ...fromMore('older')],
}

// The Family conversations are split into themed units (all titled "Family: …").
// `scenes` lists scene keys in teaching order; the first unit also holds the phrases and আপনি/তুমি lessons.
export const unitLayout = {
  young: [
    { key: 'morning', title: 'Family: Mornings', emoji: '⏰', blurb: 'Waking up, getting ready, off to school', scenes: ['wake', 'bath', 'winter', 'ready', 'tiffin', 'late', 'school', 'tidy'] },
    { key: 'school', title: 'Family: School Days', emoji: '🎒', blurb: 'Coming home, exams, friends, sports', scenes: ['home', 'report', 'exam', 'friend', 'sports', 'library'] },
    { key: 'food', title: 'Family: Food & Kitchen', emoji: '🍚', blurb: 'Meals, cooking, the market, treats', scenes: ['eat', 'cook', 'table', 'bazar', 'ilish', 'pitha', 'mango', 'birthday', 'khichuri'] },
    { key: 'prayer', title: 'Family: Prayer & Ramadan', emoji: '🕌', blurb: 'The masjid, salah, dua, Ramadan, Eid', scenes: ['masjid', 'fajr', 'jummah', 'maghrib', 'quran', 'dua', 'charity', 'suhoor', 'iftar', 'eidshop'] },
    { key: 'elders', title: 'Family: Nana, Dada & Nani', emoji: '👴', blurb: 'Stories, help and love with grandparents', scenes: ['nana', 'dada', 'glasses', 'road', 'videocall', 'village', 'sleepover'] },
    { key: 'play', title: 'Family: Play & Outings', emoji: '⚽', blurb: 'Kites, rain, cricket, fairs and boats', scenes: ['play', 'kite', 'rain', 'cricket', 'park', 'mela', 'boat', 'cat', 'powercut'] },
    { key: 'care', title: 'Family: Care & Manners', emoji: '🤝', blurb: 'Please, sorry, honesty, health and bedtime', scenes: ['please', 'sorry', 'honesty', 'doctor', 'finger', 'screentime', 'surprise', 'bed'] },
  ],
  older: [
    { key: 'morning', title: 'Family: Mornings', emoji: '⏰', blurb: 'Waking up, getting ready, off to school', scenes: ['wake', 'bath', 'winter', 'ready', 'tiffin', 'late', 'school', 'tidy'] },
    { key: 'school', title: 'Family: School Days', emoji: '🎒', blurb: 'Coming home, homework, exams, friends, sports', scenes: ['home', 'homework', 'report', 'exam', 'friend', 'sports', 'library'] },
    { key: 'food', title: 'Family: Food & Kitchen', emoji: '🍚', blurb: 'Meals, cooking, the market, treats', scenes: ['meal', 'cook', 'table', 'bazar', 'ilish', 'pitha', 'nani', 'mango', 'birthday', 'khichuri'] },
    { key: 'prayer', title: 'Family: Prayer & Ramadan', emoji: '🕌', blurb: 'The masjid, salah, dua, Ramadan, Eid', scenes: ['masjid', 'fajr', 'jummah', 'maghrib', 'quran', 'dua', 'charity', 'suhoor', 'iftar', 'eidshop', 'eid'] },
    { key: 'elders', title: 'Family: Nana, Dada & Nani', emoji: '👴', blurb: 'Stories, help and love with grandparents', scenes: ['nana', 'dada', 'glasses', 'road', 'videocall', 'village', 'sleepover'] },
    { key: 'play', title: 'Family: Play & Outings', emoji: '⚽', blurb: 'Kites, rain, cricket, fairs and boats', scenes: ['play', 'kite', 'rain', 'cricket', 'park', 'mela', 'boat', 'cat', 'powercut'] },
    { key: 'care', title: 'Family: Care & Manners', emoji: '🤝', blurb: 'Guests, sorry, honesty, health and bedtime', scenes: ['guest', 'sorry', 'rules', 'honesty', 'doctor', 'finger', 'unwell', 'screentime', 'surprise', 'bed'] },
  ],
}
