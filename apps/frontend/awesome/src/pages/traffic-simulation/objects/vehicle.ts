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
    if (path.length > 0) {
      // 다음 블록 ID 설정
      this.nextPoint = null;
    }
  }

  /**
   * 다음 목적지 설정하기
   */
  setNextPoint(point: [number, number]) {
    this.nextPoint = point;
    
    // 이동 방향 각도 계산
    if (this.nextPoint) {
      const dx = this.nextPoint[0] - this.x;
      const dy = this.nextPoint[1] - this.y;
      this.angle = Math.atan2(dy, dx);
    }
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
        this.setNextPoint(nextBlock.edge);
      }
    }

    // 다음 목적지가 있으면 이동
    if (this.nextPoint) {
      // 속도 조절 (앞 차량과의 거리에 따라)
      this.adjustSpeed(vehicles);

      // 목적지 방향으로 이동
      this.moveTowardsTarget();

      // 목적지에 도착했는지 확인
      this.checkArrival();
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
      
      // 거리가 가까우면서 진행 방향에 있는 차량 필터링
      return dotProduct > 0 && Math.sqrt(dx * dx + dy * dy) < 100;
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
    return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
  }

  /**
   * 목적지를 향해 이동
   */
  moveTowardsTarget() {
    if (!this.nextPoint) return;
    
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
      
      // 이동 방향 각도 업데이트
      this.angle = Math.atan2(dy, dx);
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
    ctx.fillText(`${Math.round(this.angle * 180 / Math.PI)}° ${this.destinationBlockId}`, this.x, this.y);
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
