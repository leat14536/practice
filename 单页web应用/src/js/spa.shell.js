import jquery from 'jquery'

export let shell = function (spa, $=jquery) {
  let
    configMap = {
      anchor_schema_map: {
        chat: {open: true, closed: true}
      },
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
                        <div class="spa-shell-chat"></div>
                        <div class="spa-shell-modal"></div>
                      </div>`,
      chat_extend_time: 250,
      chat_retract_time: 300,
      chat_extend_height: 450,
      chat_retract_height: 15,
      chat_extend_title: 'Click to retract',
      chat_retract_title: 'Click to extend'

    },
    stateMap = {
      $container: null,
      anchor_map: {},
      is_chat_retracted: true
    },
    jqueryMap = {},
    copyAnchorMap, changeAnchorPart, onHashchange, setJqueryMap, toggleChat, onClickChat, initModule;

  copyAnchorMap = () => {
    return Object.assign({}, stateMap.anchor_map)
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

  setJqueryMap = function () {
    let $container = stateMap.$container
    jqueryMap = {
      $container,
      $chat: $container.find('.spa-shell-chat')
    }
  }

  onHashchange = (e) => {
    let anchor_map_previous = copyAnchorMap(),
      anchor_map_proposed,
      _s_chat_previous, _s_chat_proposed, s_chat_proposed

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
        case 'open' :
          toggleChat(true)
          break
        case 'closed':
          toggleChat(false)
          break
        default:
          toggleChat(false)
          delete anchor_map_proposed.chat
          $.uriAnchor.setAnchor(anchor_map_proposed, null, true)
      }
    }
    return false
  }

  toggleChat = function (do_extend, callback) {
    let px_chat_ht = jqueryMap.$chat.height(),
      is_open = px_chat_ht === configMap.chat_extend_height,
      is_closed = px_chat_ht === configMap.chat_retract_height,
      is_sliding = !is_open && !is_closed

    if (is_sliding) {
      return
    }

    if (do_extend) {
      jqueryMap.$chat.animate({
        height: configMap.chat_extend_height
      }, configMap.chat_extend_time, () => {
        jqueryMap.$chat.attr('title', configMap.chat_extend_title)
        stateMap.is_chat_retracted = false

        if (callback) callback(jqueryMap.$chat)
      })
      return true
    }

    jqueryMap.$chat.animate({
      height: configMap.chat_retract_height
    }, configMap.chat_retract_time, () => {
      jqueryMap.$chat.attr('title', configMap.chat_retract_title)
      stateMap.is_chat_retracted = true

      if (callback) callback(jqueryMap.$chat)
    })
    return true
  }

  onClickChat = function (e) {
    changeAnchorPart({
      chat: (stateMap.is_chat_retracted ? 'open' : 'closed')
    })
    return false
    /* if (toggleChat(stateMap.is_chat_retracted)) {
     $.uriAnchor.setAnchor({
     chat: (stateMap.is_chat_retracted ? 'open' : 'closed')
     })
     }*/
//    toggleChat(stateMap.is_chat_retracted)
//    return false
  }

  initModule = function ($container) {
    stateMap.$container = $container
    $container.html(configMap.main_html)
    // jqueryMap: container + chat对话框
    setJqueryMap()

    stateMap.is_chat_retracted = true
    jqueryMap.$chat
      .attr('title', configMap.chat_retract_title)
      .click(onClickChat)

    $.uriAnchor.configModule({
      schema_map: configMap.anchor_schema_map
    })

    spa.chat.configModule({})
    spa.chat.initModule(jqueryMap.$chat)

    $(window).bind('hashchange', onHashchange).trigger('hashchange')
  }

  return {initModule}
}
