import View from './View'
import Color from './Color'
import MathUtils from './MathUtils'

export default class Line extends View {
  constructor(x, y, x2, y2) {
    super()
    this.x = x
    this.y = y
    this.x2 = x2
    this.y2 = y2
    this._color = new Color(0, 0, 255)
    this._highlightColor = new Color(255, 255, 0, 0.2)
    this.actionRadius = 15
  }
  duplicate() {
    return new Line(this.x, this.y, this.x2, this.y2)
  }
  get color() { return this._color }
  set color(c) { this._color = c }
  pointInView(x, y) {
    const distance = MathUtils.distToSegment(
      { x: x, y: y },
      { x: this.x, y: this.y },
      { x: this.x2, y: this.y2 }
    )
    if (distance <= this.actionRadius) return true
    return false
  }
  draw() {
    this.p5.noFill()
    this.p5.stroke(this.p5.color(...this.color.array))    
    this.p5.line(this.x, this.y, this.x2, this.y2)

    if (this.highlight) {
      this.p5.push()
      this.p5.strokeWeight(this.actionRadius)
      this.p5.noFill()
      this.p5.stroke(this.p5.color(...this._highlightColor.array))
      this.p5.line(this.x, this.y, this.x2, this.y2)
      this.p5.pop()
    }
  }
}