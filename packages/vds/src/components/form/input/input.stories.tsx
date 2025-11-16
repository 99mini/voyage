import type { Meta } from '@storybook/react';

import Label from '../../atom/label';
import Input from './input';

const meta = {
  title: 'form/input/Input',
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

export const Unstyled = ({ ...args }) => <Input {...args} variant="unstyled" />;

export const Ghost = ({ ...args }) => <Input {...args} variant="ghost" />;

export const Underline = ({ ...args }) => <Input {...args} variant="underline" />;

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
