/**
 * Created by Administrator on 2017/9/11 0011.
 */
export class Sprite {
  constructor(name, painter, behaviors) {
    this.name = name
    this.painter = painter
    this.behaviors = behaviors || []

    this.top = 0
    this.left = 0
    this.width = 10
    this.height = 10
    this.velocityX = 0
    this.velocityY = 0
    this.visible = true
    this.animating = false
  }

  paint() {
    if (this.painter !== undefined && this.visible) {
      this.painter.paint(this, ...arguments)
    }
  }

  update(ctx, time) {
    for (let i = 0, l = this.behaviors.length; i < l; i++) {
      this.behaviors[i].execute(this, ctx, time)
    }
  }
}
