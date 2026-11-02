const historyDescriptions = {
  "ancient-mughal": [
    "Rice fields, fishing boats and branching waterways in the Bengal delta.",
    "The brick ramparts and archaeological remains of Mahasthangarh near Bogura.",
    "A reconstruction of Bengali chiefs choosing Gopala as their leader in the eighth century.",
    "A Buddhist poet writing on palm leaves beside a river in early medieval Bengal.",
    "Builders working on a red-brick mosque in fifteenth-century Bengal.",
    "A Bhati leader surveys the river channels from an oared boat in sixteenth-century Bengal.",
    "Cargo boats and traders at a Buriganga landing in seventeenth-century Jahangirnagar.",
    "A Bengali handloom weaver making fine muslin cloth."
  ],
  "colonial": [
    "Opposing armies and field cannons in the mango groves of Plassey in 1757.",
    "A peasant family brings a payment to a land-revenue clerk in colonial Bengal.",
    "Villagers reinforce the bamboo walls of Titumir’s fort in 1831.",
    "Students read together on a shaded college veranda in early twentieth-century Bengal.",
    "Curzon Hall in Dhaka with pedestrians in early twentieth-century dress.",
    "A community relief kitchen serves families during the Bengal famine of 1943.",
    "Families carrying bundles wait beside a train during the partition of Bengal in 1947."
  ],
  "language-liberation": [
    "A family discusses a newspaper beside an East Bengal river landing after partition.",
    "Students protest for their language outside a Dhaka college in 1948.",
    "Students gather with grief and resolve during the Language Movement in Dhaka in 1952.",
    "Young adults bring books and flowers to the Shaheed Minar on Mother Language Day.",
    "Voters queue at an East Pakistan polling station in 1954.",
    "Volunteers bring food by boat to a coastal village after the cyclone of 1970.",
    "Sheikh Mujibur Rahman addresses the crowd at Dhaka Racecourse on 7 March 1971.",
    "A crowd attends the provisional government’s oath-taking in a mango grove at Mujibnagar in April 1971.",
    "Families reunite and celebrate the end of the war in Dhaka in December 1971."
  ],
  "people-culture": [
    "Rabindranath Tagore writes at a desk overlooking the Padma river.",
    "Kazi Nazrul Islam composes beside a harmonium and writing papers.",
    "Begum Rokeya reads with girls in a modest schoolroom.",
    "Zainul Abedin works with ink and brush at his desk in 1943.",
    "An interpretation of Lalon singing with Baul listeners beneath a village tree.",
    "Women embroider flowers and birds into a nakshi kantha quilt.",
    "A Pohela Boishakh procession carries colourful handmade folk-art masks.",
    "Boats carry produce along a Bengali river beside rice fields and villages."
  ]
}

const firstSentence = (text) => {
  const end = text.search(/[.!?](?:\s|$)/)
  return end < 0 ? text : text.slice(0, end + 1)
}

// Each added passage owns a distinct asset; original page paintings stay in place.
export const readingArtPath = (group, id, page, kind, index = null) => {
  const pad = (n) => String(n + 1).padStart(2, '0')
  return `images/playbook/additions/${group}-${id}-${pad(page)}-${kind}${index === null ? '' : `-${pad(index)}`}.webp`
}

export function illustrateAdditions(group, id, page, pageIndex) {
  page.more = (page.more ?? []).map((line, index) => ({
    ...line,
    art: readingArtPath(group, id, pageIndex, 'reading', index),
    artAlt: line.en,
  }))
  if (page.deep) page.deepArt = page.deep.map((text, index) => ({
    art: readingArtPath(group, id, pageIndex, 'background', index),
    artAlt: firstSentence(text),
  }))
  if (group === 'history') {
    page.art = readingArtPath(group, id, pageIndex, 'chapter')
    page.artAlt = historyDescriptions[id]?.[pageIndex] ?? `${page.label}: ${firstSentence(page.en)}`
  }
}
