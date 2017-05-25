/**
 * Created by Administrator on 2017/5/19 0019.
 */
require('./styles/main.scss');
require( './index.html' );
require('babel-polyfill');          //兼容ie
import Slide from "./js/slide.js";
import TabToggle from './js/TabToggle';
import  TechnologySlide from "./js/TechnologySlide.js";
(function(window){
    window.onload = function(){
        setSlide();
    }

    function setSlide() {
        Slide();
        TabToggle();
        sectionSlide();
    }

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

})(window)


