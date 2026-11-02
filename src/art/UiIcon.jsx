// Small controls use consistent strokes rather than miniature paintings.
const paths = {
  paw: 'M6 10a2 3 0 1 0 0-6 2 3 0 0 0 0 6ZM12 8a2 3 0 1 0 0-6 2 3 0 0 0 0 6ZM18 10a2 3 0 1 0 0-6 2 3 0 0 0 0 6ZM5 18c0-3 4-7 7-7s7 4 7 7c0 5-5 2-7 2s-7 3-7-2Z',
  people: 'M10 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM20 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM1 22v-5a6 6 0 0 1 12 0v5M13 13a6 6 0 0 1 10 4v5',
  wave: 'M8 12V5a1.5 1.5 0 0 1 3 0v6M11 5V3a1.5 1.5 0 0 1 3 0v8M14 5a1.5 1.5 0 0 1 3 0v7M17 8a1.5 1.5 0 0 1 3 0v7a7 7 0 0 1-12 5l-5-6a1.5 1.5 0 0 1 2-2l3 3M2 3l2 2M21 2l-2 2',

  food: 'M3 10h18a9 9 0 0 1-18 0ZM2 10h20M8 3v3M12 2v4M16 3v3',
  person: 'M16 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 22v-3a8 8 0 0 1 16 0v3',
  calendar: 'M3 5h18v16H3zM7 2v6M17 2v6M3 10h18M7 14h2M13 14h2M7 18h2',
  sun: 'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 1v3M12 20v3M1 12h3M20 12h3M4 4l2 2M18 18l2 2M4 20l2-2M18 6l2-2',

  wind: 'M3 8h12a3 3 0 1 0-3-3M2 12h18a3 3 0 1 1-3 3M4 16h6a3 3 0 1 1-3 3',
  check: 'm5 12 4 4L19 6',
  close: 'm6 6 12 12M18 6 6 18',
  lock: 'M7 10V7a5 5 0 0 1 10 0v3M6 10h12v11H6zM12 14v3',
  sound: 'M4 9h4l5-5v16l-5-5H4zM16 8a6 6 0 0 1 0 8M19 5a10 10 0 0 1 0 14',
  mute: 'M4 9h4l5-5v16l-5-5H4zM17 9l5 6M22 9l-5 6',
  play: 'm8 4 12 8-12 8z',
  repeat: 'M4 8a8 8 0 0 1 14-3l2 3M20 3v5h-5M20 16a8 8 0 0 1-14 3l-2-3M4 21v-5h5',
  pin: 'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM14 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0',
  search: 'M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-1 5 6 6',
  mic: 'M9 5a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0ZM5 11a7 7 0 0 0 14 0M12 18v4M8 22h8',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  timer: 'M9 2h6M12 2v3M19 5l2 2M20 13a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM12 8v5l3 2',
  hourglass: 'M6 2h12M6 22h12M7 2v5l10 10v5M17 2v5L7 17v5',
  bolt: 'm14 2-10 12h7l-1 8L20 9h-7z',
  bulb: 'M9 18h6M9 21h6M8 15a7 7 0 1 1 8 0v3H8z',
  info: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM12 11v6M12 7h.01',
  question: 'M9 8a3 3 0 1 1 5 2c-2 1-2 2-2 4M12 18h.01',
  warning: 'm12 3 10 18H2zM12 9v5M12 18h.01',
  up: 'M12 21V3m-7 7 7-7 7 7',
  down: 'M12 3v18m-7-7 7 7 7-7',
  right: 'M3 12h18m-7-7 7 7-7 7',
  left: 'M21 12H3m7-7-7 7 7 7',
  both: 'M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4',
  external: 'M6 18 18 6M6 6h12v12',
  stop: 'M5 5h14v14H5z',
  back: 'm11 5-9 7 9 7zm10 0-9 7 9 7z',
  forward: 'm3 5 9 7-9 7zm10 0 9 7-9 7z',
  keyboard: 'M2 5h20v14H2zM6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 16h10',
  gear: 'm10 2-1 3-3 1-3-1-2 4 2 2v3l-2 2 2 4 3-1 3 1 1 3h4l1-3 3-1 3 1 2-4-2-2v-3l2-2-2-4-3 1-3-1-1-3ZM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  pencil: 'm4 15 12-12 5 5L9 20l-6 1zM13 6l5 5',
  home: 'm3 10 9-8 9 8M5 9v12h14V9M9 21v-8h6v8',
  palette:
    'M12 2a10 10 0 1 0 0 20h2a3 3 0 0 0 0-6h-1a2 2 0 0 1 0-4h5a4 4 0 0 0 4-4c0-4-6-6-10-6ZM7 7h.01M5 12h.01M9 17h.01M13 6h.01M18 8h.01',
  game: 'M7 7h10c3 0 5 10 4 12s-4-2-5-3H8c-1 1-4 5-5 3S4 7 7 7ZM7 10v6M4 13h6M16 12h.01M19 14h.01',
  star: 'm12 2 3 6 7 1-5 5 1 8-6-4-6 4 1-8-5-5 7-1z',
  compass: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM16 8l-3 5-5 3 3-5z',
  medal: 'm7 3 5 7 5-7M5 2h5l2 3 2-3h5l-4 9M9 11 5 2M18 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0',
}
const iconNames = {
  '✅': 'check',
  '❌': 'close',
  '🔒': 'lock',
  '🔊': 'sound',
  '🔇': 'mute',
  '▶': 'play',
  '🔁': 'repeat',
  '📍': 'pin',
  '📌': 'pin',
  '🔍': 'search',
  '🎤': 'mic',
  '🎙️': 'mic',
  '✉️': 'mail',
  '📧': 'mail',
  '⏱': 'timer',
  '⏱️': 'timer',
  '⏳': 'hourglass',
  '⚡': 'bolt',
  '💡': 'bulb',
  ℹ️: 'info',
  '❓': 'question',
  '⚠️': 'warning',
  '⬆️': 'up',
  '🔼': 'up',
  '⬇': 'down',
  '🔽': 'down',
  '➡️': 'right',
  '🔜': 'right',
  '⬅️': 'left',
  '↔': 'both',
  '↗': 'external',
  '⏹️': 'stop',
  '⏪': 'back',
  '⏩': 'forward',
  '⌨️': 'keyboard',
  '⚙️': 'gear',
  '📝': 'pencil',
  '✏️': 'pencil',
  '🏠': 'home',
  '🎨': 'palette',
  '🎮': 'game',
  '🌟': 'star',
  '🏅': 'medal',
  '🧭': 'compass',
}
const letters = {
  '🔤': 'অ',
  '🔠': 'ক',
  '🔢': '১২',
  '🅰️': 'ক',
  '🅱️': 'ট',
  '🅾️': 'প',
  '💯': '১০০',
  '🔟': '১০',
  '🆕': 'নতুন',
}
export default function UiIcon({ name, className = '', label }) {
  const id = iconNames[name] || name
  return (
    <svg
      className={`ui-icon ${className}`}
      viewBox="0 0 24 24"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {letters[name] ? (
        <text
          x="12"
          y="17"
          textAnchor="middle"
          fill="currentColor"
          fontSize={name === '🆕' ? 10 : 14}
          fontFamily="'Noto Sans Bengali', sans-serif"
          fontWeight="700"
        >
          {letters[name]}
        </text>
      ) : (
        <path
          d={paths[id] || paths.info}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}
