import type { Meta } from '@storybook/react';

import ImagePreviewer, { type ImagePreviewerProps } from '.';

const meta: Meta<typeof ImagePreviewer> = {
  title: 'ImagePreviewer',
  component: ImagePreviewer,
  tags: ['autodocs'],
  args: {
    src: 'https://picsum.photos/200',
    alt: 'image',
  },
  argTypes: {},
} satisfies Meta<typeof ImagePreviewer>;

export const Default = ({ ...args }: ImagePreviewerProps) => <ImagePreviewer {...args} />;

export default meta;
