/**
 * Created by Administrator on 2017/9/11 0011.
 */
export class ImagePainter {
  constructor(url) {
    this.image = new Image()
    this.image.src = url
  }

  paint(context, ...args) {
    if (this.image.complate) {
      context.drawImage(this.image, ...args)
    }
  }
}

export class SpriteSheetPainter {
  constructor(cells, cellIndex) {
    this.cells = cells
    this.cellIndex = cellIndex || 0
  }

  advance() {
    if (this.cellIndex === this.cells.length - 1) {
      this.cellIndex = 0
    } else {
      this.cellIndex++
    }
  }

  paint(sprite, context, image) {
    const cell = this.cells[this.cellIndex]
    context.drawImage(image,
      cell.left, cell.top,
      cell.width, cell.height,
      sprite.left, sprite.top,
      cell.width, cell.height
    )
  }
}
