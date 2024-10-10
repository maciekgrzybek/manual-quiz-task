import type { Config } from 'tailwindcss';
import { colors } from './design-system/color-pallete';
import { fontSize } from './design-system/font-size';

/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './design-system/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      fontFamily: {
        sans: ['var(--font-ttnorms)'],
      },
      fontSize: {
        ...fontSize,
      },
    },
  },
  plugins: [],
};
export default config;
