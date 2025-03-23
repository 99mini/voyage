/**
 * 도로 관련 상수
 */
import { ROAD_WIDTH } from '../constants/road';

/**
 * 도로 블록 (정점)
 */
export class RoadBlock {
  /** 정점 위치 */
  edge: [number, number];
  /** 블록 ID */
  id: number;

  constructor({ 
    edge, 
    id
  }: { 
    edge: [number, number]; 
    id: number; 
  }) {
    this.edge = edge;
    this.id = id;
  }

  /**
   * 도로 블록 그리기
   */
  draw(ctx: CanvasRenderingContext2D) {
    const [x, y] = this.edge;
    
    // 도로 블록 그리기
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    
    // 블록 ID 표시
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.id.toString(), x, y - 15);
  }
}

/**
 * 도로 연결 (간선)
 */
export class Connection {
  /** 연결 ID */
  id: number;
  /** 시작 블록 ID */
  fromBlockId: number;
  /** 도착 블록 ID */
  toBlockId: number;
  /** 차선 수 */
  line: number;
  /** 진입 차선 수 */
  inLanes: number;
  /** 진출 차선 수 */
  outLanes: number;
  /** 최대 속도 */
  maxSpeed: number;

  /**
   * 생성자
   */
  constructor(id: number, fromBlockId: number, toBlockId: number, line: number, inLanes: number, outLanes: number, maxSpeed: number) {
    this.id = id;
    this.fromBlockId = fromBlockId;
    this.toBlockId = toBlockId;
    this.line = line;
    this.maxSpeed = maxSpeed;
    
    // 차선 수 검증
    if (inLanes + outLanes !== line) {
      console.error(`유효하지 않은 차선 구성: 진입(${inLanes}) + 진출(${outLanes}) != 총(${line})`);
      // 기본값으로 설정
      this.inLanes = Math.floor(line / 2);
      this.outLanes = line - this.inLanes;
    } else {
      this.inLanes = inLanes;
      this.outLanes = outLanes;
    }
  }

  /**
   * 차선 설정
   */
  setLanes(inLanes: number, outLanes: number) {
    if (inLanes + outLanes !== this.line) {
      console.error(`진입 차선(${inLanes})과 진출 차선(${outLanes})의 합이 전체 차선 수(${this.line})와 일치하지 않습니다.`);
      return;
    }
    this.inLanes = inLanes;
    this.outLanes = outLanes;
  }

  /**
   * 도로 연결 그리기
   */
  draw(ctx: CanvasRenderingContext2D, blocks: Map<number, RoadBlock>) {
    const fromBlock = blocks.get(this.fromBlockId);
    const toBlock = blocks.get(this.toBlockId);
    
    if (!fromBlock || !toBlock) {
      console.error(`블록이 존재하지 않습니다: ${this.fromBlockId} -> ${this.toBlockId}`);
      return;
    }
    
    const [x1, y1] = fromBlock.edge;
    const [x2, y2] = toBlock.edge;
    
    // 도로의 방향 벡터 계산
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // 정규화된 방향 벡터
    const dirX = dx / distance;
    const dirY = dy / distance;
    
    // 도로 방향에 수직인 벡터 (90도 회전)
    const perpX = -dirY;
    const perpY = dirX;
    
    // 도로 너비 계산
    const roadWidth = this.line * ROAD_WIDTH;
    
    // 도로의 양쪽 가장자리 계산
    const edge1X = x1 - perpX * roadWidth / 2;
    const edge1Y = y1 - perpY * roadWidth / 2;
    const edge2X = x1 + perpX * roadWidth / 2;
    const edge2Y = y1 + perpY * roadWidth / 2;
    const edge3X = x2 + perpX * roadWidth / 2;
    const edge3Y = y2 + perpY * roadWidth / 2;
    const edge4X = x2 - perpX * roadWidth / 2;
    const edge4Y = y2 - perpY * roadWidth / 2;
    
    // 도로 그리기 (회색 사각형)
    ctx.beginPath();
    ctx.moveTo(edge1X, edge1Y);
    ctx.lineTo(edge2X, edge2Y);
    ctx.lineTo(edge3X, edge3Y);
    ctx.lineTo(edge4X, edge4Y);
    ctx.closePath();
    ctx.fillStyle = '#888888';
    ctx.fill();
    
    // 차선 구분선 그리기
    const laneWidth = roadWidth / this.line;
    
    for (let i = 1; i < this.line; i++) {
      const offset = -roadWidth / 2 + i * laneWidth;
      const startX = x1 + perpX * offset;
      const startY = y1 + perpY * offset;
      const endX = x2 + perpX * offset;
      const endY = y2 + perpY * offset;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      
      // 진입 차선과 진출 차선 경계는 노란색 실선, 나머지는 흰색 점선
      if (i === this.inLanes) {
        ctx.strokeStyle = 'yellow';
        ctx.setLineDash([]);
      } else {
        ctx.strokeStyle = 'white';
        ctx.setLineDash([5, 5]);
      }
      
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    // 도로 ID 표시
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    const offsetX = perpX * (roadWidth / 2 + 10);
    const offsetY = perpY * (roadWidth / 2 + 10);
    
    ctx.font = '12px Arial';
    ctx.fillStyle = 'blue';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`도로 ${this.id}`, centerX + offsetX, centerY + offsetY);
  }
}

