import road from '../constants/road';

class RoadBlock {
  /** 도로 중심 좌표 */
  edge: [number, number];
  /** 도로의 차선 수 */
  line: number;
  /** 도로의 최대 속도 */
  maxSpeed: number;
  /** 블록 ID */
  id: number;

  constructor({ edge, line, maxSpeed, id }: { edge: [number, number]; line: number; maxSpeed: number; id: number }) {
    this.edge = edge;
    this.line = line;
    this.maxSpeed = maxSpeed;
    this.id = id;
  }

  /**
   * 도로 그리기
   */
  draw(ctx: CanvasRenderingContext2D, neighborBlocks: RoadBlock[]) {
    // 각 이웃 블록에 대한 연결 그리기
    for (const neighborBlock of neighborBlocks) {
      // 도로의 시작점과 끝점
      const startX = this.edge[0];
      const startY = this.edge[1];
      const endX = neighborBlock.edge[0];
      const endY = neighborBlock.edge[1];

      // 도로의 방향 벡터
      const dx = endX - startX;
      const dy = endY - startY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 정규화된 방향 벡터
      const dirX = dx / distance;
      const dirY = dy / distance;

      // 도로 방향에 수직인 벡터 (90도 회전)
      const perpX = -dirY;
      const perpY = dirX;

      // 도로 너비 (차선 수에 따라 조정)
      const roadWidth = this.line * road.ROAD_WIDTH;

      // 도로 그리기 (회색 배경)
      ctx.fillStyle = '#888888';
      ctx.beginPath();

      // 도로의 네 꼭지점 계산
      const x1 = startX + (perpX * roadWidth) / 2;
      const y1 = startY + (perpY * roadWidth) / 2;
      const x2 = startX - (perpX * roadWidth) / 2;
      const y2 = startY - (perpY * roadWidth) / 2;
      const x3 = endX - (perpX * roadWidth) / 2;
      const y3 = endY - (perpY * roadWidth) / 2;
      const x4 = endX + (perpX * roadWidth) / 2;
      const y4 = endY + (perpY * roadWidth) / 2;

      // 도로 사각형 그리기
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.lineTo(x4, y4);
      ctx.closePath();
      ctx.fill();

      // 도로 테두리
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 차선 그리기
      if (this.line > 1) {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 10]); // 점선으로 차선 표시

        for (let i = 1; i < this.line; i++) {
          // 차선 위치 계산 (도로 너비를 차선 수로 나눔)
          const laneOffset = (roadWidth / this.line) * i - roadWidth / 2;

          ctx.beginPath();
          ctx.moveTo(startX + perpX * laneOffset, startY + perpY * laneOffset);
          ctx.lineTo(endX + perpX * laneOffset, endY + perpY * laneOffset);
          ctx.stroke();
        }

        // 점선 설정 초기화
        ctx.setLineDash([]);
      }
    }

    // 블록 ID 표시 (디버깅용)
    ctx.fillStyle = 'red';
    ctx.font = '12px Arial';
    ctx.fillText(String(this.id), this.edge[0] + 10, this.edge[1] - 10);
  }
}

class Road {
  /** 도로 블록 목록 */
  blocks: RoadBlock[];
  /** 블록 간의 연결 정보 (인접 리스트) */
  adjacencyList: Record<number, number[]>;

  constructor({ blocks }: { blocks: RoadBlock[] }) {
    this.blocks = blocks;
    this.adjacencyList = {};

    // 인접 리스트 초기화
    for (const block of blocks) {
      this.adjacencyList[block.id] = [];
    }
  }

  /**
   * 블록 간의 연결 추가
   */
  addConnection(fromBlockId: number, toBlockId: number) {
    if (!this.adjacencyList[fromBlockId]) {
      this.adjacencyList[fromBlockId] = [];
    }
    this.adjacencyList[fromBlockId].push(toBlockId);

    if (!this.adjacencyList[toBlockId]) {
      this.adjacencyList[toBlockId] = [];
    }
    this.adjacencyList[toBlockId].push(fromBlockId);
  }

  /**
   * 블록 ID로 블록 찾기
   */
  getBlockById(id: number): RoadBlock | undefined {
    return this.blocks.find((block) => block.id === id);
  }

  /**
   * BFS를 사용하여 시작 블록에서 목적지 블록까지의 경로 찾기
   */
  findPath(startBlockId: number, destinationBlockId: number): number[] {
    // 방문한 블록 기록
    const visited = new Set<number>();
    // 이전 블록 기록 (경로 재구성용)
    const previous: Record<number, number | null> = {};
    // 탐색할 블록 큐
    const queue: number[] = [];

    // 시작 블록 설정
    queue.push(startBlockId);
    visited.add(startBlockId);
    previous[startBlockId] = null;

    console.log(`경로 탐색 시작: ${startBlockId} -> ${destinationBlockId}`);
    console.log(`인접 리스트:`, this.adjacencyList);

    // BFS 탐색
    while (queue.length > 0) {
      const currentBlockId = queue.shift()!;
      console.log(`현재 블록: ${currentBlockId}, 큐:`, queue);

      // 목적지에 도달했으면 경로 재구성
      if (currentBlockId === destinationBlockId) {
        const path = this.reconstructPath(previous, startBlockId, destinationBlockId);
        console.log(`경로 찾음:`, path);
        return path;
      }

      // 인접 블록 탐색
      const neighbors = this.adjacencyList[currentBlockId] || [];
      console.log(`블록 ${currentBlockId}의 이웃:`, neighbors);

      for (const neighborId of neighbors) {
        if (!visited.has(neighborId)) {
          console.log(`이웃 ${neighborId} 방문 (이전: ${currentBlockId})`);
          visited.add(neighborId);
          previous[neighborId] = currentBlockId;
          queue.push(neighborId);
        }
      }
    }

    console.log(`경로를 찾지 못함: ${startBlockId} -> ${destinationBlockId}`);
    // 경로를 찾지 못한 경우 빈 배열 반환
    return [];
  }

  /**
   * BFS 결과를 바탕으로 경로 재구성
   */
  reconstructPath(previous: Record<number, number | null>, startBlockId: number, destinationBlockId: number): number[] {
    const path: number[] = [];
    let current = destinationBlockId;

    console.log(`경로 재구성: ${startBlockId} -> ${destinationBlockId}, 이전 블록:`, previous);

    // 목적지에서 시작점까지 역추적
    while (current !== startBlockId) {
      path.unshift(current);
      current = previous[current]!;
      console.log(`경로에 추가: ${current}, 현재 경로:`, path);

      // 경로가 없는 경우 (오류 방지)
      if (current === null || current === undefined) {
        console.error(`경로 재구성 실패: 이전 블록이 null 또는 undefined`);
        return [];
      }
    }

    // 시작점 추가
    path.unshift(startBlockId);
    console.log(`최종 경로:`, path);

    return path;
  }

  /**
   * 도로 그리기
   */
  draw(ctx: CanvasRenderingContext2D) {
    for (const block of this.blocks) {
      const neighborIdList = this.adjacencyList[block.id] || [];
      const neighborBlocks = this.blocks.filter((block) => neighborIdList.includes(block.id));
      block.draw(ctx, neighborBlocks);
    }
  }
}

export { Road, RoadBlock };
