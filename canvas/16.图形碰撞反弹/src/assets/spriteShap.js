/**
 * Created by Administrator on 2017/9/14 0014.
 */
import {Polygon} from './polygon'
import {Point} from './point'

export class SpriteShape extends Polygon {
  constructor(sprite, x, y) {
    super()
    this.sprite = sprite
    this.x = x
    this.y = y
    sprite.left = x
    sprite.top = y
    this.setPolygonPoints()
  }

  setPolygonPoints() {
    this.points.push(new Point(this.x, this.y))
    this.points.push(new Point(this.x + this.sprite.width, this.y))
    this.points.push(new Point(this.x + this.sprite.width, this.y + this.sprite.height))
    this.points.push(new Point(this.x, this.y + this.sprite.height))
  }

  fill() {
  }

  stroke(context) {
    this.sprite.paint(context)
  }

  move(dx, dy) {
    var point
    for (let i = 0; i < this.points.length; ++i) {
      point = this.points[i]
      point.x += dx
      point.y += dy
    }
    this.sprite.left = this.points[0].x
    this.sprite.top = this.points[0].y
  }
}
