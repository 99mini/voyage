import { cn } from '@/lib/utils';

export type ImagePreviewerProps = {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  ImageProps?: Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style' | 'children'>;

const ImagePreviewer = ({ src, alt, className, style, ImageProps, ...props }: ImagePreviewerProps) => {
  return (
    <div
      className={`${cn('border border-gray-300 rounded-lg overflow-hidden w-36 h-36 flex items-center justify-center', className)}`}
      style={style}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className={`${cn('max-w-full max-h-full object-contain', ImageProps?.className)}`}
        {...ImageProps}
      />
    </div>
  );
};

export default ImagePreviewer;
