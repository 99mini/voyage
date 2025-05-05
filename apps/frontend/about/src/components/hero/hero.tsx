import React from 'react';

import ClientOnly from '../utils/client-only';

const WakaTimeGraph = React.lazy(() => import('../indicator/waka-graph'));

const Hero = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl md:text-4xl text-center">Welcome to Zerovoyage</h1>
      <ClientOnly>
        <React.Suspense fallback={<div>Loading...</div>}>
          <WakaTimeGraph />
        </React.Suspense>
      </ClientOnly>
    </div>
  );
};

export default Hero;
