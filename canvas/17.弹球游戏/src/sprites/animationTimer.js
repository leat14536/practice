/**
 * Created by Administrator on 2017/9/16 0016.
 */
import {AnimationTimer} from 'plugins/stopwatch'
import {FLIPPER_FALL_DURATION, FLIPPER_RISE_DURATION} from '../global'

export const leftFlipperRiseTimer = new AnimationTimer(FLIPPER_RISE_DURATION,
  AnimationTimer.makeEaseInOut(3))

export const leftFlipperFallTimer = new AnimationTimer(FLIPPER_FALL_DURATION,
  AnimationTimer.makeEaseIn(3))

export const rightFlipperRiseTimer = new AnimationTimer(FLIPPER_RISE_DURATION,
  AnimationTimer.makeEaseInOut(3))

export const rightFlipperFallTimer = new AnimationTimer(FLIPPER_FALL_DURATION,
  AnimationTimer.makeEaseIn(3))
