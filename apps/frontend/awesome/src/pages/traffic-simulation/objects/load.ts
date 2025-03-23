class LoadBlock {
  private lineWidth = 25;

  edge: [number, number];
  /** 차선의 개수 */
  line: number;
  /** 최고속도 */
  maxSpeed: number;
  /** 블록 ID (BFS에서 사용) */
  id: number;

  constructor({ edge, line, maxSpeed, id }: { edge: [number, number]; line: number; maxSpeed: number; id: number }) {
    this.edge = edge;
    this.line = line;
    this.maxSpeed = maxSpeed;
    this.id = id;
  }

  draw(ctx: CanvasRenderingContext2D, neighbors: [number, number][]) {
    ctx.beginPath();
    for (const neighbor of neighbors) {
      // 수평 도로인지 수직 도로인지 확인
      const isHorizontalRoad = this.edge[1] === neighbor[1];
      const isVerticalRoad = this.edge[0] === neighbor[0];

      if (isHorizontalRoad) {
        // 수평 도로 그리기
        for (let i = 0; i < this.line; i++) {
          const x = Math.min(this.edge[0], neighbor[0]) - this.lineWidth / 2;
          const y = this.edge[1] - this.lineWidth / 2 + i * this.lineWidth;
          const w = Math.abs(neighbor[0] - this.edge[0]) + this.lineWidth;
          const h = this.lineWidth;

          ctx.rect(x, y, w, h);
        }
      } else if (isVerticalRoad) {
        // 수직 도로 그리기
        for (let i = 0; i < this.line; i++) {
          const x = this.edge[0] - this.lineWidth / 2 + i * this.lineWidth;
          const y = Math.min(this.edge[1], neighbor[1]) - this.lineWidth / 2;
          const w = this.lineWidth;
          const h = Math.abs(neighbor[1] - this.edge[1]) + this.lineWidth;

          ctx.rect(x, y, w, h);
        }
      } else {
        // 대각선 도로 (필요한 경우 추가 구현)
        console.log('대각선 도로는 아직 지원하지 않습니다:', this.edge, neighbor);
      }
    }

    ctx.closePath();
    ctx.fillStyle = 'gray';

    ctx.fill();
  }
}

class Load {
  blocks: LoadBlock[];
  /** 블록 간의 연결 정보를 저장하는 인접 리스트 */
  private adjacencyList: Map<number, number[]>;

  constructor({ blocks }: { blocks: LoadBlock[] }) {
    this.blocks = blocks;
    this.adjacencyList = new Map();

    // 인접 리스트 초기화
    for (const block of blocks) {
      this.adjacencyList.set(block.id, []);
    }
  }

  /**
   * 두 블록 간의 연결 추가
   */
  addConnection(fromBlockId: number, toBlockId: number) {
    const connections = this.adjacencyList.get(fromBlockId) || [];
    if (!connections.includes(toBlockId)) {
      connections.push(toBlockId);
      this.adjacencyList.set(fromBlockId, connections);
    }
  }

  /**
   * BFS를 사용하여 특정 블록에서 도달 가능한 모든 이웃 노드 찾기
   */
  findNeighborsByBFS(startBlockId: number): [number, number][] {
    const visited = new Set<number>();
    const queue: number[] = [startBlockId];
    const neighbors: [number, number][] = [];

    visited.add(startBlockId);

    while (queue.length > 0) {
      const currentId = queue.shift()!;

      // 직접 연결된 이웃 노드 탐색
      const adjacentBlocks = this.adjacencyList.get(currentId) || [];

      for (const neighborId of adjacentBlocks) {
        if (!visited.has(neighborId)) {
          visited.add(neighborId);
          queue.push(neighborId);

          // 이웃 블록의 좌표 추가
          const neighborBlock = this.blocks.find((block) => block.id === neighborId);
          if (neighborBlock) {
            neighbors.push(neighborBlock.edge);
          }
        }
      }
    }

    return neighbors;
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const block of this.blocks) {
      const neighbors = this.findNeighborsByBFS(block.id);
      block.draw(ctx, neighbors);
    }
  }
}

export { Load, LoadBlock };
