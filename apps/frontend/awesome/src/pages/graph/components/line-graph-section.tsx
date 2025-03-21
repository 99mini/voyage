import ItemLayout from '@/components/common/item-layout';
import ThemeLayout from '@/components/common/theme-layout';

import LineGraph from './line-graph';

const LineGraphSection = () => {
  const randomData = Array.from({ length: 100 }, (_, i) => ({ x: i, y: Math.random() }));
  const randomTimeData = Array.from({ length: 100 }, (_, i) => ({
    x: new Date().getTime() + i * 1000,
    y: Math.random(),
  }));
  return (
    <ThemeLayout title="Line Graph">
      <ItemLayout title="Line Graph (Default)">
        <LineGraph data={randomData} />
      </ItemLayout>
      <ItemLayout title="Line Graph (Time)" description="Scale type: time">
        <LineGraph data={randomTimeData} xScaleType="time" />
      </ItemLayout>
      <ItemLayout title="Line Graph (Thickness)" description="Thickness: 2">
        <LineGraph data={randomData} thickness={2} />
      </ItemLayout>
      <ItemLayout title="Line Graph (Color)" description="Color: red">
        <LineGraph data={randomData} color="red" />
      </ItemLayout>
      <ItemLayout title="Line Graph (320x320)" description="Width: 320, Height: 320">
        <LineGraph data={randomData} width={320} height={320} />
      </ItemLayout>
      <ItemLayout
        title="Line Graph (Default Animation)"
        description="Animation duration: 5000ms, easing: linear, fill mode: forwards"
      >
        <LineGraph data={randomData} animation />
      </ItemLayout>
      <ItemLayout
        title="Line Graph (Custom Animation)"
        description="Animation duration: 3000ms, easing: ease-in-out, fill mode: infinite"
      >
        <LineGraph
          data={randomData}
          animation
          animationDuration={3000}
          animationEasing="easeInOut"
          animationFillMode="infinite"
        />
      </ItemLayout>
      <ItemLayout
        title="Line Graph (Animation with Break)"
        description="Animation duration: 5000ms, easing: break, fill mode: forwards"
      >
        <LineGraph data={randomData} animation animationEasing="break" />
      </ItemLayout>
    </ThemeLayout>
  );
};

export default LineGraphSection;
