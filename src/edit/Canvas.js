import { canvasSize, grid } from '../Config'
import View from '../core/View'
import Line from '../core/Line'
import Color from '../core/Color'

export default class Canvas extends View {
  constructor() {
    super()
    this._color = new Color(0, 0, 255)
    this.listenTo('mousePressed')
    this.listenTo('mouseMoved')

    this._pressCount = 0
  }
  onEvent(evt) {
    let mX, mY
    switch (evt) {
      case 'mousePressed':
        mX = this.getGridAligned(this.p5.mouseX)
        mY = this.getGridAligned(this.p5.mouseY)
        this._pressCount++
        if (this._pressCount == 1) {
          this.currLine = this.addView(new Line(mX, mY, mX, mY))
        } else if (this._pressCount == 2) {
          // this.removeView(this.currLine)
          this._pressCount = 0
        }
        break
      case 'mouseMoved':
        if (this._pressCount != 1) return
        mX = this.getGridAligned(this.p5.mouseX)
        mY = this.getGridAligned(this.p5.mouseY)
        this.currLine.x2 = mX
        this.currLine.y2 = mY
        break
    }
  }
  draw() {
  }
}