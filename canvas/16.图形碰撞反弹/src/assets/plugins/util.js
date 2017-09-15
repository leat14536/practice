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

export function loadImage(src) {
  const image = new Image()
  image.src = src
  return new Promise((resolve, reject) => {
    image.onload = () => resolve(image)
    setTimeout(reject, 5000)
  })
}
