import { canvasSize, grid } from '../../Config'
import Line from '../../core/Line'
import View from '../../core/View'
import Color from '../../core/Color'

export default class MenuLine extends Line {
  constructor(x, y, x2, y2) {
    super(x, y, x2, y2)
    this.color = new Color(255, 0, 0)
    this.listenTo('mousePressed')
    this.test = false
  }
  onEvent(evt) {
    switch (evt) {
      case 'mousePressed':
        if (this.pointInView(this.p5.mouseX, this.p5.mouseY)) {
          if (!this.test) this.color = new Color(0, 255, 0)
          else this.color = new Color(255, 0, 0)
          this.test = !this.test          
          this.redraw()
        }
        break
    }
  }
}