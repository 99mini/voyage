import road from '../constants/road';
import { RoadBlock } from './road';

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
  setNextPoint(point: [number, number], currentBlock: RoadBlock, nextBlock: RoadBlock) {
    // 기본 다음 지점
    const baseNextPoint: [number, number] = [point[0], point[1]];

    // 도로의 방향 벡터 계산
    const dx = nextBlock.edge[0] - currentBlock.edge[0];
    const dy = nextBlock.edge[1] - currentBlock.edge[1];
    const distance = Math.sqrt(dx * dx + dy * dy);

    // 정규화된 방향 벡터 (0으로 나누는 것 방지)
    let dirX = 0;
    let dirY = 0;
    
    if (distance > 0.001) {
      dirX = dx / distance;
      dirY = dy / distance;
    } else {
      // 거리가 너무 작으면 기본값 설정
      console.warn('블록 간 거리가 너무 가까움:', currentBlock.id, nextBlock.id);
      if (Math.abs(dx) > Math.abs(dy)) {
        dirX = dx >= 0 ? 1 : -1;
        dirY = 0;
      } else {
        dirX = 0;
        dirY = dy >= 0 ? 1 : -1;
      }
    }

    // 도로 방향에 수직인 벡터 (90도 회전)
    const perpX = -dirY;
    const perpY = dirX;

    // 도로 너비 계산
    const roadWidth = nextBlock.line * road.ROAD_WIDTH;

    // 차선 위치 계산 (도로 중앙에서 차선 위치로 오프셋)
    // 차선 번호가 현재 블록의 차선 수보다 크면 조정
    const effectiveLaneNumber = Math.min(this.laneNumber, nextBlock.line - 1);

    // 차선 위치 계산 (도로 너비를 차선 수로 나눔)
    // 차선의 중앙에 차량이 위치하도록 계산
    // 차선 너비의 절반을 더해 차선의 중앙에 위치하도록 함
    const laneWidth = roadWidth / nextBlock.line;
    const laneCenter = laneWidth * effectiveLaneNumber + laneWidth / 2;
    const laneOffset = laneCenter - roadWidth / 2;

    // 차선 위치에 맞게 다음 지점 조정
    baseNextPoint[0] += perpX * laneOffset;
    baseNextPoint[1] += perpY * laneOffset;

    // NaN 체크 및 수정
    if (isNaN(baseNextPoint[0]) || isNaN(baseNextPoint[1])) {
      console.error('nextPoint 계산 오류 - NaN 발생:', {
        현재블록: currentBlock.id,
        다음블록: nextBlock.id,
        방향벡터: [dirX, dirY],
        수직벡터: [perpX, perpY],
        차선오프셋: laneOffset
      });
      
      // 오류 발생 시 원래 목적지 사용
      baseNextPoint[0] = point[0];
      baseNextPoint[1] = point[1];
    }

    this.nextPoint = baseNextPoint;

    // 이동 방향 각도 계산 - 수직 이동일 경우 특별 처리
    const targetDx = this.nextPoint[0] - this.x;
    const targetDy = this.nextPoint[1] - this.y;
    
    if (Math.abs(targetDx) < 0.001) {
      // 수직 이동 (위/아래)
      this.angle = targetDy > 0 ? Math.PI / 2 : -Math.PI / 2;
    } else if (Math.abs(targetDy) < 0.001) {
      // 수평 이동 (좌/우)
      this.angle = targetDx > 0 ? 0 : Math.PI;
    } else {
      // 일반적인 각도 계산
      this.angle = Math.atan2(targetDy, targetDx);
    }

    console.log(`차량 ${this.currentBlockId} -> ${nextBlock.id} 이동 설정:`, {
      시작점: [this.x, this.y],
      목적지: this.nextPoint,
      각도: Math.round((this.angle * 180) / Math.PI),
      차선: this.laneNumber,
      차선중앙위치: laneCenter,
      차선오프셋: laneOffset,
    });
  }

  /**
   * 차량 업데이트
   */
  update(vehicles: Vehicle[], blocks: RoadBlock[]) {
    // 경로가 없으면 업데이트 중단
    if (this.path.length === 0) return;

    // 다음 목적지가 없으면 설정
    if (!this.nextPoint && this.path.length > 0) {
      // 현재 블록과 다음 블록 가져오기
      const currentBlock = blocks.find((block) => block.id === this.currentBlockId);

      // 다음 블록은 경로의 첫 번째 요소
      const nextBlockId = this.path[0];
      const nextBlock = blocks.find((block) => block.id === nextBlockId);

      if (currentBlock && nextBlock) {
        // 다음 목적지 설정
        this.setNextPoint(nextBlock.edge, currentBlock, nextBlock);
      } else {
        console.error(`블록을 찾을 수 없음: 현재=${this.currentBlockId}, 다음=${nextBlockId}`);
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
  checkArrival(blocks: RoadBlock[]) {
    if (!this.nextPoint) return;

    const reachedX = Math.abs(this.x - this.nextPoint[0]) < 2;
    const reachedY = Math.abs(this.y - this.nextPoint[1]) < 2;

    // 현재 지점에 도착했으면 다음 경로로 이동
    if (reachedX && reachedY) {
      console.log(`차량이 블록 ${this.currentBlockId}의 목적지에 도착, 다음 경로 처리`);

      // 현재 블록 ID 업데이트 (경로의 첫 번째 요소로)
      if (this.path.length > 0) {
        this.currentBlockId = this.path.shift()!;
        console.log(`차량이 블록 ${this.currentBlockId}로 이동, 남은 경로:`, this.path);

        // 새로운 차선 할당 (교차로에서 차선 변경 가능)
        const currentBlock = blocks.find((block) => block.id === this.currentBlockId);
        if (currentBlock && currentBlock.line > 1) {
          this.laneNumber = Math.floor(Math.random() * currentBlock.line);
          console.log(`차량 차선 변경: ${this.laneNumber}`);
        }
      }

      // 다음 목적지 설정 초기화
      this.nextPoint = null;

      // 목적지에 도착했는지 확인
      if (this.currentBlockId === this.destinationBlockId) {
        // 목적지 도착 시 경로 비우기
        console.log(`차량이 최종 목적지 ${this.destinationBlockId}에 도착`);
        this.path = [];
      }
      // 다음 경로가 있으면 다음 목적지 설정은 update에서 처리됨
    }
  }

  /**
   * 차량 그리기
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    // 차량 그리기
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

    // 전면 표시 (차량 앞부분을 표시)
    ctx.fillStyle = 'red';
    ctx.fillRect(this.width / 2 - 3, -this.height / 2, 3, this.height);

    ctx.restore();

    // 디버깅용 방향 표시와 목적지 표시
    ctx.fillStyle = 'red';
    ctx.font = '10px Arial';
    ctx.fillText(`${Math.round((this.angle * 180) / Math.PI)}° L${this.laneNumber}`, this.x, this.y);
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
