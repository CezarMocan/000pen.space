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
}

export default new GridController()