import type { Meta } from '@storybook/react';

import FileInput from './file-input';

const meta: Meta<typeof FileInput> = {
  title: 'FileInput',
  component: FileInput,
  tags: ['autodocs'],
} satisfies Meta<typeof FileInput>;

export const Default = ({ ...args }) => <FileInput {...args} />;

export const Placeholder = ({ ...args }) => <FileInput {...args}>클릭하여 파일 선택</FileInput>;

export default meta;
