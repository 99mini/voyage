import React from 'react';

import type { Preview } from '@storybook/react';

import '../src/index.css';

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <>
          <Story />
        </>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
