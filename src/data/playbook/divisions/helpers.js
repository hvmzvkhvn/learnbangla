// Division deep dives (16–18 and 18+): about a dozen chapters for each of the eight divisions, written in text.
//   c(heading, paint, narration, background, [bn, roman, en], line, line)
//     heading     chapter title
//     paint       a sentence describing the painting that belongs on the chapter (feeds docs/long-story-art-plan.json)
//     narration   English paragraph shown first
//     background  a second, deeper English paragraph
//     lines       three Bangla lines (the first is the main caption), each { bn, roman, en }
export const l = (bn, roman, en) => ({ bn, roman, en })
export const c = (heading, paint, en, deep, main, ...more) => ({ heading, paint, en, deep, main: l(...main), more: more.map((x) => l(...x)) })

export const divisionArtPath = (id, index) => `images/playbook/divisions/${id}-${String(index + 1).padStart(2, '0')}.webp`

/** A division's chapters as reader pages, in the shape BookReader's story mode expects. */
export const divisionPages = (id, chapters) => chapters.map((ch, i) => ({
  label: ch.heading,
  heading: ch.heading,
  art: divisionArtPath(id, i),
  en: ch.en,
  deep: [ch.deep],
  bn: ch.main.bn,
  roman: ch.main.roman,
  lineEn: ch.main.en,
  more: ch.more,
}))
