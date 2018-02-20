import { canvasSize, grid } from '../Config'
import View from '../core/View'
import Line from '../core/Line'
import Rect from '../core/Rect'

export default class RootView extends View {
  constructor(phalanxRoot) {
    super()  
    this.root = phalanxRoot
    this.content = this.addView(new View())
    this.dynamicContent = this.addView(new View())
    this.setupContent()
  }
  setupContent() {
    this.content.addView(new Line(105, 105, 190, 190))
    this.content.addView(new Rect(145, 175, 75, 120, 15, 15))
    this.content.addView(new Rect(265, 195, 75, 120, 30, -15))
  }
}