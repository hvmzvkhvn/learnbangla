// The 18+ track ("Wayfarers"): adult vocabulary, sentences and readings. Bangladeshi Bangla, starting from zero.
//
// Readings lead with an English paragraph (`lead`) so history, politics and culture can be understood properly
// while the Bangla stays short and learnable; the Bangla lines carry the facts in simple sentences.
// Facts are kept to what is well established; contested subjects are described neutrally.
// Poems and anything by writers still in copyright are not quoted.
const W = (bn, roman, en, emoji) => ({ bn, roman, en, emoji })
const S = (bn, roman, en) => ({ bn, roman, en })
const L = (bn, roman, en) => ({ bn, roman, en })

export const adultWordCategories = [
  {
    key: 'inlaws', title: 'In-laws & Extended Family', emoji: '👨‍👩‍👧‍👦',
    note: 'Family is wide in Bangladesh and every relation has its own word. Use আপনি for all of these elders.',
    words: [
      W('শ্বশুর', 'shoshur', 'father-in-law', '👴'), W('শাশুড়ি', 'shashuri', 'mother-in-law', '👵'), W('জামাই', 'jamai', 'son-in-law', '🧑'),
      W('বউমা', 'bouma', 'daughter-in-law', '👰'), W('ভাবি', 'bhabi', "brother's wife (also a polite way to address a friend's wife)", '👩'), W('দুলাভাই', 'dulabhai', "sister's husband", '🧔'),
      W('ননদ', 'nonod', "husband's sister", '👩'), W('দেবর', 'debor', "husband's younger brother", '🧑'), W('ভাসুর', 'bhashur', "husband's elder brother", '👨'),
      W('ফুফু', 'fufu', "father's sister", '👩'), W('মামি', 'mami', "mother's brother's wife", '👩'), W('খালু', 'khalu', "mother's sister's husband", '👨'),
    ],
  },
  {
    key: 'work', title: 'Work & Office', emoji: '💼', note: 'Offices run on polite language: use আপনি with colleagues you do not know well and with every senior.',
    words: [
      W('অফিস', 'ofis', 'office', '🏢'), W('চাকরি', 'chakri', 'job', '💼'), W('কাজ', 'kaj', 'work', '🛠️'), W('বেতন', 'beton', 'salary', '💵'),
      W('সহকর্মী', 'shohokormi', 'colleague', '🧑‍💼'), W('সভা', 'shobha', 'meeting', '🗓️'), W('ইমেইল', 'imeil', 'email', '📧'), W('ছুটি', 'chhuti', 'leave, holiday', '🏖️'),
      W('ব্যবসা', 'bebsha', 'business', '🏪'), W('কোম্পানি', 'kompani', 'company', '🏭'), W('সাক্ষাৎকার', 'shakkhatkar', 'interview', '🤝'), W('আবেদন', 'abedon', 'application', '📝'),
    ],
  },
  {
    key: 'bank', title: 'Bank, Forms & Documents', emoji: '🏦', note: 'Paperwork has its own vocabulary. Learn these before your first visit to a bank or an office.',
    words: [
      W('ব্যাংক', 'byank', 'bank', '🏦'), W('হিসাব', 'hishab', 'account; calculation', '🧾'), W('ফর্ম', 'form', 'form', '📄'), W('স্বাক্ষর', 'shakkhor', 'signature', '✍️'),
      W('পাসপোর্ট', 'passport', 'passport', '🛂'), W('ভিসা', 'bhisha', 'visa', '🛃'), W('কাগজ', 'kagoj', 'paper, document', '📃'), W('ঠিকানা', 'thikana', 'address', '📍'),
      W('পরিচয়পত্র', 'porichoypotro', 'ID card', '🪪'), W('ফি', 'fi', 'fee', '💳'), W('ঋণ', 'rin', 'loan, debt', '🏷️'), W('সুদ', 'shud', 'interest', '📈'),
    ],
  },
  {
    key: 'health', title: 'Health & the Doctor', emoji: '🩺', note: 'Useful the moment you feel unwell: say what hurts, and understand the doctor\'s answer.',
    words: [
      W('ডাক্তার', 'daktar', 'doctor', '🩺'), W('ওষুধ', 'oshudh', 'medicine', '💊'), W('জ্বর', 'jor', 'fever', '🌡️'), W('ব্যথা', 'betha', 'pain', '😣'),
      W('হাসপাতাল', 'hashpatal', 'hospital', '🏥'), W('ফার্মেসি', 'pharmeshi', 'pharmacy', '💊'), W('সর্দি', 'shordi', 'cold', '🤧'), W('কাশি', 'kashi', 'cough', '😷'),
      W('রক্ত', 'rokto', 'blood', '🩸'), W('অসুস্থ', 'oshustho', 'unwell', '🤒'), W('সুস্থ', 'shustho', 'well, healthy', '🙂'), W('ইনজেকশন', 'injekshon', 'injection', '💉'),
    ],
  },
  {
    key: 'politics', title: 'Government & Politics', emoji: '🏛️', note: 'The words you meet in a newspaper or on the news.',
    words: [
      W('সরকার', 'shorkar', 'government', '🏛️'), W('নির্বাচন', 'nirbachon', 'election', '🗳️'), W('ভোট', 'bhot', 'vote', '🗳️'), W('দল', 'dol', 'party; team; group', '👥'),
      W('সংসদ', 'shongshod', 'parliament', '🏛️'), W('আইন', 'ain', 'law', '⚖️'), W('প্রধানমন্ত্রী', 'prodhanmontri', 'prime minister', '🧑‍💼'), W('সংবিধান', 'shongbidhan', 'constitution', '📜'),
      W('গণতন্ত্র', 'gonotontro', 'democracy', '🗳️'), W('অধিকার', 'odhikar', 'right', '✊'), W('আদালত', 'adalot', 'court', '⚖️'), W('নাগরিক', 'nagorik', 'citizen', '🪪'),
    ],
  },
  {
    key: 'economy', title: 'Economy & Development', emoji: '📈', note: 'How people talk about work, trade and prices.',
    words: [
      W('অর্থনীতি', 'orthoniti', 'economy', '📈'), W('রপ্তানি', 'roptani', 'export', '🚢'), W('আমদানি', 'amdani', 'import', '📦'), W('প্রবাসী', 'probashi', 'a person living abroad (an expatriate)', '✈️'),
      W('দাম', 'dam', 'price', '🏷️'), W('কৃষি', 'krishi', 'agriculture', '🌾'), W('শিল্প', 'shilpo', 'industry; art', '🏭'), W('উন্নয়ন', 'unnoyon', 'development', '🏗️'),
      W('দারিদ্র্য', 'daridro', 'poverty', '🪙'), W('মজুরি', 'mojuri', 'wages', '💵'), W('পণ্য', 'ponno', 'goods, products', '📦'), W('সঞ্চয়', 'shonchoy', 'savings', '🐖'),
    ],
  },
  {
    key: 'culture2', title: 'Faith, Clothes & Music', emoji: '🎶', note: 'Words for festivals, what people wear, and the sounds of Bengal.',
    words: [
      W('ধর্ম', 'dhormo', 'religion', '🕊️'), W('গির্জা', 'girja', 'church', '⛪'), W('ঈদ', 'id', 'Eid', '🌙'), W('পূজা', 'puja', 'Hindu worship; festival', '🪔'),
      W('পাঞ্জাবি', 'panjabi', 'long kurta (men)', '👘'), W('লুঙ্গি', 'lungi', 'lungi (wrap-around)', '🩳'), W('গামছা', 'gamchha', 'thin cotton towel', '🧣'), W('নকশিকাঁথা', 'nokshikatha', 'embroidered quilt', '🧵'),
      W('বাঁশি', 'banshi', 'bamboo flute', '🪈'), W('ঢোল', 'dhol', 'drum', '🥁'), W('উৎসব', 'utshob', 'festival', '🎉'), W('সংস্কৃতি', 'shonskriti', 'culture', '🎭'),
    ],
  },
  {
    key: 'twobengals', title: 'Same Language, Different Words', emoji: '🔁',
    note: 'Bangladesh and West Bengal share one language, with a few everyday words that differ. Learn both and you will be understood in Dhaka and Kolkata.',
    words: [
      W('পানি', 'pani', 'water (the Bangladeshi word; West Bengal says জল)', '💧'), W('জল', 'jol', 'water (the West Bengal word; Bangladesh says পানি)', '💧'),
      W('গোসল', 'goshol', 'a bath (Bangladeshi; West Bengal: স্নান)', '🛁'), W('স্নান', 'shnan', 'a bath (West Bengal; also formal Bangladeshi)', '🛁'),
      W('লবণ', 'lobon', 'salt (Bangladeshi; West Bengal: নুন)', '🧂'), W('নুন', 'nun', 'salt (West Bengal; also used in Bangladeshi villages)', '🧂'),
      W('খালা', 'khala', "mother's sister (Bangladeshi; West Bengal: মাসি)", '👩'), W('মাসি', 'mashi', "mother's sister (West Bengal)", '👩'),
      W('চাচা', 'chacha', "father's brother (Bangladeshi; West Bengal: কাকা)", '👨'), W('কাকা', 'kaka', "father's brother (West Bengal)", '👨'),
      W('নাস্তা', 'nasta', 'breakfast, a snack (Bangladeshi; West Bengal: জলখাবার)', '🍳'), W('জলখাবার', 'jolkhabar', 'breakfast, a snack (West Bengal)', '🍳'),
    ],
  },
]

