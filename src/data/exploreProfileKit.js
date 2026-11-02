// Helpers for the Explore region sheet's extra sections (exploreProfile*.js).
export const S = (bn, roman, en) => ({ bn, roman, en })
/** A picture, a Bangla line with English, and a short English note for readers who want more. */
export const F = (emoji, line, note) => ({ emoji, ...line, note })
/** A person: name in English and Bangla, a Bangla line about them, and an English note. */
export const P = (name, nameBn, line, note) => ({ name, nameBn, ...line, note })
