const canvasSize = {
  width: 1600,
  height: 1200
}

const grid = {
  gridImageResolution: 2.0,
  largeGridDistance: 50,
  largeGridColor: [255, 163, 184, 255],
  smallGridDistance: 10,
  smallGridDashSize: 3,
  smallGridColor: [217, 217, 217, 255],
  pointDistance: 10, // Needs to be the same as smallGridDistance—please update to only one variable.
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