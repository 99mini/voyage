import { useCallback, useEffect, useState } from 'react';

import road from '../constants/road';
import { Road, RoadBlock } from '../objects/road';
import { Vehicle } from '../objects/vehicle';

let vehicleId = 0;
const vehicles: Record<number, Vehicle> = {};

const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;

// 수평 도로 블록 (위쪽)
const block0 = new RoadBlock({
  edge: [20, 100],
  line: 2,
  maxSpeed: 3,
  id: 0,
  inLanes: 1,
  outLanes: 1,
});

const block1 = new RoadBlock({
  edge: [400, 100],
  line: 2,
  maxSpeed: 3,
  id: 1,
  inLanes: 1,
  outLanes: 1,
});

const block2 = new RoadBlock({
  edge: [780, 100],
  line: 2,
  maxSpeed: 3,
  id: 2,
  inLanes: 1,
  outLanes: 1,
});

// 수평 도로 블록 (아래쪽)
const block3 = new RoadBlock({
  edge: [20, 200],
  line: 2,
  maxSpeed: 3,
  id: 3,
  inLanes: 1,
  outLanes: 1,
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
  inLanes: 1,
  outLanes: 1,
});

// 수직 도로 블록
const block6 = new RoadBlock({
  edge: [400, 20],
  line: 2,
  maxSpeed: 2,
  id: 6,
  inLanes: 1,
  outLanes: 1,
});

const block7 = new RoadBlock({
  edge: [400, 580],
  line: 2,
  maxSpeed: 2,
  id: 7,
  inLanes: 2,
  outLanes: 1,
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

// 차량 색상 랜덤 선택 함수
const getRandomColor = () => {
  const colors = ['blue', 'green', 'purple', 'orange', 'teal'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// 연결 상태 확인 및 출력
console.log('도로 연결 상태:', load.adjacencyList);

// 모든 가능한 경로 테스트
for (const start of possibleStarts) {
  for (const dest of possibleDestinations) {
    if (start !== dest) {
      const testPath = load.findPath(start, dest);
      console.log(`테스트 경로 ${start} -> ${dest}:`, testPath);
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
          // 다음 블록이 있으면 방향 계산
          if (path.length > 1) {
            const nextBlockId = path[1];
            const nextBlock = load.getBlockById(nextBlockId);

            if (nextBlock) {
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

              // 진입 차선인지 확인
              const isHorizontalMovement = Math.abs(dirX) > Math.abs(dirY);
              const isVerticalMovement = !isHorizontalMovement;
              const isInLane = (isHorizontalMovement && dirX > 0) || (isVerticalMovement && dirY < 0);

              // 진입 또는 진출 차선 중에서 랜덤 선택
              if (isInLane) {
                // 진입 차선 중에서 랜덤 선택
                if (startBlock.inLanes > 0) {
                  laneNumber = Math.floor(Math.random() * startBlock.inLanes);
                } else {
                  console.warn('진입 차선이 없습니다. 기본 차선 사용');
                  laneNumber = 0;
                }
              } else {
                // 진출 차선 중에서 랜덤 선택
                if (startBlock.outLanes > 0) {
                  // 진출 차선은 진입 차선 이후부터 시작
                  laneNumber = startBlock.inLanes + Math.floor(Math.random() * startBlock.outLanes);
                } else {
                  console.warn('진출 차선이 없습니다. 기본 차선 사용');
                  laneNumber = Math.max(0, startBlock.line - 1);
                }
              }

              // 도로 너비 계산
              const roadWidth = startBlock.line * road.ROAD_WIDTH;

              // 차선 너비 계산
              const laneWidth = roadWidth / startBlock.line;

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
                startBlockId,
                destinationBlockId,
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

              console.log(`차량 각도 설정: ${Math.round((newVehicle.angle * 180) / Math.PI)}°, dx=${dx}, dy=${dy}`);
              console.log(
                `차량 차선 설정: 차선=${laneNumber}, 진입차선여부=${isInLane}, 총차선수=${startBlock.line}, 진입차선수=${startBlock.inLanes}, 진출차선수=${startBlock.outLanes}`,
              );

              // 경로 설정
              newVehicle.setPath(path);

              // 차량 등록
              vehicles[vehicleId++] = newVehicle;
              console.log(
                `새 차량 생성: ID=${vehicleId - 1}, 시작=${startBlockId}, 목적지=${destinationBlockId}, 차선=${laneNumber}`,
              );
            }
          } else {
            console.error(`경로에 다음 블록이 없음: ${startBlockId} -> ${destinationBlockId}`);
          }
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
