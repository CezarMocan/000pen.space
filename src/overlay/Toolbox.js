import { canvasSize, grid } from '../Config'
import Rect from '../core/Rect'
import View from '../core/View'
import Color from '../core/Color'

export default class Toolbox extends View {
  constructor() {
    super()
    this.containerCoords = {
      x: window.innerWidth - 6 * grid.pointDistance,
      y: 2 * grid.pointDistance
    }
    this.container = this.addView(new Rect(this.containerCoords.x, this.containerCoords.y, 4 * grid.pointDistance, 13 * grid.pointDistance, grid.pointDistance, -grid.pointDistance))
    this.container.color = new Color(255, 0, 0)
  }
}