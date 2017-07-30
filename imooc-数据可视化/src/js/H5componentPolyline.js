/**
 * Created by Administrator on 2017/7/29 0029.
 */
(function (window, factory) {

  window.H5ComponentPolyline = factory()
})(window, function () {

  class H5ComponentPolyline extends H5ComponentBase {
    constructor(name, cfg) {
      let component = super(...arguments)

      // 绘制网格线
      let w = cfg.width;
      let h = cfg.height;
      let cns = document.createElement('canvas')
      let ctx = cns.getContext('2d')
      cns.width = w
      cns.height = h
      component.append(cns)

      ctx.stroke()

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
      for (let i = 0; i < step + 1; i++) {
        let x = (w / step) * i
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
      }

      ctx.stroke()

      //绘制折线
      //数据层画布
      let dataCns = document.createElement('canvas')
      let dataCtx = dataCns.getContext('2d')
      dataCns.width = w
      dataCns.height = h
      component.append(dataCns)

      dataCtx.beginPath()
      dataCtx.lineWidth = 3
      dataCtx.strokeStyle = '#ff8878'

      let x = 0
      let y = 0
      let row_w = w / step
      cfg.data.forEach((item, index) => {
        x = row_w * (index + 1)
        y = h * (1 - item[1])
        dataCtx.moveTo(x, y)
        dataCtx.arc(x, y, 5, 0, 2 * Math.PI)
      })

      let text_w = w / step >> 0

      dataCtx.moveTo(row_w, h * (1 - cfg.data[0][1]))
      cfg.data.forEach((item, index) => {
        x = row_w * (index + 1)
        y = h * (1 - item[1])
        dataCtx.lineTo(x, y)

        let text = $('<div class="text">')
        text.text(item[0])
        text.css('width', text_w).css('left', x / 2 - text_w / 2)

        component.append(text)
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
        y = h * (1 - item[1])
        dataCtx.moveTo(x, y)
        dataCtx.fillStyle = item[2] ? item[2] : '#595959'
        ctx.fillText(((item[1] * 100) >> 0) + '%', x - 10, y - 10)
      })

      dataCtx.stroke()
      return component
    }
  }

  return H5ComponentPolyline
})
