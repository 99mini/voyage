import { BrowserRouter, Route, Routes } from 'react-router';

import { Toaster } from '@packages/vds';

import Footer from '@/components/common/footer';
import Header from '@/components/common/header';

import Home from '@/pages';

import { ROUTE_PATH } from '@/lib/route-constants';

function RootRouter() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto p-4 md:px-0 flex-grow">
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
