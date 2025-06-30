import type { Meta } from '@storybook/react';

import AutoGenerateInput, { type AutoGenerateInputProps, type InputSchema } from './input';

const meta: Meta<typeof AutoGenerateInput> = {
  title: 'autoGenerate/Input',
  component: AutoGenerateInput,
  tags: ['autodocs'],
  args: {
    schema: {
      type: 'text',
      size: 'md',
      disabled: false,
      required: false,
    },
    props: {},
  },
  argTypes: {
    schema: {
      control: 'object',
    },
    props: {
      control: 'object',
    },
  },
} satisfies Meta<typeof AutoGenerateInput>;

export const Default = ({ ...args }: AutoGenerateInputProps) => <AutoGenerateInput {...args} />;

export default meta;
