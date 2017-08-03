/**
 * Created by Administrator on 2017/7/29 0029.
 */
let _id = 0
let H5ComponentBase = function (name, cfg) {
  cfg = cfg || {}
  let typeCls = 'h5_component_' + cfg.type
  let nameCls = 'h5_component_name_' + name
  let component = $(`<div class="h5_component ${typeCls} ${nameCls}" id="h5_c_${_id++}">`)

  cfg.text && component.text(cfg.text)
  cfg.width && component.width(cfg.width / 2)
  cfg.height && component.height(cfg.height / 2)

  cfg.css && component.css(cfg.css)
  cfg.bg && component.css('backgroundImage', 'url(' + require('../' + cfg.bg) + ')')

  if (cfg.center) {
    component.css({
      marginLeft: (cfg.width / 4 * -1 + 'px'),
      left: '50%'
    })
  }

  if(typeof cfg.onclick=== 'function') {
    component.on('click', cfg.onclick)
  }

  component.on('onLoad', function () {
    setTimeout(() => {
      component.addClass(typeCls + '_load').removeClass(typeCls + '_leave')
      cfg.animateIn && component.animate(cfg.animateIn)
    }, cfg.delay || 0)
    return false
  })

  component.on('onLeave', function () {
    component.addClass(typeCls + '_leave').removeClass(typeCls + '_load')
    cfg.animateOut && component.animate(cfg.animateOut)
    return false
  })

  return component
}

export default H5ComponentBase
