import React from 'react';

import { Label, Input } from '@packages/vds';

interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
}

const ImageUploader = ({ onUpload }: ImageUploaderProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      onUpload(files);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="image-file">{'이미지 파일을 업로드하세요.'}</Label>
      <Input id="image-file" type="file" accept="image/*" multiple onChange={handleFileChange} />
    </div>
  );
};

export default ImageUploader;
