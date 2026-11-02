import artwork from './learning-art.json'

// Different legacy symbols can intentionally share one picture. Quiz answers must not.
export function visualIdentity(symbol) {
  const art = artwork[symbol]
  if (art?.kind === 'image') return art.src
  if (art?.kind === 'colour') return `colour:${art.value}`
  if (art?.kind === 'icon') return `icon:${art.id.replace(/\uFE0F/g, '')}`
  return symbol
}

export function uniquePictureItems(items) {
  const seen = new Set()
  return items.filter(item => {
    const key = visualIdentity(item.art)
    if (key == null || seen.has(key)) return false
    seen.add(key)
    return true
  })
}
