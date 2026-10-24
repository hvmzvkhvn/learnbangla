import { useMemo, useState } from 'react'

// A small "are you a grown-up?" check in front of the parent area, so a child using the device does not wander in.
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
const words = (n) => {
  const h = Math.floor(n / 100)
  const r = n % 100
  const tail = r < 20 ? (r ? ONES[r] : '') : TENS[Math.floor(r / 10)] + (r % 10 ? `-${ONES[r % 10]}` : '')
  return [h ? `${ONES[h]} hundred` : '', h && tail ? 'and' : '', tail].filter(Boolean).join(' ')
}

const KEY = 'lb.gate'
const FRESH_MS = 10 * 60 * 1000
const isOpen = () => {
  try {
    return Date.now() - Number(sessionStorage.getItem(KEY) ?? 0) < FRESH_MS
  } catch {
    return false
  }
}

export default function GrownUpGate({ children, why = 'This part is for parents and guardians.' }) {
  const [open, setOpen] = useState(isOpen)
  const [n] = useState(() => 120 + Math.floor(Math.random() * 870))
  const [val, setVal] = useState('')
  const [bad, setBad] = useState(false)
  const phrase = useMemo(() => words(n), [n])
  if (open) return children

  const submit = (e) => {
    e.preventDefault()
    if (Number(val) === n) {
      try {
        sessionStorage.setItem(KEY, String(Date.now()))
      } catch {
        /* ignore */
      }
      setOpen(true)
    } else {
      setBad(true)
      setVal('')
    }
  }

  return (
    <form onSubmit={submit} className="card mx-auto mt-6 max-w-sm text-center">
      <p className="text-5xl">🔒</p>
      <h1 className="mt-2 text-2xl font-extrabold text-primary">Grown-ups only</h1>
      <p className="mt-1 text-sm text-ink/60">{why}</p>
      <p className="mt-4 text-sm font-bold text-ink/70">Type this number in digits:</p>
      <p className="mt-1 text-xl font-extrabold text-ink">{phrase}</p>
      <input value={val} onChange={(e) => { setVal(e.target.value.replace(/\D/g, '')); setBad(false) }} inputMode="numeric" autoFocus className="input-field mt-3 text-center text-xl" aria-label="The number" />
      {bad && <p className="mt-2 text-sm font-bold text-error">Not quite — try the new number.</p>}
      <button type="submit" disabled={!val} className="btn-primary mt-4 w-full">Continue</button>
    </form>
  )
}
