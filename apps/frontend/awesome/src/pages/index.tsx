import RootLayout from '@/components/layout/root-layout';

import { PAGE_TITLE } from '@/lib/constants/route.constant';

import ClockSection from './components/clock';

const Home = () => {
  return (
    <RootLayout title={PAGE_TITLE.ROOT}>
      <div className="flex justify-center items-center">
        <ClockSection />
      </div>
    </RootLayout>
  );
};

export default Home;
