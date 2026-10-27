// Super challenges for the 8–12 track (Explorers), keyed by unit id.
// (The very first unit, Vowels, has none: only two real words can be made from vowel letters alone.)
import { teenSuper } from './teen'
import { seniorSuper } from './senior'

export const olderSuper = {
  'o-c1': teenSuper['v-script1'],
  'o-c2': {
    label: 'Consonants II', script: true,
    items: [['টক', 'sour'], ['ঘট', 'a pot'], ['ঘন', 'thick, dense'], ['ধন', 'wealth'], ['নট', 'an actor'], ['জন', 'a person']],
  },
  'o-c3': {
    label: 'Consonants III', script: true,
    items: [['কলম', 'pen'], ['গরম', 'hot'], ['শরবত', 'sherbet, a cool sweet drink'], ['সমতল', 'flat land, plain'], ['মগজ', 'brain'], ['বরফ', 'ice']],
  },
  'o-sp': seniorSuper['p-script'],
  'o-signs': {
    label: 'Vowel Signs', script: true,
    items: [['নদী', 'river'], ['বাড়ি', 'house, home'], ['মেঘ', 'cloud'], ['চাঁদ', 'moon'], ['বিড়াল', 'cat'], ['দুধ', 'milk']],
  },
  'o-read': {
    label: 'Read Your First Words', script: true,
    items: [
      ['আমার মা চা খায়।', 'My mother drinks tea.'],
      ['ছোট ভাই ভাত খায়।', 'The little brother eats rice.'],
      ['দাদা গাছে আম দেখে।', 'Grandfather sees mangoes on the tree.'],
      ['নদীর ধারে লাল ফুল।', 'Red flowers by the river.'],
      ['বাবা বাজারে গিয়েছেন।', 'Father has gone to the market.'],
      ['আমি গরম ভাত খাই।', 'I eat hot rice.'],
    ],
  },
  'o-hello': {
    label: 'Say Hello',
    items: [
      ['শুভ সকাল! কেমন আছো? আমি ভালো আছি, ধন্যবাদ।', 'Good morning! How are you? I am well, thank you.'],
      ['শুভ রাত্রি! আবার দেখা হবে, ধন্যবাদ।', 'Good night! See you again, thank you.'],
      ['স্বাগতম! শুভ সকাল! আমি ভালো আছি, ধন্যবাদ।', 'Welcome! Good morning! I am well, thank you.'],
      ['হ্যাঁ, আমি ভালো আছি! আবার দেখা হবে।', 'Yes, I am well! See you again.'],
      ['না, ধন্যবাদ। আমি ভালো আছি, শুভ রাত্রি!', 'No, thank you. I am well, good night!'],
      ['স্বাগতম! কেমন আছো? শুভ সকাল, আবার দেখা হবে।', 'Welcome! How are you? Good morning, see you again.'],
    ],
  },
  'o-numbers': {
    label: 'Numbers',
    items: [
      ['দুই আর তিন পাঁচ, আর চার আর ছয় দশ।', 'Two and three is five, and four and six is ten.'],
      ['দশ আর দশ বিশ, আর বিশ আর বিশ চল্লিশ।', 'Ten and ten is twenty, and twenty and twenty is forty.'],
      ['ত্রিশ আর বিশ পঞ্চাশ, আর পঞ্চাশ আর পঞ্চাশ একশো।', 'Thirty and twenty is fifty, and fifty and fifty is one hundred.'],
      ['সত্তর আর দশ আশি, আর আশি আর দশ নব্বই।', 'Seventy and ten is eighty, and eighty and ten is ninety.'],
      ['এক আর এক দুই, আর দুই আর দুই চার, আর চার আর চার আট।', 'One and one is two, two and two is four, and four and four is eight.'],
      ['আট আর এক নয়, আর নয় আর এক দশ।', 'Eight and one is nine, and nine and one is ten.'],
    ],
  },
  'o-people': {
    label: 'People & Pronouns',
    items: [
      ['আমার মা আর বাবা, আমার ভাই আর বোন আমার পরিবার।', 'My mother and father, my brother and sister are my family.'],
      ['তুমি আমার বন্ধু, আর সে আমার ভাই।', 'You are my friend, and he is my brother.'],
      ['আপনি আমার শিক্ষক, আর তারা আমার বন্ধু।', 'You are my teacher, and they are my friends.'],
      ['আমার দাদা আর দাদি, নানা আর নানি আমার পরিবার।', 'My grandfather and grandmother, my other grandfather and grandmother are my family.'],
      ['আমার মামা আর খালা, চাচা আর ফুফু আমার পরিবার।', 'My uncles and aunts are my family.'],
      ['ওই ছেলে আমার ভাই, আর ওই মেয়ে আমার বোন।', 'That boy is my brother, and that girl is my sister.'],
    ],
  },
  'o-ft-morning': {
    label: 'Family: Mornings',
    items: [
      ['আম্মু, আমি এখনই মুখ ধুয়ে নাশতা করতে যাচ্ছি।', 'Ammu, I am going right now to wash my face and have breakfast.'],
      ['আজ খুব ঠান্ডা, তাই আমি সোয়েটার, টুপি আর মোজা পরেছি।', 'It is very cold today, so I have put on a sweater, a hat and socks.'],
      ['আম্মু, আমার তোয়ালে আর সাবান কোথায়, আর পানি কি গরম?', 'Ammu, where are my towel and soap, and is the water hot?'],
      ['গোসল শেষ হলে চুল মুছে নিও, আর সোয়েটার পরো।', 'When you finish bathing, dry your hair and wear a sweater.'],
      ['আজ নাশতায় ডিম আর পরোটা আছে, আর আমার খুব ভালো লাগে।', 'There are eggs and paratha for breakfast today, and I like that a lot.'],
      ['আমি জুতা খুঁজে পাচ্ছি না, কিন্তু ব্যাগে আমার সব বই আছে।', 'I cannot find my shoes, but all my books are in my bag.'],
    ],
  },
  'o-ft-school': {
    label: 'Family: School Days',
    items: [
      ['আজ স্কুলে আমরা ছবি এঁকেছি, আর আমি খুব খুশি হয়েছি।', 'Today at school we drew pictures, and I am very happy.'],
      ['আম্মু, আমি হোমওয়ার্ক শেষ করেছি, কিন্তু এই অঙ্কটা আমি বুঝতে পারছি না।', 'Ammu, I have finished my homework, but I cannot understand this sum.'],
      ['কাল আমার পরীক্ষা, তাই আমার খুব ভয় করছে, আর আমি আজ মন দিয়ে পড়ব।', 'My exam is tomorrow, so I am very scared, and today I will study carefully.'],
      ['আমি গণিতে অনেক ভালো করেছি, কিন্তু বাংলায় একটু কম পেয়েছি।', 'I did very well in maths, but I got a slightly lower mark in Bangla.'],
      ['আম্মু, আপনি কি আমার জন্য দোয়া করবেন, আর আমাকে একটু সাহায্য করবেন?', 'Ammu, will you pray for me, and help me a little?'],
      ['স্বাগতম, নীলা! তুমি কি আমার পাশে বসবে, আর আমরা একসাথে হোমওয়ার্ক করি?', 'Welcome, Nila! Will you sit next to me, and shall we do our homework together?'],
    ],
  },
  'o-ft-food': {
    label: 'Family: Food & Kitchen',
    items: [
      ['আম্মু, আমি আলুগুলো ধুয়ে দিই, আর আপনি ডিমের তরকারি রান্না করুন।', 'Ammu, I will wash the potatoes, and you cook the egg curry.'],
      ['বাজারে সবজি, ফল আর মাছ আছে, আর আমি দুই কেজি আম কিনতে চাই।', 'The market has vegetables, fruit and fish, and I would like to buy two kilos of mangoes.'],
      ['আজ আমাদের টেবিলে ভাত, ডাল আর ইলিশ মাছ আছে।', 'Today on our table there is rice, dal and hilsa fish.'],
      ['নানা, ইলিশে অনেক কাঁটা আছে, তাই আস্তে আস্তে খেতে হয়, তাই না?', 'Nana, hilsa has a lot of bones, so you have to eat slowly, don’t you?'],
      ['আব্বু, আমি ব্যাগটা ধরি, আর আমরা আম আর সবজি কিনব।', 'Abbu, I will hold the bag, and we will buy mangoes and vegetables.'],
      ['আমার পেট ভরে গেছে, তাই আমি আর ফল খাব না, শুধু পানি খাব।', 'My tummy is full, so I will not eat any more fruit, only drink water.'],
    ],
  },
  'o-ft-prayer': {
    label: 'Family: Prayer & Ramadan',
    items: [
      ['আজ শুক্রবার, তাই আমি অজু করে টুপি পরে আব্বুর সাথে মসজিদে যাচ্ছি।', 'It is Friday today, so I have made wudu, put on my cap and am going to the mosque with Abbu.'],
      ['আজান শোনা যাচ্ছে, তাই আমি খেলা বন্ধ করে হাত-পা ধুয়ে আসি।', 'The call to prayer can be heard, so I will stop playing and wash my hands and feet.'],
      ['আমি আব্বুর পাশে দাঁড়াব, আর আমরা একসাথে নামাজ পড়ব।', 'I will stand beside Abbu, and we will pray together.'],
      ['আমি বিসমিল্লাহ বলে ধীরে ধীরে কুরআন শরিফ পড়ব।', 'I will say Bismillah and read the Quran slowly.'],
      ['শোয়ার আগে আমি দোয়া পড়ব, আর আল্লাহর কাছে সবার জন্য দোয়া করব।', 'Before going to bed I will say my dua, and pray to Allah for everyone.'],
      ['আম্মু, আজানের সময় আমরা চুপ করে শুনব, আর মুয়াজ্জিনের সাথে সাথে বলব।', 'Ammu, at the time of the call to prayer we will listen quietly and repeat after the muazzin.'],
    ],
  },
  'o-ft-elders': {
    label: 'Family: Nana, Dada & Nani',
    items: [
      ['নানা, আপনি আমাদের বাড়িতে আসবেন, আর আমি আপনার জন্য অপেক্ষা করব।', 'Nana, you will come to our home, and I will wait for you.'],
      ['দাদা, আমি বড় হয়ে আপনাকে একটা সুন্দর গল্প পড়ে শোনাব।', 'Dada, when I grow up I will read you a beautiful story.'],
      ['নানা, আপনি একটু অপেক্ষা করুন, আমি আপনার চশমা খুঁজে দিচ্ছি।', 'Nana, please wait a little, I am looking for your glasses.'],
      ['আমরা রাস্তা পার হব, তাই দাদা, আপনি আমার হাত ধরুন।', 'We will cross the road, so Dada, please hold my hand.'],
      ['নানা, এটাকে ভিডিও কল বলে, আর আগে সবুজ বোতামটা চাপুন।', 'Nana, this is called a video call, and first press the green button.'],
      ['দাদা যখন ছোট ছিলেন, তখন গ্রামে ধানক্ষেত, পুকুর আর আমগাছ ছিল।', 'When Dada was small, the village had rice fields, ponds and mango trees.'],
    ],
  },
  'o-ft-play': {
    label: 'Family: Play & Outings',
    items: [
      ['আম্মু, হোমওয়ার্ক শেষ হয়েছে, তাই আমি কি বাইরে খেলতে যেতে পারি?', 'Ammu, my homework is finished, so may I go outside to play?'],
      ['আজ বাতাস খুব ভালো, তাই আমরা ছাদে ঘুড়ি ওড়াতে যাই।', 'The wind is very good today, so let us go to the roof to fly kites.'],
      ['বৃষ্টি থেমে গেছে, কিন্তু রাস্তায় কাদা আছে, তাই আগে ছাতা নাও।', 'The rain has stopped, but there is mud on the road, so take an umbrella first.'],
      ['আমি মাঠে ক্রিকেট খেলি, আর আমি একটা চার মেরেছি, এবার তোমার পালা।', 'I play cricket on the field, and I hit a four, now it is your turn.'],
      ['আজ পহেলা বৈশাখ, তাই আমরা মেলায় যাই, আর আমি লাল বেলুন নেব।', 'It is Pohela Boishakh today, so we go to the fair, and I will take a red balloon.'],
      ['নানির সাথে নৌকায় চড়ে আমরা নদী পার হব, আর মাঝি নৌকা চালায়।', 'We will cross the river by boat with Nani, and the boatman steers the boat.'],
    ],
  },
  'o-ft-care': {
    label: 'Family: Care & Manners',
    items: [
      ['চাচা, আপনি বসুন, আমি আপনার জন্য একটু পানি আনব।', 'Uncle, please sit down, I will bring you a little water.'],
      ['আম্মু, আমাকে মাফ করবেন, আমি গ্লাসটা ভেঙে ফেলেছি, আর আমি আর অসাবধান হব না।', 'Ammu, please forgive me, I have broken the glass, and I will not be careless again.'],
      ['বাইরে থেকে এসে আগে হাত ধুয়ে নাও, আর জুতা খুলে ঘরে ঢোকো।', 'When you come in from outside, wash your hands first, and take off your shoes before coming in.'],
      ['বড়দের কথা মন দিয়ে শুনবে, আর মিথ্যা বলবে না, সত্য কথা বলবে।', 'Listen carefully to what your elders say, do not tell lies, and tell the truth.'],
      ['ডাক্তার সাহেব, আমার গলা ব্যথা করছে, আর আমার শরীর গরম লাগছে।', 'Doctor, my throat hurts, and my body feels hot.'],
      ['আম্মু, আমার আঙুল কেটে গেছে, তাই আগে পানি দিয়ে ধুয়ে নিই।', 'Ammu, my finger is cut, so first I will wash it with water.'],
    ],
  },
  'o-colours': {
    label: 'Colours',
    items: [
      ['লাল আর নীল, সবুজ আর হলুদ, কালো আর সাদা।', 'Red and blue, green and yellow, black and white.'],
      ['কমলা আর বেগুনি, গোলাপি আর বাদামি, লাল আর কালো।', 'Orange and purple, pink and brown, red and black.'],
      ['নীল আর হলুদ সবুজ, আর লাল আর সাদা গোলাপি।', 'Blue and yellow make green, and red and white make pink.'],
      ['লাল আর হলুদ কমলা, আর লাল আর নীল বেগুনি।', 'Red and yellow make orange, and red and blue make purple.'],
      ['গোলাপি আর বেগুনি, কমলা আর হলুদ, নীল আর সবুজ।', 'Pink and purple, orange and yellow, blue and green.'],
      ['লাল আর সবুজ বাদামি, আর সাদা আর লাল গোলাপি।', 'Red and green make brown, and white and red make pink.'],
    ],
  },
  'o-animals': {
    label: 'Animals',
    items: [
      ['কুকুর আর বিড়াল, গরু আর ঘোড়া, হাতি আর বাঘ।', 'Dog and cat, cow and horse, elephant and tiger.'],
      ['সিংহ আর বানর, ছাগল আর হাঁস, মুরগি আর পাখি।', 'Lion and monkey, goat and duck, hen and bird.'],
      ['খরগোশ আর ভালুক, সাপ আর কচ্ছপ, হরিণ আর উট।', 'Rabbit and bear, snake and tortoise, deer and camel.'],
      ['ময়ূর আর প্রজাপতি, ব্যাঙ আর মাছ, গরু আর ছাগল।', 'Peacock and butterfly, frog and fish, cow and goat.'],
      ['কুকুর আর বিড়াল ঘরে, গরু আর ছাগল মাঠে, হাঁস আর মাছ পানিতে।', 'The dog and cat are in the house, the cow and goat in the field, the duck and fish in the water.'],
      ['ময়ূর আর হরিণ, বানর আর ভালুক, সাপ আর ব্যাঙ।', 'Peacock and deer, monkey and bear, snake and frog.'],
    ],
  },
  'o-food': {
    label: 'Food & Drink',
    items: [
      ['আমি ভাত, ডাল আর ডিম খাব, আর তুমি রুটি আর আলু খাবে।', 'I will eat rice, dal and egg, and you will eat roti and potato.'],
      ['আমি দুধ আর চিনি দিয়ে চা খাব, আর তুমি পানি খাবে।', 'I will have tea with milk and sugar, and you will have water.'],
      ['আজ আমি আম, কলা আর আপেল খাব, আর আঙুর আর তরমুজও খাব।', 'Today I will eat mango, banana and apple, and grapes and watermelon too.'],
      ['লেবু আর চিনি দিয়ে আমি পানি খাব, আর মিষ্টি খাব।', 'I will drink water with lemon and sugar, and I will eat sweets.'],
      ['তুমি কি ভাত আর ডাল খাবে, নাকি রুটি আর আলু?', 'Will you have rice and dal, or roti and potato?'],
      ['আমার ডিম আর দুধ চাই, কিন্তু আমার চিনি আর মিষ্টি চাই না।', 'I want eggs and milk, but I do not want sugar and sweets.'],
    ],
  },
  'o-body': {
    label: 'My Body',
    items: [
      ['আমার মাথায় চুল আছে, আর আমার চোখ, নাক আর কান আছে।', 'I have hair on my head, and I have eyes, a nose and ears.'],
      ['আমার মুখে জিভ আর দাঁত আছে, আর আমার পেট আছে।', 'I have a tongue and teeth in my mouth, and I have a tummy.'],
      ['আমার হাতে আঙুল আছে, আর আমার পায়ে হাঁটু আছে।', 'I have fingers on my hand, and I have knees on my legs.'],
      ['আমি হাত আর মুখ ধুয়ে নাশতা করব।', 'I will wash my hands and face and have breakfast.'],
      ['আমার মাথা ব্যথা করছে, আর আমার পেট আর পা ব্যথা করছে।', 'My head hurts, and my tummy and my leg hurt.'],
      ['আমি চোখ দিয়ে দেখি, কান দিয়ে শুনি, আর মুখ দিয়ে বলি।', 'I see with my eyes, listen with my ears, and speak with my mouth.'],
    ],
  },
  'o-around': {
    label: 'Around Us',
    items: [
      ['আমার বাড়িতে দরজা, জানালা আর বিছানা আছে।', 'My house has a door, windows and a bed.'],
      ['আমার ব্যাগে বই আর কলম আছে, আর স্কুলে ঘড়ি আছে।', 'My bag has a book and a pen, and the school has a clock.'],
      ['সূর্য, চাঁদ আর তারা আছে, আর মেঘ আর বৃষ্টি আছে।', 'There is the sun, the moon and stars, and there are clouds and rain.'],
      ['নদী আর পাহাড়, গাছ আর ফুল আমার খুব ভালো লাগে।', 'I like rivers and hills, trees and flowers very much.'],
      ['আমি গাড়িতে বাজারে যাচ্ছি, আর আমরা বই কিনব।', 'I am going to the market by car, and we will buy books.'],
      ['বাড়ির কাছে স্কুল আর বাজার আছে, আর নদীও আছে।', 'Near the house there is a school and a market, and there is a river too.'],
    ],
  },
  'o-describe': {
    label: 'Describing & Doing',
    items: [
      ['আজ আমি নতুন ব্যাগ নিয়ে স্কুলে যাব, আর আমার ব্যাগ খুব সুন্দর।', 'Today I will go to school with a new bag, and my bag is very beautiful.'],
      ['এই ভাত গরম, কিন্তু ওই পানি খুব ঠান্ডা।', 'This rice is hot, but that water is very cold.'],
      ['আমার গণিত সহজ, কিন্তু আমার বাংলা একটু কঠিন।', 'My maths is easy, but my Bangla is a little hard.'],
      ['তুমি কখন স্কুলে যাও, আর কোথায় বই পড়ো?', 'When do you go to school, and where do you read books?'],
      ['আমি এই বড় ছবি এঁকেছি, আর এটা খুব সুন্দর।', 'I drew this big picture, and it is very beautiful.'],
      ['কে এই পুরোনো গাছ দেখে, আর কেন এটা এত বড়?', 'Who looks at this old tree, and why is it so big?'],
    ],
  },
  'o-time': {
    label: 'Days, Months & Seasons',
    items: [
      ['শুক্রবার আর শনিবার স্কুল বন্ধ, কিন্তু রবিবার আমি স্কুলে যাই।', 'School is closed on Friday and Saturday, but on Sunday I go to school.'],
      ['বৈশাখ আর জ্যৈষ্ঠ গ্রীষ্ম, আর আষাঢ় আর শ্রাবণ বর্ষা।', 'Boishakh and Joishtho are summer, and Ashar and Shrabon are the rainy season.'],
      ['ভাদ্র আর আশ্বিন শরৎ, আর কার্তিক আর অগ্রহায়ণ হেমন্ত।', 'Bhadro and Ashshin are autumn, and Kartik and Ogrohayon are late autumn.'],
      ['পৌষ আর মাঘ শীত, আর ফাল্গুন আর চৈত্র বসন্ত।', 'Poush and Magh are winter, and Falgun and Choitro are spring.'],
      ['আজ সোমবার, কাল মঙ্গলবার, আর তারপর বুধবার।', 'Today is Monday, tomorrow is Tuesday, and then Wednesday.'],
      ['বৃহস্পতিবার আর শুক্রবার আমি আম্মুর সাথে বাজারে যাই, আর শনিবার খেলি।', 'On Thursday and Friday I go to the market with Ammu, and on Saturday I play.'],
    ],
  },
  'o-sent': {
    label: 'Sentences',
    items: [
      ['আমার নাম তারা, আমার বয়স দশ বছর, আর আমি ঢাকায় থাকি।', 'My name is Tara, I am ten years old, and I live in Dhaka.'],
      ['এটা আমার বই, ওটা তোমার ব্যাগ, আর ইনি আমার মা।', 'This is my book, that is your bag, and this is my mother.'],
      ['আমি স্কুলে যাই, আমি বই পড়ি, আর আমি খেলতে ভালোবাসি।', 'I go to school, I read books, and I love to play.'],
      ['আমার ক্ষুধা পেয়েছে, আমার পিপাসা পেয়েছে, আর আমার ঘুম পেয়েছে।', 'I am hungry, I am thirsty, and I am sleepy.'],
      ['আকাশ নীল, পাতা সবুজ, আর আকাশে চাঁদ আছে।', 'The sky is blue, the leaves are green, and the moon is in the sky.'],
      ['আজ আমার জন্মদিন, তাই আজ আমি খুব খুশি, আর আজ শনিবার।', 'Today is my birthday, so I am very happy today, and today is Saturday.'],
    ],
  },
  'o-verbs': {
    label: 'Verb Patterns',
    items: [
      ['আমি ভাত খাই, তুমি রুটি খাও, আর সে আম খায়।', 'I eat rice, you eat roti, and he or she eats a mango.'],
      ['আমি স্কুলে যাই, তুমি বাজারে যাও, আর সে বাড়ি যায়।', 'I go to school, you go to the market, and he or she goes home.'],
      ['আমি বই পড়ি, তুমি গল্প লেখো, আর সে ছবি দেখে।', 'I read a book, you write a story, and he or she looks at a picture.'],
      ['আমি ঢাকায় যাই, তুমি আমার সাথে আসো, আর সে খেলে।', 'I go to Dhaka, you come with me, and he or she plays.'],
      ['আমি আসি, তুমি আসো, আর সে আসে, তাই আমরা সবাই খেলি।', 'I come, you come, and he or she comes, so we all play.'],
      ['আমি করি, তুমি করো, আর সে করে, কিন্তু আমরা সবাই একসাথে করি।', 'I do, you do, and he or she does, but we all do it together.'],
    ],
  },
  'o-bd': {
    label: 'Bangladesh & Culture',
    items: [
      ['বাংলাদেশের পতাকা সবুজ আর লাল, আর ঢাকায় অনেক রিকশা আছে।', 'The flag of Bangladesh is green and red, and Dhaka has many rickshaws.'],
      ['শাপলা একটা ফুল, দোয়েল একটা পাখি, আর ইলিশ একটা মাছ।', 'Shapla is a flower, doyel is a bird, and hilsa is a fish.'],
      ['ধানক্ষেতে কাঁঠাল গাছ আছে, আর নদীতে নৌকা আছে।', 'The rice field has a jackfruit tree, and the river has a boat.'],
      ['একুশে ফেব্রুয়ারি আমি শহীদ মিনারে যাই, আর আমি মাতৃভাষা ভালোবাসি।', 'On the twenty-first of February I go to the Shaheed Minar, and I love my mother tongue.'],
      ['পহেলা বৈশাখে আমরা ঢাকায় মেলায় যাই, আর ইলিশ খাই।', 'On Pohela Boishakh we go to the fair in Dhaka, and eat hilsa.'],
      ['বিজয় দিবসে আমরা বাংলাদেশের পতাকা আর স্বাধীনতার কথা বলি।', 'On Victory Day we talk about the flag of Bangladesh and about independence.'],
    ],
  },
}
