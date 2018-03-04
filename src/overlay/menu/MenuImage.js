import { canvasSize, grid } from '../../Config'
import Rect from '../../core/Rect'
import View from '../../core/View'
import Color from '../../core/Color'
import State from '../../state'

export default class MenuImage extends Rect {
  constructor(x, y, w, h) {
    super(x, y, w, h, 0, 0)
    this.color = new Color(255, 0, 0)
    this.listenTo('mousePressed')
  }
  onEvent(evt) {
    switch (evt) {
      case 'mousePressed':
        if (this.pointInView(this.p5.mouseX, this.p5.mouseY)) {
          State.startEditing(State.EDITING_MODES.IMAGE)
        }
        break
    }
  }
  draw() {
    if (State.isEditing && State.isImageEditingMode)
      this.color = new Color(0, 255, 0)
    else
      this.color = new Color(255, 0, 0)
    super.draw()
    this.p5.push()
    this.p5.stroke(this.color.array)
    this.p5.line(this.x, this.y + this.height, this.x + this.width / 3, this.y + this.height / 2)
    this.p5.line(this.x + this.width / 3, this.y + this.height / 2, this.x + this.width * 0.5, this.y + this.height * 0.7)
    this.p5.line(this.x + this.width * 0.5, this.y + this.height * 0.7, this.x + this.width * 0.8, this.y + this.height * 0.4)
    this.p5.line(this.x + this.width * 0.8, this.y + this.height * 0.4, this.x + this.width, this.y + this.height)
    // this.p5.ellipse(this.x + this.width / 2, this.y + this.height / 2, this.width * 0.5, this.height * 0.5, 0, 0, 2 * Math.PI)
    this.p5.pop()
  }
}