export const adultSentenceGroups = [
  {
    key: 'awork', title: 'At Work', emoji: '💼',
    sentences: [
      S('আমি অফিসে কাজ করি।', 'ami ofise kaj kori.', 'I work in an office.'),
      S('আজ আমার একটা সভা আছে।', 'aj amar ekta shobha ache.', 'I have a meeting today.'),
      S('আপনার সাক্ষাৎকার কখন?', 'apnar shakkhatkar kokhon?', 'When is your interview?'),
      S('আমি একটা চাকরি খুঁজছি।', 'ami ekta chakri khujchhi.', 'I am looking for a job.'),
      S('আমি আগামীকাল ছুটিতে থাকব।', 'ami agamikal chhutite thakbo.', 'I will be on leave tomorrow.'),
      S('দয়া করে আমাকে ইমেইল করুন।', 'doya kore amake imeil korun.', 'Please email me.'),
    ],
  },
  {
    key: 'abank', title: 'Bank & Forms', emoji: '🏦',
    sentences: [
      S('আমি একটা ব্যাংক হিসাব খুলতে চাই।', 'ami ekta byank hishab khulte chai.', 'I want to open a bank account.'),
      S('এই ফর্মটা কীভাবে পূরণ করব?', 'ei formta kibhabe puron korbo?', 'How do I fill in this form?'),
      S('এখানে স্বাক্ষর করুন।', 'ekhane shakkhor korun.', 'Sign here.'),
      S('আপনার পাসপোর্ট কি সঙ্গে আছে?', 'apnar passport ki shonge ache?', 'Do you have your passport with you?'),
      S('ফি কত টাকা?', 'fi koto taka?', 'How much is the fee?'),
    ],
  },
  {
    key: 'ahealth', title: 'At the Doctor', emoji: '🩺',
    sentences: [
      S('আমার জ্বর হয়েছে।', 'amar jor hoyeche.', 'I have a fever.'),
      S('আমার মাথা ব্যথা করছে।', 'amar matha betha korchhe.', 'My head hurts.'),
      S('আমাকে একজন ডাক্তার দেখাতে হবে।', 'amake ekjon daktar dekhate hobe.', 'I need to see a doctor.'),
      S('এই ওষুধ দিনে দুইবার খাবেন।', 'ei oshudh dine duibar khaben.', 'Take this medicine twice a day.'),
      S('আপনি কি এখন একটু ভালো আছেন?', 'apni ki ekhon ektu bhalo achhen?', 'Are you a little better now?'),
    ],
  },
  {
    key: 'anews', title: 'News & Opinions', emoji: '📰',
    sentences: [
      S('দেশে নির্বাচন হচ্ছে।', 'deshe nirbachon hochchhe.', 'An election is being held in the country.'),
      S('প্রতিটি নাগরিকের ভোট দেওয়ার অধিকার আছে।', 'protiti nagoriker bhot deoar odhikar ache.', 'Every citizen has the right to vote.'),
      S('সংসদে নতুন আইন পাস হয়েছে।', 'shongshode notun ain pash hoyeche.', 'A new law has been passed in parliament.'),
      S('জিনিসের দাম বাড়ছে।', 'jinisher dam barchhe.', 'Prices are rising.'),
      S('আমি এই বিষয়ে একমত নই।', 'ami ei bishoye ekmoto noi.', 'I do not agree on this matter.'),
      S('আপনার মত কী?', 'apnar mot ki?', 'What is your opinion?'),
    ],
  },
]

