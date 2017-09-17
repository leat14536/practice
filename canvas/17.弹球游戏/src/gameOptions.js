/**
 * Created by Administrator on 2017/9/15 0015.
 */
import {
  globalData,
  LAUNCH_STEPS,
  BALL_LAUNCH_TOP,
  ACTUATOR_TOP,
  BALL_LAUNCH_LEFT,
  GRAVITY,
  MIN_BALL_VELOCITY,
  CANVAS_HEIGHT,
  GAME_HEIGHT_IN_METERS,
  EXTRA_BALLS_RIGHT,
  EXTRA_BALL_WIDTH,
  EXTRA_BALLS_BOTTOM,
  LEFT_FLIPPER,
  RIGHT_FLIPPER,
  MAX_BALL_VELOCITY,
  MAX_FLIPPER_ANGLE,
  FLIPPER_RISE_DURATION,
  LEFT_FLIPPER_ROTATION_POINT
} from './global'

import {
  leftFlipperFallTimer,
  leftFlipperRiseTimer,
  rightFlipperFallTimer,
  rightFlipperRiseTimer
} from './sprites/animationTimer'
import {actuatorSprite} from './sprites/actuatorSprite'
import {ballShape, ballSprite} from './sprites/ballShape'
import {actuatorPlatformShape, leftFlipperBaselineShape, leftFlipperShape} from './sprites/polygonBumper'
import {rightBoundary} from './sprites/boundary'
import {Vector} from 'shapes/vector'
import {getBounceCoefficient, drawLitBumper} from './api/pushShape'
import {pausedToast} from './index'

let lastKeyListenerTime = 0
let applyGravityAndFriction = false
let flipperCollisionDetected = false

let bumperLit
let rightFlipperAngle = 0
let leftFlipperAngle = 0

export const startAnimate = function (time) {
  const {loading, launching, gameOver, liveLeft, ballOutOfPlay} = globalData
  if (loading || this.paused || launching) return
  // 弹射出
  // gameOver
  if (!gameOver && liveLeft === 0) {
    console.log('over')
  }

  if (ballOutOfPlay) {
    console.log('ballOutOfPlay')
  }

  // 左右挡板
  adjustRightFlipperCollisionPolygon()
  adjustLeftFlipperCollisionPolygon()

  // 碰撞检测
  const collisionOccurred = detectCollisions(this)
  if (!collisionOccurred && applyGravityAndFriction) {
    // 摩擦力 重力
    applyFrictionAndGravity(parseFloat(time - this.lastTime))
  }
}

export const paintUnderSprites = function () {
  const {loading, showPolygonsOnly, showingHighScores, showTryAgain, liveLeft} = globalData
  if (loading) return

  // 更新左右挡板
  updateLeftFlipper()
  updateRightFlipper()

  if (showPolygonsOnly) {
    drawCollisionShapes(this)
  } else if (!showingHighScores) {
    this.context.drawImage(this.getImage('background'), 0, 0)
    drawLitBumper(bumperLit)

    if (showTryAgain) {
      console.log('+------------')
    }

    // 左右挡板
    paintLeftFlipper(this)
    paintRightFlipper(this)
    for (let i = 0; i < liveLeft - 1; ++i) {
      // 生命值
      drawExtraBall(this, i)
    }
  }
}

export const keyListeners = [
  {
    key: 'space',
    listener() {
      const {launching, launchImages, launchStep} = globalData
      if (!launching && ballSprite.left === BALL_LAUNCH_LEFT &&
        ballSprite.velocityY === 0) {
        console.log('--------------')
      }
      if (launching) {
        ballSprite.velocityY = -300 * launchStep
        globalData.launching = false
        globalData.launchStep = 1

        setTimeout(function (e) {
          actuatorSprite.painter.image = launchImages[0]
          adjustActuatorPlatformShape()
        }, 50)

        setTimeout(function (e) {
          applyGravityAndFriction = true
          adjustRightBoundaryAfterLaunch()
        }, 2000)
      }
    }
  },
  {
    key: 'down arrow',
    listener() {
      const {launching, launchStep, launchImages} = globalData
      if (!launching || launchStep === LAUNCH_STEPS) return
      const now = +new Date()

      if (now - lastKeyListenerTime > 80) {
        lastKeyListenerTime = now
        globalData.launchStep++
        actuatorSprite.painter.image = launchImages[launchStep - 1]
        ballSprite.top = BALL_LAUNCH_TOP + (launchStep - 1) * 9
        adjustActuatorPlatformShape()
      }
    }
  },
  {
    key: 'up arrow',
    listener() {
      const {launching, launchStep, launchImages} = globalData
      if (!launching || launchStep === 1) return
      const now = +new Date()

      if (now - lastKeyListenerTime > 80) { // throttle
        lastKeyListenerTime = now
        globalData.launchStep--
        actuatorSprite.painter.image = launchImages[launchStep - 1]
        ballSprite.top = BALL_LAUNCH_TOP + (launchStep - 1) * 9
        adjustActuatorPlatformShape()
      }
    }
  },
  {
    key: 'p',
    listener() {
      togglePaused()
    }
  },
  {
    key: 'right arrow',
    listener() {
      if (!globalData.lauching && !globalData.gameOver) {
        rightFlipperRiseTimer.start()
        rightFlipperAngle = 0
      }
    }
  },
  {
    key: 'left arrow',
    listener() {
      leftFlipperRiseTimer.start()
      leftFlipperAngle = 0
    }
  }
]

