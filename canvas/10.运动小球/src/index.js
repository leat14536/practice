/**
 * Created by Administrator on 2017/9/6 0006.
 */
import Canvas from './assets/canvas'
import {$, calculateFps} from './assets/plugins/util'
import {requestNextAnimationFrame} from './assets/plugins/requestNextAnimationFrame'
import {Sprite} from './assets/plugins/sprite'

import {AnimationTimer} from './assets/plugins/stopwatch'
const canvas = new Canvas({canvas: $('#canvas')})
const context = canvas.context

const thrusterCanvas = new Canvas({canvas: $('#thrusterCanvas')})
const thrusterContext = thrusterCanvas.context

// 推动动画计时器
const pushAnimationTimer = new AnimationTimer()

// 下落动画计时器
const fallingAnimationTimer = new AnimationTimer()

const ARROW_MARGIN = 10
const GRAVITY_FORCE = 9.81
const LEDGE_TOP = 55
const LEDGE_LEFT = 280
const LEDGE_WIDTH = 50
const BALL_RADIUS = 23
const PLATFORM_HEIGHT_IN_METERS = 10

const LEFT = 2
const pixelsPerMeter = (canvas.height - LEDGE_TOP) /
  PLATFORM_HEIGHT_IN_METERS

let arrow = LEFT
let fps = 60

const moveBall = {
  lastFrameTime: undefined,
  execute: function (sprite, context, time) {
    const now = +new Date()
    if (this.lastFrameTime === undefined) {
      this.lastFrameTime = now
      return
    }

    if (pushAnimationTimer.isRunning()) {
      if (arrow === LEFT) sprite.left -= sprite.velocityX / fps
      else sprite.left += sprite.velocityX / fps

      if (isBallOnLedge()) {
        if (pushAnimationTimer.getElapsedTime() > 200) {
          pushAnimationTimer.stop()
        }
      } else if (!fallingAnimationTimer.isRunning()) {
        startFalling()
        this.lastFrameTime = now
      }
    }

    if (fallingAnimationTimer.isRunning()) {
      sprite.top += sprite.velocityY / fps
      sprite.velocityY = GRAVITY_FORCE *
        (fallingAnimationTimer.getElapsedTime() / 1000) * pixelsPerMeter

      if (sprite.top > canvas.height) {
        stopFalling()
      }
    }
  }
}

const ball = new Sprite('ball', {
  paint(sprite, context) {
    context.save()
    context.beginPath()
    context.arc(sprite.left + sprite.width / 2, sprite.top + sprite.height / 2,
      BALL_RADIUS, 0, Math.PI * 2, false)
    context.clip()

    context.shadowColor = 'rgba(0,0,255,0.7)'
    context.shadowOffsetX = -4
    context.shadowOffsetY = -4
    context.shadowBlur = 8

    context.lineWidth = 2
    context.strokeStyle = 'rgba(100,100,195,0.8)'
    context.stroke()

    context.beginPath()
    context.arc(sprite.left + sprite.width / 2, sprite.top + sprite.height / 2,
      BALL_RADIUS / 2, 0, Math.PI * 2, false)
    context.clip()

    context.shadowColor = 'rgba(255,255,0,1.0)'
    context.shadowOffsetX = -4
    context.shadowOffsetY = -4
    context.shadowBlur = 8
    context.stroke()

    context.restore()
  }
}, [moveBall])

const ledge = new Sprite('ledge', {
  paint: function (sprite, context) {
    context.save()
    context.shadowColor = 'rgba(0,0,0,0.5)'
    context.shadowBlur = 8
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2

    context.fillStyle = 'rgba(255,255,0,0.6)'
    context.strokeStyle = 'rgba(0,0,0,0.6)'
    context.beginPath()
    context.rect(sprite.left, sprite.top, sprite.width, sprite.height)
    context.fill()
    context.stroke()
    context.restore()
  }
})

