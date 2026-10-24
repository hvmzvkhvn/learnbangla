// Conjunct letters (যুক্তাক্ষর): two or more consonants joined into one shape.
// Used by the 13–15 and 16–18 tracks. Same shape as alphabet.js letters: { letter, roman, example }.
const C = (letter, roman, bn, wordRoman, en, emoji) => ({ letter, roman, example: { bn, roman: wordRoman, en, emoji } })

export const conjuncts = [
  C('ক্ষ', 'kkho', 'ক্ষুধা', 'khudha', 'hunger', '🍽️'),
  C('জ্ঞ', 'gyo', 'জ্ঞান', 'gyan', 'knowledge', '🧠'),
  C('ক্ত', 'kto', 'রক্ত', 'rokto', 'blood', '🩸'),
  C('ন্ত', 'nto', 'শান্ত', 'shanto', 'calm', '😌'),
  C('ন্দ', 'ndo', 'আনন্দ', 'anondo', 'joy', '😄'),
  C('ন্ধ', 'ndho', 'বন্ধু', 'bondhu', 'friend', '🧑‍🤝‍🧑'),
  C('স্ত', 'sto', 'রাস্তা', 'rasta', 'road', '🛣️'),
  C('স্ক', 'sko', 'স্কুল', 'skul', 'school', '🏫'),
  C('ম্ব', 'mbo', 'লম্বা', 'lomba', 'tall, long', '📏'),
  C('ত্র', 'tro', 'ছাত্র', 'chhatro', 'student', '🎓'),
  C('দ্র', 'dro', 'ভদ্র', 'bhodro', 'polite', '🙂'),
  C('প্র', 'pro', 'প্রজাপতি', 'projapoti', 'butterfly', '🦋'),
  C('ব্দ', 'bdo', 'শব্দ', 'shobdo', 'sound, word', '🔊'),
  C('ঙ্গ', 'ngo', 'সঙ্গী', 'shongi', 'companion', '🤝'),
  C('ল্প', 'lpo', 'গল্প', 'golpo', 'story', '📖'),
  C('ষ্ট', 'shto', 'কষ্ট', 'koshto', 'hardship', '😣'),
  C('দ্ধ', 'ddho', 'বুদ্ধি', 'buddhi', 'intelligence', '💡'),
  C('ত্য', 'tyo', 'সত্য', 'shotyo', 'truth', '✅'),
]
