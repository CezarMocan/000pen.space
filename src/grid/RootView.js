import { canvasSize, grid } from '../Config'
import View from '../core/View'
import State from '../state'
import Color from '../core/Color'
import { colors } from '../Config'

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
    window.addEventListener('resize', this.onWindowResize.bind(this))
  }
  onWindowResize() {
    this.createGridImage()
    this.redraw()
  }
  setup() {
    this.createGridImage()
  }
  createGridImage() {  
    const { largeGridDistance, largeGridColor, gridImageResolution } = grid
    const topLeft = { x: 0, y: 0 }
    const bottomRight = {
      x: this.p5.windowWidth + 3 * largeGridDistance,
      y: this.p5.windowHeight + 3 * largeGridDistance
    }

    this.img = this.p5.createImage(bottomRight.x * gridImageResolution, bottomRight.y * gridImageResolution)
    this.img.loadPixels()

    // Create large grid
    for (let i = topLeft.x; i <= bottomRight.x * gridImageResolution; i += largeGridDistance * gridImageResolution) {
      for (let j = topLeft.y; j <= bottomRight.y * gridImageResolution; j++) {
        this.img.set(i, j, largeGridColor)
      }
    }

    for (let i = topLeft.x; i <= bottomRight.x * gridImageResolution; i++) {
      for (let j = topLeft.y; j <= bottomRight.y * gridImageResolution; j += largeGridDistance * gridImageResolution) {
        this.img.set(i, j, largeGridColor)
      }
    }

    // Create small grid
    const { smallGridDistance, smallGridColor, smallGridDashSize } = grid
    for (let i = topLeft.x; i <= bottomRight.x * gridImageResolution; i += smallGridDistance * gridImageResolution) {
      if (i % (largeGridDistance * gridImageResolution) == 0) continue
      for (let j = topLeft.y; j <= bottomRight.y * gridImageResolution; j++) {
        if (j % (2 * smallGridDashSize) < smallGridDashSize)
          this.img.set(i, j, smallGridColor)
      }
    }

    for (let j = topLeft.y; j <= bottomRight.y * gridImageResolution; j += smallGridDistance * gridImageResolution) {
      if (j % (largeGridDistance * gridImageResolution) == 0) continue
      for (let i = topLeft.x; i <= bottomRight.x * gridImageResolution; i++) {
        if (i % (2 * smallGridDashSize) < smallGridDashSize)
          this.img.set(i, j, smallGridColor)
      }
    }

    this.img.updatePixels()
  }
  drawGridImage() {
    const { gridImageResolution, largeGridDistance } = grid
    const oX = parseInt(this.offset.x) % largeGridDistance - 2 * largeGridDistance
    const oY = parseInt(this.offset.y) % largeGridDistance - 2 * largeGridDistance
    this.p5.scale(1 / gridImageResolution)
    this.p5.image(this.img, oX * gridImageResolution, oY * gridImageResolution)
    this.p5.scale(gridImageResolution)
  }
  draw() {
    this.p5.background((new Color(colors.background)).array)
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