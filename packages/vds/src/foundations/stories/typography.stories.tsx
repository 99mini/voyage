import { Meta } from '@storybook/react';

import { typography } from '../typography';

export default {
  title: 'Foundations/Typography',
} as Meta;

export const AllTypography = () => (
  <div>
    {Object.entries(typography).flatMap(([group, sizes]) =>
      Object.entries(sizes).map(([sizeKey, { fontSize, lineHeight, fontWeight }]) => {
        const label = `${group}-${sizeKey}`;
        return (
          <div key={label} style={{ fontSize, lineHeight, fontWeight, marginBottom: 16 }}>
            {label}: The quick brown fox jumps over the lazy dog
          </div>
        );
      }),
    )}
  </div>
);
