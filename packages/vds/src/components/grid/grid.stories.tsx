import type { Meta, StoryObj } from '@storybook/react';

import React, { CSSProperties } from 'react';

import Grid from './grid';
import GridItem from '../grid-item';

const meta = {
  component: Grid,
  title: 'molecular/Grid',
  tags: ['autodocs'],
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof Grid>;

/**
 *
 * @description generate random width(range: 200px ~ 600px), height(range:300px ~ 500px)
 */
const Box = ({ number }: { number: number }) => {
  const style: CSSProperties = {
    backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,

    borderRadius: '10px',
    border: `1px solid #000000`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  };

  return (
    <div style={style}>
      <strong>{number}</strong>
      {Array.from({ length: Math.random() * 10 + 1 }, (_, i) => (
        <div key={i}>{`${i}: content`}</div>
      ))}
    </div>
  );
};

const Template = ({ ...args }) => (
  <div>
    <h1>{`${args.irregular ? 'irregular' : 'regular'} ${args.notGuaranteeOrder ? 'not guarantee order' : ''} Grid`}</h1>
    <div style={{ padding: '0 16px', margin: '0 auto' }}>
      <Grid {...args}>
        {Array.from({ length: 11 }, (_, i) => (
          <GridItem key={i}>
            <Box number={i} />
          </GridItem>
        ))}
      </Grid>
    </div>
  </div>
);

/**
 * Grid component is a layout component that arranges child components in a grid layout.
 */
export const Default: Story = {
  args: {},
  render: Template,
};

/**
 * Grid component is a layout component that arranges child components in a grid layout.
 */
export const Regular: Story = {
  args: {},
  render: Template,
};

/**
 * Grid component is a layout component that arranges child components in a irregular grid layout.
 */
export const Irregular: Story = {
  args: {
    irregular: true,
  },
  render: Template,
};

export const notGuaranteeOrder: Story = {
  args: {
    notGuaranteeOrder: true,
    irregular: true,
  },
  render: Template,
};
