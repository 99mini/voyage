import { useEffect, useState } from 'react';

import ItemLayout from '@/components/common/item-layout';
import ThemeLayout from '@/components/common/theme-layout';

import AnalogClock from './analog-clock';
import DigitalClock from './digital-clock';
import TextClock from './text-clock';

const ClockSection = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <ThemeLayout title="Clock">
      <ItemLayout title="Text Clock (Default)" description="A simple text clock">
        <TextClock time={time} />
      </ItemLayout>
      <ItemLayout title="Text Clock (Korean)" description="A simple text clock with Korean locale">
        <TextClock time={time} locale="ko" />
      </ItemLayout>
      <ItemLayout title="Analog Clock (Default)" description="A simple analog clock">
        <AnalogClock time={time} />
      </ItemLayout>
      <ItemLayout title="Analog Clock (Without Second Hand)" description="A simple analog clock without second hand">
        <AnalogClock time={time} secondHand={false} />
      </ItemLayout>
      <ItemLayout title="Analog Clock (Smooth Mode)" description="A smooth analog clock with continuous movement">
        <AnalogClock time={time} mode="smooth" />
      </ItemLayout>
      <ItemLayout
        title="Analog Clock (Smooth Without Second Hand)"
        description="A smooth analog clock without second hand"
      >
        <AnalogClock time={time} mode="smooth" secondHand={false} />
      </ItemLayout>
      <ItemLayout title="Digital Clock (Default)" description="A simple digital clock">
        <DigitalClock time={time} />
      </ItemLayout>
      <ItemLayout
        title="Digital Clock (Burn-in Mode)"
        description="A digital clock with inactive segments visible in gray"
      >
        <DigitalClock time={time} mode="burn-in" />
      </ItemLayout>
      <ItemLayout title="Digital Clock (320px)" description="A simple digital clock with width 320px">
        <DigitalClock time={time} width={320} />
      </ItemLayout>
      <ItemLayout title="Digital Clock (320x320)" description="A simple digital clock with size 320x320">
        <DigitalClock time={time} width={320} height={320} />
      </ItemLayout>
    </ThemeLayout>
  );
};

export default ClockSection;
