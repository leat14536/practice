/**
 * Created by Administrator on 2017/9/6 0006.
 */
/*
  Polygon:
    getPoints 获取所有点坐标 @return Array<point>
    createPath 创建canvas路径
    stroke
    fill
    move 移动x, y坐标
* */
let uid = 0

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

export class Polygon {
  constructor(startX, startY, radius, side, startAngle, strokeStyle, fillStyle) {
    this.id = ++uid
    this.x = startX
    this.y = startY
    this.radius = radius
    this.side = side
    this.starAngle = startAngle
    this.strokeStyle = strokeStyle
    this.fillStyle = fillStyle
  }

  getPoints() {
    const points = []
    let angle = this.starAngle || 0
    for (let i = 0, l = this.side; i < l; i++) {
      points.push(new Point(this.x + this.radius * Math.sin(angle),
        this.y - this.radius * Math.cos(angle)))
      angle += 2 * Math.PI / this.side
    }
    return points
  }

  createPath(context) {
    const points = this.getPoints()

    context.beginPath()
    context.moveTo(points[0].x, points[0].y)
    for (let i = 1, l = this.side; i < l; i++) {
      context.lineTo(points[i].x, points[i].y)
    }

    context.closePath()
  }

  stroke(context) {
    context.save()
    this.createPath(context)
    context.strokeStyle = this.strokeStyle
    context.stroke()
    context.restore()
  }

  fill(context) {
    context.save()
    this.createPath(context)
    context.fillStyle = this.fillStyle
    context.fill()
    context.restore()
  }

  move(x, y) {
    this.x = x
    this.y = y
  }
}
