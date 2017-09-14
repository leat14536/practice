/**
 * Created by Administrator on 2017/9/13 0013.
 */
export class Projection {
  constructor(min, max) {
    this.min = min
    this.max = max
  }

  // 投影相交则返回true
  overlaps(projection) {
    return this.max > projection.min && projection.max > this.min
  }
}
