import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#F9F9FF',
          200: '#F6F5FF',
          300: '#EFEEFB',
          400: '#DFDEF1',
          500: '#CCCAE3',
          600: '#B4B2CD',
          700: '#A4A2C4',
          800: '#7F7CA2',
          850: '#585667',
          900: '#5F5C7F',
        },
        heading: '#0D0A2C',
      },
    },
  },
} satisfies Config;

export default config;
