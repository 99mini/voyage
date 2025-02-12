import type { Meta } from '@storybook/react';

import Label from '.';

const meta: Meta<typeof Label> = {
  title: 'Label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export const Default = ({ ...args }) => {
  return <Label {...args} />;
};

export default meta;
