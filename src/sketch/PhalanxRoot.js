import RootView from './RootView'
import { canvasSize, grid } from './Config'

class PhalanxRoot {
  constructor() {
    this._p5 = null
    this.views = []
  }
  set p5(p5) { this._p5 = p5 }
  get p5() { return this._p5 }
  get windowWidth() { return this.p5.windowWidth }
  get windowHeight() { return this.p5.windowHeight }

  start() {
    if (!this.p5) return
    this.p5.setup = this.setup.bind(this)
    this.p5.draw = this.draw.bind(this)
    this.p5.mousePressed = this.mousePressed.bind(this)
    this.rootView = new RootView(this)
  }
  setup() {
    this.canvas = this.p5.createCanvas(canvasSize.width, canvasSize.height);
    this.canvas.style('position', 'absolute')
    this.p5.noLoop()
  }

  draw() {
    this.p5.background(255, 1)
    this.rootView._draw()    
    // this.views.forEach(view => view._draw())
  }

  mousePressed() {

  }

}

export default new PhalanxRoot()