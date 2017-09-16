/**
 * Created by Administrator on 2017/9/15 0015.
 */
export const globalData = {
  score: 0,
  loading: true,
  lauching: false,
  lastBallPosition: {x: 0, y: 0},
  launchImages: [],
  shapes: [],
  ballOutOfPlay: false,
  showPolygonsOnly: true
}

export const LAUNCH_STEPS = 7
export const FLIPPER_RISE_DURATION = 25
export const FLIPPER_FALL_DURATION = 175
export const MAX_FLIPPER_ANGLE = Math.PI / 4

export const ACTUATOR_LEFT = 468
export const ACTUATOR_TOP = 839
export const ACTUATOR_PLATFORM_WIDTH = 45
export const ACTUATOR_PLATFORM_HEIGHT = 10

export const FLIPPER_BOTTOM = 870
