import VisualText from '../../art/VisualText'
import { speak } from '../../audio/audio'
import Speaker from '../Speaker'
import { useRoman } from '../../state/roman'

/** A line of Bangla with tap-a-word audio, romanisation and the English underneath. */
export default function BanglaLine({ s, emoji, size = 'text-xl' }) {
  const [romanOn] = useRoman()
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white px-3 py-3 shadow-sm">
      {emoji && (
        <span className="text-3xl">
          <VisualText>{emoji}</VisualText>
        </span>
      )}
      <div className="flex-1">
        <p lang="bn" className={`font-bangla font-bold leading-snug text-primary ${size}`}>
          {s.bn.split(' ').map((t, i) => (
            <button
              key={i}
              type="button"
              onClick={() => speak(t, { force: true })}
              className="mr-1.5 rounded-lg px-0.5 transition active:scale-[0.98] hover:bg-primary/10"
            >
              {t}
            </button>
          ))}
        </p>
        {romanOn && <p className="text-sm font-bold text-muted">{s.roman}</p>}
        <p className="text-sm text-muted">{s.en}</p>
      </div>
      <Speaker text={s.bn} size="sm" label="Hear the sentence" />
    </div>
  )
}
