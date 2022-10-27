/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        themeGreen: "#4EAD95",
        themeRed: "#FF6B6B",
        themeOrange: "#FFB26B",
      },
    },
  },
  plugins: [],
}
