/**
 * Created by Administrator on 2017/9/7 0007.
 */
export default class TextLine {
  constructor(x, y) {
    this.text = ''
    this.left = x
    this.bottom = y
    this.caret = 0
  }

  insert(text) {
    this.text = this.text.substr(0, this.caret) + text + this.text.substr(this.caret)
    this.caret += text.length
  }

  removeCharacterBeforeCaret() {
    if (this.caret === 0) return
    this.text = this.text.substring(0, this.caret - 1) + this.text.substring(this.caret)
    this.caret--
  }

  getWidth(context) {
    return context.measureText('W').width
  }

  getHeight(context) {
    const h = context.measureText('W').width
    return h + h / 6
  }

  draw(context) {
    context.save()
    context.textAlign = 'start'
    context.textBaseline = 'bottom'

    context.strokeText(this.text, this.left, this.bottom)
    context.fillText(this.text, this.left, this.bottom)

    context.restore()
  }

  erase(context, imageData) {
    context.putImageData(imageData, 0, 0)
  }
}
