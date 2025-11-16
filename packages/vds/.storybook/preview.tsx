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
    options: {
      storySort: {
        order: [
          'Foundations',
          ['Colors', 'Typography', 'ObjectStyle', 'Layout'],
          'Atom',
          ['Button', 'Label', 'PageProgress'],
          'Input',
          ['Input', 'FileInput', 'FileUploader'],
          'Layout',
        ],
      },
    },
  },
};

export default preview;
