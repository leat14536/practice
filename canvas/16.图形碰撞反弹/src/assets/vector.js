/**
 * Created by Administrator on 2017/9/13 0013.
 */
export class Vector {
  constructor(x, y) {
    if (y === undefined && typeof x === 'object') {
      y = x.y
      x = x.x
    }

    this.x = x
    this.y = y
  }

  edge(vector) {
    return this.subtract(vector)
  }

  subtract(vector) {
    // 返回当前线段的向量
    const v = new Vector()
    v.x = this.x - vector.x
    v.y = this.y - vector.y
    return v
  }

  // 向量长度
  getMagnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }

  // 返回垂直向量
  perpendicular() {
    const v = new Vector()
    v.x = this.y
    v.y = 0 - this.x
    return v
  }

  normal() {
    // 返回垂直向量的单位向量
    return this.perpendicular().normalize()
  }

  // 返回单位向量
  normalize() {
    const v = new Vector()
    const m = this.getMagnitude()
    v.x = this.x / m
    v.y = this.y / m
    return v
  }

  // 向量与单位向量的乘积
  dotProduct(vector) {
    return this.x * vector.x + this.y * vector.y
  }
}
