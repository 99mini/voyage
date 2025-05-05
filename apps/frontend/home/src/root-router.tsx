import { BrowserRouter, Route, Routes } from 'react-router';

import { Toaster } from '@packages/vds';

import { Home } from '@/pages';

import Footer from '@/components/common/footer';

import { ROUTE_PATH } from '@/lib/constants/url';

function RootRouter() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <main className="container mx-auto p-4 flex-grow">
          <Routes>
            <Route path={ROUTE_PATH.ROOT} element={<Home />} />
          </Routes>
          <Toaster />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default RootRouter;
