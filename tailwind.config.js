/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./founders/*.html",
    "./templates/*.html",
    "./js/**/*.js",
    "./build.js"
  ],
  theme: {
    extend: {
      colors: {
        background: "#030712",
        primary: "#1d4ed8",
        secondary: "#9333ea",
        neon: "#00ffcc"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif']
      }
    },
  },
  plugins: [],
}
