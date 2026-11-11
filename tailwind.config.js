/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#1e293b',
          900: '#0b192c',
          950: '#060e1a',
        },
        gold: {
          50: '#fdfbf2',
          100: '#fbf7e2',
          200: '#f5ecc3',
          300: '#edda99',
          400: '#e1bf64',
          500: '#d4af37',
          600: '#b88e28',
          700: '#946d21',
          800: '#795620',
          900: '#66471f',
        },
        parchment: {
          50: '#fefdfb',
          100: '#fdfbf7',
          200: '#faf6f0',
          300: '#f4ede1',
          400: '#ebdccb',
          500: '#dec7b0',
        },
        sepia: {
          50: '#faf5eb',
          100: '#f4ecd8',
          200: '#ebd9b8',
          300: '#dfc294',
          text: '#3b2f22',
          card: '#eee3cd',
        }
      },
      fontFamily: {
        serif: ['"Noto Serif Bengali"', 'serif'],
        sans: ['"Noto Sans Bengali"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
