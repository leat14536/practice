/**
 * Created by Administrator on 2017/9/6 0006.
 */
import Canvas from './assets/canvas'
import {$} from './assets/plugins/util'
import {Sprite} from './assets/plugins/sprite'
import {AnimationTimer} from './assets/plugins/stopwatch'
import {requestNextAnimationFrame} from './assets/plugins/requestNextAnimationFrame'

const canvas = new Canvas({canvas: $('#canvas')})
const context = canvas.context
const thrustersCanvas = new Canvas({canvas: $('#thrustersCanvas')})
const thrustersContext = thrustersCanvas.context

const linearCheckbox = $('#linearCheckbox')
const easeInCheckbox = $('#easeInCheckbox')
const easeOutCheckbox = $('#easeOutCheckbox')
const easeInOutCheckbox = $('#easeInOutCheckbox')
const elasticCheckbox = $('#elasticCheckbox')
const bounceCheckbox = $('#bounceCheckbox')

const LEFT = 2
const RIGHT = 1
const ARROW_MARGIN = 10
const BALL_RADIUS = 25
const LEDGE_LEFT = 62
const LEDGE_TOP = 275
const LEDGE_WIDTH = canvas.width - (LEDGE_LEFT * 2)
const PUSH_ANIMATION_DURATION = 3600
const THRUSTER_FILL_STYLE = 'rgba(100,140,230,0.8)'
const THRUSTER_FIRING_FILL_STYLE = 'rgba(255,255,0,0.8)'

const linear = AnimationTimer.makeLinear()
const easeIn = AnimationTimer.makeEaseIn(1)
const easeOut = AnimationTimer.makeEaseOut(1)
const easeInOut = AnimationTimer.makeEaseInOut()
const elastic = AnimationTimer.makeElastic(4)
const bounce = AnimationTimer.makeBounce(5)

let arrow = LEFT
let ballLocations = []

const moveBall = {
  lastTime: undefined,
  resetBall() {
    ball.left = LEDGE_LEFT - BALL_RADIUS
    ball.top = LEDGE_TOP - BALL_RADIUS * 2
  },
  updateBallPosition(elapsed) {
    if (arrow === LEFT) ball.left -= ball.velocityX * (elapsed / 1000)
    else ball.left += ball.velocityX * (elapsed / 1000)
  },
  execute(ball) {
    const animationElapsed = pushAnimationTimer.getElapsedTime()

    if (pushAnimationTimer.isRunning()) {
      const animationElapsed = pushAnimationTimer.getElapsedTime()

      if (this.lastTime !== undefined) {
        const elapsed = animationElapsed - this.lastTime

        this.updateBallPosition(elapsed)
        ballLocations.push(ball.left)

        if (isBallOnLedge()) {
          if (pushAnimationTimer.isOver()) {
            pushAnimationTimer.stop()
          }
        } else {
          pushAnimationTimer.stop()
          this.resetBall()
        }
      }
    }
    this.lastTime = animationElapsed
  }
}

const ball = new Sprite('ball', {
  paint(sprite, context) {
    context.save()
    context.beginPath()
    context.arc(sprite.left + sprite.width / 2, sprite.top + sprite.height / 2,
      BALL_RADIUS, 0, Math.PI * 2, false)
    context.clip()

    context.shadowColor = 'rgb(0,0,255)'
    context.shadowOffsetX = -4
    context.shadowOffsetY = -4
    context.shadowBlur = 8

    context.lineWidth = 2
    context.strokeStyle = 'rgb(100,100,195)'
    context.stroke()

    context.beginPath()
    context.arc(sprite.left + sprite.width / 2, sprite.top + sprite.height / 2,
      BALL_RADIUS / 2, 0, Math.PI * 2, false)
    context.clip()

    context.shadowColor = 'rgb(255,255,0)'
    context.shadowOffsetX = -4
    context.shadowOffsetY = -4
    context.shadowBlur = 8
    context.stroke()

    context.restore()
  }
}, [moveBall])
const ledge = new Sprite('ledge', {
  paint(sprite, context) {
    context.save()
    context.shadowColor = 'rgba(0,0,0,0.8)'
    context.shadowBlur = 8
    context.shadowOffsetX = 4
    context.shadowOffsetY = 4

    context.fillStyle = 'rgba(255,255,0,0.6)'
    context.fillRect(sprite.left, sprite.top,
      sprite.width, sprite.height)
    context.restore()
  }
})

const pushAnimationTimer = new AnimationTimer(PUSH_ANIMATION_DURATION)

function animate(time) {
  canvas.clear()

  ball.update(context, time)
  ball.paint(context)

  ledge.update(context, time)
  ledge.paint(context)

  paintThrusters()
  requestNextAnimationFrame(animate)
}

function isBallOnLedge() {
  return ball.left + 2 * BALL_RADIUS > LEDGE_LEFT &&
    ball.left < LEDGE_LEFT + LEDGE_WIDTH
}

