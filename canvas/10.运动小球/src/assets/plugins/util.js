/**
 * Created by Administrator on 2017/9/9 0009.
 */
export function $(str) {
  return document.querySelector(str)
}

let lastTime = 0
export function calculateFps() {
  const now = +new Date()
  const fps = 1000 / (now - lastTime)

  lastTime = now
  return fps
}

export function loadImage(image) {
  return new Promise((resolve, reject) => {
    image.onload = () => resolve()
    setTimeout(reject, 5000)
  })
}
