/**
 * Created by Administrator on 2017/4/2 0002.
 */
(function(window){
    function ipt(dom,fn,sRul){
        /*
            用css为.jugBox更改位置&字体大小
            dom; input节点
            fn;验证函数,返回1个数组[boolean,str]验证成功返回1,失败返回0,str为返回给用户的消息
            rul;聚焦dom时给用户的消息
         */
        this.dom = dom;
        this.judge = fn;
        this.rul = sRul;
        this.box = document.createElement('div');
        this.box.setAttribute('class','jugBox');
        this.borderColor = this.dom.style.borderColor;
        this.init();
    }
    ipt.prototype = {
        init: function(){
            var me = this;
            this.dom.onfocus = function(){
                this.style.borderColor = me.borderColor;
                me.box.innerHTML = me.rul;
                me.box.style.color = '#666'
            }
            this.dom.onblur = function(){
                me.judgeDom();
            }
            this.dom.parentNode.insertBefore(me.box,this.dom.nextSibling);
        },
        judgeDom: function(){
            var aRet = this.judge();
            if(aRet[0]){
                this.dom.style.borderColor ='green';
                this.box.style.color = 'green';
            }else{
                this.dom.style.borderColor ='red';
                this.box.style.color = 'red';
            }
            this.box.innerHTML = aRet[1];
            return aRet[0];
        }
    }

    if(!window.ipt){
        window.ipt = ipt;
    }else{
        console.log('加载ipt失败');
    }
})(window);