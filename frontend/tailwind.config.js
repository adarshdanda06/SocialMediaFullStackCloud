/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' },
        }
      },
      animation: {
        pulse: 'pulse 4s ease-in-out infinite',
        'fade-in-down': 'fade-in-down 0.5s ease-out',
      },
      'fade-in-down': {
        '0%': {
          opacity: '0',
          transform: 'translateY(-10px)'
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)'
        },
      }
    },
  },
  plugins: [],
}


