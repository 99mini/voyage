import RootLayout from '@/components/layout/root-layout';

import { PAGE_TITLE } from '@/lib/constants/route.constant';

import ClockSection from './components/clock';
import TextAnimationSection from './components/text-animation';

const Home = () => {
  return (
    <RootLayout title={PAGE_TITLE.ROOT}>
      <div className="flex flex-col justify-center items-center gap-16">
        <ClockSection />
        <TextAnimationSection />
      </div>
    </RootLayout>
  );
};

export default Home;
