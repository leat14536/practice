/**
 * Created by Administrator on 2017/9/16 0016.
 */
import {ballShape} from '../sprites/ballShape'
import {globalData} from '../global'

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
  actuatorPlatformShape
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
  shapes.push(lowerLeftBarLeft)
  shapes.push(lowerLeftBarRight)
  shapes.push(lowerRightBarLeft)
  shapes.push(lowerRightBarRight)

  shapes.push(rightFlipperShape)
  shapes.push(leftFlipperShape)

  shapes.push(actuatorPlatformShape)
}
