import {Game} from "./game.js"

const colorScheme = [
  // "#213b25",
  // "#3a604a",
  // "#4f7754",
  // "#a19f7c",
  // "#77744f",
  // "#775c4f",
  // "#603b3a",
  // "#3b2137",
  "#170e19",
  "#2f213b",
  "#433a60",
  "#4f5277",
  "#65738c",
  "#7c94a1",
  "#a0b9ba",
  "#c0d1cc"
]

//
const font = "SpaceMono";

let body = document.querySelector("body")
body.style.backgroundColor = colorScheme[4];
body.style.color = colorScheme[1];
body.style.font = "2em " + font;
let meta = document.querySelector("#metaInf")
let colorContainer = document.querySelector("#colorContainer")
meta.append(colorContainer)
let fc = document.querySelector("#fpsContainer");

for(let i = 0; i < colorScheme.length; i++){
  let d = document.createElement("div");
  d.style.width = "64px";
  d.style.height = "64px";
  d.style.backgroundColor = colorScheme[i];
  colorContainer.append(d)
}
meta.append(fc)

let canvas = document.querySelector("#gameCanvas");
let ctx = canvas.getContext("2d");

let aCtx = new window.AudioContext();

const GAME_WIDTH = 512;
const GAME_HEIGHT = 512;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
let game = new Game(GAME_WIDTH, GAME_HEIGHT, canvas, aCtx);

let lastCount = 0;
let lastRedraw = 0;
let fps = 0;
let frameCount = 0;

function gameLoop(timestamp){
  measureFPS(timestamp);
  let timeSinceRedraw = timestamp - lastRedraw;
  lastRedraw = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(timeSinceRedraw);
  game.draw(ctx, colorScheme, font);

  requestAnimationFrame(gameLoop);

}

requestAnimationFrame(gameLoop);

function measureFPS(timestamp){
  let deltaTime = timestamp - lastCount;

  if(deltaTime >= 1000){
    fps = frameCount;
    frameCount = 0;
    lastCount = timestamp;
  }
  frameCount++
  fc.innerHTML = "FPS: " + fps
}
