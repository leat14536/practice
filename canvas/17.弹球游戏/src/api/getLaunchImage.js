/**
 * Created by Administrator on 2017/9/16 0016.
 */
import {globalData, LAUNCH_STEPS} from '../global'

export function getLaunchImage(game) {
  globalData.launchImages = []
  const {images} = game
  for (let i = 0; i < LAUNCH_STEPS; i++) {
    globalData.launchImages.push(images[`images/actuator-${i}.png`])
  }
}
