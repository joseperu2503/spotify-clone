/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'song': '16px 6fr 4fr 3fr minmax(120px,1fr)',
        'layout': '240px 1fr',
      },
      height: {
        'header-artist': '40vh',
        'header-album': '30vh',
      },
      colors: {
        'sidebar-gray': '#b3b3b3',
      },
      backgroundImage:{
        'gradient-liked-songs' : 'linear-gradient(135deg,#450af5,#c4efd9)'
      }

    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
