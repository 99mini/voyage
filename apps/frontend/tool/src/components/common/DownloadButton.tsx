import React from 'react';
import { Button } from '@packages/vds';

interface DownloadButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  imageUrl: string;
  children?: React.ReactNode;
}

const DownloadButton = ({ imageUrl, children, ...props }: DownloadButtonProps) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'merged-image.png';
    link.click();
  };

  return (
    <Button onClick={handleDownload} {...props}>
      {children || 'Download Image'}
    </Button>
  );
};

export default DownloadButton;
