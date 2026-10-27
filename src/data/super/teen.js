// Super challenges for the 13–15 track (Voyagers), keyed by unit id.
//   'unit-id': { label, script?: true (letters only), items: [['Bangla', 'English'], …] }
import { exploreSuperSet } from './explore'

export const teenSuper = {
  'v-script1': {
    label: 'Script 1', script: true,
    items: [
      ['আজ', 'today'], ['অজ', 'goat'], ['চক', 'chalk'], ['ছক', 'a chart, a grid'], ['জগ', 'a jug'], ['জজ', 'a judge'],
    ],
  },
  'v-script2': {
    label: 'Script 2', script: true,
    items: [
      ['কলম', 'pen'], ['গরম', 'hot'], ['শরবত', 'sherbet, a cool sweet drink'], ['সমতল', 'flat land, plain'], ['মগজ', 'brain'], ['কলরব', 'a noisy chatter'],
    ],
  },
  'v-reading': {
    label: 'Signs, Conjuncts & Reading', script: true,
    items: [
      ['আমার মা চা খায়।', 'My mother drinks tea.'],
      ['ছোট ভাই ভাত খায়।', 'The little brother eats rice.'],
      ['দাদা গাছে আম দেখে।', 'Grandfather sees mangoes on the tree.'],
      ['লাল ফুল কত সুন্দর!', 'How beautiful the red flower is!'],
      ['বাবা বাজারে গিয়েছেন।', 'Father has gone to the market.'],
      ['আমি গরম চা পছন্দ করি।', 'I like hot tea.'],
    ],
  },
  'v-hello': {
    label: 'Hello, Bangladesh!',
    items: [
      ['আমার মা আর বাবা বাংলাদেশ থেকে এসেছেন।', 'My mother and father came from Bangladesh.'],
      ['আমার শিক্ষক বলেন, আমি ভালো বাংলা বলতে পারি।', 'My teacher says I can speak good Bangla.'],
      ['আমি এখানে জন্মেছি, কিন্তু বাংলা আমার মাতৃভাষা।', 'I was born here, but Bangla is my mother tongue.'],
      ['আমি আমার দাদা আর নানির সঙ্গে বাংলায় কথা বলতে চাই।', 'I want to speak Bangla with my grandfather and my grandmother.'],
      ['আমি ভালো আছি, আমার পরিবারের সবাই ভালো আছে।', 'I am well, and everyone in my family is well.'],
      ['একদিন আমি আমার মামা আর খালার সঙ্গে বাংলাদেশে যেতে চাই।', 'One day I want to go to Bangladesh with my uncle and my aunt.'],
    ],
  },
  'v-numbers': {
    label: 'Numbers & Money',
    items: [
      ['আমি দোকান থেকে দুই কেজি আম কিনব।', 'I will buy two kilos of mangoes from the shop.'],
      ['এই থলেতে এক ডজন কলা আর তিন কেজি আম আছে।', 'This bag has a dozen bananas and three kilos of mangoes.'],
      ['আপনার কাছে কি পঞ্চাশ টাকার খুচরা আছে?', 'Do you have change for fifty taka?'],
      ['এই দোকানে দাম বেশি, কিন্তু ওই দোকানে দাম কম।', 'The price is high in this shop, but low in that shop.'],
      ['এটা খুব দামি, তাই আমি একটু ছাড় চাই।', 'This is very expensive, so I would like a small discount.'],
      ['আমার কাছে একশো টাকা আছে, কিন্তু আমি আরও কিছু কিনব।', 'I have one hundred taka, but I will buy a little more.'],
    ],
  },
  'v-travel': {
    label: 'Getting Around',
    items: [
      ['আমি বাসে করে শহর থেকে গ্রামে যাচ্ছি।', 'I am going from the city to the village by bus.'],
      ['আপনি কি আমাকে স্টেশনে নিয়ে যাবেন?', 'Will you take me to the station?'],
      ['হোটেলটা বাস স্টেশনের কাছে, কিন্তু বিমানবন্দর থেকে দূরে।', 'The hotel is near the bus station, but far from the airport.'],
      ['আমার কাছে মানচিত্র আছে, কিন্তু আমি পথ হারিয়ে ফেলেছি।', 'I have a map, but I have lost my way.'],
      ['আগে সোজা যান, তারপর ডান দিকে ঘুরুন, আর স্টেশন বামে।', 'First go straight, then turn right, and the station is on the left.'],
      ['এই ট্রেনের ভাড়া কত, আর বিমানের ভাড়া কত?', 'How much is the fare of this train, and how much is the fare of the plane?'],
    ],
  },
  'v-daily': {
    label: 'Everyday Life',
    items: [
      ['শুক্রবার সকালে আমি বাবার সঙ্গে দোকানে যাচ্ছি।', 'On Friday morning I am going to the shop with my father.'],
      ['এখন গ্রীষ্ম, তাই আমি ঠান্ডা পানি আর লাচ্ছি চাই।', 'It is summer now, so I want cold water and lassi.'],
      ['আজ রাতে আমরা রেস্তোরাঁয় বিরিয়ানি আর কাবাব চাই।', 'Tonight we would like biryani and kebab at the restaurant.'],
      ['ওয়েটার, মেনু দিন, আর বিল পরে দিন।', 'Waiter, please give the menu, and give the bill later.'],
      ['এই ঝোল খুব ঝাল, কিন্তু ভাজিটা একটু টক আর মিষ্টি।', 'This curry is very spicy, but the fried vegetables are a little sour and sweet.'],
      ['শনিবার বিকেলে আমি আর আমার বন্ধু চা আর মিষ্টি চাই।', 'On Saturday afternoon my friend and I would like tea and sweets.'],
    ],
  },
  'v-film': {
    label: 'Film, Music & Poetry',
    items: [
      ['চলো, আজ সন্ধ্যায় আমরা নতুন বাংলা সিনেমা দেখতে যাই।', 'Come on, let us go to see a new Bangla film this evening.'],
      ['এই গায়কের গলা খুব সুন্দর, আর গানের সুরটাও আমার পছন্দ।', 'This singer’s voice is very beautiful, and I like the tune of the song too.'],
      ['তুমি কি আজ বিকেলে আমার সঙ্গে নাটক দেখতে যাবে?', 'Will you go to see a play with me this afternoon?'],
      ['শুনেছি গল্পটা খুব ভালো, তাই আমি দুটো টিকিট কিনব।', 'I hear the story is very good, so I will buy two tickets.'],
      ['এই কবিতা আর এই গান দুটোই আমার খুব পছন্দ।', 'I like both this poem and this song very much.'],
      ['ভাই, সন্ধ্যা সাতটার শো-তে দুটো টিকিট আছে?', 'Brother, are there two tickets for the seven o’clock show?'],
    ],
  },
  'v-history': {
    label: 'History & Identity',
    items: [
      ['ভাষার জন্য শহীদরা প্রাণ দিয়েছিলেন, আর তাঁদের স্মরণে ঢাকায় শহীদ মিনার তৈরি হয়েছে।', 'The martyrs gave their lives for the language, and the Shaheed Minar was built in Dhaka in their memory.'],
      ['রবীন্দ্রনাথ ঠাকুর নোবেল পুরস্কার পেয়েছিলেন, আর তিনি আমাদের জাতীয় সংগীত লিখেছিলেন।', 'Rabindranath Tagore won the Nobel Prize, and he wrote our national anthem.'],
      ['পহেলা বৈশাখ বাংলা নববর্ষ, আর এই দিনে সবাই নতুন পোশাক পরে।', 'Pohela Boishakh is the Bangla New Year, and on this day everyone wears new clothes.'],
      ['বর্ষাকালে নদীতে অনেক ইলিশ ধরা পড়ে, আর ইলিশ আমাদের জাতীয় মাছ।', 'In the rainy season a lot of hilsa is caught in the rivers, and hilsa is our national fish.'],
      ['সত্যজিৎ রায় পথের পাঁচালী সিনেমাটি বানিয়েছিলেন, আর এটা একটি বিখ্যাত বাংলা সিনেমা।', 'Satyajit Ray made the film Pather Panchali, and it is a famous Bangla film.'],
      ['ঢাকা আমাদের রাজধানী, তাই এই শহরে রাস্তায় অনেক রিকশা চলে।', 'Dhaka is our capital, so many rickshaws run on the roads of this city.'],
    ],
  },
  'v-grammar': {
    label: 'How Bangla Works',
    items: [
      ['আমি সকালে চা খাই, কিন্তু আমার ভাই দুধ খায়।', 'I drink tea in the morning, but my brother drinks milk.'],
      ['তুমি কি বিকেলে মাঠে আসো আর আমার সঙ্গে ক্রিকেট খেলো?', 'Do you come to the field in the afternoon and play cricket with me?'],
      ['আমি সিনেমাটা দেখেছি, আর আমার মনে হয়, গল্পটা খুব সুন্দর ছিল।', 'I have seen the film, and I think the story was very beautiful.'],
      ['আপনি কি আগামীকাল ঢাকায় যাবেন, আর আমাকে ফোন করবেন?', 'Will you go to Dhaka tomorrow, and will you phone me?'],
      ['তুমি যা বলেছো, আমি তা পড়েছি, কিন্তু আমি তোমার সঙ্গে একমত নই।', 'I have read what you said, but I do not agree with you.'],
      ['আমার স্বপ্ন, আমি একদিন বড় ডাক্তার হব, আর খুব ভালো করে লেখাপড়া করব।', 'My dream is that one day I will become a good doctor, and I will study very well.'],
    ],
  },
  'v-explore': exploreSuperSet,
}
