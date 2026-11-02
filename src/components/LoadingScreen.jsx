export default function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-label="Loading your learning space">
      <p>Loading your learning space…</p>
      <div className="skeleton-heading" aria-hidden="true" />
      <div className="browse-grid" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div className="skeleton-card" key={i} />
        ))}
      </div>
    </div>
  )
}
