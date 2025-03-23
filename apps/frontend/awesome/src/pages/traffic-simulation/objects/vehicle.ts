import { LoadBlock } from './load';

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
  /** 현재 이동 방향 (수평 또는 수직) */
  direction: 'horizontal' | 'vertical' = 'horizontal';
  /** 다음 블록의 좌표 */
  nextPoint: [number, number] | null = null;

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
  }

  /**
   * 경로 설정하기
   */
  setPath(path: number[]) {
    this.path = path;
    if (path.length > 1) {
      // 다음 블록 ID 설정
      this.nextPoint = null;
    }
  }

  /**
   * 다음 목적지 설정하기
   */
  setNextPoint(point: [number, number]) {
    this.nextPoint = point;

    // 이동 방향 설정 (수평 또는 수직)
    if (this.y === point[1]) {
      this.direction = 'horizontal';
    } else {
      this.direction = 'vertical';
    }
  }

  /**
   * 차량 업데이트
   */
  update(vehicles: Vehicle[], blocks: LoadBlock[]) {
    // 경로가 없으면 업데이트 중단
    if (this.path.length === 0) return;

    // 다음 목적지가 없으면 설정
    if (!this.nextPoint && this.path.length > 0) {
      const nextBlockId = this.path[0];
      const nextBlock = blocks.find((block) => block.id === nextBlockId);
      if (nextBlock) {
        this.setNextPoint(nextBlock.edge);
      }
    }

    // 다음 목적지가 있으면 이동
    if (this.nextPoint) {
      // 속도 조절 (앞 차량과의 거리에 따라)
      this.adjustSpeed(vehicles);

      // 이동 방향에 따라 이동
      if (this.direction === 'horizontal') {
        this.moveHorizontal();
      } else {
        this.moveVertical();
      }

      // 목적지에 도착했는지 확인
      this.checkArrival();
    }
  }

  /**
   * 앞 차량과의 거리에 따라 속도 조절
   */
  adjustSpeed(vehicles: Vehicle[]) {
    let frontVehicles;

    // 이동 방향에 따라 앞 차량 필터링
    if (this.direction === 'horizontal') {
      // 수평 이동 시 같은 y축에 있고 진행 방향에 있는 차량 찾기
      const isMovingRight = this.nextPoint![0] > this.x;
      frontVehicles = vehicles.filter(
        (v) => v !== this && Math.abs(v.y - this.y) < 10 && (isMovingRight ? v.x > this.x : v.x < this.x),
      );
    } else {
      // 수직 이동 시 같은 x축에 있고 진행 방향에 있는 차량 찾기
      const isMovingDown = this.nextPoint![1] > this.y;
      frontVehicles = vehicles.filter(
        (v) => v !== this && Math.abs(v.x - this.x) < 10 && (isMovingDown ? v.y > this.y : v.y < this.y),
      );
    }

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
        this.speed = 0;
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
   */
  getDistance(v1: Vehicle, v2: Vehicle): number {
    return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
  }

  /**
   * 수평 방향으로 이동
   */
  moveHorizontal() {
    const targetX = this.nextPoint![0];
    // 목표 지점보다 오른쪽에 있으면 왼쪽으로 이동
    if (this.x > targetX) {
      this.x = Math.max(this.x - this.speed, targetX);
    }
    // 목표 지점보다 왼쪽에 있으면 오른쪽으로 이동
    else if (this.x < targetX) {
      this.x = Math.min(this.x + this.speed, targetX);
    }
  }

  /**
   * 수직 방향으로 이동
   */
  moveVertical() {
    const targetY = this.nextPoint![1];
    // 목표 지점보다 아래에 있으면 위로 이동
    if (this.y > targetY) {
      this.y = Math.max(this.y - this.speed, targetY);
    }
    // 목표 지점보다 위에 있으면 아래로 이동
    else if (this.y < targetY) {
      this.y = Math.min(this.y + this.speed, targetY);
    }
  }

  /**
   * 현재 목적지에 도착했는지 확인
   */
  checkArrival() {
    if (!this.nextPoint) return;

    const reachedX = Math.abs(this.x - this.nextPoint[0]) < 2;
    const reachedY = Math.abs(this.y - this.nextPoint[1]) < 2;

    // 현재 지점에 도착했으면 다음 경로로 이동
    if (reachedX && reachedY) {
      // 현재 블록 ID 업데이트
      if (this.path.length > 0) {
        this.currentBlockId = this.path.shift()!;
      }

      // 다음 목적지 설정
      this.nextPoint = null;

      // 목적지에 도착했는지 확인
      if (this.currentBlockId === this.destinationBlockId) {
        // 목적지 도착 시 경로 비우기
        this.path = [];
      }
    }
  }

  /**
   * 차량 그리기
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;

    // 이동 방향에 따라 차량 모양 변경
    if (this.direction === 'horizontal') {
      ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    } else {
      // 수직 이동 시 차량 모양 회전 (가로와 세로 크기 바꿈)
      ctx.fillRect(this.x - this.height / 2, this.y - this.width / 2, this.height, this.width);
    }
  }

  destroy() {
    this.path = [];
    this.nextPoint = null;
    this.direction = 'horizontal';
    this.speed = 0;
    this.color = 'transparent';
  }
}

export { Vehicle };
