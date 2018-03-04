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
    this.listenTo('mouseDragged')
    this.listenTo('mouseReleased')
    this.container = this.addView(new View())

    this._pressCount = 0
    this.moveOpParams = {
      selectedView: null
    }
    this._mx = 0
    this._my = 0
  }
  setContents(newContentsArray) {
    for (let view of newContentsArray) {
      this.container.addView(view)
    }
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

  // *********** COMMON *********** \\
  getViewUnderCursor() {
    for (let i = this.container.children.length - 1; i >= 0; i--) {
      const view = this.container.children[i]
      if (view.pointInView(this._mx, this._my)) return view
    }
  }
  highlightViewUnderCursor() {
    const view = this.getViewUnderCursor()
    if (view && view.highlight) return
    this.container.children.forEach(child => child.highlight = false)
    if (view) view.highlight = true
  }

  // *********** LINE *********** \\
  mousePressedLine() {
    const mX = this._mx
    const mY = this._my
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
    this.currLine.x2 = this._mx
    this.currLine.y2 = this._my
  }

  // *********** BOX *********** \\
  mousePressedBox() {
    const mX = this._mx
    const mY = this._my
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
    const mX = this._mx
    const mY = this._my
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

  // *********** IMAGE *********** \\
  mouseMovedImage() {
    this.highlightViewUnderCursor()
  }
  mousePressedImage() {
    const view = this.getViewUnderCursor()
    if (!view) return
    const filePicker = this.p5.select('#filePicker')
    filePicker.elt.click()
  }

  // *********** MOVE *********** \\
  mousePressedMove() {
    for (let i = this.container.children.length - 1; i >= 0; i--) {
      const view = this.container.children[i]
      if (view.pointInView(this._mx, this._my)) {
        this.moveOpParams.selectedView = view
        view.selected = true
        return
      }
    }
  }
  mouseMovedMove() {
    this.highlightViewUnderCursor()
  }
  mouseDraggedMove() {
    if (!this.moveOpParams.selectedView) return
    const view = this.moveOpParams.selectedView
    view.x += this._dx
    view.y += this._dy
  }
  mouseReleasedMove() {
    if (!this.moveOpParams.selectedView) return
    this.moveOpParams.selectedView.selected = false
    this.moveOpParams.selectedView = null
  }

  // *********** REMOVE *********** \\
  mousePressedRemove() {
    const view = this.getViewUnderCursor()
    if (!view) return
    this.container.removeView(view)
  }
  mouseMovedRemove() {
    this.highlightViewUnderCursor()
  }


  updateMousePositionParams() {
    const mX = this.getGridAligned(this.p5.mouseX)
    const mY = this.getGridAligned(this.p5.mouseY)
    this._dx = (mX - this._mx)
    this._dy = (mY - this._my)
    this._mx = mX
    this._my = mY
  }
  onEvent(evt) {
    this.updateMousePositionParams()
    switch (evt) {
      case 'mousePressed':
        if (State.pointInMenu(this.p5.mouseX, this.p5.mouseY)) return
        if (State.isLineEditingMode) this.mousePressedLine()
        if (State.isBoxEditingMode) this.mousePressedBox()
        if (State.isImageEditingMode) this.mousePressedImage()
        if (State.isMoveEditingMode) this.mousePressedMove()
        if (State.isRemoveEditingMode) this.mousePressedRemove()
        break
      case 'mouseMoved':
        if (State.isLineEditingMode) this.mouseMovedLine()
        if (State.isBoxEditingMode) this.mouseMovedBox()
        if (State.isImageEditingMode) this.mouseMovedImage()
        if (State.isMoveEditingMode) this.mouseMovedMove()
        if (State.isRemoveEditingMode) this.mouseMovedRemove()
        break
      case 'mouseDragged':
        if (State.isMoveEditingMode) this.mouseDraggedMove()
          break
      case 'mouseReleased':
        if (State.isMoveEditingMode) this.mouseReleasedMove()
        break
    }
  }
  draw() {
  }
}