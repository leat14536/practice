/**
 * Created by Administrator on 2017/7/28 0028.
 */
import $ from 'jquery'
window.$ = $

require('fullpage.js')
require('./styles/main.scss')
import H5 from './js/H5.js'

let h5 = new H5()

h5.whenAddPage = function () {
  this.addComponent('slide_up', {
    bg: 'images/footer.png',
    css: {
      left: 0,
      bottom: -20,
      width: '100%',
      height: '20px',
      zIndex: 2,
      opacity: 0
    },
    animateIn: {
      opacity: 1,
      bottom: '-1px'
    },
    animateOut: {
      opacity: 0,
      bottom: '-20px'
    },
    delay: 500
  })
}

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
    css: {top: 20}
  })
  .addComponent('text', {
    width: 500,
    height: 30,
    center: true,
    text: 'IT教育网=只学有用的',
    css: {opacity: 0, textAlign: 'center', color: 'red', fontSize: '26px'},
    animateIn: {top: 150, opacity: 1},
    animateOut: {top: 240, opacity: 0}
  })
  .addComponent('description', {
    center: true,
    width: 481,
    height: 295,
    bg: 'images/description_bg.gif',
    css: {
      opacity: 0,
      padding: '15px 10px 10px 10px',
      fontSize: '15px', color: '#fff',
      lineHeight: '18px',
      textAlign: 'justify',
      top: 240
    },
    text: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
    animateIn: {top: 195, opacity: 1},
    animateOut: {top: 240, opacity: 0},
    delay: 1000
  })
  .addComponent('people', {
    center: true,
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
  .addPage()
  .addComponent('caption', {
    text: '课程分布方向',
    css: {top: '20px'}
  })  //polyline
  .addComponent('polyline', {
    type: 'polyline',
    width: 530,
    height: 400,
    data: [
      ['javascript', .4, '#f00'],
      ['jQuery', .3],
      ['CSS3', .35],
      ['Bootstrap', .05],
      ['Vue', .09],
      ['HTML5', .3]
    ],
    css: {
      top: 100,
      opacity: 0
    },
    animateIn: {
      top: 250,
      opacity: 1
    },
    animateOut: {
      top: 100,
      opacity: 0
    },
    center: true
  })
  .addComponent('msg', {
    text: '前端开发课程占到40%',
    css: {
      opacity: 0,
      top: 160,
      textAlign:'center',
      width: '100%',
      color:'#ff7676'
    },
    animateIn: { opacity: 1 },
    animateOut: { opacity: 0 }
  })
  .addPage()
  .addComponent('caption', {
    text: '移动开发课程资源',
    css: {top: '20px'}
  })  //pie
  .addComponent('pie', {
    type: 'pie',
    width: 300,
    height: 300,
    data: [
      ['javascript', .4, '#f00'],
      ['jQuery', .2],
      ['CSS3', .05],
      ['Bootstrap', .15],
      ['Html5', .2]
    ],
    css: {
      top: 200,
      opacity: 1
    },
    center: true
  })
  .addComponent('msg', {
    text: 'javascript 占到40%',
    css: {
      opacity: 0,
      bottom: 120,
      textAlign:'center',
      width: '100%',
      color:'#ff7676'
    },
    animateIn: { opacity: 1 },
    animateOut: { opacity: 0 }
  })
  .addPage()
  .addComponent('caption', {
    text: '前端开发课程',
    css: {top: '20px'}
  }) //bar
  .addComponent('bar', {
    type: 'bar',
    width: 530,
    height: 600,
    data: [
      ['javascript', .4, '#ff7676'],
      ['HTML/CSS', .2],
      ['jQuery', .3],
      ['CSS3', .35],
      ['Bootstrap', .05],
      ['Vue', .09],
      ['HTML5', .3]
    ],
    css: {
      top: 100,
      opacity: 0
    },
    animateIn: {
      top: 200,
      opacity: 1
    },
    animateOut: {
      top: 100,
      opacity: 0
    },
    center: true
  })
  .addComponent('msg', {
    text: 'javascript 占到40%',
    css: {
      opacity: 0,
      bottom: 120,
      textAlign:'center',
      width: '100%',
      color:'#ff7676'
    },
    animateIn: { opacity: 1 },
    animateOut: { opacity: 0 }
  })
  .addPage()
  .addComponent('caption', {
    text: '后端开发课程',
    css: {top: '20px'}
  }) //radar
  .addComponent('radar', {
    type: 'radar',
    width: 400,
    height: 400,
    data: [
      ['javascript', .8, '#f00'],
      ['jQuery', .7],
      ['CSS3', .6],
      ['Bootstrap', .5],
      ['Vue', .4],
      ['HTML5', .3]
    ],
    css: {
      top: 100,
      opacity: 0
    },
    animateIn: {
      top: 200,
      opacity: 1
    },
    animateOut: {
      top: 100,
      opacity: 0
    },
    center: true
  })
  .addComponent('msg', {
    text: 'javascript 占到40%',
    css: {
      opacity: 0,
      bottom: 120,
      textAlign:'center',
      width: '100%',
      color:'#ff7676'
    },
    animateIn: { opacity: 1 },
    animateOut: { opacity: 0 }
  })
  /*.addPage()
  .addComponent('caption', {
    text: '报名人数过万',
    css: {top: '20px'}
  }) //ring*/
  .addPage()
  .addComponent('caption', {
    text: '课程难度分布',
    css: {top: '20px'}
  }) //point
  .addComponent('point', {
    type: 'point',
    width: 300,
    height: 300,
    data: [
      ['高级', .4, '#ff7676', 0, 0],
      ['中级', .2, '#ffa3a4', '60%', '-50%'],
      ['初级', .3, '#66c1ff', '50%', '120%']
    ],
    css: {
      bottom: 0,
      opacity: 0
    },
    animateIn: {
      bottom: '40%',
      opacity: 1
    },
    animateOut: {
      bottom: 0,
      opacity: 0
    },
    center: true
  })
  .addPage('tail')
  .addComponent('logo', {
    center: true,
    width: 359,
    height: 129,
    bg: 'images/tail_logo.png',
    css: {top: 240, opacity: 0},
    animateIn: {top: 210, opacity: 1},
    animateOut: {top: 240, opacity: 0},
  })
  .addComponent('slogan', {
    center: true,
    width: 314,
    height: 46,
    bg: 'images/tail_slogan.png',
    css: {top: 280, opacity: 0},
    animateIn: {left: '50%', opacity: 1},
    animateOut: {left: 0, opacity: 0},
    delay: 500
  })
  .addComponent('share', {
    width: 128,
    height: 120,
    bg: 'images/tail_share.png',
    css: {top: 240, right: 110, opacity: 0},
    animateIn: {top: 10, opacity: 1, right: 10},
    animateOut: {top: 240, opacity: 0, right: 110},
    delay: 1000
  })
  .addComponent('back', {
    center: true,
    width: 52,
    height: 50,
    bg: 'images/tail_back.png',
    onclick() {
      $.fn.fullpage.moveTo(1)
    }
  })
  .loader()

