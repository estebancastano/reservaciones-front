/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#0A7091',
        secondary:'#003B87',
        kingBlue:'#007AFF',
        neonGreen:'#5AF92F',
        boldRed:'#FF0000',
        lightGray: '#F3F4F6',
        lightGreen: '#B8DEC4',
      }
    },
  },
  plugins: [],
}

