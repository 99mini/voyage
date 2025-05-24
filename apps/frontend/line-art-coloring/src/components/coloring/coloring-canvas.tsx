import { useEffect, useRef } from 'react';

const IMAGE_URI = 'https://static.zerovoyage.com/coloring/puppy.jpeg';

/**
 * 라인아트 컬러링 캔버스
 * - 배경에 라인아트 이미지를 띄우고, 위에 색칠할 수 있도록 함
 */
const ColoringCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  // 이미지 로드 및 캔버스 초기화
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new window.Image();
    image.crossOrigin = 'anonymous';
    image.src = IMAGE_URI;
    image.onload = () => {
      // 캔버스 크기 조정
      canvas.width = image.width;
      canvas.height = image.height;
      // 배경에 라인아트 이미지 그리기
      ctx.drawImage(image, 0, 0, image.width, image.height);
    };
  }, []);

  // 마우스/터치 이벤트 핸들러
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    lastPoint.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !lastPoint.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.strokeStyle = '#f87171'; // 기본 빨간색
    ctx.lineWidth = 8; // 기본 브러시 크기
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastPoint.current = { x, y };
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
    lastPoint.current = null;
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        style={{
          border: '1px solid #ddd',
          maxWidth: '100%',
          touchAction: 'none',
          background: '#fff',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        width={512}
        height={512}
      />
      <div className="mt-2 text-gray-500 text-xs">이미지 위에서 마우스(또는 터치)로 색을 칠해보세요.</div>
    </div>
  );
};

export default ColoringCanvas;
