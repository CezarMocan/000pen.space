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
  fontSize: 16,
  leading: 21
}

const colors = {
  background: [255, 255, 255, 1],
  lines: [0, 0, 0, 1],
  boxFill: [255, 255, 255, 1],
  text: [0, 0, 0, 1],
  textCursor: [255, 0, 0, 1],
  editHighlight: [255, 255, 0, 0.2]
}

const strokes = {
  weight: 2
}


module.exports = {
  canvasSize: canvasSize,
  grid: grid,
  buttons: buttons,
  textConfig: textConfig,
  colors: colors,
  strokes: strokes
}