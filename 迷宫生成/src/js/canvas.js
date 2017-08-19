/**
 * Created by Administrator on 2017/8/11 0011.
 */

const COLOR_MAX_NUM = 255
const PROPORTION = 10

export default class Canvas {
  constructor({width, height} = {width: 60, height: 40}) {
    const canvas = document.createElement('canvas')
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.width = width
    this.height = height
    this.strokeStyle = '#000'
    this.fillStyle = '#fff'
    canvas.width = width * PROPORTION
    canvas.height = height * PROPORTION
    canvas.style.width = '100%'
    canvas.style.height = '100%'
  }

  getCanvas() {
    return this.canvas
  }

  getContext() {
    return this.context
  }

  drawRoom(x1, y1, width, height, color) {
    x1 = x1 * PROPORTION
    y1 = y1 * PROPORTION
    width = width * PROPORTION
    height = height * PROPORTION
    let ctx = this.context
    ctx.fillStyle = color || randomColor()
    ctx.fillRect(x1, y1, width, height)
    ctx.fill()

    ctx.lineWidth = 0.5
    ctx.strokeStyle = 'rgba(155,155,155,0.1)'
    /* for (let i = x1 + PROPORTION; i < width + x1; i += PROPORTION) {
      ctx.moveTo(i, y1)
      ctx.lineTo(i, y1 + height)
    }

    for (let i = y1 + PROPORTION; i < height + y1; i += PROPORTION) {
      ctx.moveTo(x1, i)
      ctx.lineTo(x1 + width, i)
    }
    ctx.stroke() */
  }

  drawRect(x1, y1, x2, y2, color) {
    this.context.fillStyle = color || '#000'
    let x, y, w, h
    x1 < x2 ? x = x1 : x = x2
    y1 < y2 ? y = y1 : y = y2
    w = Math.abs(x1 - x2) + 1
    h = Math.abs(y1 - y2) + 1
    this.context.fillRect(x * PROPORTION, y * PROPORTION, w * PROPORTION, h * PROPORTION)
  }

  drawOneRect(x, y, color) {
    this.context.fillStyle = color || '#f00'
    this.context.fillRect(x * PROPORTION, y * PROPORTION, PROPORTION, PROPORTION)
  }

  drawMap(maze) {
    let i, j
    let w = this.width
    let h = this.height
    let ctx = this.context
    ctx.clearRect(0, 0, w * PROPORTION, h * PROPORTION)
    ctx.fillStyle = '#fff'
    const map = maze.map
    for (i = 0; i < w; i++) {
      for (j = 0; j < h; j++) {
        if (map[i][j].type !== 0) {
          ctx.fillRect(i * PROPORTION, j * PROPORTION, PROPORTION, PROPORTION)
          ctx.fill()
        }
      }
    }
  }

  draw({rooms, routes, connectPoints, uselessPoints}) {
    function draw(n, cb, callback, time) {
      let i = 0;
      (function drawOnce() {
        setTimeout(() => {
          cb(i)
          if (++i < n) drawOnce()
          else callback()
        }, time)
      })()
    }
    this.context.clearRect(0, 0, this.width * PROPORTION, this.height * PROPORTION)

    let arr = Array.prototype.concat.apply([], routes)
    return new Promise((resolve, reject) => {
      draw(rooms.length, (i) => {
        this.drawRoom(...rooms[i], '#fff')
      }, resolve, 25)
    }).then(() => {
      return new Promise((resolve) => {
        draw(arr.length, (i) => {
          if (arr[i].last) {
            this.drawRect(arr[i].x, arr[i].y, arr[i].last.x, arr[i].last.y, '#fff')
          } else {
            this.drawOneRect(arr[i].x, arr[i].y, '#fff')
          }
        }, resolve, 16)
      })
    }).then(() => {
      return new Promise((resolve) => {
        draw(connectPoints.length, (i) => {
          this.drawOneRect(connectPoints[i].x, connectPoints[i].y, '#fff')
        }, resolve, 16)
      })
    }).then(() => {
      return new Promise(resolve => {
        draw(uselessPoints.length, (i) => {
          this.drawOneRect(uselessPoints[i].x, uselessPoints[i].y, '#000')
        }, resolve, 16)
      })
    })
  }
}

function randomColor() {
  return `rgb(${random(COLOR_MAX_NUM)},${random(COLOR_MAX_NUM)},${random(COLOR_MAX_NUM)})`
}

function random(num) {
  return parseInt(num * Math.random())
}
