class RoadBlock {
  /** 도로 중심 좌표 */
  edge: [number, number];
  /** 도로의 차선 수 */
  line: number;
  /** 도로의 최대 속도 */
  maxSpeed: number;
  /** 블록 ID */
  id: number;

  constructor({
    edge,
    line,
    maxSpeed,
    id,
  }: {
    edge: [number, number];
    line: number;
    maxSpeed: number;
    id: number;
  }) {
    this.edge = edge;
    this.line = line;
    this.maxSpeed = maxSpeed;
    this.id = id;
  }

  /**
   * 도로 그리기
   */
  draw(ctx: CanvasRenderingContext2D, neighborBlocks: RoadBlock[]) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    for (const neighborBlock of neighborBlocks) {
      ctx.beginPath();
      ctx.moveTo(this.edge[0], this.edge[1]);
      ctx.lineTo(neighborBlock.edge[0], neighborBlock.edge[1]);
      ctx.stroke();
    }

    // 블록 ID 표시 (디버깅용)
    ctx.fillStyle = 'red';
    ctx.font = '12px Arial';
    ctx.fillText(
      String(this.id),
      this.edge[0] + 10,
      this.edge[1] - 10,
    );
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

    // BFS 탐색
    while (queue.length > 0) {
      const currentBlockId = queue.shift()!;

      // 목적지에 도달했으면 경로 재구성
      if (currentBlockId === destinationBlockId) {
        return this.reconstructPath(previous, startBlockId, destinationBlockId);
      }

      // 인접 블록 탐색
      const neighbors = this.adjacencyList[currentBlockId] || [];
      for (const neighborId of neighbors) {
        if (!visited.has(neighborId)) {
          visited.add(neighborId);
          previous[neighborId] = currentBlockId;
          queue.push(neighborId);
        }
      }
    }

    // 경로를 찾지 못한 경우 빈 배열 반환
    return [];
  }

  /**
   * BFS 결과를 바탕으로 경로 재구성
   */
  reconstructPath(previous: Record<number, number | null>, startBlockId: number, destinationBlockId: number): number[] {
    const path: number[] = [];
    let current = destinationBlockId;

    // 목적지에서 시작점까지 역추적
    while (current !== startBlockId) {
      path.unshift(current);
      current = previous[current]!;

      // 경로가 없는 경우 (오류 방지)
      if (current === null) {
        return [];
      }
    }

    // 시작점 추가
    path.unshift(startBlockId);

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
