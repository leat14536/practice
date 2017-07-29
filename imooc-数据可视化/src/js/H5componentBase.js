/**
 * Created by Administrator on 2017/7/29 0029.
 */
(function (window) {
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
    cfg.bg && component.css('backgroundImage', 'url(' + cfg.bg + ')')

    if (cfg.center) {
      component.css({
        marginLeft: (cfg.width / 4 * -1 + 'px'),
        left: '50%'
      })
    }

    component.on('onLoad', function () {
      component.addClass(nameCls + '_load').removeClass(nameCls + '_leave')
      cfg.animateIn && component.animate(cfg.animateIn)
      return false
    })

    component.on('onLeave', function () {
      component.addClass(nameCls + '_leave').removeClass(nameCls + '_load')
      cfg.animateOut && component.animate(cfg.animateOut)
      return false
    })

    return component
  }

  window.H5ComponentBase = H5ComponentBase
})(window)
