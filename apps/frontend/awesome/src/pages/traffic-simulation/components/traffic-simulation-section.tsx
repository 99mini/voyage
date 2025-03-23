import ThemeLayout from '@/components/common/theme-layout';

import SimulationCanvas from './simulation-canvas';

const TrafficSimulationSection = () => {
  return (
    <ThemeLayout title="Traffic Simulation">
      <SimulationCanvas />
    </ThemeLayout>
  );
};

export default TrafficSimulationSection;
