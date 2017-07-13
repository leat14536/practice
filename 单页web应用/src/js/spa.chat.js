/**
 * Created by Administrator on 2017/7/12 0012.
 */
import {setConfigMap} from './spa.util'

export let chat = () => {
  let
    configMap = {
      main_html: `<div style="padding:1em; color:#fff">
                    Say hello to chat
                </div>`,
      settable_map: {}
    },
    stateMap = {
      $container: null
    },
    jqueryMap = {},
    setJqueryMap, configModule, initModule

  setJqueryMap = () => {
    let $container = stateMap.$container
    jqueryMap = {$container}
  }

  configModule = (input_map) => {
    setConfigMap({
      input_map,
      settable_map: configMap.settable_map,
      config_map: configMap
    })
    return true
  }

  initModule = ($container) => {
    $container.html(configMap.main_html)
    stateMap.$container = $container
    setJqueryMap()

    return true
  }

  return {
    configModule,
    initModule
  }
}
