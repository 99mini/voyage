import { useEffect, useState } from 'react';

import AnalogClock from '@/components/clock/analog-clock';
import DigitalClock from '@/components/clock/digital-clock';
import TextClock from '@/components/clock/text-clock';
import ItemLayout from '@/components/common/item-layout';
import ThemeLayout from '@/components/common/theme-layout';

const ClockSection = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
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
        title="Digital Clock (Flash Mode)"
        description="A digital clock with inactive segments visible in gray"
      >
        <DigitalClock time={time} mode="flash" />
      </ItemLayout>
      <ItemLayout title="Digital Clock (420px)" description="A simple digital clock with width 420px">
        <DigitalClock time={time} width={420} />
      </ItemLayout>
      <ItemLayout title="Digital Clock (420x420)" description="A simple digital clock with size 420x420">
        <DigitalClock time={time} width={420} height={420} />
      </ItemLayout>
    </ThemeLayout>
  );
};

export default ClockSection;
