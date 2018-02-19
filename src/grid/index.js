// import { grid, canvasSize } from '../Config'

// export default function sketch(p5) {
//   var canvas
//   p5.setup = () => {
//     canvas = p5.createCanvas(canvasSize.width, canvasSize.height);
//     canvas.style('position', 'absolute')
//     p5.noLoop()
//   }

//   p5.draw = () => {
//     const topLeft = grid.topLeft, bottomRight = grid.bottomRight
//     const pointSize = grid.pointSize, pointDistance = grid.pointDistance
//     p5.stroke(144, 144, 144)
//     for (let i = topLeft.x; i <= bottomRight.x; i += pointDistance) {
//       for (let j = topLeft.y; j <= bottomRight.y; j += pointDistance) {
//         p5.ellipse(i, j, pointSize / 2, pointSize / 2, 0, 2 * p5.PI)
//       }      
//     }

//     // Grid of squares
//     // p5.stroke(184, 184, 184)
//     // for (let i = topLeft.x; i <= bottomRight.x; i += pointDistance) {
//     //   p5.line(i, 0, i, canvasSize.height)
//     // }
//     // for (let i = topLeft.y; i <= bottomRight.y; i += pointDistance) {
//     //   p5.line(0, i, canvasSize.width, i)
//     // }
//   }
// }


import GridController from './GridController'

export default function sketch(s) {
  GridController.p5 = s
  GridController.start()
}
