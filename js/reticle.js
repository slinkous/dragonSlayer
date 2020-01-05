export default class Reticle{
  constructor(game){
    this.x = game.gameWidth/2;
    this.y = game.gameHeight/2;
    this.addEventListener("mousemove", (event)=>{
      this.mousePos = getMousePos(game.canvas)
    })
  }
  update(){

  }
}
