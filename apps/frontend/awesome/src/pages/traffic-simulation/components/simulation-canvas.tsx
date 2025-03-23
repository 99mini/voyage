import { useCallback, useEffect, useState } from 'react';

import { ROAD_WIDTH } from '../constants/road';
import { Connection, RoadBlock, RoadNetwork } from '../objects/road';
import { Vehicle } from '../objects/vehicle';

let vehicleId = 0;
const vehicles: Record<number, Vehicle> = {};

const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;

// 수평 도로 블록 (위쪽)
const block0 = new RoadBlock({
  edge: [20, 100],
  id: 0,
});

const block1 = new RoadBlock({
  edge: [400, 100],
  id: 1,
});

const block2 = new RoadBlock({
  edge: [780, 100],
  id: 2,
});

// 수평 도로 블록 (아래쪽)
const block3 = new RoadBlock({
  edge: [20, 200],
  id: 3,
});

const block4 = new RoadBlock({
  edge: [400, 200],
  id: 4,
});

const block5 = new RoadBlock({
  edge: [780, 200],
  id: 5,
});

// 수직 도로 블록
const block6 = new RoadBlock({
  edge: [400, 20],
  id: 6,
});

const block7 = new RoadBlock({
  edge: [400, 580],
  id: 7,
});

// 도로 네트워크 생성
const network = new RoadNetwork();

// 블록 추가
network.addBlock(block0);
network.addBlock(block1);
network.addBlock(block2);
network.addBlock(block3);
network.addBlock(block4);
network.addBlock(block5);
network.addBlock(block6);
network.addBlock(block7);

// 수평 도로 연결 (위)
network.addConnection(
  new Connection({ id: 1, fromBlockId: 0, toBlockId: 1, line: 4, inLanes: 2, outLanes: 2, maxSpeed: 3 }),
);

network.addConnection(
  new Connection({ id: 2, fromBlockId: 1, toBlockId: 2, line: 4, inLanes: 2, outLanes: 2, maxSpeed: 3 }),
);

// 반대 방향 연결 추가 (위)
network.addConnection(
  new Connection({ id: 8, fromBlockId: 1, toBlockId: 0, line: 4, inLanes: 2, outLanes: 2, maxSpeed: 3 }),
);

network.addConnection(
  new Connection({ id: 9, fromBlockId: 2, toBlockId: 1, line: 4, inLanes: 2, outLanes: 2, maxSpeed: 3 }),
);

// 수평 도로 블록 연결 (아래)
network.addConnection(
  new Connection({ id: 3, fromBlockId: 3, toBlockId: 4, line: 4, inLanes: 2, outLanes: 2, maxSpeed: 3 }),
);

network.addConnection(
  new Connection({ id: 4, fromBlockId: 4, toBlockId: 5, line: 4, inLanes: 2, outLanes: 2, maxSpeed: 3 }),
);

// 반대 방향 연결 추가 (아래)
network.addConnection(
  new Connection({ id: 10, fromBlockId: 4, toBlockId: 3, line: 4, inLanes: 2, outLanes: 2, maxSpeed: 3 }),
);

network.addConnection(
  new Connection({ id: 11, fromBlockId: 5, toBlockId: 4, line: 4, inLanes: 2, outLanes: 2, maxSpeed: 3 }),
);

// 교차로 연결
network.addConnection(
  new Connection({ id: 5, fromBlockId: 6, toBlockId: 1, line: 4, inLanes: 2, outLanes: 2, maxSpeed: 3 }),
);

network.addConnection(
  new Connection({ id: 6, fromBlockId: 1, toBlockId: 4, line: 4, inLanes: 2, outLanes: 2, maxSpeed: 3 }),
);

network.addConnection(
  new Connection({ id: 7, fromBlockId: 4, toBlockId: 7, line: 4, inLanes: 2, outLanes: 2, maxSpeed: 3 }),
);

// 반대 방향 교차로 연결 추가
network.addConnection(
  new Connection({ id: 12, fromBlockId: 1, toBlockId: 6, line: 4, inLanes: 2, outLanes: 2, maxSpeed: 3 }),
);

