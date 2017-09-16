/**
 * Created by Administrator on 2017/9/13 0013.
 */
import {MinimunTrabslationVector} from './minimunTrabslationVector'

function getMTV(shape1, shape2, axes) {
  let minimumOverlap = Number.MAX_SAFE_INTEGER
  let overlap, axisWithSmallestOverlap

  for (let i = 0; i < axes.length; i++) {
    const axis = axes[i]
    const projection1 = shape1.project(axis)
    const projection2 = shape2.project(axis)
    overlap = projection1.getOverlap(projection2)

    if (overlap === 0) {
      return new MinimunTrabslationVector(undefined, overlap)
    } else if (overlap < minimumOverlap) {
      minimumOverlap = overlap
      axisWithSmallestOverlap = axis
    }
  }

  return new MinimunTrabslationVector(axisWithSmallestOverlap, minimumOverlap)
}

export class Shape {
  constructor() {
    this.x = undefined
    this.y = undefined
    this.strokeStyle = 'rgba(255, 253, 208, 0.9)'
    this.fillStyle = 'rgba(147, 197, 114, 0.8)'
  }

  fill(context) {
    context.save()
    context.fillStyle = this.fillStyle
    this.createPath(context)
    context.fill()
    context.restore()
  }

  stroke(context) {
    context.save()
    context.strokeStyle = this.strokeStyle
    this.createPath(context)
    context.stroke()
    context.restore()
  }

  separationOnAxes(axes, shape) {
    for (let i = 0; i < axes.length; ++i) {
      const axis = axes[i]
      const projection1 = shape.project(axis)
      const projection2 = this.project(axis)

      if (!projection1.overlaps(projection2)) {
        return true // don't have to test remaining axes
      }
    }
    return false
  }

  isPointInPath(context, x, y) {
    this.createPath(context)
    return context.isPointInPath(x, y)
  }

  collidesWith(shape) {
    // getAxes => 返回所有边垂直方向的单位向量
    const axes = this.getAxes().concat(shape.getAxes())
    return !this.separationOnAxes(axes, shape)
  }

  minmumTranslationVector(axes, shape) {
    return getMTV(this, shape, axes)
  }

  /* eslint-disable no-throw-literal */
  move(dx, dy) {
    throw 'move(dx, dy) not implemented'
  }

  createPath(context) {
    throw 'createPath(context) not implemented'
  }

  project(axis) {
    throw 'project(axis) not implemented'
  }

  getAxes() {
    throw 'getAxes() not implemented'
  }

  boundingBox() {
    throw 'boundingBox() not implemented'
  }

  centroid() {
    throw 'centroid() not implemented'
  }

  /* eslint-disable no-throw-literal */
}
