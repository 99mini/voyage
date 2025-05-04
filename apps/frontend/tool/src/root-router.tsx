import { BrowserRouter, Route, Routes } from 'react-router';

import { Toaster } from '@packages/vds';

import Home from '@/pages';
import CurlGenerator from '@/pages/curl-generator';
import GifGenerator from '@/pages/gif-generator';
import RandomPasswordGenerator from '@/pages/random-password-generator';
import VerticalImageMerger from '@/pages/vertical-image-merger';

import Footer from '@/components/common/footer';
import Header from '@/components/common/header';

import { ROUTE_PATH } from '@/lib/constant';

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
            <Route path={ROUTE_PATH.RANDOM_PASSWORD_GENERATOR} element={<RandomPasswordGenerator />} />
            <Route path={ROUTE_PATH.CURL_GENERATOR} element={<CurlGenerator />} />
          </Routes>
          <Toaster />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default RootRouter;
