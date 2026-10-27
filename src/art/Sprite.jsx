import { spriteFor } from './sprites'

/** One drawn picture on its own (used in the Build-the-scene tray and tiles). Falls back to the emoji if there is no sprite. */
export default function Sprite({ e, className = '' }) {
  const S = spriteFor(e)
  if (!S) return <span className={className}>{e}</span>
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <S />
    </svg>
  )
}
