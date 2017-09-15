/**
 * Created by Administrator on 2017/9/14 0014.
 */
import {Polygon} from './polygon'
import {loadImage} from './plugins/util'
import {Point} from './point'

export class ImageShape extends Polygon {
  constructor(imageSrc, x, y, w, h) {
    super()
    this.imageLoaded = false
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.points = [new Point(x, y)]
    this.imagePromise = loadImage(imageSrc).then(image => {
      this.image = image
      this.setPolygonPoints()
      this.imageLoaded = true
    }, () => alert('图片加载失败'))
  }

  setPolygonPoints() {
    this.points.push(new Point(this.x + this.image.width, this.y))
    this.points.push(new Point(this.x + this.image.width, this.y + this.image.height))
    this.points.push(new Point(this.x, this.y + this.image.height))
  }

  fill() {
  }

  stroke(context) {
    if (this.imageLoaded) {
      context.drawImage(this.image, this.points[0].x, this.points[0].y)
    } else {
      this.imagePromise.then(() => this.stroke(context))
    }
  }
}
