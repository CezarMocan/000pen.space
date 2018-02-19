import { canvasSize, grid } from '../Config'
import View from '../core/View'

export default class Logo extends View {
  constructor() {
    super()  
  }
  rect(x, y, w, h) {
    this.p5.push()
    this.p5.stroke(this.p5.color(255, 0, 0))
    this.p5.fill(this.p5.color(255, 255, 255))
    this.p5.strokeWeight(2)
    this.p5.rect(x, y, w, h)
    this.p5.pop()
  }
  type(text, x, y) {
    this.p5.push()
    this.p5.textFont(this.root.fonts.fugueRegular)
    this.p5.noStroke()
    this.p5.fill(this.p5.color(255, 0, 0))
    this.p5.textSize(grid.pointDistance - 2)  
    this.p5.text(text, x, y)
    this.p5.pop()
  }
  draw() {
    const x = grid.pointDistance
    const y =  grid.pointDistance
    const w = 7 * grid.pointDistance
    const h = 2 * grid.pointDistance

    this.rect(x + 2 * grid.pointDistance, y + 2 * grid.pointDistance, w, h)
    this.type('space', x + w - 10, y + 3 * grid.pointDistance + 12)
    this.rect(x + grid.pointDistance, y + grid.pointDistance, w, h)
    this.type('.', x + grid.pointDistance + w / 2, y + grid.pointDistance + h / 2 + 5)
    this.rect(x, y, w, h)
    this.type('phalanx', x + 5, y + 18)
  }
}