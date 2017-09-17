/**
 * Created by Administrator on 2017/9/16 0016.
 */
import {Polygon} from 'shapes/polygon'
import {Point} from 'shapes/point'
import {
  ACTUATOR_LEFT,
  ACTUATOR_TOP,
  ACTUATOR_PLATFORM_WIDTH,
  ACTUATOR_PLATFORM_HEIGHT
} from '../global'

export const fiveXBumperLeft = new Polygon()

fiveXBumperLeft.points.push(new Point(98, 450))
fiveXBumperLeft.points.push(new Point(163, 450))
fiveXBumperLeft.points.push(new Point(98, 505))

export const fiveXBumperRight = new Polygon()

fiveXBumperRight.points.push(new Point(350, 450))
fiveXBumperRight.points.push(new Point(415, 450))
fiveXBumperRight.points.push(new Point(415, 505))

export const twoXBumperLeft = new Polygon()

twoXBumperLeft.points.push(new Point(98, 635))
twoXBumperLeft.points.push(new Point(180, 715))
twoXBumperLeft.points.push(new Point(98, 715))

export const twoXBumperRight = new Polygon()

twoXBumperRight.points.push(new Point(420, 630))
twoXBumperRight.points.push(new Point(420, 715))
twoXBumperRight.points.push(new Point(330, 715))

export const upperLeftBarLeft = new Polygon()

upperLeftBarLeft.points.push(new Point(86, 185))
upperLeftBarLeft.points.push(new Point(86, 263))
upperLeftBarLeft.points.push(new Point(98, 263))
upperLeftBarLeft.points.push(new Point(98, 185))

export const upperLeftBarRight = new Polygon()

upperLeftBarRight.points.push(new Point(134, 185))
upperLeftBarRight.points.push(new Point(136, 263))
upperLeftBarRight.points.push(new Point(146, 263))
upperLeftBarRight.points.push(new Point(146, 185))

export const upperRightBarLeft = new Polygon()

upperRightBarLeft.points.push(new Point(368, 185))
upperRightBarLeft.points.push(new Point(368, 263))
upperRightBarLeft.points.push(new Point(380, 263))
upperRightBarLeft.points.push(new Point(380, 185))

export const upperRightBarRight = new Polygon()

upperRightBarRight.points.push(new Point(417, 185))
upperRightBarRight.points.push(new Point(417, 263))
upperRightBarRight.points.push(new Point(427, 263))
upperRightBarRight.points.push(new Point(427, 185))

export const lowerLeftBarLeft = new Polygon()

lowerLeftBarLeft.points.push(new Point(156, 525))
lowerLeftBarLeft.points.push(new Point(168, 525))
lowerLeftBarLeft.points.push(new Point(168, 590))
lowerLeftBarLeft.points.push(new Point(156, 590))

export const lowerLeftBarRight = new Polygon()
lowerLeftBarRight.points.push(new Point(204, 525))
lowerLeftBarRight.points.push(new Point(216, 525))
lowerLeftBarRight.points.push(new Point(216, 590))
lowerLeftBarRight.points.push(new Point(204, 590))

export const lowerRightBarLeft = new Polygon()

lowerRightBarLeft.points.push(new Point(294, 525))
lowerRightBarLeft.points.push(new Point(306, 525))
lowerRightBarLeft.points.push(new Point(306, 590))
lowerRightBarLeft.points.push(new Point(294, 590))

export const lowerRightBarRight = new Polygon()

lowerRightBarRight.points.push(new Point(342, 525))
lowerRightBarRight.points.push(new Point(354, 525))
lowerRightBarRight.points.push(new Point(354, 590))
lowerRightBarRight.points.push(new Point(342, 590))

export const rightFlipperShape = new Polygon()

rightFlipperShape.points.push(new Point(365, 745))
rightFlipperShape.points.push(new Point(272, 836))
rightFlipperShape.points.push(new Point(293, 857))
rightFlipperShape.points.push(new Point(398, 781))

export const leftFlipperShape = new Polygon()

leftFlipperShape.points.push(new Point(142, 743))
leftFlipperShape.points.push(new Point(239, 837))
leftFlipperShape.points.push(new Point(218, 855))
leftFlipperShape.points.push(new Point(116, 783))

export const actuatorPlatformShape = new Polygon()

actuatorPlatformShape.points.push(new Point(ACTUATOR_LEFT - 5, ACTUATOR_TOP))
actuatorPlatformShape.points.push(new Point(ACTUATOR_LEFT - 5 + ACTUATOR_PLATFORM_WIDTH,
  ACTUATOR_TOP))
actuatorPlatformShape.points.push(new Point(ACTUATOR_LEFT - 5 + ACTUATOR_PLATFORM_WIDTH,
  ACTUATOR_TOP + ACTUATOR_PLATFORM_HEIGHT))
actuatorPlatformShape.points.push(new Point(ACTUATOR_LEFT - 5,
  ACTUATOR_TOP + ACTUATOR_PLATFORM_HEIGHT))
actuatorPlatformShape.points.push(new Point(ACTUATOR_LEFT - 5, ACTUATOR_TOP))

export const leftFlipperBaselineShape = new Polygon()

leftFlipperBaselineShape.points.push(new Point(142, 743))
leftFlipperBaselineShape.points.push(new Point(239, 837))
leftFlipperBaselineShape.points.push(new Point(218, 855))
leftFlipperBaselineShape.points.push(new Point(116, 783))
