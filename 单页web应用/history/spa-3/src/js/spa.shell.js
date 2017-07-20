import jquery from 'jquery'
export let shell = function (spa, $ = jquery) {
  let
    configMap = {
      anchor_schema_map: {
        chat: {opened: true, closed: true}
      },
      resize_interval: 200,
      main_html: `<div class="spa-shell-header">
                        <div class="spa-shell-head">
                          <div class="spa-shell-head-logo"></div>
                          <div class="spa-shell-head-acct"></div>
                          <div class="spa-shell-head-search"></div>
                        </div>
                        <div class="spa-shell-main">
                          <div class="spa-shell-main-nav"></div>
                          <div class="spa-shell-main-content"></div>
                        </div>
                        <div class="spa-shell-foot"></div>
                        <div class="spa-shell-modal"></div>
                      </div>`
    },
    stateMap = {
      $container: undefined,
      anthor_map: {},
      resize_idto: undefined
    },
    jqueryMap = {},
    copyAnchorMap, changeAnchorPart,
    onHashchange, setJqueryMap,
    setChatAnchor, initModule,
    onResize

  onResize = () => {
    if (stateMap.resize_idto) return true

    spa.chat.handleResize();
    stateMap.resize_idto = setTimeout(() => {
      stateMap.resize_idto = undefined
    },configMap.resize_interval)

    return true
  }

  copyAnchorMap = () => {
    return Object.assign({}, stateMap.anchor_map)
  }

  setJqueryMap = () => {
    let $container = stateMap.$container;
    jqueryMap = {$container}
  }

  changeAnchorPart = (arg_map) => {
    let anchor_map_revise = copyAnchorMap(),
      bool_return = true,
      key_name, key_name_dep

    for (key_name in arg_map) {
      if (arg_map.hasOwnProperty(key_name)) {
        if (key_name.indexOf('_') === 0) continue
      }

      anchor_map_revise[key_name] = arg_map[key_name]

      key_name_dep = '_' + key_name

      if (arg_map[key_name_dep]) {
        anchor_map_revise[key_name_dep] = arg_map[key_name_dep]
      } else {
        delete anchor_map_revise[key_name_dep]
        delete anchor_map_revise['_s' + key_name_dep]
      }
    }

    try {
      $.uriAnchor.setAnchor(anchor_map_revise)
    } catch (error) {
      $.uriAnchor.setAnchor(stateMap.anchor_map, null, true)
      bool_return = false
    }

    return bool_return
  }

  /*setJqueryMap = function () {
   let $container = stateMap.$container
   jqueryMap = {
   $container,
   $chat: $container.find('.spa-shell-chat')
   }
   }*/

  onHashchange = (e) => {
    let _s_chat_previous, _s_chat_proposed, s_chat_proposed,
      anchor_map_proposed,
      is_ok = true,
      anchor_map_previous = copyAnchorMap()

    try {
      anchor_map_proposed = $.uriAnchor.makeAnchorMap()
    } catch (error) {
      $.uriAnchor.setAnchor(anchor_map_previous, null, true);
      return false
    }
    stateMap.anchor_map = anchor_map_proposed

    _s_chat_previous = anchor_map_previous._s_chat
    _s_chat_proposed = anchor_map_proposed._s_chat

    if (!anchor_map_previous || _s_chat_previous !== _s_chat_proposed) {
      s_chat_proposed = anchor_map_proposed.chat
      switch (s_chat_proposed) {
        case 'opened' :
          is_ok = spa.chat.setSliderPosition('opened')
          break
        case 'closed':
          is_ok = spa.chat.setSliderPosition('closed')
          break
        default:
          spa.chat.setSliderPosition('closed')
          delete anchor_map_proposed.chat
          $.uriAnchor.setAnchor(anchor_map_proposed, null, true)
      }
    }

    if (!is_ok) {
      if (anchor_map_previous) {
        $.uriAnchor.setAnchor(anchor_map_previous, null, true)
      } else {
        delete anchor_map_proposed.chat
        $.uriAnchor.setAnchor(anchor_map_proposed, null, true)
      }
    }
    return false
  }

  setChatAnchor = (position_type) => {
    return changeAnchorPart({chat: position_type})
  }

  initModule = function ($container) {
    stateMap.$container = $container
    $container.html(configMap.main_html)
    // jqueryMap: container + chat对话框
    setJqueryMap()

    $.uriAnchor.configModule({
      schema_map: configMap.anchor_schema_map
    })
    spa.chat.configModule({
      set_chat_anchor: setChatAnchor,
      chat_model: spa.model.chat,
      people_model: spa.model.people
    })
    spa.chat.initModule(jqueryMap.$container)

    $(window)
      .bind('resize', onResize)
      .bind('hashchange', onHashchange)
      .trigger('hashchange')
  }

  return {initModule}
}
