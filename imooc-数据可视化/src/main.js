/**
 * Created by Administrator on 2017/7/28 0028.
 */
import $ from 'jquery'

require('fullpage.js')
require('./styles/main.scss')

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
