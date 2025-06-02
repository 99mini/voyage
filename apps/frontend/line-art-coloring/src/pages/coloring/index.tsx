import { useSearchParams } from 'react-router';

import ColoringCanvas from '@/components/coloring/coloring-canvas';

const ColoringPage = () => {
  const [searchParams] = useSearchParams();
  const src = searchParams.get('src') ?? '';

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">컬러링 놀이</h1>
      <ColoringCanvas imageUrl={src} />
    </div>
  );
};

export default ColoringPage;
