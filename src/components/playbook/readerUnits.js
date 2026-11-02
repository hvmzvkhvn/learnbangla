import { pageArtPath } from '../../data/playbook/artwork.js'

const lineOf = ({ bn, roman, en, art, artAlt }) => ({ bn, roman, en, art, artAlt })

export const stepCount = (pages) => pages.reduce((n, p) => n + 1 + (p.more?.length ?? 0), 0)

export function readerUnits(pages, story = false) {
  return story
    ? pages.map((p, pageIndex) => ({ pageIndex, lines: [p.lineEn ? { ...lineOf(p), en: p.lineEn, showEn: true } : lineOf(p), ...(p.more ?? []).map(lineOf)] }))
    : pages.flatMap((p, pageIndex) => [lineOf(p), ...(p.more ?? []).map(lineOf)].map((line, k, all) => ({
      pageIndex,
      art: line.art,
      artAlt: line.artAlt || line.en,
      lines: [line],
      part: all.length > 1 ? `${k + 1} of ${all.length}` : '',
    })))
}

export const unitArtwork = (id, pages, unit) => unit.art ?? pages[unit.pageIndex].art ?? pageArtPath(id, unit.pageIndex)
