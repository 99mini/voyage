class Load {
  edge: [number, number];
  path: [number, number][];
  maxSpeed: number;

  constructor(edge: [number, number], path: [number, number][], maxSpeed: number) {
    this.edge = edge;
    this.path = path;
    this.maxSpeed = maxSpeed;
  }
}

export { Load };
