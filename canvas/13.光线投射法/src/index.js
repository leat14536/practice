/**
 * Created by Administrator on 2017/9/6 0006.
 */
import Canvas from './assets/canvas'
import {$, loadImage} from './assets/plugins/util'
import {requestNextAnimationFrame} from './assets/plugins/requestNextAnimationFrame'
import {Sprite} from './assets/plugins/sprite'
import bucketSrc from './assets/images/bucket.png'

const canvas = new Canvas({canvas: $('#canvas')})
const context = canvas.context

const launchVelocityOutput = $('#launchVelocityOutput')
const launchAngleOutput = $('#launchAngleOutput')
const scoreBoard = $('#score')
const stateOutput = $('#state')

const ARENA_LENGTH_IN_METERS = 10
const LAUNCHPAD_X = 50
const LAUNCHPAD_Y = canvas.height - 50
const BUCKET_X = 668
const BUCKET_Y = canvas.height - 100
const BALL_RADIUS = 8
const LAUNCHPAD_WIDTH = 50
const LAUNCHPAD_HEIGHT = 12
const pixelsPerMeter = canvas.width / ARENA_LENGTH_IN_METERS

const lastMouse = {left: 0, top: 0}

let ball, bucket, launchPad

let ballInFlight = false
let bucketImage
let launchTime = 0
let launchAngle
let launchVelocity
let lastScore = 0
let needInstructions = true
let loc
let score = 0
let threePointer
let currentTime
let lastBallPosition = {left: 0, top: 0}

const ballPainter = {
  BALL_FILL_STYLE: 'rgb(255,255,0)',
  BALL_STROKE_STYLE: 'rgb(0,0,0,0.4)',

  paint: function (ball, context) {
    context.save()
    context.shadowColor = undefined
    context.lineWidth = 2
    context.fillStyle = this.BALL_FILL_STYLE
    context.strokeStyle = this.BALL_STROKE_STYLE

    context.beginPath()
    context.arc(ball.left, ball.top,
      ball.radius, 0, Math.PI * 2, false)

    context.clip()
    context.fill()
    context.stroke()
    context.restore()
  }
}
const lob = {
  lastTime: 0,
  GRAVITY_FORCE: 9.81,
  applyGravity(elapsed) {
    ball.velocityY = (this.GRAVITY_FORCE * elapsed) -
      (launchVelocity * Math.sin(launchAngle))
  },
  updateBallPosition(updateDelta) {
    ball.left += ball.velocityX * updateDelta * pixelsPerMeter
    ball.top += ball.velocityY * updateDelta * pixelsPerMeter
  },
  checkForThreePointer: function () {
    if (ball.top < 0) {
      threePointer = true
    }
  },
  checkBallBounds: function () {
    if (ball.top > canvas.height || ball.left > canvas.width) {
      reset()
    }
  },
  execute(ball, context, time) {
    lastBallPosition.left = ball.left
    lastBallPosition.top = ball.top
    if (ballInFlight) {
      const elapsedFrameTime = (time - this.lastTime) / 1000
      const elapsedFlightTime = (time - launchTime) / 1000

      this.applyGravity(elapsedFlightTime)
      this.updateBallPosition(elapsedFrameTime)
      this.checkForThreePointer()
      this.checkBallBounds()
    }
    this.lastTime = time
  }
}
const catchBall = {
  intersectionPoint: {x: 0, y: 0},
  ballInBucket(bucket) {
    // 垂直或水平飞行
    if (lastBallPosition.left === ball.left ||
      lastBallPosition.top === ball.top) {
      return
    }

    // 上一帧的位置
    const x1 = lastBallPosition.left
    const y1 = lastBallPosition.top

    // 当前位置
    const x2 = ball.left
    const y2 = ball.top

    // 桶的左边
    const x3 = bucket.left + bucket.width * 0.35
    const y3 = bucket.top

    // 桶的右边
    const x4 = bucket.left + bucket.width * 0.9
    const y4 = y3

    // 斜率
    const m1 = (y2 - y1) / (x2 - x1)
    const m2 = (y4 - y3) / (x4 - x3)

    // b = y - kx
    const b1 = y1 - m1 * x1
    const b2 = y3 - m2 * x3

    context.moveTo(ball.left, ball.top)
    context.lineTo(ball.left + 30, m1 * (ball.left + 30) + b1)
    context.stroke()

    // 交点坐标
    // k1 * x - b1 = k2 * x - b2 =>
    // x = (k1 - k2) / (b1 - b2)  化简
    // y = k1 * x + b1   带入公式
    this.intersectionPoint.x = (b2 - b1) / (m1 - m2)
    this.intersectionPoint.y = m1 * this.intersectionPoint.x + b1

    context.beginPath()
    context.arc(this.intersectionPoint.x, this.intersectionPoint.y, 10, 0, Math.PI * 2)
    context.fill()

    return this.intersectionPoint.x > x3 &&
      this.intersectionPoint.y < x4 &&
      ball.top > y3 &&
      ball.top < y3 + BALL_RADIUS * 4
  },
  adjustScore() {
    if (threePointer) lastScore = 3
    else lastScore = 2

    score += lastScore
    scoreBoard.innerText = score
  },
  execute(bucket) {
    if (ballInFlight && this.ballInBucket(bucket)) {
      reset()
      this.adjustScore()
    }
  }
}

