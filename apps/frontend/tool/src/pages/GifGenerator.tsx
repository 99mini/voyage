import { useCallback, useState } from 'react';

import DownloadButton from '@/components/common/DownloadButton';
import PageTitle from '@/components/common/PageTitle';
import VideoUploader from '@/components/common/VideoUploader';
import VideoToGifControls from '@/components/gifGenerator/VideoToGifControls';

import { Button, ImagePreviewGroup, useToast } from '@packages/vds';

const GifGenerator = () => {
  const [videoFileList, setVideoFileList] = useState<File[]>([]);
  const [gifUrlList, setGifUrlList] = useState<string[]>([]);

  const { toast } = useToast();

  const handleComplete = useCallback(
    (gifUrl: string[]) => {
      setGifUrlList(gifUrl);
      toast({
        description: 'GIF로 변환을 완료했어요',
        duration: 3000,
      });
    },
    [toast],
  );

  const handleUpload = (file: File[]) => {
    setVideoFileList(file);
    setGifUrlList([]);
  };

  return (
    <div>
      <PageTitle>{'GIF 생성기'}</PageTitle>
      <p className="text-sm text-gray-400 my-1">{' | 업로드한 파일은 서버로 전송되지 않습니다.'}</p>
      <VideoUploader onUpload={handleUpload} />
      {videoFileList.length > 0 && (
        <VideoToGifControls className="text-center py-4" videoFileList={videoFileList} onCompleted={handleComplete} />
      )}
      {gifUrlList.length > 0 && <ImagePreviewGroup images={gifUrlList} />}
      {gifUrlList.length > 0 && (
        <div className="flex flex-row gap-x-4 justify-center">
          <DownloadButton imageUrlList={gifUrlList} extension="gif" zip>
            {'GIF 다운로드'}
          </DownloadButton>
          <Button onClick={() => handleUpload([])} variant={'outline'} color="secondary">
            {'초기화'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default GifGenerator;
