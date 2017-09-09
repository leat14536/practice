/**
 * Created by Administrator on 2017/9/6 0006.
 */
import Canvas from './asstes/canvas'
import TextCursor from './asstes/textcursor'

import TextLine from './asstes/textline'
import Paragraph from './asstes/paragraph'

const canvas = new Canvas({
  canvas: document.querySelector('#canvas')
})
const context = canvas.getContext()
const textCursor = new TextCursor()
const size = document.querySelector('#size')
const color = document.querySelector('#color')

let imgData
let line
let paragraph

imgData = canvas.saveData()

canvas.drawGrid()
setFont()
setColor()

canvas.addEvent('mousedown', (e) => {
  const loc = canvas.windowToCanvas(e.clientX, e.clientY)
  let fontHeight

  textCursor.erase(context, imgData)
  imgData = canvas.saveData()

  if (paragraph && paragraph.isPointInside(loc)) {
    paragraph.moveCursorCloseTo(loc.x, loc.y)
  } else {
    fontHeight = context.measureText('W').width
    fontHeight += fontHeight / 6
    paragraph = new Paragraph(context, loc.x, loc.y - fontHeight, imgData, textCursor)
    line = new TextLine(loc.x, loc.y)
    paragraph.addLine(line)
  }
})

document.addEventListener('keydown', e => {
  if (e.keyCode === 8 || e.keyCode === 13) {
    e.preventDefault()
  }

  if (e.keyCode === 8) {
    paragraph.backspace(color.value)
  }

  if (e.keyCode === 13) {
    paragraph.newLine()
  }
})

document.addEventListener('keypress', e => {
  const key = String.fromCharCode(e.which)

  if (e.keyCode !== 8 && !e.ctrlKey && !e.metaKey) {
    e.preventDefault()
    context.save()
    context.fillStyle = color.value
    context.strokeStyle = color.value

    paragraph.insert(key)
  }
})

size.onchange = setFont

color.onchange = setColor

function setFont() {
  context.font = size.value + 'px Arial'
}

function setColor() {
  context.fillStyle = color.value
}
