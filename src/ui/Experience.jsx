import { useEffect } from 'react'
import { stop } from '../audio/audio'
import { useUI } from './preferences'
import { useTrack } from '../state/persist'
export default function Experience() {
  const [ui] = useUI()
  const [track] = useTrack()
  useEffect(() => {
    if (ui.calm) stop()
  }, [ui.calm])
  useEffect(() => {
    const root = document.documentElement,
      query = matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      root.dataset.theme = ui.theme === 'system' ? (query.matches ? 'evening' : 'light') : ui.theme
    }
    apply()
    query.addEventListener('change', apply)
    root.dataset.reading = ui.readingSize
    root.dataset.calm = String(ui.calm)
    root.dataset.track = track || 'young'
    return () => query.removeEventListener('change', apply)
  }, [ui.theme, ui.readingSize, ui.calm, track])
  useEffect(() => {
    const viewport = window.visualViewport
    const update = () => {
      const editing = document.activeElement?.matches('input:not([type=checkbox]):not([type=radio]), textarea')
      document.documentElement.dataset.keyboard = String(Boolean(editing && viewport && window.innerHeight - viewport.height > 120))
    }
    viewport?.addEventListener('resize', update)
    document.addEventListener('focusin', update)
    document.addEventListener('focusout', update)
    return () => {
      viewport?.removeEventListener('resize', update)
      document.removeEventListener('focusin', update)
      document.removeEventListener('focusout', update)
    }
  }, [])
  return null
}
