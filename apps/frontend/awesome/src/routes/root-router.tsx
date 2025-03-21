import { BrowserRouter, Route, Routes } from 'react-router';

import { Toaster } from '@packages/vds';

import ClockPage from '@/pages/clock';
import GraphPage from '@/pages/graph';
import HomePage from '@/pages/home';

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
            <Route path={PAGE_PATH.CLOCK} element={<ClockPage />} />
            <Route path={PAGE_PATH.GRAPH} element={<GraphPage />} />

            {/* 프리뷰 라우트 */}
            <Route path={`preview${PAGE_PATH.ROOT}`} element={<HomePage />} />
            <Route path={`preview${PAGE_PATH.CLOCK}`} element={<ClockPage />} />
            <Route path={`preview${PAGE_PATH.GRAPH}`} element={<GraphPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </BrowserRouter>
  );
}

export default RootRouter;
