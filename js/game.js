import InputHandler from "./input.js";
import Wave from "./Knight.js"
import Shop from "./shop.js"
import Dragon from "./Dragon.js"

export const GAMESTATE = {
  PAUSED: 0,
  WAVE: 1,
  PREPARATION: 4,
  MENU: 2,
  GAMEOVER: 3
}

export class Game {
  constructor(gameWidth, gameHeight, canvas, aCtx){
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.previousstate = GAMESTATE.MENU;
    // this.music = document.querySelector("#gameMusic");
    // this.music.loop = true;
    this.gameObjects = [];
    this.background = document.querySelector('#map')
    this.input = new InputHandler(this, canvas);
    this.gold = 500;
    this.phaseTimer = 0;
    this.shop = new Shop();
    this.shop.createItemsByLevel(1);

    this.frameCount++;
    this.wave = new Wave();
    this.dragon = new Dragon();

  }

  start(){
    if(this.gamestate !== GAMESTATE.MENU) return;
    this.gameObjects = [];
    this.gamestate = GAMESTATE.PREPARATION;
    // this.music.play()
  }
  update(deltaTime){
    this.frameCount++;
    if(
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    ){
      return;
    }
    this.input.update();
    if(this.gamestate === GAMESTATE.PREPARATION){
      this.phaseTimer += deltaTime;

      this.dragon.canShoot = false;

      if(this.phaseTimer >= 0){
        this.gamestate = GAMESTATE.WAVE;
        this.phaseTimer = 0;
      }
    }
    if (this.gamestate === GAMESTATE.WAVE) {
      this.dragon.update();
      this.wave.knights = this.wave.knights.filter(k => !k.destroy);
      this.dragon.flames = this.dragon.flames.filter(f => !f.destroy);

      if (this.dragon.health <= 0) {
        this.dragon = null;
      }

      if (this.dragon && this.wave.knights.length > 0) {
        for (let k of this.wave.knights) {
          for (let f of this.dragon.flames) {
            if (f.destroy) {continue;}
            let x = f.x - k.x;
            let y = f.y - k.y;
            if (x*x + y*y < 256) {
              f.destroy = true;
              k.destroy = true;
            }
          }
        }
      }

    }
  }
  draw(ctx, colorScheme, font, audioCtx){
    ctx.save();
    ctx.fillStyle = colorScheme[0];
    ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
    ctx.font = "1em " + font;
    ctx.restore();
    // this.player.draw(ctx)

    if(this.gamestate === GAMESTATE.WAVE){
      ctx.fillStyle = colorScheme[3];
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
      ctx.drawImage(this.background, 0, 0, this.gameWidth, this.gameHeight);
      this.shop.hideItems()
      if (this.dragon) {
        this.dragon.canShoot = true;
      }

      // draw the castle
      // move the knights
      // operate the dragon breath
      // end phase at end of wave
    }
    if(this.gamestate === GAMESTATE.PREPARATION){
      ctx.fillStyle = colorScheme[2]
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight)
      ctx.drawImage(this.background, 0, 0, this.gameWidth, this.gameHeight);
      // draw the shop
      this.shop.draw(ctx, colorScheme, font, this.gameWidth, this.gameHeight)
      // show gold in the hud
      // count down a timer
      ctx.fillStyle = colorScheme[2];
      ctx.fillRect(this.gameWidth - 300, 10, 300, 36);
      ctx.font = "24px " + font;
      ctx.fillStyle = colorScheme[5]
      ctx.fillText("Time Left: " + Math.floor(30 - this.phaseTimer/1000), this.gameWidth - 144, 36);




    }
    if(this.gamestate === GAMESTATE.WAVE || this.gamestate === GAMESTATE.PREPARATION){
      // display gold???
      ctx.fillStyle = colorScheme[2];
      ctx.fillRect(3, 10, 144, 36);
      ctx.font = "24px " + font;
      ctx.fillStyle = colorScheme[6]
      this.dragon.draw(ctx);
      ctx.fillText("Gold: " + this.gold, 72, 36);
    }
    if(this.gamestate === GAMESTATE.PAUSED){
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "36px " + font;
      ctx.fillStyle = colorScheme[4];
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth/2, this.gameHeight/2);
    }
    if(this.gamestate === GAMESTATE.MENU){
      ctx.fillStyle = colorScheme[1];
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

      ctx.font = "36px " + font;
      ctx.fillStyle = colorScheme[6];
      ctx.textAlign = "center";
      ctx.fillText("Menu", this.gameWidth/2, this.gameHeight/2);
    }
    if(this.gamestate === GAMESTATE.GAMEOVER){
      ctx.fillStyle = colorScheme[4];
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

      ctx.font = "36px " + font;
      ctx.fillStyle = colorScheme[5];
      ctx.textAlign = "center";
      ctx.fillText("Game Over", this.gameWidth/2, this.gameHeight/2);
    }
  }
  togglePause(){
    if(this.gamestate == GAMESTATE.PAUSED){
      this.gamestate = this.previousstate;
      // this.music.play()
    } else {
      this.previousstate = this.gamestate;
      this.gamestate = GAMESTATE.PAUSED;
      // this.music.pause()
    }
  }
}
