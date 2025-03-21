import { useCallback, useState } from 'react';

import { Button, useToast } from '@packages/vds';

import Description from '@/components/common/description';
import DownloadButton from '@/components/common/download-button';
import ImageUploader from '@/components/input/image-uploader';
import RootLayout from '@/components/layout/root-layout';

import { PAGE_TITLE } from '@/lib/constant';

import ImageMerger from './components/image-merger';
import MergedImagePreviewModal from './components/merged-image-preview-modal';

const VerticalImageMerger = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [mergedImage, setMergedImage] = useState<string>('');

  const [openModal, setOpenModal] = useState(false);

  const { toast } = useToast();

  const handleMergeComplete = useCallback(
    (dataUrl: string) => {
      setMergedImage(dataUrl);
      toast({
        description: '이미지 병합을 완료했어요',
        duration: 3000,
      });
    },
    [toast],
  );

  const handleReset = () => {
    setUploadedImages([]);
    setMergedImage('');
  };

  const handleRemove = (file: File) => {
    setUploadedImages(uploadedImages.filter((i) => i !== file));
  };

  return (
    <RootLayout title={PAGE_TITLE.VERTICAL_IMAGE_MERGER}>
      <Description>{' | 업로드한 파일은 서버로 전송되지 않습니다.'}</Description>
      <ImageUploader images={uploadedImages} onUpload={setUploadedImages} onRemove={handleRemove} />
      {uploadedImages.length > 0 && <Button onClick={handleReset}>{'초기화'}</Button>}
      {uploadedImages.length === 0 ? null : !mergedImage ? (
        <ImageMerger className="text-center" files={uploadedImages} onMergeComplete={handleMergeComplete} />
      ) : (
        <p className="text-center">{'이미지 병합이 완료되었습니다.'}</p>
      )}
      <div className="flex flex-row justify-center space-x-4 my-4">
        {mergedImage && <Button onClick={() => setOpenModal(true)}>{'이미지 미리보기'}</Button>}
        {mergedImage && (
          <DownloadButton imageUrlList={[mergedImage]} extension="png">
            {'이미지 다운로드'}
          </DownloadButton>
        )}
      </div>
      {openModal && (
        <MergedImagePreviewModal isOpen={openModal} onClose={() => setOpenModal(false)} mergedImageUrl={mergedImage} />
      )}
    </RootLayout>
  );
};

export default VerticalImageMerger;
