/**
 * Created by Administrator on 2017/4/1 0001.
 */
(function(window){
    'use strict'
    function aniTag(node,max,tagStr){//aniTag(tag存储的父节点,数量不能超过10,鼠标移入tag时添加的字符串)
        this.arr = [];
        this.tagParNode = node;
        this.max = max||10;
        this.tagStr = tagStr;
    }

    aniTag.prototype = {
        //添加数据
        pushStr : function(str){
            str = str.trim();
            var flag = 1;
            if(str!=''){
                //去重
                this.arr.forEach(function(tag){
                    if(str==tag){
                        flag = 0;
                    }
                })
                if(flag){
                    this.arr.push(str);
                    //超过max时去掉arr[0]
                    while(this.arr.length>this.max){
                        this.arr.splice(0,1);
                    }
                }
            }
        },
        //渲染
        render : function(){
            this.tagParNode.innerHTML = '';
            var me = this;
            if(this.arr.length) {
                this.arr.forEach(function (str,i) {
                    var tag = document.createElement('span');
                    tag.setAttribute('class','tag');
                    //记录tag在arr的位置
                    tag.setAttribute('data',i);
                    tag.innerHTML = str;
                    me.tagParNode.appendChild(tag);
                })
                //添加事件监听
                this.addEv();
            }
        },
        addEv : function(){
            //存储this
            var me = this;
            this.tagParNode.addEventListener('mouseover',function(ev){
                ev = ev||window.event;
                var target = ev.target||ev.srcElement;
                if(target.className=='tag'){
                    //记录tag在arr的位置
                    var tagdata = target.getAttribute('data');
                    target.innerHTML = me.tagStr+me.arr[tagdata];
                    target.onmouseout = function(){
                        this.innerHTML = me.arr[tagdata];
                    }
                    target.onclick = function(){
                        //从数组中去除,重新渲染
                        me.arr.splice(tagdata,1);
                        me.render();
                    }
                }
             })
        },
        //重置arr数组
        clear : function(){
            this.arr = [];
        }
    }
    if(!window.aniTag) {
        window.aniTag = aniTag;
    }else{
        alert('绑定aniTag失败')
    }
})(window)