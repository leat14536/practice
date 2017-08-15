/* eslint-disable */
import 'babel-polyfill'
/* import MazeMap from './js/mazeMap'

new MazeMap() */

import mazeMap from './js/maze'
import Canvas from './js/canvas'

let map = mazeMap()
let canvas = new Canvas({width: 51, height: 31})
document.querySelector('.wrap').appendChild(canvas.getCanvas())
canvas.draw(map.getPoints())
