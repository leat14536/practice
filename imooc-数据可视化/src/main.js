/**
 * Created by Administrator on 2017/7/28 0028.
 */
import $ from 'jquery'
window.$ = $

require('fullpage.js')
require('./styles/main.scss')
import H5 from './js/H5.js'

let h5 = new H5()

h5.addPage('face')
  .addComponent('topic', {
    center: true,
    width: 395,
    height: 130,
    bg: 'images/face_logo.png',
    css: {top: 0, opacity: 0},
    animateIn: {top: 100, opacity: 1},
    animateOut: {top: 0, opacity: 0}
  })
  .addComponent('slogan', {
    center: true,
    width: 365,
    height: 99,
    bg: 'images/face_slogan.png',
    css: {opacity: 0, top: 180},
    animateIn: {left: '50%', opacity: 1},
    animateOut: {left: 0, opacity: 0},
    delay: 500
  })
  .addComponent('face_img_left', {
    width: 370,
    height: 493,
    bg: 'images/face_img_left.png',
    css: {opacity: 0, left: -50, bottom: -50},
    animateIn: {left: 0, bottom: 0, opacity: 1},
    animateOut: {opacity: 0, left: -50, bottom: -50},
    delay: 1000
  })
  .addComponent('face_img_right', {
    width: 276,
    height: 449,
    bg: 'images/face_img_right.png',
    css: {opacity: 0, right: -50, bottom: -50},
    animateIn: {right: 0, bottom: 0, opacity: 1},
    animateOut: {opacity: 0, right: -50, bottom: -50},
    delay: 1000
  })
  .addPage()
  .addComponent('caption', {
    text: '核心理念',
    css: { top: 20 }
  })
  .addComponent('text', {
    width: 500,
    height: 30,
    center:true,
    text:'IT教育网=只学有用的',
    css:{opacity: 0, textAlign: 'center', color:'red', fontSize: '26px'},
    animateIn: {top: 150, opacity: 1},
    animateOut: {top: 240, opacity: 0}
  })
  .addComponent('description', {
    center:true,
    width: 481,
    height: 295,
    bg: 'images/description_bg.gif',
    css: {
      opacity: 0,
      padding: '15px 10px 10px 10px',
      fontSize: '15px', color:'#fff',
      lineHeight: '18px',
      textAlign:'justify',
      top: 240
    },
    text: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
    animateIn: {top: 195, opacity: 1},
    animateOut: {top: 240, opacity: 0},
    delay: 1000
  })
  .addComponent('people', {
    center:true,
    width: 515,
    height: 305,
    bg: 'images/p1_people.png',
    css: {
      opacity: 0,
      bottom: 0
    },
    animateIn: {bottom: 40, opacity: 1},
    animateOut: {bottom: 0, opacity: 0},
    delay: 500
  })
  .loader()




/*
 $('#h5').fullpage({
 'sectionsColor': ['red','blue','green','black'],
 onLeave(index, nextIndex, direction) {
 $('#h5').find('.page').eq(index-1).trigger('onLeave')
 },
 afterLoad(anchorLink, index) {
 $('#h5').find('.page').eq(index-1).trigger('onLoad')
 }
 })

 $('.page').on('onLeave', function() {
 console.log($(this).attr('id'), '==>> onleave')
 $(this).find('.component').trigger('onLeave')
 })

 $('.page').on('onLoad', function() {
 console.log($(this).attr('id'), '==>> onload')
 $(this).find('.component').trigger('onLoad')
 })

 $('.component').on('onLoad', function() {
 $(this).fadeIn()
 return false
 })

 $('.component').on('onLeave', function() {
 $(this).fadeOut()
 return false
 })

 $('.page').eq(0).trigger('onLoad')
 */
