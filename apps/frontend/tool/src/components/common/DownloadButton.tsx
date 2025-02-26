import React from 'react';
import { Button } from '@packages/vds';

interface DownloadButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  imageUrlList: string[];
  children?: React.ReactNode;
  zip?: boolean;
  outputFileName?: string;
  /**
   * @default: png
   * @enum: png, jpg, jpeg, gif, mp4, avi, webm, mkv
   */
  extension?: string;
}

const DownloadButton = ({ imageUrlList, children, zip, extension, outputFileName, ...props }: DownloadButtonProps) => {
  const handleDownload = () => {
    imageUrlList.forEach((imageUrl) => {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${outputFileName || 'untitled'}.${extension || 'png'}`;
      link.click();
    });
    if (zip) {
      // TODO: zip 파일 저장 로직 구현 필요
    }
  };

  return (
    <Button onClick={handleDownload} {...props}>
      {children || 'Download Image'}
    </Button>
  );
};

export default DownloadButton;
