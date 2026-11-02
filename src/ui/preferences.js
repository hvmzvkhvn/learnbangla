import { usePersistent, readPersistent } from '../state/persist'
export const DEFAULT_UI = Object.freeze({ theme: 'light', readingSize: 'standard', haptics: false, calm: false })
export function normalizeUI(value) {
  return {
    theme: ['light', 'evening', 'system'].includes(value?.theme) ? value.theme : 'light',
    readingSize: ['standard', 'large', 'largest'].includes(value?.readingSize) ? value.readingSize : 'standard',
    haptics: value?.haptics === true,
    calm: value?.calm === true,
  }
}
export const readUI = () => normalizeUI(readPersistent('lb.ui', DEFAULT_UI))
export function useUI() {
  const [value, setValue] = usePersistent('lb.ui', DEFAULT_UI)
  return [normalizeUI(value), (patch) => setValue((old) => normalizeUI({ ...old, ...patch }))]
}
