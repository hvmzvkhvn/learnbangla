// One painting for every page; indices are zero-based, filenames are one-based.
export const pageArtPath = (storyId, index) =>
  `images/playbook/pages/${storyId.replace(':', '-')}-${String(index + 1).padStart(2, '0')}.webp`

export const backdropPath = (id) => `images/playbook/build/backdrop-${id}.webp`
export const piecePath = (id) => `images/playbook/build/piece-${id}.webp`

export const paintedPieces = {
  '🏡': { id: 'house', label: 'House', concept: 'house' },
  '🏠': { id: 'house', label: 'House', concept: 'house' },
  '🌳': { id: 'tree', label: 'Tree', concept: 'tree' },
  '☀️': { id: 'sun', label: 'Sun', concept: 'sun' },
  '🐄': { id: 'cow', label: 'Cow', concept: 'cow' },
  '🛶': { id: 'boat', label: 'Wooden boat', concept: 'boat' },
  '🐦': { id: 'bird', label: 'Bird', concept: 'bird' },
  '🌙': { id: 'moon', label: 'Moon', concept: 'moon' },
  '⭐': { id: 'star', label: 'Star', concept: 'star' },
  '🦉': { id: 'owl', label: 'Owl', concept: 'owl' },
  '⛵': { id: 'sailboat', label: 'Sailboat', concept: 'boat' },
  '🐟': { id: 'fish', label: 'Fish', concept: 'fish' },
  '☁️': { id: 'cloud', label: 'Cloud', concept: 'cloud' },
  '🦆': { id: 'duck', label: 'Duck', concept: 'duck' },
}

// Exclude equivalent answers (two houses or two boats) and duplicate pictures.
export function pieceDistractors(emoji) {
  const target = paintedPieces[emoji]
  const seen = new Set(target.concept === 'bird' ? ['bird', 'owl', 'duck'] : [target.concept])
  return Object.entries(paintedPieces).filter(([, piece]) => {
    if (seen.has(piece.concept)) return false
    seen.add(piece.concept)
    return true
  }).map(([key]) => key)
}
