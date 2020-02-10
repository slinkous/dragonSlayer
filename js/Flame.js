var flameImage = document.querySelector("#flame");

export default class Flame {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;

    this.speed = 6;
    this.dir = dir;
  }

  update() {
    this.x += Math.cos(this.dir) * this.speed;
    this.y += Math.sin(this.dir) * this.speed;
  }

  draw(ctx) {
    ctx.drawImage(flameImage, this.x, this.y, 32, 32);
  }
}
