import Speaker from '../Speaker'

// Renders a "face": any mix of picture/digit (art), Bangla (bn), romanisation and English text.
// With `speak`, a 🔊 button plays the Bangla (f.say overrides what is spoken; f.noAudio silences it).
export default function Face({ f, big = false, speak = false }) {
  if (!f) return null
  return (
    <div className="flex flex-col items-center text-center leading-tight">
      {f.art && <span className={`font-bangla ${big ? 'text-7xl' : 'text-4xl'}`}>{f.art}</span>}
      {f.bn && (
        <span className={`font-bangla font-bold text-primary ${big ? 'mt-2 text-5xl' : 'text-2xl'}`}>{f.bn}</span>
      )}
      {f.roman && <span className="mt-1 text-sm font-bold text-ink/50">{f.roman}</span>}
      {f.text && <span className={`font-extrabold text-ink ${big ? 'mt-2 text-2xl' : 'text-base'}`}>{f.text}</span>}
      {speak && f.bn && !f.noAudio && <Speaker inline size={big ? 'md' : 'sm'} text={f.say ?? f.bn} className="mt-2" />}
    </div>
  )
}
