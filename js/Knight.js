let knightImage = document.querySelector("#knight");

export default class Knight {
  constructor(x, y, speed = 1) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.num = 0;
    this.speed = speed;
  }

  draw(ctx) {
    ctx.drawImage("knightImage", this.x, this.y, this.width, this.height);
  }

  update() {
    this.movePath();
  }

  movePath() {
    let distx = path[this.num].x - this.x;
    let disty = path[this.num].y - this.y;

    let dx = min(this.speed, distx) * sign(distx);
    let dy = min(this.speed, disty) * sign(disty);

    if (distx > this.speed / 2 && placeFree(this.x + dx, this.y)) {
      this.x += dx;
    } else if (disty > this.speed / 2 && placeFree(this.x, this.y + dy)) {
      this.y += dy;
    }
  }
}

function sign(num) {
  return (num == 0) ? 0 : ((num > 0) ? 1 : -1);
}
