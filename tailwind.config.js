/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        themeRed: "#FF6B6B",
        themeOrange: "#FFB26B",
        themeBlue: "#8099F8",
        themeDarkGrey: "#131A19",
        themeBorderGrey: "#2F413E",
        themeTextGrey: "#979797",
        themePurple: "#BD74D8",
        themeGreen: "#4EAD95",
      },
    },
  },
  plugins: [],
}
