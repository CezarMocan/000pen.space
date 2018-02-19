import PhalanxRoot from '../core/PhalanxRoot'
import RootView from './RootView'
import { canvasSize, grid } from '../Config'

class MainController extends PhalanxRoot {
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
  preDraw() {
    this.p5.background(255, 1)
  }
  postDraw() {

  }
  mousePressed() {

  }
}

export default new MainController()