function togglePaused() {
  globalData.game.togglePaused()
  pausedToast.style.display = globalData.game.paused ? 'inline' : 'none'
}

function applyFrictionAndGravity(time) {
  const lastElapsedTime = time / 1000
  const metersPerSecond = GRAVITY * lastElapsedTime * 0.1

  if (Math.abs(ballSprite.velocityX) > MIN_BALL_VELOCITY) {
    ballSprite.velocityX *= 0.5 ** lastElapsedTime
  }

  if (Math.abs(ballSprite.velocityY) > MIN_BALL_VELOCITY) {
    ballSprite.velocityY *= 0.5 ** lastElapsedTime
  }

  ballSprite.velocityY += metersPerSecond *
    parseFloat(CANVAS_HEIGHT / GAME_HEIGHT_IN_METERS)
}

function drawExtraBall(game, index) {
  game.context.drawImage(game.getImage('ball'),
    EXTRA_BALLS_RIGHT - EXTRA_BALL_WIDTH * index,
    EXTRA_BALLS_BOTTOM)
}

function paintLeftFlipper(game) {
  if (leftFlipperRiseTimer.isRunning() || leftFlipperFallTimer.isRunning()) {
    console.log('================')
  } else {
    game.context.drawImage(game.getImage('leftFlipper'), 115, 745)
  }
}

function paintRightFlipper(game) {
  if (rightFlipperRiseTimer.isRunning() || rightFlipperFallTimer.isRunning()) {
    console.log('================')
  } else {
    game.context.drawImage(game.getImage('rightFlipper'), 272, 745)
  }
}

function adjustRightFlipperCollisionPolygon() {
}
function adjustLeftFlipperCollisionPolygon() {
  if (leftFlipperRiseTimer.isRunning() || leftFlipperFallTimer.isRunning()) {
    for (let i = 0; i < leftFlipperShape.points.length; ++i) {
      const rp = leftFlipperBaselineShape.points[i].rotate(
        LEFT_FLIPPER_ROTATION_POINT,
        leftFlipperAngle)

      leftFlipperShape.points[i].x = rp.x
      leftFlipperShape.points[i].y = rp.y
    }
  }
}

function adjustActuatorPlatformShape() {
  const {launchStep} = globalData
  actuatorPlatformShape.points.forEach((point, i) => {
    if (i < 2 || i === actuatorPlatformShape.points.length - 1) point.y = ACTUATOR_TOP + launchStep * 10
    else point.y = ACTUATOR_TOP + launchStep * 10 + 10
  })
}

function adjustRightBoundaryAfterLaunch() {
  rightBoundary.points[1].x = 460
}

function updateLeftFlipper() {
  if (leftFlipperRiseTimer.isRunning()) {
    if (leftFlipperRiseTimer.isOver()) {

    } else {
      leftFlipperAngle = MAX_FLIPPER_ANGLE / FLIPPER_RISE_DURATION *
        leftFlipperRiseTimer.getElapsedTime()
    }
  } else if (leftFlipperFallTimer.isRunning()) {
    console.log('-----------------')
  }
}

function updateRightFlipper() {
  if (rightFlipperRiseTimer.isRunning()) {
    console.log('-----------------')
  } else if (rightFlipperFallTimer.isRunning()) {
    console.log('-----------------')
  }
}

function drawCollisionShapes(game) {
  const {shapes} = globalData
  shapes.forEach(shape => {
    shape.stroke(game.context)
    game.context.beginPath()
    const centroid = shape.centroid()
    game.context.arc(centroid.x, centroid.y, 1.5, 0, Math.PI * 2, false)
    game.context.fill()
  })
}

