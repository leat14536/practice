/**
 * Created by Administrator on 2017/9/14 0014.
 */
import {loadImage} from 'plugins/util'

export class ImagePainter {
  constructor(src) {
    this.imageSrc = src
    this.imagePromise = loadImage(src)
      .then(image => {
        this.image = image
      }, () => alert('图片加载出错'))
  }

  paint(sprite, context) {
    if (this.imageSrc !== undefined) {
      if (!this.image) {
        this.imagePromise.then(() => {
          sprite.width = this.image.width
          sprite.height = this.image.height

          context.drawImage(this.image,
            sprite.left, sprite.top,
            sprite.width, sprite.height)
        })
      } else {
        context.drawImage(this.image, sprite.left, sprite.top,
          sprite.width, sprite.height)
      }
    }
  }
}
