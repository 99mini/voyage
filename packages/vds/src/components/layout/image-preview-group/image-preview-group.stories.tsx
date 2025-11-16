import type { Meta } from '@storybook/react';

import ImagePreviewGroup, { type ImagePreviewGroupProps } from '.';

const meta: Meta<typeof ImagePreviewGroup> = {
  title: 'layout/ImagePreviewGroup',
  component: ImagePreviewGroup,
  tags: ['autodocs'],
  args: {
    images: [
      'https://picsum.photos/200',
      'https://picsum.photos/201',
      'https://picsum.photos/202',
      'https://picsum.photos/203',
      'https://picsum.photos/204',
      'https://picsum.photos/205',
    ],
  },
} satisfies Meta<typeof ImagePreviewGroup>;

export const Default = ({ ...args }: ImagePreviewGroupProps) => <ImagePreviewGroup {...args} />;

export const WithChildren = ({ ...args }: ImagePreviewGroupProps) => (
  <ImagePreviewGroup {...args}>
    <button className="btn btn-primary">+Add image</button>
  </ImagePreviewGroup>
);

export default meta;
