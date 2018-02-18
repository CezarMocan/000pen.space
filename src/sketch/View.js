export default class View {
  constructor() {
    this._root = null
  }
  get uid() { return this._uid }
  get root() { return this._root }
  set root(r) { this._root = r }
  get p5() { return this.root.p5 }
  _draw() {
    this.p5.push()
    this.draw()
    this.p5.pop()
  }
  draw() {
    console.warn('You need to override draw!')
  }
}