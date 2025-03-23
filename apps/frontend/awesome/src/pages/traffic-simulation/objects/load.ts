class LoadBlock {
  private lineWidth = 25;

  edge: [number, number];
  neighbors: [number, number][];
  line: number;
  maxSpeed: number;

  constructor({
    edge,
    neighbors,
    line,
    maxSpeed,
  }: {
    edge: [number, number];
    neighbors: [number, number][];
    line: number;
    maxSpeed: number;
  }) {
    this.edge = edge;
    this.neighbors = neighbors;
    this.line = line;
    this.maxSpeed = maxSpeed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    for (const neighbor of this.neighbors) {
      for (let i = 0; i < this.line; i++) {
        const x = this.edge[0] - this.lineWidth / 2;
        const y = this.edge[1] - this.lineWidth / 2 + i * this.lineWidth;
        const w = neighbor[0] - this.edge[0];
        const h = this.lineWidth;

        ctx.rect(x, y, w, h);
      }
    }

    ctx.closePath();
    ctx.fillStyle = 'gray';
    ctx.globalAlpha = 0.5;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

class Load {
  blocks: LoadBlock[];

  constructor({ blocks }: { blocks: LoadBlock[] }) {
    this.blocks = blocks;
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const block of this.blocks) {
      block.draw(ctx);
    }
  }
}

export { Load, LoadBlock };
