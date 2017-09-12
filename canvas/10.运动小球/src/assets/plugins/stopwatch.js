/**
 * Created by Administrator on 2017/9/11 0011.
 */
export class Stopwatch {
  constructor() {
    this.startTime = 0
    this.running = false
    this.elapsed = undefined
  }

  start() {
    this.startTime = +new Date()
    this.elapsedTime = undefined
    this.running = true
  }

  stop() {
    this.elapsed = (+new Date()) - this.startTime
    this.running = false
  }

  getElapsedTime() {
    if (this.running) {
      return (+new Date()) - this.startTime
    } else {
      return this.elapsed
    }
  }

  isRunning() {
    return this.running
  }

  reset() {
    this.elapsed = 0
  }
}

export class AnimationTimer {
  constructor(duration, timeWrap) {
    this.timeWarp = timeWrap
    this.duration = duration || 1000
    this.stopwatch = new Stopwatch()
  }

  start() {
    this.stopwatch.start()
  }

  stop() {
    this.stopwatch.stop()
  }

  getElapsedTime() {
    const elapsedTime = this.stopwatch.getElapsedTime()
    const percentComplete = elapsedTime / this.duration
    if (!this.stopwatch.running) return
    if (!this.timeWarp) return elapsedTime
    return elapsedTime * (this.timeWarp(percentComplete) / percentComplete)
  }

  getRealElapsedTime() {
    return this.stopwatch.getElapsedTime()
  }

  isRunning() {
    return this.stopwatch.isRunning()
  }

  isOver() {
    return this.stopwatch.getElapsedTime() > this.duration
  }

  reset() {
    this.stopwatch.reset()
  }
}
