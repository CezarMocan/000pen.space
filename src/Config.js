const canvasSize = {
  width: 1600,
  height: 1200
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