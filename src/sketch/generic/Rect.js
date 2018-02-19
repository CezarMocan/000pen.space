import View from './View'

export default class Rect extends View {
  constructor(p1, p2, depth, style) {
    super()
    this.p1 = p1
    this.p2 = p2
    this.depth = depth
    this.style = style
  }
  draw() {
    this.p5.stroke(this.p5.color(0, 0, 255))
    this.p5.rect(this.p1.x, this.p1.y, this.p2.x, this.p2.y)
    if (this.depth.x || this.depth.y) {
      this.p5.fill(this.p5.color(0, 0, 255))
      const offsetX = this.depth.x < 0 ? 0 : this.p2.x
      const offsetY = this.depth.y < 0 ? 0 : this.p2.y
      // this.p5.fill(this.p5.color(0, 0, 255))
      // Left depth
      this.p5.beginShape()
      this.p5.vertex(offsetX + this.p1.x, this.p1.y)
      this.p5.vertex(offsetX + this.p1.x + this.depth.x, this.p1.y + this.depth.y)
      this.p5.vertex(offsetX + this.p1.x + this.depth.x, this.p1.y + this.p2.y + this.depth.y)
      this.p5.vertex(offsetX + this.p1.x, this.p1.y + this.p2.y)
      this.p5.endShape(this.p5.CLOSE)
      // Top depth
      this.p5.beginShape()
      this.p5.vertex(this.p1.x, offsetY + this.p1.y)
      this.p5.vertex(this.p1.x + this.depth.x, offsetY + this.p1.y + this.depth.y)
      this.p5.vertex(this.p1.x + this.p2.x + this.depth.x, offsetY + this.p1.y + this.depth.y)
      this.p5.vertex( this.p1.x + this.p2.x, offsetY + this.p1.y)
      this.p5.endShape(this.p5.CLOSE)
    }
  }
}