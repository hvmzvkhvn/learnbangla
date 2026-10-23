// Shared by the app and scripts/generate-audio.mjs so both agree on what gets recorded.

// Marks that can't be spoken on their own are recorded with a carrier vowel.
const SAY = { 'ং': 'অং', 'ঃ': 'অঃ', 'ঁ': 'অঁ', 'ৎ': 'অৎ' }

/** Key used to look a piece of text up in the audio manifest. */
export const norm = (text) => text.replace(/…/g, '').trim()

/** What is actually spoken for that text. */
export const sayFor = (text) => SAY[norm(text)] ?? norm(text)
