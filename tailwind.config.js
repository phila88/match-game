/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'cloud-pattern': "url('./assets/endless-clouds.svg')",
      },
      colors: {
        eggplant: '#5E4B56',
        blue: '#4F517D',
        white: '#FCD0A1',
        cambridgeBlue: '#81B29A',
        pink: '#F9CFF2',
      },
    },
  },
  plugins: [],
};
