/**
 * Created by Administrator on 2017/9/18 0018.
 */

export class EventBus {
  constructor() {
    this.events = {}
  }

  on(event, cb, context) {
    this.events[event] = this.events[event] || []
    this.events[event].push(cb.bind(context))
  }

  emit(event, ...arg) {
    this.events[event] && this.events[event].forEach(cb => cb.apply(null, arg))
  }
}
