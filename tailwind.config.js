/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.tsx",
    "./src/**/*.tsx",
    "./src/**/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        'primary-yellow': '#FCC436',
        'primary-purple': '#41197F',
        'primary-gray': '#797D86',
        'primary-black': '#1A1B1C',
      },
      fontSize: {
        'xxs': '9px',
      },
    },
  },
  plugins: [],
}

