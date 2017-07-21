/**
 * Created by Administrator on 2017/7/11 0011.
 */
import jquery from 'jquery'
import {shell} from './spa.shell'
import {chat} from './spa.chat'
import {model} from './spa.model'
import {avtr} from './spa.avtr'
import {data} from './spa.data'
import {fake} from './spa.fake'
import urianchor from 'jquery.urianchor'
import ue from 'jquery.event.ue'

urianchor(jquery)
ue(jquery)

export let spa = (function($) {
  let initModule = ($container) => {
    // render HTML
    spa.model.initModule()
    spa.shell.initModule($container)
  }

  return {initModule}
})(jquery)

spa.shell = shell(spa)
spa.chat = chat(spa)
spa.model = model(spa)
spa.avtr = avtr(spa)
spa.data = data(spa)
spa.fake = fake(spa)
