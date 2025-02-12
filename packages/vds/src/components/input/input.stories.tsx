import type { Meta } from '@storybook/react';

import Input from '.';

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export const Default = ({ ...args }) => {
  return <Input {...args} />;
};

export const File = ({ ...args }) => {
  return <Input type="file" {...args} />;
};

export default meta;
