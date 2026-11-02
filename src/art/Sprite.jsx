import artwork from './learning-art.json'
import { spriteFor } from './sprites'

/** One drawn picture on its own (used in the Build-the-scene tray and tiles). Uses the shared illustration library before the legacy vector drawings. */
export default function Sprite({ e, className = '' }) {
  const picture = artwork[e]
  if (picture?.kind === 'image') return <img src={`${import.meta.env.BASE_URL}${picture.src}`} width="384" height="384" alt={picture.label} className={className} loading="lazy" decoding="async" style={{ objectFit: 'contain' }} />
  const S = spriteFor(e)
  if (!S) return <span className={className}>{e}</span>
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <S />
    </svg>
  )
}
