let dragonImage = document.querySelector("#dragon");
let canvas = document.querySelector("#gameCanvas");

import Flame from "./Flame.js";

export default class Dragon {
  constructor() {
    this.x = 250 - 128/2;
    this.y = 250 - 96/2;
    this.lastShot = 0;
    this.shootFrames = 6;
    this.flameCost = 5;
    this.maxFlame = 15;
    this.currentFlame = 15;

    this.health = 1000;
    this.maxHealth = 1000;

    this.canShoot = false;
    this.flames = [];
    this.aimX = 0;
    this.aimY = 0;

    canvas.addEventListener('mousedown', () => {
      let rect = canvas.getBoundingClientRect();
      this.aimX = event.clientX - rect.left;
      this.aimY = event.clientY - rect.top;
      this.shootFire();
    })
  }

  shootFire() {
    if (!this.canShoot) {return;}
    if (this.currentFlame >= this.flameCost) {
      let dir = Math.atan2(this.aimY - this.y - 64, this.aimX - this.x - 48);
      this.flames.push(new Flame(this.x + 64, this.y + 48, dir));
      this.currentFlame -= this.flameCost;
    }
  }

  update() {
    this.currentFlame+=0.05;
    if (this.currentFlame > this.maxFlame) {
      this.currentFlame = this.maxFlame;
    }

    for (let f of this.flames) {
      f.update();
    }
  }

  draw(ctx) {
    ctx.save();
    for (let f of this.flames) {
      f.draw(ctx);
    }
    ctx.drawImage(dragonImage, this.x, this.y, 128, 96);
    ctx.fillStyle = "black";
    ctx.fillRect(10, 58, 32, 244);
    ctx.fillStyle = "red";
    ctx.fillRect(12, 60 + 240 - 240*this.currentFlame/this.maxFlame, 28, 240*this.currentFlame/this.maxFlame);
    ctx.restore();
  }
}
