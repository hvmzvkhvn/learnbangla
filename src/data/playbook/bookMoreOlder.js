// Extra readings for the ages 8–15 picture books. For each page: two more sentences under the same painting.
const l = (bn, roman, en) => ({ bn, roman, en })

export const olderMore = {
  'dhaka-rickshaw': {
    chapters: { 0: { bn: 'শহরে', en: 'In the city' }, 2: { bn: 'রিকশার পথে', en: 'On the rickshaw' }, 5: { bn: 'বাড়ি ফেরা', en: 'Going home' } },
    pages: [
      [l('এখানে অনেক মানুষ থাকে।', 'ekhane onek manush thake.', 'Many people live here.'), l('রাস্তায় সারাদিন গাড়ি চলে।', 'rastay sharadin gari chole.', 'Cars run on the road all day.')],
      [l('রিকশাগুলো রঙিন।', 'rikshagulo rongin.', 'The rickshaws are colourful.'), l('প্রত্যেক রিকশার পেছনে একটা ছবি আঁকা।', 'protteyk rikshar pechhone ekta chhobi anka.', 'Every rickshaw has a picture painted on the back.')],
      [l('আব্বু বলেন, আমরা গুলশান যাব।', 'abbu bolen, amra gulshan jabo.', 'Abbu says, we will go to Gulshan.'), l('আমি শক্ত করে ধরে বসি।', 'ami shokto kore dhore boshi.', 'I sit and hold on tight.')],
      [l('তাঁর পা খুব শক্ত।', 'tãr pa khub shokto.', 'His legs are very strong.'), l('তিনি রোজ অনেক পথ চালান।', 'tini roj onek poth chalan.', 'He pedals a long way every day.')],
      [l('বাজারে অনেক আম আর মাছ।', 'bajare onek am ar mach.', 'The market has many mangoes and fish.'), l('লোকেরা দরদাম করে।', 'lokera dorodam kore.', 'People bargain over prices.')],
      [l('মামা বলেন, ত্রিশ টাকা।', 'mama bolen, trish taka.', 'The rickshaw-puller says, thirty taka.'), l('আব্বু টাকা দেন।', 'abbu taka den.', 'Abbu gives the money.')],
      [l('মামা হাসেন।', 'mama hashen.', 'He smiles.'), l('আমরা বাড়ি ঢুকি।', 'amra bari dhuki.', 'We go inside the house.')],
    ],
  },
  'boishakh-fair': {
    chapters: { 0: { bn: 'নতুন বছর', en: 'The new year' }, 2: { bn: 'মেলায়', en: 'At the fair' }, 5: { bn: 'দিনের শেষে', en: 'The end of the day' } },
    pages: [
      [l('এটা বাংলা নতুন বছরের প্রথম দিন।', 'eta bangla notun bochhorer prothom din.', 'It is the first day of the Bengali new year.'), l('সবাই সকালে উঠে পড়ে।', 'shobai shokale uthe pore.', 'Everyone gets up early.')],
      [l('মেয়েরা লাল-সাদা শাড়ি পরে।', 'meyera lal-shada shari pore.', 'The girls and women wear red and white sarees.'), l('ছেলেরা পাঞ্জাবি পরে।', 'chhelera panjabi pore.', 'The boys and men wear panjabis.')],
      [l('রাস্তায় অনেক মানুষ হাঁটে।', 'rastay onek manush hãte.', 'Many people walk in the street.'), l('মেলায় গান আর নাচ হয়।', 'melay gan ar nach hoy.', 'There are songs and dances at the fair.')],
      [l('দোকানে মাটির হাঁড়ি আর খেলনা।', 'dokane matir hãri ar khelna.', 'The stalls have clay pots and toys.'), l('একজন বাঁশি বাজায়।', 'ekjon banshi bajay.', 'A man plays the flute.')],
      [l('আমি বেলুন উড়াই।', 'ami belun urai.', 'I let the balloon fly.'), l('বেলুন আকাশের দিকে ওঠে।', 'belun akasher dike othe.', 'The balloon rises toward the sky.')],
      [l('জিলাপি মিষ্টি আর মচমচে।', 'jilapi mishti ar mochmoche.', 'The jilapi is sweet and crunchy.'), l('ঐ দিন অনেকে পান্তা ইলিশ খায়।', 'oi din oneke panta ilish khay.', 'On that day many people eat panta bhat with hilsa.')],
      [l('সবাই একে অপরকে শুভেচ্ছা জানায়।', 'shobai eke oporke shubhechchha janay.', 'Everyone wishes each other well.'), l('আমি নতুন বছরে খুব ভালো করে পড়ব।', 'ami notun bochhore khub bhalo kore porbo.', 'In the new year I will study very hard.')],
    ],
  },
  'hilsa-river': {
    chapters: { 0: { bn: 'ভোরের নদী', en: 'The river at dawn' }, 3: { bn: 'ইলিশের কথা', en: 'About hilsa' }, 5: { bn: 'আমাদের মাছ', en: 'Our fish' } },
    pages: [
      [l('সূর্য ওঠার আগে জেলেরা বের হন।', 'shurjo othar age jelera ber hon.', 'The fishers set out before sunrise.'), l('নদী শান্ত।', 'nodi shanto.', 'The river is calm.')],
      [l('তাঁরা হাতে জাল ছড়ান।', 'tãra hate jal chhoran.', 'They spread the net by hand.'), l('জাল পানিতে ডুবে যায়।', 'jal panite dube jay.', 'The net sinks into the water.')],
      [l('জাল ভারী হয়।', 'jal bhari hoy.', 'The net grows heavy.'), l('জেলেরা খুশি হন।', 'jelera khushi hon.', 'The fishers are happy.')],
      [l('ইলিশ সমুদ্র থেকে নদীতে আসে।', 'ilish shomudro theke nodite ashe.', 'Hilsa come from the sea into the rivers.'), l('ডিম পাড়ার জন্য তারা অনেক দূর সাঁতরায়।', 'dim parar jonno tara onek dur shãtray.', 'They swim a long way to lay their eggs.')],
      [l('বর্ষায় ইলিশ বেশি পাওয়া যায়।', 'borshay ilish beshi paoa jay.', 'Most hilsa are found in the rainy season.'), l('মানুষ ইলিশ কিনতে ভিড় করে।', 'manush ilish kinte bhir kore.', 'People crowd in to buy hilsa.')],
      [l('ইলিশের গন্ধ খুব ভালো।', 'ilisher gondho khub bhalo.', 'Hilsa smells wonderful.'), l('আমরা ভাতের সাথে ইলিশ খাই।', 'amra bhater sathe ilish khai.', 'We eat hilsa with rice.')],
      [l('ইলিশ আমাদের গর্ব।', 'ilish amader gorbo.', 'Hilsa is our pride.'), l('আমাদের নদীগুলো ইলিশকে বাঁচিয়ে রাখে।', 'amader nodigulo ilishke banchiye rakhe.', 'Our rivers keep the hilsa alive.')],
    ],
  },
  'dada-village': {
    chapters: { 0: { bn: 'গ্রামের পথে', en: 'On the way to the village' }, 3: { bn: 'দাদার সাথে', en: 'With Dada' }, 5: { bn: 'সন্ধ্যা', en: 'Evening' } },
    pages: [
      [l('আমরা লঞ্চে করে যাই।', 'amra lonche kore jai.', 'We travel by launch.'), l('নদীর দুই পাশে সবুজ গাছ।', 'nodir dui pashe shobuj gachh.', 'There are green trees on both sides of the river.')],
      [l('ধান পাকলে মাঠ সোনালি হয়।', 'dhan pakle math shonali hoy.', 'When the rice ripens, the field turns golden.'), l('কৃষকেরা ধান কাটেন।', 'krishokera dhan katen.', 'The farmers cut the rice.')],
      [l('পুকুরের পানি পরিষ্কার।', 'pukurer pani porishkar.', 'The pond water is clear.'), l('আমিও সাঁতার শিখব।', 'amio shãtar shikhbo.', 'I will learn to swim too.')],
      [l('গাছের ছায়া ঠান্ডা।', 'gachher chhaya thanda.', "The tree's shade is cool."), l('দাদা মাথায় গামছা বাঁধেন।', 'dada mathay gamchha bãdhen.', 'Dada ties a gamchha around his head.')],
      [l('তিনি একটা রাজার গল্প বলেন।', 'tini ekta rajar golpo bolen.', 'He tells a story about a king.'), l('আমি মন দিয়ে শুনি।', 'ami mon diye shuni.', 'I listen carefully.')],
      [l('আকাশে অনেক তারা।', 'akashe onek tara.', 'There are many stars in the sky.'), l('দূরে শিয়াল ডাকে।', 'dure shiyal dake.', 'A jackal calls in the distance.')],
      [l('আমি আবার আসব।', 'ami abar ashbo.', 'I will come again.'), l('দাদা আমার মাথায় হাত রাখেন।', 'dada amar mathay hat rakhen.', 'Dada rests his hand on my head.')],
    ],
  },
  'our-school': {
    chapters: { 0: { bn: 'সকালের স্কুল', en: 'School in the morning' }, 3: { bn: 'পড়া ও খেলা', en: 'Study and play' }, 5: { bn: 'ছুটির পরে', en: 'After school' } },
    pages: [
      [l('আমার স্কুলে অনেক গাছ আছে।', 'amar schule onek gachh ache.', 'My school has many trees.'), l('ঘণ্টা বাজে।', 'ghonta baje.', 'The bell rings.')],
      [l('আমরা উঠে দাঁড়াই।', 'amra uthe darai.', 'We stand up.'), l('শিক্ষক হাসেন।', 'shikkhok hashen.', 'The teacher smiles.')],
      [l('আজ বাংলা পড়া।', 'aj bangla pora.', 'Today is a Bangla lesson.'), l('শিক্ষক বোর্ডে লেখেন।', 'shikkhok borde lekhen.', 'The teacher writes on the board.')],
      [l('আমি সুন্দর করে লিখি।', 'ami shundor kore likhi.', 'I write neatly.'), l('আমার কলম নীল।', 'amar kolom nil.', 'My pen is blue.')],
      [l('আমরা ফুটবল খেলি।', 'amra futbol kheli.', 'We play football.'), l('আমার বন্ধু গোল করে।', 'amar bondhu gol kore.', 'My friend scores a goal.')],
      [l('ছুটির ঘণ্টা বাজে।', 'chhutir ghonta baje.', 'The home-time bell rings.'), l('সবাই হইচই করে বের হয়।', 'shobai hoichoi kore ber hoy.', 'Everyone rushes out noisily.')],
      [l('বাড়িতে আম্মু আছেন।', 'barite ammu achhen.', 'Ammu is at home.'), l('আমি আজ যা শিখেছি, তাঁকে বলি।', 'ami aj ja shikhechhi, tãke boli.', 'I tell her what I learnt today.')],
    ],
  },
  'coxs-bazar': {
    chapters: { 0: { bn: 'যাত্রা', en: 'The journey' }, 2: { bn: 'সমুদ্রের ধারে', en: 'By the sea' }, 5: { bn: 'সূর্যাস্ত', en: 'Sunset' } },
    pages: [
      [l('আমরা সারা রাত বাসে থাকি।', 'amra shara rat base thaki.', 'We spend all night on the bus.'), l('সকালে সমুদ্রের হাওয়া পাই।', 'shokale shomudrer haoa pai.', 'In the morning we feel the sea breeze.')],
      [l('বালি নরম আর ঠান্ডা।', 'bali norom ar thanda.', 'The sand is soft and cool.'), l('নারকেল গাছ বাতাসে দোলে।', 'narkel gachh batashe dole.', 'Coconut trees sway in the breeze.')],
      [l('ঢেউ আসে আর যায়।', 'dheu ashe ar jay.', 'Waves come and go.'), l('আমি একটু ভয় পাই।', 'ami ektu bhoy pai.', 'I feel a little afraid.')],
      [l('আমি একটা সুন্দর ঝিনুক পাই।', 'ami ekta shundor jhinuk pai.', 'I find a beautiful shell.'), l('একটা কাঁকড়া দৌড়ে পালায়।', 'ekta kãkra dourey palay.', 'A crab scuttles away.')],
      [l('আব্বু আমার হাত ধরে থাকেন।', 'abbu amar hat dhore thaken.', 'Abbu keeps holding my hand.'), l('আমরা সবাই হাসি।', 'amra shobai hashi.', 'We all laugh.')],
      [l('আকাশ কমলা রঙের হয়।', 'akash komola ronger hoy.', 'The sky turns orange.'), l('সবাই চুপ করে তাকিয়ে থাকে।', 'shobai chup kore takiye thake.', 'Everyone watches in silence.')],
      [l('সমুদ্র আমাকে ডাকে।', 'shomudro amake dake.', 'The sea calls me.'), l('আমি ঝিনুকটা ঘরে নিয়ে যাই।', 'ami jhinukta ghore niye jai.', 'I take the shell home.')],
    ],
  },
}