const launchPadPainter = {
  LAUNCHPAD_FILL_STYLE: 'rgb(100,140,230)',

  paint: function (ledge, context) {
    context.save()
    context.fillStyle = this.LAUNCHPAD_FILL_STYLE
    context.fillRect(LAUNCHPAD_X, LAUNCHPAD_Y,
      LAUNCHPAD_WIDTH, LAUNCHPAD_HEIGHT)
    context.restore()
  }
}

ball = new Sprite('ball', ballPainter, [lob])
bucket = new Sprite('bucket', {
  paint(sprite, context) {
    context.drawImage(bucketImage, BUCKET_X, BUCKET_Y)
  }
}, [catchBall])
launchPad = new Sprite('launchPad', launchPadPainter)

function reset() {
  ball.left = LAUNCHPAD_X + LAUNCHPAD_WIDTH / 2
  ball.top = LAUNCHPAD_Y - ball.height / 2
  ball.velocityX = 0
  ball.velocityY = 0
  ballInFlight = false
  needInstructions = true
  lastScore = 0
}

function animate(time) {
  currentTime = time
  canvas.clear()
  if (!ballInFlight) {
    // 辅助线
    drawGuidewire()

    // 输出当前状态
    updateBackgroundText()
    if (lastScore !== 0) {
      resetScoreLater()
    }
  }

  updateSprites(time)
  painSprites()

  requestNextAnimationFrame(animate)
}

function resetScoreLater() {
  setTimeout(function () {
    lastScore = 0
  }, 1000)
}

function updateSprites(time) {
  bucket.update(context, time)
  launchPad.update(context, time)
  ball.update(context, time)
}

function painSprites() {
  launchPad.paint(context)
  bucket.paint(context)
  ball.paint(context)
}

function updateBackgroundText() {
  if (lastScore === 3) showText('Three pointer!')
  else if (lastScore === 2) showText('Nice shot!')
  else if (needInstructions) showText('Click to launch ball')
}

function showText(str) {
  stateOutput.innerText = str
}

function drawGuidewire() {
  context.moveTo(ball.left, ball.top)
  context.lineTo(lastMouse.left, lastMouse.top)
  context.stroke()
};

loadImage(bucketSrc).then((image) => {
  bucketImage = image
  bucket.left = BUCKET_X
  bucket.top = BUCKET_Y
  bucket.width = bucketImage.width
  bucket.height = bucketImage.height

  requestNextAnimationFrame(animate)
}, () => alert('图片加载失败'))

canvas.addEvent('mousedown', e => {
  e.preventDefault()

  if (!ballInFlight) {
    ball.velocityX = launchVelocity * Math.cos(launchAngle)
    ball.velocityY = launchVelocity * Math.sin(launchAngle)
    ballInFlight = true
    threePointer = false
    launchTime = currentTime
  }
})
canvas.addEvent('mousemove', e => {
  e.preventDefault()

  if (!ballInFlight) {
    loc = canvas.windowToCanvas(e.clientX, e.clientY)
    lastMouse.left = loc.x
    lastMouse.top = loc.y

    const deltaX = Math.abs(lastMouse.left - ball.left)
    const deltaY = Math.abs(lastMouse.top - ball.top)

    launchAngle = Math.atan(parseFloat(deltaY) / parseFloat(deltaX))
    launchVelocity = 4 * deltaY / Math.sin(launchAngle) / pixelsPerMeter

    launchVelocityOutput.innerText = launchVelocity.toFixed(2)
    launchAngleOutput.innerText = (launchAngle * 180 / Math.PI).toFixed(2)
  }
})

ball.height = ball.width = BALL_RADIUS * 2
ball.left = LAUNCHPAD_X + LAUNCHPAD_WIDTH / 2
ball.top = LAUNCHPAD_Y - ball.height / 2
ball.radius = BALL_RADIUS

context.lineWidth = 0.5
context.strokeStyle = 'rgba(0,0,0,0.5)'
context.shadowColor = 'rgba(0,0,0,0.5)'
context.shadowOffsetX = 2
context.shadowOffsetY = 2
context.shadowBlur = 4
context.stroke()
