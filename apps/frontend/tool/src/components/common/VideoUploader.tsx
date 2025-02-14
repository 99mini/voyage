import React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@packages/vds';

interface VideoUploaderProps {
  file: File | null;
  onUpload: (file: File) => void;
}

function VideoUploader({ file, onUpload }: VideoUploaderProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onUpload(event.target.files[0]);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="video-file">{'비디오 파일을 업로드하세요.'}</Label>
      <Input
        id="video-file"
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        name={file?.name}
        className="block w-full text-gray-700"
      />
    </div>
  );
}

export default VideoUploader;
