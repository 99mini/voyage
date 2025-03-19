import React, { useEffect, useState } from 'react';

import AnalogClock from '@/components/clock/analog-clock';
import DigitalClock from '@/components/clock/digital-clock';
import TextClock from '@/components/clock/text-clock';
import Description from '@/components/common/description';
import RootLayout from '@/components/layout/root-layout';

import { PAGE_TITLE } from '@/lib/constants/route.constant';

const ItemLayout = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2 w-full items-center justify-center">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
      {description && <Description>{description}</Description>}
    </div>
  );
};

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
        <div className="flex flex-col gap-8 p-4 justify-center items-center">
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
        </div>
      </div>
    </RootLayout>
  );
}

export default Home;
