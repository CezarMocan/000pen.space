import { canvasSize, grid } from './Config'
import View from './generic/View'
import Line from './generic/Line'
import Rect from './generic/Rect'
import Grid from './generic/Grid'


export default class RootView extends View {
  constructor(phalanxRoot) {
    super()  
    this.root = phalanxRoot
    this.grid = this.addView(new Grid(grid.topLeft, grid.bottomRight, grid.pointDistance, grid.pointSize))
    this.content = this.addView(new View())
    this.menus = this.addView(new View())

    this.setupContent()
    this.setupMenus()
  }
  setupContent() {
    this.content.addView(new Line(5, 5, 90, 90))
    this.content.addView(new Rect(45, 75, 75, 120, 15, 15))
    this.content.addView(new Rect(165, 75, 75, 120, 30, -15))
  }
  setupMenus() {

  }
}