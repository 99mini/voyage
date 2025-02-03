import { useCallback, useState } from "react";

import DownloadButton from "@/components/common/DownloadButton";
import ImageUploader from "@/components/common/ImageUploader";
import PageTitle from "@/components/common/PageTitle";
import WrapImagePreview from "@/components/common/WrapImagePreview";
import { Button } from "@/components/ui/button";
import ImageMerger from "@/components/verticalMerger/ImageMerger";
import MergedImagePreviewModal from "@/components/verticalMerger/MergedImagePreviewModal";
import { useToast } from "@/hooks/use-toast";

function VerticalImageMerger() {
  const [uploadedImages, setUploadedImages] = useState<HTMLImageElement[]>([]);
  const [mergedImage, setMergedImage] = useState<string>("");

  const [openModal, setOpenModal] = useState(false);

  const { toast } = useToast();

  const handleMergeComplete = useCallback(
    (dataUrl: string) => {
      setMergedImage(dataUrl);
      toast({
        description: "이미지 병합을 완료했어요",
        duration: 3000,
      });
    },
    [toast]
  );

  const handleImageUpload = (files: File[], callback: (val: HTMLImageElement[]) => void) => {
    const imageElements: HTMLImageElement[] = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          imageElements.push(img);
          if (imageElements.length === files.length) {
            callback(imageElements);
          }
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const handleReset = () => {
    setUploadedImages([]);
    setMergedImage("");
  };

  return (
    <div>
      <PageTitle>{"새로 이미지 병합기"}</PageTitle>
      <ImageUploader onUpload={(files) => handleImageUpload(files, setUploadedImages)} />
      <WrapImagePreview images={uploadedImages} />
      {uploadedImages.length > 0 && <Button onClick={handleReset}>{"초기화"}</Button>}
      {uploadedImages.length === 0 ? null : !mergedImage ? (
        <ImageMerger className="text-center" images={uploadedImages} onMergeComplete={handleMergeComplete} />
      ) : (
        <p className="text-center">{"이미지 병합이 완료되었습니다. "}</p>
      )}
      <div className="flex flex-row justify-center space-x-4 my-4">
        {mergedImage && <Button onClick={() => setOpenModal(true)}>{"이미지 미리보기"}</Button>}
        {mergedImage && <DownloadButton imageUrl={mergedImage}>{"이미지 다운로드"}</DownloadButton>}
      </div>
      {openModal && <MergedImagePreviewModal isOpen={openModal} onClose={() => setOpenModal(false)} mergedImageUrl={mergedImage} />}
    </div>
  );
}

export default VerticalImageMerger;
