import { canvasSize, grid } from '../Config'

export default class View {
  constructor() {
    this._root = null
    this._children = []
    this._preRootListenTo = []
    this._disabled = false
    this._highlight = false
    console.log('view')
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
  redraw() { this.p5.redraw() }
  get windowWidth() { return this.root ? this.root.windowWidth : 0 }
  get windowHeight() { return this.root ? this.root.windowHeight : 0 }

  get children() { return this._children }
  get disabled() { 
    if (!this.parent) return this._disabled
    return this._disabled || this.parent.disabled
  }
  set disabled(d) { this._disabled = d }
  get highlight() { return this._highlight }
  set highlight(h) { this._highlight = h }

  duplicate() {
    console.warn('pointInView Not implemented for current view!')
    return null    
  }

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
  removeView(view) {
    if (view.root === this.root) view.root = null
    view.parent = null
    const index = this._children.indexOf(view)
    this._children.splice(index, 1)
    view.onRemoved()
  }
  removeAll() {
    while (this._children.length > 0) {
      const child = this._children[0]
      this.removeView(child)
    }
  }
  onRemoved() { }

  // Events
  listenTo(evt) {
    if (!this.root) {
      this._preRootListenTo.push(evt)
    } else {
      this.root.addListener(evt, this)
    }
  }
  stopListening(evt) {
    this.root.removeListener(evt, this)
  }
  _onEvent(evt) {
    if (this.disabled) return
    this.onEvent(evt)
  }
  onEvent(evt) {}

  // Drawing
  _draw() {
    if (!this.root || this.disabled) return
    this.p5.push()
    this.draw()
    this.children.forEach(child => child._draw())
    this.p5.pop()
  }
  draw() { }
}