import { FileUploader, Label } from '@packages/vds';

interface ImageUploaderProps {
  images: File[];
  onUpload: (files: File[]) => void;
  onRemove: (file: File) => void;
}

const ImageUploader = ({ images, onUpload, onRemove }: ImageUploaderProps) => {
  return (
    <div className="grid w-full items-center gap-1.5 pb-4">
      <Label htmlFor="image-file">{'이미지 파일을 업로드하세요.'}</Label>
      <FileUploader
        files={images}
        onUpload={onUpload}
        onRemove={onRemove}
        className="w-auto border border-gray-200 rounded-md p-2"
        InputProps={{ accept: 'image/*', id: 'image-file' }}
      />
    </div>
  );
};

export default ImageUploader;
