import React from 'react';

import { Label, FileInput } from '@packages/vds';

interface VideoUploaderProps {
  onUpload: (file: File[]) => void;
}

function VideoUploader({ onUpload }: VideoUploaderProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onUpload(Array.from(event.target.files));
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label className="flex flex-col gap-2">
        <span>{'비디오 파일을 업로드하세요.'}</span>
        <FileInput multiple accept="video/*" onChange={handleFileChange} className="w-full text-gray-700" />
      </Label>
    </div>
  );
}

export default VideoUploader;
