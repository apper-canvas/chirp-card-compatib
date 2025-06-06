/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1DA1F2',
          light: '#50C3F7',
          dark: '#0D7CB5'
        },
        secondary: {
          DEFAULT: '#657786',
          light: '#8899A6',
          dark: '#4A5568'
        },
        accent: '#FF6B6B',
        surface: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'neu-light': '5px 5px 10px #d1d9e6, -5px -5px 10px #ffffff',
        'neu-dark': '5px 5px 10px #1a1a1a, -5px -5px 10px #2a2a2a'
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem'
      },
      animation: {
        'pulse-ring': 'pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'bounce-heart': 'bounce-heart 0.6s ease-in-out',
        'shimmer': 'shimmer 2s linear infinite'
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.33)' },
          '80%, 100%': { transform: 'scale(1)', opacity: '0' }
        },
        'bounce-heart': {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.2)' },
          '50%': { transform: 'scale(0.9)' }
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      }
    },
  },
  plugins: [],
}