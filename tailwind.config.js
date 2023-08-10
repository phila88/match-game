/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'cloud-pattern': "url('./assets/endless-clouds.svg')",
      },
      colors: {
        black: '#292828',
        white: '#E6DFAF',
        purple: '#A19FBB',
        red: '#D93757',
        orange: '#E0924E',
      },
    },
  },
  plugins: [],
};
