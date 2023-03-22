/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        one: '0px 6px 16px rgba(0, 0, 0, 0.08)',
        two: 'inset 0px 6px 16px rgba(0, 0, 0, 0.08)'
      },
      colors: {
        cBlack: '#1a191b'
      }
    },
  },
  plugins: [],
}
