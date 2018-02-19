import { grid, canvasSize } from '../sketch/Config'

export default function sketch(p5) {
  var canvas
  p5.setup = () => {
    canvas = p5.createCanvas(canvasSize.width, canvasSize.height);
    canvas.style('position', 'absolute')
    p5.noLoop()
  }

  p5.draw = () => {
    const topLeft = grid.topLeft, bottomRight = grid.bottomRight
    const pointSize = grid.pointSize, pointDistance = grid.pointDistance
    p5.fill(14, 14, 14)
    for (let i = topLeft.x; i <= bottomRight.x; i += pointDistance) {
      for (let j = topLeft.y; j <= bottomRight.y; j += pointDistance) {
        p5.ellipse(i, j, pointSize / 2, pointSize / 2, 0, 2 * p5.PI)
      }      
    }
  }
}
