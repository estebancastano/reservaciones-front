/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#F6F1F1',
        secondary:'#D9D9D9',
        kingBlue:'#007AFF',
        neonGreen:'#5AF92F',
        boldRed:'#FF0000',
      }
    },
  },
  plugins: [],
}

