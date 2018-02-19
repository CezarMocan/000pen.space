import { canvasSize, grid } from '../../Config'
import Line from '../../core/Line'
import View from '../../core/View'
import Color from '../../core/Color'

export default class MenuLine extends View {
  constructor(x, y, x2, y2) {
    super()
    this.line = this.addView(new Line(x, y, x2, y2))
    this.line.color = new Color(255, 0, 0)
  }
}