thrusterContext.strokeStyle = 'rgba(100,140,230,0.6)'
thrusterContext.shadowColor = 'rgba(0,0,0,0.3)'
thrusterContext.shadowBlur = 6
thrusterContext.shadowX = 4
thrusterContext.shadowY = 4

ball.left = LEDGE_LEFT + LEDGE_WIDTH / 2 - BALL_RADIUS
ball.top = LEDGE_TOP - BALL_RADIUS * 2
ball.width = BALL_RADIUS * 2
ball.height = BALL_RADIUS * 2

ball.velocityX = 110
ball.velocityY = 0

ledge.left = LEDGE_LEFT
ledge.top = LEDGE_TOP
ledge.width = LEDGE_WIDTH

requestNextAnimationFrame(animate)

thrusterCanvas.addEvent('mousedown', (e) => {
  e.preventDefault()
  e.stopPropagation()

  pushBallLeft()
})

function animate(time) {
  fps = calculateFps()
  canvas.clear()
  canvas.drawGrid('lightgray')

  ball.update(context, time)
  ledge.update(context, time)

  ledge.paint(context)
  ball.paint(context)

  paintThruster()

  requestNextAnimationFrame(animate)
}

function stopFalling() {
  fallingAnimationTimer.stop()
  pushAnimationTimer.stop()

  ball.left = LEDGE_LEFT + LEDGE_WIDTH / 2 - BALL_RADIUS
  ball.top = LEDGE_TOP - BALL_RADIUS * 2

  ball.velocityY = 0
}

function pushBallLeft() {
  if (pushAnimationTimer.isRunning()) {
    pushAnimationTimer.stop()
  }
  arrow = LEFT
  pushAnimationTimer.start()
}

function isBallOnLedge() {
  return ball.left + BALL_RADIUS > LEDGE_LEFT &&
    ball.left < LEDGE_LEFT + LEDGE_WIDTH
}

function startFalling() {
  fallingAnimationTimer.start()
  ball.velocityY = 0
}

function paintThruster() {
  thrusterCanvas.clear()

  if (pushAnimationTimer.isRunning()) thrusterContext.fillStyle = 'rgba(255,255,0,0.5)'
  else thrusterContext.fillStyle = 'rgba(100,140,255,0.5)'

  // 画箭头
  paintArrow(thrusterContext)
}

function paintArrow(context) {
  context.save()
  context.beginPath()

  context.moveTo(thrusterCanvas.width - ARROW_MARGIN / 2,
    ARROW_MARGIN / 2)

  context.lineTo(thrusterCanvas.width - ARROW_MARGIN / 2,
    thrusterCanvas.height - ARROW_MARGIN)

  context.quadraticCurveTo(thrusterCanvas.width - ARROW_MARGIN / 2,
    thrusterCanvas.height - ARROW_MARGIN / 2,
    thrusterCanvas.width - ARROW_MARGIN,
    thrusterCanvas.height - ARROW_MARGIN / 2)

  context.lineTo(ARROW_MARGIN / 2,
    thrusterCanvas.height / 2 + ARROW_MARGIN / 2)

  context.quadraticCurveTo(ARROW_MARGIN / 2 - 6,
    thrusterCanvas.height / 2,
    ARROW_MARGIN, thrusterCanvas.height / 2 - ARROW_MARGIN / 2)

  context.lineTo(thrusterCanvas.width - ARROW_MARGIN,
    ARROW_MARGIN / 2)

  context.quadraticCurveTo(thrusterCanvas.width - ARROW_MARGIN,
    ARROW_MARGIN / 2, thrusterCanvas.width - ARROW_MARGIN / 2,
    ARROW_MARGIN / 2)
  context.fill()

  context.shadowColor = 'rgba(0,0,0,1.0)'
  context.shadowBlur = 8
  context.shadowOffsetX = 4
  context.shadowOffsetY = 4

  context.stroke()
  context.restore()
}
