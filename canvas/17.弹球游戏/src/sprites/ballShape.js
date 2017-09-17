/**
 * Created by Administrator on 2017/9/16 0016.
 */
import {Sprite} from 'plugins/sprite'
import {SpriteShape} from 'shapes/spriteShap'
import {ImagePainter} from 'shapes/imagePainter'
import {globalData} from '../global'
import ballSrc from 'images/ball.png'
const {ACTUATOR_LEFT, FLIPPER_BOTTOM} = globalData

const ballMover = {
  execute(sprite, context, time) {
    const {loading, lastBallPosition, lauching, game} = globalData
    if (game.paused || loading) return
    lastBallPosition.x = sprite.left
    lastBallPosition.y = sprite.top

    if (!lauching && sprite.left < ACTUATOR_LEFT &&
      (sprite.top > FLIPPER_BOTTOM || sprite.top < 0)) {
      globalData.ballOutOfPlay = true
    }

    sprite.left += game.pixelsPerFrame(time, sprite.velocityX)
    sprite.top += game.pixelsPerFrame(time, sprite.velocityY)
  }
}

export const ballSprite = new Sprite('ball', new ImagePainter(ballSrc), [ballMover])

ballSprite.velocityX = 0
ballSprite.velocityY = 0
ballSprite.height = ballSprite.width = 33

export const ballShape = new SpriteShape(ballSprite, ballSprite.width, ballSprite.height)
