import { canvasSize, grid } from './Config'
import View from './View'
import Line from './Line'
import Rect from './Rect'
import Grid from './Grid'


export default class RootView extends View {
  constructor(phalanxRoot) {
    super()  
    this.root = phalanxRoot
    this.grid = this.addView(new Grid(grid.topLeft, grid.bottomRight, grid.pointDistance, grid.pointSize))
    this.content = this.addView(new View())
    this.menus = this.addView(new View())

    this.menus.addView(new Line({x: 5, y: 5}, {x: 90, y: 90}))
    this.content.addView(new Rect({x: 45, y: 75}, {x: 75, y: 120}, {x: 15, y: 15}))
    this.content.addView(new Rect({x: 165, y: 75}, {x: 75, y: 120}, {x: 30, y: -15}))
  }
}