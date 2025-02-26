import React from 'react';

import { Label, FileInput } from '@packages/vds';

interface VideoUploaderProps {
  onUpload: (file: File[] | ((prev: File[]) => File[])) => void;
  onRemove: (file: File) => void;
  onReset: () => void;
}

function VideoUploader({ onUpload, onRemove, onReset }: VideoUploaderProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, reason?: 'initial' | 'append') => {
    if (!event.target.files?.length) {
      return;
    }
    if (reason === 'append') {
      onUpload((prev) => [...prev, ...Array.from(event.target.files ?? [])]);
    } else {
      onUpload(Array.from(event.target.files ?? []));
    }
  };

  return (
    <div className="grid w-full flex-1 max-w-sm items-center gap-1.5">
      <Label className="flex flex-col gap-2">
        <span>{'비디오 파일을 업로드하세요.'}</span>
        <FileInput
          className="w-full text-gray-700"
          multiple
          accept="video/*"
          onChange={handleFileChange}
          onRemove={onRemove}
          onReset={onReset}
        />
      </Label>
    </div>
  );
}

export default VideoUploader;
