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
  /** 현재 이동 방향 (수평, 수직, 대각선) */
  direction: 'horizontal' | 'vertical' | 'diagonal-right' | 'diagonal-left' = 'horizontal';
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
  setNextPoint(point: [number, number], roadType: 'horizontal' | 'vertical' | 'diagonal-right' | 'diagonal-left') {
    this.nextPoint = point;

    // 이동 방향 설정 (도로 타입에 따라)
    this.direction = roadType;
  }

  /**
   * 차량 업데이트
   */
  update(vehicles: Vehicle[], blocks: RoadBlock[]) {
    // 경로가 없으면 업데이트 중단
    if (this.path.length === 0) return;

    // 다음 목적지가 없으면 설정
    if (!this.nextPoint && this.path.length > 0) {
      const nextBlockId = this.path[0];
      const nextBlock = blocks.find((block) => block.id === nextBlockId);
      if (nextBlock) {
        this.setNextPoint(nextBlock.edge, nextBlock.roadType);
      }
    }

    // 다음 목적지가 있으면 이동
    if (this.nextPoint) {
      // 속도 조절 (앞 차량과의 거리에 따라)
      this.adjustSpeed(vehicles);

      // 이동 방향에 따라 이동
      switch (this.direction) {
        case 'horizontal':
          this.moveHorizontal();
          break;
        case 'vertical':
          this.moveVertical();
          break;
        case 'diagonal-right':
          this.moveDiagonalRight();
          break;
        case 'diagonal-left':
          this.moveDiagonalLeft();
          break;
      }

      // 목적지에 도착했는지 확인
      this.checkArrival();
    }
  }

  /**
   * 앞 차량과의 거리에 따라 속도 조절
   */
  adjustSpeed(vehicles: Vehicle[]) {
    let frontVehicles: Vehicle[] = [];
    let isMovingRight: boolean;
    let isMovingDown: boolean;

    // 이동 방향에 따라 앞 차량 필터링
    switch (this.direction) {
      case 'horizontal':
        // 수평 이동 시 같은 y축에 있고 진행 방향에 있는 차량 찾기
        isMovingRight = this.nextPoint![0] > this.x;
        frontVehicles = vehicles.filter(
          (v) => v !== this && Math.abs(v.y - this.y) < 10 && (isMovingRight ? v.x > this.x : v.x < this.x),
        );
        break;
      case 'vertical':
        // 수직 이동 시 같은 x축에 있고 진행 방향에 있는 차량 찾기
        isMovingDown = this.nextPoint![1] > this.y;
        frontVehicles = vehicles.filter(
          (v) => v !== this && Math.abs(v.x - this.x) < 10 && (isMovingDown ? v.y > this.y : v.y < this.y),
        );
        break;
      case 'diagonal-right':
      case 'diagonal-left':
        // 대각선 이동 시 진행 방향에 있는 차량 찾기
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

          // 거리가 가까우면서 진행 방향에 있는 차량 필터링
          return dotProduct > 0 && Math.sqrt(dx * dx + dy * dy) < 100;
        });
        break;
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
   * 이동 방향에 따라 거리 계산 방식이 다르게 적용
   * @param v1 자기 자신
   * @param v2 다른 차량
   */
  getDistance(v1: Vehicle, v2: Vehicle): number {
    if (this.direction === 'horizontal') {
      return Math.abs(v1.x - v2.x);
    }
    if (this.direction === 'vertical') {
      return Math.abs(v1.y - v2.y);
    }

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
   * 대각선 방향으로 이동 (왼쪽 위에서 오른쪽 아래로)
   */
  moveDiagonalRight() {
    const targetX = this.nextPoint![0];
    const targetY = this.nextPoint![1];

    // 이동 벡터 계산
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      // 정규화된 방향 벡터
      const dirX = dx / distance;
      const dirY = dy / distance;

      // 속도에 따른 이동
      const moveDistance = Math.min(this.speed, distance);
      this.x += dirX * moveDistance;
      this.y += dirY * moveDistance;
    }
  }

  /**
   * 대각선 방향으로 이동 (오른쪽 위에서 왼쪽 아래로)
   */
  moveDiagonalLeft() {
    const targetX = this.nextPoint![0];
    const targetY = this.nextPoint![1];

    // 이동 벡터 계산
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      // 정규화된 방향 벡터
      const dirX = dx / distance;
      const dirY = dy / distance;

      // 속도에 따른 이동
      const moveDistance = Math.min(this.speed, distance);
      this.x += dirX * moveDistance;
      this.y += dirY * moveDistance;
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
    let angle: number;

    // 이동 방향에 따라 차량 모양 변경
    switch (this.direction) {
      case 'horizontal':
        // 수평 이동 시 가로로 긴 직사각형
        ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        break;
      case 'vertical':
        // 수직 이동 시 세로로 긴 직사각형
        ctx.fillRect(this.x - this.height / 2, this.y - this.width / 2, this.height, this.width);
        break;
      case 'diagonal-right':
      case 'diagonal-left':
        // 대각선 이동 시 회전된 직사각형
        ctx.save();
        ctx.translate(this.x, this.y);

        // 대각선 각도 계산 (45도 또는 -45도)
        angle = this.direction === 'diagonal-right' ? Math.PI / 4 : -Math.PI / 4;
        ctx.rotate(angle);

        // 회전된 좌표계에서 직사각형 그리기
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
        break;
    }

    // 디버깅용 방향 표시과 목적지 표시
    ctx.fillStyle = 'red';
    ctx.font = '10px Arial';
    ctx.fillText(`${this.direction} ${this.destinationBlockId}`, this.x, this.y);
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
