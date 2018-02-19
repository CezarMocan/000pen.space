import View from './View'
import Color from './Color'

export default class Rect extends View {
  constructor(x, y, w, h, dx, dy) {
    super()
    this.x = x
    this.y = y
    this.width = w
    this.height = h
    this.dx = dx || 0
    this.dy = dy || 0
    this._color = new Color(0, 0, 255)
  }
  get color() { return this._color }
  set color(c) { this._color = c }
  draw() {
    // this.p5.stroke(this.p5.color(this.color.r, this.color.g, this.color.b))
    this.p5.stroke(this.p5.color(...this.color.array))
    this.p5.rect(this.x, this.y, this.width, this.height)
    if (this.dx || this.dy) {
      this.p5.fill(this.p5.color(...this.color.array))
      const offsetX = this.dx < 0 ? 0 : this.width
      const offsetY = this.dy < 0 ? 0 : this.height
      // OX depth
      this.p5.beginShape()
      this.p5.vertex(offsetX + this.x, this.y)
      this.p5.vertex(offsetX + this.x + this.dx, this.y + this.dy)
      this.p5.vertex(offsetX + this.x + this.dx, this.y + this.height + this.dy)
      this.p5.vertex(offsetX + this.x, this.y + this.height)
      this.p5.endShape(this.p5.CLOSE)
      // OY depth
      this.p5.beginShape()
      this.p5.vertex(this.x, offsetY + this.y)
      this.p5.vertex(this.x + this.dx, offsetY + this.y + this.dy)
      this.p5.vertex(this.x + this.width + this.dx, offsetY + this.y + this.dy)
      this.p5.vertex( this.x + this.width, offsetY + this.y)
      this.p5.endShape(this.p5.CLOSE)
    }
  }
}