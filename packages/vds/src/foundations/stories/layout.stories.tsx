import { Meta } from '@storybook/react';

import { spacing } from '../layout';
import TokenBox from './token-box';

export default {
  title: 'Foundations/Layout',
} as Meta;

export const SpacingScale = () => (
  <div>
    {Object.entries(spacing).map(([key, value]) => (
      <TokenBox key={key} label={`px-${key}`} value={value} style={{ width: value }} />
    ))}
  </div>
);
