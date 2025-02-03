interface ImagePreviewerProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  ImageProps?: Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;
}

const ImagePreviewer = ({ src, alt, className, style, ImageProps }: ImagePreviewerProps) => {
  return (
    <div className={`${className ? className : ""} border border-gray-300 rounded-lg overflow-hidden w-36 h-36 flex items-center justify-center`} style={style}>
      <img src={src} alt={alt} className={`${ImageProps?.className ? ImageProps?.className : ""} max-w-full max-h-full object-contain`} {...ImageProps} />
    </div>
  );
};

export default ImagePreviewer;
