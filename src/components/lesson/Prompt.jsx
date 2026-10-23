import Speaker from '../Speaker'

// The instruction line above a question, with a button that reads it aloud (English).
export default function Prompt({ text }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-2">
      <h2 className="text-center text-xl font-extrabold text-ink">{text}</h2>
      <Speaker english text={text} size="sm" label="Read the instruction aloud" />
    </div>
  )
}
