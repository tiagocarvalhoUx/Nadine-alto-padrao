/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nadine: {
          beige: {
            DEFAULT: '#E8DFD0',
            light: '#F5F0E8',
            dark: '#D4C5B0',
          },
          bronze: {
            DEFAULT: '#B8956A',
            light: '#C9A878',
            dark: '#9A7A52',
          },
          black: {
            DEFAULT: '#1A1A1A',
            soft: '#2D2D2D',
          },
          cream: '#FAF8F4',
          gold: '#D4AF37',
        },
        // Mantendo cores REMAX para compatibilidade
        remax: {
          blue: {
            DEFAULT: '#2E5C8A',
            dark: '#1e3a5f',
            light: '#3d6fa3',
          },
          red: {
            DEFAULT: '#E11B22',
            dark: '#c01118',
            light: '#e84449',
          },
          navy: '#0a2540',
          darkBlue: '#0d1b2a',
        },
        luxury: {
          gold: '#D4AF37',
          dark: '#1a1a1a',
          gray: '#f5f5f5',
          orange: '#ff6b35',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
