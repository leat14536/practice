/**
 * Created by Administrator on 2017/7/11 0011.
 */
import jquery from 'jquery'
import {shell} from './spa.shell'
import urianchor from 'jquery.urianchor'

urianchor(jquery)

export let spa = (function($) {
  let initModule = ($container) => {
    // render HTML
    spa.shell.initModule($container)
  }

  return {initModule}
})(jquery)

spa.shell = shell;

