/**
 * Created by Administrator on 2017/9/6 0006.
 */
import Canvas from './asstes/canvas'
import TextCursor from './asstes/textcursor'
import TextLine from './asstes/textline'

const canvas = new Canvas({
  canvas: document.querySelector('#canvas')
})
const context = canvas.getContext()
const textCursor = new TextCursor()
const size = document.querySelector('#size')
const color = document.querySelector('#color')

let imgData
let line
let intervalTimer
canvas.drawGrid()
imgData = canvas.saveData()

setFont()
setColor()

canvas.addEvent('mousedown', (e) => {
  const loc = canvas.windowToCanvas(e.clientX, e.clientY)

  line = new TextLine(loc.x, loc.y)

  moveCursor(loc)
})

document.addEventListener('keydown', e => {
  if (e.keyCode === 8 || e.keyCode === 13) {
    e.preventDefault()
  }

  if (e.keyCode === 8) {
    context.save()
    line.erase(context, imgData)
    line.removeCharacterBeforeCaret()

    moveCursor(line.left + line.getWidth(context),
      line.bottom)

    line.draw(context)

    context.restore()
  }
})

document.addEventListener('keypress', e => {
  const key = String.fromCharCode(e.which)
  if (e.keyCode !== 8 && !e.ctrlKey && !e.metaKey) {
    e.preventDefault()
    context.save()
    line.erase(context, imgData)
    line.insert(key)
    moveCursor(line.left + line.getWidth(context),
      line.bottom)

    line.draw(context)

    context.restore()
  }
})

size.onchange = setFont

color.onchange = setColor

function moveCursor(loc) {
  textCursor.eraser(context, imgData)
  imgData = canvas.saveData()
  textCursor.draw(context, loc.x, loc.y)
  blinkCursor(loc)
}

function blinkCursor(loc) {
  clearInterval(intervalTimer)
  intervalTimer = setInterval(() => {
    textCursor.eraser(context, imgData)

    setTimeout(() => {
      if (textCursor.left === loc.x &&
        textCursor.top + textCursor.getHeight(context) === loc.y) {
        textCursor.draw(context, loc.x, loc.y)
      }
    }, 500)
  }, 1000)
}

function setFont() {
  context.font = size.value + 'px Arial'
}

function setColor() {
  context.fillStyle = color.value
}
