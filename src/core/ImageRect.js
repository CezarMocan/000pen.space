import { canvasSize, grid } from '../Config'
import Rect from './Rect'
import Color from './Color'

export default class ImageRect extends Rect {
  constructor(x, y, w, h, dx, dy, url) {
    super(x, y, w, h, dx, dy)
    this._url = url
    this._loaded = false
    this._imageParams = {}
  }
  onRoot() {
    this._img = this.p5.createImg(this._url, '', this.loadedCallback.bind(this))
    this._img.hide()
  }
  duplicate() {
    return new ImageRect(this._x, this._y, this._width, this._height, this.dx, this.dy, this._url)
  }
  loadedCallback() {
    this._loaded = true
    if (this._img.width / this.width < this._img.height / this.height) {
      // Fit on width
      this._imageParams.scaleFactor = 1 / (this._img.width / this.width)
      this._imageParams.sx = 0
      this._imageParams.sw = this._img.width
      this._imageParams.totalCrop = ((this._imageParams.scaleFactor * this._img.height) - this.height) * (1 / this._imageParams.scaleFactor)
      this._imageParams.sy = this._imageParams.totalCrop / 2
      this._imageParams.sh = this._img.height - this._imageParams.totalCrop
    } else {
      // Fit on height
      this._imageParams.scaleFactor = 1 / (this._img.height / this.height)
      this._imageParams.sy = 0
      this._imageParams.sh = this._img.height
      this._imageParams.totalCrop = ((this._imageParams.scaleFactor * this._img.width) - this.width) * (1 / this._imageParams.scaleFactor)
      this._imageParams.sx = (this._imageParams.totalCrop / 2)
      this._imageParams.sw = this._img.width - this._imageParams.totalCrop
    }
    this.redraw()
  }
  draw() {
    super.draw()
    if (this._loaded) {
      this.p5.image(this._img, this.x + 1, this.y + 1, this.width - 1, this.height - 1, this._imageParams.sx, this._imageParams.sy, this._imageParams.sw, this._imageParams.sh)
    } else {
      this.p5.push()
      this.p5.noStroke()
      this.p5.fill(this._color.array)
      this.p5.text('Loading image...', this.x + 5, this.y + 5, this.width, this.height)
      this.p5.pop()
    }
  }
}