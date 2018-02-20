import { canvasSize, grid } from '../Config'
import View from '../core/View'
import GridHighlight from './GridHighlight'
import Canvas from './Canvas'

export default class RootView extends View {
  constructor(phalanxRoot) {
    super()  
    this.root = phalanxRoot
    this.canvas = this.addView(new Canvas())
    this.gridHighlight = this.addView(new GridHighlight())
  }
  reset() {
    if (this.canvas) this.removeView(this.canvas)
    this.canvas = this.addView(new Canvas())
  }
  draw() {
    this.p5.clear()
    this.p5.background('rgba(255, 0, 0, 0.05)')
    // this.drawPoints()
  }
}