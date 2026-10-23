// Sentences: { bn, roman, en }. Bangladeshi standard Bangla.
const S = (bn, roman, en) => ({ bn, roman, en })

export const sentenceGroups = [
  {
    key: 'introduce',
    title: 'Introduce Yourself',
    emoji: '🙋',
    sentences: [
      S('আমার নাম তারা।', 'amar naam Tara.', 'My name is Tara.'),
      S('তোমার নাম কী?', 'tomar naam ki?', 'What is your name?'),
      S('আমি ভালো আছি।', 'ami bhalo achi.', 'I am well.'),
      S('তুমি কেমন আছো?', 'tumi kemon acho?', 'How are you?'),
      S('আপনি কেমন আছেন?', 'apni kemon achen?', 'How are you? (respectful)'),
      S('তোমার বয়স কত?', 'tomar boyosh koto?', 'How old are you?'),
      S('আমার বয়স দশ বছর।', 'amar boyosh dosh bochhor.', 'I am ten years old.'),
      S('তুমি কোথায় থাকো?', 'tumi kothay thako?', 'Where do you live?'),
      S('আমি ঢাকায় থাকি।', 'ami dhakay thaki.', 'I live in Dhaka.'),
    ],
  },
  {
    key: 'things',
    title: 'This and That',
    emoji: '👉',
    sentences: [
      S('এটা কী?', 'eta ki?', 'What is this?'),
      S('এটা একটা বই।', 'eta ekta boi.', 'This is a book.'),
      S('ওটা একটা গাছ।', 'ota ekta gach.', 'That is a tree.'),
      S('এটা আমার বই।', 'eta amar boi.', 'This is my book.'),
      S('ওটা তোমার ব্যাগ।', 'ota tomar byag.', 'That is your bag.'),
      S('ইনি আমার মা।', 'ini amar ma.', 'This is my mother.'),
      S('ইনি আমার বাবা।', 'ini amar baba.', 'This is my father.'),
      S('ও আমার ভাই।', 'o amar bhai.', 'He is my brother.'),
      S('ও আমার বোন।', 'o amar bon.', 'She is my sister.'),
    ],
  },
  {
    key: 'daily',
    title: 'Every Day',
    emoji: '☀️',
    sentences: [
      S('আমি স্কুলে যাই।', 'ami skule jai.', 'I go to school.'),
      S('আমি ভাত খাই।', 'ami bhat khai.', 'I eat rice.'),
      S('আমি বই পড়ি।', 'ami boi pori.', 'I read a book.'),
      S('আমি পানি খাই।', 'ami pani khai.', 'I drink water.'),
      S('আমি খেলতে ভালোবাসি।', 'ami khelte bhalobashi.', 'I love to play.'),
      S('আমার ক্ষুধা পেয়েছে।', 'amar khida peyeche.', 'I am hungry.'),
      S('আমার পিপাসা পেয়েছে।', 'amar pipasha peyeche.', 'I am thirsty.'),
      S('আমার ঘুম পেয়েছে।', 'amar ghum peyeche.', 'I am sleepy.'),
      S('আমাকে একটু পানি দাও।', 'amake ektu pani dao.', 'Give me a little water.'),
    ],
  },
  {
    key: 'describe',
    title: 'Describe the World',
    emoji: '🌍',
    sentences: [
      S('আকাশ নীল।', 'akash nil.', 'The sky is blue.'),
      S('পাতা সবুজ।', 'pata shobuj.', 'The leaf is green.'),
      S('হাতি বড়।', 'hati boro.', 'The elephant is big.'),
      S('ইঁদুর ছোট।', 'indur chhoto.', 'The mouse is small.'),
      S('চা গরম।', 'cha gorom.', 'The tea is hot.'),
      S('আকাশে চাঁদ আছে।', 'akashe chãd ache.', 'There is a moon in the sky.'),
      S('নদীতে মাছ আছে।', 'nodite mach ache.', 'There are fish in the river.'),
      S('গাছে পাখি আছে।', 'gache pakhi ache.', 'There is a bird in the tree.'),
      S('আজ শনিবার।', 'aj shonibar.', 'Today is Saturday.'),
      S('আজ আমার জন্মদিন।', 'aj amar jonmodin.', 'Today is my birthday.'),
    ],
  },
]

// Present-tense patterns. forms = [আমি form, তুমি form, সে form]
const V = (key, inf, infRoman, en, forms, romans, enForms) => ({ key, inf, infRoman, en, forms, romans, enForms })

export const verbs = [
  V('khawa', 'খাওয়া', 'khawa', 'eat', ['খাই', 'খাও', 'খায়'], ['khai', 'khao', 'khay'], ['eat', 'eat', 'eats']),
  V('jawa', 'যাওয়া', 'jawa', 'go', ['যাই', 'যাও', 'যায়'], ['jai', 'jao', 'jay'], ['go', 'go', 'goes']),
  V('kora', 'করা', 'kora', 'do', ['করি', 'করো', 'করে'], ['kori', 'koro', 'kore'], ['do', 'do', 'does']),
  V('pora', 'পড়া', 'pora', 'read', ['পড়ি', 'পড়ো', 'পড়ে'], ['pori', 'poro', 'pore'], ['read', 'read', 'reads']),
  V('lekha', 'লেখা', 'lekha', 'write', ['লিখি', 'লেখো', 'লেখে'], ['likhi', 'lekho', 'lekhe'], ['write', 'write', 'writes']),
  V('dekha', 'দেখা', 'dekha', 'see', ['দেখি', 'দেখো', 'দেখে'], ['dekhi', 'dekho', 'dekhe'], ['see', 'see', 'sees']),
  V('asha', 'আসা', 'asha', 'come', ['আসি', 'আসো', 'আসে'], ['ashi', 'asho', 'ashe'], ['come', 'come', 'comes']),
  V('khela', 'খেলা', 'khela', 'play', ['খেলি', 'খেলো', 'খেলে'], ['kheli', 'khelo', 'khele'], ['play', 'play', 'plays']),
]

export const pronounForms = [
  { bn: 'আমি', roman: 'ami', en: 'I' },
  { bn: 'তুমি', roman: 'tumi', en: 'You' },
  { bn: 'সে', roman: 'she', en: 'He/She' },
]
