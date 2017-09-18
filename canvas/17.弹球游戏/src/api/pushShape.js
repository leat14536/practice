/**
 * Created by Administrator on 2017/9/16 0016.
 */
import {ballShape} from '../sprites/ballShape'
import {globalData} from '../global'
import {domePolygons} from '../sprites/domePolygons'

import {
  leftBoundary,
  rightBoundary
} from '../sprites/boundary'

import {
  fiveHundredBumper,
  oneHundredBumperLeft,
  oneHundredBumperRight,
  fiftyBumper
} from '../sprites/hundredBumper'

import {
  fiveXBumperLeft,
  fiveXBumperRight,
  twoXBumperLeft,
  twoXBumperRight,
  upperLeftBarLeft,
  upperLeftBarRight,
  upperRightBarLeft,
  upperRightBarRight,
  lowerLeftBarLeft,
  lowerLeftBarRight,
  lowerRightBarLeft,
  lowerRightBarRight,
  rightFlipperShape,
  leftFlipperShape,
  actuatorPlatformShape,
  oneXBumperLeft,
  oneXBumperRight
} from '../sprites/polygonBumper'

const {shapes} = globalData

export function pushShape() {
  shapes.push(ballShape)
  shapes.push(leftBoundary)
  shapes.push(rightBoundary)

  shapes.push(fiveHundredBumper)
  shapes.push(oneHundredBumperLeft)
  shapes.push(oneHundredBumperRight)
  shapes.push(fiftyBumper)
  shapes.push(fiveXBumperLeft)
  shapes.push(fiveXBumperRight)
  shapes.push(twoXBumperLeft)
  shapes.push(twoXBumperRight)
  shapes.push(upperLeftBarLeft)
  shapes.push(upperLeftBarRight)
  shapes.push(upperRightBarLeft)
  shapes.push(upperRightBarRight)
  shapes.push(oneXBumperLeft)
  shapes.push(oneXBumperRight)
  shapes.push(lowerLeftBarLeft)
  shapes.push(lowerLeftBarRight)
  shapes.push(lowerRightBarLeft)
  shapes.push(lowerRightBarRight)

  shapes.push(rightFlipperShape)
  shapes.push(leftFlipperShape)

  shapes.push(actuatorPlatformShape)

  shapes.push(...domePolygons)
}

export function getBounceCoefficient(shape) {
  let ret
  if (shape === twoXBumperLeft ||
    shape === twoXBumperRight ||
    shape === fiveXBumperRight ||
    shape === fiveXBumperLeft ||
    shape === fiftyBumper ||
    shape === oneHundredBumperLeft ||
    shape === oneHundredBumperRight ||
    shape === fiveHundredBumper) {
    ret = 'bumper'
  } else if (shape === rightFlipperShape) {
    ret = 'rightFlipperShape'
  } else if (shape === leftFlipperShape) {
    ret = 'leftFlipperShape'
  } else if (shape === actuatorPlatformShape) {
    ret = 'actuatorPlatformShape'
  } else {
    ret = 'default'
  }
  return ret
}

const bumperLits = [
  {
    test: bumperLit => bumperLit === fiveHundredBumper,
    draw: game => game.context.drawImage(game.getImage('fiveHundredBumperBright'), 216, 147)
  },
  {
    test: bumperLit => bumperLit === oneHundredBumperLeft,
    draw: game => game.context.drawImage(game.getImage('oneHundredBumperBright'), 77, 288)
  },
  {
    test: bumperLit => bumperLit === oneHundredBumperRight,
    draw: game => game.context.drawImage(game.getImage('oneHundredBumperBright'), 355, 288)
  },
  {
    test: bumperLit => bumperLit === fiftyBumper,
    draw: game => game.context.drawImage(game.getImage('fiftyBumperBright'), 215, 434)
  },
  {
    test: bumperLit => bumperLit === oneXBumperLeft,
    draw: game => game.context.drawImage(game.getImage('oneXBumperLeftBright'), 71, 776)
  },
  {
    test: bumperLit => bumperLit === oneXBumperRight,
    draw: game => game.context.drawImage(game.getImage('oneXBumperRightBright'), 305, 775)
  },
  {
    test: bumperLit => bumperLit === twoXBumperLeft,
    draw: game => game.context.drawImage(game.getImage('twoXBumperLeftBright'), 93, 632)
  },
  {
    test: bumperLit => bumperLit === twoXBumperRight,
    draw: game => game.context.drawImage(game.getImage('twoXBumperRightBright'), 333, 631)
  },
  {
    test: bumperLit => bumperLit === fiveXBumperLeft,
    draw: game => game.context.drawImage(game.getImage('fiveXBumperLeftBright'), 95, 450)
  },
  {
    test: bumperLit => bumperLit === fiveXBumperRight,
    draw: game => game.context.drawImage(game.getImage('fiveXBumperRightBright'), 350, 450)
  }
]

export function drawLitBumper(game, bumperLit) {
  if (!bumperLit) return
  for (let i = 0; i < bumperLits.length; i++) {
    if (bumperLits[i].test(bumperLit)) {
      bumperLits[i].draw(game)
      return
    }
  }
}
