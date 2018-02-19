import { canvasSize, grid } from '../Config'
import View from '../core/View'

export default class Version extends View {
  constructor(versionNumber) {
    super()  
    this._versionNumber = versionNumber
  }
  get versionNumber() { return this._versionNumber }
  set versionNumber(v) { this._versionNumber = v }
  draw() {
    const size = 12 * grid.pointDistance
    this.p5.textFont(this.root.fonts.fugueMono)
    this.p5.noFill()
    this.p5.stroke(this.p5.color(255, 0, 0))
    this.p5.strokeWeight(1)
    this.p5.textSize(size)  
    this.p5.textAlign(this.p5.CENTER, this.p5.CENTER)
    this.p5.text(this.versionNumber, this.windowWidth / 2, this.windowHeight / 2)
  }
}