function paintThrusters() {
  thrustersContext.clearRect(0, 0,
    thrustersCanvas.width, thrustersCanvas.height)

  if (arrow === LEFT) {
    thrustersContext.fillStyle =
      pushAnimationTimer.isRunning() ? THRUSTER_FIRING_FILL_STYLE
        : THRUSTER_FILL_STYLE
    paintLeftArrow(thrustersContext)
    thrustersContext.fillStyle = THRUSTER_FILL_STYLE
    paintRightArrow(thrustersContext)
  } else {
    thrustersContext.fillStyle =
      pushAnimationTimer.isRunning() ? THRUSTER_FIRING_FILL_STYLE
        : THRUSTER_FILL_STYLE
    paintRightArrow(thrustersContext)
    thrustersContext.fillStyle = THRUSTER_FILL_STYLE
    paintLeftArrow(thrustersContext)
  }
}

function paintRightArrow(context) {
  thrustersContext.save()
  thrustersContext.translate(thrustersCanvas.width, 0)
  thrustersContext.scale(-1, 1)
  paintArrow(context)
  thrustersContext.restore()
}

function paintLeftArrow(context) {
  paintArrow(context)
}

function paintArrow(context) {
  context.beginPath()

  context.moveTo(thrustersCanvas.width / 2 - ARROW_MARGIN / 2,
    ARROW_MARGIN / 2)

  context.lineTo(thrustersCanvas.width / 2 - ARROW_MARGIN / 2,
    thrustersCanvas.height - ARROW_MARGIN)

  context.quadraticCurveTo(thrustersCanvas.width / 2 - ARROW_MARGIN / 2,
    thrustersCanvas.height - ARROW_MARGIN / 2,
    thrustersCanvas.width / 2 - ARROW_MARGIN,
    thrustersCanvas.height - ARROW_MARGIN / 2)

  context.lineTo(ARROW_MARGIN,
    thrustersCanvas.height / 2 + ARROW_MARGIN / 2)

  context.quadraticCurveTo(ARROW_MARGIN - 3,
    thrustersCanvas.height / 2,
    ARROW_MARGIN, thrustersCanvas.height / 2 - ARROW_MARGIN / 2)

  context.lineTo(thrustersCanvas.width / 2 - ARROW_MARGIN,
    ARROW_MARGIN / 2)

  context.quadraticCurveTo(thrustersCanvas.width / 2 - ARROW_MARGIN,
    ARROW_MARGIN / 2, thrustersCanvas.width / 2 - ARROW_MARGIN / 2,
    ARROW_MARGIN / 2)
  context.fill()
  context.stroke()
}

function pushBallRight() {
  arrow = LEFT
  restartAnimationTimer()
}

function pushBallLeft() {
  arrow = RIGHT
  restartAnimationTimer()
}

function restartAnimationTimer() {
  pushAnimationTimer.start()
}

linearCheckbox.onchange = () => {
  pushAnimationTimer.timeWarp = linear
}

easeInCheckbox.onchange = () => {
  pushAnimationTimer.timeWarp = easeIn
}

easeOutCheckbox.onchange = () => {
  pushAnimationTimer.timeWarp = easeOut
}

easeInOutCheckbox.onchange = () => {
  pushAnimationTimer.timeWarp = easeInOut
}

elasticCheckbox.onchange = () => {
  pushAnimationTimer.timeWarp = elastic
  ball.left = LEDGE_LEFT - BALL_RADIUS
  ball.top = LEDGE_TOP - BALL_RADIUS * 2
}

bounceCheckbox.onchange = () => {
  pushAnimationTimer.timeWarp = bounce
}

linearCheckbox.onchange = () => {
  pushAnimationTimer.timeWarp = linear
}

thrustersCanvas.addEvent('mousedown', e => {
  const rect = thrustersCanvas.canvas.getBoundingClientRect()
  const x = e.x || e.clientX

  e.preventDefault()
  e.stopPropagation()

  ballLocations = []

  if (x - rect.left > thrustersCanvas.width / 2) {
    pushBallLeft()
  } else {
    pushBallRight()
  }
})

thrustersContext.strokeStyle = 'rgba(100,140,230,0.6)'
thrustersContext.shadowColor = 'rgba(0,0,0,0.3)'
thrustersContext.shadowBlur = 6
thrustersContext.shadowX = 4
thrustersContext.shadowY = 4

ball.left = LEDGE_LEFT - BALL_RADIUS
ball.top = LEDGE_TOP - BALL_RADIUS * 2
ball.width = BALL_RADIUS * 2
ball.height = BALL_RADIUS * 2
ball.velocityX = 100
ball.velocityY = 0

ledge.left = LEDGE_LEFT
ledge.top = LEDGE_TOP
ledge.width = LEDGE_WIDTH

requestNextAnimationFrame(animate)
