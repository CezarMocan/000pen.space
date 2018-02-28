import { canvasSize, grid } from '../Config'
import View from '../core/View'
import Line from '../core/Line'
import Rect from '../core/Rect'
import Color from '../core/Color'
import State from '../state'

export default class Canvas extends View {
  constructor() {
    super()
    this._color = new Color(0, 0, 255)
    this.listenTo('mousePressed')
    this.listenTo('mouseMoved')
    this.container = this.addView(new View())

    this._pressCount = 0
  }
  setContents(newContentsArray) {
    console.log('setContents', newContentsArray)
    for (let view of newContentsArray) {
      console.log('Adding', view)
      this.container.addView(view)
    }
    console.log(this.container)
  }
  stop() {
    this.stopListening('mousePressed')
    this.stopListening('mouseMoved')
  }
  reset() {
    this._pressCount = 0
    this.currLine = null
    this.currRect = null
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
      else {
        this.removeView(this.currLine)
        this.container.addView(this.currLine)
      }

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
  mousePressedBox() {
    const mX = this.getGridAligned(this.p5.mouseX)
    const mY = this.getGridAligned(this.p5.mouseY)
    this._pressCount++
    if (this._pressCount == 1) {
      this.currRect = this.addView(new Rect(mX, mY, grid.pointDistance, grid.pointDistance))
    } else if (this._pressCount == 2) {
      if (mX == this.currRect.x && mY == this.currRect.y)
        this.removeView(this.currRect)
    } else if (this._pressCount == 3) {
      this.removeView(this.currRect)
      this.container.addView(this.currRect)
      this._pressCount = 0
    }
  }
  mouseMovedBox() {
    const mX = this.getGridAligned(this.p5.mouseX)
    const mY = this.getGridAligned(this.p5.mouseY)
    if (this._pressCount == 1) {
      this.currRect.width = mX - this.currRect.x
      this.currRect.height = mY - this.currRect.y
    } else if (this._pressCount == 2) {
      if (mX >= this.currRect.nx && mX <= this.currRect.nx + this.currRect.nwidth) {
        this.currRect.dx = this.currRect.dy = 0
        return
      }
      if (mY >= this.currRect.ny && mY <= this.currRect.ny + this.currRect.nheight) {
        this.currRect.dx = this.currRect.dy = 0
        return
      }
      this.currRect.dx = mX < this.currRect.nx ? mX - this.currRect.nx : mX - this.currRect.nx - this.currRect.nwidth
      this.currRect.dy = mY < this.currRect.ny ? mY - this.currRect.ny : mY - this.currRect.ny - this.currRect.nheight
    }
  }
  onEvent(evt) {
    let mX, mY
    switch (evt) {
      case 'mousePressed':
        if (State.pointInMenu(this.p5.mouseX, this.p5.mouseY)) return
        if (State.isLineEditingMode) this.mousePressedLine()
        if (State.isBoxEditingMode) this.mousePressedBox()
        break
      case 'mouseMoved':
        if (State.isLineEditingMode) this.mouseMovedLine()
        if (State.isBoxEditingMode) this.mouseMovedBox()
        break
    }
  }
  draw() {
  }
}