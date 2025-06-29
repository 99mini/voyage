import { BrowserRouter, Route, Routes, StaticRouter } from 'react-router';

import { Toaster } from '@packages/vds';

import { Home, NotFound, Vote, VoteDetail } from '@/pages';

import Footer from '@/components/layout/footer';

import { ROUTE_PATH } from '@/lib/constants/url';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto p-4 flex-grow">
        <Routes>
          <Route path={ROUTE_PATH.ROOT} element={<Home />} />
          <Route path={ROUTE_PATH.VOTE_DETAIL} element={<VoteDetail />} />
          <Route path={ROUTE_PATH.VOTE} element={<Vote />} />
        </Routes>
        <Toaster />
      </main>
      <Footer />
    </div>
  );
};

function RootRouter() {
  const Router: any = typeof window !== 'undefined' ? BrowserRouter : StaticRouter;
  const routerProps = typeof window !== 'undefined' ? {} : { location: ROUTE_PATH.ROOT };

  return (
    <Router {...routerProps}>
      <Routes>
        {/* Routes wrapped with common layout */}
        <Route element={<Layout />}>
          <Route path={ROUTE_PATH.ROOT} element={<Home />} />
          <Route path={ROUTE_PATH.VOTE_DETAIL} element={<VoteDetail />} />
          <Route path={ROUTE_PATH.VOTE} element={<Vote />} />
        </Route>

        {/* 404 route outside of layout */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default RootRouter;
