import type { Meta } from '@storybook/react';

import Label from './label';

const meta: Meta<typeof Label> = {
  title: 'atom/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
  },
} satisfies Meta<typeof Label>;

export const Default = ({ ...args }) => <Label {...args}>{args.children ?? 'Label'}</Label>;

export default meta;
