import { useCallback, useEffect } from 'react';

import { Load, LoadBlock } from '../objects/load';
import { Vehicle } from '../objects/vehicle';

let id = 0;
const vehicles: Record<number, Vehicle> = {};

const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;

// 수평 도로 블록
const block1 = new LoadBlock({
  edge: [0, 100],
  line: 1,
  maxSpeed: 3,
  id: 0,
});

const block2 = new LoadBlock({
  edge: [400, 100],
  line: 1,
  maxSpeed: 3,
  id: 1,
});

const block3 = new LoadBlock({
  edge: [800, 100],
  line: 1,
  maxSpeed: 3,
  id: 2,
});

const block4 = new LoadBlock({
  edge: [0, 200],
  line: 2,
  maxSpeed: 3,
  id: 3,
});

const block5 = new LoadBlock({
  edge: [400, 200],
  line: 2,
  maxSpeed: 3,
  id: 4,
});

const block6 = new LoadBlock({
  edge: [800, 200],
  line: 2,
  maxSpeed: 3,
  id: 5,
});

// 수직 도로 블록
const block7 = new LoadBlock({
  edge: [400, 100],
  line: 2, // 2차선 수직 도로
  maxSpeed: 2,
  id: 6,
});

const block8 = new LoadBlock({
  edge: [400, 300],
  line: 2,
  maxSpeed: 2,
  id: 7,
});

const block9 = new LoadBlock({
  edge: [400, 0],
  line: 2,
  maxSpeed: 2,
  id: 8,
});

const load = new Load({
  blocks: [block1, block2, block3, block4, block5, block6, block7, block8, block9],
});

// 수평 도로 연결
load.addConnection(0, 1);
load.addConnection(1, 2);

// 수평 도로 블록 연결
load.addConnection(3, 4);
load.addConnection(4, 5);

// 수직 도로 연결
load.addConnection(6, 7);
load.addConnection(7, 8);

const SimulationCanvas = () => {
  const callbackRef = useCallback((canvas: HTMLCanvasElement) => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;

    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      load.draw(ctx);
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
