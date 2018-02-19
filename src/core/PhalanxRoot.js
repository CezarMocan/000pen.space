import { canvasSize, grid } from '../Config'

export default class PhalanxRoot {
  constructor() {
    this._p5 = null
  }
  set p5(p5) { this._p5 = p5 }
  get p5() { return this._p5 }
  get windowWidth() { return this.p5.windowWidth }
  get windowHeight() { return this.p5.windowHeight }

  start() {
    if (!this.p5) return
    this.p5.preload = this._preload.bind(this)
    this.p5.setup = this._setup.bind(this)
    this.p5.draw = this._draw.bind(this)
    this.p5.mousePressed = this.mousePressed.bind(this)
    // this.rootView = new RootView(this)
    this.setRootView()
  }
  setRootView() {
  }
  _preload() {
    this.preload()
  }
  preload() {    
  }
  _setup() {
    this.canvas = this.p5.createCanvas(canvasSize.width, canvasSize.height);
    this.setup()
  }
  setup() { 
  }
  _draw() {
    this.preDraw()
    if (this.rootView) this.rootView._draw()
    this.postDraw()
  }
  preDraw() {

  }
  postDraw() {

  }
  mousePressed() {

  }
}