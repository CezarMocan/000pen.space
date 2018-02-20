import View from './View'
import Color from './Color'
import { canvasSize, grid, buttons } from '../Config'

export default class Button extends View {
  constructor(x, y, text) {
    super()
    this.x = x
    this.y = y
    this.text = text
    this.textSize = grid.pointDistance - 2
    this.textPadding = 5
    this.width = grid.pointDistance * buttons.width
    this.height = grid.pointDistance * buttons.height
    this.dx = 0
    this.dy = 0
    this._color = new Color(255, 0, 0)
    this.listenTo('mousePressed')
  }
  get color() { return this._color }
  set color(c) { this._color = c }

  pointInView(x, y) {
    if (x >= this.x && x <= this.x + this.width &&
        y >= this.y && y <= this.y + this.height) {
      return true
    }
    return false
  }

  type(text, x, y) {
    this.p5.push()
    this.p5.textFont(this.root.fonts.fugueRegular)
    this.p5.noStroke()
    this.p5.fill(...this.color.array)
    this.p5.textSize(grid.pointDistance - 2)  
    this.p5.text(text, x, y)
    this.p5.pop()
  }

  onClick() { }

  onEvent(evt) {
    switch (evt) {
      case 'mousePressed':
        if (this.pointInView(this.p5.mouseX, this.p5.mouseY))
          this.onClick()
        break
    }
  }

  draw() {
    this.p5.stroke(this.p5.color(...this.color.array))
    this.p5.rect(this.x, this.y, this.width, this.height)
    this.type(this.text, this.x + this.textPadding, this.y + this.textSize)
  }
}