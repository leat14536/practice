/**
 * Created by Administrator on 2017/9/13 0013.
 */
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
  /* eslint-disable no-throw-literal */
}
