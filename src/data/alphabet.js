// Each letter: { letter, roman, example: { bn, roman, en, emoji } }
const L = (letter, roman, bn, wordRoman, en, emoji) => ({
  letter,
  roman,
  example: { bn, roman: wordRoman, en, emoji },
})

export const vowels = [
  L('অ', 'o', 'অজগর', 'ojogor', 'python', '🐍'),
  L('আ', 'a', 'আম', 'am', 'mango', '🥭'),
  L('ই', 'i', 'ইঁদুর', 'indur', 'mouse', '🐭'),
  L('ঈ', 'ee', 'ঈগল', 'igol', 'eagle', '🦅'),
  L('উ', 'u', 'উট', 'ut', 'camel', '🐪'),
  L('ঊ', 'oo', 'ঊষা', 'usha', 'dawn', '🌅'),
  L('ঋ', 'ri', 'ঋষি', 'rishi', 'sage', '🧘'),
  L('এ', 'e', 'এক', 'ek', 'one', '1️⃣'),
  L('ঐ', 'oi', 'ঐরাবত', 'oirabot', 'mythical elephant', '🐘'),
  L('ও', 'o', 'ওল', 'ol', 'yam', '🍠'),
  L('ঔ', 'ou', 'ঔষধ', 'oushodh', 'medicine', '💊'),
]

export const consonantGroups = [
  {
    name: 'Throat sounds',
    hint: 'Made at the back of the mouth.',
    letters: [
      L('ক', 'ko', 'কলা', 'kola', 'banana', '🍌'),
      L('খ', 'kho', 'খরগোশ', 'khorgosh', 'rabbit', '🐰'),
      L('গ', 'go', 'গরু', 'goru', 'cow', '🐄'),
      L('ঘ', 'gho', 'ঘর', 'ghor', 'house', '🏠'),
      L('ঙ', 'ngo', 'বঙ্গ', 'bongo', 'Bengal', '🌏'),
    ],
  },
  {
    name: 'Tongue-to-roof sounds',
    hint: 'The tongue touches the roof of the mouth, like "ch" and "j".',
    letters: [
      L('চ', 'cho', 'চাঁদ', 'chãd', 'moon', '🌙'),
      L('ছ', 'chho', 'ছাতা', 'chhata', 'umbrella', '☂️'),
      L('জ', 'jo', 'জাহাজ', 'jahaj', 'ship', '🚢'),
      L('ঝ', 'jho', 'ঝড়', 'jhor', 'storm', '🌪️'),
      L('ঞ', 'nyo', 'পঞ্চ', 'pancho', 'five', '5️⃣'),
    ],
  },
  {
    name: 'Curled-tongue sounds',
    hint: 'Curl the tip of your tongue back against the roof of your mouth.',
    letters: [
      L('ট', 'to', 'টিয়া', 'tiya', 'parrot', '🦜'),
      L('ঠ', 'tho', 'ঠোঁট', 'thõt', 'lips', '👄'),
      L('ড', 'do', 'ডিম', 'dim', 'egg', '🥚'),
      L('ঢ', 'dho', 'ঢাক', 'dhak', 'drum', '🥁'),
      L('ণ', 'no', 'ঘণ্টা', 'ghonta', 'bell', '🔔'),
    ],
  },
  {
    name: 'Teeth sounds',
    hint: 'The tip of the tongue touches the back of your top teeth.',
    letters: [
      L('ত', 'to', 'তারা', 'tara', 'star', '⭐'),
      L('থ', 'tho', 'থালা', 'thala', 'plate', '🍽️'),
      L('দ', 'do', 'দুধ', 'dudh', 'milk', '🥛'),
      L('ধ', 'dho', 'ধান', 'dhan', 'rice plant', '🌾'),
      L('ন', 'no', 'নদী', 'nodi', 'river', '🏞️'),
    ],
  },
  {
    name: 'Lip sounds',
    hint: 'Made by pressing your lips together.',
    letters: [
      L('প', 'po', 'পাখি', 'pakhi', 'bird', '🐦'),
      L('ফ', 'pho', 'ফল', 'phol', 'fruit', '🍎'),
      L('ব', 'bo', 'বই', 'boi', 'book', '📖'),
      L('ভ', 'bho', 'ভাত', 'bhat', 'rice', '🍚'),
      L('ম', 'mo', 'মাছ', 'mach', 'fish', '🐟'),
    ],
  },
  {
    name: 'Flowing & hissing sounds',
    hint: 'The "sh" sound and the sounds that glide.',
    letters: [
      L('য', 'jo', 'যন্ত্র', 'jontro', 'machine', '⚙️'),
      L('র', 'ro', 'রুটি', 'ruti', 'bread', '🫓'),
      L('ল', 'lo', 'লেবু', 'lebu', 'lemon', '🍋'),
      L('শ', 'sho', 'শাপলা', 'shapla', 'water lily', '🌸'),
      L('ষ', 'sho', 'ষাঁড়', 'shãr', 'bull', '🐂'),
      L('স', 'sho', 'সূর্য', 'shurjo', 'sun', '☀️'),
      L('হ', 'ho', 'হাতি', 'hati', 'elephant', '🐘'),
    ],
  },
  {
    name: 'Special letters',
    hint: 'Extra letters you will see in lots of words.',
    letters: [
      L('ড়', 'ro', 'বড়', 'boro', 'big', '⬆️'),
      L('ঢ়', 'rho', 'আষাঢ়', 'ashar', 'a rainy-season month', '☔'),
      L('য়', 'yo', 'ময়ূর', 'moyur', 'peacock', '🦚'),
      L('ৎ', 't', 'বিদ্যুৎ', 'biddut', 'electricity', '⚡'),
      L('ং', 'ng', 'বাংলা', 'bangla', 'the Bangla language', '🗣️'),
      L('ঃ', 'h', 'দুঃখ', 'dukkho', 'sadness', '😢'),
      L('ঁ', 'nasal', 'চাঁদ', 'chãd', 'moon', '🌙'),
    ],
  },
]

// Vowel signs ("kar") attach to consonants. Shown here on ক.
export const vowelSigns = [
  { sign: 'া', roman: 'a', combined: 'কা', combinedRoman: 'ka' },
  { sign: 'ি', roman: 'i', combined: 'কি', combinedRoman: 'ki' },
  { sign: 'ী', roman: 'ee', combined: 'কী', combinedRoman: 'kee' },
  { sign: 'ু', roman: 'u', combined: 'কু', combinedRoman: 'ku' },
  { sign: 'ূ', roman: 'oo', combined: 'কূ', combinedRoman: 'koo' },
  { sign: 'ৃ', roman: 'ri', combined: 'কৃ', combinedRoman: 'kri' },
  { sign: 'ে', roman: 'e', combined: 'কে', combinedRoman: 'ke' },
  { sign: 'ৈ', roman: 'oi', combined: 'কৈ', combinedRoman: 'koi' },
  { sign: 'ো', roman: 'o', combined: 'কো', combinedRoman: 'ko' },
  { sign: 'ৌ', roman: 'ou', combined: 'কৌ', combinedRoman: 'kou' },
]
