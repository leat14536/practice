/**
 * Created by Administrator on 2017/4/17 0017.
 */
var EventEmitter = require('events').EventEmitter

var life = new EventEmitter();

life.on('aaa',function(str){
    console.log(str+' a1');
})

life.emit('aaa','参数')