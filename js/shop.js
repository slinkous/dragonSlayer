let shopContainer = document.querySelector('#shop')

export default class Shop{
  constructor(){
    this.items = []
  }
  draw(ctx, colorScheme, font, gameWidth, gameHeight){
    // ctx.rect(0, gameHeight/2, gameWidth, gameHeight);
    // ctx.fillStyle = "rgba(0,0,0,0.5)";
    // ctx.fill();
    // ctx.font = "24px " + font;
    // ctx.fillStyle = colorScheme[4];
    // ctx.textAlign = "center";
    // ctx.fillText("Shop", gameWidth/2, gameHeight/2);

    // draw all the items with a loop
    // for(let i = 0; i<this.items.length; i++){
    //   this.items[i].draw(ctx, i*128%gameWidth, Math.floor(i*128/gameWidth)*128+gameHeight/2,colorScheme, font)
    // }

    shopContainer.style.display = "block";
  }
  createItemsByLevel(level){
    while(shopContainer.hasChildNodes()){
      shopContainer.removeChild(shopContainer.firstChild)
    }
    switch(level){
      case 1:
          new Item("spikes", 100);
    }
  }
  hideItems(){
    shopContainer.style.display = "none";
  }
}

class Item{
  constructor(name, price, desc=""){
    this.name = name;
    this.price = price;
    this.desc = desc;

    this.div = document.createElement("DIV");
    this.div.innerHTML = `<p> ${this.name} </p>`;
    this.button = document.createElement("BUTTON")
    this.button.innerHTML = this.price + " gold"
    this.div.append(this.button);
    shopContainer.append(this.div)

  }
  draw(ctx, x, y, colors, font){
    // ctx.fillStyle = colors[5];
    // ctx.fillRect(x, y, 64, 64);
    // ctx.fillStyle = colors[1];
    // ctx.font = "12px " + font
    // ctx.fillText(this.name, x+32, y+32);
    // ctx.fillText(this.price + " gold", x+32, y+48)

  }
  buy() {

  }
}
