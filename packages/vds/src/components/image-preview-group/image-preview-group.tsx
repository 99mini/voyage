import { cn } from '@/lib/utils';
import ImagePreviewer, { type ImagePreviewerProps } from '@/components/image-previewer';

export type ImagePreviewGroupProps = {
  images: HTMLImageElement[] | string[] | File[];
  className?: string;
  style?: React.CSSProperties;
  ImagePreviewerProps?: {
    children?: React.ReactNode;
    renderChildren?: (index: number) => React.ReactNode;
  } & Omit<ImagePreviewerProps, 'src' | 'alt' | 'children'>;
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
      {images.map((image: string | HTMLImageElement | File, index: number) => {
        let src: string = '';
        let alt: string = '';
        if (typeof image === 'string') {
          src = image;
          alt = `${index + 1}`;
        } else if (image instanceof HTMLImageElement) {
          src = image.src;
          alt = image.alt;
        } else if (image instanceof File) {
          src = URL.createObjectURL(image);
          alt = image.name;
        }
        return (
          <ImagePreviewer
            key={src}
            className={cn(
              'border border-gray-300 rounded-lg overflow-hidden w-36 h-36 flex items-center justify-center',
              ImagePreviewerProps?.className,
            )}
            src={src}
            alt={alt}
          >
            {ImagePreviewerProps?.renderChildren
              ? ImagePreviewerProps?.renderChildren(index)
              : ImagePreviewerProps?.children}
          </ImagePreviewer>
        );
      })}
      {children ? (
        <div className={cn('w-36 h-36 overflow-hidden', ImagePreviewerProps?.className)}>{children}</div>
      ) : null}
    </div>
  );
};

export default ImagePreviewGroup;
