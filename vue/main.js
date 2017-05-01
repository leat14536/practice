/**
 * Created by Administrator on 2017/5/1 0001.
 */


import {myEvent} from 'event.js'
window.onload=()=> {
    console.log(myEvent);
}


/*function Observer(data){          //parentKey 数组,记录父节点的key
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk(data){
        for ( let key in data ) {
            let val = data[key];
            if(typeof val=='object'){
                new Observer(val)
            }
            this.convert( key, val, fn );
        }
    },
    convert(key,val){
        Object.defineProperty(this.data,key,{
            enumerable: true,
            configurable: true,
            set(newVal){
                if(typeof newVal=='object') {
                    new Observer(newVal)
                }else {
                    console.log('你设置了' + key + ' , 新的值为 ' + newVal)
                    if(fn){
                        fn(newVal);
                    }
                }
                if(newVal===val) return;
                val = newVal;
            },
            get(){
                console.log('你访问了 '+key)
                return val;
            },
        })
    },
    $watch(key,fn){

    },
}*/
