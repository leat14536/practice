/**
 * Created by Administrator on 2017/5/26 0026.
 */
/*
*   标签上定义 data-autoscroll-anchor=str为锚点
*
*   import ScrollTo from 'xx/AutoScroll.js'
*
*   调用 ScrollTo( str ) 时屏幕滚动到此锚点的顶部
*
*   第一个参数用于定位
*   第二个参数表示目标位置与锚点的距离
*   第三个参数表示少于cut时直接滚动到目标位置
* */

let timer;
export default function( str, distanceTop=0, cut=10 ){
    let el = document.querySelector('[data-autoscroll-anchor="'+str+'"]'),
        end = el.offsetTop-distanceTop,
        top = document.body.scrollTop||document.documentElement.scrollTop;
    let len = (end-top)/40;

    clearInterval(timer);
    timer = setInterval(()=>{
        top = document.body.scrollTop||document.documentElement.scrollTop;
        if(Math.abs(top-end)<=cut||Math.abs(top-end)<=Math.abs(len)){
            window.scrollTo(0,end);
            clearInterval(timer);
        }else{
            window.scrollTo(0, parseInt(top + len) )
        }
    },16);

}
































