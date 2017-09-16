/**
 * Created by Administrator on 2017/9/7 0007.
 */

export default class TextCursor {
  constructor(width, fillStyle) {
    this.fillStyle = fillStyle || 'rgba(0,0,0,0.5)'
    this.width = width || 2
    this.left = 0
    this.top = 0
  }

  getHeight(context) {
    const h = context.measureText('W').width
    return h + h / 6
  }

  createPath(context) {
    context.beginPath()
    context.rect(this.left, this.top, this.width, this.getHeight(context))
  }

  draw(context, left, bottom) {
    context.save()

    this.left = left
    this.top = bottom - this.getHeight(context)

    this.createPath(context)

    context.fillStyle = this.fillStyle
    context.fill()

    context.restore()
  }

  erase(context, imageData) {
    context.putImageData(
      imageData, 0, 0,
      this.left, this.top,
      this.width + 1, this.getHeight(context) + 1
    )
  }
}
