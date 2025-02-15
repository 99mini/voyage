import { useCallback, useRef, useState } from 'react';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button, Label } from '@packages/vds';

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

const alignOptions = ['left', 'center', 'right'] as const;

interface ImageMergerProps {
  files: File[];
  onMergeComplete: (dataUrl: string) => void;
  className?: string;
}

const ImageMerger = ({ files, onMergeComplete, className }: ImageMergerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [align, setAlign] = useState<(typeof alignOptions)[number]>('left');

  const mergeImages = useCallback(async () => {
    if (!canvasRef.current || files.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const images: HTMLImageElement[] = await Promise.all(files.map((file) => loadImage(URL.createObjectURL(file))));

    const totalHeight = images.reduce((sum, img) => sum + img.height, 0);
    const maxWidth = Math.max(...images.map((img) => img.width));

    canvas.width = maxWidth;
    canvas.height = totalHeight;

    let currentY = 0;
    images.forEach((img) => {
      let dx = 0;
      if (align === 'center') {
        dx = (maxWidth - img.width) / 2;
      } else if (align === 'right') {
        dx = maxWidth - img.width;
      }
      ctx.drawImage(img, dx, currentY, img.width, img.height);
      currentY += img.height;
    });

    const dataUrl = canvas.toDataURL('image/png');
    onMergeComplete(dataUrl);
  }, [align, files, onMergeComplete]);

  return (
    <div className={className}>
      <div className="space-y-4">
        <div>옵션</div>
        <ul>
          <li className="flex flex-row justify-between items-center">
            <div>
              <span className="font-bold">이미지 정렬</span>: 선택한 이미지들을 정렬합니다.
            </div>
            <RadioGroup
              className="flex flex-row space-x-4"
              defaultValue="left"
              onValueChange={(value) => setAlign(value as (typeof alignOptions)[number])}
            >
              {alignOptions.map((option) => (
                <div className="flex items-center space-x-2" key={option}>
                  <RadioGroupItem value={option} id={`align-option--${option}`} />
                  <Label htmlFor={`align-option--${option}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </li>
        </ul>
      </div>
      <Button onClick={mergeImages}>이미지 병합하기</Button>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default ImageMerger;
