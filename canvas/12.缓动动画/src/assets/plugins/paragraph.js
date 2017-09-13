/**
 * Created by Administrator on 2017/9/8 0008.
 */
import TextLine from './textline'

export default class Paragraph {
  constructor(context, left, top, imageData, cursor) {
    this.context = context
    this.drawingSurface = imageData
    this.left = left
    this.top = top
    this.lines = []
    this.activeLine = null
    this.cursor = cursor
    this.blinkingInterval = null
    this.blinkingTimer = null
  }

  isPointInside(loc) {
    const ctx = this.context
    ctx.beginPath()
    ctx.rect(this.left, this.top, this.getWidth(), this.getHeight())

    return ctx.isPointInPath(loc.x, loc.y)
  }

  getHeight() {
    let h = 0
    const ctx = this.context
    this.lines.forEach((line) => {
      h += line.getHeight(ctx)
    })

    return h
  }

  getWidth() {
    let w = 0
    let widest = 0
    const ctx = this.context

    this.lines.forEach(line => {
      w = line.getWidth(ctx)
      if (w > widest) {
        widest = w
      }
    })

    return widest
  }

  draw() {
    const ctx = this.context
    this.lines.forEach(line => {
      line.draw(ctx)
    })
  }

  erase(context, imageData) {
    context.putImageData(imageData, 0, 0)
  }

  addLine(line) {
    this.lines.push(line)
    this.activeLine = line
    this.moveCursor(line.left, line.bottom)
  }

  insert(text) {
    this.erase(this.context, this.drawingSurface)
    this.activeLine.insert(text)
    let t = this.activeLine.text.substring(0, this.activeLine.caret)
    let w = this.context.measureText(t).width
    this.moveCursor(this.activeLine.left + w,
      this.activeLine.bottom)
    this.draw(this.context)
  }

  blinkCursor(x, y) {
    const BLINK_OUT = 200
    const BLINK_INTERVAL = 900
    const cursor = this.cursor
    const ctx = this.context

    clearInterval(this.blinkingInterval)
    clearTimeout(this.blinkingTimer)
    this.blinkingInterval = setInterval(() => {
      cursor.erase(ctx, this.drawingSurface)

      this.blinkingTimer = setTimeout(() => {
        cursor.draw(ctx, cursor.left, cursor.top + cursor.getHeight(ctx))
      }, BLINK_OUT)
    }, BLINK_INTERVAL)
  }

  moveCursorCloseTo(x, y) {
    const line = this.getLine(y)
    const context = this.context

    if (line) {
      line.caret = this.getColumn(line, x)
      this.activeLine = line
      this.moveCursor(line.getCaretX(context), line.bottom)
    }
  }

  moveCursor(x, y) {
    this.cursor.erase(this.context, this.drawingSurface)
    this.cursor.draw(this.context, x, y)
    if (!this.blinkingInterval) {
      this.blinkCursor(x, y)
    }
  }

  moveLinesDown(start) {
    for (let i = start, line; i < this.lines.length; i++) {
      line = this.line[i]
      line.bottom += line.getHeight(this.context)
    }
  }

  newLine() {
    const textBeforeCursor = this.activeLine.text.substring(0, this.activeLine.caret)
    const textAfterCursor = this.activeLine.text.substring(this.activeLine.caret)
    const height = this.context.measureText('W').width +
      this.context.measureText('W').width / 6
    const bottom = this.activeLine.bottom + height
    let activeIndex, line

    this.erase(this.context, this.drawingSurface)
    this.activeLine.text = textBeforeCursor

    line = new TextLine(this.activeLine.left, bottom)
    line.insert(textAfterCursor)

    activeIndex = this.lines.indexOf(this.activeLine)
    this.lines.splice(activeIndex + 1, 0, line)

    this.activeLine = line
    this.activeLine.caret = 0

    activeIndex = this.lines.indexOf(this.activeLine)

    for (var i = activeIndex + 1; i < this.lines.length; ++i) {
      line = this.lines[i]
      line.bottom += height
    }

    this.draw()
    this.cursor.draw(this.context, this.activeLine.left, this.activeLine.bottom)
  }

  getLine(y) {
    var line
    const context = this.context

    for (let i = 0; i < this.lines.length; ++i) {
      line = this.lines[i]
      if (y > line.bottom - line.getHeight(context) &&
        y < line.bottom) {
        return line
      }
    }
  }

  getColumn(line, x) {
    let found = false
    let before, after, closest, tmpLine, column
    const context = this.context

    tmpLine = new TextLine(line.left, line.bottom)
    tmpLine.insert(line.text)

    while (!found && tmpLine.text.length > 0) {
      before = tmpLine.left + tmpLine.getWidth(context)
      tmpLine.removeLastCharacter()
      after = tmpLine.left + tmpLine.getWidth(context)

      if (after < x) {
        closest = x - after < before - x ? after : before
        column = closest === before
          ? tmpLine.text.length + 1
          : tmpLine.text.length
        found = true
      }
    }
    return column
  }

  activeLineIsOutOfText() {
    return this.activeLine.text.length === 0
  }

  activeLineIsTopLine() {
    return this.lines[0] === this.activeLine
  }

  moveUpOneLine() {
    let lastActiveText, line, lastActiveLine, activeIndex

    lastActiveLine = this.activeLine
    lastActiveText = '' + lastActiveLine.text

    activeIndex = this.lines.indexOf(this.activeLine)
    this.activeLine = this.lines[activeIndex - 1]
    this.activeLine.caret = this.activeLine.text.length

    this.lines.splice(activeIndex, 1)

    this.moveCursor(
      this.activeLine.left + this.activeLine.getWidth(this.context),
      this.activeLine.bottom)

    this.activeLine.text += lastActiveText

    for (var i = activeIndex; i < this.lines.length; ++i) {
      line = this.lines[i]
      line.bottom -= line.getHeight(this.context)
    }
  }

  backspace(color) {
    var t, w
    const context = this.context

    this.context.save()

    if (this.activeLine.caret === 0) {
      if (!this.activeLineIsTopLine()) {
        this.erase(this.context, this.drawingSurface)
        this.moveUpOneLine()
        this.draw()
      }
    } else {
      this.context.fillStyle = color
      this.context.strokeStyle = color

      this.erase(this.context, this.drawingSurface)
      this.activeLine.removeCharacterBeforeCaret()

      t = this.activeLine.text.slice(0, this.activeLine.caret)
      w = this.context.measureText(t).width

      this.moveCursor(this.activeLine.left + w,
        this.activeLine.bottom)

      this.draw(this.context)

      context.restore()
    }
  }
}
