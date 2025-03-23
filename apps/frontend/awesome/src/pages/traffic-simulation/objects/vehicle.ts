class Vehicle {
  x: number;
  y: number;
  width = 40;
  height = 20;
  speed = 2;
  color = 'blue';

  constructor({ x, y, speed }: { x: number; y: number; speed: number }) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  update(vehicles: Vehicle[]) {
    const frontVehicle = vehicles.filter((v) => v !== this && v.y === this.y && v.x > this.x);

    if (frontVehicle.length) {
      let closestVehicle = frontVehicle[0];
      for (const vehicle of frontVehicle) {
        if (vehicle.x - this.x < closestVehicle.x - this.x) {
          closestVehicle = vehicle;
        }
      }
      if (closestVehicle.x - this.x < 40) {
        this.speed = 0;
      } else if (closestVehicle.x - this.x < 80) {
        this.speed = 1;
      } else if (closestVehicle.x - this.x < 100) {
        this.speed = 2;
      } else {
        this.speed = 3;
      }
    } else {
      this.speed = 3;
    }

    this.x += this.speed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export { Vehicle };
