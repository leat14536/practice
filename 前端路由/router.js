/**
 * Created by Administrator on 2017/7/19 0019.
 */
let SPA_RESOLVE_INIT;

((window) => {

    let util = {
        //获取路由路径及参数
        getParamsUrl(){
            let hashDetail = location.hash.split('?'),
                hashname = hashDetail[0].split('#')[1],
                params = hashDetail[1] ? hashDetail[1].split('&') : [],
                query = {}

            for (let i = 0; i < params.length; i++) {
                let item = params[i].split('=')
                query[item[0]] = item [1]
            }

            return {
                path: hashname,
                query
            }
        }
    }

    class spaRouters {
        constructor() {
            this.routers = {} //缓存
        }

        init() {
            window.addEventListener('hashchange', () => {
                this.urlChange()
            })
            window.addEventListener('load', () => {
                this.urlChange()
            })
        }

        //路由处理
        urlChange() {
            let currentHash = util.getParamsUrl()
            if (this.routers[currentHash.path]) {
                this.refresh(currentHash)
            }
        }

        refresh(currentHash) {
            if (this.befortFun) {
                this.beforeFun({
                    to: {
                        path: currentHash.path,
                        query: currentHash.query
                    },
                    next() {
                        this.routers[currentHash.path].callback.call(this, currentHash)
                    }
                })
            } else {
                this.routers[currentHash.path].callback.call(this, currentHash)
            }
        }

        map(path, callback) {
            path = path.replace(/\s*/g, '')

            if (callback && Object.prototype.toString.call(callback) === "[object Function]") {
                this.routers[path] = {
                    callback,
                    fn: null
                }
            } else {
                console.log(`注册${path}需要回调信息`)
            }

        }

        syncFun(file, transition) {
            if (this.routers[transition.path].fn) {
                this.afterFun && this.afterFunc(transition)
                this.routers[transition.path].fn(transition)
            } else {
                let _body = document.getElementsByTagName('body')[0]
                let scriptEle = document.createElement('script')
                scriptEle.type = 'text/javascript'
                scriptEle.src = file
                scriptEle.async = true
                SPA_RESOLVE_INIT = null
                scriptEle.onload = () => {
                    this.afterFun && this.afterFun(transition)
                    this.routers[transition.path].fn = SPA_RESOLVE_INIT
                    this.routers[transition.path].fn(transition)
                }

                _body.appendChild(scriptEle)
            }
        }
    }

    window
        .spaRouters = new spaRouters();
})(window)