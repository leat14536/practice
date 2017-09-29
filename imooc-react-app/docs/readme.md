# react app 

react + redux + react-router v4
 
webpack 的配置是在vue-cli的配置基础上进行修改得到的

遇到的问题: 

1. react-router 4 懒加载的方法很不优雅而且有各种各样的问题, 实际上线的项目还是建议使用v3及以下版本
2. 缺少缓存, 点击后退依然会重新发送请求, 原则上是将数据存储在redux里边, 后退操作直接渲染redux的数据
3. 没有使用类似iscroll的插件, 加载使用点击触发, 后续可能会添加上拉加载功能 

暂时告一段落