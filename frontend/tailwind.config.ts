import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './editor/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0b0b10',
        panel: '#111118',
        primary: '#7c5cff',
        primaryHover: '#6a4bff',
        accent: '#00e5ff',
        muted: '#a1a1aa',
        border: '#23232f'
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.25)',
      },
      backgroundImage: {
        'grid-dark': "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        'radial-fade': 'radial-gradient(800px circle at 20% 10%, rgba(124,92,255,0.20), transparent 40%), radial-gradient(600px circle at 80% 20%, rgba(0,229,255,0.18), transparent 40%)'
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      borderRadius: {
        xl: '16px',
      }
    },
  },
  plugins: [],
} satisfies Config