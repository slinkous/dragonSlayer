import InputHandler from "./input.js";
import Player from "./player.js";
import Sprite from "./sprite.js";
import TileMap from "./tile.js";
import Reticle from "./reticle.js";
import Asteroid from "./asteroid.js";

export const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
}

export class Game {
  constructor(gameWidth, gameHeight, canvas, aCtx){
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    // this.music = document.querySelector("#gameMusic");
    // this.music.loop = true;
    this.gameObjects = [];
    this.input = new InputHandler(this, canvas);
    this.console = document.querySelector('#console')
    this.player = new Player(this)
    this.reticle = new Reticle(this)
    this.asteroid = new Asteroid(gameWidth, gameHeight)
    this.audio = aCtx;
  }

  start(){
    if(this.gamestate !== GAMESTATE.MENU) return;
    this.gameObjects = [this.player];
    this.gamestate = GAMESTATE.RUNNING;
    let oscillator = this.audio.createOscillator();

    oscillator.type = 'sine';
    oscillator.frequency.value = 440;
    oscillator.connect(this.audio.destination);
    oscillator.start();
    oscilator.stop(this.audio.currentTime + 2);

    // this.music.play()
  }
  update(deltaTime){
    if(
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    ) return;
    this.input.update();
    this.reticle.update(this.input.inputStates.mouseX, this.input.inputStates.mouseY)
    this.asteroid.update();
    // this.player.move(this.input.inputStates)
  }
  draw(ctx, colorScheme, font){

    ctx.save();
    ctx.fillStyle = colorScheme[0];
    ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
    ctx.font = "1em " + font;
    // ctx.fillStyle = colorScheme[2];
    // ctx.textAlign = "center";
    // ctx.fillText("+", this.gameWidth/2, this.gameHeight/2);
    this.asteroid.draw(ctx, colorScheme);
    this.reticle.draw(ctx, colorScheme);

    ctx.drawImage(this.console, 0, 0, this.gameWidth, this.gameHeight)
    ctx.restore();
    // this.player.draw(ctx)

    if(this.gamestate === GAMESTATE.PAUSED){
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "3em " + font;
      ctx.fillStyle = colorScheme[4];
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth/2, this.gameHeight/2);
    }
    if(this.gamestate === GAMESTATE.MENU){
      ctx.fillStyle = colorScheme[1];
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

      ctx.font = "3em " + font;
      ctx.fillStyle = colorScheme[6];
      ctx.textAlign = "center";
      ctx.fillText("Menu", this.gameWidth/2, this.gameHeight/2);
    }
    if(this.gamestate === GAMESTATE.GAMEOVER){
      ctx.fillStyle = colorScheme[4];
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

      ctx.font = "3em " + font;
      ctx.fillStyle = colorScheme[5];
      ctx.textAlign = "center";
      ctx.fillText("Game Over", this.gameWidth/2, this.gameHeight/2);
    }
  }
  togglePause(){
    if(this.gamestate == GAMESTATE.PAUSED){
      this.gamestate = GAMESTATE.RUNNING;
      // this.music.play()
    } else {
      this.gamestate = GAMESTATE.PAUSED;
      // this.music.pause()
    }
  }

}