function collisionDetected(mtv) {
  return mtv.axis !== undefined && mtv.overlap !== 0
}
function detectFlipperCollision() {
  return false
}

function updateScore(game, shape) {
}

function checkMTVAxisDirection(mtv, shape) {
  if (mtv.axis === undefined) return
  const centroid1 = new Vector(ballShape.centroid())
  const centroid2 = new Vector(shape.centroid())
  const centroidVector = centroid2.subtract(centroid1)
  const centroidUnitVector = (new Vector(centroidVector)).normalize()

  if (centroidUnitVector.dotProduct(mtv.axis) > 0) {
    mtv.axis.x = -mtv.axis.x
    mtv.axis.y = -mtv.axis.y
  }
}

function separate(mtv) {
  let theta = 0
  if (mtv.axis.x === 0) {
    theta = Math.PI / 2
  } else {
    theta = Math.atan(mtv.axis.y / mtv.axis.x)
  }

  let dy = mtv.overlap * Math.sin(theta)
  let dx = mtv.overlap * Math.cos(theta)

  if ((mtv.axis.x < 0 && dx > 0) ||
    (mtv.axis.x > 0 && dx < 0)) dx = -dx
  if ((mtv.axis.y < 0 && dy > 0) ||
    (mtv.axis.y > 0 && dy < 0)) dy = -dy

  ballSprite.left += dx
  ballSprite.top += dy
}

function clampBallVelocity() {
  if (ballSprite.velocityX > MAX_BALL_VELOCITY) ballSprite.velocityX = MAX_BALL_VELOCITY
  else if (ballSprite.velocityX < -MAX_BALL_VELOCITY) ballSprite.velocityX = -MAX_BALL_VELOCITY

  if (ballSprite.velocityY > MAX_BALL_VELOCITY) ballSprite.velocityY = MAX_BALL_VELOCITY
  else if (ballSprite.velocityY < -MAX_BALL_VELOCITY) ballSprite.velocityY = -MAX_BALL_VELOCITY
}

function bounce(mtv, shape, bounceCoefficient) {
  const velocityVector = new Vector(ballSprite.velocityX, ballSprite.velocityY)
  const velocityUnitVector = velocityVector.normalize()
  const velocityVectorMagnitude = velocityVector.getMagnitude()
  let reflectAxis
  // 修正反弹方向
  checkMTVAxisDirection(mtv, shape)

  if (mtv.axis !== undefined) {
    // 垂直单位向量
    reflectAxis = mtv.axis.perpendicular()
  }
  // 分离重叠部分
  separate(mtv)

  const point = velocityUnitVector.reflect(reflectAxis)
  // 左右挡板
  // ...

  // 加速度修正
  ballSprite.velocityX = point.x * velocityVectorMagnitude * bounceCoefficient
  ballSprite.velocityY = point.y * velocityVectorMagnitude * bounceCoefficient
  clampBallVelocity()
}

const bounceCoefficients = {
  bumper: shape => {
    bumperLit = shape
    return 3.1
  },
  rightFlipperShape: () => (1 + rightFlipperAngle),
  leftFlipperShape: () => (1 + leftFlipperAngle),
  actuatorPlatformShape: () => 0.2,
  default: () => 0.96
}
function detectCollisions(game) {
  const {launching, loading, shapes} = globalData
  if (!launching && !loading && !game.paused) {
    ballShape.x = ballSprite.left
    ballShape.y = ballSprite.top
    ballShape.points = []
    ballShape.setPolygonPoints()

    // const position = new Vector(ballSprite.left, ballSprite.top)
    // const lastPosition = new Vector(lastBallPosition.x, lastBallPosition.y)

    // 连线向量
    // const displacement = position.subtract(lastPosition)

    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i]
      if (shape !== ballShape) {
        const mtv = ballShape.collidesWith(shape)

        // 已碰撞
        if (collisionDetected(mtv)) {
          // 更新分数
          updateScore(game, shape)

          setTimeout(() => (bumperLit = undefined), 100)
          const bounceCoefficient = bounceCoefficients[getBounceCoefficient(shape)](shape)

          shape.fill(game.context)
          bounce(mtv, shape, bounceCoefficient)
          return true
        }
      }
    }

    flipperCollisionDetected = false

    // 挡板更新
    detectFlipperCollision(LEFT_FLIPPER)
    detectFlipperCollision(RIGHT_FLIPPER)

    return flipperCollisionDetected
  }

  return false
}
