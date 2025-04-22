import { vdsPlugin, vdsTailwindThemeExtend } from '@packages/vds';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}', '../../../packages/vds/src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extends: vdsTailwindThemeExtend,
  },
  plugins: [vdsPlugin, require('tailwindcss-animate')],
};
