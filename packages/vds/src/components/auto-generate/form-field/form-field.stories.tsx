import type { Meta } from '@storybook/react';

import AutoGenerateFormField, { type AutoGenerateFormFieldProps } from './form-field';

const meta: Meta<typeof AutoGenerateFormField> = {
  title: 'autoGenerate/FormField',
  component: AutoGenerateFormField,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
} satisfies Meta<typeof AutoGenerateFormField>;

export const Default = ({ ...args }: AutoGenerateFormFieldProps) => <AutoGenerateFormField {...args} />;

export default meta;
