// Shared bits for the hand-drawn sprites. Every sprite is drawn in a 100 × 100 box, centred, feet / base near y = 90.
export const O = '#4A3B32' // outline
export const st = { stroke: O, strokeWidth: 2, strokeLinejoin: 'round', strokeLinecap: 'round' }
export const C = {
  skin: '#D9A073', skinD: '#BF855A', skinL: '#EBC09A', hair: '#2B1D1A', grey: '#D8D8D8',
  red: '#E5604D', coral: '#F08A6C', orange: '#F4A324', yellow: '#F7D154', green: '#5FB158', leaf: '#3E9B5F', dark: '#2F6B3E',
  teal: '#1B7A7A', blue: '#4C9BD6', sky: '#9FD3F2', navy: '#2F4B7C', purple: '#8A63B8', pink: '#E985A8',
  brown: '#8B5A3C', wood: '#B98355', straw: '#E6C76B', white: '#FFFFFF', cream: '#FFF4DC', steel: '#9AA7B5', dgrey: '#6B7480',
}

const registry = {}
const scales = {}
const clean = (e) => e.replace(/️/g, '')
/** Register one sprite under one or more emoji (space-separated). */
export const def = (emojis, Comp, scale = 1.2) =>
  emojis.split(' ').forEach((e) => {
    registry[clean(e)] = Comp
    scales[clean(e)] = scale
  })
/** How much bigger than its emoji slot this sprite is drawn (people and animals read small otherwise). Grows upward from the feet. */
export const scaleFor = (e) => scales[clean(e ?? '')] ?? 1.2
export const spriteFor = (e) => registry[clean(e ?? '')]
export const allSpriteKeys = () => Object.keys(registry)
