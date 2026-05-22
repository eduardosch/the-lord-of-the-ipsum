import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Arda Nocturne — The Deep (backgrounds)
        deep:    '#0F1E3C',
        keep:    '#264D72',
        forge:   '#326584',
        // Accents
        gold:    '#D4AF37',
        'gold-light': '#F2CA50',
        silver:  '#A9A9A9',
        // Text
        parchment: '#F8FAFC',
        'pale-gold': '#EEDD82',
        muted:   '#D0C5AF',
      },
      fontFamily: {
        headline:    ['Sora', 'sans-serif'],
        body:        ['Hanken Grotesk', 'sans-serif'],
        ringbearer:  ['"Ring Bearer"', 'fantasy'],
      },
      borderRadius: {
        sm:  '0.125rem',
        DEFAULT: '0.25rem',
        md:  '0.375rem',
        lg:  '0.5rem',
        xl:  '0.75rem',
      },
      boxShadow: {
        gold: '0 0 15px rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 0 30px rgba(212, 175, 55, 0.5)',
      },
      letterSpacing: {
        runic: '0.05em',
      },
    },
  },
  plugins: [],
} satisfies Config
