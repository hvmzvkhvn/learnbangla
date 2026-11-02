// Authoring helpers for the big stories (kept apart from index.js so story files can import them without a cycle).
//   line = { bn, roman, en }
//   beat(title, paint, [narration, line, line], [narration, background, line, line])
//     title      the slide's heading
//     paint      a sentence describing the painting that belongs on this slide (feeds docs/long-story-art-plan.json)
//     easy       English narration + two short Bangla lines
//     hard       English narration + a background paragraph + two long, complex Bangla lines
export const l = (bn, roman, en) => ({ bn, roman, en })
export const beat = (title, paint, [en, ...easy], [hardEn, deep, ...hard]) => ({ title, paint, easy: { en, lines: easy }, hard: { en: hardEn, deep, lines: hard } })
