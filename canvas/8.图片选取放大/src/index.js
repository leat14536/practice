/**
 * Created by Administrator on 2017/9/6 0006.
 */
import Canvas from './asstes/canvas'
import {$} from './asstes/util'
import imgSrc from './asstes/images/countrypath.jpg'

const canvas = new Canvas({
  canvas: $('#canvas')
})
const context = canvas.context
const image = new Image()
const reset = $('#reset')
const mousedown = {x: null, y: null}
const rubberbandRectangle = {left: null, top: null, width: null, height: null}

let imageData
let imageDataCopy = canvas.createData()

let dragging = false
image.src = imgSrc
image.onload = () => {
  initial()
  reset.onclick = initial
}

function initial() {
  canvas.clear()
  context.drawImage(image, 0, 0, canvas.width, canvas.height)
}

canvas.addEvent('mousedown', e => {
  const loc = canvas.windowToCanvas(e.clientX, e.clientY)
  e.preventDefault()
  // 存储mousedown坐标 rubberbandRectangle初始位置 imageData
  // copyimagedata 存储透明度为0.5的数据
  rubberbandStart(loc)
})

canvas.addEvent('mousemove', e => {
  if (dragging) {
    const loc = canvas.windowToCanvas(e.clientX, e.clientY)
    rubberbandStretch(loc)
  }
})

document.addEventListener('mouseup', () => {
  if (!dragging) return
  dragging = false
  rubberbandEnd()
})

function rubberbandEnd() {
  context.putImageData(imageData, 0, 0)
  context.drawImage(canvas.canvas,
    rubberbandRectangle.left + context.lineWidth * 2,
    rubberbandRectangle.top + context.lineWidth * 2,
    rubberbandRectangle.width - 4 * context.lineWidth,
    rubberbandRectangle.height - 4 * context.lineWidth,
    0, 0, canvas.width, canvas.height)
  dragging = false
  imageData = null
}

function rubberbandStart({x, y}) {
  mousedown.x = x
  mousedown.y = y

  rubberbandRectangle.left = mousedown.x
  rubberbandRectangle.top = mousedown.y

  dragging = true
  captureCabvasPixels()
}

function captureCabvasPixels() {
  imageData = canvas.saveData()
  copyCanvasPixels()
}

function copyCanvasPixels() {
  let i = 0

  for (i = 0; i < 3; i++) {
    imageDataCopy.data[i] = imageData.data[i]
  }

  for (i = 3; i < imageData.data.length - 4; i += 4) {
    imageDataCopy.data[i] = imageData.data[i] / 2
    imageDataCopy.data[i + 1] = imageData.data[i + 1]
    imageDataCopy.data[i + 2] = imageData.data[i + 2]
    imageDataCopy.data[i + 3] = imageData.data[i + 3]
  }
}

function rubberbandStretch(loc) {
  if (imageData !== undefined) {
    restoreRubberbandPixels()
  }
  // 重置rubberbandRectangle四维
  setRubberbandRectangle(loc)

  drawRubberband()
}

function drawRubberband() {
  context.strokeRect(
    rubberbandRectangle.left + context.lineWidth,
    rubberbandRectangle.top + context.lineWidth,
    rubberbandRectangle.width - 2 * context.lineWidth,
    rubberbandRectangle.height - 2 * context.lineWidth
  )
}

function restoreRubberbandPixels() {
  // const deviceWidthOverCSSPixels = imageData.width / rubberbandRectangle.width
  // const deviceHeightOverCSSPixels = imageData.height / rubberbandRectangle.height

  context.putImageData(imageData, 0, 0)

  context.putImageData(imageDataCopy, 0, 0,
    rubberbandRectangle.left + context.lineWidth,
    rubberbandRectangle.top + context.lineWidth,
    rubberbandRectangle.width - 2 * context.lineWidth,
    rubberbandRectangle.height - 2 * context.lineWidth
  )
}

function setRubberbandRectangle({x, y}) {
  rubberbandRectangle.left = Math.min(x, mousedown.x)
  rubberbandRectangle.top = Math.min(y, mousedown.y)
  rubberbandRectangle.width = Math.abs(x - mousedown.x)
  rubberbandRectangle.height = Math.abs(y - mousedown.y)
}