/**
 * 도로 네트워크 (그래프)
 */
export class RoadNetwork {
  // 블록 맵 (정점)
  blocks: Map<number, RoadBlock>;
  // 연결 맵 (간선)
  connections: Map<number, Connection>;
  // 인접 리스트
  adjacencyList: Map<number, number[]>;

  constructor() {
    this.blocks = new Map();
    this.connections = new Map();
    this.adjacencyList = new Map();
  }

  /**
   * 블록 추가
   */
  addBlock(block: RoadBlock) {
    this.blocks.set(block.id, block);
    if (!this.adjacencyList.has(block.id)) {
      this.adjacencyList.set(block.id, []);
    }
  }

  /**
   * 연결 추가
   */
  addConnection(connection: Connection) {
    this.connections.set(connection.id, connection);
    
    // 인접 리스트 업데이트
    const fromBlockId = connection.fromBlockId;
    const toBlockId = connection.toBlockId;
    
    // 인접 리스트에 없으면 추가
    if (!this.adjacencyList.has(fromBlockId)) {
      this.adjacencyList.set(fromBlockId, []);
    }
    if (!this.adjacencyList.has(toBlockId)) {
      this.adjacencyList.set(toBlockId, []);
    }
    
    // 인접 리스트에 연결 추가
    const fromAdjList = this.adjacencyList.get(fromBlockId);
    if (fromAdjList && !fromAdjList.includes(toBlockId)) {
      fromAdjList.push(toBlockId);
    }
  }

  /**
   * ID로 블록 가져오기
   */
  getBlockById(id: number): RoadBlock | undefined {
    return this.blocks.get(id);
  }

  /**
   * ID로 연결 가져오기
   */
  getConnectionById(id: number): Connection | undefined {
    return this.connections.get(id);
  }

  /**
   * 블록 ID로 연결 가져오기
   */
  getConnectionByBlocks(fromBlockId: number, toBlockId: number): Connection | undefined {
    for (const connection of this.connections.values()) {
      if (connection.fromBlockId === fromBlockId && connection.toBlockId === toBlockId) {
        return connection;
      }
    }
    return undefined;
  }

  /**
   * 경로 찾기 (BFS)
   */
  findPath(startId: number, endId: number): number[] {
    // 시작점과 목적지가 같으면 바로 반환
    if (startId === endId) {
      return [startId];
    }

    // 방문 여부 및 이전 노드 저장
    const visited = new Set<number>();
    const prev = new Map<number, number>();
    
    // BFS 큐
    const queue: number[] = [startId];
    visited.add(startId);
    
    // BFS 탐색
    while (queue.length > 0) {
      const current = queue.shift()!;
      
      // 목적지에 도달했으면 경로 구성
      if (current === endId) {
        // 경로 구성
        const path: number[] = [current];
        let node = current;
        
        while (prev.has(node)) {
          node = prev.get(node)!;
          path.unshift(node);
        }
        
        return path;
      }
      
      // 인접 노드 탐색
      const neighbors = this.adjacencyList.get(current) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          prev.set(neighbor, current);
          queue.push(neighbor);
        }
      }
    }
    
    // 경로를 찾지 못했으면 빈 배열 반환
    return [];
  }

  /**
   * 도로 네트워크 그리기
   */
  draw(ctx: CanvasRenderingContext2D) {
    // 모든 연결 그리기
    for (const connection of this.connections.values()) {
      connection.draw(ctx, this.blocks);
    }
    
    // 모든 블록 그리기
    for (const block of this.blocks.values()) {
      block.draw(ctx);
    }
  }
}
