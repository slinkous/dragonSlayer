var path = [];
export default class PathNode {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    path.push(this);
  }
}
