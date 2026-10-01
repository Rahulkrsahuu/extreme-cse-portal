/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#060810',
          card: '#0c101c',
          cyan: '#00f0ff',
          neon: '#10b981',
          violet: '#a855f7'
        }
      }
    },
  },
  plugins: [],
}
