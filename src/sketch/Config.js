const canvasSize = {
  width: 1000,
  height: 700
}

const grid = {
  topLeft: {
    x: 0,
    y: 0
  },
  bottomRight: {
    x: canvasSize.width,
    y: canvasSize.height
  },
  pointDistance: 15,
  pointSize: 1
}


module.exports = {
  canvasSize: canvasSize,
  grid: grid
}