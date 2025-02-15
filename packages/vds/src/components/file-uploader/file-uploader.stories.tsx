import type { Meta } from '@storybook/react';

import FileUploader from './file-uploader';
import { useState } from 'react';

const meta: Meta<typeof FileUploader> = {
  title: 'FileUploader',
  component: FileUploader,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof FileUploader>;

export const Default = ({ ...args }) => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUploader
      {...args}
      files={files}
      onUpload={setFiles}
      onRemove={(f) => setFiles(files.filter((file) => file !== f))}
    />
  );
};

export const Image = ({ ...args }) => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUploader
      {...args}
      InputProps={{ accept: 'image/*' }}
      files={files}
      onUpload={setFiles}
      onRemove={(f) => setFiles(files.filter((file) => file !== f))}
    />
  );
};

export default meta;
