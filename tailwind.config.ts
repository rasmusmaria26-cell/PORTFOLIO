import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#060608',
        surface: '#0e0e14',
        'surface-2': '#1a1a2e',
        teal: '#4DFFD2',
        magenta: '#FF4DFF',
        smoke: '#F0F0F0',
        muted: '#52526b',
        ghost: 'rgba(255,255,255,0.024)',
        line: 'rgba(255,255,255,0.06)',
      },
      fontFamily: {
        clash: ['"Clash Display"', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 80s linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
