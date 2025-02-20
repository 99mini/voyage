import { BrowserRouter, Route, Routes } from 'react-router';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { Toaster } from '@packages/vds';

import GifGenerator from '@/pages/GifGenerator';
import Home from '@/pages/Home';
import VerticalImageMerger from '@/pages/VerticalImageMerger';

import { ROUTE_PATH } from '@/constant';

function RootRouter() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto p-4 flex-grow">
          <Routes>
            <Route path={ROUTE_PATH.ROOT} element={<Home />} />
            <Route path={ROUTE_PATH.VERTICAL_IMAGE_MERGER} element={<VerticalImageMerger />} />
            <Route path={ROUTE_PATH.GIF_GENERATOR} element={<GifGenerator />} />
          </Routes>
          <Toaster />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default RootRouter;
