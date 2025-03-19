import { useEffect, useState } from 'react';

import AnalogClock from '@/components/clock/analog-clock';
import DigitalClock from '@/components/clock/digital-clock';
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
        <div className="flex flex-col gap-4 p-4 justify-center items-center">
          <div className="flex gap-4 justify-center items-center">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{time.getHours() % 12}</span>
              <span className="text-gray-500">{time.getHours() >= 12 ? 'PM' : 'AM'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{time.getMinutes()}</span>
              <span className="text-gray-500">Minutes</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{time.getSeconds()}</span>
              <span className="text-gray-500">Seconds</span>
            </div>
          </div>
          <AnalogClock time={time} />
          <div className="border py-2 rounded-md">
            <DigitalClock time={time} />
          </div>
          <div className="border py-2 rounded-md hover:shadow-md transition-shadow">
            <DigitalClock time={time} width={420} />
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

export default Home;
