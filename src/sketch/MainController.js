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
    this.p5.clear()
  }
  postDraw() {

  }
  addContents(view) {
    this.rootView.dynamicContent.addView(view)
  }
  onDoneEditing() {
    this.p5.clear()
    this.p5.redraw()
  }
}

export default new MainController()