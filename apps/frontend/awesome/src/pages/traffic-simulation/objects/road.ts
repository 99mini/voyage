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
  /** 진입 차선 수 */
  inLanes: number;
  /** 진출 차선 수 */
  outLanes: number;

  constructor({ 
    edge, 
    line, 
    maxSpeed, 
    id, 
    inLanes, 
    outLanes 
  }: { 
    edge: [number, number]; 
    line: number; 
    maxSpeed: number; 
    id: number; 
    inLanes?: number; 
    outLanes?: number; 
  }) {
    this.edge = edge;
    this.line = line;
    this.maxSpeed = maxSpeed;
    this.id = id;
    
    // inLanes와 outLanes가 제공되면 사용하고, 그렇지 않으면 기본값 계산
    if (inLanes !== undefined && outLanes !== undefined) {
      // 진입 차선과 진출 차선의 합이 전체 차선 수와 같아야 함
      if (inLanes + outLanes !== line) {
        console.error(`진입 차선(${inLanes})과 진출 차선(${outLanes})의 합이 전체 차선 수(${line})와 일치하지 않습니다. 기본값 사용.`);
        this.inLanes = Math.ceil(line / 2);
        this.outLanes = Math.floor(line / 2);
      } else {
        this.inLanes = inLanes;
        this.outLanes = outLanes;
      }
    } else {
      // 기본적으로 차선 수를 반으로 나눔 (홀수일 경우 진입 차선이 하나 더 많음)
      this.inLanes = Math.ceil(line / 2);
      this.outLanes = Math.floor(line / 2);
    }
  }

  /**
   * 진입 차선과 진출 차선 수를 설정
   * @param inLanes 진입 차선 수
   * @param outLanes 진출 차선 수
   */
  setLanes(inLanes: number, outLanes: number) {
    // 진입 차선과 진출 차선의 합이 전체 차선 수와 같아야 함
    if (inLanes + outLanes !== this.line) {
      console.error(`진입 차선(${inLanes})과 진출 차선(${outLanes})의 합이 전체 차선 수(${this.line})와 일치하지 않습니다.`);
      return;
    }
    
    this.inLanes = inLanes;
    this.outLanes = outLanes;
  }

  /**
   * 도로 블록 그리기
   */
  draw(ctx: CanvasRenderingContext2D, neighborBlocks: RoadBlock[]) {
    // 이웃 블록과의 연결선 그리기
    for (const neighborBlock of neighborBlocks) {
      // 도로의 방향 벡터 계산
      const dx = neighborBlock.edge[0] - this.edge[0];
      const dy = neighborBlock.edge[1] - this.edge[1];
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
      ctx.moveTo(
        this.edge[0] - perpX * roadWidth / 2,
        this.edge[1] - perpY * roadWidth / 2
      );
      ctx.lineTo(
        this.edge[0] + perpX * roadWidth / 2,
        this.edge[1] + perpY * roadWidth / 2
      );
      ctx.lineTo(
        neighborBlock.edge[0] + perpX * roadWidth / 2,
        neighborBlock.edge[1] + perpY * roadWidth / 2
      );
      ctx.lineTo(
        neighborBlock.edge[0] - perpX * roadWidth / 2,
        neighborBlock.edge[1] - perpY * roadWidth / 2
      );
      ctx.closePath();
      ctx.fill();

      // 도로 테두리 그리기
      ctx.strokeStyle = '#444444';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 차선 경계선 그리기 (흰색 점선)
      if (this.line > 1) {
        ctx.strokeStyle = '#ffffff';
        ctx.setLineDash([10, 10]); // 점선 설정
        
        // 각 차선 경계선 그리기
        for (let i = 1; i < this.line; i++) {
          const lanePosition = (i * roadWidth) / this.line - roadWidth / 2;
          
          // 진입/진출 차선 경계에 실선 그리기
          if (i === this.inLanes) {
            ctx.setLineDash([]); // 실선
            ctx.lineWidth = 2; // 두껍게
            ctx.strokeStyle = '#ff0'; // 노란색
          } else {
            ctx.setLineDash([10, 10]); // 점선
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#fff'; // 흰색
          }
          
          ctx.beginPath();
          ctx.moveTo(
            this.edge[0] + perpX * lanePosition,
            this.edge[1] + perpY * lanePosition
          );
          ctx.lineTo(
            neighborBlock.edge[0] + perpX * lanePosition,
            neighborBlock.edge[1] + perpY * lanePosition
          );
          ctx.stroke();
        }
        
        // 선 스타일 초기화
        ctx.setLineDash([]);
      }
    }

    // 도로 블록 표시 (교차로)
    ctx.fillStyle = '#666666';
    ctx.beginPath();
    ctx.arc(this.edge[0], this.edge[1], 5, 0, Math.PI * 2);
    ctx.fill();

    // 블록 ID 표시 (디버깅용)
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${this.id}`, this.edge[0], this.edge[1] + 4);
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
