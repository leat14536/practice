/**
 * Created by Administrator on 2017/7/29 0029.
 */
/* 内容管理 */
import H5componentBase from './H5componentBase.js'
import {Bar, Pie, Point, Polyline, Radar} from './module.js'

let _id = 0
let H5 = function () {
  this.el = $(`<div class="h5" id="h5_${_id++}">`).hide()
  this.page = []
  $('body').append(this.el)
}

H5.prototype = {
  addPage(name, text) {
    let page = $('<div class="h5_page section">')

    if (name !== undefined) {
      page.addClass('h5_page_' + name)
    }

    if (text !== undefined) {
      page.text(text)
    }

    this.el.append(page)
    this.page.push(page)
    return this
  },
  addComponent(name, cfg){
    let component;
    let page = this.page.slice(-1)[0]

    cfg = Object.assign({type: 'base'}, cfg)

    switch (cfg.type) {
      case 'base':
        component = new H5componentBase(name, cfg)
        break;
      default:
        console.log('addcomponent', 'error')
    }
    page.append(component)
    return this
  },

  // 初始化对象呈现
  loader(firstPage) {
    this.el.show()
    this.el.fullpage({
      onLeave(index, nextIndex, direction) {
        $(this).find('.h5_component').trigger('onLeave')
      },
      afterLoad(anchorLink, index) {
        $(this).find('.h5_component').trigger('onLoad')
      }
    })
    this.page[0].trigger('onLoad')
    firstPage !== undefined && $.fn.fullpage.moveTo(firstPage)
  }
}

export default H5
