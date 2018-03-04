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
  get isImageRect() { return true }
  loadImg() {
    if (this.url) {
      this._img = this.p5.createImg(this._url, '', this.loadedCallback.bind(this))
      this._img.hide()
    }
  }
  onRoot() {
    this.loadImg()
  }
  get url() { return this._url }
  set url(u) {
    this._loaded = false
    this._url = u
    this.loadImg()
    this.redraw()
  }
  duplicate() {
    return new ImageRect(this._x, this._y, this._width, this._height, this.dx, this.dy, this._url)
  }
  loadedCallback() {
    this._loaded = true
    if (this._img.width / this.nwidth < this._img.height / this.nheight) {
      // Fit on width
      this._imageParams.scaleFactor = 1 / (this._img.width / this.nwidth)
      this._imageParams.sx = 0
      this._imageParams.sw = this._img.width
      this._imageParams.totalCrop = ((this._imageParams.scaleFactor * this._img.height) - this.nheight) * (1 / this._imageParams.scaleFactor)
      this._imageParams.sy = this._imageParams.totalCrop / 2
      this._imageParams.sh = this._img.height - this._imageParams.totalCrop
    } else {
      // Fit on height
      this._imageParams.scaleFactor = 1 / (this._img.height / this.nheight)
      this._imageParams.sy = 0
      this._imageParams.sh = this._img.height
      this._imageParams.totalCrop = ((this._imageParams.scaleFactor * this._img.width) - this.nwidth) * (1 / this._imageParams.scaleFactor)
      this._imageParams.sx = (this._imageParams.totalCrop / 2)
      this._imageParams.sw = this._img.width - this._imageParams.totalCrop
    }
    this.redraw()
  }
  draw() {
    super.draw()
    if (this._loaded) {
      this.p5.image(this._img, this.nx + 1, this.ny + 1, this.nwidth - 1, this.nheight - 1, this._imageParams.sx, this._imageParams.sy, this._imageParams.sw, this._imageParams.sh)
    } else {
      this.p5.push()
      this.p5.noStroke()
      this.p5.fill(this._color.array)
      this.p5.text('Loading image...', this.nx + 5, this.ny + 5, this.nwidth, this.nheight)
      this.p5.pop()
    }
  }
}