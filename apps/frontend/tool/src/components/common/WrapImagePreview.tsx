import ImagePreviewer from './ImagePreviewer';

interface WrapImagePreviewProps {
  images: HTMLImageElement[] | string[];
}

const WrapImagePreview = ({ images }: WrapImagePreviewProps) => {
  return (
    // width and height 100% margin 0 auto
    <div className="flex flex-wrap gap-4 flex-start py-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg overflow-hidden w-36 h-36 flex items-center justify-center"
        >
          <ImagePreviewer src={typeof image === 'string' ? image : image.src} alt={`Uploaded ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default WrapImagePreview;
