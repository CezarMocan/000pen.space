import { canvasSize, grid } from '../Config'
import View from '../core/View'
import Line from '../core/Line'
import Rect from '../core/Rect'
import ImageRect from '../core/ImageRect'

export default class RootView extends View {
  constructor(phalanxRoot) {
    super()  
    this.root = phalanxRoot
    // this.content = this.addView(new View())
    this.dynamicContent = this.addView(new View())
    this.setupContent()
    this.listenTo('mouseWheel')
  }
  setupContent() {
    // this.dynamicContent.addView(new Line(105, 105, 190, 190))
    // this.dynamicContent.addView(new Rect(145, 175, 75, 120, 15, 15))
    // this.dynamicContent.addView(new Rect(265, 195, 75, 120, 30, -15))
    // this.dynamicContent.addView(new ImageRect(465, 495, 175, 120, 30, -15, 'https://www.gakkoproject.com/assets/people/graham_banfield-a6234aa97d37f4fd6f1c6f6dee91fde69fe942e18092b686411024bc3bb89d60.jpg'))
  }
  onEvent(evt, originalEvent) {
    switch (evt) {
      case 'mouseWheel':
        // console.log('mousewheel: ', originalEvent.deltaX, originalEvent.deltaY)
        this.dynamicContent.x -= originalEvent.deltaX
        this.dynamicContent.y -= originalEvent.deltaY
        console.log(this.dynamicContent.x, this.dynamicContent.y)
        this.p5.clear()
        this.redraw()
        break
    }
  }
}