import { useCallback, useState } from 'react';

import { Button, ImagePreviewGroup, useToast } from '@packages/vds';

import Description from '@/components/common/description';
import DownloadButton from '@/components/common/download-button';
import VideoUploader from '@/components/input/video-uploader';
import RootLayout from '@/components/layout/root-layout';

import VideoToGifController from './components/video-to-gif-controller';

import { PAGE_TITLE } from '@/lib/constant';

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

  const handleUpload = (file: File[] | ((prev: File[]) => File[])) => {
    setVideoFileList(file);
  };

  const handleRemove = (file: File) => {
    setVideoFileList((prev) => prev.filter((f) => f !== file));
  };

  const handleReset = () => {
    setVideoFileList([]);
    setGifUrlList([]);
  };

  return (
    <RootLayout title={PAGE_TITLE.GIF_GENERATOR}>
      <Description>{' | 업로드한 파일은 서버로 전송되지 않습니다.'}</Description>
      <VideoUploader onUpload={handleUpload} onRemove={handleRemove} onReset={handleReset} />
      {videoFileList.length > 0 && (
        <VideoToGifController className="text-center py-4" videoFileList={videoFileList} onCompleted={handleComplete} />
      )}
      {gifUrlList.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="w-full p-4 border border-gray-200 rounded-md">
            <ImagePreviewGroup images={gifUrlList} />
          </div>
          <div className="flex flex-row gap-x-4 justify-center">
            <DownloadButton imageUrlList={gifUrlList} extension="gif" zip>
              {'GIF 다운로드'}
            </DownloadButton>
            <Button onClick={handleReset} variant={'outline'} color="secondary">
              {'초기화'}
            </Button>
          </div>
        </div>
      )}
    </RootLayout>
  );
};

export default GifGenerator;
