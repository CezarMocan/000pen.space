import PhalanxRoot from '../core/PhalanxRoot'
import RootView from './RootView'
import { canvasSize, grid } from '../Config'

class OverlayController extends PhalanxRoot {
  constructor() {
    super()
    this.fonts = {}
  }
  setRootView() {
    this.rootView = new RootView(this)
  }
  preload() {
    this.fonts.fugueRegular = this.p5.loadFont('assets/fugue-regular.ttf')
    this.fonts.fugueMono = this.p5.loadFont('assets/fugue_mono.ttf')
  }
  setup() {
    this.canvas.canvas.style.position = 'fixed'
    this.p5.noLoop()
  }
  preDraw() {
    this.p5.clear()
  }
  postDraw() {

  }
  onStartEditing() {
    this.rootView.showButtons()
    this.p5.clear()
    this.p5.redraw()
  }
  onDoneEditing() {
    this.rootView.hideButtons()
    this.p5.clear()
    this.p5.redraw()
  }

  pointInMenu(x, y) { return this.rootView.pointInMenu(x, y) }
}

export default new OverlayController()