/**
 * Created by Administrator on 2017/9/6 0006.
 */
import Canvas from './assets/canvas'
import {$} from './assets/plugins/util'
import {Point} from './assets/point'
import {Polygon} from './assets/polygon'
import {Circle} from './assets/circle'
import {Vector} from './assets/vector'
import {requestNextAnimationFrame} from './assets/plugins/requestNextAnimationFrame'

const canvas = new Canvas({canvas: $('#canvas')})
const context = canvas.context

const polygonPoints = [
  [new Point(250, 150), new Point(250, 250), new Point(350, 250)],
  [new Point(100, 100), new Point(100, 150), new Point(150, 150), new Point(150, 100)],
  [new Point(400, 100), new Point(380, 150), new Point(500, 150), new Point(520, 100)]
]
const polygonStrokeStyles = ['blue', 'yellow', 'red']
const polygonFillStyles = [
  'rgba(255,255,0,0.7)',
  'rgba(100,140,230,0.6)',
  'rgba(255,255,255,0.8)'
]

const c1 = new Circle(150, 175, 20)
const c2 = new Circle(350, 50, 30)

let shapes = []
let lastTime = 0
let shapeMoving
let showInstructions

const velocity = {x: 350, y: 190}
const lastVelocity = {x: 350, y: 190}

function drawShapes() {
  shapes.forEach(shape => {
    shape.stroke(context)
    shape.fill(context)
  })
}

function animate(time) {
  if (lastTime === 0) {
    // 初始化lastTime
    lastTime = time
    requestNextAnimationFrame(animate)
    return
  }

  canvas.clear()
  canvas.drawGrid('lightgray')
  if (shapeMoving !== undefined) {
    // 移动 选中的图形
    const elapsedTime = parseFloat(time - lastTime) / 1000
    shapeMoving.move(velocity.x * elapsedTime,
      velocity.y * elapsedTime)

    // 碰撞/撞墙反弹
    detectCollisions()
  }
  drawShapes()
  lastTime = time

  if (showInstructions) {
    context.fillStyle = 'cornflowerblue'
    context.font = '24px Arial'
    context.fillText('Click on a shape to animate it', 20, 40)
  }

  requestNextAnimationFrame(animate)
}

function separate(mtv) {
  if (mtv.axis === undefined) {
    // 两个圆形碰撞
    const velocityMagnitude = Math.sqrt(velocity.x ** 2 + velocity.y ** 2)
    const x = velocity.x / velocityMagnitude
    const y = velocity.y / velocityMagnitude

    mtv.axis = new Vector(x, y)
  }

  let dy = mtv.axis.y * mtv.overlap
  let dx = mtv.axis.x * mtv.overlap
  if ((dx < 0 && velocity.x < 0) || (dx > 0 && velocity.x > 0)) {
    dx = -dx
  }

  if ((dy < 0 && velocity.y < 0) || (dy > 0 && velocity.y > 0)) {
    dy = -dy
  }

  shapeMoving.move(dx, dy)
}

function bounce(mtv, collider, collidee) {
  if (!shapeMoving) return
  let perpendicular

  const velocityVector = new Vector(velocity.x, velocity.y)
  // 当前运动方向的单位向量
  const velocityUnitVector = velocityVector.normalize()
  const velocityVectorMagnitude = velocityVector.getMagnitude()

  // 修正分离polygon的向量朝向
  checkMTVAxisDirection(...arguments)

  const point = new Point()

  // 重叠方向的垂直向量
  if (mtv.axis) {
    perpendicular = mtv.axis.perpendicular()
  } else {
    perpendicular = new Vector(-velocityUnitVector.y, velocityUnitVector.x)
  }

  // v: 速度向量
  // l: 边缘法向量
  // 反弹公式 2 * (v * l) / (l * l) - v
  const vdotl = velocityUnitVector.dotProduct(perpendicular)
  const ldotl = perpendicular.dotProduct(perpendicular)
  const dotProductRatio = vdotl / ldotl

  point.x = 2 * dotProductRatio * perpendicular.x - velocityUnitVector.x
  point.y = 2 * dotProductRatio * perpendicular.y - velocityUnitVector.y

  separate(mtv)

  velocity.x = point.x * velocityVectorMagnitude
  velocity.y = point.y * velocityVectorMagnitude
}

function collisionDetected(mtv) {
  return mtv.axis !== undefined || mtv.overlap
}

function detectCollisions() {
  if (shapeMoving) {
    handleShapeCollisions()
    handleEdgeCollisions()
  }
}

function handleShapeCollisions() {
  shapes.forEach(shape => {
    if (shape !== shapeMoving) {
      const mtv = shapeMoving.collidesWith(shape)
      collisionDetected(mtv) && bounce(mtv, shapeMoving, shape)
    }
  })
}

function handleEdgeCollisions() {
  const bbox = shapeMoving.boundingBox()
  const right = bbox.left + bbox.width
  const bottom = bbox.top + bbox.height

  // 撞墙掉头 修正位置
  if (right > canvas.width || bbox.left < 0) {
    velocity.x = -velocity.x

    if (right > canvas.width) shapeMoving.move(0 - (right - canvas.width), 0)

    if (bbox.left < 0) shapeMoving.move(-bbox.left, 0)
  }

  if (bottom > canvas.height || bbox.top < 0) {
    velocity.y = -velocity.y

    if (bottom > canvas.height) shapeMoving.move(0, 0 - (bottom - canvas.height))
    if (bbox.top < 0) shapeMoving.move(0, -bbox.top)
  }
}

function checkMTVAxisDirection(mtv, collider, collidee) {
  if (!mtv.axis) return

  // 中心点向量
  const centroid1 = new Vector(collidee.centroid())
  const centroid2 = new Vector(collidee.centroid())
  // 中心点连线向量
  const centroidVector = centroid2.subtract(centroid1)
  // 中心点连线单位向量
  const centroidUnitVector = centroidVector.normalize()

  if (centroidUnitVector.dotProduct(mtv.axis) > 0) {
    mtv.axis.x = -mtv.axis.x
    mtv.axis.y = -mtv.axis.y
  }
}

canvas.addEvent('mousedown', e => {
  const loc = canvas.windowToCanvas(e.x, e.y)

  if (showInstructions) showInstructions = false

  velocity.x = lastVelocity.x
  velocity.y = lastVelocity.y

  shapeMoving = undefined

  shapes.forEach(function (shape) {
    if (shape.isPointInPath(context, loc.x, loc.y)) {
      shapeMoving = shape
    }
  })
})

for (let i = 0; i < polygonPoints.length; ++i) {
  const polygon = new Polygon()
  const points = polygonPoints[i]

  polygon.strokeStyle = polygonStrokeStyles[i]
  polygon.fillStyle = polygonFillStyles[i]

  points.forEach(function (point) {
    polygon.addPoint(point.x, point.y)
  })

  shapes.push(polygon)
}

c1.fillStyle = 'rgba(200, 50, 50, 0.5)'

shapes.push(c1)
shapes.push(c2)

context.shadowColor = 'rgba(100,140,255,0.5)'
context.shadowBlur = 4
context.shadowOffsetX = 2
context.shadowOffsetY = 2
context.font = '38px Arial'

requestNextAnimationFrame(animate)
