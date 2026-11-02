// Extra short readings for the ages 5–7 picture books. For each page: two more simple lines under the same painting.
// chapters: { pageIndex: { bn, en } } marks where a chapter starts.
const l = (bn, roman, en) => ({ bn, roman, en })

export const youngMore = {
  'tara-morning': {
    chapters: { 0: { bn: 'সকাল', en: 'Morning' }, 3: { bn: 'স্কুলের পথে', en: 'On the way to school' } },
    pages: [
      [l('পাখি ডাকে।', 'pakhi dake.', 'The birds sing.'), l('তারা ঘুম থেকে ওঠে।', 'tara ghum theke othe.', 'Tara wakes up.')],
      [l('পানি ঠান্ডা।', 'pani thanda.', 'The water is cold.'), l('তারা সাবান নেয়।', 'tara saban ney.', 'Tara takes the soap.')],
      [l('আজ ডিম আর রুটি।', 'aj dim ar ruti.', 'Today it is egg and roti.'), l('তারা এক গ্লাস দুধ খায়।', 'tara ek glas dudh khay.', 'Tara drinks a glass of milk.')],
      [l('ব্যাগে বই আছে।', 'byage boi ache.', 'There are books in the bag.'), l('তারা জুতা পরে।', 'tara juta pore.', 'Tara puts on her shoes.')],
      [l('বাস হলুদ।', 'bas holud.', 'The bus is yellow.'), l('তারা জানালার পাশে বসে।', 'tara janalar pashe boshe.', 'Tara sits by the window.')],
      [l('স্কুলে বন্ধু আছে।', 'schule bondhu ache.', 'There are friends at school.'), l('তারা হাসে।', 'tara hashe.', 'Tara smiles.')],
    ],
  },
  'nana-village': {
    chapters: { 0: { bn: 'পথে', en: 'On the way' }, 3: { bn: 'নানার বাড়ি', en: "Nana's home" } },
    pages: [
      [l('নদীতে ঢেউ।', 'nodite dheu.', 'Waves on the river.'), l('আমরা নানার বাড়ি যাই।', 'amra nanar bari jai.', "We go to Nana's house.")],
      [l('ধান বড় হয়।', 'dhan boro hoy.', 'The rice grows tall.'), l('কৃষক মাঠে কাজ করেন।', 'krishok mathe kaj koren.', 'The farmer works in the field.')],
      [l('হাঁস প্যাক প্যাক করে।', 'hash pyak pyak kore.', 'The ducks say quack quack.'), l('পুকুরে মাছ আছে।', 'pukure mach ache.', 'There are fish in the pond.')],
      [l('আম হলুদ।', 'am holud.', 'The mangoes are yellow.'), l('তারা আম খায়।', 'tara am khay.', 'Tara eats a mango.')],
      [l('গরু ঘাস খায়।', 'goru ghash khay.', 'The cow eats grass.'), l('পাখি আকাশে ওড়ে।', 'pakhi akashe ore.', 'A bird flies in the sky.')],
      [l('আকাশ লাল।', 'akash lal.', 'The sky is red.'), l('নানা গল্প বলেন।', 'nana golpo bolen.', 'Nana tells a story.')],
    ],
  },
  'rainy-day': {
    chapters: { 0: { bn: 'মেঘ ও বৃষ্টি', en: 'Clouds and rain' }, 3: { bn: 'খেলা', en: 'Play' } },
    pages: [
      [l('মেঘ কালো।', 'megh kalo.', 'The clouds are dark.'), l('বাতাস বয়।', 'batash boy.', 'The wind blows.')],
      [l('টপ টপ বৃষ্টি।', 'top top brishti.', 'Drip drop, the rain.'), l('আমি বৃষ্টি দেখি।', 'ami brishti dekhi.', 'I watch the rain.')],
      [l('ছাতা লাল।', 'chhata lal.', 'The umbrella is red.'), l('আমি ভিজি না।', 'ami bhiji na.', 'I do not get wet.')],
      [l('আমি লাফ দিই।', 'ami laf dii.', 'I jump.'), l('পানি ছিটকে যায়।', 'pani chhitke jay.', 'The water splashes.')],
      [l('নৌকা ভাসে।', 'nouka bhashe.', 'The boat floats.'), l('নৌকা দূরে যায়।', 'nouka dure jay.', 'The boat goes far away.')],
      [l('রংধনুতে অনেক রং।', 'rongdhonute onek rong.', 'A rainbow has many colours.'), l('বৃষ্টি থেমে গেছে।', 'brishti themey gechhe.', 'The rain has stopped.')],
    ],
  },
  'my-animals': {
    chapters: { 0: { bn: 'ঘরের পশু', en: 'Animals at home' }, 2: { bn: 'বড় পশু', en: 'Big animals' }, 4: { bn: 'পাখি ও মাছ', en: 'Birds and fish' } },
    pages: [
      [l('কুকুর দৌড়ায়।', 'kukur dourae.', 'The dog runs.'), l('বিড়াল দুধ খায়।', 'biral dudh khay.', 'The cat drinks milk.')],
      [l('গরু দুধ দেয়।', 'goru dudh dey.', 'The cow gives milk.'), l('ছাগল ঘাস খায়।', 'chhagol ghash khay.', 'The goat eats grass.')],
      [l('হাতির শুঁড় লম্বা।', 'hatir shũr lomba.', "The elephant's trunk is long."), l('হাতি পানি খায়।', 'hati pani khay.', 'The elephant drinks water.')],
      [l('বানর কলা খায়।', 'banor kola khay.', 'The monkey eats a banana.'), l('বানর লাফ দেয়।', 'banor laf dey.', 'The monkey jumps.')],
      [l('ময়ূরের পালক সুন্দর।', 'moyurer palok shundor.', "The peacock's feathers are beautiful."), l('বৃষ্টি এলে ময়ূর নাচে।', 'brishti ele moyur nache.', 'When the rain comes, the peacock dances.')],
      [l('মাছ সাঁতার কাটে।', 'mach shãtar kate.', 'The fish swim.'), l('মাছ ছোট ছোট।', 'mach chhoto chhoto.', 'The fish are tiny.')],
    ],
  },
  'at-market': {
    chapters: { 0: { bn: 'বাজারে', en: 'At the market' }, 3: { bn: 'কেনাকাটা', en: 'Shopping' } },
    pages: [
      [l('আব্বু আমার হাত ধরেন।', 'abbu amar hat dhoren.', 'Abbu holds my hand.'), l('বাজারে অনেক লোক।', 'bajare onek lok.', 'There are many people at the market.')],
      [l('আম মিষ্টি।', 'am mishti.', 'The mangoes are sweet.'), l('দোকানদার আম দেন।', 'dokandar am den.', 'The shopkeeper gives mangoes.')],
      [l('মাছ তাজা।', 'mach taja.', 'The fish is fresh.'), l('দাম কত?', 'dam koto?', 'What is the price?')],
      [l('আব্বু টাকা দেন।', 'abbu taka den.', 'Abbu gives the money.'), l('দোকানদার হাসেন।', 'dokandar hashen.', 'The shopkeeper smiles.')],
      [l('ব্যাগে আপেল আছে।', 'byage apel ache.', 'There are apples in the bag.'), l('ব্যাগে কলাও আছে।', 'byage kolao ache.', 'There are bananas too.')],
      [l('আম্মু অপেক্ষা করেন।', 'ammu opekkha koren.', 'Ammu is waiting.'), l('আজ মজার দিন।', 'aj mojar din.', 'Today was a fun day.')],
    ],
  },
  'eid-morning': {
    chapters: { 0: { bn: 'ঈদের সকাল', en: 'Eid morning' }, 3: { bn: 'আনন্দের দিন', en: 'A day of joy' } },
    pages: [
      [l('চাঁদ উঠেছে।', 'chãd uthechhe.', 'The moon has risen.'), l('সবাই খুশি।', 'shobai khushi.', 'Everyone is happy.')],
      [l('জামা সুন্দর।', 'jama shundor.', 'The dress is beautiful.'), l('আমি জামা পরি।', 'ami jama pori.', 'I put on the dress.')],
      [l('আব্বু আর ভাইয়া সাথে যান।', 'abbu ar bhaiya sathe jan.', 'Abbu and Bhaiya come along.'), l('মসজিদে অনেক মানুষ।', 'moshjide onek manush.', 'Many people are at the mosque.')],
      [l('সবাই বলে, ঈদ মুবারক।', 'shobai bole, id mubarak.', 'Everyone says, Eid Mubarak.'), l('আমি আব্বুকে জড়িয়ে ধরি।', 'ami abbuke joriye dhori.', 'I hug Abbu.')],
      [l('আম্মু পায়েস রান্না করেন।', 'ammu payesh ranna koren.', 'Ammu cooks payesh.'), l('আমরা সবাই একসাথে খাই।', 'amra shobai ekshathe khai.', 'We all eat together.')],
      [l('আমি খুব খুশি।', 'ami khub khushi.', 'I am very happy.'), l('আমি বেলুন কিনব।', 'ami belun kinbo.', 'I will buy a balloon.')],
    ],
  },
}
