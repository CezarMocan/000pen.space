export default class Color {
  constructor(r, g, b, alpha) {
    if (Array.isArray(r)) {
      this.r = r[0]
      this.g = r[1]
      this.b = r[2]
      this.alpha = (r[3] === 0 ? 0 : (r[3] || 255))
      return
    }
    this.r = r
    this.g = g
    this.b = b
    this.alpha = (alpha === 0 ? 0 : (alpha || 255))
  }
  get array() {
    return [this.r, this.g, this.b, Math.floor(255 * this.alpha)]
  }
}