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

  // Flood Fill (버킷) 알고리즘
  function floodFill(ctx: CanvasRenderingContext2D, x: number, y: number, fillColor: [number, number, number, number]) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const stack = [[x, y]];

    // 기준 픽셀의 색상
    const pixelPos = (y * width + x) * 4;
    const baseColor = data.slice(pixelPos, pixelPos + 4);
    // 이미 같은 색이면 종료
    if (baseColor[0] === fillColor[0] && baseColor[1] === fillColor[1] && baseColor[2] === fillColor[2] && baseColor[3] === fillColor[3]) return;

    // 색상 비교 함수 (허용 오차 있음)
    const colorMatch = (pos: number) => {
      for (let i = 0; i < 4; i++) {
        if (Math.abs(data[pos + i] - baseColor[i]) > 32) return false;
      }
      return true;
    };

    while (stack.length) {
      const [cx, cy] = stack.pop()!;
      if (cx < 0 || cy < 0 || cx >= width || cy >= height) continue;
      const pos = (cy * width + cx) * 4;
      if (!colorMatch(pos)) continue;
      // 색상 채우기
      for (let i = 0; i < 4; i++) data[pos + i] = fillColor[i];
      // 4방향 탐색
      stack.push([cx + 1, cy]);
      stack.push([cx - 1, cy]);
      stack.push([cx, cy + 1]);
      stack.push([cx, cy - 1]);
    }
    ctx.putImageData(imageData, 0, 0);
  }

  // 버킷 클릭 이벤트
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);
    // 기본 색상: 빨간색
    floodFill(ctx, x, y, [248, 113, 113, 255]); // #f87171
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
        onClick={handleCanvasClick}
        width={512}
        height={512}
      />
      <div className="mt-2 text-gray-500 text-xs">이미지 위에서 마우스(또는 터치)로 색을 칠해보세요.</div>
    </div>
  );
};

export default ColoringCanvas;
