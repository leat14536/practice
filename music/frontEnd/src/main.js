// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ajax from './plugin/myAjax'

Vue.config.productionTip = false;

ajax.proxyHead = '/api';      //代理的头部打包时删除此行
Vue.prototype.$http = ajax;

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
