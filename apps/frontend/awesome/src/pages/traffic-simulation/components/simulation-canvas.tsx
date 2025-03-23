import { useCallback, useEffect } from 'react';

import { Vehicle } from '../objects/vehicle';

let id = 0;
const vehicles: Record<number, Vehicle> = {};

const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;

const SimulationCanvas = () => {
  const callbackRef = useCallback((canvas: HTMLCanvasElement) => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;

    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const vehicle of Object.values(vehicles)) {
        vehicle.update(Object.values(vehicles));
        vehicle.draw(ctx);
      }
      requestAnimationFrame(update);
    }

    update();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const random = Math.random();
      await new Promise((resolve) => setTimeout(resolve, Math.max(1000 * random, 250)));

      vehicles[id++] = new Vehicle({ x: 0, y: 100, speed: 3 });

      const keys = Object.keys(vehicles);

      for (const key of keys) {
        const vehicle = vehicles[Number(key)];
        if (0 > vehicle.x || vehicle.x > WINDOW_WIDTH || 0 > vehicle.y || vehicle.y > WINDOW_HEIGHT) {
          delete vehicles[Number(key)];
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full border border-gray-300 p-4">
      <canvas ref={callbackRef} width={WINDOW_WIDTH} height={WINDOW_HEIGHT}></canvas>
    </div>
  );
};

export default SimulationCanvas;
