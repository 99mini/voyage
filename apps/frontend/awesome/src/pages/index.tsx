import { useEffect, useState } from 'react';

import AnalogClock from '@/components/clock/analog-clock';
import DigitalClock from '@/components/clock/digital-clock';
import TextClock from '@/components/clock/text-clock';
import ItemLayout from '@/components/common/item-layout';
import ThemeLayout from '@/components/common/theme-layout';
import RootLayout from '@/components/layout/root-layout';

import { PAGE_TITLE } from '@/lib/constants/route.constant';

function Home() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <RootLayout title={PAGE_TITLE.ROOT}>
      <div className="flex justify-center items-center">
        <ThemeLayout title="Clocks">
          <ItemLayout title="Text Clock (Default)" description="A simple text clock">
            <TextClock time={time} />
          </ItemLayout>
          <ItemLayout title="Text Clock (Korean)" description="A simple text clock with Korean locale">
            <TextClock time={time} locale="ko" />
          </ItemLayout>
          <ItemLayout title="Analog Clock (Default)" description="A simple analog clock">
            <AnalogClock time={time} />
          </ItemLayout>
          <ItemLayout
            title="Analog Clock (Without Second Hand)"
            description="A simple analog clock without second hand"
          >
            <AnalogClock time={time} secondHand={false} />
          </ItemLayout>
          <ItemLayout title="Digital Clock (Default)" description="A simple digital clock">
            <div className="border py-2 rounded-md">
              <DigitalClock time={time} />
            </div>
          </ItemLayout>
          <ItemLayout title="Digital Clock (420px)" description="A simple digital clock with width 420px">
            <div className="border py-2 rounded-md hover:shadow-md transition-shadow">
              <DigitalClock time={time} width={420} />
            </div>
          </ItemLayout>
        </ThemeLayout>
      </div>
    </RootLayout>
  );
}

export default Home;
