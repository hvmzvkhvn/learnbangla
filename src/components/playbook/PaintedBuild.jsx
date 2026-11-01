import { backdropPath, paintedPieces, piecePath } from '../../data/playbook/artwork'

export function PaintedPiece({ emoji, ...props }) {
  const piece = paintedPieces[emoji]
  return <img src={`${import.meta.env.BASE_URL}${piecePath(piece.id)}`} alt="" width="640" height="640" decoding="async" draggable="false" {...props} />
}

export default function PaintedBuild({ task, placed = task.steps.length, preview = false }) {
  return <div className={`pb-painted-build pb-build-${task.id} ${preview ? 'pb-build-preview' : ''}`} role="img" aria-label={preview ? `${task.title.en} — painted scene` : `${task.title.en}: ${placed} of ${task.steps.length} pieces placed`}>
    <img className="pb-build-backdrop" src={`${import.meta.env.BASE_URL}${backdropPath(task.id)}`} alt="" width="1200" height="800" loading={preview ? 'lazy' : 'eager'} decoding="async" />
    {task.steps.map((step, index) => <div key={`${step.e}-${index}`} data-piece={paintedPieces[step.e].id} className={`pb-build-piece ${index < placed ? 'is-placed' : 'is-waiting'}`} style={{ left: `${step.x}%`, top: `${step.y}%`, width: `${step.s / 3}%` }}>
      {index < placed ? <PaintedPiece emoji={step.e} loading={preview ? 'lazy' : 'eager'} /> : <span className="pb-placement-guide" aria-hidden="true">{index + 1}</span>}
    </div>)}
  </div>
}
