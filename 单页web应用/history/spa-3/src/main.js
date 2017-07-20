/**
 * Created by Administrator on 2017/7/11 0011.
 */

require('babel-polyfill')
require('./styles/main.scss')

import {spa} from './js/spa.js'
import $ from 'jquery'

$(document).ready(() => {
  spa.initModule($('#spa'))
})

