import View from './View'
import Line from './Line'
import Rect from './Rect'
import Grid from './Grid'
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
    this.setupUniversalViews()
    this.setupDynamicViews()
  }
  setupUniversalViews() {
    this.addView(new Grid(grid.topLeft, grid.bottomRight, grid.pointDistance, grid.pointSize))
  }
  setupDynamicViews() {
    // this.addView(new Line({x: 5, y: 5}, {x: 90, y: 90}))
    // this.addView(new Rect({x: 45, y: 75}, {x: 75, y: 120}, {x: 15, y: 15}))
    // this.addView(new Rect({x: 165, y: 75}, {x: 75, y: 120}, {x: 30, y: -15}))

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 5; j++) {
        let x = i * 11 * grid.pointDistance + 45
        let y = j * 14 * grid.pointDistance + 45
        let depthX = Math.ceil(2 * Math.random()) * grid.pointDistance
        let depthY = Math.ceil(2 * Math.random()) * grid.pointDistance
        if (Math.random() < 0.5) depthX *= -1
        if (Math.random() < 0.5) depthY *= -1
        let rect = new Rect({ x: x, y: y }, { x: 75, y: 120 }, { x: depthX, y: depthY })
        this.addView(rect)
      }
    }
  }
  addView(view) {
    view.root = this
    this.views.push(view)
  }
  removeView(view) {
    view.root = null
    const index = this.views.indexOf(view)
    this.views.splice(index, 1)
  }

  setup() {
    this.p5.createCanvas(canvasSize.width, canvasSize.height);
    this.pg = this.p5.createGraphics(200, 200)
    this.pg.background(this.p5.color(128, 10, 10))
    this.backgroundColor = this.p5.color(this.p5.random(255), this.p5.random(255), this.p5.random(255));

    this.x = this.p5.random(500);
    this.y = 250;

    this.p5.noLoop()
  }

  draw() {
    this.p5.background(255)
    this.views.forEach(view => view._draw())
  }

  mousePressed() {

  }

}

export default new PhalanxRoot()