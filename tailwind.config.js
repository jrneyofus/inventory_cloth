/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        kertas: '#FAF7F1',
        kertas2: '#F1ECE0',
        tinta: '#26252B',
        garis: '#E1DACB',
        indigo: {
          DEFAULT: '#3C4D73',
          dark: '#2A3654',
          light: '#5A6E9C',
        },
        jahit: '#C1553B',
        sage: '#748249',
        kuning: '#D2A03C',
      },
      fontFamily: {
        display: ['"Space Mono"', 'monospace'],
        body: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        stitch: "repeating-linear-gradient(90deg, currentColor 0 6px, transparent 6px 12px)",
      },
    },
  },
  plugins: [],
}
