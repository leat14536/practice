/**
 * Created by Administrator on 2017/5/3 0003.
 */
import Event from 'Event.js';

(function() {
    //
    const replaceReg = /({{[^{}]+}})/g;
    const resolvedReg = /([^.{}]+)/g;

    Event.prototype.pop = function( routeKeys ){
        let key = routeKeys.join('.');
        let len = routeKeys.length;
        let index;

        do{
            this.events[key] && this.emit( key, getVal( routeKeys.slice(0,len), this.data ) );
            index = key.lastIndexOf('.');
            key = key.substring( 0, index );
            len--;
        }while( index != -1 );
    }

    function getVal( routes, data ){
        let ret = data
        for( let i=0; i<routes.length; i++ ){
            ret = ret[routes[i]]
        }
        return ret
    }

    class _Observer {

        constructor(data, routeKeys=[], myEvent ) {
            this.myEvent = myEvent;
            this.data = data
            this._walk(data, routeKeys);
        }

        _walk(data, routeKeys) {
            for (let key in data) {
                let val = data[key];
                if (typeof val == 'object') {
                    new _Observer( val, [...routeKeys, key], this.myEvent )
                }
                this._convert( key, val, [...routeKeys, key] );
            }
        }

        _convert(key, val, routeKeys) {
            let self = this
            Object.defineProperty( this.data, key, {
                enumerable: true,
                configurable: true,
                set(newVal){
                    if (val === newVal) return;
                    //console.log('你设置了' + key + ' , 新的值为 ' + newVal)
                    if (typeof newVal === 'object') new _Observer( newVal, [...routeKeys, key], this.myEvent )
                    val = newVal

                    //事件冒泡
                    self.myEvent.pop( routeKeys );
                },
                get(){
                    //console.log('你访问了 ' + key)
                    return val;
                }
            })
        }
    }

    class Vue extends _Observer{
        constructor(obj){
            let myEvent = new Event(obj.data);
            super( obj.data, [], myEvent )
            this.myEvent = myEvent;
            this._render(obj.el);
        }

        $watch(key,callback){
            this.myEvent.on(key,callback);
        }

        _render(el){
            let dom;
            if(typeof el==='string') dom = document.querySelector(el);          //类jq选择器
            else dom = el;                                                      //传入dom 这里暂不做纠错

            let testNodes = screen(dom);
            testNodes.forEach((obj)=>{
                let nodeVal = obj.node.nodeValue;
                this._bind( obj.node, nodeVal );
                this._renderTextNode( obj.node, nodeVal );
            })

            function screen(dom){
                let nodeArr = [];

                //递归遍历dom节点
                screenDom(dom);

                //返回可替换的text节点
                return nodeArr;

                //递归遍历dom
                function screenDom(dom) {
                    dom.childNodes.forEach((node)=> {
                        if(node.nodeType==3&&replaceReg.test(node.nodeValue)){
                            nodeArr.push({
                                node: node
                            })
                        }else if(node.nodeType==1){
                            screenDom(node);
                        }
                    })
                }
            }
        }

        _bind( node,val ){
           val.match(replaceReg).forEach((str)=>{
                this.$watch( str.match(resolvedReg).join('.'),(newVal)=>{
                    this._renderTextNode( node, val );
                })
            })
        }

        _renderTextNode( node, val ){
            val.match(replaceReg).forEach((str)=>{
                let data = getVal( str.match(resolvedReg), this.data );
                val = val.replace( new RegExp(str), data );
            })
            node.nodeValue = val;
        }
    }


    window.Vue = Vue;
})(window);