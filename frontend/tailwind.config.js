// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        softblue: '#3F8CAA',
        white: '#F8F8F8',
        oceanblue: '#30393D',
      },
      fontSize: {
        base: '18px',
        subtitle: '30px',
        title: '70px',
      },
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
  },
  plugins: [],
}