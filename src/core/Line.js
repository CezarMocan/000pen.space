import View from './View'
import Color from './Color'

export default class Line extends View {
  constructor(x, y, x2, y2) {
    super()
    this.x = x
    this.y = y
    this.x2 = x2
    this.y2 = y2
    this._color = new Color(0, 0, 255)
  }
  get color() { return this._color }
  set color(c) { this._color = c }
  pointInView(x, y) {
    if (x >= Math.min(this.x, this.x2) &&
        x <= Math.max(this.x, this.x2) &&
        y >= Math.min(this.y, this.y2) &&
        y <= Math.max(this.y, this.y2)) return true
    return false
  }
  draw() {
    this.p5.noFill()
    this.p5.stroke(this.p5.color(...this.color.array))
    this.p5.line(this.x, this.y, this.x2, this.y2)
  }
}