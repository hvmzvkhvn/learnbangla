// Explore Bangladesh — the eight divisions, for the 13–15, 16–18 and 18+ tracks.
//
// Every region follows the same card: Famous for · Then · Now · Made here · 4 cities.
// English leads (hook, history, recent) and a short Bangla line follows each part, so learners read real Bangla in context.
// Facts are kept few and checkable; recent developments carry the year. Bangla is reviewed on /review like everything else.
const S = (bn, roman, en) => ({ bn, roman, en })
const F = (emoji, line) => ({ emoji, ...line })
const W = (bn, roman, en, emoji) => ({ bn, roman, en, emoji })
const city = (id, name, bn, roman, emoji, lon, lat, fact, line, words) => ({ id, name, bn, roman, emoji, lon, lat, fact, line, words })

export const exploreRegions = [
  // ------------------------------------------------------------------------------------------------ Dhaka
  {
    id: 'dhaka', name: 'Dhaka', bn: 'ঢাকা', roman: 'Dhaka', emoji: '🏙️', color: '#E8A23A', unlock: 0,
    hook: 'One of the most crowded and colourful cities on Earth. Rickshaws jingle through lanes older than the country itself, and around ten million people share its streets. It has been a capital for more than four hundred years.',
    intro: S('ঢাকা আমাদের রাজধানী।', 'dhaka amader rajdhani.', 'Dhaka is our capital.'),
    famous: [
      F('🛺', S('ঢাকা রিকশার শহর।', 'dhaka rikshar shohor.', 'Dhaka is the city of rickshaws.')),
      F('🏯', S('পুরান ঢাকায় লালবাগ কেল্লা আছে।', 'puran dhakay lalbag kella ache.', 'Old Dhaka has the Lalbagh Fort.')),
      F('🕊️', S('শহীদ মিনার ভাষার কথা মনে করায়।', 'shohid minar bhashar kotha mone koray.', 'The Shaheed Minar reminds us of the language movement.')),
    ],
    then: {
      en: 'In 1610 the Mughals made Dhaka the capital of Bengal and named it Jahangirnagar. Merchants came for its fine muslin cloth, and the Buriganga river was its main road.',
      line: S('১৬১০ সালে ঢাকা বাংলার রাজধানী হয়।', 'solosho dosh sale dhaka banglar rajdhani hoy.', 'In 1610 Dhaka became the capital of Bengal.'),
    },
    now: {
      en: 'Today Dhaka is the centre of government, universities, banks and the garment trade. The Metro Rail, opened in 2022, now lifts thousands of commuters above the traffic.',
      line: S('ঢাকায় এখন মেট্রো রেল চলে।', 'dhakay ekhon metro rel chole.', 'Now the metro rail runs in Dhaka.'),
    },
    made: [
      F('👕', S('ঢাকার কারখানায় তৈরি পোশাক হয়।', 'dhakar karkhanay toiri poshak hoy.', 'Ready-made clothes are made in the factories of Dhaka.')),
      F('🧵', S('জামদানি শাড়ি হাতে বোনা হয়।', 'jamdani shari hate bona hoy.', 'Jamdani sarees are woven by hand.')),
      F('🍛', S('কাচ্চি বিরিয়ানি ঢাকার বিখ্যাত খাবার।', 'kachchi biriyani dhakar bikkhato khabar.', 'Kachchi biryani is a famous food of Dhaka.')),
    ],
    timeline: [
      ['1610', 'The Mughals make Dhaka their provincial capital, Jahangirnagar.'],
      ['1905', 'Dhaka becomes the capital of the new province of Eastern Bengal and Assam (reversed in 1911).'],
      ['1952', 'On 21 February students and others are shot while demanding Bangla as a state language.'],
      ['1971', 'Dhaka becomes the capital of an independent Bangladesh on 16 December.'],
      ['2022', 'Dhaka Metro Rail begins service; the Padma Bridge opens the south-west to the capital.'],
    ],
    economy: 'Dhaka and the districts around it produce a large share of national output. Ready-made garments make up around four-fifths of Bangladesh\'s exports, and the factories cluster in Dhaka, Gazipur and Narayanganj.',
    cities: [
      city('dhaka', 'Dhaka', 'ঢাকা', 'dhaka', '🏙️', 90.41, 23.81, 'Capital since 1971, and a Mughal capital four centuries earlier.', S('ঢাকা বড় শহর।', 'dhaka boro shohor.', 'Dhaka is a big city.'), [
        W('রাজধানী', 'rajdhani', 'capital', '🏛️'), W('রিকশা', 'riksha', 'rickshaw', '🛺'), W('মেট্রো', 'metro', 'metro', '🚇')]),
      city('narayanganj', 'Narayanganj', 'নারায়ণগঞ্জ', 'narayanganj', '🚢', 90.50, 23.62, 'A river port on the Shitalakshya, once nicknamed the "Dundee of the East" for its jute trade.', S('নারায়ণগঞ্জ নদীর বন্দর।', 'narayanganj nodir bondor.', 'Narayanganj is a river port.'), [
        W('বন্দর', 'bondor', 'port', '⚓'), W('পাট', 'pat', 'jute', '🌿'), W('লঞ্চ', 'lonch', 'river launch (boat)', '🚢')]),
      city('gazipur', 'Gazipur', 'গাজীপুর', 'gazipur', '🏭', 90.42, 24.00, 'Factories and forest side by side: a garment hub close to Bhawal National Park.', S('গাজীপুরে অনেক কারখানা আছে।', 'gazipure onek karkhana ache.', 'Gazipur has many factories.'), [
        W('কারখানা', 'karkhana', 'factory', '🏭'), W('শ্রমিক', 'shromik', 'worker', '👷'), W('শাল', 'shal', 'sal tree', '🌳')]),
      city('tangail', 'Tangail', 'টাঙ্গাইল', 'tangail', '🥻', 89.92, 24.25, 'Known for hand-woven Tangail sarees, and for the long Jamuna Bridge near its edge.', S('টাঙ্গাইলের শাড়ি বিখ্যাত।', 'tangailer shari bikkhato.', 'The sarees of Tangail are famous.'), [
        W('শাড়ি', 'shari', 'saree', '🥻'), W('তাঁত', 'tãt', 'handloom', '🧵'), W('সুতা', 'shuta', 'thread', '🪡')]),
    ],
  },
  // ------------------------------------------------------------------------------------------------ Chattogram
  {
    id: 'chattogram', name: 'Chattogram', bn: 'চট্টগ্রাম', roman: 'chottogram', emoji: '⚓', color: '#2F7FB5', unlock: 0,
    hook: 'Where the hills meet the sea. Chattogram is Bangladesh\'s great port, and just inland rise green hills where many different peoples live. Further south is Cox\'s Bazar, one of the longest unbroken sea beaches in the world.',
    intro: S('চট্টগ্রাম আমাদের বন্দর শহর।', 'chottogram amader bondor shohor.', 'Chattogram is our port city.'),
    famous: [
      F('⛱️', S('কক্সবাজারে লম্বা সমুদ্র সৈকত আছে।', 'cox bazare lomba shomudro soikot ache.', 'Cox\'s Bazar has a long sea beach.')),
      F('🏔️', S('চট্টগ্রামে সুন্দর পাহাড় আছে।', 'chottograme shundor pahar ache.', 'Chattogram has beautiful hills.')),
      F('⚓', S('এখানে দেশের বড় বন্দর।', 'ekhane desher boro bondor.', 'The country\'s big port is here.')),
    ],
    then: {
      en: 'Arab and Portuguese traders sailed here for centuries; the Portuguese called it Porto Grande, the "great port". On 26 March 1971 the declaration of independence was first broadcast from a radio station in Chattogram.',
      line: S('১৯৭১ সালে চট্টগ্রাম থেকে স্বাধীনতার ঘোষণা প্রচার হয়।', 'unish sho ekattor sale chottogram theke shadhinotar ghoshona procharito hoy.', 'In 1971 the declaration of independence was broadcast from Chattogram.'),
    },
    now: {
      en: 'The Karnaphuli tunnel, one of South Asia\'s first road tunnels under a river, opened to traffic in 2023. The port keeps growing as Bangladesh trades more with the world.',
      line: S('কর্ণফুলী নদীর নিচে সুড়ঙ্গ আছে।', 'kornofuli nodir niche shurongo ache.', 'There is a tunnel under the Karnaphuli river.'),
    },
    made: [
      F('🧂', S('কক্সবাজারে লবণ তৈরি হয়।', 'cox bazare lobon toiri hoy.', 'Salt is made in Cox\'s Bazar.')),
      F('🐟', S('সমুদ্রের মাছ শুঁটকি হয়।', 'shomudrer mach shutki hoy.', 'Sea fish becomes dried fish.')),
      F('🍵', S('চট্টগ্রামে চা বাগান আছে।', 'chottograme cha bagan ache.', 'Chattogram has tea gardens.')),
    ],
    timeline: [
      ['16th c.', 'Portuguese traders settle at the port they call Porto Grande.'],
      ['1666', 'The Mughals take Chittagong from the Arakan kingdom.'],
      ['1760', 'The city passes to the British East India Company.'],
      ['1971', 'The declaration of independence is broadcast from Chattogram on 26 March.'],
      ['2023', 'The Karnaphuli river tunnel opens to traffic.'],
    ],
    economy: 'Chattogram port handles the great majority of Bangladesh\'s seaborne trade. Around it grew steel, cement, shipping and export-processing zones, while Cox\'s Bazar earns from tourism and salt.',
    cities: [
      city('chattogram', 'Chattogram', 'চট্টগ্রাম', 'chottogram', '⚓', 91.78, 22.36, 'The commercial capital and the main seaport.', S('চট্টগ্রাম বড় বন্দর।', 'chottogram boro bondor.', 'Chattogram is a big port.'), [
        W('জাহাজ', 'jahaj', 'ship', '🚢'), W('সমুদ্র', 'shomudro', 'sea', '🌊'), W('পাহাড়', 'pahar', 'hill', '⛰️')]),
      city('cumilla', 'Cumilla', 'কুমিল্লা', 'kumilla', '🏛️', 91.18, 23.46, 'Home to the Mainamati Buddhist ruins, over a thousand years old, and to the famous rasmalai sweet.', S('কুমিল্লার রসমালাই বিখ্যাত।', 'kumillar rosomalai bikkhato.', 'The rasmalai of Cumilla is famous.'), [
        W('মিষ্টি', 'mishti', 'sweet', '🍬'), W('বিহার', 'bihar', 'Buddhist monastery', '🛕'), W('প্রাচীন', 'prachin', 'ancient', '🏺')]),
      city('coxsbazar', "Cox's Bazar", 'কক্সবাজার', 'cox bazar', '⛱️', 91.98, 21.43, 'A beach town on about 120 km of sand, with sunsets over the Bay of Bengal.', S('কক্সবাজারে সুন্দর সৈকত আছে।', 'cox bazare shundor soikot ache.', 'Cox\'s Bazar has a beautiful beach.'), [
        W('সৈকত', 'soikot', 'beach', '🏖️'), W('ঢেউ', 'dheu', 'wave', '🌊'), W('ঝিনুক', 'jhinuk', 'shell', '🐚')]),
      city('rangamati', 'Rangamati', 'রাঙামাটি', 'rangamati', '🏞️', 92.17, 22.65, 'A lake town in the Chittagong Hill Tracts beside Kaptai Lake, made when the Karnaphuli was dammed in 1961.', S('রাঙামাটিতে বড় হ্রদ আছে।', 'rangamatite boro hrod ache.', 'Rangamati has a big lake.'), [
        W('হ্রদ', 'hrod', 'lake', '🏞️'), W('বাঁশ', 'bãsh', 'bamboo', '🎋'), W('সবুজ', 'shobuj', 'green', '🟢')]),
    ],
  },
  // ------------------------------------------------------------------------------------------------ Sylhet
  {
    id: 'sylhet', name: 'Sylhet', bn: 'সিলেট', roman: 'silet', emoji: '🍃', color: '#3E9B5F', unlock: 0,
    hook: 'Green carpets of tea, mist on the hills, and wetlands that turn into inland seas in the monsoon. Sylhet is also the family home of most British Bangladeshis, so a piece of Sylhet lives in London too.',
    intro: S('সিলেট চায়ের দেশ।', 'silet chayer desh.', 'Sylhet is a land of tea.'),
    famous: [
      F('🍵', S('সিলেটে অনেক চা বাগান আছে।', 'silete onek cha bagan ache.', 'Sylhet has many tea gardens.')),
      F('🌊', S('বর্ষায় হাওর সমুদ্রের মতো হয়।', 'borshay haor shomudrer moto hoy.', 'In the rains the haor becomes like a sea.')),
      F('🕌', S('শাহজালালের মাজার সিলেটে।', 'shahjalaler mazar silete.', 'The shrine of Shah Jalal is in Sylhet.')),
    ],
    then: {
      en: 'In the 14th century the Sufi saint Shah Jalal came to Sylhet, and his shrine is still visited by thousands. Later, Sylheti sailors worked on British ships and settled in London, starting a migration that continues today.',
      line: S('শাহজালাল সিলেটে এসেছিলেন।', 'shahjalal silete eshechhilen.', 'Shah Jalal came to Sylhet.'),
    },
    now: {
      en: 'Sylhet\'s gas fields feed homes and fertiliser factories, and money sent home by families abroad has built new neighbourhoods. The haors and the Ratargul swamp forest draw visitors who love nature.',
      line: S('সিলেটে গ্যাস পাওয়া যায়।', 'silete gyash paoa jay.', 'Gas is found in Sylhet.'),
    },
    made: [
      F('🍵', S('সিলেটের চা দেশে-বিদেশে যায়।', 'sileter cha deshe bideshe jay.', 'Sylhet\'s tea goes across the country and abroad.')),
      F('🔥', S('সিলেটের গ্যাসে বিদ্যুৎ হয়।', 'sileter gyashe biddhut hoy.', 'Electricity is made from Sylhet\'s gas.')),
      F('🍋', S('শাতকরা সিলেটের বিখ্যাত ফল।', 'shatkora sileter bikkhato fol.', 'Shatkora is a famous fruit of Sylhet.')),
    ],
    timeline: [
      ['14th c.', 'The Sufi saint Shah Jalal arrives and Sylhet becomes a centre of Islam in Bengal.'],
      ['1874', 'Sylhet is placed inside the province of Assam.'],
      ['1947', 'A referendum in July decides that Sylhet will join East Bengal (Pakistan) rather than stay in Assam.'],
      ['1950s–70s', 'Migration to Britain grows; today most British Bangladeshis trace their roots to Sylhet.'],
    ],
    economy: 'Tea (over a hundred estates), natural gas — Bibiyana in Habiganj is the country\'s largest field — and remittances from the diaspora drive the economy of the region.',
    cities: [
      city('sylhet', 'Sylhet', 'সিলেট', 'silet', '🕌', 91.87, 24.90, 'Shah Jalal\'s city, and the gateway to Jaflong and the Ratargul swamp forest.', S('সিলেট সুন্দর শহর।', 'silet shundor shohor.', 'Sylhet is a beautiful city.'), [
        W('মাজার', 'mazar', 'shrine', '🕌'), W('টিলা', 'tila', 'small hill', '🏞️'), W('জঙ্গল', 'jongol', 'jungle', '🌴')]),
      city('moulvibazar', 'Moulvibazar', 'মৌলভীবাজার', 'moulvibazar', '🍵', 91.77, 24.48, 'The tea capital: Sreemangal, in this district, is famous for seven-layer tea and the Lawachara forest.', S('শ্রীমঙ্গলে সাত রঙের চা পাওয়া যায়।', 'shrimongole shat ronger cha paoa jay.', 'Seven-colour tea is found in Sreemangal.'), [
        W('বাগান', 'bagan', 'garden', '🌿'), W('পাতা', 'pata', 'leaf', '🍃'), W('রং', 'rong', 'colour', '🎨')]),
      city('sunamganj', 'Sunamganj', 'সুনামগঞ্জ', 'sunamganj', '🦆', 91.40, 25.07, 'A town of wetlands: Tanguar Haor is a protected wetland where thousands of migratory birds spend the winter.', S('সুনামগঞ্জে হাওর আছে।', 'sunamganje haor ache.', 'Sunamganj has a haor.'), [
        W('হাওর', 'haor', 'wetland basin', '🌊'), W('পাখি', 'pakhi', 'bird', '🐦'), W('শীত', 'shit', 'winter', '❄️')]),
      city('habiganj', 'Habiganj', 'হবিগঞ্জ', 'hobiganj', '🔥', 91.42, 24.38, 'Home to Bibiyana, Bangladesh\'s biggest gas field, and to Satchari National Park.', S('হবিগঞ্জে গ্যাসের খনি আছে।', 'hobiganje gyasher khoni ache.', 'Habiganj has a gas field.'), [
        W('গ্যাস', 'gyash', 'gas', '🔥'), W('খনি', 'khoni', 'mine / field', '⛏️'), W('বিদ্যুৎ', 'biddhut', 'electricity', '⚡')]),
    ],
  },
  // ------------------------------------------------------------------------------------------------ Barishal
  {
    id: 'barishal', name: 'Barishal', bn: 'বরিশাল', roman: 'borishal', emoji: '🛶', color: '#2AA39C', unlock: 5,
    hook: 'A land of rivers, canals and orchards in the south of the delta, so watery that it is called the "Venice of the East". Boats are the school bus, the market and the ambulance. At Kuakata you can watch the sun both rise and set over the sea.',
    intro: S('বরিশাল নদীর দেশ।', 'borishal nodir desh.', 'Barishal is a land of rivers.'),
    famous: [
      F('🛶', S('বরিশালে ভাসমান বাজার আছে।', 'borishale bhashoman bajar ache.', 'Barishal has floating markets.')),
      F('🌅', S('কুয়াকাটায় সূর্য ওঠে আর ডোবে।', 'kuakatay shurjo othe ar dobe.', 'At Kuakata the sun rises and sets.')),
      F('🐟', S('নদীর ইলিশ খুব মজার।', 'nodir ilish khub mojar.', 'River hilsa is very tasty.')),
    ],
    then: {
      en: 'Barishal was once called Bakerganj, and its rivers were its roads. It is the birthplace of the poet Jibanananda Das (born 1899) and of A. K. Fazlul Huq, known as Sher-e-Bangla, the "Tiger of Bengal".',
      line: S('জীবনানন্দ দাশ বরিশালে জন্মেছিলেন।', 'jibonanondo dash borishale jonmechhilen.', 'Jibanananda Das was born in Barishal.'),
    },
    now: {
      en: 'Barishal stands on the front line of climate change: cyclones and salt water in the soil trouble farmers, but villages adapt with cyclone shelters and salt-tolerant crops. The Padma Bridge, opened in 2022, brought Dhaka much closer.',
      line: S('পদ্মা সেতু ঢাকা আর বরিশালকে কাছে এনেছে।', 'podda shetu dhaka ar borishalke kachhe enechhe.', 'The Padma Bridge has brought Dhaka and Barishal closer.'),
    },
    made: [
      F('🍈', S('বরিশালে অনেক পেয়ারা হয়।', 'borishale onek peyara hoy.', 'Many guavas grow in Barishal.')),
      F('🥥', S('নারকেল আর সুপারি এখানে হয়।', 'narkel ar shupari ekhane hoy.', 'Coconut and betel nut grow here.')),
      F('🐟', S('নদীতে ইলিশ মাছ ধরা হয়।', 'nodite ilish mach dhora hoy.', 'Hilsa fish are caught in the river.')),
    ],
    timeline: [
      ['1899', 'The poet Jibanananda Das is born in Barishal.'],
      ['1970', 'In November one of the deadliest cyclones in recorded history strikes the coast, including Bhola.'],
      ['2016', 'Payra Port, a new deep-sea port in Patuakhali, begins operating.'],
      ['2022', 'The Padma Bridge opens, linking the south to Dhaka.'],
    ],
    economy: 'Rice, fish, guava, betel nut and coconut feed the region. Payra Port and the Padma Bridge are changing it from one of the hardest-to-reach corners of the delta into a new gateway for trade.',
    cities: [
      city('barishal', 'Barishal', 'বরিশাল', 'borishal', '🛶', 90.37, 22.70, 'The divisional capital, a river city on the Kirtankhola with canals running through it.', S('বরিশাল নদীর শহর।', 'borishal nodir shohor.', 'Barishal is a city of rivers.'), [
        W('খাল', 'khal', 'canal', '🛶'), W('ঘাট', 'ghat', 'river landing', '⛴️'), W('ভাসা', 'bhasha', 'to float', '🛟')]),
      city('patuakhali', 'Patuakhali', 'পটুয়াখালী', 'potuakhali', '🌅', 90.33, 22.36, 'Kuakata beach, here, is one of the few places where you can watch both sunrise and sunset over the sea.', S('কুয়াকাটায় সূর্যাস্ত সুন্দর।', 'kuakatay shurjasto shundor.', 'The sunset at Kuakata is beautiful.'), [
        W('সূর্য', 'shurjo', 'sun', '☀️'), W('সূর্যাস্ত', 'shurjasto', 'sunset', '🌇'), W('বালি', 'bali', 'sand', '🏖️')]),
      city('bhola', 'Bhola', 'ভোলা', 'bhola', '🏝️', 90.65, 22.69, 'Bangladesh\'s largest island district, with natural gas, and a history shaped by the 1970 cyclone.', S('ভোলা একটি দ্বীপ।', 'bhola ekti dwip.', 'Bhola is an island.'), [
        W('দ্বীপ', 'dwip', 'island', '🏝️'), W('ঘূর্ণিঝড়', 'ghurnijhor', 'cyclone', '🌀'), W('আশ্রয়', 'ashroy', 'shelter', '🏠')]),
      city('jhalokathi', 'Jhalokathi', 'ঝালকাঠি', 'jhalokathi', '🍈', 90.20, 22.64, 'Known for its floating guava markets, where boats loaded with fruit meet buyers on the water.', S('ঝালকাঠিতে পেয়ারার বাজার বিখ্যাত।', 'jhalokathite peyarar bajar bikkhato.', 'The guava market of Jhalokathi is famous.'), [
        W('পেয়ারা', 'peyara', 'guava', '🍈'), W('বাজার', 'bajar', 'market', '🛒'), W('ফল', 'fol', 'fruit', '🍎')]),
    ],
  },
  // ------------------------------------------------------------------------------------------------ Khulna
  {
    id: 'khulna', name: 'Khulna', bn: 'খুলনা', roman: 'khulna', emoji: '🐅', color: '#5B8C3A', unlock: 10,
    hook: 'The doorway to the Sundarbans, the largest mangrove forest on Earth, which Bangladesh shares with India and where the Royal Bengal tiger still roams. This is also where Tagore wrote, where the mystic Lalon sang, and where a mosque city more than five hundred years old still stands.',
    intro: S('খুলনায় সুন্দরবন আছে।', 'khulnay shundorbon ache.', 'Khulna has the Sundarbans.'),
    famous: [
      F('🐅', S('সুন্দরবনে রয়েল বেঙ্গল টাইগার আছে।', 'shundorbone royel bengal taigar ache.', 'The Royal Bengal tiger lives in the Sundarbans.')),
      F('🕌', S('বাগেরহাটে ষাট গম্বুজ মসজিদ আছে।', 'bagerhate shat gombuj moshjid ache.', 'Bagerhat has the Sixty Dome Mosque.')),
      F('🎶', S('কুষ্টিয়ায় লালনের আখড়া আছে।', 'kushtiay lalaner akhra ache.', 'Kushtia has the akhra of Lalon.')),
    ],
    then: {
      en: 'In the 15th century the saint and governor Khan Jahan Ali built mosques and roads around Bagerhat; its Sixty Dome Mosque is a UNESCO World Heritage Site. In Kushtia, Rabindranath Tagore managed his family estates at Shilaidaha, and the Baul poet Lalon Shah (died 1890) composed songs that are still sung.',
      line: S('রবীন্দ্রনাথ ঠাকুর কুষ্টিয়ায় ছিলেন।', 'robindronath thakur kushtiay chhilen.', 'Rabindranath Tagore stayed in Kushtia.'),
    },
    now: {
      en: 'Mongla, the country\'s second seaport, serves the south-west, and shrimp farming has made Khulna a big exporter. Protecting the Sundarbans from rising seas and pollution is one of Bangladesh\'s biggest tasks.',
      line: S('খুলনার চিংড়ি বিদেশে যায়।', 'khulnar chingri bideshe jay.', 'The shrimp of Khulna go abroad.'),
    },
    made: [
      F('🦐', S('খুলনায় চিংড়ির চাষ হয়।', 'khulnay chingrir chash hoy.', 'Shrimp are farmed in Khulna.')),
      F('🍯', S('সুন্দরবন থেকে মধু আসে।', 'shundorbon theke modhu ashe.', 'Honey comes from the Sundarbans.')),
      F('🌿', S('পাট এখানকার পুরোনো ফসল।', 'pat ekhankar purono fosol.', 'Jute is an old crop here.')),
    ],
    timeline: [
      ['1459', 'Khan Jahan Ali dies; the mosque city of Bagerhat he founded remains.'],
      ['1890', 'Lalon Shah dies in Kushtia, leaving thousands of songs.'],
      ['1985', 'The historic mosque city of Bagerhat becomes a UNESCO World Heritage Site.'],
      ['1997', 'The Sundarbans become a UNESCO World Heritage Site.'],
    ],
    economy: 'Shrimp, fish, jute, honey and tourism; Mongla port and Khulna\'s industries serve the south-west. The Sundarbans protect the coast from cyclones, which makes them valuable far beyond tourism.',
    cities: [
      city('khulna', 'Khulna', 'খুলনা', 'khulna', '🏙️', 89.55, 22.82, 'An industrial city and the usual starting point for trips into the Sundarbans.', S('খুলনা শিল্পের শহর।', 'khulna shilper shohor.', 'Khulna is a city of industry.'), [
        W('বাঘ', 'bagh', 'tiger', '🐅'), W('চিংড়ি', 'chingri', 'shrimp', '🦐'), W('শিল্প', 'shilpo', 'industry', '🏭')]),
      city('bagerhat', 'Bagerhat', 'বাগেরহাট', 'bagerhat', '🕌', 89.79, 22.65, 'The mosque city of Khan Jahan Ali, a UNESCO World Heritage Site.', S('বাগেরহাটে পুরোনো মসজিদ আছে।', 'bagerhate purono moshjid ache.', 'Bagerhat has old mosques.'), [
        W('মসজিদ', 'moshjid', 'mosque', '🕌'), W('গম্বুজ', 'gombuj', 'dome', '🕌'), W('ঐতিহ্য', 'oitijjho', 'heritage', '🏛️')]),
      city('jashore', 'Jashore', 'যশোর', 'joshor', '🌴', 89.21, 23.17, 'Famous for sweet date-palm sap in winter, and the home district of the poet Michael Madhusudan Dutt.', S('যশোরের খেজুর রস বিখ্যাত।', 'joshorer khejur rosh bikkhato.', 'The date-palm sap of Jashore is famous.'), [
        W('খেজুর', 'khejur', 'date palm', '🌴'), W('রস', 'ros', 'sap / juice', '🍯'), W('কবি', 'kobi', 'poet', '✍️')]),
      city('kushtia', 'Kushtia', 'কুষ্টিয়া', 'kushtia', '🎶', 89.12, 23.90, 'Land of the Baul poet Lalon, and of Tagore\'s Shilaidaha estate on the river.', S('কুষ্টিয়া গানের জায়গা।', 'kushtia ganer jayga.', 'Kushtia is a place of songs.'), [
        W('গান', 'gan', 'song', '🎵'), W('বাউল', 'baul', 'Baul (wandering singer)', '🎶'), W('একতারা', 'ektara', 'one-string instrument', '🪕')]),
    ],
  },
  // ------------------------------------------------------------------------------------------------ Rajshahi
  {
    id: 'rajshahi', name: 'Rajshahi', bn: 'রাজশাহী', roman: 'rajshahi', emoji: '🥭', color: '#D9822B', unlock: 15,
    hook: 'The sweetest region: Rajshahi\'s mangoes are famous and its silk is smooth. In the north-west, the red earth of the Barind holds some of the oldest ruins in Bangladesh, including a Buddhist monastery that is a UNESCO World Heritage Site and a walled city that was already thriving more than two thousand years ago.',
    intro: S('রাজশাহী আমের দেশ।', 'rajshahi amer desh.', 'Rajshahi is a land of mangoes.'),
    famous: [
      F('🥭', S('রাজশাহীর আম খুব মিষ্টি।', 'rajshahir am khub mishti.', 'The mangoes of Rajshahi are very sweet.')),
      F('🛕', S('পাহাড়পুরে প্রাচীন বৌদ্ধ বিহার আছে।', 'paharpure prachin boudhdho bihar ache.', 'Paharpur has an ancient Buddhist monastery.')),
      F('🧣', S('রাজশাহীর রেশম বিখ্যাত।', 'rajshahir resham bikkhato.', 'The silk of Rajshahi is famous.')),
    ],
    then: {
      en: 'Pundranagara, today\'s Mahasthangarh near Bogura, was a walled city more than 2,000 years ago. In the 8th century the Pala kings built the great Somapura monastery at Paharpur, a centre of learning for Buddhist monks.',
      line: S('মহাস্থানগড় দুই হাজার বছরের পুরোনো।', 'mohasthangor dui hajar bochhorer purono.', 'Mahasthangarh is two thousand years old.'),
    },
    now: {
      en: 'Today the region is Bangladesh\'s mango basket, and Rajshahi is a calm university city on the Padma. At Ishwardi, in Pabna district, the country\'s first nuclear power project, Rooppur, is being built.',
      line: S('রাজশাহী শান্ত সুন্দর শহর।', 'rajshahi shanto shundor shohor.', 'Rajshahi is a calm, beautiful city.'),
    },
    made: [
      F('🥭', S('চাঁপাইনবাবগঞ্জে অনেক আম হয়।', 'chãpainababgonje onek am hoy.', 'Many mangoes grow in Chapainawabganj.')),
      F('🧵', S('রাজশাহীতে রেশমের কাপড় বোনা হয়।', 'rajshahite reshomer kapor bona hoy.', 'Silk cloth is woven in Rajshahi.')),
      F('🍬', S('নাটোরের কাঁচাগোল্লা মিষ্টি।', 'natorer kãchagolla mishti.', 'The kachagolla of Natore is sweet.')),
    ],
    timeline: [
      ['3rd c. BCE', 'Pundranagara (Mahasthangarh) is already a walled city.'],
      ['8th c.', 'The Pala dynasty builds the Somapura Mahavihara at Paharpur.'],
      ['1953', 'Rajshahi University is founded.'],
      ['1985', 'The ruins at Paharpur become a UNESCO World Heritage Site.'],
    ],
    economy: 'Rice (Naogaon is called the rice basket of the country), mangoes, silk, potatoes and vegetables. The Barind plain is a major farming area irrigated by deep tube wells.',
    cities: [
      city('rajshahi', 'Rajshahi', 'রাজশাহী', 'rajshahi', '🥭', 88.60, 24.37, 'A green university city on the Padma, long known for silk.', S('রাজশাহী পদ্মার তীরে।', 'rajshahi poddar tire.', 'Rajshahi is on the bank of the Padma.'), [
        W('আম', 'am', 'mango', '🥭'), W('রেশম', 'resham', 'silk', '🧵'), W('পদ্মা', 'podda', 'the Padma river', '🌊')]),
      city('bogura', 'Bogura', 'বগুড়া', 'bogura', '🏺', 89.37, 24.85, 'Home of Mahasthangarh, a city more than 2,000 years old, and of famous Bogura yoghurt.', S('বগুড়ার দই খুব মজার।', 'bogurar doi khub mojar.', 'The yoghurt of Bogura is very tasty.'), [
        W('দই', 'doi', 'yoghurt', '🥛'), W('দুর্গ', 'durgo', 'fort', '🏰'), W('ইতিহাস', 'itihash', 'history', '📖')]),
      city('naogaon', 'Naogaon', 'নওগাঁ', 'nowgã', '🛕', 88.94, 24.80, 'Home of the Paharpur Buddhist Vihara, and one of Bangladesh\'s biggest rice-growing districts.', S('নওগাঁয় অনেক ধান হয়।', 'nowgãy onek dhan hoy.', 'Much rice grows in Naogaon.'), [
        W('ধান', 'dhan', 'paddy', '🌾'), W('চাল', 'chal', 'rice (uncooked)', '🍚'), W('মন্দির', 'mondir', 'temple', '🛕')]),
      city('chapainawabganj', 'Chapainawabganj', 'চাঁপাইনবাবগঞ্জ', 'chãpainababgonj', '🥭', 88.28, 24.60, 'The mango capital, famed for Himsagar and Langra, near the old Bengal capital Gaur and its Chhota Sona Mosque.', S('চাঁপাইনবাবগঞ্জ আমের শহর।', 'chãpainababgonj amer shohor.', 'Chapainawabganj is a city of mangoes.'), [
        W('গাছ', 'gachh', 'tree', '🌳'), W('বাগান', 'bagan', 'orchard / garden', '🌿'), W('সোনা', 'shona', 'gold', '🪙')]),
    ],
  },
  // ------------------------------------------------------------------------------------------------ Mymensingh
  {
    id: 'mymensingh', name: 'Mymensingh', bn: 'ময়মনসিংহ', roman: 'moymonshingho', emoji: '🎶', color: '#8A63B8', unlock: 20,
    hook: 'A green, song-filled country around the old Brahmaputra and its wetlands. Mymensingh became Bangladesh\'s eighth division only in 2015, yet it is one of the oldest storytelling lands: its village ballads, written down about a century ago, are known as the Mymensingh Gitika.',
    intro: S('ময়মনসিংহ গানের দেশ।', 'moymonshingho ganer desh.', 'Mymensingh is a land of songs.'),
    famous: [
      F('🎶', S('ময়মনসিংহে পালা গান বিখ্যাত।', 'moymonshinghe pala gan bikkhato.', 'Ballad-singing is famous in Mymensingh.')),
      F('🎓', S('এখানে কৃষি বিশ্ববিদ্যালয় আছে।', 'ekhane krishi bishshobiddyaloy ache.', 'There is an agricultural university here.')),
      F('🍬', S('মুক্তাগাছার মণ্ডা বিখ্যাত।', 'muktagachhar monda bikkhato.', 'The monda of Muktagacha is famous.')),
    ],
    then: {
      en: 'Ballads such as Mahua and Maluya were sung in these villages for centuries before Dinesh Chandra Sen collected them. The painter Zainul Abedin, whose sketches of the 1943 famine shocked Bengal and who is called the father of modern art in Bangladesh, was born in Kishoreganj in 1914.',
      line: S('জয়নুল আবেদিন কিশোরগঞ্জে জন্মেছিলেন।', 'joynul abedin kishoreganje jonmechhilen.', 'Zainul Abedin was born in Kishoreganj.'),
    },
    now: {
      en: 'The Bangladesh Agricultural University, founded in 1961, makes Mymensingh a centre for farming science. The haors of Netrokona and Kishoreganj give rice, fish and a growing number of visitors.',
      line: S('ময়মনসিংহে কৃষির গবেষণা হয়।', 'moymonshinghe krishir gobeshona hoy.', 'Farming research is done in Mymensingh.'),
    },
    made: [
      F('🌾', S('হাওরে বোরো ধান হয়।', 'haore boro dhan hoy.', 'Boro rice grows in the haors.')),
      F('🐟', S('নদী আর হাওরে অনেক মাছ পাওয়া যায়।', 'nodi ar haore onek mach paoa jay.', 'Many fish are found in the rivers and haors.')),
      F('🍬', S('মণ্ডা একটি মিষ্টি।', 'monda ekti mishti.', 'Monda is a sweet.')),
    ],
    timeline: [
      ['1787', 'Mymensingh district is formed.'],
      ['1923', 'Dinesh Chandra Sen publishes the Mymensingh Gitika, the folk ballads of the region.'],
      ['1943', 'Zainul Abedin sketches the Bengal famine.'],
      ['1961', 'The Bangladesh Agricultural University is founded at Mymensingh.'],
      ['2015', 'Mymensingh becomes the eighth division of Bangladesh.'],
    ],
    economy: 'Rice, fisheries and agricultural research; the haor wetlands support a large share of the country\'s boro rice and inland fish.',
    cities: [
      city('mymensingh', 'Mymensingh', 'ময়মনসিংহ', 'moymonshingho', '🎓', 90.41, 24.75, 'A university city on the old Brahmaputra, with the colourful Shashi Lodge and Alexander Castle.', S('ময়মনসিংহ শিক্ষার শহর।', 'moymonshingho shikkhar shohor.', 'Mymensingh is a city of education.'), [
        W('কৃষক', 'krishok', 'farmer', '🧑‍🌾'), W('বিজ্ঞান', 'biggyan', 'science', '🔬'), W('মণ্ডা', 'monda', 'a sweet from Muktagacha', '🍬')]),
      city('netrokona', 'Netrokona', 'নেত্রকোণা', 'netrokona', '🏞️', 90.73, 24.88, 'Hills and blue lakes near the Garo hills, at Susang Durgapur, where Garo and Hajong communities live.', S('নেত্রকোণায় নীল হ্রদ আছে।', 'netrokonay nil hrod ache.', 'Netrokona has a blue lake.'), [
        W('মাটি', 'mati', 'soil / clay', '🟫'), W('সাদা', 'shada', 'white', '⚪'), W('নীল', 'nil', 'blue', '🔵')]),
      city('kishoreganj', 'Kishoreganj', 'কিশোরগঞ্জ', 'kishoreganj', '🎨', 90.78, 24.43, 'The birthplace of the painter Zainul Abedin, and a land of haors.', S('কিশোরগঞ্জে হাওর আছে।', 'kishoreganje haor ache.', 'Kishoreganj has haors.'), [
        W('ছবি', 'chhobi', 'picture', '🖼️'), W('শিল্পী', 'shilpi', 'artist', '🎨'), W('আঁকা', 'ãka', 'to draw', '✏️')]),
      city('sherpur', 'Sherpur', 'শেরপুর', 'sherpur', '🌳', 90.02, 25.02, 'A border district at the foot of the Garo hills, with forest, rice fields and Garo communities.', S('শেরপুর সীমান্তের জেলা।', 'sherpur shimantor jela.', 'Sherpur is a border district.'), [
        W('সীমান্ত', 'shimanto', 'border', '🚧'), W('ফসল', 'fosol', 'crop', '🌾'), W('জেলা', 'jela', 'district', '🗺️')]),
    ],
  },
  // ------------------------------------------------------------------------------------------------ Rangpur
  {
    id: 'rangpur', name: 'Rangpur', bn: 'রংপুর', roman: 'rongpur', emoji: '🏔️', color: '#C65D5D', unlock: 25,
    hook: 'Bangladesh\'s far north, where on a clear winter day you can see the snow-capped Himalayan peak Kanchenjunga from Panchagarh. Wide rice and potato fields, mighty rivers like the Teesta, the folk songs called bhawaiya, and the birthplace of the writer Begum Rokeya all belong to Rangpur.',
    intro: S('রংপুর উত্তরের দেশ।', 'rongpur uttorer desh.', 'Rangpur is a land of the north.'),
    famous: [
      F('🏔️', S('পঞ্চগড় থেকে কাঞ্চনজঙ্ঘা দেখা যায়।', 'ponchogor theke kanchonjongha dekha jay.', 'Kanchenjunga can be seen from Panchagarh.')),
      F('🎶', S('ভাওয়াইয়া উত্তরের গান।', 'bhaoaiya uttorer gan.', 'Bhawaiya is a song of the north.')),
      F('🛕', S('দিনাজপুরে কান্তজির মন্দির আছে।', 'dinajpure kantojir mondir ache.', 'Dinajpur has the Kantajew Temple.')),
    ],
    then: {
      en: 'Begum Rokeya, born in 1880 in Pairaband, Rangpur, started a school for girls and wrote "Sultana\'s Dream" (1905), imagining a world run by women. The 18th-century Kantajew Temple in Dinajpur is covered in terracotta pictures of epic stories.',
      line: S('বেগম রোকেয়া রংপুরে জন্মেছিলেন।', 'begum rokeya rongpure jonmechhilen.', 'Begum Rokeya was born in Rangpur.'),
    },
    now: {
      en: 'Rangpur is a fast-growing divisional capital. Floods on the Teesta in the rains and drought in the dry season are big worries, while fragrant Dinajpur rice, litchis and Panchagarh tea reach shops across the country.',
      line: S('দিনাজপুরের কাটারিভোগ চাল বিখ্যাত।', 'dinajpurer katarivog chal bikkhato.', 'The katarivog rice of Dinajpur is famous.'),
    },
    made: [
      F('🥔', S('উত্তরে অনেক আলু হয়।', 'uttore onek alu hoy.', 'Many potatoes grow in the north.')),
      F('🍚', S('কাটারিভোগ সুগন্ধি চাল।', 'katarivog shugondhi chal.', 'Katarivog is a fragrant rice.')),
      F('🍵', S('পঞ্চগড়ে চা হয়।', 'ponchogore cha hoy.', 'Tea grows in Panchagarh.')),
    ],
    timeline: [
      ['1704', 'Work begins on the Kantajew Temple near Dinajpur.'],
      ['1870', 'The Saidpur railway workshop is set up; it still builds and repairs trains.'],
      ['1880', 'Begum Rokeya is born in Pairaband.'],
      ['1905', 'Rokeya writes "Sultana\'s Dream".'],
      ['1990', 'The Teesta Barrage is completed to irrigate the north.'],
    ],
    economy: 'Rice, potatoes, maize, tobacco and jute; new tea gardens in Panchagarh; the railway workshop at Saidpur; and Burimari, a busy land port on the border with India.',
    cities: [
      city('rangpur', 'Rangpur', 'রংপুর', 'rongpur', '📚', 89.25, 25.75, 'The divisional capital, and the home district of Begum Rokeya.', S('রংপুর উত্তরের বড় শহর।', 'rongpur uttorer boro shohor.', 'Rangpur is a big city of the north.'), [
        W('বই', 'boi', 'book', '📖'), W('শিক্ষা', 'shikkha', 'education', '📚'), W('স্বপ্ন', 'shopno', 'dream', '💭')]),
      city('dinajpur', 'Dinajpur', 'দিনাজপুর', 'dinajpur', '🛕', 88.64, 25.63, 'Home of the terracotta Kantajew Temple and fragrant kataribhog rice.', S('দিনাজপুরে লিচু হয়।', 'dinajpure lichu hoy.', 'Litchis grow in Dinajpur.'), [
        W('লিচু', 'lichu', 'litchi', '🍒'), W('সুগন্ধ', 'shugondho', 'fragrance', '🌸'), W('মূর্তি', 'murti', 'statue / figure', '🗿')]),
      city('nilphamari', 'Nilphamari', 'নীলফামারী', 'nilphamari', '🚂', 88.86, 25.93, 'Saidpur, here, has a railway workshop built in 1870 and an airport serving the north.', S('সৈয়দপুরে রেল কারখানা আছে।', 'soiyodpure rel karkhana ache.', 'Saidpur has a railway workshop.'), [
        W('ট্রেন', 'tren', 'train', '🚂'), W('স্টেশন', 'steshon', 'station', '🚉'), W('বিমান', 'biman', 'aeroplane', '✈️')]),
      city('panchagarh', 'Panchagarh', 'পঞ্চগড়', 'ponchogor', '🏔️', 88.55, 26.33, 'The far north: tea gardens, and a view of Kanchenjunga on clear winter days.', S('পঞ্চগড় দেশের উত্তরে।', 'ponchogor desher uttore.', 'Panchagarh is in the north of the country.'), [
        W('উত্তর', 'uttor', 'north', '🧭'), W('কুয়াশা', 'kuasha', 'fog', '🌫️'), W('তুষার', 'tushar', 'snow', '❄️')]),
    ],
  },
]

import { deep } from './exploreDeep'
exploreRegions.forEach((r) => {
  r.deep = deep[r.id]
})

export const exploreById = Object.fromEntries(exploreRegions.map((r) => [r.id, r]))

/** Every region name and city with its picture, for the quizzes. */
export const exploreCities = exploreRegions.flatMap((r) => r.cities.map((c) => ({ ...c, region: r.id })))
