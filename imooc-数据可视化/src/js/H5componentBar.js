/**
 * Created by Administrator on 2017/7/29 0029.
 */
(function (window, factory) {

  window.H5ComponentBar = factory()
})(window, function () {

  class H5ComponentBar extends H5ComponentBase {
    constructor(name, cfg) {
      let component = super(...arguments)
      $.each(cfg.data, function (index, item) {
        let line = $('<div class="line">')
        let name = $('<div class="name">')
        let rate = $('<div class="rate">')
        let per = $('<div class="per">')
        let width = item[1] * 100 + '%'
        let bg = ''

        if(item[2]) {
          bg = `style="background-color:${item[2]}"`
        }

        rate.html(`<div class="bg" ${bg}></div>`)

        rate.css('width', width)
        name.text(item[0])
        per.text(width)
        line.append(name).append(rate).append(per)

        component.append(line)
      })
      return component
    }
  }

  return H5ComponentBar
})
