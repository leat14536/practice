/**
 * Created by Administrator on 2017/5/25 0025.
 */
import Vender from './Vender.js';
export default function(){
    let els = document.querySelectorAll('[data-menu-type="default"]');
    for( let i=0,el; el=els[i++]; ){
         new TabToggle(el);
    }
}

class TabToggle extends Vender{
    constructor(el){
        super();
        this.init(el)
        this.bindEvent();
    }
    init(el){
        this.el = el;
        this.btns = this.check( el, 'data-menu-btn' );
        this.views = this.check( el, 'data-menu-view' );
        this.viewMessage = el.getAttribute('data-menu-viewMessage');
        this.btnMessage = el.getAttribute('data-menu-btnMessage');
        this.ev = el.getAttribute('data-menu-event')||'mouseover';
        this.closeEv = el.getAttribute('data-menu-closeEv')||'mouseleave'
        this.removeMessage = el.hasAttribute('data-menu-removeMessage');
    }
    bindEvent(){
        this.btnAddEvent()
    }

    btnAddEvent(){
        let el = this.el,
            views = this.views,
            btns = this.btns;
        el.addEventListener(this.ev,(e)=>{
            let target = e.target;
            let num = target.getAttribute('data-menu-btn');
            while( !num && target!=el ){
                target = target.parentNode;
                num = target.getAttribute('data-menu-btn');
            }
            if( num && !target.hasAttribute(this.btnMessage) ){
                this.removeMsg(views,this.viewMessage);
                views[num].setAttribute(this.viewMessage,'');
                this.removeMsg(btns,this.btnMessage);
                btns[num].setAttribute(this.btnMessage,'');
            }
        },false);
        if(this.removeMessage) {
            el.addEventListener(this.closeEv, (e)=> {
                this.removeMsg(views, this.viewMessage);
                this.removeMsg(btns, this.btnMessage);
            }, false);
        }
    }

}



















