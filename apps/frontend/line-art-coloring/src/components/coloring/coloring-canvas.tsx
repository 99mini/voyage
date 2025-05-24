import { useEffect, useRef, useState } from 'react';

import DownloadButton from '../common/download-button';

const IMAGE_URI = 'https://static.zerovoyage.com/coloring/src/puppy.jpeg';
const [IMAGE_NAME, IMAGE_EXTENSION] = (IMAGE_URI.split('/').pop() ?? 'untitled.png').split('.');

/**
 * 라인아트 컬러링 캔버스
 * - 배경에 라인아트 이미지를 띄우고, 위에 색칠할 수 있도록 함
 */
// 시스템 기본 색상 팔레트
const DEFAULT_PALETTE = [
  '#f87171', // 빨강
  '#fbbf24', // 노랑
  '#34d399', // 연두
  '#60a5fa', // 파랑
  '#a78bfa', // 보라
  '#f472b6', // 핑크
  '#000000', // 검정
  '#ffffff', // 흰색
];

function hexToRgba(hex: string): [number, number, number, number] {
  let c = hex.replace('#', '');
  if (c.length === 3)
    c = c
      .split('')
      .map((x) => x + x)
      .join('');
  const num = parseInt(c, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255, 255];
}

interface ColoringCanvasProps {
  imageUrl?: string;
}

const ColoringCanvas = ({ imageUrl }: ColoringCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState<string>(DEFAULT_PALETTE[0]); // 현재 선택 색상
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);

  // 이미지 로드 및 캔버스 초기화
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new window.Image();
    image.crossOrigin = 'anonymous';
    image.src = imageUrl || IMAGE_URI;
    image.onload = () => {
      // 캔버스 크기 조정
      canvas.width = image.width;
      canvas.height = image.height;
      // 배경에 라인아트 이미지 그리기
      ctx.drawImage(image, 0, 0, image.width, image.height);
    };
  }, []);

  // Undo/Redo 단축키 지원
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;
      // Undo: Ctrl/Cmd+Z (Shift 미포함)
      if (ctrlKey && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      // Redo: Ctrl/Cmd+Shift+Z 또는 Ctrl/Cmd+Y
      if (ctrlKey && ((e.key.toLowerCase() === 'z' && e.shiftKey) || e.key.toLowerCase() === 'y')) {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undoStack, redoStack]);

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
    if (
      baseColor[0] === fillColor[0] &&
      baseColor[1] === fillColor[1] &&
      baseColor[2] === fillColor[2] &&
      baseColor[3] === fillColor[3]
    )
      return;

    // 색상 비교 함수 (허용 오차 있음) + 라인(검정색) 보호
    const colorMatch = (pos: number) => {
      // 라인(검정색) 픽셀은 색칠하지 않음
      const r = data[pos];
      const g = data[pos + 1];
      const b = data[pos + 2];
      if (r < 40 && g < 40 && b < 40) return false;
      // 기존 색상 비교
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
    // FloodFill 실행 전 상태 저장 (undo)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack((prev) => [...prev.slice(-19), imageData]); // 최대 20개 제한
    setRedoStack([]); // 새 작업 시 redo 초기화

    const rect = canvas.getBoundingClientRect();
    // 화면상의 좌표 → 실제 캔버스 해상도 기준 좌표로 변환
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));
    // 선택된 색상으로 채우기
    floodFill(ctx, x, y, hexToRgba(color));
  };

  // Undo
  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    setUndoStack((prev) => {
      if (prev.length === 0) return prev;
      const newUndo = [...prev];
      const last = newUndo.pop()!;
      // 현재 상태를 redo에 저장
      const currData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setRedoStack((redo) => [...redo, currData]);
      ctx.putImageData(last, 0, 0);
      return newUndo;
    });
  };

  // Redo
  const handleRedo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    setRedoStack((prev) => {
      if (prev.length === 0) return prev;
      const newRedo = [...prev];
      const last = newRedo.pop()!;
      // 현재 상태를 undo에 저장
      const currData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setUndoStack((undo) => [...undo, currData]);
      ctx.putImageData(last, 0, 0);
      return newRedo;
    });
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Undo/Redo 버튼 */}
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={handleUndo}
          disabled={undoStack.length === 0}
          className="px-3 py-1 rounded border bg-white disabled:opacity-40"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={handleRedo}
          disabled={redoStack.length === 0}
          className="px-3 py-1 rounded border bg-white disabled:opacity-40"
        >
          Redo
        </button>
        <DownloadButton
          imageUrlList={[canvasRef.current?.toDataURL('image/png')!]}
          outputFileName={IMAGE_NAME}
          extension={IMAGE_EXTENSION}
        >
          Download
        </DownloadButton>
      </div>
      {/* 색상 팔레트 UI */}
      <div className="flex flex-wrap gap-2 mb-4 items-center justify-center">
        {DEFAULT_PALETTE.map((c) => (
          <button
            key={c}
            type="button"
            className={`w-7 h-7 rounded-full border-2 ${color === c ? 'border-blue-500' : 'border-gray-200'}`}
            style={{ background: c }}
            onClick={() => setColor(c)}
            aria-label={c}
          />
        ))}
        {/* 임의 색상 선택 */}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-7 h-7 p-0 border-0 bg-transparent cursor-pointer"
          aria-label="색상 선택"
          style={{ verticalAlign: 'middle' }}
        />
      </div>
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
