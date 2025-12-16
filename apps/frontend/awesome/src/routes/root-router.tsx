import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, StaticRouter } from 'react-router';

import { Toaster } from '@packages/vds';

import AnalogPage from '@/pages/analog';
// SSR을 위해 동적 import
import ClockPage from '@/pages/clock';
import GraphPage from '@/pages/graph';
import HomePage from '@/pages/home';

import Footer from '@/components/common/footer';
import Header from '@/components/common/header';

import { PAGE_PATH } from '@/lib/constants/route.constant';

// 클라이언트 사이드에서만 lazy loading 사용
const isClient = typeof window !== 'undefined';
const LazyClockPage = isClient ? lazy(() => import('@/pages/clock')) : ClockPage;
const LazyGraphPage = isClient ? lazy(() => import('@/pages/graph')) : GraphPage;
const LazyAnalogPage = isClient ? lazy(() => import('@/pages/analog')) : AnalogPage;

interface DynamicRouterProps extends React.PropsWithChildren {
  location?: string;
}

const DynamicRouter = ({ children, location }: DynamicRouterProps) => {
  if (typeof window !== 'undefined') {
    return <BrowserRouter>{children}</BrowserRouter>;
  }

  return <StaticRouter location={location || PAGE_PATH.ROOT}>{children}</StaticRouter>;
};

interface RootRouterProps {
  location?: string;
}

function RootRouter({ location }: RootRouterProps = {}) {
  // SSR 환경인지 확인
  const PageClockComponent = isClient ? (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyClockPage />
    </Suspense>
  ) : (
    <ClockPage />
  );

  const PageGraphComponent = isClient ? (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyGraphPage />
    </Suspense>
  ) : (
    <GraphPage />
  );

  const PageAnalogComponent = isClient ? (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyAnalogPage />
    </Suspense>
  ) : (
    <AnalogPage />
  );

  return (
    <DynamicRouter location={location}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto p-4 flex-grow">
          <Routes>
            {/* 공개 라우트 */}
            <Route path={PAGE_PATH.ROOT} element={<HomePage />} />
            <Route path={PAGE_PATH.CLOCK} element={PageClockComponent} />
            <Route path={PAGE_PATH.GRAPH} element={PageGraphComponent} />
            <Route path={PAGE_PATH.ANALOG} element={PageAnalogComponent} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </DynamicRouter>
  );
}

export default RootRouter;
