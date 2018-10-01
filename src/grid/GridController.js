import PhalanxRoot from '../core/PhalanxRoot'
import RootView from './RootView'
import { canvasSize, grid } from '../Config'

class GridController extends PhalanxRoot {
  constructor() {
    super()
  }
  setRootView() {
    this.rootView = new RootView(this)
  }
  setup() {
    this.canvas.style('position', 'absolute')
    this.p5.noLoop()    
  }
  updateScrollPosition(offsetX, offsetY) {
    this.rootView.updateScrollPosition(offsetX, offsetY)
  }
}

export default new GridController()