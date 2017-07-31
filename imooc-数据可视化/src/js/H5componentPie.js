/**
 * Created by Administrator on 2017/7/29 0029.
 */
(function (window, factory) {

  window.H5ComponentPie = factory()
})(window, function () {

  class H5ComponentPie extends H5ComponentBase {
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
        ctx.beginPath();
        ctx.fillStyle = color
        ctx.strokeStyle = color
        ctx.lineWidth = 1
        ctx.moveTo(r, r)
        ctx.arc(r, r, r, sAngel, eAngel)
        ctx.fill()

        sAngel = eAngel
      }

      let wrapCns = document.createElement('canvas')
      let wrapCtx = dataCns.getContext('2d')
      wrapCns.width = w
      wrapCns.height = h

      wrapCtx.beginPath();
      wrapCtx.fillStyle = '#eee'
      wrapCtx.strokeStyle = '#eee'
      wrapCtx.lineWidth = 1

      let draw = (per) => {
        wrapCtx.clearRect(0, 0, w, h)

        wrapCtx.beginPath();
        wrapCtx.moveTo(r, r)
        console.log(per)
        if (per <= 0) {
          wrapCtx.arc(r, r, r, 0, 2 * Math.PI, true)
        } else {
          wrapCtx.arc(r, r, r, sAngel, sAngel + 2 * Math.PI * per, true)
        }
        wrapCtx.fill()
        wrapCtx.stroke()
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
      component.append(wrapCns)
      return component
    }
  }

  return H5ComponentPie
})
