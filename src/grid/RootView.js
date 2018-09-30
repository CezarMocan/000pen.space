import { canvasSize, grid } from '../Config'
import View from '../core/View'

export default class RootView extends View {
  constructor(phalanxRoot) {
    super()  
    this.root = phalanxRoot
  }
  drawPoints() {
    const topLeft = grid.topLeft, bottomRight = grid.bottomRight
    const pointSize = grid.pointSize, pointDistance = grid.pointDistance
    this.p5.stroke(144, 144, 144)
    for (let i = topLeft.x; i <= bottomRight.x; i += pointDistance) {
      for (let j = topLeft.y; j <= bottomRight.y; j += pointDistance) {
        this.p5.ellipse(i, j, pointSize / 2, pointSize / 2, 0, 2 * this.p5.PI)
      }      
    }
  }
  drawSquares() {
    const topLeft = grid.topLeft, bottomRight = grid.bottomRight
    const pointSize = grid.pointSize, pointDistance = grid.pointDistance
    this.p5.stroke(184, 184, 184)
    for (let i = topLeft.x; i <= bottomRight.x; i += pointDistance) {
      this.p5.line(i, 0, i, canvasSize.height)
    }
    for (let i = topLeft.y; i <= bottomRight.y; i += pointDistance) {
      this.p5.line(0, i, canvasSize.width, i)
    }
  }
  draw() {
    // this.p5.background(225)
    // this.drawPoints()
  }
}