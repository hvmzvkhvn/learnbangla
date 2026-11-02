// Extra sections on each Explore region sheet (13+): what people eat, nature, festivals, people to know, how people talk, quick facts.
// Each food / nature / festival / person has a short Bangla line (with romanisation and English) and an English note for readers who want more.
// Teens (13–15) see food, nature and quick facts; 16–18 and 18+ also see festivals, people and the language note.
import { profileA } from './exploreProfileA.js'
import { profileB } from './exploreProfileB.js'

export const exploreProfiles = { ...profileA, ...profileB }

/** Every Bangla line in the profiles (for the bank / audio / review pages). */
export const profileLines = (id) => {
  const p = exploreProfiles[id]
  return p ? [...p.food, ...p.nature, ...p.festivals, ...p.people] : []
}
