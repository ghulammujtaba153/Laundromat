/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #5ea5a6 60%, #c0f6f6)',
        'custom-bg': "url('2151176250.jpg')",
      },
      width: {
        '150': '170px', // You can name this key as you like, for example 'custom'
        '250': '250px', // You can name this key as you like, for example 'custom'
        '350': '330px', // You can name this key as you like, for example 'custom'
        '35': '35%', // You can name this key as you like, for example 'custom'
        '55': '55%', // You can name this key as you like, for example 'custom'
        '70': '45%', // You can name this key as you like, for example 'custom'
        '90vh': '90vh',
        '9%': '90%',
      },
      height: {
        '90vh':'90vh',
      },
      colors: {
        'primary': {
          'back': '#DDD0C8',
          'front': '#000000',
          'bg': '#dbe8e7',
          'lightblue': '#c0f6f6',
          'blue': '#5ea5a6',
          'darkblue': '#175657',
          'yellow': '#f77f35',
        }
      },
      height: {
        '80vh': '80vh',
      },
      fontFamily: {
        'railextra': ['railextra', 'sans-serif'],
        'raillight': ['raillight', 'sans-serif'],
        'railregular': ['railregular', 'sans-serif'],
        'railmedium': ['railmedium', 'sans-serif'],
        'robotto': ['robotto', 'sans-serif'],
        'robottomed': ['robottomed', 'sans-serif'],
        'robottoblack': ['robottoblack', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
