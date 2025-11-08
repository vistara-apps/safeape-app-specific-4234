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
        bg: 'hsl(240, 10%, 4%)',
        accent: 'hsl(27, 96%, 61%)',
        border: 'hsl(240, 4%, 16%)',
        danger: 'hsl(0, 84%, 60%)',
        primary: 'hsl(142, 76%, 36%)',
        success: 'hsl(142, 76%, 36%)',
        surface: 'hsl(240, 6%, 10%)',
        warning: 'hsl(45, 93%, 47%)',
        textPrimary: 'hsl(0, 0%, 98%)',
        primaryHover: 'hsl(142, 76%, 28%)',
        textSecondary: 'hsl(240, 5%, 64%)',
        surfaceElevated: 'hsl(240, 5%, 14%)',
      },
      borderRadius: {
        'lg': '16px',
        'md': '12px',
        'sm': '8px',
        'xl': '20px',
      },
      boxShadow: {
        'card': '0 4px 16px hsla(240, 10%, 0%, 0.4)',
        'glow': '0 0 24px hsla(142, 76%, 36%, 0.3)',
        'elevated': '0 12px 32px hsla(240, 10%, 0%, 0.6)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-in': 'slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 24px hsla(142, 76%, 36%, 0.3)' },
          '50%': { boxShadow: '0 0 32px hsla(142, 76%, 36%, 0.6)' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}