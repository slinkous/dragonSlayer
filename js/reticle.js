export default class Reticle{
  constructor(game){
    this.x = game.gameWidth/2;
    this.y = game.gameHeight/2;
    this.size = 32;
  }
  update(posX, posY){
    this.x = posX;
    this.y = posY;
  }
  draw(ctx, colors){
    ctx.save();
    ctx.strokeStyle = colors[5];
    ctx.fillStyle = "none";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size/2, 0, Math.PI*2);
    ctx.moveTo(this.x-this.size/2, this.y-this.size/2)
    ctx.lineTo(this.x+this.size/2, this.y+this.size/2)
    ctx.moveTo(this.x-this.size/2, this.y+this.size/2)
    ctx.lineTo(this.x+this.size/2, this.y-this.size/2)
    ctx.stroke()
    ctx.closePath();
    ctx.restore();
  }
}
