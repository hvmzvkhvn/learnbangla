// Turns a raw microphone recording into a small, clean mp3: mono, 24 kHz, silence trimmed, volume levelled.
import { Mp3Encoder } from '@breezystack/lamejs'

const RATE = 24000
const KBPS = 48

async function toMono(blob) {
  const ac = new (window.AudioContext || window.webkitAudioContext)()
  try {
    const decoded = await ac.decodeAudioData(await blob.arrayBuffer())
    const length = Math.max(1, Math.ceil(decoded.duration * RATE))
    const off = new OfflineAudioContext(1, length, RATE)
    const src = off.createBufferSource()
    src.buffer = decoded
    src.connect(off.destination)
    src.start()
    const rendered = await off.startRendering()
    return rendered.getChannelData(0)
  } finally {
    ac.close?.()
  }
}

/** { start, end } sample range that holds the speech, with a little breathing room either side. */
export function speechRange(samples, rate = RATE) {
  let peak = 0
  for (let i = 0; i < samples.length; i++) peak = Math.max(peak, Math.abs(samples[i]))
  if (peak < 0.01) return null
  const gate = Math.max(0.015, peak * 0.08)
  const win = Math.round(rate * 0.01)
  const loud = (i) => {
    let m = 0
    for (let k = i; k < Math.min(samples.length, i + win); k++) m = Math.max(m, Math.abs(samples[k]))
    return m > gate
  }
  let start = 0
  while (start < samples.length && !loud(start)) start += win
  let end = samples.length - win
  while (end > start && !loud(end)) end -= win
  const pad = Math.round(rate * 0.12)
  return { start: Math.max(0, start - pad), end: Math.min(samples.length, end + win + pad), peak }
}

/** Encode: returns { blob, ms } or null if the recording was silent. */
export async function encodeClip(blob) {
  const all = await toMono(blob)
  const range = speechRange(all)
  if (!range) return null
  const gain = Math.min(8, 0.9 / range.peak)
  const part = all.subarray(range.start, range.end)
  const pcm = new Int16Array(part.length)
  for (let i = 0; i < part.length; i++) pcm[i] = Math.max(-1, Math.min(1, part[i] * gain)) * 32767
  const enc = new Mp3Encoder(1, RATE, KBPS)
  const chunks = []
  for (let i = 0; i < pcm.length; i += 1152) {
    const b = enc.encodeBuffer(pcm.subarray(i, i + 1152))
    if (b.length) chunks.push(b)
  }
  const tail = enc.flush()
  if (tail.length) chunks.push(tail)
  return { blob: new Blob(chunks, { type: 'audio/mpeg' }), ms: Math.round((part.length / RATE) * 1000) }
}
