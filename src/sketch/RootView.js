import { canvasSize, grid } from '../Config'
import View from '../core/View'
import Line from '../core/Line'
import Rect from '../core/Rect'
import ImageRect from '../core/ImageRect'

export default class RootView extends View {
  constructor(phalanxRoot) {
    super()  
    this.root = phalanxRoot
    // this.content = this.addView(new View())
    this.dynamicContent = this.addView(new View())
  }
  updateScrollPosition(offsetX, offsetY) {
    this.dynamicContent.x = offsetX
    this.dynamicContent.y = offsetY
    this.p5.clear()
    this.redraw()
  }
}