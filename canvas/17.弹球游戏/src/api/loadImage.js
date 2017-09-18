/**
 * Created by Administrator on 2017/9/16 0016.
 */
import rightFlipper from 'images/rightFlipper.png'
import leftFlipper from 'images/leftFlipper.png'
import ball from 'images/ball.png'
import tryAgain from 'images/tryAgain.png'
import fiftyBumperBright from 'images/fiftyBumperBright.png'
import oneHundredBumperBright from 'images/oneHundredBumperBright.png'
import fiveHundredBumperBright from 'images/fiveHundredBumperBright.png'
import oneXBumperLeftBright from 'images/oneXBumperLeftBright.png'
import oneXBumperRightBright from 'images/oneXBumperRightBright.png'
import twoXBumperRightBright from 'images/twoXBumperRightBright.png'
import twoXBumperLeftBright from 'images/twoXBumperLeftBright.png'
import fiveXBumperRightBright from 'images/fiveXBumperRightBright.png'
import fiveXBumperLeftBright from 'images/fiveXBumperLeftBright.png'
import background from 'images/background.png'

import {LAUNCH_STEPS, TRY_AGAIN_X, TRY_AGAIN_Y, TRY_AGAIN_RADIUS} from '../global'

let isLoaded = false

export function loadImage(game) {
  if (isLoaded) return
  isLoaded = true

  game.queueImage(rightFlipper, 'rightFlipper')
  game.queueImage(leftFlipper, 'leftFlipper')
  game.queueImage(ball, 'ball')
  game.queueImage(tryAgain, 'tryAgain')

  game.queueImage(fiftyBumperBright, 'fiftyBumperBright')
  game.queueImage(oneHundredBumperBright, 'oneHundredBumperBright')
  game.queueImage(fiveHundredBumperBright, 'fiveHundredBumperBright')

  game.queueImage(oneXBumperLeftBright, 'oneXBumperLeftBright')
  game.queueImage(oneXBumperRightBright, 'oneXBumperRightBright')

  game.queueImage(twoXBumperRightBright, 'twoXBumperRightBright')
  game.queueImage(twoXBumperLeftBright, 'twoXBumperLeftBright')

  game.queueImage(fiveXBumperRightBright, 'fiveXBumperRightBright')
  game.queueImage(fiveXBumperLeftBright, 'fiveXBumperLeftBright')
  game.queueImage(background, 'background')

  for (let i = 0; i < LAUNCH_STEPS; i++) {
    game.queueImage(import(`images/actuator-${i}.png`), `images/actuator-${i}.png`)
  }
}

export function showTryAgainImage(game) {
  game.context.save()
  game.context.arc(TRY_AGAIN_X, TRY_AGAIN_Y, TRY_AGAIN_RADIUS,
    0, Math.PI * 2, false)

  game.context.clip()

  game.context.drawImage(game.getImage('tryAgain'), 0,
    game.canvas.height - 200)
  game.context.restore()
}

export function drawBackground(game) {
  game.context.drawImage(game.getImage('background'), 0, 0)
}

export function drawLeftFlipperRiseTimer(game, angle) {
  game.context.save()
  game.context.translate(143, 774)
  game.context.rotate(angle)
  game.context.drawImage(game.getImage('leftFlipper'), -28, -29)
  game.context.restore()
}

export function drawRightFlipperRiseTimer(game, angle) {
  game.context.save()
  game.context.translate(370, 776)
  game.context.rotate(angle)
  game.context.drawImage(game.getImage('rightFlipper'), -99, -29)
  game.context.restore()
}
