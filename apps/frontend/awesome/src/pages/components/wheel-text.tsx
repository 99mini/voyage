import ItemLayout from '@/components/common/item-layout';
import ThemeLayout from '@/components/common/theme-layout';
import WheelText from '@/components/wheel-text/wheel-text';

const WheelTextSection = () => {
  return (
    <ThemeLayout title="Wheel Text">
      <ItemLayout title="Wheel Text" description="A simple wheel text">
        <WheelText text="Hello World" />
      </ItemLayout>
    </ThemeLayout>
  );
};

export default WheelTextSection;
