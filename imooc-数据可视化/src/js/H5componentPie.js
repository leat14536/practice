/**
 * Created by Administrator on 2017/7/29 0029.
 */
import $ from 'jquery'
import H5ComponentBase from './H5componentBase.js'

export default class H5ComponentPie extends H5ComponentBase {
  constructor(name, cfg) {
    let component = super(...arguments)

    // 绘制网格线
    let w = cfg.width;
    let h = cfg.height;
    let cns = document.createElement('canvas')
    let ctx = cns.getContext('2d')
    cns.width = w
    cns.height = h

    let r = w / 2

    ctx.beginPath();
    ctx.fillStyle = '#eee'
    ctx.strokeStyle = '#eee'
    ctx.lineWidth = 1
    ctx.arc(r, r, r, 0, 2 * Math.PI)
    ctx.fill()

    //绘制折线
    //数据层画布
    let dataCns = document.createElement('canvas')
    let dataCtx = dataCns.getContext('2d')
    dataCns.width = w
    dataCns.height = h

    let colors = ['red', 'green', 'blue', 'orange', 'gray', 'yellow']
    let sAngel = 1.5 * Math.PI
    let eAngel = 0
    let aAngel = Math.PI * 2

    // ctx.beginPath();
    // ctx.fillStyle = '#f00'
    // ctx.strokeStyle = '#f00'
    // ctx.lineWidth = 1
    // ctx.moveTo(r, r)
    // ctx.arc(r, r, r, sAngel, eAngel)
    // ctx.fill()
    // ctx.stroke()

    let step = cfg.data.length

    for (let i = 0; i < step; i++) {
      let item = cfg.data[i]
      let color = item[2] || colors.pop()

      eAngel = sAngel + aAngel * item[1]
      dataCtx.beginPath();
      dataCtx.fillStyle = color
      dataCtx.strokeStyle = color
      dataCtx.lineWidth = 1
      dataCtx.moveTo(r, r)
      dataCtx.arc(r, r, r, sAngel, eAngel)
      dataCtx.fill()

      sAngel = eAngel

      // 加入所有项目文本以及百分比
      let text = $('<div class="text">')
      text.text(cfg.data[i][0])
      let per = $('<div class="per">')
      per.text(cfg.data[i][1] * 100 + '%')
      text.append(per)

      let x = r + Math.sin(.5 * Math.PI - sAngel) * r
      let y = r + Math.cos(.5 * Math.PI - sAngel) * r
      x > w / 2 ? text.css('left', x / 2) : text.css('right', (w - x) / 2)
      y > h / 2 ? text.css('top', y / 2) : text.css('bottom', (h - y) / 2)

      if (item[2]) text.css('color', item[2])
      text.css('opacity', 0)
      component.append(text)
    }

    let wrapCns = document.createElement('canvas')
    let wrapCtx = wrapCns.getContext('2d')
    wrapCns.width = w
    wrapCns.height = h
    sAngel = 1.5 * Math.PI

    wrapCtx.beginPath();
    wrapCtx.fillStyle = '#eee'
    wrapCtx.strokeStyle = '#eee'
    wrapCtx.lineWidth = 1

    let draw = (per) => {
      wrapCtx.clearRect(0, 0, w, h)

      wrapCtx.beginPath();
      wrapCtx.moveTo(r, r)
      if (per <= 0) {
        wrapCtx.arc(r, r, r, 0, 2 * Math.PI, true)
      } else if (per <= 1) {
        wrapCtx.arc(r, r, r, sAngel, sAngel + 2 * Math.PI * per, true)
      }

      wrapCtx.fill()
      wrapCtx.stroke()

      if (per >= 1) {
        component.find('.text').css('opacity', 1)
      } else {
        component.find('.text').css('opacity', 0)
      }
    }

    draw(0)

    component.on('onLoad', () => {
      let s = 0;
      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          s += .01
          draw(s)
        }, i * 10 + 500)
      }
    })

    component.on('onLeave', () => {
      let s = 1
      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          s -= .01
          draw(s)
        }, i * 10 + 500)
      }
    })
    component.append(cns)
    component.append(dataCns)
    component.append(wrapCns)
    return component
  }
}
