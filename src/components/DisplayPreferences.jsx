import { useId } from 'react'
import { useUI } from '../ui/preferences'
export default function DisplayPreferences() {
  const [ui, setUI] = useUI(),
    id = useId()
  return (
    <fieldset className="display-preferences">
      <legend>Reading & comfort</legend>
      <label htmlFor={`${id}-size`}>Bangla text size</label>
      <select id={`${id}-size`} value={ui.readingSize} onChange={(e) => setUI({ readingSize: e.target.value })}>
        <option value="standard">Standard</option>
        <option value="large">Larger · 115%</option>
        <option value="largest">Largest · 130%</option>
      </select>
      <label htmlFor={`${id}-theme`}>Appearance</label>
      <select id={`${id}-theme`} value={ui.theme} onChange={(e) => setUI({ theme: e.target.value })}>
        <option value="light">Warm daylight</option>
        <option value="evening">Quiet evening</option>
        <option value="system">Match device</option>
      </select>
      <label className="preference-check">
        <input type="checkbox" checked={ui.haptics} onChange={(e) => setUI({ haptics: e.target.checked })} /> Gentle vibration on supported
        devices
      </label>
      <label className="preference-check">
        <input type="checkbox" checked={ui.calm} onChange={(e) => setUI({ calm: e.target.checked })} /> Calm mode
      </label>
      <p className="text-sm text-muted">
        Calm mode reduces motion and celebrations, turns off vibration and pauses automatic audio. Listen buttons still work.
      </p>
    </fieldset>
  )
}
