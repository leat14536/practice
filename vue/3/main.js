/**
 * Created by Administrator on 2017/5/1 0001.
 */

import myEvent from '../event.js'



(function(window,myEvent){

    function Observer(data){
        return new _Observer(data,[])
    }

    function _Observer(data,parentKeys){
        this.data = data;               //true时监控对象内部变化
        this._walk(data,parentKeys);
    }

    _Observer.prototype = {
        _walk(data,parentKeys){
            for ( let key in data ) {
                let val = data[key];
                if(typeof val=='object'){
                    new _Observer(val,[...parentKeys,key]);
                }
                this._convert( key, val ,[...parentKeys,key]);
            }
        },
        _convert(key,val,parentKeys){
            Object.defineProperty(this.data,key,{
                enumerable: true,
                configurable: true,
                set(newVal){
                    console.log('你设置了' + key + ' , 新的值为 ' + newVal)
                    if(typeof newVal=='object') {
                        new _Observer(newVal,parentKeys)
                    }

                    //事件冒泡
                    myEvent.pop(parentKeys, newVal, val);
                    if(newVal===val) return;
                    val = newVal;
                },
                get(){
                    console.log('你访问了 '+key)
                    return val;
                },
            })
        },
        $watch(key,callback){
            //注册事件
            myEvent.on(key,callback);
        }
    }


    window.Observer = Observer;
})(window, new myEvent() )
