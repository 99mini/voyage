import React from 'react';

import { Meta } from '@storybook/react';

import { radius, shadow } from '../object-style';
import TokenBox from './token-box';

export default {
  title: 'Foundations/Radius',
} as Meta;

export const BorderRadius = () => (
  <div>
    {Object.entries(radius).map(([key, value]) => (
      <TokenBox
        key={key}
        label={`rounded-${key}`}
        value={value}
        style={{ borderRadius: value, backgroundColor: '#ccc' }}
      />
    ))}
  </div>
);

export const Shadows = () => (
  <div>
    {Object.entries(shadow).map(([key, value]) => (
      <TokenBox key={key} label={`shadow-${key}`} value={value} style={{ boxShadow: value, backgroundColor: '#fff' }} />
    ))}
  </div>
);
