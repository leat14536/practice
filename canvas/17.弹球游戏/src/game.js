/**
 * Created by Administrator on 2017/9/15 0015.
 */
/* eslint-disable */
import {Game} from './assets/game'
import {
  globalData,
  MAX_FLIPPER_ANGLE,
  FLIPPER_RISE_DURATION
} from './global'
import {
  leftFlipperFallTimer,
  leftFlipperRiseTimer,
  rightFlipperFallTimer,
  rightFlipperRiseTimer
} from './sprites/animationTimer'

export const game = new Game('pinball', '#canvas')

let leftFlipperAngle = 0

game.startAnimate = () => {
  const {loading, launching} = globalData
  if (loading || game.paused || launching) return

  console.log('-----------------------')
}

game.paintUnderSprites = () => {
  const {loading, showPolygonsOnly} = globalData
  if (loading) return

  // 更新左右挡板
  updateLeftFlipper()
  updateRightFlipper()

  if(showPolygonsOnly) {
    drawCollisionShapes()
  }
}

function updateLeftFlipper() {
  if (leftFlipperRiseTimer.isRunning()) {
    console.log('-----------------')
  } else if(leftFlipperFallTimer.isRunning()) {
    console.log('-----------------')
  }
}

function updateRightFlipper() {
  if (rightFlipperRiseTimer.isRunning()) {
    console.log('-----------------')
  } else if(rightFlipperFallTimer.isRunning()) {
    console.log('-----------------')
  }
}

function drawCollisionShapes() {
  const {shapes} = globalData
  shapes.forEach(shape => {
    shape.stroke(game.context)
    game.context.beginPath()
    const centroid = shape.centroid()
    game.context.arc(centroid.x, centroid.y, 1.5, 0, Math.PI*2, false)
    game.context.fill()
  })
}
