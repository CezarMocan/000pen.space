import { canvasSize, grid } from '../Config'
import Rect from '../core/Rect'
import View from '../core/View'
import Color from '../core/Color'
import MenuLine from './menu/MenuLine'
import MenuBox from './menu/MenuBox'
import MenuMove from './menu/MenuMove'
import MenuRemove from './menu/MenuRemove'
import MenuImage from './menu/MenuImage'

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

    this.boxCoords = {
      x: this.containerCoords.x + grid.pointDistance,
      y: this.containerCoords.y + 3 * grid.pointDistance,
      w: grid.pointDistance,
      h: grid.pointDistance,
    }
    this.boxButton = this.addView(new MenuBox(this.boxCoords.x, this.boxCoords.y, this.boxCoords.w, this.boxCoords.h))

    this.imageCoords = {
      x: this.containerCoords.x + grid.pointDistance,
      y: this.containerCoords.y + 5 * grid.pointDistance,
      w: grid.pointDistance,
      h: grid.pointDistance,
    }
    this.imageButton = this.addView(new MenuImage(this.imageCoords.x, this.imageCoords.y, this.imageCoords.w, this.imageCoords.h))

    this.moveCoords = {
      x: this.containerCoords.x + grid.pointDistance,
      y: this.containerCoords.y + 7 * grid.pointDistance,
      w: grid.pointDistance,
      h: grid.pointDistance,
    }
    this.moveButton = this.addView(new MenuMove(this.moveCoords.x, this.moveCoords.y, this.moveCoords.w, this.moveCoords.h))

    this.removeCoords = {
      x: this.containerCoords.x + grid.pointDistance,
      y: this.containerCoords.y + 9 * grid.pointDistance,
      w: grid.pointDistance,
      h: grid.pointDistance,
    }
    this.removeButton = this.addView(new MenuRemove(this.removeCoords.x, this.removeCoords.y, this.removeCoords.w, this.removeCoords.h))
  }

  pointInView(x, y) {
    return this.container.pointInView(x, y)
  }
}