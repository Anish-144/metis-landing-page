/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#5E0ED7',
        'accent-light': '#7c3aed',
        'accent-glow': 'rgba(94, 14, 215, 0.15)',
        base: '#FFFFFF',
        ink: '#0A0A0A',
        card: '#F8F8FA',
        'card-hover': '#F2F0F9',
        muted: '#6B7280',
        'muted-light': '#9CA3AF',
        border: 'rgba(0,0,0,0.07)',
        'border-accent': 'rgba(94,14,215,0.2)',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
        'card-hover': '0 4px 24px rgba(94,14,215,0.08), 0 1px 3px rgba(0,0,0,0.06)',
        'purple': '0 4px 20px rgba(94,14,215,0.25)',
        'purple-lg': '0 8px 40px rgba(94,14,215,0.2)',
        'glow': '0 0 40px rgba(94,14,215,0.15)',
        'glow-sm': '0 0 20px rgba(94,14,215,0.12)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      animation: {
        'ticker': 'ticker 25s linear infinite',
        'ticker-fast': 'ticker 15s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'scan': 'scan 3s linear infinite',
        'slide-up': 'slide-up-fade 0.5s ease forwards',
        'aurora': 'aurora-move 8s ease infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(94, 14, 215, 0.3)' },
          '70%': { boxShadow: '0 0 0 12px rgba(94, 14, 215, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(94, 14, 215, 0)' },
        },
        ticker: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        },
        'slide-up-fade': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'aurora-move': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundImage: {
        'dot-pattern': "radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)",
        'dot-purple': "radial-gradient(circle, rgba(94,14,215,0.1) 1px, transparent 1px)",
        'line-grid': "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
        'aurora-gradient': "linear-gradient(135deg, rgba(94,14,215,0.06) 0%, rgba(255,255,255,0) 40%, rgba(94,14,215,0.04) 100%)",
      },
    },
  },
  plugins: [],
}
