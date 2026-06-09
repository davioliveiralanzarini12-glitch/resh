import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        surface: '#111113',
        surfaceSoft: '#18181B',
        border: '#2A2A2D',
        silver: '#C9C9C9',
        silverLight: '#F2F2F2',
        silverDark: '#8A8A8A',
        graphite: '#1C1C1F',
        champagne: '#D8C7A3'
      },
      boxShadow: {
        premium: '0 0 40px rgba(255,255,255,0.06)',
        glow: '0 0 20px rgba(255,255,255,0.1)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}

export default config
