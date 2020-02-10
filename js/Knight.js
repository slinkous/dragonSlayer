class Knight {
  constructor(x, y, speed = 1) {
    this.x = x;
    this.y = y;
    this.num = 0;
    this.speed = speed;
  }

  draw(ctx) {
    ctx.drawImage();
  }

  update() {
    movePath();
  )

  movePath() {
    let dx = path[this.num].x - this.x;
    let dy = path[this.num].y - this.y;

    if (dx > this.speed / 2) {
      this.x += min(this.speed, dx) * sign(dx);
    } else if (dy > this.speed / 2) {
      this.y += min(this.speed, dy) * sign(dy);
    }
  }
}

function sign(num) {
  return (num == 0) ? 0 : ((num > 0) ? 1 : -1);
}
