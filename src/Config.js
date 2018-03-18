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

const buttons = {
  width: 5,
  height: 2
}

const textConfig = {
  fontSize: 72,
  leading: 80
}


module.exports = {
  canvasSize: canvasSize,
  grid: grid,
  buttons: buttons,
  textConfig: textConfig
}