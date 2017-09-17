/**
 * Created by Administrator on 2017/9/15 0015.
 */
import {Point} from 'shapes/point'

export const globalData = {
  score: 0,
  loading: true,
  lauching: false,
  lastBallPosition: {x: 0, y: 0},
  launchImages: [],
  shapes: [],
  ballOutOfPlay: false,
  showPolygonsOnly: true,
  showingHighScores: false,
  launchStep: 1,
  game: null,
  gameOver: false,
  liveLeft: 3,
  showTryAgain: false
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

export const BALL_LAUNCH_TOP = ACTUATOR_TOP - 30
export const BALL_LAUNCH_LEFT = ACTUATOR_LEFT + 3

export const CANVAS_WIDTH = 535
export const CANVAS_HEIGHT = 936

export const LEFT_FLIPPER = 1
export const RIGHT_FLIPPER = 2

export const EXTRA_BALLS_RIGHT = 430
export const EXTRA_BALL_WIDTH = 36
export const EXTRA_BALLS_BOTTOM = CANVAS_HEIGHT - 55

export const MAX_BALL_VELOCITY = 400
export const GRAVITY = 9.8

export const MIN_BALL_VELOCITY = 3
export const GAME_HEIGHT_IN_METERS = 2

export const LEFT_FLIPPER_ROTATION_POINT = new Point(145, 775)
export const RIGHT_FLIPPER_ROTATION_POINT = new Point(370, 775)
