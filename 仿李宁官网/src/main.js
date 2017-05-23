/**
 * Created by Administrator on 2017/5/19 0019.
 */
require('./styles/main.scss');
require( './index.html' );
require('babel-polyfill');          //兼容ie
import Slide from "./js/slide.js";
(function(window){
    window.onload = function(){
        setSlide();
    }



    function setSlide() {
        navMenu();
        mainSlide();
        sectionSlide();
    }

    function navMenu(){
        let menus = document.querySelectorAll('.drop-down-menu');
        let btns = document.querySelectorAll('.nav-menu');
        let menuClass = 'active';
        new Slide({
            elems: menus,
            slideBtns: btns,
            enType: 'mouseenter',
            enCallback(num, elems, btns){
                elems.forEach((el,i)=>{
                    if( i != num ){
                        removeClass( el, menuClass );
                    }else{
                        addClass( el, menuClass );
                    }
                })
            },
            outType: 'mouseleave',
            outCallback( num, elems, btns ){
                elems.forEach(( el )=>{
                    removeClass( el, menuClass );
                })
            }
        })
    }
    function  mainSlide(){
        let imgs = document.querySelector('.slide-box').children,
            btns = document.querySelectorAll('.slide-btn'),
            leftBtn = document.querySelector('.slide-left'),
            rightBtn = document.querySelector('.slide-right'),
            btnAct = 'active'
        new Slide({
            elems:imgs,
            slideBtns: btns,
            time: 5000,
            enType: 'mouseenter',
            enCallback( num, elems, btns ){
                elems[0].parentNode.setAttribute('data-slide',num)
                btns.forEach((el,index)=>{
                    if(index!=num){
                        removeClass(el,btnAct)
                    }else{
                        addClass(el,btnAct)
                    }
                })
            },
            leftBtn,
            rightBtn
        })
    }

    function sectionSlide(){
        let elems = document.querySelectorAll('.icon-box'),
            leftBtn = document.querySelector('.left-btn'),
            rightBtn = document.querySelector('.right-btn');
        new Slide({
            elems,
            leftBtn,
            rightBtn,
            enCallback(){
                console.log(arguments[0])
            },
            time: 3000
        })
    }

    function addClass(el,str){
        if( el.className.indexOf(str) === -1 ){
            el.className += ' '+str;
        }
    }
    function removeClass(el,str){
        el.className = el.className.replace( str,'').trim();
    }
})(window)


