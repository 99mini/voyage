import ItemLayout from '@/components/common/item-layout';
import { ThemeLayout } from '@/components/common/theme-layout';

import { RotarySwitch } from './rotary-switch';

export const AnalogSection = () => {
  return (
    <ThemeLayout title="Analog">
      <ItemLayout title="" description="A rotary switch component">
        <RotarySwitch />
      </ItemLayout>
    </ThemeLayout>
  );
};
