/**
 * Created by Administrator on 2017/4/14 0014.
 */
;(function(window){
  'use strict'
  /*
  * surfaced
  *     dom 传入浮出层的dom节点
  *     drag 类型boolean true表示可以拖动 默认true
  *     deform 类型boolean true表示可以放大或缩小 默认true
  *
  *     使用方法:
  *     建议提前设置浮出层节点  display:none;
  *     默认在屏幕正中心浮动
  *     通过css min-width/min-height 手动设置最小宽高
  *     var XXX = new surfaced(dom[node],drag[boolean],deform[boolean]);
  *     XXX.show(): 显示浮出层
  *
  *     私有方法
  *     init(): 设置节点的css 和背景遮罩层(this.mask)
  *     setDrag(): 设置拖动 surfaced(dom,drag,deform)的drag为true时运行
  *     setDeform(): 设置放大缩小 surfaced(dom,drag,deform)的deform为true时运行
  *     hide(): 关闭浮出层和遮罩
  * */


  function surfaced(dom,drag=true,deform=true){
    this.dom = dom;
    this.mask = null;
    init(this);
    if(drag) setDrag(this);
    if(deform) setDeform(this);
  }

  surfaced.prototype = {
    show(){
      this.dom.style.visibility = 'visible';
      this.dom.style.top = parseInt((document.documentElement.clientHeight-this.dom.offsetHeight)/2) +'px';
      this.dom.style.left = parseInt((document.documentElement.clientWidth-this.dom.offsetWidth)/2) +'px';
      this.mask.style.visibility = 'visible';
    }
  }

  function init(surfaced){
    let mask = document.createElement('div');
    surfaced.mask = mask;
    let maskSty = {
      width:'100%',
      height:'100%',
      position: 'fixed',
      'z-index': 9998,
      'background-color': 'rgba(0,0,0,0.7)',
      visibility: 'hidden',
      top: 0,
      left: 0
    }
    setStyle(mask,maskSty);
    mask.addEventListener('click',() => {
      hide(surfaced);
    });
    document.body.appendChild(mask);

    let domSty = {
      display: 'block',
      visibility: 'hidden',
      position: 'fixed',
      'z-index': 9999,
    }
    setStyle(surfaced.dom,domSty);
  }
  function setDrag(surfaced){
    let canDrag = false;
    let differenceX = null;
    let differenceY = null;
    document.addEventListener('mousedown',(e)=>{
      let target = e.target||e.srcElement;
      if(target == surfaced.dom){
        canDrag = true;
        differenceX = e.clientX - surfaced.dom.offsetLeft;
        differenceY = e.clientY - surfaced.dom.offsetTop;
        return false;
      }
    });
    document.addEventListener('mousemove',(e)=>{
      if(canDrag){
        let position =  jugBoundary(e.clientX - differenceX,e.clientY- differenceY,surfaced.dom)
        surfaced.dom.style.left = position.x + 'px';
        surfaced.dom.style.top = position.y + 'px';
        return false;
      }
    });
    document.addEventListener('mouseup',()=>{
      canDrag = false;
      return false;
    })

  }
  /*
  *   setDeform
  *   创建四个div浮在dom四个边缘
  *   点击移动时dom相应变化
  * */
  function setDeform(surfaced){
    function setAllDomSty(){
      let divSty  = {
          position: 'absolute',
          'z-index': 10000,
        },
        lefSty = {
          width: '5px',
          height: surfaced.dom.offsetHeight-10+'px',
          top:'5px',
          left:'-3px',
          cursor:'w-resize',
          //'background-color':'red',
        },
        topSty = {
          height:'5px',
          width: surfaced.dom.offsetWidth-10+'px',
          top:'-3px',
          left:'5px',
          cursor:'n-resize',
          //'background-color':'red',
        },
        botSty = {
          height:'5px',
          width: surfaced.dom.offsetWidth-10+'px',
          bottom:'-3px',
          left:'5px',
          cursor:'s-resize',
          //'background-color':'red',
        },
        rigSty = {
          width: '5px',
          height: surfaced.dom.offsetHeight-10+'px',
          top:'5px',
          right:'-3px',
          cursor:'e-resize',
          //'background-color':'red',
        }
      setStyle(leftDiv,Object.assign({},divSty,lefSty));
      setStyle(topDiv,Object.assign({},divSty,topSty));
      setStyle(botDiv,Object.assign({},divSty,botSty));
      setStyle(rigDiv,Object.assign({},divSty,rigSty));
    }

    let leftDiv = document.createElement('div'),
      topDiv = document.createElement('div'),
      botDiv = document.createElement('div'),
      rigDiv = document.createElement('div');
      setAllDomSty();

    surfaced.dom.appendChild(leftDiv);
    surfaced.dom.appendChild(topDiv);
    surfaced.dom.appendChild(botDiv);
    surfaced.dom.appendChild(rigDiv);

    let canDeformRig,canDeformLeft,canDeformBot,canDeformTop;
    let domRig,domBot;
    document.addEventListener('mousedown',(e)=>{
      let target = e.target||e.srcElement;
      switch (target){
        case(leftDiv):
          domRig = surfaced.dom.offsetWidth+surfaced.dom.offsetLeft;
          canDeformLeft = true;
          break;
        case(rigDiv):
          canDeformRig = true;
          break;
        case(topDiv):
          domBot = surfaced.dom.offsetHeight+surfaced.dom.offsetTop;
          canDeformTop = true;
          break;
        case(botDiv):
          canDeformBot = true;
          break;

      }
      return false;
    });
    document.addEventListener('mousemove',()=>move());
    document.addEventListener('mouseup',()=>{
      canDeformRig = canDeformLeft = canDeformBot = canDeformTop = false;
      setAllDomSty()
      return false;
    })
    function move(){
      let e = event||window.event;
      if(canDeformRig){
        surfaced.dom.style.left = surfaced.dom.offsetLeft+'px';
        surfaced.dom.style.right = 'auto';
        surfaced.dom.style.width = Math.min(e.clientX - surfaced.dom.offsetLeft,document.documentElement.clientWidth-surfaced.dom.offsetLeft) + 'px';
      }else if(canDeformBot){
        surfaced.dom.style.top = surfaced.dom.offsetTop+'px';
        surfaced.dom.style.bottom = 'auto';
        surfaced.dom.style.height = Math.min(e.clientY - surfaced.dom.offsetTop,document.documentElement.clientHeight-surfaced.dom.offsetTop) + 'px';
      }else if(canDeformLeft){
        surfaced.dom.style.left = 'auto';
        surfaced.dom.style.right = document.documentElement.clientWidth-domRig+'px';
        surfaced.dom.style.width = domRig-e.clientX+'px';
      }else if(canDeformTop){
        surfaced.dom.style.top = 'auto';
        surfaced.dom.style.bottom = document.documentElement.clientHeight-domBot+'px';
        surfaced.dom.style.height = Math.min(domBot-e.clientY,domBot)+'px';
      }
      return false;
    }
  }
  function jugBoundary(x,y,dom){
    let clix = Math.max(0,x);
    clix = Math.min(clix,document.documentElement.clientWidth-dom.offsetWidth);
    let cliy =  Math.max(0,y);
    cliy = Math.min(cliy,document.documentElement.clientHeight-dom.offsetHeight);
    return {x:clix,y:cliy};
  }
  function hide(surfaced){
    surfaced.dom.style.visibility = 'hidden';
    surfaced.mask.style.visibility = 'hidden';
  }
  function setStyle(dom,styList){
    for( let sty in styList ){
      dom.style[sty] = styList[sty];
    }
  }
  window.surfaced = surfaced;
})(window);
