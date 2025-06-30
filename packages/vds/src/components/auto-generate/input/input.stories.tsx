import type { Meta } from '@storybook/react';

import AutoGenerateInput, { type AutoGenerateInputProps } from './input';

const meta: Meta<typeof AutoGenerateInput> = {
  title: 'autoGenerate/Input',
  component: AutoGenerateInput,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
} satisfies Meta<typeof AutoGenerateInput>;

export const Default = ({ ...args }: AutoGenerateInputProps) => <AutoGenerateInput {...args} />;

export default meta;
