import { useEffect, useState } from 'react';

import type { Meta } from '@storybook/react';

import FileUploader from './file-uploader';

const meta: Meta<typeof FileUploader> = {
  title: 'form/input/FileUploader',
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

export const VariantNone = ({ ...args }) => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUploader
      {...args}
      variant="none"
      files={files}
      onUpload={setFiles}
      onRemove={(f) => setFiles(files.filter((file) => file !== f))}
    />
  );
};

export const VariantFilled = ({ ...args }) => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <FileUploader
      {...args}
      variant="filled"
      files={files}
      onUpload={setFiles}
      onRemove={(f) => setFiles(files.filter((file) => file !== f))}
    />
  );
};

export const Uploaded = ({ ...args }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loadding, setLoadding] = useState(false);

  useEffect(() => {
    (async () => {
      setLoadding(true);
      try {
        const url = 'https://picsum.photos/200';
        const res = await fetch(url)
          .then((res) => res.blob())
          .then((blob) => new File([blob], url, { type: 'image/png' }));

        setFiles([res]);
      } catch (e) {
        console.log(e);
      }
      setLoadding(false);
    })();
  }, []);

  if (loadding) {
    return <div>loadding</div>;
  }

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
