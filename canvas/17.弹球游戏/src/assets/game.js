/**
 * Created by Administrator on 2017/9/15 0015.
 */
/*
 *   游戏循环 start()
 *   绘制精灵 addSprite() getSprite()
 *   支持基于时间的运动 pixelsPerFrame()
 *   调用回调方法 startAnimate() paintUnderSprites() paintOverSprite() sendAnimate()
 *   暂停 togglePaused()
 *   处理按键 addKeyListener()
 *   同时播放声音 canPlaySound() playSound()
 *   fps 帧速率
 *   gameTime 游戏时间
 *   高分榜 setHightScore() getHightScores() clearHightScores()
 * */
import Canvas from './plugins/canvas'
import {$, loadImage} from './plugins/util'
import {requestNextAnimationFrame} from './plugins/requestNextAnimationFrame'

export class Game {
  constructor(name, el) {
    this.gameName = name
    this.canvas = new Canvas({canvas: $(el)})
    this.context = this.canvas.context
    this.sprites = []

    // img队列
    this.imagePromiseQueue = []
    this.images = {}

    // audio
    this.NUM_SOUND_CHANNELS = 10
    this.audio = new Audio()
    this.soundChannels = Array.apply(null, {length: this.NUM_SOUND_CHANNELS})
      .map(() => new Audio())

    // time
    this.startTime = 0
    this.lastTime = 0
    this.gameTime = 0
    this.fps = 0
    this.STARTING_FPS = 60

    //  key listener
    this.keyListeners = []

    // 高分榜
    this.HIGH_SCORES_SUFFIX = '_highscores'
    this.highScores = {}

    this.paused = false
    this.startedPauseAt = 0
    this.PAUSE_TIMEOUT = 100
  }

  start() {
    requestNextAnimationFrame(time => {
      this.startTime = time
      this.animate(time)
    })
  }

  animate(time) {
    // 这里的时间获取或许有问题
    this.lastAnimationFrameTime = time
    if (this.paused) {
      setTimeout(() => requestNextAnimationFrame(this.animate.bind(this)),
        this.PAUSE_TIMEOUT)
    } else {
      this.tick(time) // 更新时间 fps
      this.clearScreen() // 清除canvas

      this.startAnimate(time)
      this.paintUnderSprites()

      this.updateSprites(time) // 更新精灵
      this.paintSprites(time) // 绘制精灵

      this.paintOverSprites()
      this.endAnimate()

      this.lastTime = time

      requestNextAnimationFrame(this.animate.bind(this))
    }
  }

  tick(time) {
    this.updateFrameRate(time)
    this.getTime = time - this.startTime
  }

  updateFrameRate(time) {
    if (this.lastTime === 0) this.fps = this.STARTING_FPS
    else this.fps = 1000 / (time - this.lastTime)
  }

  clearScreen() {
    this.canvas.clear()
  }

  updateSprites(time) {
    this.sprites.forEach(sprite => sprite.update(this.context, time))
  }

  paintSprites(time) {
    this.sprites.forEach(sprite => sprite.visiable && sprite.paint(this.context))
  }

  togglePaused() {
    this.paused = !this.paused
    const now = this.lastAnimationFrameTime

    if (this.paused) {
      this.startedPauseAt = now
    } else {
      this.startTime = this.startTime + now - this.startedPauseAt
      this.lastTime = now
    }
  }

  pixelsPerFrame(time, velocity) {
    return velocity / this.fps
  }

  queueImage(src, key) {
    let promise
    if (src instanceof Promise) {
      promise = src
        .then(imageUrl => loadImage(imageUrl),
          () => alert(`${src} 加载失败请刷新重试`))
        .then(image => (this.images[key] = image))
    } else {
      promise = loadImage(src).then(image => (this.images[key] = image),
        () => alert(`${src} 加载失败请刷新重试`))
    }

    this.imagePromiseQueue.push(promise)
  }

  loadImages() {
    return Math.floor(Object.keys(this.images).length / this.imagePromiseQueue.length * 100)
  }

  getImage(url) {
    return this.images[url]
  }

  imageLoadedCallback(callback) {
    Promise.all(this.imagePromiseQueue).then(callback)
  }

  canPlayOggVorbis() {
    return this.audio.canPlayType('audio/ogg; codecs="vorbis') !== ''
  }

  canPlayMp4() {
    return this.audio.canPlayType('audio/mp4') !== ''
  }

  getAvailableSoundChannel() {
    for (let i = 0; i < this.NUM_SOUND_CHANNELS; i++) {
      const audio = this.soundChannels[i]
      if (audio.played && audio.played.length > 0) {
        if (audio.ended) return audio
      } else if (!audio.ended) return audio
    }
    return undefined
  }

  playSound(el) {
    const track = this.getAvailableSoundChannel()
    const element = $(el)

    if (track && element) {
      track.src = element.src === ''
        ? element.currentSrc
        : element.src
      track.load()
      track.play()
    }
  }

  addKeyListener(keyAndListener) {
    this.keyListeners.push(keyAndListener)
  }

  findKeyListener(key) {
    let listener

    this.keyListeners.forEach(keyAndListener => {
      const currentKey = keyAndListener.key
      if (currentKey === key) {
        listener = keyAndListener.listener
      }
    })

    return listener
  }

  keyPressed(e) {
    let key
    switch (e.keyCode) {
      case 32:
        key = 'space'
        break
      case 83:
        key = 's'
        break
      case 80:
        key = 'p'
        break
      case 37:
        key = 'left arrow'
        break
      case 39:
        key = 'right arrow'
        break
      case 38:
        key = 'up arrow'
        break
      case 40:
        key = 'down arrow'
        break
    }
    const listener = this.findKeyListener(key)

    if (listener) listener()
  }

  getHighScores() {
    const key = this.gameName + this.HIGH_SCORES_SUFFIX
    return this.highScores[key]
  }

  setHighScore(highScore) {
    const key = this.gameName + this.HIGH_SCORES_SUFFIX
    const lastHighScore = this.highScores[key] || 0

    if (highScore > lastHighScore) this.highScores[key] = highScore
  }

  clearHighScores() {
    this.highScores = {}
  }

  // 外部填写
  startAnimate(time) {
  }

  paintUnderSprites() {
  }

  paintOverSprites() {
  }

  endAnimate() {
  }
}
