// Super challenges for the 18+ track (Wayfarers), keyed by unit id.
// Units that teach exactly the same words as the 16–18 track share that track's set.
import { seniorSuper } from './senior'
import { exploreSuperSet } from './explore'

export const adultSuper = {
  'a-script': seniorSuper['p-script'],
  'a-reading': seniorSuper['p-reading'],
  'a-identity': {
    label: 'People, Family & In-laws',
    items: [
      ['আমার শ্বশুর আর শাশুড়ি বাংলাদেশ থেকে এসেছেন, আর তারা আমার সঙ্গে বাংলায় কথা বলেন।', 'My father-in-law and mother-in-law came from Bangladesh, and they speak Bangla with me.'],
      ['আমি আমার ভাবি আর দুলাভাইয়ের সঙ্গে বাংলায় একটু কথা বলতে পারি।', 'I can speak a little Bangla with my sister-in-law and my brother-in-law.'],
      ['আপনার বাড়ি কোথায়, আর আপনার পরিবারের সবাই কেমন আছেন?', 'Where is your home, and how is everyone in your family?'],
      ['আমার মামি আর খালা বাংলাদেশ থেকে এসেছেন, আর আমি এখানে জন্মেছি।', 'My aunt by marriage and my mother’s sister came from Bangladesh, and I was born here.'],
      ['আমি বাংলা শিখছি, তাই আমি আমার শাশুড়ির সঙ্গে বাংলায় কথা বলতে চাই।', 'I am learning Bangla, so I want to speak Bangla with my mother-in-law.'],
      ['আমার ভাই আর বোন বাংলায় কথা বলেন, কিন্তু আমি একটু একটু বাংলা বলতে পারি।', 'My brother and sister speak Bangla, but I can only speak a little.'],
    ],
  },
  'a-numbers': seniorSuper['p-numbers'],
  'a-travel': seniorSuper['p-travel'],
  'a-work': {
    label: 'Work, Money & Forms',
    items: [
      ['আমি একটা কোম্পানিতে কাজ করি, আর আমার সহকর্মীরা খুব ভালো।', 'I work at a company, and my colleagues are very good.'],
      ['আগামীকাল আমার সাক্ষাৎকার আছে, তাই আমি আজ ছুটিতে থাকব।', 'I have an interview tomorrow, so I will be on leave today.'],
      ['দয়া করে আমাকে আপনার ঠিকানা আর পাসপোর্ট ইমেইল করুন।', 'Please email me your address and your passport.'],
      ['আমি একটা ব্যাংক হিসাব খুলতে চাই, তাই আমার পাসপোর্ট আর পরিচয়পত্র সঙ্গে আছে।', 'I want to open a bank account, so I have my passport and ID card with me.'],
      ['এই ফর্মে আমার নাম আর ঠিকানা আছে, এখানে আপনি স্বাক্ষর করুন।', 'This form has my name and address; please sign here.'],
      ['ফি কত টাকা, আর ঋণের সুদ কত?', 'How much is the fee, and how much is the interest on the loan?'],
    ],
  },
  'a-health': {
    label: 'Health, Study & Eating Out',
    items: [
      ['আমার জ্বর হয়েছে, আর আমার মাথা ব্যথা করছে, তাই আমাকে একজন ডাক্তার দেখাতে হবে।', 'I have a fever and my head hurts, so I need to see a doctor.'],
      ['আপনার সর্দি আর কাশি আছে, তাই এই ওষুধ দিনে দুইবার খাবেন।', 'You have a cold and a cough, so take this medicine twice a day.'],
      ['ডাক্তার আমাকে বলেন, আমার রক্ত ঠিক আছে, তাই আমি এখন সুস্থ।', 'The doctor tells me my blood is fine, so I am well now.'],
      ['আমি বিশ্ববিদ্যালয়ে ইতিহাস আর ভূগোল পড়তে চাই, কিন্তু আমার পরীক্ষা আছে।', 'I want to study history and geography at university, but I have exams.'],
      ['ওয়েটার, আমাকে মেনু দিন, আর আমি বিরিয়ানি আর লাচ্ছি চাই।', 'Waiter, please give me the menu, and I would like biryani and lassi.'],
      ['আমার স্বপ্ন, আমি একদিন ডাক্তার হব, আর আমি বিজ্ঞান আর গণিত পড়তে চাই।', 'My dream is that one day I will become a doctor, and I want to study science and mathematics.'],
    ],
  },
  'a-politics': {
    label: 'News, Politics & the Economy',
    items: [
      ['সংসদে নতুন আইন পাস হয়েছে, কিন্তু আমি এই বিষয়ে একমত নই।', 'A new law has been passed in parliament, but I do not agree on this matter.'],
      ['আগে পাট ছিল প্রধান রপ্তানি, কিন্তু এখন তৈরি পোশাক বাংলাদেশের প্রধান রপ্তানি।', 'In the past jute was the main export, but now ready-made garments are Bangladesh’s main export.'],
      ['জিনিসের দাম বাড়ছে, আর অনেক মানুষের মজুরি কম, তাই দারিদ্র্য এখনও বড় সমস্যা।', 'Prices are rising and many people’s wages are low, so poverty is still a big problem.'],
      ['বিদেশে কাজ করা প্রবাসী মানুষ প্রতি বছর অনেক টাকা দেশে পাঠান, আর এই টাকা অর্থনীতিকে এগিয়ে নিচ্ছে।', 'Expatriates working abroad send a lot of money home every year, and this money is moving the economy forward.'],
      ['কৃষি এখনও অনেক মানুষের জীবিকা, আর নতুন সেতু আর বন্দর অর্থনীতিকে এগিয়ে নিচ্ছে।', 'Agriculture is still the livelihood of many people, and new bridges and ports are moving the economy forward.'],
      ['আমার মনে হয়, গণতন্ত্র ভালো, কারণ আদালত আর সংসদে প্রতিটি নাগরিকের অধিকার আছে।', 'I think democracy is good, because every citizen has rights in the courts and in parliament.'],
    ],
  },
  'a-history': {
    label: 'History: 1905 to 1971',
    items: [
      ['১৯০৫ সালে ব্রিটিশ সরকার বাংলাকে দুই ভাগ করে, আর ঢাকা নতুন প্রদেশের রাজধানী হয়।', 'In 1905 the British government divided Bengal in two, and Dhaka became the capital of the new province.'],
      ['১৯৪৭ সালে ভারত ভাগ হয়, আর বাংলাও দুই ভাগ হয়: পূর্ব বাংলা আর পশ্চিমবঙ্গ।', 'In 1947 India was divided, and Bengal was also divided: East Bengal and West Bengal.'],
      ['সিলেটের মানুষ ভোট দিয়ে পূর্ব বাংলায় যোগ দেয়, আর লক্ষ লক্ষ মানুষ নিজের বাড়ি ছেড়ে চলে যায়।', 'The people of Sylhet voted to join East Bengal, and millions of people left their homes.'],
      ['১৯৪৮ সালে বলা হয় উর্দু হবে একমাত্র রাষ্ট্রভাষা, আর ১৯৫২ সালে অনেকে প্রাণ দেন।', 'In 1948 it was said that Urdu alone would be the state language, and in 1952 many gave their lives.'],
      ['১৯৬৬ সালে শেখ মুজিবুর রহমান ছয় দফা দাবি দেন, আর ১৯৭০ সালের নির্বাচনে আওয়ামী লীগ জয়ী হয়।', 'In 1966 Sheikh Mujibur Rahman put forward the six-point demand, and in the 1970 election the Awami League won.'],
      ['আওয়ামী লীগ ১৯৪৯ সালে তৈরি হয়, আর ১৯৭৮ সালে জিয়াউর রহমান বিএনপি গঠন করেন।', 'The Awami League was formed in 1949, and in 1978 Ziaur Rahman founded the BNP.'],
    ],
  },
  'a-faith': {
    label: 'Faith, Culture & the Arts',
    items: [
      ['ঈদ, দুর্গাপূজা, বুদ্ধ পূর্ণিমা আর বড়দিন অনেকে একসাথে উদযাপন করে, আর পহেলা বৈশাখ সব ধর্মের মানুষের উৎসব।', 'Many people celebrate Eid, Durga Puja, Buddha Purnima and Christmas together, and Pohela Boishakh is a festival for people of every faith.'],
      ['সুফি সাধকেরা ইসলামের বাণী এনেছিলেন, আর বাউল আর ফকিরদের গানে সব ধর্মের কথা মিশে আছে।', 'Sufi saints brought the message of Islam, and in the songs of Bauls and fakirs the words of every faith are mixed.'],
      ['নারীরা শাড়ি আর সালোয়ার-কামিজ পরেন, আর পুরুষেরা পাঞ্জাবি, শার্ট আর লুঙ্গি পরেন।', 'Women wear sarees and shalwar-kameez, and men wear panjabi, shirts and lungi.'],
      ['নকশিকাঁথা পুরোনো কাপড়ে সুই-সুতায় সেলাই করা শিল্প, আর গামছা গ্রামের মানুষের খুব দরকারি জিনিস।', 'Nakshi kantha is the art of stitching old cloth with needle and thread, and the gamchha is a very useful thing for village people.'],
      ['রবীন্দ্রনাথ ঠাকুর নোবেল পুরস্কার পান, আর কাজী নজরুল ইসলাম আমাদের জাতীয় কবি।', 'Rabindranath Tagore received the Nobel Prize, and Kazi Nazrul Islam is our national poet.'],
      ['ভাটিয়ালি গান মাঝিরা নদীতে গায়, আর ভাওয়াইয়া উত্তরবঙ্গের লোকগান।', 'Boatmen sing Bhatiyali songs on the river, and Bhawaiya is a folk song of the north.'],
    ],
  },
  'a-bengal': {
    label: 'Bengal Beyond Borders',
    items: [
      ['আমরা পানি বলি, আর ওখানে অনেকে জল বলেন, কিন্তু দুই বাংলার ভাষা এক।', 'We say pani, and there many say jol, but the language of the two Bengals is one.'],
      ['কলকাতায় আমার মাসি আর কাকা থাকেন, আর বাংলাদেশে আমার খালা আর চাচা থাকেন।', 'In Kolkata my aunt and uncle live, and in Bangladesh my other aunt and uncle live.'],
      ['বাংলাদেশে আমরা গোসল আর নাস্তা বলি, আর কলকাতায় অনেকে স্নান আর জলখাবার বলেন।', 'In Bangladesh we say goshol and nasta, and in Kolkata many people say snan and jolkhabar.'],
      ['অনেক বাংলাদেশি যুক্তরাজ্যে থাকেন, আর তাঁদের অনেকের পরিবার সিলেট থেকে গিয়েছিল।', 'Many Bangladeshis live in the United Kingdom, and many of their families came from Sylhet.'],
      ['লক্ষ লক্ষ বাংলাদেশি মধ্যপ্রাচ্য আর মালয়েশিয়ায় কাজ করেন, আর বিশেষ করে লন্ডনে অনেকে থাকেন।', 'Millions of Bangladeshis work in the Middle East and Malaysia, and especially in London many live.'],
      ['একুশে ফেব্রুয়ারি আন্তর্জাতিক মাতৃভাষা দিবস, আর সারা পৃথিবীর মানুষ আমাদের ভাষাকে সম্মান জানায়।', 'Twenty-first February is International Mother Language Day, and people all over the world honour our language.'],
    ],
  },
  'a-grammar': seniorSuper['p-grammar'],
  'a-explore': exploreSuperSet,
}
