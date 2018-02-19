import View from './View'

export default class Grid extends View {
  constructor(topLeft, bottomRight, pointDistance, pointSize) {
    super()
    this.topLeft = topLeft
    this.bottomRight = bottomRight
    this.pointDistance = pointDistance
    this.pointSize = pointSize
  }
  draw() {
    const topLeft = this.topLeft, bottomRight = this.bottomRight
    const pointSize = this.pointSize, pointDistance = this.pointDistance
    this.p5.fill(14, 14, 14)
    for (let i = topLeft.x; i <= bottomRight.x; i += pointDistance) {
      for (let j = topLeft.y; j <= bottomRight.y; j += pointDistance) {
        this.p5.ellipse(i, j, pointSize / 2, pointSize / 2, 0, 2 * this.p5.PI)
      }      
    }
  }
}