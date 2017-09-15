/**
 * Created by Administrator on 2017/9/13 0013.
 */
import {Shape} from './shape'
import {Point} from './point'
import {Vector} from './vector'
import {Projection} from './projection'
import {BoundingBox} from './boundingbox'
import {polygonCollidesWithCircle, polygonCollodesWithPolygin} from './minimunTrabslationVector'
export class Polygon extends Shape {
  constructor() {
    super()
    this.points = []
    this.strokeStyle = 'blue'
    this.fillStyle = 'white'
  }

  collidesWith(shape) {
    if (shape.radius === undefined) {
      return polygonCollodesWithPolygin(this, shape)
    } else {
      return polygonCollidesWithCircle(this, shape)
    }
  }

  addPoint(x, y) {
    this.points.push(new Point(x, y))
  }

  createPath(context) {
    if (this.points.length === 0) return

    context.beginPath()
    context.moveTo(this.points[0].x, this.points[0].y)

    for (let i = 0; i < this.points.length; ++i) {
      context.lineTo(this.points[i].x, this.points[i].y)
    }

    context.closePath()
  }

  getAxes() {
    const v1 = new Vector()
    const v2 = new Vector()
    const len = this.points.length - 1
    const axes = []

    for (let i = 0; i < len; i++) {
      v1.x = this.points[i].x
      v1.y = this.points[i].y

      v2.x = this.points[i + 1].x
      v2.y = this.points[i + 1].y

      axes.push(v1.edge(v2).normal())
    }

    v1.x = this.points[this.points.length - 1].x
    v1.y = this.points[this.points.length - 1].y

    v2.x = this.points[0].x
    v2.y = this.points[0].y

    axes.push(v1.edge(v2).normal())
    return axes
  }

  move(dx, dy) {
    this.points.forEach(point => {
      point.x += dx
      point.y += dy
    })
  }

  project(axis) {
    const scalars = []
    const v = new Vector()

    this.points.forEach(point => {
      v.x = point.x
      v.y = point.y
      // 向量点积 => 点在当前向量上的投影
      scalars.push(v.dotProduct(axis))
    })

    // Projection(min,max) 当前图形的投影位置
    return new Projection(Math.min.apply(Math, scalars),
      Math.max.apply(Math, scalars))
  }

  boundingBox() {
    let minx = Number.MAX_SAFE_INTEGER
    let miny = Number.MAX_SAFE_INTEGER
    let maxx = Number.MIN_SAFE_INTEGER
    let maxy = Number.MIN_SAFE_INTEGER

    this.points.forEach(point => {
      minx = Math.min(minx, point.x)
      miny = Math.min(miny, point.y)
      maxx = Math.max(maxx, point.x)
      maxy = Math.max(maxy, point.y)
    })

    return new BoundingBox(minx, miny,
      parseFloat(maxx - minx),
      parseFloat(maxy - miny))
  }

  centroid() {
    const pointSum = new Point(0, 0)

    this.points.forEach(point => {
      pointSum.x += point.x
      pointSum.y += point.y
    })

    return new Point(pointSum.x / this.points.length,
      pointSum.y / this.points.length)
  }
}
