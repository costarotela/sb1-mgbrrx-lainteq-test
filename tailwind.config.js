/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'gradient-xy': 'gradient-xy 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '.5',
            transform: 'scale(1.05)',
          },
        },
      },
      backgroundImage: {
        'grid-white': 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
        'cyber-grid': 'linear-gradient(transparent 0%, rgba(251, 191, 36, 0.1) 1px, transparent 2px), linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.1) 1px, transparent 2px)',
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.yellow.400), 0 0 20px theme(colors.yellow.400)',
        'neon-strong': '0 0 5px theme(colors.yellow.400), 0 0 20px theme(colors.yellow.400), 0 0 40px theme(colors.yellow.400)',
      },
    },
  },
  plugins: [],
};