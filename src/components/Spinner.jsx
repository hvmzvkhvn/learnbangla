export default function Spinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
    </div>
  )
}
