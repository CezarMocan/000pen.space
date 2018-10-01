import { canvasSize, grid } from '../Config'
import View from '../core/View'
import State from '../state'

export default class RootView extends View {
  constructor(phalanxRoot) {
    super()
    this.root = phalanxRoot
    this.offset = {
      x: 0,
      y: 0
    }

    this.listenTo('mouseWheel')

    this.img = null
    this.setup()
  }
  setup() {
    this.img = this.p5.createImage(grid.bottomRight.x, grid.bottomRight.y)
    this.img.loadPixels()

    const topLeft = grid.topLeft, bottomRight = grid.bottomRight
    const pointSize = grid.pointSize, pointDistance = grid.pointDistance

    for (let i = topLeft.x; i <= bottomRight.x; i += pointDistance) {
      for (let j = topLeft.y; j <= bottomRight.y; j += pointDistance) {
        this.img.set(i, j, [144, 144, 144, 255])
      }
    }

    this.img.updatePixels()
  }
  drawGridImage() {
    const { pointDistance } = grid
    const oX = this.offset.x % pointDistance
    const oY = this.offset.y % pointDistance
    this.p5.image(this.img, oX, oY)
  }
  draw() {
    this.drawGridImage()
  }
  updateScrollPosition(offsetX, offsetY) {
    this.offset.x = offsetX
    this.offset.y = offsetY
    this.p5.clear()
    this.redraw()
  }
  onEvent(evt, originalEvent) {
    switch (evt) {
      case 'mouseWheel':
        const { deltaX, deltaY } = originalEvent
        State.newScrollOffset({ deltaX, deltaY })
        break
    }
  }

}