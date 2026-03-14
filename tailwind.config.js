/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0c5bc',
          400: '#d4a590',
          500: '#c78268',
          600: '#b66a4f',
          700: '#9c5340',
          800: '#814639',
          900: '#6b3d32',
        },
        gold: {
          50: '#fef9f3',
          100: '#fdf1e3',
          200: '#fae1c5',
          300: '#f6ca9e',
          400: '#f1ab6b',
          500: '#ec9040',
          600: '#e0742a',
          700: '#bd5c1f',
          800: '#954821',
          900: '#783d1f',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
