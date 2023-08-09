/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#2C2B2E',
        blue: '#5F6C7F',
        green: '#91B3AC',
        white: '#E9ECD8',
        yellow: '#EBB061',
      },
    },
  },
  plugins: [],
};
