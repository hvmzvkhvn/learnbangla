/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1B7A7A',
        secondary: '#F4A324',
        accent: '#FFD166',
        background: '#FFFDF7',
        ink: '#2D2D2D',
        success: '#4CAF7D',
        error: '#E8624A',
      },
      fontFamily: {
        sans: ['Nunito', '"Noto Sans Bengali"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        bangla: ['"Noto Sans Bengali"', 'Nunito', 'sans-serif'],
      },
      keyframes: {
        shake: { '0%,100%': { transform: 'translateX(0)' }, '20%,60%': { transform: 'translateX(-6px)' }, '40%,80%': { transform: 'translateX(6px)' } },
        floatUp: { '0%': { opacity: '0', transform: 'translateY(8px) scale(.9)' }, '15%': { opacity: '1' }, '100%': { opacity: '0', transform: 'translateY(-44px) scale(1.15)' } },
        pop: { '0%': { transform: 'scale(.6)', opacity: '0' }, '60%': { transform: 'scale(1.08)' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        confetti: { '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' }, '100%': { transform: 'translateY(105vh) rotate(540deg)', opacity: '.9' } },
        slideIn: { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        flip: { '0%': { transform: 'rotateY(90deg)' }, '100%': { transform: 'rotateY(0deg)' } },
        blink: { '0%,80%,100%': { opacity: '.25' }, '40%': { opacity: '1' } },
      },
      animation: {
        shake: 'shake .4s ease-in-out',
        floatUp: 'floatUp 1.2s ease-out forwards',
        pop: 'pop .35s ease-out',
        confetti: 'confetti 3s linear forwards',
        slideIn: 'slideIn .3s ease-out',
        flip: 'flip .25s ease-out',
        blink: 'blink 1.2s infinite',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
