import View from '../generic/View'
import { grid } from '../Config'

export default class Logo extends View {
  constructor(x, y) {
    super()
    this.x = x || 0
    this.y = y || 0
  }
  draw() {
    this.p5.stroke(this.p5.color(255, 0, 0))
    this.p5.fill(this.p5.color(255, 255, 255))
    this.p5.strokeWeight(2)
    this.p5.rect(this.x + 2 * grid.pointDistance, this.y + 2 * grid.pointDistance, 135, 30)
    this.p5.rect(this.x + grid.pointDistance, this.y + grid.pointDistance, 135, 30)
    this.p5.rect(this.x, this.y, 135, 30)
  }
}