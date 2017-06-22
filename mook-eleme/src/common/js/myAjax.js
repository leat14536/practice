/**
 * Created by Administrator on 2017/6/15 0015.
 */
/*
 *   一个简单的封装ajax请求
 *   因为axios尚不完善使用时产生了不明bug
 *   用原生js写ajx代码太过难看
 *   因此封装一个ajax,用到什么 支持什么
 * */

let __defaultOption__ = {
  method: 'get',     // 请求方式
  url: '',
  head: null,        // 请求头
  data: null,
  success: null,     // 成功调用
  fail: null,        // 失败调用
  loadTime: 10000,    // 请求等待时间
  sync: true,         // 是否异步
  ctx: null           // 上下文
};

ajax.proxyHead = '';   // 使用代理时的头部

export default function ajax (opt) {
  if (!opt) return;
  let option = Object.assign({}, __defaultOption__, opt);

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open(option.method, ajax.proxyHead + option.url, option.sync);

  // 请求头
  if (option.head) {
    for (let key in option.head) {
      if (!option.head.hasOwnProperty(key)) break;
      xmlhttp.setRequestHeader(key, option.head[key]);
    }
  }

  // data
  let str = '';
  if (option.method.toLowerCase() === 'post' && option.data) {
    for (let key in option.data) {
      if (str) str += '&';
      str += key + '=' + option.data[key];
    }
  }

  xmlhttp.send(str);

  // 返回
  new Promise((resolve, reject) => {
    xmlhttp.onreadystatechange = (e) => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        resolve(JSON.parse(xmlhttp.responseText));
      }
    };
    setTimeout(() => {
      reject('too late');
    }, option.loadTime);
  }).then((data) => {
    // 成功
    if (option.success) {
      option.success.call(option.ctx, data);
    }
  }, (e) => {
    if (option.fail) {
      // 失败
      option.fail(e);
    }
  });
}
