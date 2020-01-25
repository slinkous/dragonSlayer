export default class Asteroid {
  constructor(gameWidth, gameHeight){
    this.x = (Math.random()*gameWidth*0.9)+gameWidth*0.05;
    this.y = (Math.random()*gameHeight*0.8)+gameHeight*0.05;
    this.z = -100;
    this.size = 64;
    console.log(this)
  }
  draw(ctx, colors){
    ctx.save();
    ctx.fillStyle = colors[1];
    ctx.arc(this.x, this.y, this.size*(100+this.z)/100, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  }
  update(){
    if(this.z<0){this.z+=0.1}
  }
}
