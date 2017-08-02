/**
 * Created by Administrator on 2017/7/29 0029.
 */
import $ from 'jquery'
import H5ComponentBase from './H5componentBase.js'

export default class H5ComponentPolyline extends H5ComponentBase {
  constructor(name, cfg) {
    let component = super(...arguments)

    // 绘制网格线
    let w = cfg.width;
    let h = cfg.height;
    let cns = document.createElement('canvas')
    let ctx = cns.getContext('2d')
    cns.width = w
    cns.height = h

    // 水平网格 100份 -> 10份
    let step = 10
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.strokeStyle = '#aaa'
    for (let i = 0; i < step + 1; i++) {
      let y = (h / step) * i
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
    }

    step = cfg.data.length + 1
    let text_w = w / step >> 0
    for (let i = 0; i < step + 1; i++) {
      let x = (w / step) * i
      ctx.moveTo(x, 0)
      ctx.lineTo(x, h)
      if (cfg.data[i]) {
        let text = $('<div class="text">')
        text.text(cfg.data[i][0])
        text.css('width', text_w).css('left', x / 2)

        component.append(text)
      }
    }

    ctx.stroke()

    //绘制折线
    //数据层画布
    let dataCns = document.createElement('canvas')
    let dataCtx = dataCns.getContext('2d')
    dataCns.width = w
    dataCns.height = h

    let draw = (per) => {
      dataCtx.clearRect(0, 0, w, h)
      dataCtx.beginPath()
      dataCtx.lineWidth = 3
      dataCtx.strokeStyle = '#ff8878'

      let x = 0
      let y = 0
      let row_w = w / step
      cfg.data.forEach((item, index) => {
        x = row_w * (index + 1)
        y = h * (1 - item[1] * per)
        dataCtx.moveTo(x, y)
        dataCtx.arc(x, y, 5, 0, 2 * Math.PI)
      })

      dataCtx.moveTo(row_w, h * (1 - cfg.data[0][1] * per))
      cfg.data.forEach((item, index) => {
        x = row_w * (index + 1)
        y = h * (1 - item[1] * per)
        dataCtx.lineTo(x, y)
      })
      dataCtx.stroke()
      dataCtx.lineWidth = 1
      dataCtx.fillStyle = 'rgba(255,138,120, 0)'

      dataCtx.lineTo(row_w * cfg.data.length, h)
      dataCtx.lineTo(row_w, h)
      dataCtx.fillStyle = 'rgba(255,138,120, 0.2)'
      dataCtx.fill()

      //写数据
      cfg.data.forEach((item, index) => {
        x = row_w * (index + 1)
        y = h * (1 - item[1] * per)
        dataCtx.moveTo(x, y)
        dataCtx.fillStyle = item[2] ? item[2] : '#595959'
        dataCtx.fillText(((item[1] * 100) >> 0) + '%', x - 10, y - 10)
      })

      dataCtx.stroke()
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
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          s -= .1
          draw(s)
        }, i * 10 + 500)
      }
    })

    component.append(cns)
    component.append(dataCns)
    return component
  }
}
