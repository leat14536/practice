/**
 * Created by Administrator on 2017/9/14 0014.
 */
import {Vector} from './vector'

function getCircleAxis(circle, polygon, closestPoint) {
  const v1 = new Vector(circle.x, circle.y)
  const v2 = new Vector(closestPoint.x, closestPoint.y)
  return v1.subtract(v2).normalize()
}

export class MinimunTrabslationVector {
  constructor(axis, overlap) {
    this.axis = axis
    this.overlap = overlap
  }
}

export function polygonCollodesWithPolygin(p1, p2) {
  const mtv1 = p1.minmumTranslationVector(p1.getAxes(), p2)
  const mtv2 = p1.minmumTranslationVector(p2.getAxes(), p2)

  if (mtv1.overlap === 0 && mtv2.overlap === 0) {
    return new MinimunTrabslationVector(undefined, 0)
  } else {
    return mtv1.overlap < mtv2.overlap ? mtv1 : mtv2
  }
}

export function circleCollidesWithCircle(c1, c2) {
  const distance = Math.sqrt((c2.x - c1.x) ** 2 + (c2.y - c1.y) ** 2)
  const overlap = Math.abs(c1.radius + c2.radius) - distance
  return overlap < 0
    ? new MinimunTrabslationVector(undefined, 0)
    : new MinimunTrabslationVector(undefined, overlap)
}

export function polygonCollidesWithCircle(polygon, circle) {
  const axes = polygon.getAxes()
  const closrstpoint = getPolygonPointClosestToCircle(polygon, circle)

  axes.push(getCircleAxis(circle, polygon, closrstpoint))

  return polygon.minmumTranslationVector(axes, circle)
}

export function getPolygonPointClosestToCircle(polygon, circle) {
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
