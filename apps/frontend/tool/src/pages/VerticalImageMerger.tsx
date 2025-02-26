import { useCallback, useState } from 'react';

import DownloadButton from '@/components/common/DownloadButton';
import ImageUploader from '@/components/common/ImageUploader';
import PageTitle from '@/components/common/PageTitle';
import ImageMerger from '@/components/verticalMerger/ImageMerger';
import MergedImagePreviewModal from '@/components/verticalMerger/MergedImagePreviewModal';
import { Button, useToast } from '@packages/vds';

function VerticalImageMerger() {
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
    <div>
      <PageTitle>{'새로 이미지 병합기'}</PageTitle>
      <p className="text-sm text-gray-400 my-1">{' | 업로드한 파일은 서버로 전송되지 않습니다.'}</p>
      <ImageUploader images={uploadedImages} onUpload={setUploadedImages} onRemove={handleRemove} />
      {uploadedImages.length > 0 && <Button onClick={handleReset}>{'초기화'}</Button>}
      {uploadedImages.length === 0 ? null : !mergedImage ? (
        <ImageMerger className="text-center" files={uploadedImages} onMergeComplete={handleMergeComplete} />
      ) : (
        <p className="text-center">{'이미지 병합이 완료되었습니다. '}</p>
      )}
      <div className="flex flex-row justify-center space-x-4 my-4">
        {mergedImage && <Button onClick={() => setOpenModal(true)}>{'이미지 미리보기'}</Button>}
        {mergedImage && <DownloadButton imageUrlList={[mergedImage]}>{'이미지 다운로드'}</DownloadButton>}
      </div>
      {openModal && (
        <MergedImagePreviewModal isOpen={openModal} onClose={() => setOpenModal(false)} mergedImageUrl={mergedImage} />
      )}
    </div>
  );
}

export default VerticalImageMerger;
