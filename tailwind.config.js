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
