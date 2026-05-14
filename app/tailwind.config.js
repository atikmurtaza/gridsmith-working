/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0a0a0a',
        'bg-charcoal': '#141414',
        'gold': '#d4af37',
        'gold-light': '#f3e5ab',
        'text-main': '#f5f5f5',
        'text-muted': '#a0a0a0',
        'bronze': '#cd7f32',
        'umber': '#635147',
        'sand': '#e6d5a8',
      },
      backgroundImage: {
        'grad-gold': 'linear-gradient(135deg, #f3e5ab, #d4af37, #cd7f32)',
      }
    },
  },
  plugins: [],
}
