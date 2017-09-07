/**
 * Created by Administrator on 2017/9/6 0006.
 */
import Canvas from './asstes/canvas'
import {Polygon} from './asstes/polygon'

let side = 4
let isDrag = false
let isMouseDown = false
let currentPolygon
let start
let now
let startAngle = 0
let polygonFillStyle = 'yellow'
let polygonStrokeStyle = '#000'
let assistStyle = 'red'
const polygons = []

function drawPolygns() {
  canvas.clear()
  canvas.drawGrid()
  polygons.forEach((polygon) => {
    canvas.drawPattern(polygon)
  })
}

const canvas = new Canvas({
  canvas: document.querySelector('#canvas')
})

canvas.drawGrid()

canvas.addEvent('mousedown', (e) => {
  if (isMouseDown) return
  e.preventDefault()
  isMouseDown = true
  start = canvas.windowToCanvas(e.clientX, e.clientY)
  if (isDrag) {
    let ctx = canvas.getContext()
    let dragPolygon
    for (let i = polygons.length; --i >= 0;) {
      dragPolygon = polygons[i]
      dragPolygon.createPath(ctx)
      if (ctx.isPointInPath(start.x, start.y)) {
        currentPolygon = polygons.splice(i, 1)[0]
        drawPolygns(currentPolygon)
        break
      }
    }
  } else {
    currentPolygon = new Polygon(
      start.x,
      start.y,
      0,
      side,
      startAngle,
      polygonStrokeStyle,
      polygonFillStyle)
  }
  if (!currentPolygon) return
  canvas.saveData()
  canvas.drawPattern(currentPolygon)
})

canvas.addEvent('mousemove', (e) => {
  if (!isMouseDown) return
  e.preventDefault()
  if (currentPolygon) {
    canvas.loadData()
    now = canvas.windowToCanvas(e.clientX, e.clientY)
    if (isDrag) {
      currentPolygon.move(
        currentPolygon.x + now.x - start.x,
        currentPolygon.y + now.y - start.y
      )
      start = now
    } else {
      currentPolygon.radius = Math.max(Math.abs(now.x - start.x), Math.abs(now.y - start.y))
      canvas.drawAssist(start.x, start.y, assistStyle)
    }
    canvas.drawPattern(currentPolygon)
  }
})

canvas.addEvent('mouseup', (e) => {
  if (!isMouseDown) return
  isMouseDown = false
  if (currentPolygon) {
    canvas.loadData()
    canvas.drawPattern(currentPolygon)
    polygons.push(currentPolygon)
  }
  currentPolygon = start = now = null
})

document.querySelector('#drag').onchange = function () {
  isDrag = this.checked
}

document.querySelector('#assistStyle').onchange = function () {
  assistStyle = this.value
}

document.querySelector('#strokeStyle').onchange = function () {
  polygonStrokeStyle = this.value
  currentPolygon && (currentPolygon.strokeStyle = this.value)
}

document.querySelector('#fillStyle').onchange = function () {
  polygonFillStyle = this.value
  currentPolygon && (currentPolygon.fillStyle = this.value)
}

document.querySelector('#side').onchange = function () {
  side = this.value;
}
