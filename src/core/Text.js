import { canvasSize, grid, textConfig } from '../Config'
import View from './View'
import Color from './Color'

export default class Text extends View {
  static get serializableAttributes() {
    return ['x', 'y', 'text']
  }
  static FromSerialized(obj) {
    return View.FromSerialized(Text, obj)
  }
  static Serialize(obj) {
    return View.Serialize(Text, obj)
  }
  constructor(x, y, text) {
    super()
    this._x = x
    this._y = y
    this._text = text
    this._fontSize = textConfig.fontSize
    this._leading = textConfig.leading
    this._color = new Color(0, 0, 255)
    this._cursorColor = new Color(255, 0, 0)
    this._highlightColor = new Color(255, 255, 0, 0.2)

    this.highlight = false
    this.editing = false
  }
  duplicate() {
    return new Text(this._x, this._y, this._text)
  }
  serialize() {
    return {
      x: this.x,
      y: this.y,
      text: this.text
    }
  }
  get x() { return this._x }
  get y() { return this._y }
  recomputeSize() {
    this.p5.push()
    this.styleText()
    this._width = this.lines.reduce((acc, l) => Math.max(this.p5.textWidth(l), acc), 0)
    this.p5.pop()

    this._height = this.lines.length * this._leading
  }
  get cursorPosition() {
    const lines = this.lines
    this.p5.push()
    this.styleText()
    const lastLineWidth = this.p5.textWidth(lines[lines.length - 1])
    this.p5.pop()

    return {
      x: this.x + lastLineWidth + 5,
      y: this.y + this.height - this._leading
    }
  }
  get width() {
    if (!this._width) this.recomputeSize()
    return this._width
  }
  get height() {
    if (!this._height) this.recomputeSize()
    return this._height
  }
  get text() { return this._text }
  set text(t) {
    this._text = t
    this.recomputeSize()
    console.log(Text.FromSerialized({x: 100, y: 100, text: 'Laba2'}))
    console.log(Text.Serialize(this))
  }
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
  get lines() {
    return this._text.split('\n')
  }
  styleText() {
    this.p5.textSize(this._fontSize)
    this.p5.textAlign(this.p5.LEFT, this.p5.TOP)
    this.p5.noStroke()
    this.p5.fill(this.color.array)
    // this.p5.noFill()
    // this.p5.stroke(this.color.array)
    this.p5.textFont(this.root.fonts.fugueRegular)
    this.p5.textLeading(this._leading)
  }
  draw() {
    this.styleText()
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

    if (this.editing && this.p5.frameCount % 60 < 30) {
      const cursorPosition = this.cursorPosition
      this.p5.noFill()
      this.p5.stroke(this._cursorColor.array)
      this.p5.line(cursorPosition.x, cursorPosition.y + 7, cursorPosition.x, cursorPosition.y + this._leading + 7)
    }
  }
}