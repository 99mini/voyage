import type { Meta } from '@storybook/react';

import FileInput from './file-input';

const meta: Meta<typeof FileInput> = {
  title: 'input/FileInput',
  component: FileInput,
  tags: ['autodocs'],
} satisfies Meta<typeof FileInput>;

export const Default = ({ ...args }) => <FileInput {...args} />;

export const Multiple = ({ ...args }) => <FileInput {...args} multiple />;

export const Placeholder = ({ ...args }) => <FileInput {...args}>클릭하여 파일 선택</FileInput>;

export const PlaceholderWithReactNode = ({ ...args }) => (
  <FileInput {...args}>
    <div className="flex flex-col gap-2">
      <div>item 1</div>
      <div>item 2</div>
    </div>
  </FileInput>
);

export const CustomPlaceholder = ({ ...args }) => (
  <FileInput {...args} placeholderClassName="text-red-500">
    빨간색 placeholder
  </FileInput>
);

export default meta;
