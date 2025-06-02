import RootLayout from '@/components/layout/root-layout';
import ColoringCanvas from '@/components/coloring/coloring-canvas';

const HomePage = () => {
  return (
    <RootLayout title="컬러링 북">
      <div className="flex flex-col items-center py-8">
        <h1 className="text-2xl font-bold mb-4">라인아트 컬러링</h1>
        <ColoringCanvas />
      </div>
    </RootLayout>
  );
};

export default HomePage;
