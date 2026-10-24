/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}', './data/**/*.ts'],
  theme: {
    extend: {
      colors: {
        jet: '#0A0A0A',
        charcoal: '#151515',
        gold: '#F5B800',
        'deep-gold': '#D99A00',
        'warm-white': '#FAFAF7',
        steel: '#8A8F98',
      },
      fontFamily: {
        display: ['Barlow Condensed', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
