/**
 * Created by Administrator on 2017/7/29 0029.
 */
/* 内容管理 */
import H5componentBase from './H5componentBase.js'

const bar = () => import('./H5componentBar.js')

const pie = () => import('./H5componentPie.js')

const point = () => import('./H5componentPoint.js')

const polyline = () => import('./H5componentPolyline.js')

const radar = () => import('./H5componentRadar.js')

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

    if (typeof this.whenAddPage === 'function') {
      this.whenAddPage()
    }
    return this
  },
  addComponent(name, cfg){
    let component;
    let page = this.page.slice(-1)[0]

    cfg = Object.assign({type: 'base'}, cfg)

    switch (cfg.type) {
      case 'base':
        component = new H5componentBase(name, cfg)
        page.append(component)
        break;
      case 'polyline':
        polyline().then((module) => {
          component = new module.default(name, cfg)
          page.append(component)
        })
        break;
      case 'pie':
        pie().then((module) => {
          component = new module.default(name, cfg)
          page.append(component)
        })
        break;
      case 'bar':
        bar().then((module) => {
          component = new module.default(name, cfg)
          page.append(component)
        })
        break;
      case 'radar':
        radar().then((module) => {
          component = new module.default(name, cfg)
          page.append(component)
        })
        break;
      case 'point':
        point().then((module) => {
          component = new module.default(name, cfg)
          page.append(component)
        })
        break;
      default:
        console.log('addcomponent', 'error')
    }
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
