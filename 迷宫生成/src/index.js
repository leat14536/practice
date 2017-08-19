/* eslint-disable */
import 'babel-polyfill'
import mazeMap from './js/maze'
import Canvas from './js/canvas'

/* width height minSize maxSize 必须是奇数 */
const option = {
  width: 51,
  height: 31,
  room: 200,
  minSize: 3,
  maxSize: 7
}
let btn = document.querySelector('#btn')
let canvas = new Canvas(option)
let wrap = document.querySelector('.wrap')

wrap.appendChild(canvas.getCanvas())
show()

btn.onclick = () => {
  btn.setAttribute('disabled','')
  show()
}

function show() {
  let map = mazeMap(option)
  canvas.draw(map.getPoints()).then(() => {
    btn.removeAttribute('disabled')
  })
}
