import type { Meta } from '@storybook/react';
import Button from './button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export const Default = ({ ...args }) => <Button {...args}>button</Button>;

export default meta;
