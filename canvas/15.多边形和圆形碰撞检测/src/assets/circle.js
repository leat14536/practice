/**
 * Created by Administrator on 2017/9/14 0014.
 */
import {Shape} from './shape'
import {Vector} from './vector'
import {Projection} from './projection'

function getPolygonPointClosestToCircle(circle, polygon) {
  let closestPoint
  let min = Number.MAX_SAFE_INTEGER
  const points = polygon.points
  for (let i = 0, point = points[0]; point; point = points[i++]) {
    const length = Math.sqrt(Math.pow(point.x - circle.x, 2),
      Math.pow(point.y - circle.y, 2))
    if (length < min) {
      min = length
      closestPoint = point
    }
  }

  return closestPoint
}

export function polygonCollidesWithCircle(circle, polygon) {
  const axes = polygon.getAxes()
  const closestPoint = getPolygonPointClosestToCircle(circle, polygon)
  const v1 = new Vector(circle.x, circle.y)
  const v2 = new Vector(closestPoint.x, closestPoint.y)
  axes.push(v1.subtract(v2).normalize())

  return !polygon.separationOnAxes(axes, circle)
}

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
    const axes = shape.getAxes()
    if (axes === undefined) { // circle
      const distance = Math.sqrt(Math.pow(shape.x - this.x, 2) +
        Math.pow(shape.y - this.y, 2))
      return distance < Math.abs(this.radius + shape.radius)
    } else {
      return polygonCollidesWithCircle(this, shape, axes)
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
}
