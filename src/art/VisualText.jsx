import { Fragment } from 'react'
import artwork from './learning-art.json'
import opticalScales from './optical-scales.json'
import UiIcon from './UiIcon'

const keys = Object.keys(artwork)
  .filter((key) => /\p{Extended_Pictographic}|\p{Regional_Indicator}/u.test(key))
  .sort((a, b) => b.length - a.length)
const pattern = new RegExp(`(${keys.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')}|[0-9]\uFE0F?\u20E3)`, 'gu')
const banglaDigits = '০১২৩৪৫৬৭৮৯'

export function LearningPicture({ symbol, decorative = false }) {
  const art = artwork[symbol]
  if (!art) return symbol
  if (art.kind === 'icon') return <UiIcon name={art.id} label={decorative ? undefined : art.label} />
  if (art.kind === 'colour')
    return (
      <span
        className="learning-swatch"
        style={{ backgroundColor: art.value }}
        role={decorative ? undefined : 'img'}
        aria-label={decorative ? undefined : art.label}
        aria-hidden={decorative || undefined}
      />
    )
  return (
    <span className="learning-picture" style={{ '--art-scale': opticalScales[art.src] || 1 }}>
      <img
        className="learning-visual"
        src={`${import.meta.env.BASE_URL}${art.src}`}
        width="384"
        height="384"
        alt={decorative ? '' : art.label}
        loading="lazy"
        decoding="async"
        draggable="false"
      />
    </span>
  )
}

/** Render content symbols consistently, preserving text, Bangla digits and React children. */
export default function VisualText({ children, decorative = false }) {
  if (typeof children !== 'string') return children
  if (artwork[children]) return <LearningPicture symbol={children} decorative={decorative} />
  return children
    .split(pattern)
    .map((part, i) =>
      artwork[part] ? (
        <LearningPicture key={i} symbol={part} decorative={decorative} />
      ) : (
        <Fragment key={i}>{/^[0-9]\uFE0F?\u20E3$/u.test(part) ? banglaDigits[Number(part[0])] : part}</Fragment>
      ),
    )
}
