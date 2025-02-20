import { useCallback, useState } from 'react';

import DownloadButton from '@/components/common/DownloadButton';
import PageTitle from '@/components/common/PageTitle';
import VideoUploader from '@/components/common/VideoUploader';
import VideoToGifControls from '@/components/gifGenerator/VideoToGifControls';

import { Button, ImagePreviewer, useToast } from '@packages/vds';

function GifGenerator() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [gifUrl, setGifUrl] = useState<string>('');

  const { toast } = useToast();

  const handleComplete = useCallback(
    (gifUrl: string) => {
      setGifUrl(gifUrl);
      toast({
        description: 'GIF로 변환을 완료했어요',
        duration: 3000,
      });
    },
    [toast],
  );

  const handleUpload = (file: File | null) => {
    setVideoFile(file);
    setGifUrl(''); // Reset GIF preview when new video is uploaded
  };

  return (
    <div>
      <PageTitle>{'GIF 생성기'}</PageTitle>
      <VideoUploader file={videoFile} onUpload={handleUpload} />
      {videoFile && (
        <VideoToGifControls className="text-center py-4" videoFile={videoFile} onCompleted={handleComplete} />
      )}
      {gifUrl && <ImagePreviewer src={gifUrl} alt="gif" className="mx-auto my-4 h-auto" />}
      {gifUrl && (
        <div className="flex flex-row gap-x-4 justify-center">
          <DownloadButton imageUrl={gifUrl}>{'GIF 다운로드'}</DownloadButton>
          <Button onClick={() => handleUpload(null)} variant={'outline'} color="secondary">
            {'초기화'}
          </Button>
        </div>
      )}
    </div>
  );
}

export default GifGenerator;
