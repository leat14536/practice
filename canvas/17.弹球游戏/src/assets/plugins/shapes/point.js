/**
 * Created by Administrator on 2017/9/13 0013.
 */
export class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  rotate(rotationPoint, angle) {
    const tx = this.x - rotationPoint.x // tx = translated X
    const ty = this.y - rotationPoint.y // ty = translated Y

    const rx = tx * Math.cos(-angle) - // rx = rotated X
      ty * Math.sin(-angle)

    const ry = tx * Math.sin(-angle) + // ry = rotated Y
      ty * Math.cos(-angle)

    return new Point(rx + rotationPoint.x, ry + rotationPoint.y)
  }
}
