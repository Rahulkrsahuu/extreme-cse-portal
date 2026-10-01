/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#E84125',
          navy: '#182232',
          dark: '#070A10',
          card: '#0D1424'
        }
      }
    },
  },
  plugins: [],
}
