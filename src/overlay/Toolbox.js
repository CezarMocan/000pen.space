import { canvasSize, grid } from '../Config'
import Rect from '../core/Rect'
import View from '../core/View'
import Color from '../core/Color'
import MenuLine from './menu/MenuLine'

export default class Toolbox extends View {
  constructor() {
    super()
    this.containerCoords = {
      x: window.innerWidth - 5 * grid.pointDistance,
      y: 2 * grid.pointDistance
    }
    this.container = this.addView(new Rect(this.containerCoords.x, this.containerCoords.y, 3 * grid.pointDistance, 13 * grid.pointDistance, grid.pointDistance, -grid.pointDistance))
    this.container.color = new Color(255, 0, 0)

    this.lineCoords = {
      x: this.containerCoords.x + grid.pointDistance,
      y: this.containerCoords.y + grid.pointDistance,
      x2: this.containerCoords.x + 2 * grid.pointDistance,
      y2: this.containerCoords.y + 2 * grid.pointDistance,
    }
    this.lineButton = this.addView(new MenuLine(this.lineCoords.x, this.lineCoords.y, this.lineCoords.x2, this.lineCoords.y2))
  }
}