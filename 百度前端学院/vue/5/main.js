/**
 * Created by Administrator on 2017/5/1 0001.
 */

import myEvent from '../event.js'

(function(window,myEvent){
    //匹配{{string}}的正则
    const replaceReg = /({{(.+)}})/g;
    //取出key的正则
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

                    if(this.deep) {
                        //事件冒泡
                        myEvent.pop(parentKeys, newVal, val);
                    }else{
                        myEvent.emit(parentKeys.join('.'), newVal, val)
                    }
                    if(newVal===val) return;
                    val = newVal;
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
                obj.node.nodeValue.match(replaceReg).forEach((str)=>{
                    let keys = str.match(resolvedReg)
                    let val = getVal(this.data, keys)
                    let reg = new RegExp(str,'g');
                    let nodeVal = obj.node.nodeValue;
                    obj.node.nodeValue = obj.node.nodeValue.replace(reg,val)
                    this._bind(keys.join('.'), obj.node, nodeVal, reg);
                })
            })
        },
        _bind(key,node,val,reg){
            this.$watch(key,callback)

            function callback(newVal){
                node.nodeValue = val.replace(reg,newVal);
            }
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

    //获取对应的值
    function getVal(obj,keys){
        let val;
        keys.forEach((attr)=>{
            obj = obj[attr];
            val = obj;
        })
        return val;
    }



    window.Vue = Vue;
})(window, new myEvent() )
