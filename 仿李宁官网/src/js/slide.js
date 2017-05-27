/**
 * Created by Administrator on 2017/5/23 0023.
 */
/*
*   使用方法 在外层标签上添加 data-slide-type="default"
*   轮播图添加 data-slide-picData = num  从1开始计算
*   按钮添加 data-slide-btnData = num
*   图片和按钮的值相对应
*
* */
import Vender from './Vender.js';
//常规轮播
    export default function(){
        let els = document.querySelectorAll('[data-slide-type="default"]');
        for( let i=0,el; el=els[i++]; ){
            new Slide(el);
        }
    }

    class Slide extends Vender{
        constructor(el){
            super();
            this.init(el);
            this.bindEvent();
        }
        init(el){
            this.el = el;
            this.pics = this.check( el, 'data-slide-pic');
            this.btns = this.check( el, 'data-slide-btn');

            this.picData = el.getAttribute('data-slide-picData');
            this.btnData = el.getAttribute('data-slide-btnData');
            this.autoTime = el.getAttribute('data-slide-auto');
            this.btnEv = el.getAttribute('data-slide-btnEvent')||'click';
            this.messageData = el.getAttribute('data-slide-messageData');

            if(this.messageData) this.messageEl = el.querySelector('['+this.messageData+']');
            this.leftBtn = el.querySelector('[data-slide-left]');
            this.rightBtn = el.querySelector('[data-slide-right]');

            this.autoCnt = 1;
            this.autoTimer = null;
            this.maxCnt = el.querySelectorAll('[data-slide-btn]').length+1;
        }
        bindEvent(){
            this.autoSlide();
            this.bindBtnEv();
        }
        autoSlide(){
            if(this.autoTime){
                clearInterval(this.autoTimer);
                this.autoTimer = setInterval(()=>{
                    this.autoCnt++;
                    this.switchPic();
                },this.autoTime);
            }
        }
        cntJudge(){
            let max = this.maxCnt,
                num = this.autoCnt;
            if( num>=max )num = num%max+1;
            if( num<1 )num = max+num-1;
            this.autoCnt = num;
        }
        switchPic(){
            this.cntJudge();
            let now = this.autoCnt,
                pics = this.pics,
                btns = this.btns,
                picData = this.picData,
                btnData = this.btnData,
                messageData = this.messageData;
            if( picData ){
                this.removeMsg( pics, picData )
                pics[now].setAttribute( picData, '' );
            }

            if( btnData ){
                this.removeMsg( btns, btnData )
                btns[now].setAttribute( btnData, '' );
            }

            if(messageData)this.messageEl.setAttribute(messageData,now);
        }
        bindBtnEv(){
            let el = this.el;
            el.addEventListener(this.btnEv,(e)=>{
                let target = e.target,
                    num = target.getAttribute('data-slide-btn');
                if( num ){
                    this.autoCnt = +num;
                    this.autoSlide();
                    this.switchPic();
                }
            })
            if(this.leftBtn) {
                this.leftBtn.onclick = ()=> {
                    this.autoCnt--;
                    this.autoSlide();
                    this.switchPic();
                }
            }
            if(this.rightBtn) {
                this.rightBtn.onclick = ()=> {
                    this.autoCnt++;
                    this.autoSlide();
                    this.switchPic();
                }
            }
        }
    }