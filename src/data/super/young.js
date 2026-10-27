// Super challenges for the 5–7 track (Little Learners), keyed by unit id: short sentences (4–6 words), only words
// already taught. (The very first unit, Vowels, has none: only two real words can be made from vowel letters alone.)
import { teenSuper } from './teen'
import { seniorSuper } from './senior'
import { olderSuper } from './older'

export const youngSuper = {
  'y-c1': teenSuper['v-script1'],
  'y-c2': olderSuper['o-c2'],
  'y-c3': olderSuper['o-c3'],
  'y-sp': seniorSuper['p-script'],
  'y-family': {
    label: 'Family Words',
    items: [
      ['মা আর বাবা, ভাই আর বোন।', 'Mother and father, brother and sister.'],
      ['দাদা আর দাদি, নানা আর নানি।', 'Grandfather and grandmother, and the other grandfather and grandmother.'],
      ['চাচা আর মামা, খালা আর ফুফু।', 'Uncles and aunts.'],
      ['ছেলে আর মেয়ে, ভাই আর বোন।', 'Boy and girl, brother and sister.'],
      ['মা, বাবা, বন্ধু আর ভাই।', 'Mother, father, friend and brother.'],
      ['দাদা, নানি, মামা আর খালা।', 'Grandfather, grandmother, uncle and aunt.'],
    ],
  },
  'y-ft-morning': {
    label: 'Family: Mornings',
    items: [
      ['আজ খুব ঠান্ডা, তাই আমি সোয়েটার পরেছি।', 'It is very cold today, so I have put on a sweater.'],
      ['আম্মু, আমার তোয়ালে কোথায়, আর সোয়েটার কোথায়?', 'Ammu, where is my towel, and where is my sweater?'],
      ['আব্বু, আমি জুতা বাঁধতে পারছি না।', 'Abbu, I cannot tie my shoes.'],
      ['টিফিনে ডিম আর রুটি আছে, আর আপেলও আছে।', 'There are egg and roti in the lunchbox, and an apple too.'],
      ['ধন্যবাদ, আম্মু, আমি এখন স্কুলে যাই।', 'Thank you, Ammu, I am going to school now.'],
      ['আমি মুখ ধুয়ে ব্যাগ নিয়েছি, আর জুতা পরেছি।', 'I have washed my face, taken my bag and put on my shoes.'],
    ],
  },
  'y-ft-school': {
    label: 'Family: School Days',
    items: [
      ['কাল আমার পরীক্ষা, তাই আমি মন দিয়ে পড়ব।', 'My exam is tomorrow, so I will study carefully.'],
      ['আম্মু, আমি পরীক্ষার ফল পেয়েছি, আমি মন দিয়ে পড়ব।', 'Ammu, I have got my exam result, I will study carefully.'],
      ['আমার নাম তারা, তোমার নাম কী, আর স্কুল কেমন ছিল?', 'My name is Tara, what is your name, and how was school?'],
      ['আব্বু, আমি একটা ছড়ার বই নিতে চাই।', 'Abbu, I would like to take a rhyme book.'],
      ['কাল আমার দৌড় প্রতিযোগিতা, আব্বু, আমি চেষ্টা করব।', 'My race is tomorrow, Abbu, I will try.'],
      ['স্বাগতম, নীলা! আমার নাম তারা, চলো খেলি।', 'Welcome, Nila! My name is Tara, let us play.'],
    ],
  },
  'y-ft-food': {
    label: 'Family: Food & Kitchen',
    items: [
      ['আব্বু, চলো বাজারে যাই, আমি আম কিনতে চাই।', 'Abbu, let us go to the market, I want to buy mangoes.'],
      ['আম্মু, আমি সাহায্য করি, আমি আলু ধুয়ে দিচ্ছি।', 'Ammu, let me help, I am washing the potatoes.'],
      ['নানা, আসুন, ভাত তৈরি, আর ইলিশ মাছ আছে।', 'Nana, please come, the rice is ready, and there is hilsa fish.'],
      ['আস্তে আস্তে খাও, কারণ ইলিশ মাছে কাঁটা আছে।', 'Eat slowly, because hilsa fish has bones.'],
      ['আজ আমার জন্মদিন, আর আমি মিষ্টি আর কেক খাই।', 'It is my birthday today, and I eat sweets and cake.'],
      ['আজ খুব বৃষ্টি, আমার ক্ষুধা পেয়েছে, আম্মু।', 'It is raining hard today, I am hungry, Ammu.'],
    ],
  },
  'y-ft-prayer': {
    label: 'Family: Prayer & Ramadan',
    items: [
      ['আজ শুক্রবার, আমি অজু করে টুপি পরেছি।', 'It is Friday today, I have made wudu and put on my cap.'],
      ['আব্বু, চলো মসজিদে যাই, আমি দাদার সাথে যাব।', 'Abbu, let us go to the mosque, I will go with Dada.'],
      ['আজান হচ্ছে, আমি হাত-পা ধুয়ে আসি।', 'The call to prayer is sounding, I will go and wash my hands and feet.'],
      ['শোয়ার আগে দোয়া করো, আমিন, শুভ রাত্রি।', 'Say your dua before sleeping, ameen, good night.'],
      ['আম্মু, ইফতারের আগে আমি খেজুর নিয়ে আসি।', 'Ammu, before iftar I will bring the dates.'],
      ['ঈদের কেনাকাটা করি, আমি নীল জামা চাই।', 'Let us do the Eid shopping, I want a blue dress.'],
    ],
  },
  'y-ft-elders': {
    label: 'Family: Nana, Dada & Nani',
    items: [
      ['নানা, আপনি কেমন আছেন, আর আমি ভালো আছি।', 'Nana, how are you, and I am well.'],
      ['দাদা, আপনি আমার হাত ধরুন, আমরা রাস্তা পার হব।', 'Dada, hold my hand, we will cross the road.'],
      ['আগে ডানে-বাঁয়ে দেখি, তারপর আমরা রাস্তা পার হব।', 'First we look right and left, then we will cross the road.'],
      ['নানা, আমি আপনার চশমা খুঁজে দিচ্ছি।', 'Nana, I am finding your glasses for you.'],
      ['দাদা, আমি গ্রামে যেতে চাই, গ্রামে ধানক্ষেত আছে।', 'Dada, I want to go to the village, the village has rice fields.'],
      ['নানা, আমি আপনার ঘরে ঘুমাব, ধন্যবাদ, নানা!', 'Nana, I will sleep in your room, thank you, Nana!'],
    ],
  },
  'y-ft-play': {
    label: 'Family: Play & Outings',
    items: [
      ['রাফি, তুমি খেলবে, আমি আগে ব্যাট করব।', 'Rafi, will you play, I will bat first.'],
      ['আব্বু, আজ বাতাস ভালো, ঘুড়ি ওড়াই?', 'Abbu, the wind is good today, shall we fly the kite?'],
      ['বৃষ্টি থেমেছে, আমি ছাতা নিয়ে নৌকা ভাসাব।', 'The rain has stopped, I will take an umbrella and float my boat.'],
      ['আজ পহেলা বৈশাখ, আমি লাল বেলুন নেব।', 'It is Pohela Boishakh today, I will take a red balloon.'],
      ['আব্বু, আমি দোলনায় চড়ব, কিন্তু আস্তে।', 'Abbu, I will go on the swing, but gently.'],
      ['দেখুন আম্মু, বিড়াল ক্ষুধার্ত, আমি দুধ দেব।', 'Look, Ammu, the cat is hungry, I will give it milk.'],
    ],
  },
  'y-ft-care': {
    label: 'Family: Care & Manners',
    items: [
      ['নানি, অনুগ্রহ করে আমাকে একটু পানি দিন।', 'Nani, please give me a little water.'],
      ['আম্মু, দুঃখিত, আমি ভুল করেছি, আর আমি মিথ্যা বলব না।', 'Ammu, sorry, I made a mistake, and I will not tell lies.'],
      ['ডাক্তার সাহেব, আমার গলা ব্যথা, আমি ওষুধ খাব।', 'Doctor, my throat hurts, I will take the medicine.'],
      ['আঙুল কেটে গেছে, তাই আগে পানি দিয়ে ধুয়ে নাও।', 'Your finger is cut, so first wash it with water.'],
      ['আব্বু, কাল আম্মুর জন্মদিন, আমি কার্ড বানিয়েছি।', 'Abbu, tomorrow is Ammu’s birthday, I have made a card.'],
      ['ঘুমানোর সময় হয়েছে, দাঁত ব্রাশ করেছো, শুভ রাত্রি।', 'It is time to sleep, have you brushed your teeth, good night.'],
    ],
  },
  'y-numbers': {
    label: 'Numbers',
    items: [
      ['এক আর দুই তিন, আর তিন আর তিন ছয়।', 'One and two is three, and three and three is six.'],
      ['দুই আর দুই চার, আর চার আর চার আট।', 'Two and two is four, and four and four is eight.'],
      ['এক আর নয় দশ, আর পাঁচ আর পাঁচ দশ।', 'One and nine is ten, and five and five is ten.'],
      ['দুই আর তিন পাঁচ, আর চার আর তিন সাত।', 'Two and three is five, and four and three is seven.'],
      ['আট আর এক নয়, আর ছয় আর এক সাত।', 'Eight and one is nine, and six and one is seven.'],
      ['শূন্য আর এক এক, আর শূন্য আর দুই দুই।', 'Zero and one is one, and zero and two is two.'],
    ],
  },
  'y-colours': olderSuper['o-colours'],
  'y-animals': {
    label: 'Animals',
    items: [
      ['কুকুর আর বিড়াল, গরু আর ঘোড়া, হাতি আর বাঘ।', 'Dog and cat, cow and horse, elephant and tiger.'],
      ['সিংহ আর বানর, ছাগল আর হাঁস, মুরগি আর পাখি।', 'Lion and monkey, goat and duck, hen and bird.'],
      ['খরগোশ আর ভালুক, সাপ আর কচ্ছপ, ব্যাঙ আর মাছ।', 'Rabbit and bear, snake and tortoise, frog and fish.'],
      ['ময়ূর আর প্রজাপতি, ব্যাঙ আর মাছ, গরু আর ছাগল।', 'Peacock and butterfly, frog and fish, cow and goat.'],
      ['কুকুর আর বিড়াল, হাঁস আর মাছ, বাঘ আর হাতি।', 'Dog and cat, duck and fish, tiger and elephant.'],
      ['ময়ূর আর বানর, ভালুক আর সিংহ, সাপ আর ব্যাঙ।', 'Peacock and monkey, bear and lion, snake and frog.'],
    ],
  },
  'y-food': {
    label: 'Food & Drink',
    items: [
      ['আমি ভাত আর ডাল খাব, তুমি রুটি খাও।', 'I will eat rice and dal, you eat roti.'],
      ['আমি দুধ আর চিনি দিয়ে চা চাই।', 'I would like tea with milk and sugar.'],
      ['আজ আমি আম, কলা আর আপেল খাব।', 'Today I will eat mango, banana and apple.'],
      ['আঙুর আর তরমুজ খাব, আর পানি খাব।', 'I will eat grapes and watermelon, and drink water.'],
      ['আম্মু, আমার ডিম আর আলু চাই।', 'Ammu, I want egg and potato.'],
      ['আমি লেবু আর চিনি দিয়ে পানি খাব।', 'I will drink water with lemon and sugar.'],
    ],
  },
  'y-body': {
    label: 'My Body',
    items: [
      ['আমার মাথায় চুল, আর চোখ, নাক, কান আছে।', 'I have hair on my head, and eyes, a nose and ears.'],
      ['আমার মুখে জিভ আর দাঁত আছে।', 'I have a tongue and teeth in my mouth.'],
      ['আমার হাতে আঙুল আছে, আর পায়ে হাঁটু।', 'I have fingers on my hand, and knees on my legs.'],
      ['আমার পেট ব্যথা, আর আমার মাথা ব্যথা।', 'My tummy hurts, and my head hurts.'],
      ['আমি মুখ ধুয়ে দাঁত ব্রাশ করি।', 'I wash my face and brush my teeth.'],
      ['আমি হাত আর পা ধুয়ে আসি।', 'I wash my hands and feet and come.'],
    ],
  },
  'y-around': {
    label: 'Around Us',
    items: [
      ['আমার বাড়িতে দরজা, জানালা আর বিছানা আছে।', 'My house has a door, windows and a bed.'],
      ['আমার ব্যাগে বই আর কলম আছে।', 'My bag has a book and a pen.'],
      ['সূর্য, চাঁদ আর তারা, আর মেঘ আছে।', 'There are the sun, the moon and stars, and clouds.'],
      ['আমি গাড়িতে বাজারে যাই।', 'I go to the market by car.'],
      ['স্কুলে ঘড়ি আছে, আর বাড়িতে বিছানা আছে।', 'The school has a clock, and the house has a bed.'],
      ['আমার বই আর কলম স্কুলে নিয়ে যাই।', 'I take my book and pen to school.'],
    ],
  },
  'y-bd': {
    label: 'My Bangladesh',
    items: [
      ['বাংলাদেশের পতাকা সবুজ আর লাল।', 'The flag of Bangladesh is green and red.'],
      ['শাপলা আর দোয়েল, ইলিশ আর কাঁঠাল।', 'Shapla and doyel, hilsa and jackfruit.'],
      ['ইলিশ একটা মাছ, আর রিকশা একটা গাড়ি।', 'Hilsa is a fish, and a rickshaw is a vehicle.'],
      ['আমি নৌকায় যাব, আর রিকশায় যাব।', 'I will go by boat, and I will go by rickshaw.'],
      ['ধানক্ষেত, পুকুর আর আমগাছ বাংলাদেশে আছে।', 'Rice fields, ponds and mango trees are in Bangladesh.'],
      ['আব্বু, আমি বাংলাদেশের পতাকা চাই।', 'Abbu, I want a Bangladesh flag.'],
    ],
  },
  'y-hello': {
    label: 'Say Hello',
    items: [
      ['শুভ সকাল, আম্মু! কেমন আছো? আমি ভালো আছি।', 'Good morning, Ammu! How are you? I am well.'],
      ['স্বাগতম, নীলা! শুভ সকাল, আমার নাম তারা।', 'Welcome, Nila! Good morning, my name is Tara.'],
      ['শুভ রাত্রি, আব্বু! ধন্যবাদ, আমি ভালো আছি।', 'Good night, Abbu! Thank you, I am well.'],
      ['অনুগ্রহ করে একটু পানি দিন, ধন্যবাদ।', 'Please give me a little water, thank you.'],
      ['দুঃখিত, আম্মু, আমি ভুল করেছি, ধন্যবাদ।', 'Sorry, Ammu, I made a mistake, thank you.'],
      ['স্বাগতম, নানা! আপনি কেমন আছেন, আমি ভালো আছি।', 'Welcome, Nana! How are you, I am well.'],
    ],
  },
}
