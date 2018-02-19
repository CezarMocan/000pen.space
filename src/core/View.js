export default class View {
  constructor() {
    this._root = null
    this._children = []
  }
  get uid() { return this._uid }
  get root() { return this._root }
  set root(r) { this._root = r }
  get p5() { return this.root.p5 }
  get children() { return this._children }
  get windowWidth() { return this.root.windowWidth }
  get windowHeight() { return this.root.windowHeight }
  addView(view) {
    view.root = this.root
    view.parent = this
    this.children.push(view)
    return view
  }
  removeView() {
    view.root = view.parent = null
    const index = this.views.indexOf(view)
    this.children.splice(index, 1)
  }
  _draw() {
    this.p5.push()
    this.draw()
    this.children.forEach(child => child._draw())
    this.p5.pop()
  }
  draw() {
    console.warn('You need to override draw!')
  }
}