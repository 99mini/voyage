import { vdsPlugin, vdsTailwindThemeExtend } from './src/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: vdsTailwindThemeExtend,
  },
  plugins: [vdsPlugin, require('tailwindcss-animate')],
};
