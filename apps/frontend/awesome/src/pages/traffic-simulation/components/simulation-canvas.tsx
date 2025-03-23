import { useCallback, useEffect, useState } from 'react';

import { Road, RoadBlock } from '../objects/road';
import { Vehicle } from '../objects/vehicle';

let vehicleId = 0;
const vehicles: Record<number, Vehicle> = {};

const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;

// 수평 도로 블록 (위쪽)
const block0 = new RoadBlock({
  edge: [20, 100],
  line: 1,
  maxSpeed: 3,
  id: 0,
});

const block1 = new RoadBlock({
  edge: [400, 100],
  line: 1,
  maxSpeed: 3,
  id: 1,
});

const block2 = new RoadBlock({
  edge: [780, 100],
  line: 1,
  maxSpeed: 3,
  id: 2,
});

// 수평 도로 블록 (아래쪽)
const block3 = new RoadBlock({
  edge: [20, 200],
  line: 2,
  maxSpeed: 3,
  id: 3,
});

const block4 = new RoadBlock({
  edge: [400, 200],
  line: 2,
  maxSpeed: 3,
  id: 4,
});

const block5 = new RoadBlock({
  edge: [780, 200],
  line: 2,
  maxSpeed: 3,
  id: 5,
});

// 수직 도로 블록
const block6 = new RoadBlock({
  edge: [400, 20],
  line: 2,
  maxSpeed: 2,
  id: 6,
});

const block7 = new RoadBlock({
  edge: [400, 580],
  line: 2,
  maxSpeed: 2,
  id: 7,
});

const load = new Road({
  blocks: [block0, block1, block2, block3, block4, block5, block6, block7],
});

// 수평 도로 연결 (위)
load.addConnection(0, 1);
load.addConnection(1, 2);

// 수평 도로 블록 연결 (아래)
load.addConnection(3, 4);
load.addConnection(4, 5);

// 교차로 연결
load.addConnection(1, 6);
load.addConnection(1, 4);
load.addConnection(4, 7);

// 가능한 시작점과 목적지 정의
const possibleStarts = [0, 3, 6]; // 왼쪽 위, 왼쪽 아래, 위쪽 중앙
const possibleDestinations = [2, 5, 7]; // 오른쪽 위, 오른쪽 아래, 아래쪽 중앙

// 랜덤 시작점과 목적지 선택 함수
const getRandomStartAndDestination = () => {
  const startIdx = Math.floor(Math.random() * possibleStarts.length);
  let destIdx;

  // 시작점과 목적지가 같지 않도록 설정
  do {
    destIdx = Math.floor(Math.random() * possibleDestinations.length);
  } while (possibleStarts[startIdx] === possibleDestinations[destIdx]);

  return {
    startBlockId: possibleStarts[startIdx],
    destinationBlockId: possibleDestinations[destIdx],
  };
};

const SimulationCanvas = () => {
  const [simulationRunning, setSimulationRunning] = useState(true);

  const callbackRef = useCallback((canvas: HTMLCanvasElement) => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;

    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      load.draw(ctx);

      // 모든 차량 업데이트 및 그리기
      for (const vehicle of Object.values(vehicles)) {
        vehicle.update(Object.values(vehicles), load.blocks);
        vehicle.draw(ctx);
      }

      requestAnimationFrame(update);
    }

    update();
  }, []);

  useEffect(() => {
    if (!simulationRunning) return;

    const interval = setInterval(async () => {
      // 랜덤 딜레이 (차량 생성 간격)
      const random = Math.random();
      await new Promise((resolve) => setTimeout(resolve, Math.max(1000 * random, 250)));

      // 랜덤 시작점과 목적지 선택
      const { startBlockId, destinationBlockId } = getRandomStartAndDestination();

      // 시작 블록과 목적지 블록 가져오기
      const startBlock = load.getBlockById(startBlockId);
      const destBlock = load.getBlockById(destinationBlockId);

      if (startBlock && destBlock) {
        // 경로 찾기
        const path = load.findPath(startBlockId, destinationBlockId);
        console.log(`경로 탐색: ${startBlockId} -> ${destinationBlockId}, 결과:`, path);

        if (path.length > 0) {
          // 새 차량 생성
          const newVehicle = new Vehicle({
            x: startBlock.edge[0],
            y: startBlock.edge[1],
            speed: 3,
            startBlockId,
            destinationBlockId,
          });

          // 경로 설정
          newVehicle.setPath(path);

          // 차량 등록
          vehicles[vehicleId++] = newVehicle;
        } else {
          console.error(`경로를 찾을 수 없음: ${startBlockId} -> ${destinationBlockId}`);
        }
      }

      // 화면 밖으로 나간 차량 제거
      const keys = Object.keys(vehicles);
      for (const key of keys) {
        const vehicle = vehicles[Number(key)];
        if (
          0 > vehicle.x ||
          vehicle.x > WINDOW_WIDTH ||
          0 > vehicle.y ||
          vehicle.y > WINDOW_HEIGHT ||
          vehicle.path.length === 0 // 목적지에 도착한 차량도 제거
        ) {
          console.log('차량 제거:', vehicle);
          delete vehicles[Number(key)];
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [simulationRunning]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full border border-gray-300 p-4">
      <div className="mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          onClick={() => setSimulationRunning(!simulationRunning)}
        >
          {simulationRunning ? '시뮬레이션 중지' : '시뮬레이션 시작'}
        </button>
      </div>
      <canvas ref={callbackRef} width={WINDOW_WIDTH} height={WINDOW_HEIGHT}></canvas>
    </div>
  );
};

export default SimulationCanvas;
