import type { Meta } from '@storybook/react';

import Input from './input';

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['text', 'password', 'email', 'number', 'file'],
      },
    },
  },
} satisfies Meta<typeof Input>;

export const Default = ({ ...args }) => <Input {...args} />;

export default meta;
