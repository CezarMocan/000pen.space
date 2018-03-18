import { canvasSize, grid, textConfig } from '../Config'
import View from './View'
import Color from './Color'

export default class Text extends View {
  constructor(x, y, text) {
    super()
    this._x = x
    this._y = y
    this._text = text
    this._fontSize = textConfig.fontSize
    this._color = new Color(0, 0, 255)
    this._highlightColor = new Color(255, 255, 0, 0.2)

    this.highlight = false
    this.editing = false
  }
  duplicate() {
    return new Text(this._x, this._y, this._text)
  }
  get x() { return this._x }
  get y() { return this._y }
  get width() { 
    return this.p5.textWidth(this._text)
  }
  get height() { 
    return this._fontSize
  }
  get text() { return this._text }
  set text(t) { this._text = t }
  set x(x) { this._x = x }
  set y(y) { this._y = y }
  get color() { return this._color }
  set color(c) { this._color = c }
  get left() { return this.x }  
  get right() { return this.x + this.width }
  get top() { return this.y }
  get bottom() { return this.y + this.height }
  pointInView(x, y) {
    if (x >= this.left && x <= this.right &&
        y >= this.top && y <= this.bottom) return true
    return false
  }
  draw() {
    this.p5.textSize(this._fontSize)
    this.p5.textAlign(this.p5.LEFT, this.p5.TOP)
    this.p5.noStroke()
    this.p5.fill(this.color.array)
    this.p5.text(this.text, this.x, this.y)
    if (this.highlight) {
      const h = {
        x: this.left - grid.pointDistance,
        y: this.top - grid.pointDistance,
        w: this.right - this.left + 2 * grid.pointDistance,
        h: this.bottom - this.top + 2 * grid.pointDistance
      }
      this.p5.noStroke()
      this.p5.fill(this.p5.color(...this._highlightColor.array))
      this.p5.rect(h.x, h.y, h.w, h.h)
    }

    if (this.editing) {
      console.log('Editing')
    }
  }
}