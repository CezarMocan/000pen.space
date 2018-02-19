import PhalanxRoot from '../core/PhalanxRoot'
import RootView from './RootView'
import { canvasSize, grid } from '../Config'

class EditController extends PhalanxRoot {
  constructor() {
    super()
  }
  setRootView() {
    this.rootView = new RootView(this)
  }
  setup() {
    this.canvas.style('position', 'absolute')
    this.canvas.style('display', 'none')
    this.p5.noLoop()
  }
  onStartEditing() {
    this.canvas.style('display', 'block')
    this.p5.redraw()
  }
  onDoneEditing() {
    this.canvas.style('display', 'none')
    this.p5.redraw()
  }
}

export default new EditController()