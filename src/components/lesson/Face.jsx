import Speaker from '../Speaker'
import { useRoman } from '../../state/roman'

// Renders a "face": any mix of picture/digit (art), Bangla (bn), romanisation and English text.
// With `speak`, a 🔊 button plays the Bangla (f.say overrides what is spoken; f.noAudio silences it).
export default function Face({ f, big = false, speak = false }) {
  const [romanOn] = useRoman()
  if (!f) return null
  if (f.listen) {
    return (
      <div className="flex flex-col items-center gap-2 py-2">
        <Speaker text={f.say} size="lg" label="Play the audio" className="!h-20 !w-20 !text-5xl" />
        <span className="text-sm font-bold text-ink/50">Tap to listen</span>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center text-center leading-tight">
      {f.art && <span className={`font-bangla ${big ? 'text-7xl' : 'text-4xl'}`}>{f.art}</span>}
      {f.bn && (
        <span className={`font-bangla font-bold text-primary ${big ? (f.bn.length > 40 ? 'mt-2 text-2xl leading-snug' : f.bn.length > 22 ? 'mt-2 text-3xl leading-snug' : 'mt-2 text-5xl') : 'text-2xl'}`}>{f.bn}</span>
      )}
      {f.roman && (romanOn || !f.bn) && <span className="mt-1 text-sm font-bold text-ink/50">{f.roman}</span>}
      {f.text && <span className={`font-extrabold text-ink ${big ? 'mt-2 text-2xl' : 'text-base'}`}>{f.text}</span>}
      {speak && f.bn && !f.noAudio && <Speaker inline size={big ? 'md' : 'sm'} text={f.say ?? f.bn} className="mt-2" />}
    </div>
  )
}
