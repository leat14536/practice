/**
 * Created by Administrator on 2017/5/19 0019.
 */
require('./styles/main.scss');
require( './index.html' );
require('babel-polyfill');

import slide from "./js/slide.js";
import tabToggle from './js/TabToggle';
import TechnologySlide from "./js/TechnologySlide.js";
import ghostBtn from "./js/GhostBtn";
import scrollTo from "./js/ScrollTo.js";
import scrollDisplay from "./js/ScrollDisplay.js"
import load from "./js/Load.js";

(function(window){
    window.onload = function(){
        setSlide();
        setScroll();
    }

    function setSlide() {
        //页面滚动改变状态
        scrollDisplay();

        //图片懒加载和特殊加载
        load();

        //轮播
        slide();

        //选项卡
        tabToggle();

        //锁定按钮
        ghostBtn();

        //特殊轮播
        sectionSlide();

        //右侧导航条事件
        rightNav();
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
    *   特殊轮播
    * */
    function sectionSlide(){
        let leftBtn = document.querySelector('.left-btn'),
            rightBtn = document.querySelector('.right-btn')
        new  TechnologySlide({
            leftBtn,
            rightBtn,
            distance:3,
            time: 5000,
        });
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

})(window)


