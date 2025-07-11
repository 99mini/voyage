import { BrowserRouter, Route, Routes, StaticRouter } from 'react-router';

import { Toaster } from '@packages/vds';

import { Home } from '@/pages';

import Footer from '@/components/layout/footer';

import { ROUTE_PATH } from '@/lib/constants/url';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto p-4 flex-grow">
        <Routes>
          <Route path={ROUTE_PATH.ROOT} element={<Home />} />
        </Routes>
        <Toaster />
      </main>
      <Footer />
    </div>
  );
};

function RootRouter() {
  if (typeof window !== 'undefined') {
    return (
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  }

  return (
    <StaticRouter location={'/'}>
      <Layout />
    </StaticRouter>
  );
}

export default RootRouter;
