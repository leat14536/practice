/**
 * Created by Administrator on 2017/5/28 0028.
 */
/*
*   import这个文件并且调用 Load()
*   import Load from 'Load.js'
*   Load();
*
*   图片组合懒加载和组合特殊加载
*   懒加载使用方法:
*       主标签添加属性[data-load-type="lazyGroup"](必填)
*       主标签下需要懒加载的图片添加[data-group-src=(uri)](必填)
*
*       会根据主标签的高度(距离页面顶部的距离)加载主标签下选中的图片
*
*   特殊加载使用方法:
*       主标签添加属性[data-load-type="conditionGroup"](必填)
*       主标签下需要懒加载的图片添加[data-group-src=(uri)](必填)
*       主标签添加属性[data-comment="xxx"] xxx代表依赖标签的css选择器(使用queryselector选择)(必填)
*       主标签添加属性[data-comment-event="xxx"](必填)
*           xxx默认'click'   代表依赖标签触发xxx事件时加载主标签下选中的图片
*           建议使用 'moseover'/'click'
* */

export default function(){
    //懒加载
    let els = document.querySelectorAll('[data-load-type="lazyGroup"]');
    let options = [];
    for( let i=0,el; el=els[i++]; ){
        options.push({
            imgBox:new LoadBox( el ),
            top: getRelTop(el)
        })
    }
    new LazyLoad(options);

    //特殊加载
    els = document.querySelectorAll('[data-load-type="conditionGroup"]');
    for( let i=0,el; el=els[i++]; ){
        new ConditionLoad(el);
    }
}

//懒加载
class LazyLoad{
    constructor(options){
        this.init(options)
    }
    init(options){
        this.options = options;
        this.bindEvent();
    }

    //加载min-max之间的图片
    load(min,max){
        let options = this.options,
            del = [];
        for (let i = 0, len = options.length; i < len; i++) {
            if (options[i].top >= min && options[i].top <= max) {
                options[i].imgBox.load();
                del.push(i);
            }
        }
        for( let i=del.length-1; i>=0; i-- ){
            options.splice(del[i],1);
        }
    }
    bindEvent(){
        let top = document.body.scrollTop||document.documentElement.scrollTop,
        cHeight = document.documentElement.clientHeight;
        this.load(top-cHeight,top+cHeight*2);

        let timer = null,
            self = this;

        //限制触发频率
        function lazyLoad(){
            if(timer) return;
            timer = setTimeout(()=>{
                top = document.body.scrollTop||document.documentElement.scrollTop;
                cHeight = document.documentElement.clientHeight;
                timer = null;
                self.load( top-cHeight, top+cHeight*2);
            },500);
        }

        window.addEventListener( 'resize', lazyLoad );
        window.addEventListener( 'scroll', lazyLoad );
    }
}


//仅负责选中el下有[data-group-src]的标签
//外部调用实例的load()方法开始加载
class LoadBox {
    constructor(el) {
        this.init(el);
    }
    init(el){
        this.el = el;
        this.imgs = el.querySelectorAll('[data-group-src]');
    }
    load(){
        let elems = this.imgs,
            cnt=0;

        for( let i=0,el; el=elems[i++]; ){
            imgLoad(el.getAttribute('data-group-src'));
        }

        function imgLoad(src){
            let img = new Image();
            img.src = src;
            img.addEventListener('load',()=>{
                cnt++;
                bk();
            })
        }

        function bk(){
            if(cnt==elems.length){
                for( let i=0,el; el=elems[i++]; ){
                    el.setAttribute('src', el.getAttribute('data-group-src'));
                }
            }
        }
    }
}

class ConditionLoad extends LoadBox{
    constructor(el){
        super(el);
        this.bindEvent();
    }

    bindEvent(){
        let el = this.el,
            self = this,
            ev = el.getAttribute('data-comment-event')||'click',
            comment = document.querySelector(el.getAttribute('data-comment'));
        if(comment) {
            comment.addEventListener(ev, function once(){
                self.load();
                comment.removeEventListener(ev,once);
            })
        }
    }
}

//获取el在body下的高度
function getRelTop(el){
    var posY = el.offsetTop;
    var aBox = el;
    do {
        aBox = aBox.offsetParent;
        posY += aBox.offsetTop;
    } while( aBox.tagName != "BODY" );
    return posY;
}


