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
  preload() {
    this.fonts = {}
    this.fonts.fugueRegular = this.p5.loadFont('assets/fugue-regular.ttf')
    this.fonts.fugueMono = this.p5.loadFont('assets/fugue_mono.ttf')
  }
  setup() {
    this.canvas.style('position', 'absolute')
    this.canvas.style('display', 'none')
    this.p5.noLoop()
  }
  getContents() {
    this.rootView.canvasView.stop()
    return this.rootView.canvasView.container
  }
  setContents(newContentsArray) {
    this.rootView.canvasView.setContents(newContentsArray)
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
  onChangeEditingMode() {
    this.rootView.onChangeEditingMode()
  }
  updateScrollPosition(offsetX, offsetY) {
    this.rootView.updateScrollPosition(offsetX, offsetY)
  }
  onPaste(pastedText) {
    this.rootView.onPaste(pastedText)
  }
}

export default new EditController()