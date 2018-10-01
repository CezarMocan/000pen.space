import { canvasSize, grid } from '../Config'

const SUPPORTED_EVENTS = ['mousePressed', 'mouseMoved', 'mouseDragged', 'mouseReleased', 'mouseWheel', 'keyTyped', 'keyPressed', 'keyReleased']

export default class PhalanxRoot {
  constructor() {
    this._p5 = null
    this.listeners = {}
  }
  set p5(p5) { this._p5 = p5 }
  get p5() { return this._p5 }
  get windowWidth() { return this.p5.windowWidth }
  get windowHeight() { return this.p5.windowHeight }
  isEventSupported(evt) { return SUPPORTED_EVENTS.indexOf(evt) != -1 }
  start() {
    if (!this.p5) return
    this.p5.preload = this._preload.bind(this)
    this.p5.setup = this._setup.bind(this)
    this.p5.draw = this._draw.bind(this)
    this.p5.mousePressed = this._propagateP5Event.bind(this, 'mousePressed')
    this.p5.mouseMoved = this._propagateP5Event.bind(this, 'mouseMoved')
    this.p5.mouseDragged = this._propagateP5Event.bind(this, 'mouseDragged')
    this.p5.mouseReleased = this._propagateP5Event.bind(this, 'mouseReleased')
    this.p5.mouseWheel = this._propagateP5Event.bind(this, 'mouseWheel')
    this.p5.keyTyped = this._propagateP5Event.bind(this, 'keyTyped')
    this.p5.keyPressed = this._propagateP5Event.bind(this, 'keyPressed')
    this.p5.keyReleased = this._propagateP5Event.bind(this, 'keyReleased')
  }
  setRootView() { }
  // P5 lifecycle
  _preload() {
    this.preload()
  }
  preload() { }
  _setup() {
    this.canvas = this.p5.createCanvas(canvasSize.width, canvasSize.height);
    this.setRootView()
    this.setup()
    if (this.onSetupDone) this.onSetupDone()
  }
  setup() { }
  redraw() {
    this.p5.redraw()
  }
  _draw() {
    this.preDraw()
    if (this.rootView) this.rootView._draw()
    this.postDraw()
  }
  preDraw() { }
  postDraw() { }

  // P5 events
  addListener(evt, view) {
    if (!this.isEventSupported(evt)) {
      console.warn('No such P5 event!')
      return
    }
    if (!this.listeners[evt]) this.listeners[evt] = []
    if (this.listeners[evt].indexOf(view) != -1) return
    this.listeners[evt].push(view)
  }
  removeListener(evt, view) {
    if (!this.isEventSupported(evt)) {
      console.warn('No such P5 event!')
      return
    }
    if (!this.listeners[evt]) return
    const index = this.listeners[evt].indexOf(view)
    // console.log('removeListener', evt, view, this.listeners[evt], index)
    this.listeners[evt].splice(index, 1)
    // console.log('removeListener', evt, view, this.listeners[evt])
  }
  _propagateP5Event(evt, original) {
    if (!this.listeners[evt]) return
    this.listeners[evt].forEach(view => view._onEvent(evt, original))
    return false    
  }
}