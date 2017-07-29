/**
 * Created by Administrator on 2017/7/29 0029.
 */
(function (window, factory) {

  window.H5ComponentBar = factory()
})(window, function () {

  class H5ComponentBar extends H5ComponentBase {
    constructor(name, cfg) {
      let component = super(...arguments)
      $.each(cfg.data, function(index, item) {
        console.log(item)
      })
      return component
    }
  }

  return H5ComponentBar
})
