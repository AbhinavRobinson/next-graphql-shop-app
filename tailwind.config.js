/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
    },
    extend: {
      dropShadow: {
        fuchsia: '0 5px 0 rgba(200, 50, 0, 1)',
        sky: '0 5px 0 rgba(100, 150, 255, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
