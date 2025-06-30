import type { Meta } from '@storybook/react';

import FormField, { type FormFieldProps } from './form-field';

const meta: Meta<typeof FormField> = {
  title: 'autoGenerate/FormField',
  component: FormField,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
} satisfies Meta<typeof FormField>;

export const Default = ({ ...args }: FormFieldProps) => <FormField {...args} />;

export default meta;
