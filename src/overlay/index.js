import { grid, canvasSize } from '../sketch/Config'

export default function overlay(p5) {
  var fugueRegular
  p5.preload = () => {
    fugueRegular = p5.loadFont('assets/fugue-regular.ttf')
    // console.log(fugueRegular)
  }
  p5.setup = () => {
    let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    console.log(canvas)
    canvas.canvas.style.position = 'fixed'
    // canvas.style('position', 'absolute')
    // canvas.position(0, 0)
    p5.noLoop()
  }

  p5.draw = () => {
    const x = 2 * grid.pointDistance
    const y = 2 * grid.pointDistance
    const w = 8 * grid.pointDistance
    const h = 3 * grid.pointDistance

    p5.push()
    p5.stroke(p5.color(255, 0, 0))
    p5.fill(p5.color(255, 255, 255))
    p5.strokeWeight(2)
    p5.rect(x + 2 * grid.pointDistance, y + 2 * grid.pointDistance, w, h)
    p5.rect(x + grid.pointDistance, y + grid.pointDistance, w, h)
    p5.rect(x, y, w, h)
    p5.pop()

    p5.push()
    p5.textFont(fugueRegular)
    p5.noStroke()
    p5.fill(p5.color(255, 0, 0))
    p5.textSize(24)
    
    p5.text('phalanx', x + 5, y + 22)
    p5.text('.', x + grid.pointDistance + w / 2, y + grid.pointDistance + h / 2 + 5)
    p5.text('space', x + 2 * grid.pointDistance + 55, y + 3 * grid.pointDistance + 22)

    p5.pop()
  }
}