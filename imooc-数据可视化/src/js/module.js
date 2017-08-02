/**
 * Created by Administrator on 2017/8/1 0001.
 */
const Bar = (resolve) => {
  import('./js/H5componentBar.js').then((module) => {
    resolve(module)
  })
}

const Pie = (resolve) => {
  import('./js/H5componentPie.js').then((module) => {
    resolve(module)
  })
}

const Point = (resolve) => {
  import('./js/H5componentPoint.js').then((module) => {
    resolve(module)
  })
}

const Polyline = (resolve) => {
  import('./js/H5componentPolyline.js').then((module) => {
    resolve(module)
  })
}

const Radar = (resolve) => {
  import('./js/H5componentRadar.js').then((module) => {
    resolve(module)
  })
}

function resolveAsyncComponents(component) {
  let promise;
  return function() {
    if(!promise){
      promise = new Promise((resolve, reject) => {
        component(resolve)
      })
    }
    return promise
  }
}

export default {
  Bar: resolveAsyncComponents(Bar),
  Pie: resolveAsyncComponents(Pie),
  Point: resolveAsyncComponents(Point),
  Polyline: resolveAsyncComponents(Polyline),
  Radar: resolveAsyncComponents(Radar)
}
