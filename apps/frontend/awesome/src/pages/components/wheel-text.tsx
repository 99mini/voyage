import ItemLayout from '@/components/common/item-layout';
import ThemeLayout from '@/components/common/theme-layout';
import WheelText from '@/components/wheel-text/wheel-text';

const WheelTextSection = () => {
  return (
    <ThemeLayout title="Wheel Text">
      <ItemLayout title="Wheel Text (Default)" description="Wheel text with default settings">
        <div className="flex items-center justify-center p-8">
          <WheelText text={'Hello World'} />
        </div>
      </ItemLayout>
    </ThemeLayout>
  );
};

export default WheelTextSection;
