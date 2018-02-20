import { canvasSize, grid } from '../Config'
import View from '../core/View'
import Line from '../core/Line'
import Color from '../core/Color'
import State from '../state'

export default class Canvas extends View {
  constructor() {
    super()
    this._color = new Color(0, 0, 255)
    this.listenTo('mousePressed')
    this.listenTo('mouseMoved')

    this._pressCount = 0
  }
  reset() {
    this._pressCount = 0
    this.currLine = null
  }
  mousePressedLine() {
    const mX = this.getGridAligned(this.p5.mouseX)
    const mY = this.getGridAligned(this.p5.mouseY)
    this._pressCount++
    if (this._pressCount == 1) {
      this.currLine = this.addView(new Line(mX, mY, mX, mY))
    } else if (this._pressCount == 2) {
      if (mX == this.currLine.x && mY == this.currLine.y)
        this.removeView(this.currLine)
      this._pressCount = 0
    }
  }
  mouseMovedLine() {
    if (this._pressCount != 1) return
    const mX = this.getGridAligned(this.p5.mouseX)
    const mY = this.getGridAligned(this.p5.mouseY)
    this.currLine.x2 = mX
    this.currLine.y2 = mY
  }
  onEvent(evt) {
    let mX, mY
    switch (evt) {
      case 'mousePressed':
        if (State.isLineEditingMode) this.mousePressedLine()
        break
      case 'mouseMoved':
        if (State.isLineEditingMode) this.mouseMovedLine()
        break
    }
  }
  draw() {
  }
}