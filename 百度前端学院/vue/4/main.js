/**
 * Created by Administrator on 2017/5/1 0001.
 */

import myEvent from '../event.js'



(function(window,myEvent){
    //匹配{{string}}正则
    const replaceReg = /({{[^{}]+}})/g;
    const resolvedReg = /([^.{}]+)/g;

    function Vue(vueData){
        let callback = new _Observer(vueData.data,[]);
        callback._render(vueData.el);
        return callback;
    }

    function _Observer(data,parentKeys){
        this.data = data;               //true时监控对象内部变化
        this._walk(data,parentKeys);
        this.deep = false;
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
                    //console.log('你设置了' + key + ' , 新的值为 ' + newVal)
                    if(typeof newVal=='object') {
                        new _Observer(newVal,parentKeys)
                    }

                    if(newVal===val) return;
                    let oldVal = val;
                    val = newVal;
                    if(this.deep) {
                        //事件冒泡
                        myEvent.pop(parentKeys, val, oldVal);
                    }else{
                        myEvent.emit(key, val, oldVal)
                    }
                },
                get(){
                    //console.log('你访问了 '+key)
                    return val;
                },
            })
        },
        _render(el){
            let dom;
            if(typeof el==='string') dom = document.querySelector(el); //类jq选择
            else dom = el;                                             //传入dom 这里暂不做判断
            let domArr = screen(dom);



            domArr.forEach((obj)=>{
                textNodeRender.apply(this,[obj.node,obj.node.nodeValue]);
            })


        },
        $watch(key,callback,deep=false){
            //注册事件
            this.deep = deep;
            myEvent.on(key,callback);
        }
    }


    function screen(dom){
        let domArr = [];
        screenDom(dom);
        //返回可替换的text节点
        return domArr;

        //递归遍历dom
        function screenDom(dom) {
            dom.childNodes.forEach((node)=> {
                if(node.nodeType==3&&replaceReg.test(node.nodeValue)){
                    domArr.push({node:node})
                }else if(node.nodeType==1){
                    screenDom(node);
                }
            })
        }
    }

    function getVal(obj,keys){
        let val;
        keys.forEach((attr)=>{
            //console.log(obj)
            obj = obj[attr];
            //console.log(obj)
            val = obj;
        })
        return val;
    }

    function textNodeRender(node,val){
        node.nodeValue.match(replaceReg).forEach((str)=>{
            let data = getVal(this.data,str.match(resolvedReg));
            val = val.replace(new RegExp(str,'g'),data)
        })
        node.nodeValue = val;
    }

    window.Vue = Vue;
})(window, new myEvent() )
