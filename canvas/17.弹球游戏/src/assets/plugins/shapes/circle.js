/**
 * Created by Administrator on 2017/9/14 0014.
 */
import {Shape} from './shape'
import {Point} from './point'
import {Vector} from './vector'
import {Projection} from './projection'
import {BoundingBox} from './boundingbox'
import {polygonCollidesWithCircle, circleCollidesWithCircle} from './minimunTrabslationVector'

export class Circle extends Shape {
  constructor(x, y, radius) {
    super()
    this.x = x
    this.y = y
    this.radius = radius
    this.strokeStyle = 'rgba(255,253,208,0.9)'
    this.fillStyle = 'rgba(147,147,114,0.8)'
  }

  collidesWith(shape) {
    if (shape.radius === undefined) {
      return polygonCollidesWithCircle(shape, this)
    } else {
      return circleCollidesWithCircle(this, shape)
    }
  }

  createPath(context) {
    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  }

  move(dx, dy) {
    this.x += dx
    this.y += dy
  }

  getAxes() {
    return undefined
  }

  project(axis) {
    const scalars = []
    const dotProduct = new Vector(this.x, this.y).dotProduct(axis)

    scalars.push(dotProduct)
    scalars.push(dotProduct + this.radius)
    scalars.push(dotProduct - this.radius)

    return new Projection(Math.min.apply(Math, scalars),
      Math.max.apply(Math, scalars))
  }

  boundingBox() {
    return new BoundingBox(
      this.x - this.radius,
      this.y - this.radius,
      2 * this.radius,
      2 * this.radius
    )
  }

  centroid() {
    return new Point(this.x, this.y)
  }
}
