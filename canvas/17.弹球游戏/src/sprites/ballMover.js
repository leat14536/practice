/**
 * Created by Administrator on 2017/9/15 0015.
 */
import {Sprite} from 'plugins/sprite'
import {ImagePainter} from 'shapes/imagePainter'
import ballSrc from 'images/ball.png'

const ballMover = {
  execute(sprite, context, time) {
    console.log('------------')
  }
}

export const ballSprite = new Sprite('ball', new ImagePainter(ballSrc), [ballMover])
