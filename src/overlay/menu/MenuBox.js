import { canvasSize, grid } from '../../Config'
import Rect from '../../core/Rect'
import View from '../../core/View'
import Color from '../../core/Color'
import State from '../../state'

export default class MenuBox extends Rect {
  constructor(x, y, w, h) {
    super(x, y, w, h, 0, 0)
    this.color = new Color(255, 0, 0)
    this.listenTo('mousePressed')
  }
  onEvent(evt) {
    switch (evt) {
      case 'mousePressed':
        if (this.pointInView(this.p5.mouseX, this.p5.mouseY)) {
          State.startEditing(State.EDITING_MODES.BOX)
        }
        break
    }
  }
  draw() {
    if (State.isEditing && State.isBoxEditingMode)
      this.color = new Color(0, 255, 0)
    else
      this.color = new Color(255, 0, 0)
    super.draw()
  }
}