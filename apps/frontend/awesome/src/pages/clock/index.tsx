import RootLayout from '@/components/layout/root-layout';

import { PAGE_TITLE } from '@/lib/constants/route.constant';

import ClockSection from './components/clock';

const ClockPage = () => {
  return (
    <RootLayout title={PAGE_TITLE.CLOCK}>
      <ClockSection />
    </RootLayout>
  );
};

export default ClockPage;
