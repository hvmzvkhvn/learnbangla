import Scene from '../../art/Scene'

export const coverIds = ['dhaka-rickshaw', 'boishakh-fair', 'hilsa-river', 'dada-village', 'our-school', 'coxs-bazar', 'tara-morning', 'nana-village', 'rainy-day', 'my-animals', 'at-market', 'eid-morning']
export const coverUrl = (id) => `${import.meta.env.BASE_URL}images/playbook/${id}.webp`

export function PlayIcon({ kind, ...props }) {
  const paths = {
    read: 'M3 5c3-1 6-1 9 1 3-2 6-2 9-1v14c-3-1-6-1-9 1-3-2-6-2-9-1V5Zm9 1v14',
    look: 'M21 21l-5-5M18 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z',
    build: 'M3 11h8V3H3v8Zm10 10h8v-8h-8v8ZM3 21h8v-8H3v8Zm14-18v8m-4-4h8',
    history: 'M5 3v18m0-16h15l-3 4 3 4H5m4 4h10m-10 4h7',
    audio: 'M4 9v6h4l5 4V5L8 9H4Zm12-1q5 4 0 8m3-11q7 7 0 14',
  }
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[kind] || paths.read} /></svg>
}

export default function Artwork({ bookId, src, scene, id, alt, className = '', eager = false }) {
  return src || coverIds.includes(bookId)
    ? <img className={`pb-artwork ${className}`} src={src || coverUrl(bookId)} alt={alt} width="1536" height="1024" loading={eager ? 'eager' : 'lazy'} decoding="async" />
    : <Scene scene={{ ...scene, furnished:true, alt: alt || scene?.alt }} id={id} className={`pb-scene ${className}`} />
}
