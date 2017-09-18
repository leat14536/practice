/**
 * Created by Administrator on 2017/9/16 0016.
 */
import {Sprite} from 'plugins/sprite'
import {ImagePainter} from 'shapes/imagePainter'
import actuator0Src from 'images/actuator-0.png'
import {ACTUATOR_TOP, ACTUATOR_LEFT} from '../global'
export const actuatorSprite = new Sprite('actuator',
  new ImagePainter(actuator0Src))

actuatorSprite.top = ACTUATOR_TOP
actuatorSprite.left = ACTUATOR_LEFT
actuatorSprite.velocityX = 0
actuatorSprite.velocityY = 0
actuatorSprite.width = 60
actuatorSprite.height = 100
actuatorSprite.visible = true
