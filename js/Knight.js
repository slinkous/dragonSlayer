let knightImage = document.querySelector("#knight");

const path = [
  {x: 261, y: 498},
  {x: 258, y: 354},
  {x: 438, y: 345},
  {x: 441, y: 280},
  {x: 375, y: 282},
  {x: 441, y: 280},
  {x: 429, y: 209},
  {x: 378, y: 127},
  {x: 107, y: 126},
  {x: 70, y: 157},
  {x: 81, y: 392},
  {x: 195, y: 400},
  {x: 199, y: 314},

]

export default class Wave {
  constructor(){
    this.level = 1;
    this.knights = [];
    this.createWave(this.level);
    this.timeSinceLastReleased = 0;
  }
  createWave(level){
    let knightCount = 0;
    let start = {x: 256, y: 512}

    switch(level){
      case 1:
        knightCount = 10;
    }
    while(this.knights.length < knightCount){
      this.knights.push(new Knight(start.x, start.y))
    }
  }
  update(delta){
    this.timeSinceLastReleased += delta;
    for(let i = 0; i < this.knights.length; i++){
      if(this.knights[i].released){
        this.knights[i].update();
      }
    }
  }
  draw(ctx){
    for(let i = 0; i < this.knights.length; i++){
      if(this.knights[i].released){
        this.knights[i].draw(ctx);
      }
    }
  }
}

class Knight {
  constructor(x, y, speed = 1) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.num = 0;
    this.speed = speed;
    this.released = false;
  }

  draw(ctx) {
    ctx.drawImage(knightImage, this.x, this.y, 32, 32);
  }

  update() {
      this.movePath(path);
  }

  movePath() {
    if (this.num >= path.length) {
      if (frameCount % 30 == 0) {
        dragon.health--;
      }
      return;
    }
    let distx = path[this.num].x - this.x;
    let disty = path[this.num].y - this.y;

    let dx = min(this.speed, distx) * sign(distx);
    let dy = min(this.speed, disty) * sign(disty);

  movePath(path) {
    let dx = path[this.num].x - this.x;
    let dy = path[this.num].y - this.y;

    if (dx > this.speed / 2) {
      this.x += Math.min(this.speed, dx) * Math.sign(dx);
    } else if (dy > this.speed / 2) {
      this.y += Math.min(this.speed, dy) * Math.sign(dy);
    }
  }
}

function sign(num) {
  return (num == 0) ? 0 : ((num > 0) ? 1 : -1);
}
