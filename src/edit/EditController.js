import PhalanxRoot from '../core/PhalanxRoot'
import RootView from './RootView'
import { canvasSize, grid } from '../Config'

class EditController extends PhalanxRoot {
  constructor() {
    super()
  }
  setRootView() {
    this.rootView = new RootView(this)
    this.rootView.disabled = true
  }
  setup() {
    this.canvas.style('position', 'absolute')
    this.canvas.style('display', 'none')
    this.p5.noLoop()
  }
  getContents() {
    this.rootView.canvas.stop()
    return this.rootView.canvas.container
  }
  setContents(newContentsArray) {
    this.rootView.canvas.setContents(newContentsArray)
  }
  onStartEditing() {
    this.rootView.reset()
    this.rootView.disabled = false
    this.canvas.style('display', 'block')
    this.p5.loop()
    this.redraw()
  }
  onDoneEditing() {
    this.canvas.style('display', 'none')
    this.rootView.disabled = true
    this.p5.noLoop()
    this.p5.clear()
    this.redraw()
  }
}

export default new EditController()