import View from './View'

export default class Line extends View {
  constructor(x, y, x2, y2) {
    super()
    this.x = x
    this.y = y
    this.x2 = x2
    this.y2 = y2
  }
  draw() {
    this.p5.line(this.x, this.y, this.x2, this.y2)
  }
}