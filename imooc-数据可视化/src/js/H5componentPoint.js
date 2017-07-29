/**
 * Created by Administrator on 2017/7/29 0029.
 */
(function (window, factory) {
  window.H5ComponentPoint = factory()
})(window, function () {
  class H5ComponentPoint extends H5ComponentBase {
    constructor(name, cfg) {
      let component = super(...arguments)
      let base = cfg.data[0][1]   //以第一个数据的比例大小为100%
      $.each(cfg.data, (index, item) => {
        let point = $(`<div class="point point_${index}">`)
        let name = $(`<div class="name">${item[0]}</div>`)
        let rate = $(`<div class="per">${item[1] * 100 + '%'}</div>`)

        let per = item[1] / base * 100 + '%'
        name.append(rate)
        point.append(name)

        point.width(per).height(per)
        if (item[2]) {
          point.css('backgroundColor', item[2])
        }

        if (item[3] !== undefined && item[4] !== undefined) {
          point.css('left', item[3]).css('top', item[4])
        }

        component.append(point)
      })


      return component
    }
  }

  return H5ComponentPoint
})
