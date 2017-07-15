/**
 * Created by Administrator on 2017/7/11 0011.
 */
import jquery from 'jquery'
import {shell} from './spa.shell'
import {chat} from './spa.chat'
import {model} from './spa.model'
import urianchor from 'jquery.urianchor'

urianchor(jquery)

export let spa = (function($) {
  let initModule = ($container) => {
    // render HTML
    spa.shell.initModule($container)
  }

  return {initModule}
})(jquery)

spa.shell = shell(spa)
spa.chat = chat(spa)
spa.model = model(spa)

