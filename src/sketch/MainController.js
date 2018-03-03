import PhalanxRoot from '../core/PhalanxRoot'
import RootView from './RootView'
import { canvasSize, grid } from '../Config'

class MainController extends PhalanxRoot {
  constructor() {
    super()
  }
  setRootView() {
    this.rootView = new RootView(this)
  }
  setup() {
    this.canvas.style('position', 'absolute')
    this.p5.noLoop()
  }
  preDraw() {
    this.p5.clear()
  }
  postDraw() {

  }
  getContents() {
    return this.rootView.dynamicContent.children.slice(0)
  }
  getAndClearContents() {
    let childrenToEdit = []
    const currentChildren = this.rootView.dynamicContent.children.slice(0)
    this.rootView.dynamicContent.children.forEach(child => childrenToEdit.push(child.duplicate()))
    this.rootView.dynamicContent.removeAll()
    return {
      childrenToEdit: childrenToEdit,
      oldChildren: currentChildren
    }
  }
  setContents(viewArray) {
    this.rootView.dynamicContent.removeAll()
    viewArray.forEach(view => this.rootView.dynamicContent.addView(view))
  }
  onDoneEditing() {
    this.p5.clear()
    this.redraw()
  }
}

export default new MainController()