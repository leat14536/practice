/**
 * Created by Administrator on 2017/8/12 0012.
 */

export default class Route {
  constructor(x, y, last = null) {
    this.x = x
    this.y = y
    this.last = last
    this.next = []
  }

  pushNext(route) {
    if (!(route instanceof Route)) {
      console.warn('Route Push Err')
    }
    this.next.push(route)
  }

  get() {
    return [this.x, this.y]
  }
}
