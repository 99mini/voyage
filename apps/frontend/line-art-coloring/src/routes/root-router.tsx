import { BrowserRouter, Route, Routes } from 'react-router';

import { Toaster } from '@packages/vds';

import ColoringPage from '@/pages/coloring';
import HomePage from '@/pages/home';
import ResultPage from '@/pages/result';
import ResultDetailPage from '@/pages/result/[id]';
import SourcePage from '@/pages/source';

import Footer from '@/components/common/footer';
import Header from '@/components/common/header';

import { PAGE_PATH } from '@/lib/constants/route.constant';

function RootRouter() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto p-4 flex-grow">
          <Routes>
            {/* 공개 라우트 */}
            <Route path={PAGE_PATH.ROOT} element={<HomePage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/result/:id" element={<ResultDetailPage />} />
            <Route path="/source" element={<SourcePage />} />
            <Route path="/coloring" element={<ColoringPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </BrowserRouter>
  );
}

export default RootRouter;
