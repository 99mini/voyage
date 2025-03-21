import ItemLayout from '@/components/common/item-layout';
import ThemeLayout from '@/components/common/theme-layout';

import LineGraph from './line-graph';

const randomData = [Array.from({ length: 100 }, (_, i) => ({ x: i, y: Math.random() }))];
const randomTimeData = [
  Array.from({ length: 100 }, (_, i) => ({
    x: new Date().getTime() + i * 1000,
    y: Math.random(),
  })),
];

const multiData = [
  Array.from({ length: 100 }, (_, i) => ({ x: i, y: Math.random() * 2 })),
  Array.from({ length: 100 }, (_, i) => ({ x: i, y: Math.random() })),
];

const multiData2 = [
  Array.from({ length: 100 }, (_, i) => ({ x: i, y: Math.random() * 2 })),
  Array.from({ length: 100 }, (_, i) => ({ x: i, y: Math.random() * 3 })),
  Array.from({ length: 100 }, (_, i) => ({ x: i, y: Math.random() })),
];

const multiDataDifferentLength = [
  Array.from({ length: 100 }, (_, i) => ({ x: i, y: Math.random() * 2 })),
  Array.from({ length: 50 }, (_, i) => ({ x: i, y: Math.random() })),
];

const LineGraphSection = () => {
  return (
    <ThemeLayout title="Line Graph">
      <ItemLayout title="Line Graph (Default)">
        <LineGraph datum={randomData} />
      </ItemLayout>
      <ItemLayout title="Line Graph (Time)" description="Scale type: time">
        <LineGraph datum={randomTimeData} xScaleType="time" />
      </ItemLayout>
      <ItemLayout title="Line Graph (Thickness)" description="Thickness: 2">
        <LineGraph datum={randomData} thickness={2} />
      </ItemLayout>
      <ItemLayout title="Line Graph (Color)" description="Color: red">
        <LineGraph datum={randomData} color="red" />
      </ItemLayout>
      <ItemLayout title="Line Graph (Multi - 2)" description="Multiple datasets (2 datasets)">
        <LineGraph datum={multiData} />
      </ItemLayout>
      <ItemLayout title="Line Graph (Multi - 3)" description="Multiple datasets (3 datasets)">
        <LineGraph datum={multiData2} />
      </ItemLayout>
      <ItemLayout title="Line Graph (Multi - Different Length)" description="Multiple datasets (different length)">
        <LineGraph datum={multiDataDifferentLength} />
      </ItemLayout>
      <ItemLayout title="Line Graph (320x320)" description="Width: 320, Height: 320">
        <LineGraph datum={randomData} width={320} height={320} />
      </ItemLayout>
      <ItemLayout
        title="Line Graph (Default Animation)"
        description="Animation duration: 5000ms, easing: linear, fill mode: forwards"
      >
        <LineGraph datum={randomData} animation />
      </ItemLayout>
      <ItemLayout
        title="Line Graph (Animation With multiple datasets)"
        description="Animation duration: 5000ms, easing: linear, fill mode: forwards"
      >
        <LineGraph datum={multiData} animation />
      </ItemLayout>
      <ItemLayout
        title="Line Graph (Custom Animation)"
        description="Animation duration: 3000ms, easing: ease-in-out, fill mode: infinite"
      >
        <LineGraph
          datum={randomData}
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
        <LineGraph datum={randomData} animation animationEasing="break" />
      </ItemLayout>
    </ThemeLayout>
  );
};

export default LineGraphSection;
