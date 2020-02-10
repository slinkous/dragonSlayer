let dragonImage = document.querySelector("#dragon");

export default class Dragon {
  constructor() {
    this.x = 250 - 128/2;
    this.y = 250 - 96/2;
    this.lastShot = 0;
    this.shootFrames = 6;
    this.flameCost = 5;
    this.maxFlame = 100;
    this.currentFlame = 100;

    this.health = 1000;
    this.maxHealth = 1000;
  }

  shootFire() {
    if (this.currentFlame < this.flameCost && frameCount - this.lastShot > this.shootFrames) {
      flames.push(new Flame(this.x, this.y));
      this.currentFlame -= flameCost;
    }
  }

  update() {
    this.currentFlame++;
    if (this.currentFlame > this.maxFlame) {
      this.currentFlame = this.maxFlame;
    }
  }

  draw(ctx) {
    ctx.drawImage(dragonImage, this.x, this.y, 128, 96);
    ctx.fillStyle = "black";
    ctx.fillRect(10, 10, 32, 240);
    ctx.fillStyle = "red";
    ctx.fillRect(10, 240 - 240*this.currentFlame/this.maxFlame, 32, 240);
  }
}