network.addConnection(
  new Connection({ id: 13, fromBlockId: 4, toBlockId: 1, line: 4, inLanes: 2, outLanes: 2, maxSpeed: 3 }),
);

network.addConnection(
  new Connection({ id: 14, fromBlockId: 7, toBlockId: 4, line: 4, inLanes: 2, outLanes: 2, maxSpeed: 3 }),
);

// 가능한 시작점과 목적지 정의
const possibleSet = [
  [
    [0], // 왼쪽 위
    [2, 3, 5, 6, 7],
  ],
  [
    [2], // 오른쪽 위
    [0, 3, 5, 6, 7],
  ],
  [
    [3], // 왼쪽 아래
    [0, 2, 5, 6, 7],
  ],
  [
    [5], // 오른쪽 아래
    [0, 2, 3, 6, 7],
  ],
  [
    [6], // 중앙 위
    [0, 2, 3, 5, 7],
  ],
  [
    [7], // 중앙 아래
    [0, 2, 3, 5, 6],
  ],
];

// 랜덤 시작점과 목적지 선택 함수
const getRandomStartAndDestination = () => {
  const [possibleStarts, possibleDestinations] = possibleSet[Math.floor(Math.random() * possibleSet.length)];
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

// 차량 색상 랜덤 선택 함수
const getRandomColor = () => {
  const colors = ['blue', 'green', 'purple', 'orange', 'teal'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// 연결 상태 확인 및 출력
console.log('도로 연결 상태:', network.adjacencyList);

// 모든 가능한 경로 테스트
for (const [possibleStarts, possibleDestinations] of possibleSet) {
  for (const start of possibleStarts) {
    for (const dest of possibleDestinations) {
      if (start !== dest) {
        const testPath = network.findPath(start, dest);
        console.log(`테스트 경로 ${start} -> ${dest}:`, testPath);
      }
    }
  }
}

const SimulationCanvas = () => {
  const [simulationRunning, setSimulationRunning] = useState(true);

  const callbackRef = useCallback((canvas: HTMLCanvasElement) => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;

    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      network.draw(ctx);

      // 모든 차량 업데이트 및 그리기
      for (const vehicle of Object.values(vehicles)) {
        vehicle.update(Object.values(vehicles), network.blocks, network.connections, network);
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

      // 유효한 경로를 찾을 때까지 시도
      let validPath = false;
      let startBlockId, destinationBlockId, path;
      let attempts = 0;
      const maxAttempts = 5; // 최대 시도 횟수

      while (!validPath && attempts < maxAttempts) {
        // 랜덤 시작점과 목적지 선택
        const randomPoints = getRandomStartAndDestination();
        startBlockId = randomPoints.startBlockId;
        destinationBlockId = randomPoints.destinationBlockId;

        // 시작 블록과 목적지 블록 가져오기
        const startBlock = network.getBlockById(startBlockId);
        const destBlock = network.getBlockById(destinationBlockId);

        if (startBlock && destBlock) {
          // 경로 찾기
          path = network.findPath(startBlockId, destinationBlockId);

          // 경로가 존재하고 길이가 2 이상인 경우 (시작점 + 최소 1개 이상의 다음 블록)
          if (path.length >= 2) {
            validPath = true;
          }
        }

        attempts++;
      }

      // 유효한 경로를 찾지 못한 경우
      if (!validPath) {
        console.error('유효한 경로를 찾을 수 없어 차량 생성을 건너뜁니다.');
        return;
      }

      // 여기서부터는 validPath가 true이므로 startBlockId, destinationBlockId, path는 모두 정의되어 있음
      const startBlock = network.getBlockById(startBlockId as number);
      const nextBlockId = (path as number[])[1]; // 첫 번째 다음 블록
      const nextBlock = network.getBlockById(nextBlockId);
      const connection = network.getConnectionByBlocks(startBlockId as number, nextBlockId);

      if (startBlock && nextBlock && connection) {
        // 도로의 방향 벡터 계산
        const dx = nextBlock.edge[0] - startBlock.edge[0];
        const dy = nextBlock.edge[1] - startBlock.edge[1];
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 정규화된 방향 벡터
        const dirX = dx / distance;
        const dirY = dy / distance;

        // 도로 방향에 수직인 벡터 (90도 회전)
        const perpX = -dirY;
        const perpY = dirX;

        // 도로 방향에 수직인 벡터 (90도 회전)
        let laneNumber;

        // 진행 방향 확인
        // 수평 이동: 왼쪽->오른쪽(dirX > 0) 또는 오른쪽->왼쪽(dirX < 0)
        // 수직 이동: 위->아래(dirY > 0) 또는 아래->위(dirY < 0)

        // 우측통행 규칙에 따른 차선 선택
        if (Math.abs(dirX) > Math.abs(dirY)) {
          if (dirX > 0) {
            // 왼쪽->오른쪽 이동
            // 진입 차선은 도로 아래쪽(우측)
            if (connection.inLanes > 0) {
              // 진입 차선 중 가장 오른쪽(아래쪽) 차선 선택
              laneNumber = connection.line - 1;
            } else {
              // 진입 차선이 없는 경우 가장 오른쪽 차선 선택
              laneNumber = connection.line - 1;
            }
          } else {
            // 오른쪽->왼쪽 이동
            // 진입 차선은 도로 위쪽(우측)
            if (connection.inLanes > 0) {
              // 진입 차선 중 가장 오른쪽(위쪽) 차선 선택
              laneNumber = 0;
            } else {
              // 진입 차선이 없는 경우 가장 오른쪽 차선 선택
              laneNumber = 0;
            }
          }
        } else {
          // 수직 이동
          if (dirY > 0) {
            // 위->아래 이동
            // 진입 차선은 도로 오른쪽(우측)
            if (connection.inLanes > 0) {
              // 진입 차선 중 가장 오른쪽 차선 선택
              laneNumber = connection.line - 1;
            } else {
              // 진입 차선이 없는 경우 가장 오른쪽 차선 선택
              laneNumber = connection.line - 1;
            }
          } else {
            // 아래->위 이동
            // 진입 차선은 도로 왼쪽(우측)
            if (connection.inLanes > 0) {
              // 진입 차선 중 가장 오른쪽(왼쪽) 차선 선택
              laneNumber = 0;
            } else {
              // 진입 차선이 없는 경우 가장 오른쪽 차선 선택
              laneNumber = 0;
            }
          }
        }

        // 도로 너비 계산
        const roadWidth = connection.line * ROAD_WIDTH;

        // 차선 너비 계산
        const laneWidth = roadWidth / connection.line;

        // 차선 중앙 위치 계산
        const laneCenter = laneWidth * laneNumber + laneWidth / 2;
        const laneOffset = laneCenter - roadWidth / 2;

        // 시작 위치 계산 (차선 중앙에 위치)
        const startX = startBlock.edge[0] + perpX * laneOffset;
        const startY = startBlock.edge[1] + perpY * laneOffset;

        // 새 차량 생성
        const newVehicle = new Vehicle({
          x: startX,
          y: startY,
          speed: 2 + Math.random(), // 2~3 사이의 랜덤 속도
          startBlockId: startBlockId as number,
          destinationBlockId: destinationBlockId as number,
        });

        // 랜덤 색상 설정
        newVehicle.color = getRandomColor();

        // 차선 번호 설정
        newVehicle.laneNumber = laneNumber;

        // 이동 방향 각도 계산 - 수직 이동일 경우 특별 처리
        if (Math.abs(dx) < 0.001) {
          // 수직 이동 (위/아래)
          newVehicle.angle = dy > 0 ? Math.PI / 2 : -Math.PI / 2;
        } else if (Math.abs(dy) < 0.001) {
          // 수평 이동 (좌/우)
          newVehicle.angle = dx > 0 ? 0 : Math.PI;
        } else {
          // 일반적인 각도 계산
          newVehicle.angle = Math.atan2(dy, dx);
        }

        // 경로 설정
        newVehicle.setPath(path as number[]);

        // 차량 등록
        vehicles[vehicleId++] = newVehicle;
        console.log(
          `새 차량 생성: ID=${vehicleId - 1}, 시작=${startBlockId}, 목적지=${destinationBlockId}, 차선=${laneNumber}`,
        );
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