// Readings. `lead` is shown in English first; the Bangla lines follow, then a few questions.
export const adultPassages = [
  {
    key: 'bengal1905', title: 'Bengal Divided, 1905', emoji: '✂️',
    lead: 'In 1905 the British rulers split Bengal into two provinces. The official reason was that Bengal was too large to govern well. Many people saw a political plan to weaken a growing nationalist movement, while others in the east welcomed a province with Dhaka as its capital. It was the first time Bengal was divided, and it shaped everything that followed.',
    lines: [
      L('১৯০৫ সালে ব্রিটিশ সরকার বাংলাকে দুই ভাগ করে।', 'unish sho pãch sale british shorkar banglake dui bhag kore.', 'In 1905 the British government divided Bengal in two.'),
      L('পূর্ব বাংলা আর আসাম নিয়ে নতুন প্রদেশ হয়।', 'purbo bangla ar asham niye notun prodesh hoy.', 'A new province was made from East Bengal and Assam.'),
      L('ঢাকা হয় সেই প্রদেশের রাজধানী।', 'dhaka hoy shei prodesher rajdhani.', 'Dhaka became the capital of that province.'),
      L('কেউ এটাকে স্বাগত জানায়, অনেকে প্রতিবাদ করে।', 'keu etake shagoto janay, onekey protibad kore.', 'Some welcomed it; many protested.'),
      L('কলকাতায় স্বদেশী আন্দোলন শুরু হয়।', 'kolkatay shodeshi andolon shuru hoy.', 'The Swadeshi movement began in Kolkata.'),
      L('মানুষ বিদেশি জিনিস বর্জন করে।', 'manush bideshi jinish borjon kore.', 'People boycotted foreign goods.'),
      L('১৯১১ সালে বাংলা আবার এক হয়।', 'unish sho egaro sale bangla abar ek hoy.', 'In 1911 Bengal was united again.'),
      L('কিন্তু এই বিভাজনের স্মৃতি মানুষ ভোলেনি।', 'kintu ei bibhajoner shmriti manush bholeni.', 'But people did not forget the memory of this division.'),
    ],
    questions: [
      { q: 'In which year was Bengal first divided?', options: ['1857', '1905', '1947'], answer: 1 },
      { q: 'What became the capital of the new province?', options: ['Kolkata', 'Dhaka', 'Chattogram'], answer: 1 },
      { q: 'What happened in 1911?', options: ['Bengal was united again', 'Bangladesh became independent', 'A new capital was built in Sylhet'], answer: 0 },
    ],
  },
  {
    key: 'partition1947', title: 'The Partition of 1947', emoji: '🗺️',
    lead: 'In 1947 British rule in India ended and the subcontinent was divided into two new countries, India and Pakistan, mainly along religious lines. Bengal was divided too: the Muslim-majority east became part of Pakistan and the west stayed in India. For some it was the fulfilment of a hope; for millions it meant leaving their homes and, often, never seeing relatives again. Sylhet decided its own future by a vote.',
    lines: [
      L('১৯৪৭ সালে ব্রিটিশ শাসনের অবসান হয়।', 'unish sho shat-chollish sale british shashoner oboshan hoy.', 'In 1947 British rule ended.'),
      L('ভারত ভাগ হয়ে দুটি দেশ হয়: ভারত আর পাকিস্তান।', 'bharot bhag hoye duti desh hoy: bharot ar pakistan.', 'India was divided into two countries: India and Pakistan.'),
      L('ধর্মের ভিত্তিতে এই ভাগ হয়েছিল।', 'dhormer bhittite ei bhag hoyechhilo.', 'The division was made mainly on the basis of religion.'),
      L('বাংলাও দুই ভাগ হয়: পূর্ব বাংলা আর পশ্চিমবঙ্গ।', 'bangla-o dui bhag hoy: purbo bangla ar poshchimbongo.', 'Bengal was also divided: East Bengal and West Bengal.'),
      L('পূর্ব বাংলা পাকিস্তানের অংশ হয়।', 'purbo bangla pakistaner ongsho hoy.', 'East Bengal became a part of Pakistan.'),
      L('পশ্চিমবঙ্গ ভারতে থাকে।', 'poshchimbongo bharote thake.', 'West Bengal stayed in India.'),
      L('সিলেটের মানুষ ভোট দিয়ে পূর্ব বাংলায় যোগ দেয়।', 'sileter manush bhot diye purbo banglay jog dey.', 'The people of Sylhet voted to join East Bengal.'),
      L('লক্ষ লক্ষ মানুষ নিজের বাড়ি ছেড়ে চলে যায়।', 'lokkho lokkho manush nijer bari chhere chole jay.', 'Millions of people left their homes.'),
      L('দুই দেশেই অনেক পরিবার আলাদা হয়ে যায়।', 'dui deshei onek poribar alada hoye jay.', 'In both countries many families were separated.'),
    ],
    questions: [
      { q: 'Which two countries were created in 1947?', options: ['India and Bangladesh', 'India and Pakistan', 'Pakistan and Nepal'], answer: 1 },
      { q: 'What were the two parts of divided Bengal called?', options: ['North and South Bengal', 'East Bengal and West Bengal', 'Assam and Bengal'], answer: 1 },
      { q: 'How did Sylhet decide which side to join?', options: ['By a vote', 'By a war', 'The British chose'], answer: 0 },
    ],
  },
  {
    key: 'roadto71', title: 'The Road to 1971', emoji: '🕊️',
    lead: 'For 24 years Bangladesh was East Pakistan, about 1,600 kilometres from the capital in the west. Disagreements over language, power and money grew until 1971. This is how a movement for a language became a movement for a country.',
    lines: [
      L('১৯৪৮ সালে বলা হয় উর্দু হবে পাকিস্তানের একমাত্র রাষ্ট্রভাষা।', 'unish sho atchollish sale bola hoy urdu hobe pakistaner ekmatro rashtrobhasha.', "In 1948 it was said that Urdu alone would be Pakistan's state language."),
      L('পূর্ব বাংলার মানুষ প্রতিবাদ করে।', 'purbo banglar manush protibad kore.', 'The people of East Bengal protested.'),
      L('১৯৫২ সালের একুশে ফেব্রুয়ারি অনেকে প্রাণ দেন।', 'unish sho bawanno saler ekushe february onekey pran den.', 'On 21 February 1952 many gave their lives.'),
      L('১৯৫৬ সালে বাংলা রাষ্ট্রভাষা হয়।', 'unish sho chhappanno sale bangla rashtrobhasha hoy.', 'In 1956 Bangla became a state language.'),
      L('১৯৬৬ সালে শেখ মুজিবুর রহমান ছয় দফা দাবি দেন।', 'unish sho chhoshotti sale shekh mujibur rahman choy dofa dabi den.', 'In 1966 Sheikh Mujibur Rahman put forward the six-point demand.'),
      L('১৯৭০ সালের নির্বাচনে আওয়ামী লীগ জয়ী হয়।', 'unish sho shottor saler nirbachone awami lig joyi hoy.', 'In the 1970 election the Awami League won.'),
      L('কিন্তু ক্ষমতা হস্তান্তর হয়নি।', 'kintu khomota hostantor hoyni.', 'But power was not handed over.'),
      L('১৯৭১ সালের ২৬শে মার্চ স্বাধীনতার ঘোষণা আসে।', 'unish sho ekattor saler chhabbishe march shadhinotar ghoshona ashe.', 'On 26 March 1971 the declaration of independence came.'),
      L('নয় মাস যুদ্ধ চলে।', 'noy mash juddho chole.', 'The war lasted nine months.'),
      L('১৬ই ডিসেম্বর বাংলাদেশ বিজয় লাভ করে।', 'sholoi december bangladesh bijoy labh kore.', 'On 16 December Bangladesh won victory.'),
    ],
    questions: [
      { q: 'What did people protest about in 1948–52?', options: ['The language', 'Taxes', 'A bridge'], answer: 0 },
      { q: 'How long did the war of 1971 last?', options: ['Nine months', 'Nine days', 'Nine years'], answer: 0 },
      { q: 'What is the date of Victory Day?', options: ['21 February', '26 March', '16 December'], answer: 2 },
    ],
  },
  {
    key: 'parties', title: 'How the Parties Grew', emoji: '🏛️',
    lead: "Bangladesh's main political parties have different roots: some began before 1947, some in the Pakistan years, and some after independence. Knowing where a party came from helps you understand the news. This reading lists key moments factually; people in Bangladesh hold strong and different views about politics, so it is worth learning the history from many sources.",
    lines: [
      L('আওয়ামী লীগ ১৯৪৯ সালে তৈরি হয়।', 'awami lig unish sho unponchash sale toiri hoy.', 'The Awami League was formed in 1949.'),
      L('স্বাধীনতার আন্দোলনে এই দল বড় ভূমিকা রাখে।', 'shadhinotar andolone ei dol boro bhumika rakhe.', 'This party played a big role in the independence movement.'),
      L('১৯৭৫ সালের পর দেশে সামরিক শাসন আসে।', 'unish sho ponchattor saler por deshe shamorik shashon ashe.', 'After 1975 military rule came to the country.'),
      L('১৯৭৮ সালে জিয়াউর রহমান বিএনপি গঠন করেন।', 'unish sho atattor sale ziaur rahman bi-en-pi gothon koren.', 'In 1978 Ziaur Rahman founded the BNP.'),
      L('১৯৮৬ সালে জাতীয় পার্টি তৈরি হয়।', 'unish sho chhiyashi sale jatiyo parti toiri hoy.', 'The Jatiya Party was formed in 1986.'),
      L('আরও অনেক দল আছে, যেমন জামায়াতে ইসলামী।', 'aro onek dol ache, jemon jamayate islami.', 'There are many more parties, such as Jamaat-e-Islami.'),
      L('১৯৯০ সালে গণআন্দোলনে সামরিক শাসনের অবসান হয়।', 'unish sho nobboi sale gonoandolone shamorik shashoner oboshan hoy.', 'In 1990 a mass movement ended military rule.'),
      L('১৯৯১ সাল থেকে দেশে আবার নির্বাচিত সরকার চলে।', 'unish sho ekanobboi shal theke deshe abar nirbachito shorkar chole.', 'From 1991 elected governments ruled again.'),
      L('২০২৪ সালে ছাত্র-জনতার আন্দোলনের পর সরকার বদলায়।', 'dui hajar chobbish sale chhatro-jonotar andoloner por shorkar bodlay.', 'In 2024, after a student-led mass movement, the government changed.'),
      L('রাজনীতি নিয়ে মানুষের মত আলাদা, তাই ইতিহাস মন দিয়ে জানা দরকার।', 'rajniti niye manusher mot alada, tai itihash mon diye jana dorkar.', 'People differ about politics, so it is important to learn history carefully.'),
    ],
    questions: [
      { q: 'Which party was formed in 1978?', options: ['The Awami League', 'The BNP', 'The Jatiya Party'], answer: 1 },
      { q: 'What ended military rule in 1990?', options: ['A mass movement', 'A flood', 'A new bridge'], answer: 0 },
      { q: 'In which year was the Awami League formed?', options: ['1949', '1971', '1986'], answer: 0 },
    ],
  },
  {
    key: 'economy', title: 'From Jute to Garments', emoji: '📈',
    lead: 'Bangladesh began in 1971 as one of the poorest countries in the world, with an economy damaged by war. Today it is one of the fastest-growing economies in Asia. The journey runs from jute fields to garment factories, and it was made by farmers, factory workers (most of them women), small borrowers and millions of migrant workers who send money home.',
    lines: [
      L('আগে পাট ছিল বাংলাদেশের প্রধান রপ্তানি।', 'age pat chhilo bangladesher prodhan roptani.', "In the past jute was Bangladesh's main export."),
      L('মানুষ পাটকে সোনালি আঁশ বলত।', 'manush patke shonali ãsh bolto.', 'People called jute the golden fibre.'),
      L('স্বাধীনতার পর দেশের অর্থনীতি খুব দুর্বল ছিল।', 'shadhinotar por desher orthoniti khub durbol chhilo.', 'After independence the economy was very weak.'),
      L('১৯৮০-র দশকে তৈরি পোশাকের কারখানা বাড়তে থাকে।', 'unish sho ashir doshoke toiri poshaker karkhana barte thake.', 'In the 1980s garment factories began to multiply.'),
      L('আজ লাখ লাখ নারী এসব কারখানায় কাজ করেন।', 'aj lakh lakh nari esob karkhanay kaj koren.', 'Today lakhs of women work in these factories.'),
      L('১৯৮৩ সালে গ্রামীণ ব্যাংক ছোট ঋণ দেওয়া শুরু করে।', 'unish sho teyashi sale gramin byank chhoto rin deoa shuru kore.', 'In 1983 Grameen Bank began giving small loans.'),
      L('বিদেশে কাজ করা মানুষ প্রতি বছর অনেক টাকা দেশে পাঠান।', 'bideshe kaj kora manush proti bochhor onek taka deshe pathan.', 'People working abroad send a lot of money home every year.'),
      L('কৃষি এখনও অনেক মানুষের জীবিকা।', 'krishi ekhono onek manusher jibika.', 'Agriculture is still the livelihood of many people.'),
      L('নতুন সেতু আর বন্দর অর্থনীতিকে এগিয়ে নিচ্ছে।', 'notun shetu ar bondor orthonitike egiye nichchhe.', 'New bridges and ports are moving the economy forward.'),
      L('তবে দাম বাড়া আর বেকারত্ব এখনও বড় সমস্যা।', 'tobe dam bara ar bekarotto ekhono boro shomoshsha.', 'But rising prices and unemployment are still big problems.'),
    ],
    questions: [
      { q: 'What was called the "golden fibre"?', options: ['Jute', 'Tea', 'Rice'], answer: 0 },
      { q: 'Which industry employs lakhs of women?', options: ['Garments', 'Shipping', 'Mining'], answer: 0 },
      { q: 'What did Grameen Bank begin giving in 1983?', options: ['Small loans', 'Free houses', 'Medicine'], answer: 0 },
    ],
  },
  {
    key: 'faith', title: 'Faith in Bangladesh', emoji: '🕌',
    lead: 'About nine in ten people in Bangladesh are Muslim, and around eight in a hundred are Hindu; there are also Buddhist and Christian communities and other peoples of the hills. Faiths have mixed in this delta for centuries: Buddhist and Hindu kings came first, Sufi saints and traders later brought Islam, and Baul singers still sing of a God beyond any single religion. Many festivals are shared by everyone.',
    lines: [
      L('বাংলাদেশের বেশির ভাগ মানুষ মুসলমান।', 'bangladesher beshir bhag manush musholman.', 'Most people in Bangladesh are Muslim.'),
      L('অনেক হিন্দু, বৌদ্ধ আর খ্রিস্টানও এখানে থাকেন।', 'onek hindu, boudhdho ar khristan-o ekhane thaken.', 'Many Hindus, Buddhists and Christians also live here.'),
      L('সুফি সাধকেরা কয়েকশো বছর আগে ইসলামের বাণী এনেছিলেন।', 'shufi shadhokera koyekosho bochhor age islamer bani enechhilen.', 'Sufi saints brought the message of Islam several hundred years ago.'),
      L('এর আগে এই অঞ্চলে বৌদ্ধ আর হিন্দু রাজারা ছিলেন।', 'er age ei onchole boudhdho ar hindu rajara chhilen.', 'Before that, Buddhist and Hindu kings ruled this region.'),
      L('বাউল আর ফকিরদের গানে সব ধর্মের কথা মিশে আছে।', 'baul ar fokirder gane shob dhormer kotha mishe ache.', 'In the songs of Bauls and fakirs the words of all faiths are mixed.'),
      L('ঈদ, দুর্গাপূজা, বুদ্ধ পূর্ণিমা আর বড়দিন অনেকে একসাথে উদযাপন করে।', 'id, durgapuja, buddho purnima ar borodin onekey ekshathe udjapon kore.', 'Many celebrate Eid, Durga Puja, Buddha Purnima and Christmas together.'),
      L('পহেলা বৈশাখ সব ধর্মের মানুষের উৎসব।', 'pohela boishakh shob dhormer manusher utshob.', 'Pohela Boishakh is a festival for people of every faith.'),
      L('সংবিধানে সব ধর্মের সমান অধিকারের কথা আছে।', 'shongbidhane shob dhormer shoman odhikarer kotha ache.', 'The constitution speaks of equal rights for all religions.'),
      L('ধর্ম মানুষের জীবন, পোশাক, খাবার আর গানে প্রভাব ফেলেছে।', 'dhormo manusher jibon, poshak, khabar ar gane probhab felechhe.', "Religion has influenced people's lives, clothes, food and songs."),
    ],
    questions: [
      { q: 'Who brought the message of Islam to Bengal, according to the reading?', options: ['Sufi saints and traders', 'British soldiers', 'Portuguese sailors'], answer: 0 },
      { q: 'Which festival belongs to people of every faith?', options: ['Pohela Boishakh', 'Only Eid', 'Only Durga Puja'], answer: 0 },
      { q: 'What do Baul songs mix together?', options: ['The words of many faiths', 'Only English words', 'Only prayers'], answer: 0 },
    ],
  },
  {
    key: 'artsculture', title: 'Clothes, Music & Poets', emoji: '🎶',
    lead: 'You can read a country in what people wear and sing. In Bangladesh a saree or a lungi, a flute in a boat song, a poem on 21 February — each tells a story. This reading is a short tour of everyday Bengali culture, from a quilt stitched by hand to the poet who won the Nobel Prize in 1913.',
    lines: [
      L('নারীরা শাড়ি আর সালোয়ার-কামিজ পরেন।', 'narira shari ar shalowar-kamij poren.', 'Women wear sarees and shalwar-kameez.'),
      L('পুরুষেরা পাঞ্জাবি, শার্ট আর লুঙ্গি পরেন।', 'purushera panjabi, shart ar lungi poren.', 'Men wear panjabi, shirts and lungi.'),
      L('গামছা গ্রামের মানুষের খুব দরকারি জিনিস।', 'gamchha gramer manusher khub dorkari jinish.', 'The gamchha is a very useful thing for village people.'),
      L('নকশিকাঁথা পুরোনো কাপড়ে সুই-সুতায় সেলাই করা শিল্প।', 'nokshikatha purono kapore shui-shutay shelai kora shilpo.', 'Nakshi kantha is an art of stitching old cloth with needle and thread.'),
      L('রবীন্দ্রসংগীত আর নজরুলগীতি এই দেশের খুব প্রিয় গান।', 'robindroshongit ar nojrulgiti ei desher khub priyo gan.', 'Rabindra Sangeet and Nazrul Geeti are much-loved songs of this country.'),
      L('ভাটিয়ালি গান মাঝিরা নদীতে গায়।', 'bhatiyali gan majhira nodite gay.', 'Boatmen sing Bhatiyali songs on the river.'),
      L('ভাওয়াইয়া উত্তরবঙ্গের লোকগান।', 'bhaoaiya uttorbonger lokgan.', 'Bhawaiya is a folk song of the north.'),
      L('১৯১৩ সালে রবীন্দ্রনাথ ঠাকুর নোবেল পুরস্কার পান।', 'unish sho tero sale robindronath thakur nobel puroshkar pan.', 'In 1913 Rabindranath Tagore received the Nobel Prize.'),
      L('কাজী নজরুল ইসলাম আমাদের জাতীয় কবি।', 'kazi nojrul islam amader jatiyo kobi.', 'Kazi Nazrul Islam is our national poet.'),
      L('জীবনানন্দ দাশ আর শামসুর রাহমানও বিখ্যাত কবি।', 'jibonanondo dash ar shamsur rahman-o bikkhato kobi.', 'Jibanananda Das and Shamsur Rahman are also famous poets.'),
    ],
    questions: [
      { q: 'Who received the Nobel Prize in 1913?', options: ['Rabindranath Tagore', 'Kazi Nazrul Islam', 'Lalon'], answer: 0 },
      { q: 'Who is called the national poet of Bangladesh?', options: ['Kazi Nazrul Islam', 'Michael Madhusudan Dutt', 'Begum Rokeya'], answer: 0 },
      { q: 'What is nakshi kantha?', options: ['An embroidered quilt', 'A kind of boat', 'A drum'], answer: 0 },
    ],
  },
  {
    key: 'diaspora', title: 'Bengalis Around the World', emoji: '🌍',
    lead: 'More than 230 million people speak Bangla — in Bangladesh, in West Bengal and Tripura in India, and in communities from London to New York to the Gulf. This reading is about the Bangla-speaking world beyond Bangladesh and the families who keep the language alive far from home.',
    lines: [
      L('পশ্চিমবঙ্গের মানুষও বাংলা ভাষায় কথা বলেন।', 'poshchimbonger manush-o bangla bhashay kotha bolen.', 'The people of West Bengal also speak Bangla.'),
      L('কলকাতা পশ্চিমবঙ্গের রাজধানী।', 'kolkata poshchimbonger rajdhani.', 'Kolkata is the capital of West Bengal.'),
      L('দুই বাংলার ভাষা এক, কিন্তু কিছু শব্দ আলাদা।', 'dui banglar bhasha ek, kintu kichhu shobdo alada.', 'The language of the two Bengals is one, but some words differ.'),
      L('আমরা পানি বলি, ওখানে অনেকে জল বলেন।', 'amra pani boli, okhane onekey jol bolen.', 'We say pani; there many say jol.'),
      L('বাংলাদেশে দাদা মানে বাবার বাবা, আর কলকাতায় দাদা মানে বড় ভাই।', 'bangladeshe dada mane babar baba, ar kolkatay dada mane boro bhai.', 'In Bangladesh dada means father’s father, and in Kolkata dada means elder brother.'),
      L('অনেক বাংলাদেশি যুক্তরাজ্যে থাকেন, বিশেষ করে লন্ডনে।', 'onek bangladeshi juktorajye thaken, bishesh kore londone.', 'Many Bangladeshis live in the United Kingdom, especially in London.'),
      L('তাঁদের অনেকের পরিবার সিলেট থেকে গিয়েছিল।', 'tader onoker poribar silet theke giyechhilo.', 'Many of their families came from Sylhet.'),
      L('লক্ষ লক্ষ বাংলাদেশি মধ্যপ্রাচ্য আর মালয়েশিয়ায় কাজ করেন।', 'lokkho lokkho bangladeshi moddhoprachyo ar maleshiyay kaj koren.', 'Millions of Bangladeshis work in the Middle East and Malaysia.'),
      L('একুশে ফেব্রুয়ারি আন্তর্জাতিক মাতৃভাষা দিবস।', 'ekushe february antorjatik matribhasha dibosh.', 'Twenty-first February is International Mother Language Day.'),
      L('সারা পৃথিবীর মানুষ আমাদের ভাষাকে সম্মান জানায়।', 'shara prithibir manush amader bhashake shomman janay.', 'People all over the world honour our language.'),
    ],
    questions: [
      { q: 'What is the capital of West Bengal?', options: ['Dhaka', 'Kolkata', 'Sylhet'], answer: 1 },
      { q: 'What does dada mean in Bangladesh?', options: ["Father's father", 'Elder brother', 'Uncle'], answer: 0 },
      { q: 'What is celebrated on 21 February around the world?', options: ['International Mother Language Day', 'New Year', 'Victory Day'], answer: 0 },
    ],
  },
]
