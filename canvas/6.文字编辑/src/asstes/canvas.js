/**
 * Created by Administrator on 2017/9/6 0006.
 */

export default class Canvas {
  constructor({canvas, grid = 10, assistColor = 'red'}) {
    canvas = canvas || document.createElement('canvas')
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.imgData = null
    this.grid = grid
    this.assistColor = assistColor
  }

  getCanvas() {
    return this.canvas
  }

  getContext() {
    return this.context
  }

  saveData() {
    this.imgData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
    return this.imgData
  }

  loadData(imgData = this.imgData, x = 0, y = 0) {
    imgData && this.context.putImageData(imgData, 0, 0)
  }

  drawGrid(color, stepx = this.grid, stepy = this.grid) {
    const ctx = this.context
    const width = this.canvas.width
    const height = this.canvas.height
    ctx.strokeStyle = color || '#aaa'
    for (let i = 0.5 + stepx; i < width; i += stepx) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height)
      ctx.stroke()
      ctx.closePath()
    }
    for (let i = 0.5 + stepy; i < height; i += stepy) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(width, i)
      ctx.stroke()
      ctx.closePath()
    }
  }

  addEvent(event, callback) {
    this.canvas.addEventListener(event, callback)
  }

  drawPattern(pattern) {
    const ctx = this.context
    pattern.stroke(ctx)
    pattern.fill(ctx)
  }

  windowToCanvas(x, y) {
    const bbox = this.canvas.getBoundingClientRect()
    return {
      x: x - bbox.left * (this.canvas.width / bbox.width),
      y: y - bbox.top * (this.canvas.height / bbox.height)
    }
  }

  drawAssist(x, y, color) {
    const ctx = this.context
    ctx.save()

    ctx.strokeStyle = color || this.assistColor
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, this.canvas.height)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(this.canvas.width, y)
    ctx.stroke()
    ctx.closePath()

    ctx.stroke()
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
