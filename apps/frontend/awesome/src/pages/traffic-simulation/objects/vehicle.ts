import { ROAD_WIDTH } from '../constants/road';
import { Connection, RoadBlock, RoadNetwork } from './road';

class Vehicle {
  // 위치 정보
  x: number;
  y: number;
  // 차량 크기
  width = 20;
  height = 10;
  // 속도 및 색상
  speed = 2;
  maxSpeed = 3;
  color = 'blue';

  // 경로 정보
  /** 현재 위치한 블록 ID */
  currentBlockId: number;
  /** 목적지 블록 ID */
  destinationBlockId: number;
  /** 이동 경로 (블록 ID 배열) */
  path: number[] = [];
  /** 현재 이동 방향 각도 (라디안) */
  angle: number = 0;
  /** 다음 블록의 좌표 */
  nextPoint: [number, number] | null = null;
  /** 현재 사용 중인 차선 번호 (0부터 시작) */
  laneNumber: number;

  constructor({
    x,
    y,
    speed,
    startBlockId,
    destinationBlockId,
  }: {
    x: number;
    y: number;
    speed: number;
    startBlockId: number;
    destinationBlockId: number;
  }) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.maxSpeed = speed;
    this.currentBlockId = startBlockId;
    this.destinationBlockId = destinationBlockId;
    // 랜덤 차선 할당 (0부터 시작)
    this.laneNumber = Math.floor(Math.random() * 2); // 최대 2개 차선까지 고려
  }

  /**
   * 경로 설정하기
   */
  setPath(path: number[]) {
    this.path = path;
    if (path.length > 0) {
      // 다음 블록 ID 설정
      this.nextPoint = null;
    }
  }

  /**
   * 다음 목적지 설정하기
   */
  setNextPoint(point: [number, number], currentBlock: RoadBlock, nextBlock: RoadBlock, connection: Connection) {
    // 기본 다음 지점 설정
    const baseNextPoint: [number, number] = [point[0], point[1]];

    // 현재 블록에서 다음 블록으로의 방향 벡터 계산
    const dx = nextBlock.edge[0] - currentBlock.edge[0];
    const dy = nextBlock.edge[1] - currentBlock.edge[1];

    // 방향 벡터 정규화
    let dirX = 0;
    let dirY = 0;

    // 방향 벡터가 0이 아닌 경우에만 정규화
    if (dx !== 0 || dy !== 0) {
      const distance = Math.sqrt(dx * dx + dy * dy);
      dirX = dx / distance;
      dirY = dy / distance;
    } else {
      // 방향 벡터가 0인 경우 기본값 설정
      dirX = dx >= 0 ? 1 : -1;
      dirY = dy >= 0 ? 1 : -1;
    }

    // 도로 방향에 수직인 벡터 (90도 회전)
    const perpX = -dirY;
    const perpY = dirX;

    // 도로 너비 계산
    const roadWidth = connection.line * ROAD_WIDTH;

    // 각도 계산 (0도: 위쪽, 90도: 오른쪽, 180도: 아래쪽, 270도: 왼쪽)
    // Math.atan2는 -PI ~ PI 범위를 반환하므로 0 ~ 2PI 범위로 변환
    let angle = Math.atan2(-dirY, dirX); // y축 방향을 반대로 하여 0도가 위쪽을 가리키도록 함

    // 음수 각도를 양수로 변환 (0-360도 범위로)
    if (angle < 0) {
      angle += 2 * Math.PI;
    }

    // 각도 저장 (라디안)
    this.angle = angle;

    // 각도를 도(degree)로 변환
    const angleDegrees = (angle * 180) / Math.PI;

    // 차선 위치 계산 (도로 너비를 차선 수로 나눔)
    const laneWidth = roadWidth / connection.line;

    // 각도에 따라 차선 선택
    // 0° <= 각도 < 180°: 오른쪽 차선 사용 (우측통행)
    // 180° <= 각도 < 360°: 왼쪽 차선 사용 (우측통행)
    if (angleDegrees >= 0 && angleDegrees < 180) {
      // 오른쪽 차선 사용 (우측통행)
      this.laneNumber = connection.line - 1; // 가장 오른쪽 차선
    } else {
      // 왼쪽 차선 사용 (우측통행)
      this.laneNumber = 0; // 가장 왼쪽 차선
    }

    // 차선의 중앙에 차량이 위치하도록 계산
    const laneCenter = laneWidth * this.laneNumber + laneWidth / 2;
    const laneOffset = laneCenter - roadWidth / 2;

    // 차선 위치에 맞게 다음 지점 조정
    baseNextPoint[0] += perpX * laneOffset;
    baseNextPoint[1] += perpY * laneOffset;

    // 다음 지점 설정
    this.nextPoint = baseNextPoint;
  }

  /**
   * 차량 업데이트
   */
  update(
    vehicles: Vehicle[],
    blocks: Map<number, RoadBlock>,
    connections: Map<number, Connection>,
    roadNetwork?: RoadNetwork,
  ) {
    // 경로가 없고 목적지가 설정되어 있으면 경로 생성
    if (this.path.length === 0 && this.currentBlockId !== this.destinationBlockId) {
      if (roadNetwork) {
        // roadNetwork를 사용하여 경로 생성
        const path = roadNetwork.findPath(this.currentBlockId, this.destinationBlockId);

        if (path.length > 0) {
          // 경로의 첫 번째 요소는 현재 위치이므로 제거
          if (path[0] === this.currentBlockId) {
            path.shift();
          }
          this.setPath(path);
        } else {
          // 경로를 찾을 수 없으면 차량 제거
          this.destroy();
          return;
        }
      } else {
        console.error(`경로가 설정되지 않음: ${this.currentBlockId} -> ${this.destinationBlockId}`);
        return;
      }
    }

    // 다음 목적지가 없으면 설정
    if (!this.nextPoint && this.path.length > 0) {
      const currentBlock = blocks.get(this.currentBlockId);
      const nextBlockId = this.path[0];
      const nextBlock = blocks.get(nextBlockId);

      if (currentBlock && nextBlock) {
        // 현재 블록과 다음 블록 사이의 연결 찾기
        let connection: Connection | undefined;

        if (roadNetwork) {
          // roadNetwork가 제공된 경우 해당 메서드 사용
          connection = roadNetwork.getConnectionByBlocks(currentBlock.id, nextBlockId);
        } else {
          // roadNetwork가 없는 경우 connections에서 직접 찾기
          for (const conn of connections.values()) {
            if (conn.fromBlockId === currentBlock.id && conn.toBlockId === nextBlockId) {
              connection = conn;
              break;
            }
          }
        }

        if (connection) {
          this.setNextPoint(nextBlock.edge, currentBlock, nextBlock, connection);
        } else {
          // 연결을 찾을 수 없으면 다음 경로로 이동
          if (this.path.length > 0) {
            this.path.shift();
          }
        }
      } else {
        console.error(`블록을 찾을 수 없음: 현재=${this.currentBlockId}, 다음=${nextBlockId}`);
        // 블록을 찾을 수 없으면 다음 경로로 이동
        if (this.path.length > 0) {
          this.path.shift();
        }
      }
    }

    // 다음 목적지가 있으면 이동
    if (this.nextPoint) {
      // 속도 조절 (앞 차량과의 거리에 따라)
      this.adjustSpeed(vehicles);

      // 목적지 방향으로 이동
      this.moveTowardsTarget();

      // 목적지에 도착했는지 확인
      this.checkArrival(blocks);
    }
  }

  /**
   * 앞 차량과의 거리에 따라 속도 조절
   */
  adjustSpeed(vehicles: Vehicle[]) {
    let frontVehicles: Vehicle[] = [];

    // 진행 방향 앞에 있는 차량 찾기
    frontVehicles = vehicles.filter((v) => {
      if (v === this) return false;

      // 차량 간의 벡터 계산
      const dx = v.x - this.x;
      const dy = v.y - this.y;

      // 목적지까지의 벡터 계산
      const targetDx = this.nextPoint![0] - this.x;
      const targetDy = this.nextPoint![1] - this.y;

      // 두 벡터의 내적이 양수이면 진행 방향에 있는 것
      const dotProduct = dx * targetDx + dy * targetDy;

      // 같은 차선에 있는지 확인 (같은 차선에 있는 차량만 고려)
      const sameLane = v.laneNumber === this.laneNumber;

      // 거리가 가까우면서 진행 방향에 있고 같은 차선에 있는 차량 필터링
      return dotProduct > 0 && Math.sqrt(dx * dx + dy * dy) < 100 && sameLane;
    });

    if (frontVehicles.length) {
      // 가장 가까운 앞 차량 찾기
      let closestVehicle = frontVehicles[0];
      let minDistance = this.getDistance(this, closestVehicle);

      for (const vehicle of frontVehicles) {
        const distance = this.getDistance(this, vehicle);
        if (distance < minDistance) {
          minDistance = distance;
          closestVehicle = vehicle;
        }
      }

      // 거리에 따라 속도 조절
      if (minDistance < 30) {
        // 교차로에서 교착 상태 방지: 현재 움직이고 있는 차량은 계속 진행
        if (this.speed > 0) {
          this.speed = this.maxSpeed * 0.5; // 감속은 하되 멈추지 않음
        } else {
          this.speed = 0;
        }
      } else if (minDistance < 50) {
        this.speed = this.maxSpeed * 0.3;
      } else if (minDistance < 80) {
        this.speed = this.maxSpeed * 0.6;
      } else {
        this.speed = this.maxSpeed;
      }
    } else {
      this.speed = this.maxSpeed;
    }
  }

  /**
   * 두 차량 사이의 거리 계산
   * 이동 방향에 따라 거리 계산 방식이 다르게 적용
   * @param v1 자기 자신
   * @param v2 다른 차량
   */
  getDistance(v1: Vehicle, v2: Vehicle): number {
    return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
  }

  /**
   * 목적지를 향해 이동
   */
  moveTowardsTarget() {
    if (!this.nextPoint) return;

    // NaN 체크
    if (isNaN(this.nextPoint[0]) || isNaN(this.nextPoint[1])) {
      console.error('이동 오류 - nextPoint가 NaN입니다:', this.nextPoint);
      // 현재 위치를 기준으로 임의의 목적지 설정 (응급 조치)
      this.nextPoint = [this.x + 1, this.y];
      return;
    }

    const dx = this.nextPoint[0] - this.x;
    const dy = this.nextPoint[1] - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      // 정규화된 방향 벡터
      const dirX = dx / distance;
      const dirY = dy / distance;

      // 속도에 따른 이동
      const moveDistance = Math.min(this.speed, distance);
      this.x += dirX * moveDistance;
      this.y += dirY * moveDistance;

      // 이동 방향 각도 업데이트 - 수직 이동일 경우 특별 처리
      if (Math.abs(dx) < 0.001) {
        // 수직 이동 (위/아래)
        this.angle = dy > 0 ? Math.PI / 2 : -Math.PI / 2;
      } else if (Math.abs(dy) < 0.001) {
        // 수평 이동 (좌/우)
        this.angle = dx > 0 ? 0 : Math.PI;
      } else {
        // 일반적인 각도 계산
        this.angle = Math.atan2(dy, dx);
      }
    }
  }

  /**
   * 현재 목적지에 도착했는지 확인
   */
  checkArrival(blocks: Map<number, RoadBlock>) {
    if (!this.nextPoint) return;

    const reachedX = Math.abs(this.x - this.nextPoint[0]) < 2;
    const reachedY = Math.abs(this.y - this.nextPoint[1]) < 2;

    // 현재 지점에 도착했으면 다음 경로로 이동
    if (reachedX && reachedY) {
      // 현재 블록 ID 업데이트 (경로의 첫 번째 요소로)
      if (this.path.length > 0) {
        this.currentBlockId = this.path.shift()!;

        // 새로운 차선 할당 (교차로에서 차선 변경 가능)
        const currentBlock = blocks.get(this.currentBlockId);
        if (currentBlock) {
          // 기본적으로 2개의 차선 중에서 랜덤하게 선택
          this.laneNumber = Math.floor(Math.random() * 2);
        }

        // 다음 목적지 초기화 (다음 업데이트에서 새로 설정됨)
        this.nextPoint = null;
      } else {
        // 모든 경로를 이동했으면 목적지에 도착한 것
        console.log(`차량이 최종 목적지(${this.destinationBlockId})에 도착`);
        this.destroy();
      }
    }
  }

  /**
   * 차량 그리기
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // 차량 회전 (0도는 위쪽, 90도는 오른쪽)
    ctx.rotate(this.angle);

    // 차량 본체 그리기
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

    // 차량 앞쪽에 삼각형 그리기
    ctx.fillStyle = 'red';
    ctx.fillRect(this.width / 2, -this.height / 2, 5, this.height);

    // 차량 각도 표시
    ctx.font = '10px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(Math.round(Math.floor((this.angle * 180) / Math.PI)).toString(), 0, 0);

    ctx.restore();
  }

  destroy() {
    this.path = [];
    this.nextPoint = null;
    this.angle = 0;
    this.speed = 0;
    this.color = 'transparent';
  }
}

export { Vehicle };
