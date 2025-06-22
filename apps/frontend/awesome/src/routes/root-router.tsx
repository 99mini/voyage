import { lazy } from 'react';
import { BrowserRouter, Route, Routes, StaticRouter } from 'react-router';

import { Toaster } from '@packages/vds';

import HomePage from '@/pages/home';

import Footer from '@/components/common/footer';
import Header from '@/components/common/header';

import { PAGE_PATH } from '@/lib/constants/route.constant';

const ClockPage = lazy(() => import('@/pages/clock'));
const GraphPage = lazy(() => import('@/pages/graph'));

const DynamicRouter = ({ children }: React.PropsWithChildren) => {
  if (typeof window !== 'undefined') {
    return <BrowserRouter>{children}</BrowserRouter>;
  }

  return <StaticRouter location={PAGE_PATH.ROOT}>{children}</StaticRouter>;
};

function RootRouter() {
  return (
    <DynamicRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto p-4 flex-grow">
          <Routes>
            {/* 공개 라우트 */}
            <Route path={PAGE_PATH.ROOT} element={<HomePage />} />
            <Route path={PAGE_PATH.CLOCK} element={<ClockPage />} />
            <Route path={PAGE_PATH.GRAPH} element={<GraphPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </DynamicRouter>
  );
}

export default RootRouter;
