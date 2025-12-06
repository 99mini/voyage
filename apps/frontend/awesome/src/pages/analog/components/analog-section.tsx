import ItemLayout from '@/components/common/item-layout';
import { ThemeLayout } from '@/components/common/theme-layout';

import { MinimalRotarySwitch } from './minimal-rotary-switch';
import { RotarySwitch } from './rotary-switch';

export const AnalogSection = () => {
  return (
    <ThemeLayout title="Analog">
      <ItemLayout title="Classic Rotary Switch" description="A classic rotary switch with gradient knob and tick marks">
        <RotarySwitch />
      </ItemLayout>
      <ItemLayout title="Minimal Rotary Switch" description="A minimal rotary switch with dots and clean design">
        <MinimalRotarySwitch />
      </ItemLayout>
    </ThemeLayout>
  );
};
