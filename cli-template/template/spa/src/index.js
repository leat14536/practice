import g from './global'

/* eslint-disable no-unused-vars */
const bar = () => import('./view/bar')
const foo = () => import('./view/foo')

const routes = {
  '/bar': bar,
  '/foo': foo
}

// Router类, 用来控制页面根据当前URL切换
class Router {
  start() {
    // 点击浏览器后退/前进按钮时会触发window.onpopstate事件, 我们在这时切换到相应页面
    // https://developer.mozilla.org/en-US/docs/Web/Events/popstate
    window.addEventListener('popstate', () => {
      this.load(location.pathname)
    })

    // 打开页面时加载当前页面
    this.load(location.pathname)
  }

  // 前往path, 会变更地址栏URL, 并加载相应页面
  go(path) {
    // 变更地址栏URL
    history.pushState({}, '', path)
    // 加载页面
    this.load(path)
  }

  // 加载path路径的页面
  load(path) {
    // 创建页面实例
    routes[path]().then((module) => {
      const View = module.default
      const view = new View()
      view.mount(document.body)
    })
  }
}

// new一个路由对象, 赋值为g.router, 这样我们在其他js文件中可以引用到
g.router = new Router()
// 启动
g.router.go('/foo')
g.router.start()
