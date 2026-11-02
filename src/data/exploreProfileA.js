// Explore region sheet — extra sections, part 1 (Dhaka, Chattogram, Sylhet, Barishal). See exploreProfile.js.
import { F, S, P } from './exploreProfileKit.js'

export const profileA = {
  dhaka: {
    food: [
      F('🍞', S('পুরান ঢাকায় বাকরখানি রুটি চায়ের সঙ্গে খাওয়া হয়।', 'puran dhakay bakorkhani ruti chayer songe khaoa hoy.', 'In Old Dhaka bakarkhani bread is eaten with tea.'), 'Bakarkhani is a thick, crisp, layered bread that is a famous speciality of Old Dhaka, traditionally linked with the Nawabs’ kitchens.'),
      F('🥛', S('বিরিয়ানির সঙ্গে ঠান্ডা বোরহানি পান করা হয়।', 'biriyanir songe thanda borhani pan kora hoy.', 'Cold borhani is drunk with biryani.'), 'Borhani is a salty-sour drink of yoghurt, mint, mustard and spices that helps with a rich meal.'),
      F('🍢', S('রমজানে চকবাজারে ইফতারের বাজারে বিশাল ভিড় হয়।', 'romjane chokbajare iftarer bajare bishal bhir hoy.', 'In Ramadan there is a huge crowd at the iftar market in Chawkbazar.'), 'Every evening in Ramadan the lanes fill with stalls selling jilapi, haleem, kebabs, fried snacks and fruit.'),
      F('🌶️', S('ফুচকা আর চটপটি ঢাকার রাস্তার জনপ্রিয় খাবার।', 'phuchka ar chotpoti dhakar rastar jonoprio khabar.', 'Fuchka and chotpoti are popular street foods of Dhaka.'), 'Fuchka is a crisp shell filled with spiced potato and tamarind water; chotpoti is a tangy chickpea snack.'),
    ],
    nature: [
      F('🌊', S('বুড়িগঙ্গা নদী ঢাকার পাশ দিয়ে বয়ে গেছে।', 'burigongga nodi dhakar pash diye boye gechhe.', 'The Buriganga river flows beside Dhaka.'), 'The river made Dhaka, but pollution from industry and waste has made it one of the country’s most urgent clean-up tasks.'),
      F('🌳', S('রমনা পার্কে সকালে অনেক মানুষ হাঁটতে আসে।', 'romna parke shokale onek manush hãtte ashe.', 'In the morning many people come to walk in Ramna Park.'), 'Ramna Park is the green heart of the capital, with old trees, a lake and, on Pohela Boishakh, a huge morning gathering.'),
      F('🌿', S('ওয়ারীর বলধা গার্ডেনে দেশ-বিদেশের গাছ আছে।', 'oarir boldha gardene desh-bidesher gachh achhe.', 'The Baldha Garden in Wari has plants from home and abroad.'), 'This small botanical garden in Old Dhaka, set up in 1909, holds hundreds of rare plants in the middle of a crowded neighbourhood.'),
      F('🌳', S('গাজীপুরের ভাওয়াল জাতীয় উদ্যানে শালবন আছে।', 'gajipurer bhaoal jatiyo uddhane shalbon achhe.', 'The Bhawal National Park in Gazipur has a sal forest.'), 'Just north of the city, this park protects a remnant of the old sal forest that once covered much of central Bengal.'),
    ],
    festivals: [
      F('🎨', S('পহেলা বৈশাখে ঢাকায় মঙ্গল শোভাযাত্রা বের হয়।', 'pohela boishakhe dhakay mongol shobhajatra ber hoy.', 'On Pohela Boishakh the Mangal Shobhajatra procession comes out in Dhaka.'), 'Students of Dhaka University’s art institute make huge masks and animal figures for this procession, which UNESCO listed as intangible heritage in 2016.'),
      F('🎶', S('রমনা বটমূলে ছায়ানটের গানে নববর্ষ শুরু হয়।', 'romna botomule chhayanoter gane nobobarsho shuru hoy.', 'At Ramna Batamul the new year begins with the songs of Chhayanaut.'), 'At dawn, singers of the cultural group Chhayanaut welcome the Bengali new year under a banyan tree in Ramna Park.'),
      F('🪔', S('জন্মাষ্টমীতে পুরান ঢাকায় শোভাযাত্রা বের হয়।', 'jonmashtomite puran dhakay shobhajatra ber hoy.', 'On Janmashtami a procession comes out in Old Dhaka.'), 'The Hindu festival of Janmashtami has been marked in Old Dhaka with a colourful procession from the Dhakeshwari Temple for generations.'),
    ],
    people: [
      P('Fazlur Rahman Khan', 'ফজলুর রহমান খান', S('ফজলুর রহমান খান ঢাকায় জন্মেছিলেন আর উঁচু ভবনের নকশা করেছেন।', 'phojlur rahman khan dhakay jonmechhilen ar ũchu bhoboner noksha korechhen.', 'Fazlur Rahman Khan was born in Dhaka and designed tall buildings.'), 'Born in Dhaka in 1929, he became a leading structural engineer in the United States and designed the framing of skyscrapers such as the Willis Tower in Chicago.'),
      P('Zainul Abedin', 'জয়নুল আবেদিন', S('শিল্পী জয়নুল আবেদিন দুর্ভিক্ষের ছবি এঁকে বিখ্যাত হয়েছেন।', 'shilpi joynul abedin durbhikkher chhobi ẽke bikhyato hoyechhen.', 'The artist Zainul Abedin became famous by drawing pictures of the famine.'), 'Founder of the Dhaka Art College, he made powerful sketches of the Bengal famine of 1943, and is called the father of modern art in Bangladesh.'),
      P('Jasimuddin', 'জসীমউদ্দীন', S('কবি জসীমউদ্দীনকে পল্লিকবি বলা হয়।', 'kobi jashimuddinke pollikobi bola hoy.', 'The poet Jasimuddin is called the poet of the village.'), 'Born in Faridpur in 1903, he wrote tender poems of village life, such as “Nakshi Kanthar Math”, and many songs.'),
    ],
    speech: 'Old Dhaka has its own flavourful way of speaking, often called Dhakaiya or “Kutti”, with its own slang, jokes and rhythm, handed down by families who have lived in the lanes for generations. Standard Bangla, used in schools and news, is understood everywhere.',
    facts: [
      'Dhaka is one of the most densely populated cities in the world, with tens of thousands of people in each square kilometre.',
      'Dhaka’s Metro Rail, the country’s first, opened in stages from December 2022.',
      'There are said to be several hundred thousand rickshaws in Dhaka, and no other city has as many.',
    ],
  },

  chattogram: {
    food: [
      F('🍛', S('মেজবানে গরুর মাংস আর ভাত পরিবেশন করা হয়।', 'mejbane gorur mansho ar bhat poribeshon kora hoy.', 'At a mezban beef and rice are served.'), 'Mezban is a community feast of Chattogram, where a hot, peppery beef curry is cooked in huge pots and served on banana-leaf plates.'),
      F('🐟', S('কক্সবাজারে শুঁটকি মাছ খুব জনপ্রিয়।', 'koksbajare shũtki mach khub jonoprio.', 'Dried fish is very popular in Cox’s Bazar.'), 'Fish are dried in the sun on bamboo racks along the coast, and shutki curries are a favourite across the south-east.'),
      F('🦐', S('সমুদ্রের তাজা চিংড়ি আর কাঁকড়া এখানে সহজে পাওয়া যায়।', 'shomudrer taja chingri ar kãkra ekhane shohoje paoa jay.', 'Fresh sea prawns and crabs are easily found here.'), 'The Bay of Bengal supplies prawns, crabs, pomfret and Bombay duck, which are grilled or fried at beach stalls.'),
      F('🍵', S('পাহাড়ি এলাকায় বাঁশের নলে রান্না করা খাবার পাওয়া যায়।', 'pahari elakay bãsher nole ranna kora khabar paoa jay.', 'In the hill areas food cooked in bamboo tubes can be found.'), 'The hill peoples cook rice, chicken and vegetables inside green bamboo, which gives the food a smoky, sweet taste.'),
    ],
    nature: [
      F('🏖️', S('কক্সবাজার সৈকত এক শত বিশ কিলোমিটার লম্বা।', 'koksbajar shoikot ek shoto bish kilomitar lomba.', 'Cox’s Bazar beach is a hundred and twenty kilometres long.'), 'It is among the longest unbroken natural sea beaches in the world, with gentle surf and wide, soft sand.'),
      F('🏝️', S('সেন্ট মার্টিন দেশের একমাত্র প্রবাল দ্বীপ।', 'sent martin desher ekmatro probal dwip.', 'St Martin’s is the country’s only coral island.'), 'Visitors come to see its reefs and turtle beaches, but the island is small and fragile and needs careful protection.'),
      F('⛰️', S('বান্দরবানের কেওক্রাডং দেশের উঁচু পাহাড়ের একটি।', 'bandorboner keokradong desher ũchu paharer ekti.', 'Keokradong in Bandarban is one of the country’s high hills.'), 'It rises to roughly a thousand metres, and trekkers climb through forest and tribal villages to reach it.'),
      F('🌊', S('কর্ণফুলী নদীর বাঁধে কাপ্তাই হ্রদ তৈরি হয়েছে।', 'kornofuli nodir bãdhe kaptai hrod toiri hoyechhe.', 'Kaptai Lake was made by the dam on the Karnaphuli river.'), 'This large lake was formed in the early 1960s and produces hydroelectric power, but it also drowned fields and villages.'),
    ],
    festivals: [
      F('💧', S('চাকমারা বিজু উৎসবে নদীতে ফুল ভাসায়।', 'chakmara biju utshobe nodite phul bhashay.', 'The Chakma float flowers on the river at the Biju festival.'), 'In mid-April the Chakma, Tripura and Marma celebrate their new year with flowers, special food and water games.'),
      F('🥁', S('মারমারা সাংগ্রাই উৎসবে পানি ছিটিয়ে আনন্দ করে।', 'marmara sangrai utshobe pani chhitiye anondo kore.', 'The Marma enjoy themselves at the Sangrai festival by splashing water.'), 'The Marma new year, Sangrai, includes water-splashing festivals, in which young people bless the elders and each other with water.'),
      F('🚢', S('চট্টগ্রামে বলীখেলা আর বৈশাখী মেলা বিখ্যাত।', 'chottograme bolikhela ar boishakhi mela bikhyato.', 'In Chattogram the Boli Khela wrestling and the Boishakhi fair are famous.'), 'The Boli Khela, a traditional wrestling contest held every year, draws large crowds, and the fair that goes with it has been held for over a century.'),
    ],
    people: [
      P('Surya Sen', 'সূর্য সেন', S('মাস্টারদা সূর্য সেন ব্রিটিশদের বিরুদ্ধে অস্ত্রাগার দখল করেছিলেন।', 'masterda shurjo shen britishder biruddhe ostragar dokhol korechhilen.', 'Masterda Surya Sen seized an armoury against the British.'), 'A schoolteacher from Chattogram, he led the armoury raid of April 1930 and was hanged in 1934.'),
      P('Muhammad Yunus', 'মুহাম্মদ ইউনূস', S('অধ্যাপক ইউনূস চট্টগ্রামে জন্মেছিলেন আর ক্ষুদ্রঋণ শুরু করেছিলেন।', 'odhyapok iunush chottograme jonmechhilen ar khudrorin shuru korechhilen.', 'Professor Yunus was born in Chattogram and started microcredit.'), 'He founded the Grameen Bank and shared the 2006 Nobel Peace Prize for giving small loans to poor people, mostly women.'),
      P('Pritilata Waddedar', 'প্রীতিলতা ওয়াদ্দেদার', S('প্রীতিলতা ওয়াদ্দেদার ছিলেন চট্টগ্রামের এক সাহসী তরুণী।', 'pritilota oaddedar chhilen chottogramer ek shahoshi toruni.', 'Pritilata Waddedar was a brave young woman of Chattogram.'), 'A teacher and revolutionary, she led an attack on a European club in Chattogram in 1932 and is remembered as one of the first women to take part in armed resistance in Bengal.'),
    ],
    speech: 'The Chattogram dialect, Chatgaiya, differs so much from standard Bangla that speakers from other regions often cannot follow it at first. It is known for dropping and shifting sounds, with many words that come from Arabic, Persian and Arakanese, and it is spoken with great pride, along with the languages of the hill peoples such as Chakma, Marma and Tripura.',
    facts: [
      'The port of Chattogram handles most of Bangladesh’s foreign trade.',
      'The Chittagong Hill Tracts are home to eleven indigenous peoples, each with its own language and customs.',
      'The Cox’s Bazar area shelters the largest refugee settlement in the world.',
    ],
  },

  sylhet: {
    food: [
      F('🍵', S('শ্রীমঙ্গলে সাত রঙের চা বিখ্যাত।', 'shrimongole shat ronger cha bikhyato.', 'Seven-colour tea is famous in Srimangal.'), 'A cafe in Srimangal serves tea in a glass of seven layers, each of a different shade, made from separate brews and milk.'),
      F('🍋', S('সিলেটের কমলা আর সাতকরা খুব সুগন্ধি।', 'sileter komola ar shatkora khub shugondhi.', 'The oranges and satkara of Sylhet are very fragrant.'), 'Satkara is a rough-skinned citrus fruit that is used to flavour beef and fish curries, and its sharp smell is a mark of Sylheti cooking.'),
      F('🍛', S('শুঁটকির সঙ্গে সিলেটিরা আলু আর লাউ দিয়ে ঝোল রাঁধে।', 'shũtkir songe siletira alu ar lau diye jhol rãdhe.', 'With dried fish Sylhetis cook a broth with potato and gourd.'), 'Dried fish dishes are a speciality of the haor country, where fish were once caught in the rains and dried for winter.'),
      F('🍬', S('শীতে সিলেটে নানা রকম পিঠা আর পায়েস রান্না হয়।', 'shite siletey nana rokom pitha ar payesh ranna hoy.', 'In winter many kinds of pitha and payesh are cooked in Sylhet.'), 'Pitha are cakes of rice flour, coconut and date-palm molasses, made at home on cold evenings and shared with neighbours.'),
    ],
    nature: [
      F('🌳', S('রাতারগুল মিঠা পানির জলাবন।', 'ratargul mitha panir jolabon.', 'Ratargul is a freshwater swamp forest.'), 'In the monsoon, trees stand in water and visitors glide between the trunks in small wooden boats.'),
      F('🐒', S('লাউয়াছড়ায় হুলক গিবন গাছের ডালে ডাকে।', 'lauachhoray hulok gibon gachher dale dake.', 'In Lawachara the hoolock gibbons call from the branches.'), 'Hoolock gibbons are the only apes in Bangladesh, and they are now critically endangered because forests have shrunk.'),
      F('💦', S('মাধবকুণ্ড জলপ্রপাত পাহাড় বেয়ে নেমে আসে।', 'madhobkundo jolprapat pahar beye neme ashe.', 'The Madhabkunda waterfall comes down the hill.'), 'This is the biggest waterfall in Bangladesh, falling about thirty metres in the rainy season.'),
      F('🦆', S('টাঙ্গুয়ার হাওরে শীতে অনেক পরিযায়ী পাখি আসে।', 'tanguar haore shite onek poriyayi pakhi ashe.', 'In winter many migratory birds come to Tanguar Haor.'), 'Thousands of ducks, geese and waders fly from Siberia to this protected wetland every year.'),
    ],
    festivals: [
      F('🕌', S('শাহ জালালের মাজারে সারা বছর মানুষ আসে।', 'shah jalaler mazare shara bochhor manush ashe.', 'People come to the shrine of Shah Jalal all year.'), 'The shrine in Sylhet city is a place of prayer for people of all faiths, and its pigeons are fed by visitors.'),
      F('💃', S('মণিপুরিরা রাস উৎসবে নাচ করে।', 'monipurira rash utshobe nach kore.', 'The Manipuri dance at the Ras festival.'), 'The Manipuri community of Moulvibazar performs graceful Ras Lila dances in autumn, with fine costumes and soft music.'),
      F('🎵', S('বাউল গানের আসরে সারা রাত গান চলে।', 'baul ganer ashore shara rat gan chole.', 'At Baul song gatherings the singing goes on all night.'), 'The songs of Hason Raja and Shah Abdul Karim are sung on boats and in courtyards, especially in the haor country.'),
    ],
    people: [
      P('Hason Raja', 'হাছন রাজা', S('হাছন রাজা জমিদার হয়েও মরমি গান লিখতেন।', 'hachhon raja jomidar hoyeo mormi gan likhten.', 'Hason Raja, though a landlord, wrote mystic songs.'), 'Born in 1854 in Sylhet, he wrote hundreds of songs about longing and devotion, and his songs were later admired by Tagore.'),
      P('Shah Abdul Karim', 'শাহ আবদুল করিম', S('শাহ আবদুল করিম সুনামগঞ্জের বিখ্যাত বাউল শিল্পী।', 'shah abdul korim shunamgonjer bikhyato baul shilpi.', 'Shah Abdul Karim is a famous Baul singer of Sunamganj.'), 'He lived from 1916 to 2009 and composed hundreds of songs of love, and of the pain of poverty and injustice.'),
      P('Shah Jalal', 'শাহ জালাল', S('শাহ জালাল সিলেটে এসে ইসলামের বাণী ছড়িয়েছিলেন বলে মানা হয়।', 'shah jalal silete eshe islamer bani chhoriyechhilen bole mana hoy.', 'It is believed that Shah Jalal came to Sylhet and spread the message of Islam.'), 'The Sufi saint is remembered from the fourteenth century and is honoured all over Bengal.'),
    ],
    speech: 'Sylheti is so different from standard Bangla, in its sounds and many of its words, that many linguists regard it as a separate language. It has its own old script, Sylheti Nagri, and it is also spoken by most British Bangladeshis, since most of them come from Sylhet.',
    facts: [
      'Sylhet’s tea gardens produce most of Bangladesh’s tea.',
      'Ratargul is the country’s only freshwater swamp forest.',
      'Many curry restaurants in Britain are owned by people of Sylheti origin.',
    ],
  },

  barishal: {
    food: [
      F('🐟', S('বরিশালের নদীতে ইলিশ মাছ পাওয়া যায়।', 'borishaler nodite ilish mach paoa jay.', 'Hilsa fish are found in the rivers of Barishal.'), 'Hilsa, the national fish, is cooked in mustard paste, steamed in banana leaf or fried, and each variety has its fans.'),
      F('🍈', S('পিরোজপুরের পেয়ারা মিষ্টি আর রসালো।', 'pirojpurer peyara mishti ar roshalo.', 'The guavas of Pirojpur are sweet and juicy.'), 'The floating guava market in Swarupkathi sends fruit to Dhaka and other cities.'),
      F('🥥', S('এখানে নারকেল আর সুপারি প্রচুর হয়।', 'ekhane narkel ar shupari prochur hoy.', 'Coconuts and betel nuts are plentiful here.'), 'The soft, damp soil of the south suits coconut and betel palms, which stand beside almost every home.'),
      F('🍮', S('ঝালকাঠির আমড়া আর কাঁঠালও বিখ্যাত।', 'jhalokathir amra ar kãthalo bikhyato.', 'The hog plums and jackfruits of Jhalokati are also famous.'), 'Hog plum is eaten raw with salt and chilli, or made into a sour pickle, and Barishal’s fruit season is a happy time.'),
    ],
    nature: [
      F('🌅', S('কুয়াকাটায় সাগরের বুকে সূর্য ওঠে আর ডোবে।', 'kuakatay shagorer buke shurjo othe ar dobe.', 'At Kuakata the sun rises and sets on the sea.'), 'It is one of the few places in the country where a visitor can watch both sunrise and sunset over the sea from one beach.'),
      F('🏝️', S('ভোলা মেঘনার মোহনার বড় দ্বীপ।', 'bhola meghnar mohonar boro dwip.', 'Bhola is a big island at the mouth of the Meghna.'), 'It is the largest island of Bangladesh, shaped by silt and erosion, with gas fields and wide rice lands.'),
      F('🌴', S('বরগুনা আর পটুয়াখালীতে ম্যানগ্রোভের সবুজ বেষ্টনী আছে।', 'borguna ar potuakhalite mangrover shobuj beshtoni achhe.', 'In Barguna and Patuakhali there is a green belt of mangroves.'), 'Planted along the coast, the belt slows cyclones and helps new land to form.'),
      F('🛶', S('বরিশালের খালে খালে নৌকা চলে।', 'borishaler khale khale nouka chole.', 'Boats run in the canals of Barishal.'), 'Countless canals link the villages, and a boat is the school bus, the market and the ambulance.'),
    ],
    festivals: [
      F('🛶', S('বর্ষায় বরিশালে নৌকাবাইচ হয়।', 'borshay borishale noukabaich hoy.', 'In the rainy season boat races are held in Barishal.'), 'Long, narrow boats with dozens of oarsmen race to the beat of songs, with huge crowds cheering from the banks.'),
      F('🎶', S('বরিশালের জারি আর সারি গান গ্রামে গাওয়া হয়।', 'borishaler jari ar shari gan grame gaoa hoy.', 'Jari and shari songs of Barishal are sung in villages.'), 'These work songs and folk ballads were once sung by boatmen and field-workers, and are still performed at fairs.'),
      F('🪔', S('দুর্গাসাগর দিঘির ধারে মেলা বসে।', 'durgashagor dighir dhare mela boshe.', 'A fair is held beside the Durgasagar pond.'), 'Durgasagar in Babuganj is one of the largest ponds in the country, and its banks are a place for fairs and picnics.'),
    ],
    people: [
      P('Jibanananda Das', 'জীবনানন্দ দাশ', S('জীবনানন্দ দাশ বরিশালে জন্মেছিলেন আর প্রকৃতির কবিতা লিখেছেন।', 'jibonanondo dash borishale jonmechhilen ar prokritir kobita likhechhen.', 'Jibanananda Das was born in Barishal and wrote poems of nature.'), 'Born in 1899, he is regarded as the greatest Bengali poet after Tagore, loved for his images of rivers, birds and evening light.'),
      P('Sufia Kamal', 'সুফিয়া কামাল', S('কবি সুফিয়া কামাল নারী আন্দোলনের এক বড় নেত্রী ছিলেন।', 'kobi shufiya kamal nari andolner ek boro netri chhilen.', 'The poet Sufia Kamal was a great leader of the women’s movement.'), 'Born in Barishal in 1911, she was a poet and a leader of social movements, and supported the language and independence movements.'),
      P('A. K. Fazlul Huq', 'এ কে ফজলুল হক', S('শেরে বাংলা এ কে ফজলুল হক ঝালকাঠিতে জন্মেছিলেন।', 'shere bangla e ke phojlul hoq jhalokathite jonmechhilen.', 'Sher-e-Bangla A. K. Fazlul Huq was born in Jhalokati.'), 'Known as the Lion of Bengal, he was a prime minister of Bengal and a leader of the United Front that won the 1954 election.'),
    ],
    speech: 'The Barishal dialect is easy to recognise, with its own rhythm, a soft sing-song tone, and many words that are special to the river country. Locals are proud of it, and a Barishal accent is often imitated, affectionately, in plays and films.',
    facts: [
      'Barishal is sometimes called the Venice of Bengal because so much travel there is by boat.',
      'The cyclone of 12 November 1970 hit this coast and was among the deadliest in recorded history.',
      'Today thousands of cyclone shelters stand along the coast and have saved many lives.',
    ],
  },
}
