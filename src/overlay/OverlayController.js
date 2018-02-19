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
    this.p5.background(255, 1)
  }
  postDraw() {

  }
  mousePressed() {

  }
}

export default new OverlayController()