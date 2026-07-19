import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0F1E',
        foreground: '#ffffff',
        brand: {
          blue: '#3b82f6',
          cyan: '#22d3ee',
          purple: '#a855f7',
        },
        navy: {
          900: '#0a0f1e',
          800: '#111827',
          700: '#1f2937',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          'from': { backgroundPosition: '200% 0' },
          'to': { backgroundPosition: '-200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 8px rgba(52,211,153,0.8)' },
          '50%': { opacity: '0.5', boxShadow: '0 0 2px rgba(52,211,153,0.4)' },
        }
      }
    },
  },
  plugins: [],
}
export default config
