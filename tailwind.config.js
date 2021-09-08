const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      primary: '#05C46B',
      'primary-hover': '#28D17C',
      white: '#FFFFFF',
      'white-hover': '#F6F6F6',
      body: '#F1F1F1',
      'body-hover': '#F6F6F6',
      line: '#D9D9D9',
      'line-hover': '#E6E6E6',
      content: '#2D2D2D',
      danger: '#E74C3C',
      blured: '#2d2d2d05',
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink
    },
    fontFamily: {
      body: ['IRANSansX']
    },
    fontWeight: {
      normal: 'normal',
      bold: 'bold'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
