import type { Meta } from '@storybook/react';

import Input, { type InputProps } from './input';

const meta: Meta<typeof Input> = {
  title: 'autoGenerate/Input',
  component: Input,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
} satisfies Meta<typeof Input>;

export const Default = ({ ...args }: InputProps) => <Input {...args} />;

export default meta;
