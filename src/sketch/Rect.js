import View from './View'

export default class Rect extends View {
  constructor(p1, p2, style) {
    super()
    this.p1 = p1
    this.p2 = p2
    this.style = style
  }
  draw() {
    this.p5.noFill()
    this.p5.rect(this.p1.x, this.p1.y, this.p2.x, this.p2.y)
  }
}