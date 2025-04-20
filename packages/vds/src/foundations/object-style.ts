import { hexToRgba } from '@/lib';

import { colors } from './color';

const shadowBase = {
  blur: {
    sm: '2px',
    md: '6px',
    lg: '15px',
  },
  offset: {
    sm: '0 1px',
    md: '0 2px',
    lg: '0 4px',
  },
  alpha: {
    sm: 0.05,
    md: 0.1,
    lg: 0.2,
  },
};

export const radius = {
  'vds-sm': '4px',
  'vds-md': '8px',
  'vds-lg': '16px',
  'vds-full': '9999px',
};

export const shadow = {
  'vds-sm': `${shadowBase.offset.sm} ${shadowBase.blur.sm} ${hexToRgba(colors['vds-gray']['500'], shadowBase.alpha.sm)}`,
  'vds-md': `${shadowBase.offset.md} ${shadowBase.blur.md} ${hexToRgba(colors['vds-gray']['500'], shadowBase.alpha.md)}`,
  'vds-lg': `${shadowBase.offset.lg} ${shadowBase.blur.lg} ${hexToRgba(colors['vds-gray']['500'], shadowBase.alpha.lg)}`,

  'vds-primary-sm': `${shadowBase.offset.sm} ${shadowBase.blur.sm} ${hexToRgba(colors['vds-primary']['500'], shadowBase.alpha.sm)}`,
  'vds-primary-md': `${shadowBase.offset.md} ${shadowBase.blur.md} ${hexToRgba(colors['vds-primary']['500'], shadowBase.alpha.md)}`,
  'vds-primary-lg': `${shadowBase.offset.lg} ${shadowBase.blur.lg} ${hexToRgba(colors['vds-primary']['500'], shadowBase.alpha.lg)}`,

  'vds-success-sm': `${shadowBase.offset.sm} ${shadowBase.blur.sm} ${hexToRgba(colors['vds-success']['500'], shadowBase.alpha.sm)}`,
  'vds-success-md': `${shadowBase.offset.md} ${shadowBase.blur.md} ${hexToRgba(colors['vds-success']['500'], shadowBase.alpha.md)}`,
  'vds-success-lg': `${shadowBase.offset.lg} ${shadowBase.blur.lg} ${hexToRgba(colors['vds-success']['500'], shadowBase.alpha.lg)}`,

  'vds-warning-sm': `${shadowBase.offset.sm} ${shadowBase.blur.sm} ${hexToRgba(colors['vds-warning']['500'], shadowBase.alpha.sm)}`,
  'vds-warning-md': `${shadowBase.offset.md} ${shadowBase.blur.md} ${hexToRgba(colors['vds-warning']['500'], shadowBase.alpha.md)}`,
  'vds-warning-lg': `${shadowBase.offset.lg} ${shadowBase.blur.lg} ${hexToRgba(colors['vds-warning']['500'], shadowBase.alpha.lg)}`,

  'vds-error-sm': `${shadowBase.offset.sm} ${shadowBase.blur.sm} ${hexToRgba(colors['vds-error']['500'], shadowBase.alpha.sm)}`,
  'vds-error-md': `${shadowBase.offset.md} ${shadowBase.blur.md} ${hexToRgba(colors['vds-error']['500'], shadowBase.alpha.md)}`,
  'vds-error-lg': `${shadowBase.offset.lg} ${shadowBase.blur.lg} ${hexToRgba(colors['vds-error']['500'], shadowBase.alpha.lg)}`,
};
