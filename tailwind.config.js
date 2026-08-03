/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./website/**/*.html", "./website/js/**/*.js"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        apple: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'primary-black': '#000000',
        'accent-gold': '#D4AF37',
        'apple-gray': '#F2F2F7',
        'apple-text': '#1D1D1F',
        'apple-text-secondary': '#86868B',
      }
    },
  },
  plugins: [],
};
