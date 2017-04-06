/**
 * Created by Administrator on 2017/4/4 0004.
 */
//给textarea添加行号
(function(window){
    'use strict'
    function area(dom){ //area节点
        this.dom = dom;
        this.rows = 0;
        this.box = null;
        this.blkHeight = null;
        this.init();
        this.addEv();
    }
    area.prototype = {
        init: function(){
            //1.创建大的div包裹textarea左侧留30px空隙
            //2. 左侧创建一个div放置行号,这个div的scrolltop与textarea的scrolltop一致,每个行号都是一个div
            //3.先创建100个,如果textarea的scrolltop超过一定数值就再造100个
            //ie下计算方式不一样,导致行号偏移,暂未解决
            var div = document.createElement('div');
            this.dom.parentNode.insertBefore(div ,this.dom);
            var box = document.createElement('div');
            div.appendChild(this.dom);
            div.appendChild(box);
            this.box = box;
            var divSty = {
                width: this.dom.offsetWidth+30+'px',
                height: this.dom.offsetHeight+'px',
                position: 'relative',
                overflow: 'hidden'
            },domSty = {
                position: 'absolute',
                top: 0,
                left: 30+'px',
                //border: 'none',
                backgroundColor: '#222',
                color: '#9c3'
            },boxSty = {
                position: 'absolute',
                top:0,
                left:0,
                width:25+'px',
                height: '100%'
            }

            setStyle(div, divSty);
            setStyle(this.dom, domSty);
            setStyle(box, boxSty);
            this.rows = this.setBlk(1);
        },
        addEv: function(){
            var me = this;
            this.dom.onscroll = function(){
                if((me.dom.scrollTop+me.dom.offsetHeight)>(me.rows*me.blkHeight)){
                    me.rows = me.setBlk(me.rows+1);
                }
                me.box.style.top = -me.dom.scrollTop+'px';
            }
        },
        setBlk: function setBlk(min){
            var height = Math.floor(this.dom.offsetHeight/this.dom.rows);
            this.blkHeight = height;
            var blkSty = {
                position: 'absolute',
                left: 5+'px',
                width:25+'px',
                height: height+'px',
                backgroundColor: '#aaa',
                color: '#fff',
                fontSize: 12+'px',
                overflow: 'hidden',
                textAlign: 'center',
                lineHeight: height+'px'
            }
            for( var i=min; i<=min+100; i++ ){
                var num = document.createElement('div');
                setStyle(num, blkSty);
                num.style.top = (i-1)* height+'px';
                num.innerHTML = i;
                this.box.appendChild(num);
            }
            return min+100;
        },
        setErr: function(num){
            //需要css控制.err样式
            this.box.childNodes[num].setAttribute('class','err');
        },
        clearErr: function(){
            //ie不支持dom节点对象使用forEach 因此使用传统for循环
            var doms = this.box.childNodes;
            for( var i=0; i<doms.length; i++){
                doms[i].removeAttribute('class');
            }
        }
    }
    function setStyle(dom, obj){
        for( var i in obj ){
            dom.style[i] = obj[i];
        }
    }

    window.area = area;
})(window);