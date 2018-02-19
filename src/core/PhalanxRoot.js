import { canvasSize, grid } from '../Config'

export default class PhalanxRoot {
  constructor() {
    this._p5 = null
    this.listeners = {}
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
    this.p5.mousePressed = this._mousePressed.bind(this)
    this.setRootView()
  }
  setRootView() { }
  // P5 lifecycle
  _preload() {
    this.preload()
  }
  preload() { }
  _setup() {
    this.canvas = this.p5.createCanvas(canvasSize.width, canvasSize.height);
    this.setup()
  }
  setup() { }
  _draw() {
    this.preDraw()
    if (this.rootView) this.rootView._draw()
    this.postDraw()
  }
  preDraw() { }
  postDraw() { }

  // P5 events
  addListener(evt, view) {
    switch (evt) {
      case 'mousePressed':
        if (!this.listeners[evt]) this.listeners[evt] = []
        this.listeners[evt].push(view)
        break
      default:
        console.log('No such P5 event!')
        break
    }
  }
  _mousePressed() {
    const evt = 'mousePressed'
    if (!this.listeners[evt]) return
    this.listeners[evt].forEach(view => view._onEvent(evt))
    return false
  }
}