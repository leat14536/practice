/**
 * Created by Administrator on 2017/9/6 0006.
 */
import Canvas from './assets/canvas'
import {$} from './assets/plugins/util'
import {Point} from './assets/point'
import {Polygon} from './assets/polygon'

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

let shapes = []
let shapeBeingDragged

const mousedown = {x: 0, y: 0}
const lastdrag = {x: 0, y: 0}

function drawShapes() {
  shapes.forEach(shape => {
    shape.stroke(context)
    shape.fill(context)
  })
}

function detectCollisions() {
  let textY = 30
  shapes.forEach(shape => {
    if (shape !== shapeBeingDragged) {
      if (shapeBeingDragged.collidesWith(shape)) {
        context.fillStyle = shape.fillStyle
        context.fillText('collision', 20, textY)
        textY += 40
      }
    }
  })
}

canvas.addEvent('mousedown', e => {
  const loc = canvas.windowToCanvas(e.x, e.y)

  for (let i = 0, shape = shapes[0]; shape; shape = shapes[i++]) {
    if (shape.isPointInPath(context, loc.x, loc.y)) {
      shapeBeingDragged = shape
      mousedown.x = loc.x
      mousedown.y = loc.y
      lastdrag.x = loc.x
      lastdrag.y = loc.y
      break
    }
  }
})

canvas.addEvent('mousemove', e => {
  if (shapeBeingDragged !== undefined) {
    const loc = canvas.windowToCanvas(e.clientX, e.clientY)
    const dragVector = {
      x: loc.x - lastdrag.x,
      y: loc.y - lastdrag.y
    }

    shapeBeingDragged.move(dragVector.x, dragVector.y)

    lastdrag.x = loc.x
    lastdrag.y = loc.y

    canvas.clear()
    drawShapes()

    // 碰撞检测
    detectCollisions()
  }
})

canvas.addEvent('mouseup', e => {
  shapeBeingDragged = undefined
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

context.shadowColor = 'rgba(100,140,255,0.5)'
context.shadowBlur = 4
context.shadowOffsetX = 2
context.shadowOffsetY = 2
context.font = '38px Arial'

drawShapes()

context.save()
context.fillStyle = 'cornflowerblue'
context.font = '24px Arial'
context.fillText('Drag shapes over each other', 10, 25)
context.restore()
