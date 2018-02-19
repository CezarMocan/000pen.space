import { canvasSize, grid } from '../Config'
import View from '../core/View'
import GridHighlight from './GridHighlight'

export default class RootView extends View {
  constructor(phalanxRoot) {
    super()  
    this.root = phalanxRoot
    this.gridHighlight = this.addView(new GridHighlight())
  }
  draw() {
    this.p5.clear()
    this.p5.background('rgba(255, 0, 0, 0.05)')
    // this.drawPoints()
  }
}