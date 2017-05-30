/**
 * Created by Administrator on 2017/5/19 0019.
 */
require('./styles/main.scss');
//require('./index.html');
//require("html-loader?-attrs!./index.html");
require('babel-polyfill');

/*//同步加载
//import TechnologySlide from "./js/TechnologySlide.js";
import scrollTo from "./js/ScrollTo.js";
import load from "./js/Load.js";

//异步加载
 require.ensure([], function(require){
     /!*
      *   特殊轮播
      * *!/
     function sectionSlide(){
         let leftBtn = document.querySelector('.left-btn'),
             rightBtn = document.querySelector('.right-btn')
         new  TechnologySlide({
             leftBtn,
             rightBtn,
             distance:3,
             AutoTime: 5000,
         });
     }
     //页面滚动改变状态
     require('./js/slide.js').default();

     //锁定按钮
     require('./js/GhostBtn').default();

     //选项卡
     require('./js/TabToggle').default();

     //滚动到一定高度时改变属性
     require('./js/ScrollDisplay.js').default();

     let TechnologySlide = require('./js/TechnologySlide.js').default;
     sectionSlide()


 });*/
//代码分割后主包388kb 分包12kb,与其增加一条请求不如打包在一起

import TechnologySlide from "./js/TechnologySlide.js";
import scrollTo from "./js/ScrollTo.js";
import load from "./js/Load.js";
import slide from "./js/Slide.js";
import ghostBtn from "./js/GhostBtn";
import tagToggle from "./js/TabToggle";
import scrollDisplay from "./js/ScrollDisplay.js";

(function(window){
    window.onload = function(){
        setSlide();
        setScroll();
    }


    function setSlide() {

        //图片懒加载和特殊加载
        load();

        //右侧导航条事件
        rightNav();

        //选项卡
        tagToggle()

        //轮播
        slide();

        //滚动到一定值时改变状态
        scrollDisplay();

        //特殊轮播
        sectionSlide();

        //移入小图时切换大图url;
        goodsUrl();

        //锁定按钮
        ghostBtn();
    }


    /*
    *   左侧导航块点击滚动事件
    * */
    function setScroll(){
        let leftNav = document.querySelector('.left-nav');
        leftNav.addEventListener('click',(e)=>{
            let target = e.target;
            let message = target.getAttribute('data-scroll-btn');
            if(message) {
                scrollTo(message,80);
            }
        })
    }

    /*
    *   移入小图切换
    * */
    function goodsUrl(){
        let goodsBox = document.querySelectorAll('.hot-goods-item .goodsBox');
        for( let i=0,el; el = goodsBox[i++]; ){
            el.addEventListener('mouseover',(e)=>{
                let target = e.target;
                if(target.parentNode.className==='selSlavePic'){
                    el.querySelector('.goodsPic>img').setAttribute('src',target.getAttribute('src'));
                }
            })
        }
    }



    /*
    *   添加右侧标签事件
    * */
    function rightNav(){
        //显示/隐藏
        let show = document.querySelector('.r-show'),
            hide = document.querySelector('.r-hide'),
            par = document.querySelector('.right-nav');
        show.onclick = function(){
            par.setAttribute('data-state-hide','')
        }
        hide.onclick = function(){
            par.removeAttribute('data-state-hide')
        }

        //显示二维码
        let code = document.querySelector('.r-code');
        code.addEventListener('mouseover',()=>{
            code.setAttribute('data-state-hov','')
        })
        window.addEventListener('click',()=>{
            code.removeAttribute('data-state-hov');
        })

        //返回顶部
        let totop = document.querySelector('.r-top');
        totop.onclick = function(){
            window.scrollTo(0,0);
        }
    }

    /*
    *   特殊轮播
    * */
    function sectionSlide(){
        let leftBtn = document.querySelector('.left-btn'),
            rightBtn = document.querySelector('.right-btn')
        new  TechnologySlide({
            leftBtn,
            rightBtn,
            distance:3,
            AutoTime: 5000,
        });
    }

})(window)


