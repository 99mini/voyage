import type { Meta } from '@storybook/react';

import Input from './input';
import Label from '../label';

const meta: Meta<typeof Input> = {
  title: 'input/Input',
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

export const Placeholder = ({ ...args }) => <Input {...args} placeholder="placeholder" />;

/**
 *
 * ```tsx
 * <div>
 *   <Label htmlFor="with-label">Label</Label>
 *   <Input {...args} id="with-label" />
 * </div>
 * ```
 */
export const WithLabel = ({ ...args }) => {
  return (
    <div>
      <Label htmlFor="with-label">Label</Label>
      <Input {...args} id="with-label" />
    </div>
  );
};

/**
 * ```tsx
 * <Label>
 *   Inner Label
 *   <Input {...args} />
 * </Label>
 * ```
 */
export const WithInnerLabel = ({ ...args }) => {
  return (
    <Label>
      Inner Label
      <Input {...args} />
    </Label>
  );
};

export default meta;
