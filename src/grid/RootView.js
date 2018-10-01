import { canvasSize, grid } from '../Config'
import View from '../core/View'

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
    // this.p5.background(225)
    this.drawGridImage()
  }
  onEvent(evt, originalEvent) {
    switch (evt) {
      case 'mouseWheel':
        // console.log('mousewheel: ', originalEvent.deltaX, originalEvent.deltaY)
        this.offset.x -= originalEvent.deltaX
        this.offset.y -= originalEvent.deltaY
        this.p5.clear()
        this.redraw()
        break
    }
  }

}