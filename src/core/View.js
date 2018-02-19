import { canvasSize, grid } from '../Config'

export default class View {
  constructor() {
    this._root = null
    this._children = []
    this._preRootListenTo = []
  }
  get uid() { return this._uid }
  get root() {
    if (!this._root && this.parent)
      this._root = this.parent.root
    return this._root
  }
  set root(r) {
    if (!r) return
    this._root = r
    this._children.forEach(c => c.root = r)
    if (this._preRootListenTo.length) {
      this._preRootListenTo.forEach(evt => this.listenTo(evt))
      this._preRootListenTo = []
    }
  }
  get p5() { return this.root.p5 }
  get children() { return this._children }
  get windowWidth() { return this.root ? this.root.windowWidth : 0 }
  get windowHeight() { return this.root ? this.root.windowHeight : 0 }
  redraw() { this.p5.redraw() }

  pointInView(x, y) {
    console.warn('pointInView Not implemented for current view!')
    return false
  }

  getGridAligned(x) {
    let mod = x % grid.pointDistance
    return (2 * mod > grid.pointDistance) ? x + (grid.pointDistance - mod) : x - mod
  }

  // View hierarchy tree
  addView(view) {
    if (this.root) view.root = this.root
    view.parent = this
    this.children.push(view)
    view.onAdded()
    return view
  }
  onAdded() { }
  removeView() {
    view.root = view.parent = null
    const index = this.views.indexOf(view)
    this.children.splice(index, 1)
    view.onRemoved()
  }
  onRemoved() { }

  // Events
  listenTo(evt) {
    if (!this.root) {
      this._preRootListenTo.push(evt)
    } else {
      this.root.addListener(evt, this)
    }
    console.log('listenTo: ', evt, this._preRootListenTo)
  }
  _onEvent(evt) {
    this.onEvent(evt)
  }
  onEvent(evt) {}

  // Drawing
  _draw() {
    if (!this.root) return
    this.p5.push()
    this.draw()
    this.children.forEach(child => child._draw())
    this.p5.pop()
  }
  draw() { }
}