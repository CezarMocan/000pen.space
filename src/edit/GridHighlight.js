import { canvasSize, grid } from '../Config'
import View from '../core/View'
import Color from '../core/Color'

export default class GridHighlight extends View {
  constructor() {
    super()
    this._color = new Color(0, 0, 255)
  }
  draw() {
    let mX = this.p5.mouseX
    let mY = this.p5.mouseY
    mX = this.getGridAligned(mX)
    mY = this.getGridAligned(mY)
    this.p5.stroke(...this._color.array)
    this.p5.noFill()
    this.p5.ellipse(mX, mY, 10, 10, 0, 2 * this.p5.PI)
  }
}