/**
 * Created by Administrator on 2017/7/29 0029.
 */
import $ from 'jquery'
import H5ComponentBase from './H5componentBase.js'

export default class H5ComponentRadar extends H5componentBase {
  constructor(name, cfg) {
    let component = super(...arguments)

    // 绘制网格线
    let w = cfg.width;
    let h = cfg.height;
    let cns = document.createElement('canvas')
    let ctx = cns.getContext('2d')
    cns.width = w
    cns.height = h

    let r = h / 2
    let step = cfg.data.length

    /*
     *   rad = (2 * Math.PI / 360) * (360 / step) * i
     *   x = r + Math.sin(rad) * r
     *   y = r + Math.cos(rad) * r
     * */
    for (let s = 10; s > 0; s--) {
      ctx.beginPath()
      for (let i = 0; i < step; i++) {
        let rad = (2 * Math.PI / 360) * (360 / step) * i
        let x = r + Math.sin(rad) * r * (s / 10)
        let y = r + Math.cos(rad) * r * (s / 10)

        ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fillStyle = s % 2 ? '#f1f9ff' : '#99c0ff'
      ctx.fill()
    }

    for (let i = 0; i < step; i++) {
      let rad = (2 * Math.PI / 360) * (360 / step) * i
      let x = r + Math.sin(rad) * r
      let y = r + Math.cos(rad) * r
      ctx.moveTo(r, r)
      ctx.lineTo(x, y)

      //绘制文字
      let text = $('<div class="text">')
      text.text(cfg.data[i][0])
      if (x > w / 2) {
        text.css('left', x / 2)
      } else {
        text.css('right', (w - x) / 2)
      }
      if (y > h / 2) {
        text.css('top', y / 2)
      } else {
        text.css('bottom', (h - y) / 2)
      }

      if (cfg.data[i][2]) {
        text.css('color', cfg.data[i][2])
      }

      text.css('opacity', 0)

      component.append(text)
    }
    ctx.strokeStyle = '#e0e0e0'
    ctx.stroke()

    let dataCns = document.createElement('canvas')
    let dataCtx = dataCns.getContext('2d')
    dataCns.width = w
    dataCns.height = h

    let draw = (per) => {
      if (per >= 1) {
        component.find('.text').css('opacity', 1)
      } else {
        component.find('.text').css('opacity', 0)
      }

      dataCtx.clearRect(0, 0, w, h)
      // 折线
      dataCtx.beginPath()
      dataCtx.strokeStyle = '#f00'
      for (let i = 0; i < step; i++) {
        let rad = (2 * Math.PI / 360) * (360 / step) * i
        let rate = cfg.data[i][1] * per
        let x = r + Math.sin(rad) * r * rate
        let y = r + Math.cos(rad) * r * rate
        dataCtx.lineTo(x, y)

      }
      dataCtx.closePath()
      dataCtx.stroke()

      dataCtx.fillStyle = '#ff7676'
      for (let i = 0; i < step; i++) {
        let rad = (2 * Math.PI / 360) * (360 / step) * i
        let rate = cfg.data[i][1] * per
        let x = r + Math.sin(rad) * r * rate
        let y = r + Math.cos(rad) * r * rate
        dataCtx.beginPath()
        dataCtx.arc(x, y, 5, 0, 2 * Math.PI)
        dataCtx.closePath()
        dataCtx.fill()
      }
    }

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
    return component
  }
}
