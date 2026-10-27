// Super challenges for the 16–18 track (Pathfinders), keyed by unit id.
// Units that teach exactly the same words as the 13–15 track share that track's set.
import { teenSuper } from './teen'
import { exploreSuperSet } from './explore'

export const seniorSuper = {
  'p-script': {
    label: 'Script Fast-Track', script: true,
    items: [
      ['সমতল', 'flat land, plain'], ['কলরব', 'a noisy chatter'], ['শরবত', 'sherbet, a cool sweet drink'], ['মগজ', 'brain'], ['বরফ', 'ice'], ['অবসর', 'leisure, free time'],
    ],
  },
  'p-reading': teenSuper['v-reading'],
  'p-identity': teenSuper['v-hello'],
  'p-numbers': {
    label: 'Numbers, Time & Money',
    items: [
      ['আগামীকাল শুক্রবার, তাই আমি সকালে দোকান থেকে পাঁচ কেজি আম কিনব।', 'Tomorrow is Friday, so in the morning I will buy five kilos of mangoes from the shop.'],
      ['বৈশাখ মাসে আম সস্তা, কিন্তু আষাঢ় মাসে আম দামি।', 'Mangoes are cheap in the month of Boishakh, but expensive in the month of Ashar.'],
      ['আপনি কি আমাকে এক ডজন কলা আর এক কেজি আম পঞ্চাশ টাকায় দেবেন?', 'Will you give me a dozen bananas and a kilo of mangoes for fifty taka?'],
      ['এই দোকানে এক কেজি আমের দাম আশি টাকা, কিন্তু ওই দোকানে সত্তর টাকা।', 'In this shop a kilo of mangoes costs eighty taka, but in that shop seventy taka.'],
      ['আমি বিকেলে একশো টাকা দিয়ে এক ডজন কলা কিনব।', 'In the afternoon I will buy a dozen bananas with a hundred taka.'],
      ['শনিবার সকালে আমার খুচরা টাকা আছে, কিন্তু রবিবার আমার আরও টাকা লাগবে।', 'On Saturday morning I have small change, but on Sunday I will need more money.'],
    ],
  },
  'p-travel': {
    label: 'Travel & Cities',
    items: [
      ['আমার মোবাইলে চার্জ নেই, তাই আপনি কি আমাকে একটু ফোন দেবেন?', 'My mobile has no charge, so could you give me a phone for a moment?'],
      ['আমি ঢাকায় যাচ্ছি, আর আমার টিকিট, পাসপোর্ট আর মোবাইল এই থলেতে আছে।', 'I am going to Dhaka, and my ticket, passport and mobile are in this bag.'],
      ['এই ট্রেনটা স্টেশন থেকে বিমানবন্দরে যায়, আর ভাড়া বেশি নয়।', 'This train goes from the station to the airport, and the fare is not high.'],
      ['আমি পথ হারিয়ে ফেলেছি, কিন্তু আমার ফোনে মানচিত্র আছে।', 'I have lost my way, but I have a map on my phone.'],
      ['সোজা যান, তারপর বামে ঘুরুন, আর হোটেল আপনার ডান দিকে।', 'Go straight, then turn left, and the hotel is on your right.'],
      ['এখান থেকে স্টেশন কতদূর, আর আপনি কি আমাকে একটু সাহায্য করবেন?', 'How far is the station from here, and could you help me a little?'],
    ],
  },
  'p-study': {
    label: 'Study, Work & Dreams',
    items: [
      ['আমি বিজ্ঞান পড়তে ভালোবাসি, আর আমার স্বপ্ন আমি একদিন প্রকৌশলী হব।', 'I love studying science, and my dream is that one day I will become an engineer.'],
      ['আমার মনে হয়, গণিত পরীক্ষা ভালো হয়েছে, তাই আমি খুব খুশি।', 'I think the maths exam went well, so I am very happy.'],
      ['আমি আর আমার বন্ধুরা মাঠে ফুটবল খেলতে ভালোবাসি।', 'My friends and I love to play football on the field.'],
      ['আমি রেস্তোরাঁয় বিরিয়ানি, ঝোল আর ভাজি চাই, কিন্তু ফুচকা চাই না।', 'At the restaurant I want biryani, curry and fried vegetables, but I do not want fuchka.'],
      ['তোমার মনে হয়, গল্পটা মজার ছিল, আর আমি তোমার সাথে একমত।', 'You think the story was fun, and I agree with you.'],
      ['ভবিষ্যৎ নিয়ে আমার একটু চিন্তা আছে, কিন্তু আমার সাহস আর স্বপ্ন আছে।', 'I am a little worried about the future, but I have courage and dreams.'],
    ],
  },
  'p-celebrate': {
    label: 'Celebrations & Weddings',
    items: [
      ['ঈদের দিন সকালে সবাই নতুন পাঞ্জাবি আর শাড়ি পরে।', 'On Eid morning everyone wears a new panjabi or a saree.'],
      ['বিয়ের দিন বর আর কনে নতুন পোশাক পরে, আর অতিথিরা মজার খাবার পায়।', 'On the wedding day the groom and the bride wear new clothes, and the guests get delicious food.'],
      ['রমজানের পর বাড়িতে বাড়িতে ঈদের উৎসব হয়, আর ছোটরা সালামি পায়।', 'After Ramadan there is the Eid festival in every home, and the children get salami.'],
      ['গায়ে হলুদের দিন সবাই হলুদ শাড়ি আর হলুদ পাঞ্জাবি পরে।', 'On the gaye holud day everyone wears a yellow saree or a yellow panjabi.'],
      ['নববর্ষের দিন সবাই নতুন পোশাক পরে, আর বড়দের কাছ থেকে উপহার পায়।', 'On New Year’s Day everyone wears new clothes and gets gifts from their elders.'],
      ['অতিথিদের জন্য বাড়িতে মজার খাবার রান্না হয়, আর সবাই ঈদ মোবারক জানান।', 'Delicious food is cooked at home for the guests, and everyone says Eid Mubarak.'],
    ],
  },
  'p-history': {
    label: 'History & Identity',
    items: [
      ['১৯৫২ সালে ঢাকায় ছাত্ররা ভাষার জন্য মিছিল করেছিলেন, আর অনেক মানুষ প্রাণ দিয়েছিলেন।', 'In 1952 students marched in Dhaka for their language, and many people gave their lives.'],
      ['পহেলা বৈশাখে অনেকে পান্তা-ইলিশ খান, আর ইলিশ আমাদের জাতীয় মাছ।', 'On Pohela Boishakh many people eat panta-ilish, and hilsa is our national fish.'],
      ['মুক্তিযোদ্ধারা দেশের জন্য যুদ্ধ করেছিলেন, আর ১৬ই ডিসেম্বর আমাদের বিজয় দিবস।', 'The freedom fighters fought for the country, and 16 December is our Victory Day.'],
      ['রবীন্দ্রনাথ ঠাকুর আমাদের জাতীয় সংগীত লিখেছিলেন, আর লালন একজন বিখ্যাত বাউল ছিলেন।', 'Rabindranath Tagore wrote our national anthem, and Lalon was a famous Baul.'],
      ['ঢাকা বাংলাদেশের রাজধানী, আর এই শহরে বিকেলে অনেকে পার্কে বেড়াতে যান।', 'Dhaka is the capital of Bangladesh, and in this city many people go for a walk in the park in the afternoon.'],
      ['পথের পাঁচালী একটি বিখ্যাত বাংলা সিনেমা, আর সত্যজিৎ রায় সিনেমাটি বানিয়েছিলেন।', 'Pather Panchali is a famous Bangla film, and Satyajit Ray made it.'],
    ],
  },
  'p-art': {
    label: 'Poetry, Proverbs & Film',
    items: [
      ['তুমি কি এই গানটা শুনেছো, আর গায়কের গলা কি তোমার ভালো লাগে?', 'Have you heard this song, and do you like the singer’s voice?'],
      ['আমি দুটো টিকিট কিনব, আর আমরা একসাথে সন্ধ্যা সাতটার শো-তে ছবিটা দেখব।', 'I will buy two tickets, and we will watch the film together at the seven o’clock show.'],
      ['ছবিটা কে বানিয়েছিলেন, আর গল্পটা কী নিয়ে?', 'Who made the film, and what is the story about?'],
      ['এই কবিতা আর এই গান আমার মনে রাখার মতো, কারণ সুর খুব সুন্দর।', 'This poem and this song are worth remembering, because the tune is very beautiful.'],
      ['অতি লোভে তাঁতি নষ্ট, কিন্তু সবুরে মেওয়া ফলে।', 'Too much greed ruins the weaver, but patience bears fruit.'],
      ['যেমন কর্ম তেমন ফল, আর লেখাপড়া করে যে, গাড়িঘোড়া চড়ে সে।', 'As the deed, so the result; and whoever studies rides in carriages.'],
    ],
  },
  'p-grammar': {
    label: 'Grammar in Action',
    items: [
      ['আমি আম খাই, তুমি কলা খাও, আর আমার ভাই ভাত খায়।', 'I eat a mango, you eat a banana, and my brother eats rice.'],
      ['আজ আমি ঢাকায় যাই, কিন্তু আগামীকাল আপনি কোথায় যাবেন?', 'Today I go to Dhaka, but where will you go tomorrow?'],
      ['আমি সিনেমাটা দেখেছি, তুমি কি বইটা পড়েছো, আর আপনি কি আগামীকাল আসবেন?', 'I have seen the film, have you read the book, and will you come tomorrow?'],
      ['আমি যা পড়ি, তুমি তা লেখো, আর সে তা সুন্দর করে বলে।', 'What I read, you write, and he or she says it beautifully.'],
      ['কে আজ খেলতে আসে, কখন আসে, আর কেন আসে?', 'Who comes to play today, when do they come, and why do they come?'],
      ['আমি পরে আপনাকে ফোন করব, আর আপনি আমাকে কী বলবেন?', 'I will phone you later, and what will you tell me?'],
    ],
  },
  'p-explore': exploreSuperSet,
}
