/**
 * Created by Administrator on 2017/5/23 0023.
 */
//常规轮播
    export default function(){
        let els = document.querySelectorAll('[data-slide-type="default"]'),
            ret = [];
        for( let i=0,el; el=els[i++]; ){
            ret.push(new Slide(el));
        }
    }

    class Slide{
        constructor(el){
            this.init(el);
            this.bindEvent();
        }
        init(el){
            this.el = el;
            this.pics = this.check('data-slide-pic');
            this.btns = this.check('data-slide-btn');
            this.picData = el.getAttribute('data-slide-picData');
            this.btnData = el.getAttribute('data-slide-btnData');
            this.autoTime = el.getAttribute('data-slide-auto');
            this.btnEv = el.getAttribute('data-slide-btnEv')||'click';
            this.messageData = el.getAttribute('data-slide-messageData');
            if(this.messageData)this.messageEl = el.querySelector('['+this.messageData+']');
            this.autoTimer = null;
            this.leftBtn = el.querySelector('[data-slide-left]');
            this.rightBtn = el.querySelector('[data-slide-right]');
            this.autoCnt = 1;
        }
        bindEvent(){
            this.autoSlide();
            this.bindBtnEv();
        }
        check(str){
            let pics = this.el.querySelectorAll('['+str+']'),
                ret = {},
                attr,
                i=0,
                el;
            for( ; el=pics[i++]; ){
                attr = el.getAttribute(str);
                ret[attr] = el;
            }
            this.maxCnt = i;
            return ret;
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
            if( picData )this.switchAttr( picData, pics, now );
            if( btnData )this.switchAttr( btnData, btns, now );
            if(messageData)this.messageEl.setAttribute(messageData,now);
        }
        switchAttr( attr, elems, now ){
            for (let i in elems) {
                elems[i].removeAttribute(attr);
            }
            elems[now].setAttribute( attr, '' );
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