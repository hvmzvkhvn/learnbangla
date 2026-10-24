// What each age track offers. Everything that differs by age reads from here.
//
//   xp            XP, levels, streak, badges
//   playful       big, bright, Tara-style look and lenient tracing (5–7 and 8–12)
//   garden        the 5–7 extras: levels are garden stages, badges are stickers, kid-sized game cards
//   gentleStreak  a missed day pauses the streak instead of resetting it
//   arcade        which games appear on the Play page
//   stories       story chats
//   treasure      a gentle, untimed treasure hunt at the end of a unit (ages 5–7)
//   boss          a timed boss level at the end of a unit (ages 13–18)
//   listenType    "listen and pick" and "type it in Bangla" exercises
//   blitzSeconds  length of a Word Blitz round (0 = no timed games)
//   trace         what gets traced: letters ('all' | n), signs, syllables, words (n per lesson), digits
export const FEATURES = {
  young: {
    xp: true, playful: true, garden: true, gentleStreak: true,
    arcade: ['memory', 'tap', 'daily'], stories: false, treasure: true, boss: false, listenType: false, blitzSeconds: 0,
    trace: { letters: 'all', signs: false, syllables: false, words: 1, digits: false },
  },
  older: {
    xp: true, playful: true, garden: false, gentleStreak: true,
    arcade: ['daily', 'blitz', 'memory', 'type'], stories: true, treasure: false, boss: false, listenType: true, blitzSeconds: 90,
    trace: { letters: 2, signs: true, syllables: false, words: 1, digits: false },
  },
  teen: {
    xp: true, playful: false, garden: false, gentleStreak: false,
    arcade: ['daily', 'blitz', 'memory', 'type'], stories: true, treasure: false, boss: true, listenType: true, blitzSeconds: 60,
    trace: { letters: 'all', signs: true, syllables: true, words: 2, digits: true },
  },
  senior: {
    xp: true, playful: false, garden: false, gentleStreak: false,
    arcade: ['daily', 'blitz', 'memory', 'type'], stories: true, treasure: false, boss: true, listenType: true, blitzSeconds: 60,
    trace: { letters: 'all', signs: true, syllables: true, words: 2, digits: true },
  },
}

export const featuresOf = (trackKey) => FEATURES[trackKey] ?? FEATURES.teen
