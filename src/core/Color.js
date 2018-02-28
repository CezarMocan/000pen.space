export default class Color {
  constructor(r, g, b, alpha) {
    this.r = r
    this.g = g
    this.b = b
    this.alpha = (alpha === 0 ? 0 : (alpha || 255))
  }
  get array() {
    return [this.r, this.g, this.b, Math.floor(255 * this.alpha)]
  }
}