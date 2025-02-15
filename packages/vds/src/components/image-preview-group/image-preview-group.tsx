import { cn } from '@/lib/utils';
import ImagePreviewer, { type ImagePreviewerProps } from '@/components/image-previewer';

export type ImagePreviewGroupProps = {
  images: HTMLImageElement[] | string[];
  className?: string;
  style?: React.CSSProperties;
  ImagePreviewerProps?: Omit<ImagePreviewerProps, 'src'>;
} & React.HTMLAttributes<HTMLDivElement>;

const ImagePreviewGroup = ({
  images,
  className,
  style,
  children,
  ImagePreviewerProps,
  ...props
}: ImagePreviewGroupProps) => {
  return (
    <div className={cn('flex flex-wrap gap-4 flex-start', className)} style={style} {...props}>
      {images.map((image: string | HTMLImageElement, index: number) => (
        <ImagePreviewer
          key={typeof image === 'string' ? image : image.src}
          className={cn(
            'border border-gray-300 rounded-lg overflow-hidden w-36 h-36 flex items-center justify-center',
            ImagePreviewerProps?.className,
          )}
          src={typeof image === 'string' ? image : image.src}
          alt={ImagePreviewerProps?.alt ?? `${index + 1}`}
          {...ImagePreviewerProps}
        />
      ))}
      {children ? (
        <div
          className={cn('border border-gray-300 w-36 h-36 rounded-lg overflow-hidden', ImagePreviewerProps?.className)}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default ImagePreviewGroup;
