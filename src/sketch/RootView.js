import { canvasSize, grid } from '../Config'
import View from '../core/View'
import Line from '../core/Line'
import Rect from '../core/Rect'

export default class RootView extends View {
  constructor(phalanxRoot) {
    super()  
    this.root = phalanxRoot
    this.content = this.addView(new View())
    this.setupContent()
  }
  setupContent() {
    this.content.addView(new Line(5, 5, 90, 90))
    this.content.addView(new Rect(45, 75, 75, 120, 15, 15))
    this.content.addView(new Rect(165, 75, 75, 120, 30, -15))
  }
}