import { grid, canvasSize } from '../sketch/Config'

export default function overlay(p5) {
  var fugueRegular, fugueMono
  p5.preload = () => {
    fugueRegular = p5.loadFont('assets/fugue-regular.ttf')
    fugueMono = p5.loadFont('assets/fugue_mono.ttf')
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

  var rect = (x, y, w, h) => {
    p5.push()
    p5.stroke(p5.color(255, 0, 0))
    p5.fill(p5.color(255, 255, 255))
    p5.strokeWeight(2)
    p5.rect(x, y, w, h)
    p5.pop()
  }

  var type = (text, x, y) => {
    p5.push()
    p5.textFont(fugueRegular)
    p5.noStroke()
    p5.fill(p5.color(255, 0, 0))
    p5.textSize(grid.pointDistance - 2)  
    p5.text(text, x, y)
    p5.pop()
  }

  var version = (number) => {
    const size = 6 * grid.pointDistance
    p5.push()
    p5.textFont(fugueMono)
    p5.noFill()
    p5.stroke(p5.color(255, 0, 0))
    p5.strokeWeight(1)
    p5.textSize(size)  
    p5.textAlign(p5.CENTER, p5.CENTER)
    p5.text(number, p5.windowWidth / 2, p5.windowHeight / 2)
    p5.pop()
  }

  p5.draw = () => {
    const x = grid.pointDistance
    const y =  grid.pointDistance
    const w = 7 * grid.pointDistance
    const h = 2 * grid.pointDistance

    rect(x + 2 * grid.pointDistance, y + 2 * grid.pointDistance, w, h)
    type('space', x + w - 10, y + 3 * grid.pointDistance + 12)
    rect(x + grid.pointDistance, y + grid.pointDistance, w, h)
    type('.', x + grid.pointDistance + w / 2, y + grid.pointDistance + h / 2 + 5)
    rect(x, y, w, h)
    type('phalanx', x + 5, y + 18)

    version(1)
  }
}