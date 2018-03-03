class MathUtils {
  constructor() { }
  sqr(x) { return x * x }
  dist2(v, w) { return this.sqr(v.x - w.x) + this.sqr(v.y - w.y) }
  distToSegmentSquared(p, v, w) {
    let l2 = this.dist2(v, w);
    if (l2 == 0) return this.dist2(p, v);
    var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    return this.dist2(p, { x: v.x + t * (w.x - v.x),
                      y: v.y + t * (w.y - v.y) });
  }
  distToSegment(p, v, w) { return Math.sqrt(this.distToSegmentSquared(p, v, w)); }
}

export default new MathUtils()