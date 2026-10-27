// The "show transliteration" preference (lb.roman). Read directly so non-React code (exercise building) can use it too.
export const romanOn = () => {
  try {
    return JSON.parse(localStorage.getItem('lb.roman') ?? 'true') !== false
  } catch {
    return true
  }
}
